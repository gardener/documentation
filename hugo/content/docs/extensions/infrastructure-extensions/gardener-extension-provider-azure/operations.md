---
github_repo: 'https://github.com/gardener/gardener-extension-provider-azure'
github_subdir: docs/operations
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/operations.md
  to: operations.md
persona: Operators
title: Operations
prev: false
next: false
managed: true
---

# Using the Azure provider extension with Gardener as an operator

The [`core.gardener.cloud/v1beta1.CloudProfile` resource](https://github.com/gardener/gardener/blob/master/example/30-cloudprofile.yaml) declares a `providerConfig` field that is meant to contain provider-specific configuration.
The [`core.gardener.cloud/v1beta1.Seed` resource](https://github.com/gardener/gardener/blob/master/example/50-seed.yaml) is structured similarly.
Additionally, it allows configuring settings for the backups of the main etcds' data of shoot clusters control planes running in this seed cluster.

This document explains the necessary configuration for the Azure provider extension.

## `CloudProfile` resource

This section describes, how the configuration for `CloudProfile`s looks like for Azure by providing an example `CloudProfile` manifest with minimal configuration that can be used to allow the creation of Azure shoot clusters.

### `CloudProfileConfig`

The cloud profile configuration contains information about the real machine image IDs in the Azure environment (image `urn`, `id`, `communityGalleryImageID` or `sharedGalleryImageID`).

The VM image can be either from the [Azure Marketplace](https://azuremarketplace.microsoft.com/en-us/marketplace/apps?filters=virtual-machine-images) and will then get identified via a `urn`, it can be a custom VM image from a shared image gallery and is then identified  `sharedGalleryImageID`, or it can be from a community image gallery and is then identified by its `communityGalleryImageID`. You can use `id` field also to specifiy the image location in the azure compute gallery (in which case it would have a different kind of path) but it is not recommended as it sometimes faces problems in cross subscription image sharing.

You have to map every version that you specify in `.spec.machineImages[].versions` to an available VM image in your subscription.

#### NEW: MachineCapabilities

With the introduction of `spec.machineCapabilities` in Gardener *v1.131.0*, you can define capability-based matching between machine images and machine types. This enables fine-grained control over which images can be used with which machine types.

**Purpose and Behavior:**

The `machineCapabilities` feature allows you to:
- Define available capabilities and their values in the CloudProfile (e.g., `architecture`, `azure-networking`)
- Associate machine images with specific capability combinations via `capabilityFlavors`
- Optionally restrict machine types to specific capabilities via `machineTypes.capabilities`

**Default & Override Behavior:**

The capability system uses **automatic defaulting** from `.spec.machineCapabilities`:

- **`.spec.machineCapabilities`**: Defines all available capability keys and their possible values (e.g., `architecture: [amd64, arm64]`, `azure-networking: [basic, accelerated]`)
- Any capability **not explicitly specified** in `.spec.machineImages[].versions[].capabilityFlavors[].capabilities` or `.spec.machineTypes[].capabilities` automatically gets **all values** from `.spec.machineCapabilities`
- If no capabilities are defined all will be defaulted.

**Required Capability:**

Always required is the architecture capability:
- `architecture`: `amd64` and `arm64` (specifies the CPU architecture of the machine on which given machine image can be used)

But any other capability can be mapped here as well, e.g.:
- `azure-networking`: `basic` and `accelerated` (specifies if the machine image supports [Azure Accelerated Networking](https://docs.microsoft.com/en-us/azure/virtual-network/create-vm-accelerated-networking-cli))

An example `CloudProfileConfig` for the Azure extension looks as follows:

```yaml
apiVersion: azure.provider.extensions.gardener.cloud/v1alpha1
kind: CloudProfileConfig
countUpdateDomains:
- region: westeurope
  count: 5
countFaultDomains:
- region: westeurope
  count: 3
machineImages:
- name: coreos
  versions:
  - version: 2135.6.0
    capabilityFlavors:
    - urn: "CoreOS:CoreOS:Stable:2135.6.0"
      capabilities:
        architecture: [amd64]
        azure-networking: [basic,accelerated]
- name: ImageWithMultipleCapabilityFlavors
  versions:
  - version: 1.0.0
    capabilityFlavors:
    - id: "/subscriptions/<subscription ID where the gallery is located>/resourceGroups/myGalleryRG/providers/Microsoft.Compute/galleries/myGallery/images/myImageDefinition/versions/1.0.0"
      capabilities:
        architecture: [amd64]
        azure-networking: [basic]
    - communityGalleryImageID: "/CommunityGalleries/gardenlinux-567905d8-921f-4a85-b423-1fbf4e249d90/Images/gardenlinux/Versions/576.1.1"
      capabilities:
        architecture: [amd64]
        azure-networking: [accelerated]
    - sharedGalleryImageID: "/SharedGalleries/sharedGalleryName/Images/sharedGalleryImageName/Versions/sharedGalleryImageVersionName"
      capabilities:
        architecture: [arm64]
        azure-networking: [accelerated]
```

#### Old format

For each machine image version an `architecture` field can be specified which specifies the CPU architecture of the machine on which given machine image can be used.

An example `CloudProfileConfig` for the Azure extension looks as follows:

```yaml
apiVersion: azure.provider.extensions.gardener.cloud/v1alpha1
kind: CloudProfileConfig
countUpdateDomains:
- region: westeurope
  count: 5
countFaultDomains:
- region: westeurope
  count: 3
machineTypes:
- name: Standard_D3_v2
  acceleratedNetworking: true
- name: Standard_X
machineImages:
- name: coreos
  versions:
  - version: 2135.6.0
    urn: "CoreOS:CoreOS:Stable:2135.6.0"
#    architecture: amd64 # optional
    acceleratedNetworking: true
- name: myimage
  versions:
  - version: 1.0.0
    id: "/subscriptions/<subscription ID where the gallery is located>/resourceGroups/myGalleryRG/providers/Microsoft.Compute/galleries/myGallery/images/myImageDefinition/versions/1.0.0"
- name: GardenLinuxCommunityImage
  versions:
  - version: 1.0.0
    communityGalleryImageID: "/CommunityGalleries/gardenlinux-567905d8-921f-4a85-b423-1fbf4e249d90/Images/gardenlinux/Versions/576.1.1"
- name: SharedGalleryImageName
  versions:
    - version: 1.0.0
      sharedGalleryImageID: "/SharedGalleries/sharedGalleryName/Images/sharedGalleryImageName/Versions/sharedGalleryImageVersionName"
```

The cloud profile configuration contains information about the update via `.countUpdateDomains[]` and failure domain via `.countFaultDomains[]` counts in the Azure regions you want to offer.

The `.machineTypes[]` list contain provider specific information to the machine types e.g. if the machine type support [Azure Accelerated Networking](https://docs.microsoft.com/en-us/azure/virtual-network/create-vm-accelerated-networking-cli), see `.machineTypes[].acceleratedNetworking`.

Additionally, it contains the real machine image identifiers in the Azure environment. You can provide either URN for Azure Market Place images or id of [Shared Image Gallery](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/shared-image-galleries) images.
When Shared Image Gallery is used, you have to ensure that the image is available in the desired regions and the end-user subscriptions have access to the image or to the whole gallery.
You have to map every version that you specify in `.spec.machineImages[].versions` here such that the Azure extension knows the machine image identifiers for every version you want to offer.
Furthermore, you can specify for each image version via `.machineImages[].versions[].acceleratedNetworking` if Azure Accelerated Networking is supported.

### Example `CloudProfile` manifest

The possible values for `.spec.volumeTypes[].name` on Azure are `Standard_LRS`, `StandardSSD_LRS` and `Premium_LRS`. There is another volume type called `UltraSSD_LRS` but this type is not supported to use as os disk. If an end user select a volume type whose name is not equal to one of the valid values then the machine will be created with the default volume type which belong to the selected machine type. Therefore it is recommended to configure only the valid values for the `.spec.volumeType[].name` in the `CloudProfile`.

Please find below an example `CloudProfile` manifest:

#### New: with `spec.machineCapabilities`:
```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: CloudProfile
metadata:
  name: azure
spec:
  type: azure
  machineCapabilities:
    - name: architecture
      values:
        - amd64
        - arm64
#    - name: azure-networking # optional
#      values:
#        - basic
#        - accelerated
  kubernetes:
    versions:
    - version: 1.33.0
    - version: 1.32.1
      expirationDate: "2025-10-28T23:59:59Z"
  machineImages:
  - name: coreos
    versions:
    - version: 2135.6.0
      capabilityFlavors:
#      - architecture: [amd64] # optional
#        azure-networking: [accelerated]
      - architecture: [amd64]
#        azure-networking: [basic]
      - architecture: [arm64]
#        azure-networking: [basic, accelerated]
  machineTypes:
  - name: Standard_D3_v2
    cpu: "4"
    gpu: "0"
    memory: 14Gi
    capabilities:
      architecture: [amd64]
      # azure-networking: [accelerated] # optional
  - name: Standard_D4_v3
    cpu: "4"
    gpu: "0"
    memory: 16Gi
    capabilities:
      architecture: [amd64]
      # azure-networking: [accelerated] # optional
  volumeTypes:
  - name: Standard_LRS
    class: standard
    usable: true
  - name: StandardSSD_LRS
    class: premium
    usable: false
  - name: Premium_LRS
    class: premium
    usable: false
  regions:
  - name: westeurope
  providerConfig:
    apiVersion: azure.provider.extensions.gardener.cloud/v1alpha1
    kind: CloudProfileConfig
    machineTypes:
    - name: Standard_D3_v2
      acceleratedNetworking: true
    - name: Standard_D4_v3
    countUpdateDomains:
    - region: westeurope
      count: 5
    countFaultDomains:
    - region: westeurope
      count: 3
    machineImages:
    - name: coreos
      versions:
      - version: 2135.6.0
        capabilityFlavors:
#          - id: "/subscriptions/<subscription ID where the gallery is located>/resourceGroups/myGalleryRG/providers/Microsoft.Compute/galleries/myGallery/images/myImageDefinition/versions/1.0.0"
#            capabilities:
#              architecture: [amd64]
#              azure-networking: [accelerated] # optional
          - communityGalleryImageID: "/CommunityGalleries/gardenlinux-567905d8-921f-4a85-b423-1fbf4e249d90/Images/gardenlinux/Versions/576.1.1"
            capabilities:
              architecture: [amd64]
#              azure-networking: [basic] # optional
          - sharedGalleryImageID: "/SharedGalleries/sharedGalleryName/Images/sharedGalleryImageName/Versions/sharedGalleryImageVersionName"
            capabilities:
              architecture: [arm64]
#              azure-networking: [basic,accelerated] # optional
```

#### Without `spec.machineCapabilities`:
```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: CloudProfile
metadata:
  name: azure
spec:
  type: azure
  kubernetes:
    versions:
    - version: 1.33.0
    - version: 1.32.1
      expirationDate: "2025-10-28T23:59:59Z"
  machineImages:
  - name: coreos
    versions:
    - version: 2135.6.0
  machineTypes:
  - name: Standard_D3_v2
    cpu: "4"
    gpu: "0"
    memory: 14Gi
  - name: Standard_D4_v3
    cpu: "4"
    gpu: "0"
    memory: 16Gi
  volumeTypes:
  - name: Standard_LRS
    class: standard
    usable: true
  - name: StandardSSD_LRS
    class: premium
    usable: false
  - name: Premium_LRS
    class: premium
    usable: false
  regions:
  - name: westeurope
  providerConfig:
    apiVersion: azure.provider.extensions.gardener.cloud/v1alpha1
    kind: CloudProfileConfig
    machineTypes:
    - name: Standard_D3_v2
      acceleratedNetworking: true
    - name: Standard_D4_v3
    countUpdateDomains:
    - region: westeurope
      count: 5
    countFaultDomains:
    - region: westeurope
      count: 3
    machineImages:
    - name: coreos
      versions:
      - version: 2303.3.0
        urn: CoreOS:CoreOS:Stable:2303.3.0
#        architecture: amd64 # optional
        acceleratedNetworking: true
      - version: 2135.6.0
        urn: "CoreOS:CoreOS:Stable:2135.6.0"
#        architecture: amd64 # optional
```

## `Seed` resource

This provider extension does not support any provider configuration for the `Seed`'s `.spec.provider.providerConfig` field.
However, it supports managing of backup infrastructure, i.e., you can specify a configuration for the `.spec.backup` field.

### Backup configuration

A Seed of type `azure` can be configured to perform backups for the main etcds' of the shoot clusters control planes using Azure Blob storage.

The location/region where the backups will be stored defaults to the region of the Seed (`spec.provider.region`), but can also be explicitly configured via the field `spec.backup.region`.
The region of the backup can be different from where the Seed cluster is running.
However, usually it makes sense to pick the same region for the backup bucket as used for the Seed cluster.

Please find below an example `Seed` manifest (partly) that configures backups using Azure Blob storage.

```yaml
---
apiVersion: core.gardener.cloud/v1beta1
kind: Seed
metadata:
  name: my-seed
spec:
  provider:
    type: azure
    region: westeurope
  backup:
    provider: azure
    region: westeurope # default region
    credentialsRef:
      apiVersion: v1
      kind: Secret
      name: backup-credentials
      namespace: garden
  ...
```
The referenced secret has to contain the provider credentials of the Azure subscription.
Please take a look [here](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal) on how to create an Azure Application, Service Principle and how to obtain credentials.
The example below demonstrates how the secret has to look like.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: core-azure
  namespace: garden-dev
type: Opaque
data:
  clientID: base64(client-id)
  clientSecret: base64(client-secret)
  subscriptionID: base64(subscription-id)
  tenantID: base64(tenant-id)
```

#### Permissions for Azure Blob storage

Please make sure the Azure application has the following IAM roles.
- [Contributor](https://docs.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#contributor)

## Miscellaneous

### Gardener managed Service Principals

The operators of the Gardener Azure extension can provide a list of managed service principals (technical users) that can be used for Azure Shoots.
This eliminates the need for users to provide own service principals for their clusters.

The user would need to grant the managed service principal access to their subscription with proper permissions.

As service principals are managed in an Azure Active Directory for each supported Active Directory, an own service principal needs to be provided.

In case the user provides an own service principal in the Shoot secret, this one will be used instead of the managed one provided by the operator.

Each managed service principal will be maintained in a `Secret` like that:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: service-principal-my-tenant
  namespace: extension-provider-azure
  labels:
    azure.provider.extensions.gardener.cloud/purpose: tenant-service-principal-secret
data:
  tenantID: base64(my-tenant)
  clientID: base64(my-service-princiapl-id)
  clientSecret: base64(my-service-princiapl-secret)
type: Opaque
```

The user needs to provide in its Shoot secret a `tenantID` and `subscriptionID`.

The managed service principal will be assigned based on the `tenantID`.
In case there is a managed service principal secret with a matching `tenantID`, this one will be used for the Shoot.
If there is no matching managed service principal secret then the next Shoot operation will fail.

One of the benefits of having managed service principals is that the operator controls the lifecycle of the service principal and can rotate its secrets.

After the service principal secret has been rotated and the corresponding secret is updated, all Shoot clusters using it need to be reconciled or the last operation to be retried.

### Rolling Update Triggers

Changes to the `Shoot` worker-pools are applied in-place where possible.
In case this is not possible a rolling update of the workers will be performed to apply the new configuration,
as outlined in [the Gardener documentation](/docs/gardener/shoot-operations/shoot_updates/#in-place-vs-rolling-updates).
The exact fields that trigger this behavior are defined in the [Gardener doc](/docs/gardener/shoot-operations/shoot_updates/#rolling-update-triggers),
with a few additions:

- `.spec.provider.workers[].providerConfig`
- `.spec.provider.infrastructureConfig.identity`
- `.spec.provider.infrastructureConfig.zoned`
- `.spec.provider.workers[].dataVolumes[].size` (only the affected worker pool)
- `.spec.provider.workers[].dataVolumes[].type` (only the affected worker pool)

Additionally, if the VMO name of a worker pool changes, the worker pool will be rolled.
This can occur if the `countFaultDomains` field in the cloud profile is modified.

For now, if the feature gate `NewWorkerPoolHash` *is* enabled, the exact same fields are used.
This behavior may change once MCM supports in-place updates, such as volume updates.

## BackupBucketConfig

### Immutable Buckets

The extension provides a gated feature currently in alpha called `enableImmutableBuckets`.
To make use of this feature, and enable the extension to react to the configuration below, you will need to set `config.featureGates.enableImmutableBuckets: true` in your helm charts' `values.yaml`. See [values.yaml](https://github.com/gardener/gardener-extension-provider-azure/blob/master/charts/gardener-extension-provider-azure/values.yaml) for an example.
Before enabling this feature, you will need to add additional permissions to your Azure credential. Please check the linked section in [docs/usage/azure-permissions.md](/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/azure-permissions/#microsoftstorage).

`BackupBucketConfig` describes the configuration that needs to be passed over for creation of the backup bucket infrastructure. Configuration like immutability (WORM, i.e. write-once-read-many) that can be set on the bucket are specified here. Objects in the bucket will inherit the immutability duration which is set on the bucket, and they can not be modified or deleted for that duration.

This extension supports creating buckets (and migrating already existing buckets if enabled) to use [container-level WORM policies](https://learn.microsoft.com/en-us/azure/storage/blobs/immutable-container-level-worm-policies).

Example:

```yaml
apiVersion: azure.provider.extensions.gardener.cloud/v1alpha1
kind: BackupBucketConfig
immutability:
  retentionType: "bucket"
  retentionPeriod: 24h
  locked: false
```

Options:

- **`retentionType`**: Specifies the type of retention policy. The allowed value is `bucket`, which applies the retention policy to the entire bucket. See the [documentation](https://learn.microsoft.com/en-us/azure/storage/blobs/immutable-container-level-worm-policies).
- **`retentionPeriod`**: Defines the duration for which objects in the bucket will remain immutable. Azure Blob Storage only supports immutability durations in days, therefore this field must be set as multiples of 24h.
- **`locked`**: A boolean indicating whether the retention policy is locked. Once locked, the policy cannot be removed or shortened, ensuring immutability. Learn more about locking policies [here](https://learn.microsoft.com/en-us/azure/storage/blobs/immutable-policy-configure-container-scope?tabs=azure-portal#lock-a-time-based-retention-policy).

To configure a `BackupBucket` with immutability, include the `BackupBucketConfig` in the `ProviderConfig` of the `BackupBucket` resource. If the `locked` field is set to `true`, the retention policy will be locked, preventing further changes. However, the retention interval can be lengthened for a locked policy up to five times, but it can't be shortened.

Here is an example of configuring a `BackupBucket` with immutability:

```yaml
apiVersion: extensions.gardener.cloud/v1alpha1
kind: BackupBucket
metadata:
  name: my-backup-bucket
spec:
  region: westeurope
  secretRef:
    name: my-azure-secret
    namespace: my-namespace
  providerConfig:
    apiVersion: azure.provider.extensions.gardener.cloud/v1alpha1
    kind: BackupBucketConfig
    immutability:
      retentionType: "bucket"
      retentionPeriod: 24h
      locked: true
```

### Storage Account Key Rotation

Here is an example of configuring a `BackupBucket` configured with key rotation:

```yaml
apiVersion: extensions.gardener.cloud/v1alpha1
kind: BackupBucket
metadata:
  name: my-backup-bucket
spec:
  region: westeurope
  secretRef:
    name: my-azure-secret
    namespace: my-namespace
  providerConfig:
    apiVersion: azure.provider.extensions.gardener.cloud/v1alpha1
    kind: BackupBucketConfig
    rotationConfig:
      rotationPeriodDays:  2
      expirationPeriodDays: 10
```

Storage account key rotation is only enabled when the `rotationConfig` is configured.

A storage account in Azure is always created with 2 different keys.
Every triggered rotation by the `BackupBucket` controller will rotate the key **that is not currently in use**, and update the `BackupBucket` referenced secret to the new key.

In addition *operators* can annotate a `BackupBucket` with `azure.provider.extensions.gardener.cloud/rotate=true` to trigger a key rotation on the **next reconciliation**, regardless of the key's age.

Options:
- **`rotationPeriodDays`**: Defines the period after its creation that a `storage account key` should be rotated.
- **`expirationPeriodDays`**: When specified it will install an expiration policy for keys in the Azure storage account.

> [!WARNING]
> A full rotation (a rotation of both storage account keys) is completed after 2*`rotationPeriod`.
> It is suggested that the `rotationPeriod` is configured at least twice the maintenance interval of the shoots.
> This will ensure that at least one active key is currently used by the etcd-backup pods.
