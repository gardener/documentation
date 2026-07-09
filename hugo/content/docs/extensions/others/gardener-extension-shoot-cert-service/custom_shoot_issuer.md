---
category: Networking
description: How to define a custom issuer forma shoot cluster
github_repo: 'https://github.com/gardener/gardener-extension-shoot-cert-service'
github_subdir: docs/usage
level: beginner
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-cert-service/custom_shoot_issuer.md
  to: custom_shoot_issuer.md
persona: Users
publishdate: '2022-07-20'
scope: operator
tags:
  - task
title: Using a custom Issuer
prev: false
next: false
managed: true
---

# Using a custom Issuer
Another possibility to request certificates for custom domains is a dedicated issuer.

> Note: This is only needed if the default issuer provided by Gardener is restricted to shoot related domains or you are using domain names not visible to public DNS servers. **Which means that your senario most likely doesn't require your to add an issuer**.

The custom issuers are specified normally in the shoot manifest. If the `shootIssuers` feature is enabled, it can alternatively be defined in the shoot cluster.

## Custom issuer in the shoot manifest

```yaml
kind: Shoot
...
spec:
  extensions:
  - type: shoot-cert-service
    providerConfig:
      apiVersion: service.cert.extensions.gardener.cloud/v1alpha1
      kind: CertConfig
      issuers:
        - email: your-email@example.com
          name: custom-issuer # issuer name must be specified in every custom issuer request, must not be "garden"
          server: 'https://acme-v02.api.letsencrypt.org/directory'
          privateKeySecretName: my-privatekey # referenced resource, the private key must be stored in the secret at `data.privateKey` (optionally, only needed as alternative to auto registration) 
          #precheckNameservers: # to provide special set of nameservers to be used for prechecking DNSChallenges for an issuer
          #- dns1.private.company-net:53
          #- dns2.private.company-net:53" 
      #shootIssuers:
        # if true, allows to specify issuers in the shoot cluster
        #enabled: true 
  resources:
  - name: my-privatekey
    resourceRef:
      apiVersion: v1
      kind: Secret
      name: custom-issuer-privatekey # name of secret in Gardener project
```

If you are using an ACME provider for private domains, you may need to change the nameservers used for
checking the availability of the DNS challenge's TXT record before the certificate is requested from the ACME provider.
By default, only public DNS servers may be used for this purpose.
At least one of the `precheckNameservers` must be able to resolve the private domain names.

### Using the custom issuer

To use the custom issuer in a certificate, just specify its name in the spec.

```yaml
apiVersion: cert.gardener.cloud/v1alpha1
kind: Certificate
spec:
  ...
  issuerRef:
    name: custom-issuer
  ...
```

For source resources like `Ingress` or `Service` use the `cert.gardener.cloud/issuer` annotation.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: amazing-ingress
  annotations:
    cert.gardener.cloud/purpose: managed
    cert.gardener.cloud/issuer: custom-issuer
...
```

## Custom issuer in the shoot cluster

*Prerequiste*: The `shootIssuers` feature has to be enabled.
It is either enabled globally in the `ControllerDeployment` or in the shoot manifest
with:

```yaml
kind: Shoot
...
spec:
  extensions:
  - type: shoot-cert-service
    providerConfig:
      apiVersion: service.cert.extensions.gardener.cloud/v1alpha1
      kind: CertConfig
      shootIssuers:
        enabled: true # if true, allows to specify issuers in the shoot cluster
...
```

Example for specifying an `Issuer` resource and its `Secret` directly in any
namespace of the shoot cluster:

```yaml
apiVersion: cert.gardener.cloud/v1alpha1
kind: Issuer
metadata:
  name: my-own-issuer
  namespace: my-namespace
spec:
  acme:
    domains:
      include:
      - my.own.domain.com
    email: some.user@my.own.domain.com
    privateKeySecretRef:
      name: my-own-issuer-secret
      namespace: my-namespace
    server: https://acme-v02.api.letsencrypt.org/directory
---
apiVersion: v1
kind: Secret
metadata:
  name: my-own-issuer-secret
  namespace: my-namespace
type: Opaque
data:
  privateKey: ... # replace '...' with valus encoded as base64
```

### Using the custom shoot issuer

To use the custom issuer in a certificate, just specify its name and namespace in the spec.

```yaml
apiVersion: cert.gardener.cloud/v1alpha1
kind: Certificate
spec:
  ...
  issuerRef:
    name: my-own-issuer
    namespace: my-namespace
  ...
```

For source resources like `Ingress` or `Service` use the `cert.gardener.cloud/issuer` annotation.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: amazing-ingress
  annotations:
    cert.gardener.cloud/purpose: managed
    cert.gardener.cloud/issuer: my-namespace/my-own-issuer
...
```
