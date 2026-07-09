---
github_repo: 'https://github.com/gardener/gardener-extension-shoot-lakom-service'
github_subdir: docs/operations
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-lakom-service/deployment.md
  to: deployment.md
persona: Operators
title: Deployment
prev: false
next: false
managed: true
---

# Gardener Lakom Service for Shoots

## Introduction

Gardener allows Shoot clusters to use `Lakom` admission controller for cosign image signing verification. To support this the Gardener must be installed with the `shoot-lakom-service` extension.

## Configuration

To generally enable the Lakom service for shoot objects the `shoot-lakom-service` extension must be registered by providing an appropriate [extension registration](https://github.com/gardener/gardener-extension-shoot-lakom-service/blob/main/example/controller-registration.yaml) in the garden cluster.

Here it is possible to decide whether the extension should be always available for all shoots or whether the extension must be separately enabled per shoot.

If the extension should be used for all shoots the `globallyEnabled` flag should be set to `true`.

```yaml
spec:
  resources:
    - kind: Extension
      type: shoot-lakom-service
      globallyEnabled: true
```

Via the ControllerDeployment helm values (field path `.helm.values`), the extension controller behaviour can be additionally configured.
Most of the configuration options are listed in the sample chart [values](https://github.com/gardener/gardener-extension-shoot-lakom-service/blob/main/charts/gardener-extension-shoot-lakom-service/values.yaml) file.
Those affecting the lakom admission controller behaviour in the shoot cluster are:

| Values Field Path | Description | Default Value |
| --- | --- | --- |
| `.controllers.cosignPublicKeys` | The public cosign keys used to verify the OCI image signatures | `{}` |
| `.controllers.useOnlyImagePullSecrets` | Configures lakom admission controller to use only the explicitly configured image pull secrets, otherwise also the node identity and docker config file are used | `true` |
| `.controllers.allowUntrustedImages` | Configures lakom admission controllers whether to deny resources using images with untrusted signatures or just to warn about them | `false` |
| `.controllers.allowInsecureRegistries` | Configures lakom admission controllers whether to all communication over `HTTP` with OCI registries, otherwise only `HTTPS` is used | `false` |
| `.controllers.defaultAdmissionScope` | Can be used to overwrite the default Lakom scope of `KubeSystemManagedByGardener` for all shoots | `<unset>` |

### Shoot Feature Gate

If the shoot Lakom service is not globally enabled by default (depends on the extension registration on the garden cluster), it can be enabled per shoot. To enable the service for a shoot, the shoot manifest must explicitly add the `shoot-lakom-service` extension.

```yaml
...
spec:
  extensions:
    - type: shoot-lakom-service
...
```

If the shoot Lakom service is globally enabled by default, it can be disabled per shoot. To disable the service for a shoot, the shoot manifest must explicitly state it.

```yaml
...
spec:
  extensions:
    - type: shoot-lakom-service
      disabled: true
...
```
