---
description: Learn how to enable audit log forwarding for Shoot clusters
github_repo: 'https://github.com/gardener/gardener-extension-auditing'
github_subdir: docs/usage
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-auditing/usage-configuration.md
  to: configuration.md
title: Configuration for Shoot Clusters
prev: false
next: false
managed: true
---

# Configuring the Auditing Extension for Shoot Clusters

## Shoot Configuration

### Enabling the extension

The extension is not globally enabled and must be configured per Shoot:

1. Configure an [Audit Policy](/docs/gardener/security/shoot_auditpolicy/) for the Shoot cluster's kube-apiserver
1. Add an entry of type `auditing` under `spec.extensions` with a `providerConfig` of kind `AuditConfiguration`

Minimal example:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
  name: crazy-botany
  namespace: garden-dev
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
  kubernetes:
    kubeAPIServer:
      auditConfig:
        auditPolicy:
          configMapRef:
            name: audit-policy
    # ... other configuration ...
---
apiVersion: v1
kind: Secret
metadata:
  name: mtls-credentials
  namespace: garden-dev
data:
  ca.crt: <base64 PEM encoded CA bundle to validate server certificates> # optional, if not set root CAs will be used
  client.crt: <base64 PEM encoded client certificate>
  client.key: <base64 PEM encoded client key>
```

For full list of options, please consult the [API reference](/docs/extensions/others/gardener-extension-auditing/api-reference/auditing/).

For details about the format of audit events sent to backends, see [Audit Event Format](/docs/extensions/others/gardener-extension-auditing/usage-event-format/).

### Disabling the extension

Remove the `auditing` entry from `spec.extensions`. The extension will clean up deployed resources. (Audit policy remains; you can also remove or adjust it separately.)
