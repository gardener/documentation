---
github_repo: >-
  https://github.com/gardener/gardener-extension-shoot-networking-problemdetector
github_subdir: docs/operations
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-networking-problemdetector/deployment.md
  to: deployment.md
persona: Operators
title: Deployment
prev: false
next: false
managed: true
---

# Gardener Networking Policy Filter for Shoots

## Introduction
Gardener allows shoot clusters to add network problem observability using the network problem detector.
To support this the Gardener must be installed with the `shoot-networking-problemdetector` extension.

## Configuration

To generally enable the networking problem detector for shoot objects the `shoot-networking-problemdetector` extension must be registered by providing an appropriate [extension registration](https://github.com/gardener/gardener-extension-shoot-networking-problemdetector/blob/main/example/controller-registration.yaml) in the garden cluster.

Here it is possible to decide whether the extension should be always available for all shoots or whether the extension must be separately enabled per shoot.

If the extension should automatically be used for all shoots the `autoEnable` field should be set to `[shoot]`.

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: ControllerRegistration
...
spec:
  resources:
    - kind: Extension
      type: shoot-networking-problemdetector
      autoEnable: [shoot]
```

### ControllerRegistration
An example of a `ControllerRegistration` for the `shoot-networking-problemdetector` can be found at [controller-registration.yaml](https://github.com/gardener/gardener-extension-shoot-networking-problemdetector/blob/master/example/controller-registration.yaml).

The `ControllerRegistration` contains a Helm chart which eventually deploys the `shoot-networking-problemdetector` to seed clusters. It offers some configuration options, mainly to set up a static filter list or provide the configuration for downloading the filter list from a service endpoint.

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: ControllerDeployment
...
  values:
    #networkProblemDetector:
    #  defaultPeriod: 30s
```

### Enablement for a Shoot

If the shoot network problem detector is not globally enabled by default (depends on the extension registration on the garden cluster), it can be enabled per shoot. To enable the service for a shoot, the shoot manifest must explicitly add the `shoot-networking-problemdetector` extension.

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
...
spec:
  extensions:
    - type: shoot-networking-problemdetector
...
```

If the shoot network problem detector is globally enabled by default, it can be disabled per shoot. To disable the service for a shoot, the shoot manifest must explicitly state it.

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
...
spec:
  extensions:
    - type: shoot-networking-problemdetector
      disabled: true
...
```
