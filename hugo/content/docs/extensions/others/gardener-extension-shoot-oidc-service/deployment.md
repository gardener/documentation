---
github_repo: 'https://github.com/gardener/gardener-extension-shoot-oidc-service'
github_subdir: docs/operations
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-oidc-service/deployment.md
  to: deployment.md
persona: Operators
title: Deployment
prev: false
next: false
managed: true
---

# Gardener OIDC Service for Shoots

## Introduction
Gardener allows Shoot clusters to dynamically register OpenID Connect providers. To support this the Gardener must be installed with the `shoot-oidc-service` extension.

## Configuration

To generally enable the OIDC service for shoot objects the `shoot-oidc-service` extension must be registered by providing an appropriate [extension registration](https://github.com/gardener/gardener-extension-shoot-oidc-service/blob/master/example/controller-registration.yaml) in the garden cluster.

Here it is possible to decide whether the extension should be always available for all shoots or whether the extension must be separately enabled per shoot.

If the extension should be used for all shoots the `globallyEnabled` flag should be set to `true`.

```yaml
spec:
  resources:
    - kind: Extension
      type: shoot-oidc-service
      globallyEnabled: true
```

### Shoot Feature Gate

If the shoot OIDC service is not globally enabled by default (depends on the extension registration on the garden cluster), it can be enabled per shoot. To enable the service for a shoot, the shoot manifest must explicitly add the `shoot-oidc-service` extension.

```yaml
...
spec:
  extensions:
    - type: shoot-oidc-service
...
```

If the shoot OIDC service is globally enabled by default, it can be disabled per shoot. To disable the service for a shoot, the shoot manifest must explicitly state it.

```yaml
...
spec:
  extensions:
    - type: shoot-oidc-service
      disabled: true
...
```
