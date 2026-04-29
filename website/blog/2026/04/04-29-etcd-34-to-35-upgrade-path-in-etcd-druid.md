---
title: "etcd 3.4 to 3.5 Upgrade Path in etcd-druid"
linkTitle: "etcd 3.4 to 3.5 Upgrade Path in etcd-druid"
newsSubtitle: April 29, 2026
publishdate: 2026-04-29
authors:
- avatar: https://avatars.githubusercontent.com/rfranzke
  email: rafael.franzke@sap.com
  login: rfranzke
  name: Rafael Franzke
aliases: ["/blog/2026/04/29/etcd-34-to-35-upgrade-path-in-etcd-druid"]
---

Gardener's etcd management component, [etcd-druid](https://github.com/gardener/etcd-druid), now supports upgrading etcd from version 3.4 to 3.5. This capability, introduced behind the `UpgradeEtcdVersion` feature gate in etcd-druid v0.36.3, provides a safe, automated upgrade path with built-in rollback support.

## Why Upgrade to etcd 3.5?

Several factors make this upgrade necessary:

- **End of upstream support** — etcd 3.4 is reaching end of life for stream support.
- **Critical bug fixes** — etcd 3.5 resolves a potential data loss issue in single-member clusters that affected 3.4.
- **Kubernetes compatibility** — Kubernetes 1.31 introduced consistent list from cache, which requires etcd 3.5 (or a higher patch of 3.4) to offload read queries to the watch cache and improve range query performance.
- **Better observability** — etcd 3.5 exposes a serializable health check endpoint and the leader change notify method, enabling more dynamic leader election reporting.

The target version is etcd 3.5.27, chosen because versions below 3.5.24 had a critical bug where subsequent upgrades to 3.6 were broken due to zombie members and corrupted learner membership data.

## How the Upgrade Works

When the `UpgradeEtcdVersion` feature gate is enabled in etcd-druid:

1. **Full snapshot as safety net** — Before rolling the etcd StatefulSet to the new version, etcd-druid creates an `EtcdOpsTask` custom resource that triggers a full snapshot of the etcd data. This is a blocking operation with up to three retry attempts. If it fails, the upgrade halts and requires manual intervention.
2. **Version rollout** — Once the snapshot succeeds, etcd-druid updates the etcd container images in the StatefulSet, rolling out the new version.
3. **No snapshot on hibernation changes** — For etcd instances without backup configured (e.g., etcd-events), the version upgrade proceeds directly without a snapshot.

## Rollback via Downgrade

The upgrade is not a one-way door. If issues arise after upgrading to 3.5, operators can disable the feature gate to trigger a downgrade back to 3.4.34. The downgrade path is supported by the `next-cluster-version-compatible` flag, which was added to the etcd 3.4 ConfigMap template specifically for this purpose. Notably, no full snapshot is taken before downgrade — this is intentional, since the downgrade scenario implies the upgraded state may be problematic and should not be persisted.

## EtcdOpsTask: Out-of-Band Operations for etcd

The upgrade leverages `EtcdOpsTask`, a custom resource introduced in earlier etcd-druid releases for managing out-of-band operations on etcd clusters — operations that don't modify the `Etcd` custom resource spec. These include on-demand full or delta snapshots, quorum loss recovery, and maintenance tasks like defragmentation and compaction.

Previously, these operations were manual multi-step processes with no explicit tracking. `EtcdOpsTask` provides a managed lifecycle with TTL-based cleanup, retry mechanisms, and status tracking through a single reconciliation loop.

## Links

- [Recording (demo starts at 6:13)](https://youtu.be/xUINvwIt9Kk?t=373)
- [PR: Take Full Snapshot via EtcdOpsTask while hibernating and performing etcd version upgrade](https://github.com/gardener/etcd-druid/pull/1300)
- [PR: Add the next-cluster-version-compatible flag to the generated ConfigMap](https://github.com/gardener/etcd-druid/pull/1281)
