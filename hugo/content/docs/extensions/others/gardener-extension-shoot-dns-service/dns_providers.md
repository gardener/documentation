---
github_repo: 'https://github.com/gardener/gardener-extension-shoot-dns-service'
github_subdir: docs/usage
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-dns-service/dns_providers.md
  to: dns_providers.md
persona: Users
title: DNS Providers
prev: false
next: false
managed: true
---

# DNS Providers

## Introduction

Gardener can manage DNS records on your behalf, so that you can request them via different resource types (see [here](/docs/guides/networking/DNS-extension/)) within the shoot cluster. The domains for which you are permitted to request records, are however restricted and depend on the DNS provider configuration.

## Shoot provider

By default, every shoot cluster is equipped with a default provider. It is the very same provider that manages the shoot cluster's `kube-apiserver` public DNS record (DNS address in your Kubeconfig).

```
kind: Shoot
...
dns:
  domain: shoot.project.default-domain.gardener.cloud
```

You are permitted to request any sub-domain of `.dns.domain` that is not already taken (e.g. `api.shoot.project.default-domain.gardener.cloud`, `*.ingress.shoot.project.default-domain.gardener.cloud`) with this provider.

## Additional providers

If you need to request DNS records for domains not managed by the [default provider](#Shoot-provider), additional providers can
be configured in the shoot specification.
Alternatively, if it is enabled, it can be added as `DNSProvider` resources to the shoot cluster.

### Additional providers in the shoot specification (preferred)

To add a provider in the shoot spec for the `shoot-dns-service`, you first need to take a look into the shoot
manifest to check if it already has been migrated to the new separate configuration. If the flag
`.spec.extensions[@.type="shoot-dns-service"].providerConfig.syncProvidersFromShootSpecDNS` is set to `false`,
you need to set the providers in the `providerConfig` section of the extension. Additionally, the secret must be
referenced in the `spec.resources` section. The referenced secret needs to exist in the project namespace.

For example:
```yaml
kind: Shoot
...
spec:
  dns:
    domain: shoot.project.default-domain.gardener.cloud
    providers:
    # define primary provider here if needed (used for the shoot's kube-apiserver record)
  extensions:
    - type: shoot-dns-service
      providerConfig:
        apiVersion: service.dns.extensions.gardener.cloud/v1alpha1
        kind: DNSConfig
        providers:
          - secretName: my-aws-account
            type: aws-route53
          - credentials: my-gcp-account # instead of the field `secretName`, the field `credentials` can be used for either secret references or workload identity references
            type: google-clouddns
          - credentials: my-gcp-workload-identity # the field `credentials` must be used for workload identity references
            type: google-clouddns
        syncProvidersFromShootSpecDNS: false
  resources:
    - name: my-aws-account
      resourceRef:
        apiVersion: v1
        kind: Secret
        name: my-aws-credentials # secret with this name must exist in the project namespace
    - name: my-gcp-account
      resourceRef:
        apiVersion: v1
        kind: Secret
        name: my-gcp-credentials # secret with this name must exist in the project namespace
    - name: my-gcp-workload-identity
      resourceRef:
        apiVersion: security.gardener.cloud/v1alpha1
        kind: WorkloadIdentity
        name: my-gcp-workload-identity # workloadidentity resource with this name must exist in the project namespace
```
If `syncProvidersFromShootSpecDNS` is set to `true`, you need to set the providers in the `spec.dns.providers` section (see below)

### Additional providers in the shoot specification (deprecated)

> [!WARNING]  
> This approach is deprecated. Please prefer keeping `syncProvidersFromShootSpecDNS` set to `false`
> Instead, configure additional DNS providers as part of the `shoot-dns-service` provider config [as described above](#additional-providers-in-the-shoot-specification-preferred) or configure them as resources in the shoot cluster [as described below](#additional-providers-as-resources-in-the-shoot-cluster).

To add a provider in the shoot spec, you need set them in the `spec.dns.providers` list.

For example:
```yaml
kind: Shoot
...
spec:
  dns:
    domain: shoot.project.default-domain.gardener.cloud
    providers:
    - secretName: my-aws-account
      type: aws-route53
    - credentialsRef:
        apiVersion: v1
        kind: Secret
        name: my-gcp-credentials # secret with this name must exist in the project namespace      
      type: google-clouddns
    - credentialsRef:
        apiVersion: security.gardener.cloud/v1alpha1
        kind: WorkloadIdentity
        name: my-gcp-workload-identity # workloadidentity resource with this name must exist in the project namespace      
      type: google-clouddns
  extensions:
    - type: shoot-dns-service
      providerConfig: # this section is synced from spec.dns.providers if syncProvidersFromShootSpecDNS is true
        apiVersion: service.dns.extensions.gardener.cloud/v1alpha1
        kind: DNSConfig
        providers:
        - credentials: shoot-dns-service-my-aws-account
          type: aws-route53
        - credentials: shoot-dns-service-my-gcp-account
          type: google-clouddns
        - credentials: shoot-dns-service-my-gcp-workload-identity
          type: google-clouddns
        syncProvidersFromShootSpecDNS: true # if this flag is set to true, the providerConfig is automatically synced from spec.dns.providers
  resources:
    ... # will be updated with the referenced secrets from spec.dns.providers if syncProvidersFromShootSpecDNS is true
```

> Please consult the [API-Reference](https://gardener.cloud/docs/gardener/api-reference/core/#core.gardener.cloud/v1beta1.DNSProvider) to get a complete list of supported fields and configuration options.

Referenced secrets should exist in the project namespace in the Garden cluster and must comply with the provider specific credentials format. The **External-DNS-Management** project provides corresponding examples ([20-secret-\<provider-name>-credentials.yaml](https://github.com/gardener/external-dns-management/tree/master/examples)) for known providers.

### Additional providers as resources in the shoot cluster

If it is not enabled globally, you have to enable the feature in the shoot manifest:

```yaml
Kind: Shoot
...
spec:
  extensions:
    - type: shoot-dns-service
      providerConfig:
        apiVersion: service.dns.extensions.gardener.cloud/v1alpha1
        kind: DNSConfig
        dnsProviderReplication:
          enabled: true
...
```

To add a provider directly in the shoot cluster, provide a `DNSProvider` in any namespace together
with `Secret` containing the credentials.

For example if the domain is hosted with AWS Route 53 (provider type `aws-route53`):
```yaml
apiVersion: dns.gardener.cloud/v1alpha1
kind: DNSProvider
metadata:
  annotations:
    dns.gardener.cloud/class: garden
  name: my-own-domain
  namespace: my-namespace
spec:
  type: aws-route53
  secretRef:
    name: my-own-domain-credentials
  domains:
    include:
    - my.own.domain.com
---
apiVersion: v1
kind: Secret
metadata:
  name: my-own-domain-credentials
  namespace: my-namespace
type: Opaque
data:
  # replace '...' with values encoded as base64
  AWS_ACCESS_KEY_ID: ...
  AWS_SECRET_ACCESS_KEY: ...
```

The **External-DNS-Management** project provides examples with more details for `DNSProviders` (30-provider-\<provider-name>.yaml)
and credential `Secrets` (20-secret-\<provider-name>.yaml) at [https://github.com/gardener/external-dns-management//examples](https://github.com/gardener/external-dns-management/tree/master/examples)
for all supported provider types.
