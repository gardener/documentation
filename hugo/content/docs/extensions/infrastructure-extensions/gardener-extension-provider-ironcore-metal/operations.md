---
github_repo: 'https://github.com/ironcore-dev/gardener-extension-provider-ironcore-metal'
github_subdir: docs/operations
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/infrastructure-extensions/gardener-extension-provider-ironcore-metal/operations.md
  to: operations.md
persona: Operators
title: Operations
prev: false
next: false
---
<!-- BANNER:MANAGED -->
<!--
   █▀▀ ▀█▀ █▀█ █▀█
   ▀▀█  █  █ █ █▀▀
   ▀▀▀  ▀  ▀▀▀ ▀

   ┌────────────────────────────────────────────────┐
   │  MANAGED FILE — aggregated from upstream       │
   │                                                │
   │  Editing here is pointless: The nightly        │
   │  aggregation run overwrites this file.         │
   │                                                │
   │  Open a PR against the source instead: ─────┐  │
   │                          ┌──┐    ┌──────────┘  │
   │                          └──│────┘             │
   │           ┌─────────────────┘                  │
   └───────────│────────────────────────────────────┘
               ▼               
   https://github.com/ironcore-dev/gardener-extension-provider-ironcore-metal/blob/main/docs/operations/operations.md
-->


# Using the metal provider extension with Gardener as operator

The [`core.gardener.cloud/v1beta1.CloudProfile` resource](https://github.com/gardener/gardener/blob/master/example/30-cloudprofile.yaml)
declares a `providerConfig` field that is meant to contain provider-specific configuration.
The [`core.gardener.cloud/v1beta1.Seed` resource](https://github.com/gardener/gardener/blob/master/example/50-seed.yaml)
is structured similarly. Additionally, it allows configuring settings for the backups of the main etcd's data of shoot
clusters control planes running in this seed cluster.

This document explains the necessary configuration for this provider extension.

## `CloudProfile` resource

This section describes, how the configuration for `CloudProfile`s looks like for `metal` by providing an example
`CloudProfile` manifest with minimal configuration that can be used to allow the creation of `metal` shoot clusters.

### `CloudProfileConfig`

The cloud profile configuration contains information about the real machine image IDs in the `metal` environment.
You have to map every version that you specify in `.spec.machineImages[].versions` here such that the `metal` extension
knows the location of the OCI image artefact for every version you want to offer. For each machine image version an
`architecture` field can be specified which specifies the CPU architecture of the machine on which given machine image
can be used.

An example `CloudProfileConfig` for the `metal` extension looks as follows:

```yaml
apiVersion: metal.provider.extensions.gardener.cloud/v1alpha1
kind: CloudProfileConfig
machineImages:
  - name: gardenlinux
    versions:
      - version: 1.0.0
        image: registry/images/gardenlinux:version-tag
        # architecture: amd64 # optional
```

### Example `CloudProfile` manifest

Please find below an example `CloudProfile` manifest:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: CloudProfile
metadata:
  name: metal
spec:
  type: metal
  kubernetes:
    versions:
    - version: 1.34.0
    - version: 1.33.0
  machineImages:
    - name: gardenlinux
      versions:
        - version: 1.0.0
          cri:
            - name: containerd
  machineTypes:
    - name: x3-xlarge
      cpu: "4"
      gpu: "0"
      memory: 8Gi
      storage:
        class: standard
        type: default
        size: 20Gi     
      usable: true
      architecture: amd64 # optional
  volumeTypes:
    - name: general-purpose
      class: standard
      usable: true
    - name: io-optimized
      class: premium
      usable: true
  regions:
  - region: my-region
    names:
    - my-zone-a
    - my-zone-b
    - my-zone-c
  providerConfig:
    apiVersion: metal.provider.extensions.gardener.cloud/v1alpha1
    kind: CloudProfileConfig
    regionConfigs:
    - name: my-region
      server: https://metal-api-server
      certificateAuthorityData: >-
        abcd12345
    storageClasses:
      default:                 # default StorageClass for shoot
        name: default          # name of the StorageClass in the Shoot
        type: general-purpose  # name of the VolumeClass
      additional:              # additional StorageClasses for shoot
      - name: additional-sc    # name of the StorageClass in the Shoot
        type: general-purpose  # name of the VolumeClass
    machineImages:
      - name: gardenlinux
        versions:
          - version: 1.0.0
            image: registry/images/gardenlinux:version-tag
            architecture: amd64
```

## `Seed` resource

This provider extension supports configuration for the `Seed`'s `.spec.provider.type` field.

Please find below an example `Seed` manifest that configures Seed cluster.

```yaml
---
apiVersion: core.gardener.cloud/v1beta1
kind: Seed
metadata:
  name: my-seed
spec:
  provider:
    type: metal
  ...
```

## `Shoot` resource

This provider extension supports configuration for the `Shoot` cluster resource.
`.spec.provider.workers` field is a list of worker groups.
`.spec.provider.networking.nodes` field is the CIDR of the entire node network.

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
  name: my-shoot
  namespace: my-namespace
spec:
  cloudProfileName: metal
  credentialsBindingName: my-credentials
  region: my-region
  networking:
    type: calico
    nodes: 10.1.0.0/16
  provider:
    infrastructureConfig:
      apiVersion: metal.provider.extensions.gardener.cloud/v1alpha1
      kind: InfrastructureConfig
    type: metal
    workers:
      - name: pool1
        machine:
          type: x3-xlarge
        volume:
          type: general-purpose
          size: 20Gi
        cri:
          name: containerd
        minimum: 1
        maximum: 1
        maxSurge: 1
        maxUnavailable: 0
        zones:
          - my-zone-a
          - my-zone-b
          - my-zone-c
  kubernetes:
    version: 1.34.0
```
