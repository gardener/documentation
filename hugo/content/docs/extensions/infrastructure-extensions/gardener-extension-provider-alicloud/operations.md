---
github_repo: 'https://github.com/gardener/gardener-extension-provider-alicloud'
github_subdir: docs/operations
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/operations.md
  to: operations.md
persona: Operators
title: Operations
prev: false
next: false
managed: true
---

# Using the Alicloud provider extension with Gardener as operator

The [`core.gardener.cloud/v1beta1.CloudProfile` resource](https://github.com/gardener/gardener/blob/master/example/30-cloudprofile.yaml) declares a `providerConfig` field that is meant to contain provider-specific configuration.
The [`core.gardener.cloud/v1beta1.Seed` resource](https://github.com/gardener/gardener/blob/master/example/50-seed.yaml) is structured similarly.
Additionally, it allows configuring settings for the backups of the main etcds' data of shoot clusters control planes running in this seed cluster.

This document explains the necessary configuration for this provider extension. In addition, this document also describes how to enable the use of customized machine images for Alicloud.

## `CloudProfile` resource

This section describes, how the configuration for `CloudProfile` looks like for Alicloud by providing an example `CloudProfile` manifest with minimal configuration that can be used to allow the creation of Alicloud shoot clusters.

### `CloudProfileConfig`

The cloud profile configuration contains information about the real machine image IDs in the Alicloud environment (AMIs).
You have to map every version that you specify in `.spec.machineImages[].versions` here such that the Alicloud extension knows the AMI for every version you want to offer.

#### NEW: MachineCapabilities
With the introduction of `spec.machineCapabilities` in Gardener *v1.131.0* you have to map every `capabilityFlavor` in `.spec.machineImages[].versions` here to an available VM image in your subscription.

The Alicloud extension currently supports only the `architecture` capability, and only `amd64` is available.

Two formats are supported in `providerConfig.machineImages[].versions[]`:

**Legacy / flat format** — each version entry has a flat `regions[]` list with `name`/`id` pairs. Use this format when `spec.machineCapabilities` is not defined.

```yaml
apiVersion: alicloud.provider.extensions.gardener.cloud/v1alpha1
kind: CloudProfileConfig
machineImages:
- name: gardenlinux
  versions:
  - version: 1877.13.0
    regions:
    - name: cn-shanghai
      id: m-uf6hvbrxclop1jtat17m
    - name: cn-hangzhou
      id: m-bp11yg724jupyxgcv61j
```

**CapabilityFlavors format** — each version entry has a `capabilityFlavors[]` list, where each flavor specifies a `capabilities` map and its own `regions[]` list. This format is required when `spec.machineCapabilities` is defined (introduced in Gardener v1.131.0). Versions that apply to all capability combinations can still use the flat `regions[]` form alongside flavored entries (mixed mode).

```yaml
apiVersion: alicloud.provider.extensions.gardener.cloud/v1alpha1
kind: CloudProfileConfig
machineImages:
- name: gardenlinux
  versions:
  - version: 1877.13.0
    capabilityFlavors:
    - capabilities:
        architecture:
        - amd64
      regions:
      - name: cn-shanghai
        id: m-uf6hvbrxclop1jtat17m
```

#### Transitioning to the capabilityFlavors format

When `spec.machineCapabilities` is added to a `CloudProfile`, the mixed mode allows a gradual migration: newer image versions can use `capabilityFlavors` while older versions retain the flat `regions[]` format. The mixed mode is a transitional state — the goal is to move all versions to `capabilityFlavors` over time.

```yaml
apiVersion: alicloud.provider.extensions.gardener.cloud/v1alpha1
kind: CloudProfileConfig
machineImages:
- name: gardenlinux
  versions:
  - version: 1877.13.0          # new version: uses capabilityFlavors
    capabilityFlavors:
    - capabilities:
        architecture:
        - amd64
      regions:
      - name: cn-shanghai
        id: m-uf6hvbrxclop1jtat17m
  - version: 1877.10.0          # old version: still uses legacy flat format
    regions:
    - name: cn-shanghai
      id: m-uf63n3zty62esx53qolr
    - name: cn-hangzhou
      id: m-bp196lsdf3k91xp2wtco
```

### Example `CloudProfile` manifest

#### Legacy format (without `machineCapabilities`)

Please find below an example `CloudProfile` manifest using the legacy flat image mapping format:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: CloudProfile
metadata:
  name: alicloud
spec:
  type: alicloud
  kubernetes:
    versions:
    - version: 1.33.0
    - version: 1.32.0
      expirationDate: "2026-03-31T23:59:59Z"
  machineImages:
  - name: coreos
    versions:
    - version: 2023.4.0
  machineTypes:
  - name: ecs.sn2ne.large
    cpu: "2"
    gpu: "0"
    memory: 8Gi
  volumeTypes:
  - name: cloud_efficiency
    class: standard
  - name: cloud_essd
    class: premium
  regions:
  - name: eu-central-1
    zones:
    - name: eu-central-1a
    - name: eu-central-1b
  providerConfig:
    apiVersion: alicloud.provider.extensions.gardener.cloud/v1alpha1
    kind: CloudProfileConfig
    machineImages:
    - name: coreos
      versions:
      - version: 2023.4.0
        regions:
        - name: eu-central-1
          id: coreos_2023_4_0_64_30G_alibase_20190319.vhd
```

#### New format (with `machineCapabilities`)

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: CloudProfile
metadata:
  name: alicloud
spec:
  type: alicloud
  machineCapabilities:
  - name: architecture
    values:
    - amd64
  kubernetes:
    versions:
    - version: 1.32.0
    - version: 1.31.1
      expirationDate: "2026-03-31T23:59:59Z"
  machineImages:
  - name: gardenlinux
    updateStrategy: minor
    versions:
    - architectures:
      - amd64
      capabilityFlavors:
      - architecture:
        - amd64
      classification: preview
      cri:
      - containerRuntimes:
        - type: gvisor
        name: containerd
      version: 1877.13.0
  machineTypes:
  - architecture: amd64
    capabilities:
      architecture:
      - amd64
    cpu: "8"
    gpu: "0"
    memory: 32Gi
    name: ecs.g6.2xlarge
    usable: true
  volumeTypes:
  - class: standard
    name: cloud_efficiency
    usable: true
  - class: premium
    name: cloud_ssd
    usable: true
  - class: premium
    name: cloud_essd
    usable: true
  regions:
  - name: cn-shanghai
    zones:
    - name: cn-shanghai-e
    - name: cn-shanghai-f
    - name: cn-shanghai-g
  providerConfig:
    apiVersion: alicloud.provider.extensions.gardener.cloud/v1alpha1
    kind: CloudProfileConfig
    machineImages:
    - name: gardenlinux
      versions:
      - version: 1877.13.0
        capabilityFlavors:
        - capabilities:
            architecture:
            - amd64
          regions:
          - name: cn-shanghai
            id: m-uf6hvbrxclop1jtat17m
          - id: m-bp1aywhq0kit1x5xgyc8
            name: cn-hangzhou
```

## Enable customized machine images for the Alicloud extension

Customized machine images can be created for an Alicloud account and shared with other Alicloud accounts.
The same customized machine image has different image ID in different regions on Alicloud.
If you need to enable `encrypted system disk`, you must provide customized machine images.
Administrators/Operators need to explicitly declare them per imageID per region as below:

```yaml
machineImages:
- name: customized_coreos
  regions:
  - imageID: <image_id_in_eu_central_1>
    region: eu-central-1
  - imageID: <image_id_in_cn_shanghai>
    region: cn-shanghai
  ...
  version: 2191.4.1
...
```

End-users have to have the permission to use the customized image from its creator Alicloud account. To enable end-users to use customized images, the images are shared from Alicloud account of Seed operator with end-users' Alicloud accounts. Administrators/Operators need to explicitly provide Seed operator's Alicloud account access credentials (base64 encoded) as below:

```yaml
machineImageOwnerSecret:
  name: machine-image-owner
  accessKeyID: <base64_encoded_access_key_id>
  accessKeySecret: <base64_encoded_access_key_secret>
```

As a result, a Secret named `machine-image-owner` by default will be created in namespace of Alicloud provider extension.

Operators should also maintain custom image IDs which are to be shared with end-users as below:

```yaml
toBeSharedImageIDs:
- <image_id_1>
- <image_id_2>
- <image_id_3>
```

### Example `ControllerDeployment` manifest for enabling customized machine images

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: ControllerDeployment
metadata:
  name: extension-provider-alicloud
spec:
  type: helm
   providerConfig:
    chart: |
      H4sIFAAAAAAA/yk...
    values:
      config:
        machineImageOwnerSecret:
          accessKeyID: <base64_encoded_access_key_id>
          accessKeySecret: <base64_encoded_access_key_secret>
        toBeSharedImageIDs:
        - <image_id_1>
        - <image_id_2>
        ...
        machineImages:
        - name: customized_coreos
          regions:
          - imageID: <image_id_in_eu_central_1>
            region: eu-central-1
          - imageID: <image_id_in_cn_shanghai>
            region: cn-shanghai
          ...
          version: 2191.4.1
        ...
        csi:
          enableADController: true
      resources:
        limits:
          cpu: 500m
          memory: 1Gi
        requests:
          memory: 128Mi
```

## `Seed` resource

This provider extension does not support any provider configuration for the `Seed`'s `.spec.provider.providerConfig` field.
However, it supports to managing of backup infrastructure, i.e., you can specify a configuration for the `.spec.backup` field.

### Backup configuration

A Seed of type `alicloud` can be configured to perform backups for the main etcds' of the shoot clusters control planes using Alicloud [Object Storage Service](https://www.alibabacloud.com/help/doc-detail/31817.htm).

The location/region where the backups will be stored defaults to the region of the Seed (`spec.provider.region`).

Please find below an example `Seed` manifest (partly) that configures backups using Alicloud Object Storage Service.

```yaml
---
apiVersion: core.gardener.cloud/v1beta1
kind: Seed
metadata:
  name: my-seed
spec:
  provider:
    type: alicloud
    region: cn-shanghai
  backup:
    provider: alicloud
    credentialsRef:
      apiVersion: v1
      kind: Secret
      name: backup-credentials
      namespace: garden
  ...
```
An example of the referenced secret containing the credentials for the Alicloud Object Storage Service can be found in the [example folder](https://github.com/gardener/gardener-extension-provider-alicloud/blob/master/example/30-etcd-backup-secret.yaml).

#### Permissions for Alicloud Object Storage Service

Please make sure the RAM user associated with the provided AccessKey pair has the following permission.
- AliyunOSSFullAccess
