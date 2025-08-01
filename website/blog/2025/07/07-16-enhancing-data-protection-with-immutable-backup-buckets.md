---
title: "Enhancing Data Protection with Immutable Backup Buckets"
linkTitle: "Enhancing Data Protection with Immutable Backup Buckets"
newsSubtitle: July 16, 2025
publishdate: 2025-07-16
authors:
- avatar: https://avatars.githubusercontent.com/ishan16696
  login: ishan16696
  name: Ishan Tyagi
aliases: ["/blog/2025/07/16/enhancing-data-protection-with-immutable-backup-buckets"]
---

Gardener has introduced support for immutable backup buckets, a critical feature for enhancing the security and resilience of your Kubernetes clusters. This new capability leverages native cloud provider features to protect your etcd backups from accidental or malicious deletion and modification, helping you meet stringent security and compliance requirements.

### What Are Immutable Backup Buckets?

Immutable backup buckets ensure that once a backup snapshot is written, it cannot be altered or deleted for a predefined retention period. Gardener configures this by applying immutability policies (often called "Object Lock" or "WORM" - Write Once, Read Many) to the backup buckets managed by provider extensions.

When enabled, the provider extension will:

- **Create** new backup buckets with the specified immutability policy.
- **Reconcile** existing buckets to enforce the desired policy.
- **Prevent** any changes that would weaken the policy, such as shortening the retention period or disabling the lock.

It is crucial to understand that once an immutability policy is locked on a bucket, it is irreversible and cannot be shortened, even by an administrator.

### How It Works

The feature is configured on the `Seed` resource. When you enable immutability, the backup objects will inherit the bucket lock settings, and all the backups/snapshots in the bucket will be protected by the immutability policy.

To safeguard against misconfiguration, a Gardener admission webhook enforces the immutability rules. Once a policy is locked, the webhook prevents it from being disabled or the retention period from being shortened.

When a shoot cluster is deleted, Gardener's backup entry controller handles the cleanup. For locked snapshots that cannot be deleted immediately, the controller creates a lifecycle policy on the cloud provider bucket. This policy ensures the snapshots are automatically deleted once their retention period expires.

### How to Enable Immutability

You can enable immutable backups by defining the `immutability` policy within the `.spec.backup.providerConfig` section of your `Seed` manifest. The configuration options may vary slightly between cloud providers.

Below are examples for supported providers:

#### AWS
For AWS, immutability is built on S3 Object Lock and Versioning. You can choose between `compliance` or `governance` mode.

```yaml
# Part of a Seed resource
# ...
spec:
  backup:
    provider: aws
    providerConfig:
      apiVersion: aws.provider.extensions.gardener.cloud/v1alpha1
      kind: BackupBucketConfig
      immutability:
        retentionType: bucket
        retentionPeriod: 96h
        mode: compliance # or governance
```

#### GCP
For GCP, the configuration involves setting a retention period and locking the policy.

```yaml
# Part of a Seed resource
# ...
spec:
  backup:
    provider: gcp
    providerConfig:
      apiVersion: gcp.provider.extensions.gardener.cloud/v1alpha1
      kind: BackupBucketConfig
      immutability:
        retentionType: bucket
        retentionPeriod: 96h
        locked: true
```

#### Azure
The configuration for Azure is similar to GCP, enabling container-level immutability.

```yaml
# Part of a Seed resource
# ...
spec:
  backup:
    provider: azure
    providerConfig:
      apiVersion: azure.provider.extensions.gardener.cloud/v1alpha1
      kind: BackupBucketConfig
      immutability:
        retentionType: bucket
        retentionPeriod: 96h
        locked: true
```

### Further Reading

To learn more about this feature and explore detailed configuration options, check out the following resources:

*   **Recording:** [Watch the presentation on Immutable Backup Buckets](https://youtu.be/NiXCYnrURvU?t=1524)
*   **GitHub Pull Request:** [Add Usage Documentation for Immutable Backup Buckets (#12175)](https://github.com/gardener/gardener/pull/12175)
*   **Provider Documentation:**
    *   [AWS BackupBucketConfig](https://github.com/gardener/gardener-extension-provider-aws/blob/master/docs/usage/usage.md#backupbucketconfig)
    *   [GCP BackupBucketConfig](https://github.com/gardener/gardener-extension-provider-gcp/blob/master/docs/usage/usage.md#backupbucketconfig)
    *   [Azure BackupBucketConfig](https://github.com/gardener/gardener-extension-provider-azure/blob/master/docs/usage/usage.md#backupbucketconfig)
*   **etcd-backup-restore:** [Enabling Immutable Snapshots](https://github.com/gardener/etcd-backup-restore/blob/master/docs/usage/enabling_immutable_snapshots.md)