---
github_repo: 'https://github.com/gardener/gardener-extension-shoot-cert-service'
github_subdir: docs/operations
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-cert-service/deployment.md
  to: deployment.md
persona: Operators
title: Deployment
prev: false
next: false
managed: true
---

# Gardener Certificate Management

## Introduction
Gardener comes with an extension that enables shoot owners to request X.509 compliant certificates for shoot domains.

## Extension Installation
The `shoot-cert-service` extension can be deployed and configured via Gardener's native resource [ControllerRegistration](/docs/gardener/extensions/registration/).

### Prerequisites
To let the `shoot-cert-service` operate properly, you need to have:
- a [DNS service](https://github.com/gardener/external-dns-management) in your seed
- contact details and optionally a private key for a pre-existing [Let's Encrypt](https://letsencrypt.org/) account

### Operator Extension

Using an operator extension resource (`extension.operator.gardener.cloud`) is the recommended way to deploy the `shoot-cert-service` extension.

An example of an `operator` extension resource can be found at [`example/extension.yaml`](https://github.com/gardener/gardener-extension-shoot-cert-service/blob/master/example/extension.yaml).

The `ControllerRegistration` contains a reference to the Helm chart which eventually deploy the `shoot-cert-service` to seed clusters.
It offers some configuration options, mainly to set up a default issuer for shoot clusters.
With a default issuer, pre-existing Let's Encrypt accounts can be used and shared with shoot clusters (See [Integration Guide - One Account or Many?](https://letsencrypt.org/docs/integration-guide/#one-account-or-many)).

> [!TIP]
> Please keep the Let's Encrypt [Rate Limits](https://letsencrypt.org/docs/rate-limits/) in mind when using this shared account model. Depending on the amount of shoots and domains it is recommended to use an account with increased rate limits.

```yaml
apiVersion: operator.gardener.cloud/v1alpha1
kind: Extension
metadata:
  annotations:
    security.gardener.cloud/pod-security-enforce: baseline
  name: extension-shoot-cert-service
spec:
  deployment:
    extension:
      helm:
        ociRepository:
          ref: ... # OCI reference to the Helm chart
      injectGardenKubeconfig: true
      policy: Always

      values:
        certificateConfig:
          defaultIssuer:
            name: default-issuer
            acme:
              email: some.user@example.com
              # optional private key for the Let's Encrypt account
              #privateKey: |-
              #-----BEGIN RSA PRIVATE KEY-----
              #...
              #-----END RSA PRIVATE KEY-----
              server: https://acme-v02.api.letsencrypt.org/directory
            # altenatively to `acme`, you can use a self-signed root or intermediate certificate for providing self-signed certificates
#           ca:
#             certificate: |
#               -----BEGIN CERTIFICATE-----
#               ...
#               -----END CERTIFICATE-----
#             certificateKey: |
#               -----BEGIN PRIVATE KEY-----
#               ...
#               -----END PRIVATE KEY-----

#          defaultRequestsPerDayQuota: 50

#          precheckNameservers: 8.8.8.8,8.8.4.4

#          caCertificates: | # optional custom CA certificates when using private ACME provider
#            -----BEGIN CERTIFICATE-----
#            ...
#            -----END CERTIFICATE-----
#            -----BEGIN CERTIFICATE-----
#            ...
#            -----END CERTIFICATE-----

        shootIssuers:
          enabled: false # if true, allows specifying issuers in the shoot clusters

        deactivateAuthorizations: true # if true, enables flag --acme-deactivate-authorizations in cert-controller-manager
        skipDNSChallengeValidation: false # if true, skips dns-challenges in cert-controller-manager

      # The following values are only needed if the extension should be deployed on the runtime cluster. 
      runtimeClusterValues:
        certificateConfig:
          defaultIssuer:
            # typically the same values as at .spec.deployment.values.certificateConfig.defaultIssuer
            ...
  resources:
  - autoEnable:
    - shoot # if set, the extension is enabled for all shoots by default
    clusterCompatibility:
    - shoot
    kind: Extension
    type: shoot-cert-service
    workerlessSupported: true
  - clusterCompatibility:
    - garden
    - seed
    kind: Extension
    lifecycle:
      delete: AfterKubeAPIServer
      reconcile: BeforeKubeAPIServer
    type: controlplane-cert-service
```

#### Providing Trusted TLS Certificate for Garden Runtime Cluster

The `shoot-cert-service` can provide the TLS secret labeled with `gardener.cloud/role: garden-cert` in the `garden` namespace to be used by the Gardener API server.
See [Trusted TLS Certificate for Garden Runtime Cluster](https://gardener.cloud/docs/gardener/trusted-tls-for-garden-runtime/) for more information.

For this purpose, the extension must be deployed on the runtime cluster. Several configuration steps are needed:

1. Provide the `spec.runtimeClusterValues` values in the `extension.operator.gardener.cloud` resource in the operator extension.
1. Add the extension with type `controlplane-cert-service` to the `Garden` resource on the Garden runtime cluster.
   ```yaml
   apiVersion: operator.gardener.cloud/v1alpha1
   kind: Garden
   metadata:
     name: ...
   spec:
     extensions:
     - type: controlplane-cert-service
       providerConfig:
         apiVersion: service.cert.extensions.gardener.cloud/v1alpha1
         kind: CertConfig
         generateControlPlaneCertificate: true
   ```

If you only want to deploy the `cert-controller-manager` in the `garden` namespace, you can set `generateControlPlaneCertificate` to `false`.

If `generateControlPlaneCertificate` is set to `true`, the current values `spec.virtualCluster.dns.domains` and `spec.runtimeCluster.ingress.domains` from the `Garden` resource are read, and the certificate is created/updated in the `garden` namespace.
The certificate will be reconciled by the `cert-controller-manager` to provide the TLS secret with the label `gardener.cloud/role: garden-cert` in the `garden` namespace.
Additionally, the extension provides a webhook to mutate the `virtual-garden-kube-apiserver` deployment in the `garden` namespace.
It will manage the `--tls-sni-cert-key` command line arguments and patches the volume/volume mount with the TLS secret.
Only the secondary domain names will be used for the SNI certificate, as the self-signed certificate of the first domain name is provided by the Gardener operator.

*Example for resulting domains of the certificate*

If the `Garden` resource contains the following values:
```yaml
apiVersion: operator.gardener.cloud/v1alpha1
kind: Garden
spec:
  runtimeCluster:
    ingress:
      domains:
      - name: "ingress.garden.example.com"
        provider: gardener-dns
  virtualCluster:
    dns:
      domains:
      - name: "primary.garden.example.com"
        provider: gardener-dns
      - name: "secondary.foo.example.com"
        provider: gardener-dns
```

then the `Certificate` will be created with these wildcard domain names:
- `*.primary.garden.example.com`
- `*.secondary.foo.example.com`
- `*.ingress.garden.example.com`

#### Providing Trusted TLS Certificate for Shoot Control Planes

The `shoot-cert-service` can provide the TLS secret labeled with `gardener.cloud/role: controlplane-cert` in the `garden` namespace on the seeds.
See [Trusted TLS Certificate for Shoot Control Planes](https://gardener.cloud/docs/gardener/trusted-tls-for-control-planes/) for more information.

For this purpose, the extension must be enabled for the seed(s) by adding the `controlplane-cert-service` type to the `Seed` manifest:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Seed
metadata:
  name: ...
spec:
  extensions:
  - type: controlplane-cert-service
    providerConfig:
      apiVersion: service.cert.extensions.gardener.cloud/v1alpha1
      kind: CertConfig
      generateControlPlaneCertificate: true
```

The certificate will contain the wildcard domain name using the base domain name from the `.spec.ingress.domain` value of the `Seed` resource.

### ControllerRegistration

> [!NOTE]
> Using a `ControllerRegistration` / `ControllerDeployment` directly is not recommended if your Gardener landscape has a virtual Garden cluster.
> In this case, please use an `extension.operator.gardener.cloud` resource as described above.
> The Gardener operator will then take care of the `ControllerRegistration` and `ControllerDeployment` for you.

An example of a `ControllerRegistration` for the `shoot-cert-service` can be found at [controller-registration.yaml](https://github.com/gardener/gardener-extension-shoot-cert-service/blob/master/example/controller-registration.yaml).

The `ControllerRegistration` contains a Helm chart which eventually deploy the `shoot-cert-service` to seed clusters. It offers some configuration options, mainly to set up a default issuer for shoot clusters. With a default issuer, pre-existing Let's Encrypt accounts can be used and shared with shoot clusters (See "One Account or Many?" of the [Integration Guide](https://letsencrypt.org/docs/integration-guide/)).

> Please keep the Let's Encrypt [Rate Limits](https://letsencrypt.org/docs/rate-limits/) in mind when using this shared account model. Depending on the amount of shoots and domains it is recommended to use an account with increased rate limits.

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: ControllerRegistration
...
  values:
    certificateConfig:
      defaultIssuer:
        acme:
            email: foo@example.com
            privateKey: |-
              -----BEGIN RSA PRIVATE KEY-----
              ...
              -----END RSA PRIVATE KEY-----
            server: https://acme-v02.api.letsencrypt.org/directory
        name: default-issuer
#       restricted: true # restrict default issuer to any sub-domain of shoot.spec.dns.domain

#     defaultRequestsPerDayQuota: 50

#     precheckNameservers: 8.8.8.8,8.8.4.4

#     caCertificates: | # optional custom CA certificates when using private ACME provider
#     -----BEGIN CERTIFICATE-----
#     ...
#     -----END CERTIFICATE-----
#
#     -----BEGIN CERTIFICATE-----
#     ...
#     -----END CERTIFICATE-----

      shootIssuers:
        enabled: false # if true, allows to specify issuers in the shoot clusters

```

#### Enablement

If the `shoot-cert-service` should be enabled for every shoot cluster in your Gardener managed environment, you need to auto enable it in the `ControllerRegistration`:
```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: ControllerRegistration
...
  resources:
  - kind: Extension
    type: shoot-cert-service
    autoEnable:
    - shoot # if set, the extension is enabled for all shoots by default
    clusterCompatibility:
    - shoot
    workerlessSupported: true
```

Alternatively, you're given the option to only enable the service for certain shoots:
```yaml
kind: Shoot
apiVersion: core.gardener.cloud/v1beta1
...
spec:
  extensions:
  - type: shoot-cert-service
...
```
