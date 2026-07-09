---
description: Learn how to enable audit log forwarding for Garden clusters
github_repo: 'https://github.com/gardener/gardener-extension-auditing'
github_subdir: docs/operations
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-auditing/operations-configuration.md
  to: configuration.md
title: Configuration for Garden Clusters
prev: false
next: false
managed: true
---

# Configuring the Auditing Extension for Garden Clusters

> [!NOTE]
> 
> For Shoot cluster configuration, see the [usage documentation](/docs/extensions/others/gardener-extension-auditing/usage-configuration/).

## Garden Configuration

### Enabling the extension

To enable audit log forwarding for a Garden cluster:

1. Configure an [Audit Policy](/docs/gardener/security/shoot_auditpolicy/) for the Garden's virtual cluster `kube-apiserver` and `gardener-apiserver`. Note, the two API servers are handling different APIs respectively each of them has own specific audit policy scoped to the served resources.
1. Add an entry of type `auditing` under `spec.extensions` with a `providerConfig` of kind `AuditConfiguration`

> [!CAUTION]
> 
> As of now the extension configuration is not validated when applied to the Garden object. Operators should treat with extra caution.

Minimal example:

```yaml
apiVersion: operator.gardener.cloud/v1alpha1
kind: Garden
metadata:
  name: garden
spec:
  extensions:
  - type: auditing
    providerConfig:
      apiVersion: auditing.extensions.gardener.cloud/v1alpha1
      kind: AuditConfiguration
      backends:
      - http:
          url: https://audit-backend.gardener.cloud/audit
          tls:
            secretReferenceName: audit-mtls-creds
  resources:
  - name: audit-mtls-creds
    resourceRef:
      apiVersion: v1
      kind: Secret
      name: mtls-credentials
  virtualCluster:
    kubernetes:
      kubeAPIServer:
        auditConfig:
          auditPolicy:
            configMapRef:
                name: audit-policy
    gardener:
      gardenerAPIServer:
        auditConfig:
          auditPolicy:
            configMapRef:
              name: audit-policy-garden
        # ... other configuration ...
---
apiVersion: v1
kind: Secret
metadata:
  name: mtls-credentials
  namespace: garden
data:
  ca.crt: <base64 PEM encoded CA bundle to validate server certificates> # optional, if not set root CAs will be used
  client.crt: <base64 PEM encoded client certificate>
  client.key: <base64 PEM encoded client key>
```

For full list of options, please consult the [API reference](/docs/extensions/others/gardener-extension-auditing/api-reference/auditing/).

For details about the format of audit events sent to backends, see [Audit Event Format](/docs/extensions/others/gardener-extension-auditing/operations-event-format/).

### Disabling the extension

Remove the `auditing` entry from `spec.extensions`. The extension will clean up deployed resources. (Audit policy remains; you can also remove or adjust it separately.)
