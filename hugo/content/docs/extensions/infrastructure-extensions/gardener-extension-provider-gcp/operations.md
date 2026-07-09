---
github_repo: 'https://github.com/gardener/gardener-extension-provider-gcp'
github_subdir: docs/operations
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/infrastructure-extensions/gardener-extension-provider-gcp/operations.md
  to: operations.md
persona: Operators
title: Operations
prev: false
next: false
managed: true
---

# Using the GCP provider extension with Gardener as operator

The [`core.gardener.cloud/v1beta1.CloudProfile` resource](https://github.com/gardener/gardener/blob/master/example/30-cloudprofile.yaml) declares a `providerConfig` field that is meant to contain provider-specific configuration.
The [`core.gardener.cloud/v1beta1.Seed` resource](https://github.com/gardener/gardener/blob/master/example/50-seed.yaml) is structured similarly.
Additionally, it allows configuring settings for the backups of the main etcds' data of shoot clusters control planes running in this seed cluster.

This document explains the necessary configuration for this provider extension.

## `CloudProfile` resource

This section describes, how the configuration for `CloudProfile`s looks like for GCP by providing an example `CloudProfile` manifest with minimal configuration that can be used to allow the creation of GCP shoot clusters.

### `CloudProfileConfig`

The cloud profile configuration contains information about the real machine image IDs in the GCP environment (image URLs).

You have to map every version that you specify in `.spec.machineImages[].versions` here such that the GCP extension knows the image URL for every version you want to offer.

#### NEW: MachineCapabilities

With the introduction of `spec.machineCapabilities` in Gardener *v1.131.0*, you can define capability-based matching between machine images and machine types. This enables fine-grained control over which images can be used with which machine types.

**Purpose and Behavior:**

The `machineCapabilities` feature allows you to:
- Define available capabilities and their values in the CloudProfile (e.g., `architecture`, `gpu`, `hypervisorType`)
- Associate machine images with specific capability combinations via `capabilityFlavors`
- Optionally restrict machine types to specific capabilities via `machineTypes.capabilities`

**Default & Override Behavior:**

The capability system uses **automatic defaulting** from `.spec.machineCapabilities`:

- **`.spec.machineCapabilities`**: Defines all available capability keys and their possible values (e.g., `architecture: [amd64, arm64]`, `gpu: [enabled, disabled]`)
- Any capability **not explicitly specified** in `.spec.machineImages[].versions[].capabilityFlavors[].capabilities` or `.spec.machineTypes[].capabilities` automatically gets **all values** from `.spec.machineCapabilities`
- If no capabilities are defined all will be defaulted.

**Required Capability:**

Always required is the architecture capability:
- `architecture`: `amd64` and `arm64` (specifies the CPU architecture of the machine on which given machine image can be used)

But any other capability can be mapped here as well, e.g. `gpu`, `hypervisortype`, etc. with any value that makes sense for your environment.

An example `CloudProfileConfig` for the GCP extension looks as follows:

```yaml
apiVersion: gcp.provider.extensions.gardener.cloud/v1alpha1
kind: CloudProfileConfig
machineImages:
- name: gardenlinux
  versions:
  - version: 1877.5.0
    capabilityFlavors:
    - image: projects/sap-se-gcp-gardenlinux/global/images/gardenlinux-f03494b5e33cba13-1877-5-7a907e4e
      capabilities:
        architecture: [amd64]
    - image: projects/sap-se-gcp-gardenlinux/global/images/gardenlinux-e4c18db54c0e1287-1877-5-7a907e4e
      capabilities:
        architecture: [arm64]
```

#### Old format
For each machine image version an `architecture` field can be specified which specifies the CPU architecture of the machine on which given machine image can be used.

An example `CloudProfileConfig` for the GCP extension looks as follows:

```yaml
apiVersion: gcp.provider.extensions.gardener.cloud/v1alpha1
kind: CloudProfileConfig
machineImages:
- name: coreos
  versions:
  - version: 2135.6.0
    image: projects/coreos-cloud/global/images/coreos-stable-2135-6-0-v20190801
    # architecture: amd64 # optional
```

### Example `CloudProfile` manifest

If you want to allow that shoots can create VMs with local SSDs volumes then you have to specify the type of the disk with `SCRATCH` in the `.spec.volumeTypes[]` list.
Please find below an example `CloudProfile` manifest:

#### New: with `spec.machineCapabilities`:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: CloudProfile
metadata:
  name: gcp
spec:
  type: gcp
  machineCapabilities:
    - name: architecture
      values:
        - amd64
        - arm64
    - name: your-capability
      values:
        - value1
        - value2
        - value3
  kubernetes:
    versions:
    - version: 1.33.0
    - version: 1.32.2
      expirationDate: "2026-03-31T23:59:59Z"
  machineImages:
  - name: gardenlinux
    versions:
    - version: 1877.5.0
      capabilityFlavors:
      - architecture: [amd64]
        your-capability: [value1, value2]
      - architecture: [arm64]
  machineTypes:
  - name: n1-standard-4
    cpu: "4"
    gpu: "0"
    memory: 15Gi
    capabilities:
      architecture: [amd64]
      your-capability: [value1, value3]
  volumeTypes:
  - name: pd-standard
    class: standard
  - name: pd-ssd
    class: premium
  - name: SCRATCH
    class: standard
  regions:
  - region: europe-west1
    names:
    - europe-west1-b
    - europe-west1-c
    - europe-west1-d
  providerConfig:
    apiVersion: gcp.provider.extensions.gardener.cloud/v1alpha1
    kind: CloudProfileConfig
    machineImages:
      - name: gardenlinux
        versions:
          - version: 1877.5.0
            capabilityFlavors:
              - image: projects/sap-se-gcp-gardenlinux/global/images/gardenlinux-f03494b5e33cba13-1877-5-7a907e4e
                capabilities:
                  architecture: [amd64]
                  your-capability: [value1, value2]
              - image: projects/sap-se-gcp-gardenlinux/global/images/gardenlinux-e4c18db54c0e1287-1877-5-7a907e4e
                capabilities:
                  architecture: [arm64]
```
#### Without `spec.machineCapabilities`:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: CloudProfile
metadata:
  name: gcp-legacy
spec:
  type: gcp
  kubernetes:
    versions:
      - version: 1.33.0
      - version: 1.32.2
        expirationDate: "2026-03-31T23:59:59Z"
  machineImages:
    - name: gardenlinux
      versions:
        - version: 1877.5.0
          architectures:
            - amd64
            - arm64
  machineTypes:
    - name: n1-standard-4
      cpu: "4"
      gpu: "0"
      memory: 15Gi
  volumeTypes:
    - name: pd-standard
      class: standard
    - name: pd-ssd
      class: premium
  regions:
    - name: europe-west1
      zones:
        - name: europe-west1-b
        - name: europe-west1-c
        - name: europe-west1-d
  providerConfig:
    apiVersion: gcp.provider.extensions.gardener.cloud/v1alpha1
    kind: CloudProfileConfig
    machineImages:
      - name: gardenlinux
        versions:
          - version: 1877.5.0
            image: projects/sap-se-gcp-gardenlinux/global/images/gardenlinux-f03494b5e33cba13-1877-5-7a907e4e
            architecture: amd64
          - version: 1877.5.0
            image: projects/sap-se-gcp-gardenlinux/global/images/gardenlinux-f03494b5e33cba13-1877-5-7a907e4e
            architecture: amd64
```

## `Seed` resource

This provider extension does not support any provider configuration for the `Seed`'s `.spec.provider.providerConfig` field.
However, it supports to managing of backup infrastructure, i.e., you can specify a configuration for the `.spec.backup` field.

### Backup configuration

A Seed of type `gcp` can be configured to perform backups for the main etcds' of the shoot clusters control planes using Google Cloud Storage buckets.

The location/region where the backups will be stored defaults to the region of the Seed (`spec.provider.region`), but can also be explicitly configured via the field `spec.backup.region`.
The region of the backup can be different from where the seed cluster is running.
However, usually it makes sense to pick the same region for the backup bucket as used for the Seed cluster.

Please find below an example `Seed` manifest (partly) that configures backups using Google Cloud Storage buckets.

```yaml
---
apiVersion: core.gardener.cloud/v1beta1
kind: Seed
metadata:
  name: my-seed
spec:
  provider:
    type: gcp
    region: europe-west1
  backup:
    provider: gcp
    region: europe-west1 # default region
    credentialsRef:
      apiVersion: v1
      kind: Secret
      name: backup-credentials
      namespace: garden
  ...
```

An example of the referenced secret containing the credentials for the GCP Cloud storage can be found in the [example folder](https://github.com/gardener/gardener-extension-provider-gcp/blob/master/example/30-etcd-backup-secret.yaml).

#### Permissions for GCP Cloud Storage

Please make sure the service account associated with the provided credentials has the IAM role [Storage Admin](https://cloud.google.com/storage/docs/access-control/iam-roles).

### Rolling Update Triggers

Changes to the `Shoot` worker-pools are applied in-place where possible.
In case this is not possible a rolling update of the workers will be performed to apply the new configuration,
as outlined in [the Gardener documentation](/docs/gardener/shoot-operations/shoot_updates/#in-place-vs-rolling-updates).
The exact fields that trigger this behaviour depend on whether the feature gate `NewWorkerPoolHash` is enabled.
If it is not enabled, only the fields mentioned in the [Gardener doc](/docs/gardener/shoot-operations/shoot_updates/#rolling-update-triggers) plus the providerConfig are used.
If the feature gate *is* enabled, it's the same with a few additions:

- `.spec.provider.workers[].dataVolumes[].name`
- `.spec.provider.workers[].dataVolumes[].size`
- `.spec.provider.workers[].dataVolumes[].type`

We exclude `.spec.provider.workers[].dataVolumes[].encrypted` from the hash calculation because GCP disks are encrypted by default,
and the field does not influence disk encryption behavior.
Everything related to disk encryption is handled by the providerConfig.

## BackupBucket

Gardener manages `etcd` backups for Shoot clusters using provider-specific backup storage solutions.
On GCP, this storage is implemented through [Google Cloud Storage (GCS) buckets](https://cloud.google.com/storage/docs/buckets#buckets), which store snapshots of the cluster’s `etcd` data.

The `BackupBucket` resource abstracts the backup infrastructure, enabling Gardener and its extension controllers to manage it seamlessly.
This abstraction allows Gardener to create, delete, and maintain backup buckets across various cloud providers in a standardized manner.

The `BackupBucket` resource includes a `spec` field, which defines the configuration details for the backup bucket.
These details include:

- The region where the bucket should be created.
- A reference to the secret containing credentials for accessing the cloud provider.
- A `providerConfig` field for provider-specific configurations.

### BackupBucketConfig

The `BackupBucketConfig` represents the configuration for a backup bucket.
- It includes an optional immutability configuration that enforces retention policies on the backup bucket.
- It includes an optional configuration to override the endpoint at which the GCS bucket is hosted at. This information is passed to the `Etcd` resource.

The Gardener extension provider for GCP supports creating and managing immutable backup buckets by leveraging the [bucket lock](https://cloud.google.com/storage/docs/bucket-lock) feature.
Immutability ensures that once data is written to the bucket, it cannot be modified or deleted for a specified period.
This feature is crucial for protecting backups from accidental or malicious deletion, ensuring data safety and availability for restoration.

Here is an example configuration for `BackupBucketConfig`:

```yaml
apiVersion: gcp.provider.extensions.gardener.cloud/v1alpha1
kind: BackupBucketConfig
immutability:
  retentionType: bucket
  retentionPeriod: "24h"
  locked: false
store:
  endpointOverride: "https://storage.me-central2.rep.googleapis.com/storage/v1/"
```

- **`retentionType`**: Specifies the type of retention policy.
  The allowed value is `bucket`, which applies the retention policy to the entire bucket.
  For more details, refer to the [documentation](https://cloud.google.com/storage/docs/bucket-lock).
- **`retentionPeriod`**: Defines the duration for which objects in the bucket will remain immutable.
  The value should follow GCP-supported formats, such as `"24h"` for 24 hours.
  Refer to [retention period formats](https://cloud.google.com/storage/docs/bucket-lock#retention-periods) for more information.
  The minimum retention period is **24 hours**.
- **`locked`**: A boolean indicating whether the retention policy is locked.
  Once locked, the policy cannot be removed or shortened, ensuring immutability.
  Learn more about locking policies [here](https://cloud.google.com/storage/docs/bucket-lock#policy-locks).
- **`endpointOverride`**: Specifies the endpoint at which the GCS bucket is hosted.

To configure a `BackupBucket` with immutability, include the `BackupBucketConfig` in the `providerConfig` of the `BackupBucket` resource.
If the `locked` field is set to `true`, the retention policy will be locked, preventing the retention policy from being removed and the retention period from being reduced.
However, it's still possible to increase the retention period.

Here is an example of configuring a `BackupBucket` with immutability:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: BackupBucket
metadata:
  name: my-backup-bucket
spec:
  provider:
    type: gcp
    region: europe-west1
  credentialsRef:
    apiVersion: v1
    kind: Secret
    name: my-gcp-secret
    namespace: my-namespace
  providerConfig:
    apiVersion: gcp.provider.extensions.gardener.cloud/v1alpha1
    kind: BackupBucketConfig
    immutability:
      retentionType: bucket
      retentionPeriod: 24h
      locked: true
```
