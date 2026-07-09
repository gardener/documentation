---
github_repo: 'https://github.com/gardener/gardener-extension-shoot-lakom-service'
github_subdir: docs/usage
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-lakom-service/shoot-extension.md
  to: shoot-extension.md
persona: Users
title: Shoot Extension
prev: false
next: false
managed: true
---

# Introduction

This extension implements non-keyless [cosign](https://github.com/sigstore/cosign) image signature verification.

## Shoot Feature Gate

Usually the `shoot-lakom-service` extension is enabled globally but also can be configured per shoot cluster.
The example below shows the exposed configuration options, including how to disable the extensions.

```yaml
kind: Shoot
...
spec:
  resources:
  - name: lakom-ref
    resourceRef:
      apiVersion: v1
      kind: Secret
      name: lakom-secret
  extensions:
  - type: shoot-lakom-service
    disabled: true
    providerConfig:
      apiVersion: lakom.extensions.gardener.cloud/v1alpha1
      kind: LakomConfig
      scope: KubeSystem
      trustedKeysResourceName: lakom-ref
...
```

### Scope

The `scope` field instruct lakom which pods to consider for validation.

| Scope | Description |
| --- | --- |
| `KubeSystem` | Lakom will validate all pods in the `kube-system` namespace. When the Gardener `KubernetesDashboard` addon is enabled, the pods in the `kubernetes-dashboard` namespace are also validated. |
| `KubeSystemManagedByGardener`(default) | Lakom will validate all pods in the `kube-system` namespace that are labeled with `resources.gardener.cloud/managed-by=gardener`. When the Gardener `KubernetesDashboard` addon is enabled, the pods with same label in the `kubernetes-dashboard` namespace are also validated. |
| `Cluster` | Lakom will validate all pods in all namespaces. |

> [!NOTE]
> The default scope is configurable, if you are uncertain what is the set scope for your Shoot cluster
> get in contact with your Gardener administrator to clarify it.

### TrustedKeysResourceName

Lakom, by default, tries to verify only workloads that belong to Gardener. Because of this, the only public keys that it uses to do its job are the ones for the Gardener workload.

If you'd like to use Lakom as a tool for verifying your own workload, you'll need to add your own public keys to the ones that Lakom is already using. This can be achieved using Gardener [referenced resources](/docs/gardener/extensions/referenced-resources/). More information about the keys and their format can be found at [lakom public keys configuration](/docs/extensions/others/gardener-extension-shoot-lakom-service/lakom/#lakom-cosign-public-keys-configuration-file).

Simply:

1. Create a secret in your project namespace that contains a field `keys` with your keys as a value, example:
   
   ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
     name: lakom-secret
   stringData:
     keys: |
       - name: example-client-key1
         algorithm: RSASSA-PSS-SHA256
         key: |-
           -----BEGIN PUBLIC KEY-----
           MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAPeQXbIWMMXYV+9+j9b4jXTflnpfwn4E
           GMrmqYVhm0sclXb2FPP5aV/NFH6SZdHDZcT8LCNsNgxzxV4N+UE/JIsCAwEAAQ==
           -----END PUBLIC KEY-----
       - name: example-client-key2
         algorithm: RSASSA-PSS-SHA256
         key: |-
           -----BEGIN PUBLIC KEY-----
           MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAPeQXbIWMMXYV+9+j9b4jXTflnpfwn4E
           GMrmqYVhm0sclXb2FPP5aV/NFH6SZdHDZcT8LCNsNgxzxV4N+UE/JIsCAwEAAQ==
           -----END PUBLIC KEY-----
   ```

1. Add a reference to your secret via the `resources` field in the shoot spec as shown above.
1. Add the name of your reference in `trustedKeysResourceName` in the provider config as shown above.

Now, whenever Lakom tries to verify a Pod, it will make sure to use your public keys as well.
