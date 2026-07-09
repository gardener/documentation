---
github_repo: 'https://github.com/gardener/gardener-extension-shoot-dns-service'
github_subdir: docs/operations
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-dns-service/deployment.md
  to: deployment.md
persona: Operators
title: Deployment
prev: false
next: false
managed: true
---

# Gardener DNS Management for Shoots

## Introduction
Gardener allows Shoot clusters to request DNS names for Ingresses and Services out of the box.
To support this the gardener must be installed with the `shoot-dns-service`
extension.
This extension uses the seed's dns management infrastructure to maintain DNS
names for shoot clusters. So, far only the external DNS domain of a shoot
(already used for the kubernetes api server and ingress DNS names) can be used
for managed DNS names.

## Operator Extension

Using an operator extension resource (`extension.operator.gardener.cloud`) is the recommended way to deploy the `shoot-dns-service` extension.

An example of an `operator` extension resource can be found at [extension-shoot-dns-service.yaml](https://github.com/gardener/gardener-extension-shoot-dns-service/blob/master/example/extension-shoot-dns-service.yaml).

It is possible to decide whether the extension should be always available for all shoots or whether the extension must be separately enabled per shoot.
To enable the extension for all shoots, the `autoEnable` field must be set to `[shoot]` in the `Extension` resource.

```yaml
apiVersion: operator.gardener.cloud/v1alpha1
kind: Extension
metadata:
  annotations:
    security.gardener.cloud/pod-security-enforce: baseline
  name: extension-shoot-dns-service
spec:
  deployment:
    admission:
      runtimeCluster:
        helm:
          ociRepository:
            ref: ... # OCI reference to the Helm chart
      virtualCluster:
        helm:
          ociRepository:
            ref: ... # OCI reference to the Helm chart
    extension:
      helm:
        ociRepository:
          ref: ... # OCI reference to the Helm chart
        values:
        # controllers:
        #   lifecycle:
        #     concurrentSyncs: 5
        #   healthcheck:
        #     concurrentSyncs: 5
        #   heartbeat:
        #     renewIntervalSeconds: 30
        #   replication:
        #     concurrentSyncs: 5
        
        #defaultExternalProviderEntriesQuota: 100      # the DNS entries quota for the 'external' provider when using the default domain (0 = unlimited). Shoots can override this via annotation within limits set by 'defaultExternalProviderEntriesQuotaMax'.
        #defaultExternalProviderEntriesQuotaMax: 200   # maximum allowed quota when shoots override via annotation 'service.dns.extensions.gardener.cloud/default-external-provider-entries-quota'. 0 means the default quota is also the maximum (default). Prevents accidentally setting unreasonably high quotas.

        # dnsClass: my-dns-class                       # (default "garden") dns class for source resources on shoot cluster 
        # dnsProviderReplication:
        #   enabled: true                              # (default false) If set to true, the provider replication is enabled for all shoots by default. Otherwise, it must be enabled in the shoot extension provider config.

  resources:
  - autoEnable:
    - shoot # if set, the extension is enabled for all shoots by default
    clusterCompatibility:
    - shoot
    kind: Extension
    type: shoot-dns-service
    workerlessSupported: true
```

### Overwriting the GCP `WorkloadIdentity` validation configuration

The default GCP `WorkloadIdentity` configuration can be overwritten in the `Extension` resource, e.g.

```yaml
apiVersion: operator.gardener.cloud/v1alpha1
kind: Extension
metadata:
  name: extension-shoot-dns-service
spec:
  deployment:
    extension:
      values:
        workloadIdentity:
          gcp:
            allowedTokenURLs:
            - https://sts.googleapis.com/v1/token # default value
            allowedServiceAccountImpersonationURLRegExps:
            - ^https://iamcredentials\.googleapis\.com/v1/projects/-/serviceAccounts/.+:generateAccessToken$ # default value
```

> [!NOTE]
> Please note that the overwritten GCP `WorkloadIdentity` validation configuration is only available with the next-generation dns-controller-manager (currently enabled with the `useNextGenerationController` field in the extension provider config of the shoot manifest).
> For the legacy dns-controller-manager, the default GCP `WorkloadIdentity` configuration is always used and cannot be overwritten.

## Shoot Extension

Additional configuration for the `shoot-dns-service` extension can be provided in the shoot manifest.

```yaml
Kind: Shoot
...
spec:
  extensions:
    - type: shoot-dns-service
      providerConfig:
        apiVersion: service.dns.extensions.gardener.cloud/v1alpha1
        kind: DNSConfig
        ...
```

See the following sections for details on the possible configuration options.

### Providing Base Domains usable for a Shoot

So, far only the external DNS domain of a shoot already used
for the kubernetes api server and ingress DNS names can be used for managed
DNS names. This is either the shoot domain as subdomain of the default domain
configured for the gardener installation, or a dedicated domain with dedicated
access credentials configured for a dedicated shoot via the shoot manifest.

Alternatively, you can specify `DNSProviders` and its credentials
`Secret` directly in the shoot, if this feature is enabled.
By default, `DNSProvider` replication is disabled, but it can be enabled globally in the `ControllerDeployment`
or for a shoot cluster in the shoot manifest (details see further below).

```yaml
apiVersion: operator.gardener.cloud/v1alpha1
kind: Extension
metadata:
  name: extension-shoot-dns-service
spec:
  extension:
    values:
      dnsProviderReplication:
        enabled: true
```

### Shoot Feature Gate

If the shoot DNS feature is not globally enabled by default (depends on the
extension registration on the garden cluster), it must be enabled per shoot.

To enable the feature for a shoot, the shoot manifest must explicitly add the
`shoot-dns-service` extension.

```yaml
...
spec:
  extensions:
    - type: shoot-dns-service
...
```

#### Enable/disable DNS provider replication for a shoot

The DNSProvider` replication feature enablement can be overwritten in the
shoot manifest, e.g.

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
