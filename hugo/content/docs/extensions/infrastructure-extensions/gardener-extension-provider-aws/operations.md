---
github_repo: 'https://github.com/gardener/gardener-extension-provider-aws'
github_subdir: docs/operations
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/infrastructure-extensions/gardener-extension-provider-aws/operations.md
  to: operations.md
persona: Operators
title: Operations
prev: false
next: false
managed: true
---

# Using the AWS provider extension with Gardener as operator

The [`core.gardener.cloud/v1beta1.CloudProfile` resource](https://github.com/gardener/gardener/blob/master/example/30-cloudprofile.yaml) declares a `providerConfig` field that is meant to contain provider-specific configuration.
Similarly, the [`core.gardener.cloud/v1beta1.Seed` resource](https://github.com/gardener/gardener/blob/master/example/50-seed.yaml) is structured.
Additionally, it allows to configure settings for the backups of the main etcds' data of shoot clusters control planes running in this seed cluster.

This document explains what is necessary to configure for this provider extension.

## `CloudProfile` resource

In this section we are describing how the configuration for `CloudProfile`s looks like for AWS and provide an example `CloudProfile` manifest with minimal configuration that you can use to allow creating AWS shoot clusters.

### `CloudProfileConfig`

The cloud profile configuration contains information about the real machine image IDs in the AWS environment (AMIs).
With the introduction of `spec.machineCapabilities` in Gardener *v1.131.0* you have to map every `capabilityFlavor` in `.spec.machineImages[].versions` here such that the AWS extension knows the AMI for every flavor you want to offer.

If the `spec.machineCapabilities` field is not used in the `CloudProfile`, the legacy `architectures` field in `.spec.machineImages[].versions` is used.
You have to map every version that you specify in `.spec.machineImages[].versions` here such that the AWS extension knows the AMI for every version you want to offer.
For each AMI an `architecture` field can be specified which specifies the CPU architecture of the machine on which given machine image can be used.

An example `CloudProfileConfig` for the AWS extension looks as follows:

```yaml
## With `spec.machineCapabilities` in `CloudProfile`
apiVersion: aws.provider.extensions.gardener.cloud/v1alpha1
kind: CloudProfileConfig
machineImages:
  - name: coreos
    versions:
      - version: 2135.6.0
        capabilityFlavors:
          - capabilities:
              architecture: [amd64]
            # otherCapability: [otherValue, ...] # optional
            regions:
              - name: eu-central-1
                ami: ami-034fd8c3f4026eb39
          - capabilities:
              architecture: [arm64]
            # otherCapability: [otherValue, ...] # optional
            regions:
              - name: eu-central-1
                ami: ami-034fd8c3f4026eb38

---
## Without `spec.machineCapabilities` in `CloudProfile`
apiVersion: aws.provider.extensions.gardener.cloud/v1alpha1
kind: CloudProfileConfig
machineImages:
  - name: coreos
    versions:
      - version: 2135.6.0
        regions:
          - name: eu-central-1
            ami: ami-034fd8c3f4026eb39
            # architecture: amd64 # optional
```

### Example `CloudProfile` manifest

Please find below an example `CloudProfile` manifest:

```yaml
# With `spec.machineCapabilities`in ``CloudProfile`
apiVersion: core.gardener.cloud/v1beta1
kind: CloudProfile
metadata:
  name: aws
spec:
  machineCapabilities:
  - name: architecture
    values: [ amd64, arm64 ]
#  - name: otherCapability
#    values:
#    - otherValue
#    - anotherValue
#    - yetAnotherValue
  type: aws
  kubernetes:
    versions:
    - version: 1.34.1
    - version: 1.33.4
      expirationDate: "2023-10-31T23:59:59Z"
  machineImages:
  - name: coreos
    versions:
    - version: 2135.6.0
      capabilityFlavors:
      - architecture: [amd64]
      # otherCapability: [otherValue, ...] 
      - architecture: [arm64]
      # otherCapability: [otherValue, ...]
  machineTypes:
  - name: m5.large
    cpu: "2"
    gpu: "0"
    memory: 8Gi
    usable: true
    capabilities:
      architecture: [amd64]
      # otherCapability: [otherValue, ...]
  volumeTypes:
  - name: gp2
    class: standard
    usable: true
  - name: io1
    class: premium
    usable: true
  regions:
  - name: eu-central-1
    zones:
    - name: eu-central-1a
    - name: eu-central-1b
    - name: eu-central-1c
  providerConfig:
    apiVersion: aws.provider.extensions.gardener.cloud/v1alpha1
    kind: CloudProfileConfig
    machineImages:
    - name: coreos
      versions:
      - version: 2135.6.0
        capabilityFlavors:
        - capabilities:
            architecture: [amd64]
          # otherCapability: [otherValue, ...] # optional
          regions:
          - name: eu-central-1
            ami: ami-034fd8c3f4026eb39
        - capabilities:
            architecture: [arm64]
          # otherCapability: [otherValue, ...] # optional
          regions:
          - name: eu-central-1
            ami: ami-034fd8c3f4026eb38

# Without `spec.machineCapabilities` in `CloudProfile`
apiVersion: core.gardener.cloud/v1beta1
kind: CloudProfile
metadata:
  name: aws
spec:
  type: aws
  kubernetes:
    versions:
    - version: 1.34.1
    - version: 1.33.4
      expirationDate: "2023-10-31T23:59:59Z"
  machineImages:
  - name: coreos
    versions:
    - version: 2135.6.0
  machineTypes:
  - name: m5.large
    cpu: "2"
    gpu: "0"
    memory: 8Gi
    usable: true
  volumeTypes:
  - name: gp2
    class: standard
    usable: true
  - name: io1
    class: premium
    usable: true
  regions:
  - name: eu-central-1
    zones:
    - name: eu-central-1a
    - name: eu-central-1b
    - name: eu-central-1c
  providerConfig:
    apiVersion: aws.provider.extensions.gardener.cloud/v1alpha1
    kind: CloudProfileConfig
    machineImages:
    - name: coreos
      versions:
      - version: 2135.6.0
        regions:
        - name: eu-central-1
          ami: ami-034fd8c3f4026eb39
          # architecture: amd64 # optional

```

## `Seed` resource

This provider extension does not support any provider configuration for the `Seed`'s `.spec.provider.providerConfig` field.
However, it supports to manage backup infrastructure, i.e., you can specify configuration for the `.spec.backup` field.

### Backup configuration

Please find below an example `Seed` manifest (partly) that configures backups.
As you can see, the location/region where the backups will be stored can be different to the region where the seed cluster is running.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: backup-credentials
  namespace: garden
type: Opaque
data:
  accessKeyID: base64(access-key-id)
  secretAccessKey: base64(secret-access-key)
---
apiVersion: core.gardener.cloud/v1beta1
kind: Seed
metadata:
  name: my-seed
spec:
  provider:
    type: aws
    region: eu-west-1
  backup:
    provider: aws
    region: eu-central-1
    credentialsRef:
      apiVersion: v1
      kind: Secret
      name: backup-credentials
      namespace: garden
  ...
```

Please look up https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys as well.

## BackupBucket

Gardener manages `etcd's` backups for Shoot clusters using provider specific storage solutions. On AWS, this storage is implemented through [AWS S3](https://aws.amazon.com/s3/), which store the backups/snapshots of the `etcd's` cluster data.

The `BackupBucket` resource abstracts the backup infrastructure, enabling Gardener and its extension controllers to manage it seamlessly. This abstraction allows Gardener to create, delete, and maintain backup buckets across various cloud providers in a standardized manner.

The `BackupBucket` resource includes a `spec` field, which defines the configuration details for the backup bucket. These details include:

- A `region` is reference to a region where the bucket should be created.
- A `credentialsRef` is reference to a Secret or WorkloadIdentity resource representing credentials for accessing the cloud provider.
- A `type` field defines the storage provider type like aws, azure etc.
- A `providerConfig` field defines provider specific configurations.

### BackupBucketConfig

The `BackupBucketConfig` describes the configuration that needs to be passed over for creation of the backup bucket infrastructure. Configuration for immutability feature a.k.a [object lock](https://aws.amazon.com/s3/features/object-lock/) in S3 that can be set on the bucket are specified in `BackupBucketConfig`.

Immutability feature (WORM, i.e. write-once-read-many model) ensures that once backups is written to the bucket, it will prevent locked object versions from being permanently deleted, hence it cannot be modified or deleted for a specified period. This feature is crucial for protecting backups from accidental or malicious deletion, ensuring data safety and availability for restoration.

> [!Note]
> With enabling S3 object lock, S3 versioning will also get enabled.

The Gardener extension provider for AWS supports creating bucket (and enabling already existing buckets if immutability configured) to use [object lock](https://aws.amazon.com/s3/features/object-lock/) feature provided by storage provider AWS S3.

Here is an example configuration for `BackupBucketConfig`:

```yaml
apiVersion: aws.provider.extensions.gardener.cloud/v1alpha1
kind: BackupBucketConfig
immutability:
  retentionType: bucket
  retentionPeriod: 24h
  mode: compliance
```

- **`retentionType`**: Specifies the type of retention policy. Currently, S3 supports object lock on `bucket` level as well as on `object` level. The allowed value is `bucket`, which applies the retention policy and retention period to the entire bucket. For more details, refer to the [documentation](https://aws.amazon.com/s3/features/object-lock/). Objects in the bucket will inherit the retention period which is set on the bucket. Please refer [here](https://github.com/gardener/etcd-backup-restore/blob/master/docs/usage/enabling_immutable_snapshots.md#s3-object-lock-and-working-with-snapshots) to see working of backups/snapshots with immutable feature.
- **`retentionPeriod`**: Defines the duration for which object version in the bucket will remain immutable. AWS S3 only supports immutability durations in days or years, therefore this field must be set as multiple of 24h.
- **`mode`**: Defines the mode for object locked enabled S3 bucket, S3 provides two retention modes that apply different levels of protection to objects:
  1. **Governance mode**: Users with special permissions can overwrite, delete or alter object versions during retention period.
  1. **Compliance mode**: No users(including root user) can overwrite, delete or alter object versions during retention period.

To configure a `BackupBucket` with immutability feature, include the `BackupBucketConfig` in the `.spec.providerConfig` of the `BackupBucket` resource.

Here is an example of configuring a `BackupBucket` S3 object lock with retentionPeriod set to `24h` i.e `1 Day` and with mode `Compliance`.

```yaml
apiVersion: extensions.gardener.cloud/v1alpha1
kind: BackupBucket
metadata:
  name: my-backup-bucket
spec:
  type: aws
  region: eu-west-1
  secretRef:
    name: my-aws-secret
    namespace: my-namespace
  providerConfig:
    apiVersion: aws.provider.extensions.gardener.cloud/v1alpha1
    kind: BackupBucketConfig
    immutability:
      retentionType: bucket
      retentionPeriod: 24h
      mode: compliance
```

> [!Note]
> Once S3 Object Lock is enabled, it cannot be disabled, nor can S3 versioning. However, you can remove the default retention settings by removing the `BackupBucketConfig` from `.spec.providerConfig`.

#### Permissions for AWS IAM user

Please make sure that the provided credentials have the correct privileges. You can use the following AWS IAM policy document and attach it to the IAM user backed by the credentials you provided (please check the [official AWS documentation](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage.html) as well):

<details>
  <summary>Click to expand the AWS IAM policy document!</summary>

```json
{
"Version": "2012-10-17",
"Statement": [
  {
    "Effect": "Allow",
    "Action": "s3:*",
    "Resource": "*"
  }
]
}
```

</details>

### Rolling Update Triggers

Changes to the `Shoot` worker-pools are applied in-place where possible.
In case this is not possible a rolling update of the workers will be performed to apply the new configuration, as outlined in [the Gardener documentation](/docs/gardener/shoot-operations/shoot_updates/#in-place-vs-rolling-updates).
The exact fields that trigger this behavior are defined in the [Gardener doc](/docs/gardener/shoot-operations/shoot_updates/#rolling-update-triggers), with a few additions:

- `.spec.provider.workers[].providerConfig`
- `.spec.provider.workers[].volume.encrypted`
- `.spec.provider.workers[].dataVolumes[].size` (only the affected worker pool)
- `.spec.provider.workers[].dataVolumes[].type` (only the affected worker pool)
- `.spec.provider.workers[].dataVolumes[].encrypted` (only the affected worker pool)

For now, if the feature gate `NewWorkerPoolHash` *is* enabled, the same fields are used.
This behavior might change once MCM supports in-place volume updates.
If updateStrategy *is* set to `inPlace` and `NewWorkerPoolHash` *is* enabled,
all the fields mentioned above except of the providerConifg are used.

If in-place-updates are enabled for a worker-pool, then updates to the fields that trigger rolling updates will be disallowed.

## Feature Gates

The `gardener-extension-provider-aws` controller supports the following feature gates, which can be configured via `.config.featureGates` in the Helm values:

| Feature Gate | Default | Description |
| --- | --- | --- |
| `MTUCustomizer` | `true` | Controls whether the `mtu-customizer` DaemonSet and its ConfigMap are deployed on the seed cluster. The DaemonSet sets the MTU of non-virtual network interfaces on seed nodes to `1460`. Disable this feature gate to prevent the DaemonSet from being deployed for all seeds managed by this controller. Note: per-shoot MTU customization on worker nodes is controlled separately via the `enableMTUCustomizer` field in `InfrastructureConfig`. |

Example Helm values to disable the feature gate:

```yaml
config:
  featureGates:
    MTUCustomizer: false
```
