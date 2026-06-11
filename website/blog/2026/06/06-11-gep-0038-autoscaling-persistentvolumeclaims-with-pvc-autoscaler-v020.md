---
title: "GEP-0038: Autoscaling PersistentVolumeClaims with pvc-autoscaler v0.2.0"
linkTitle: "GEP-0038: Autoscaling PersistentVolumeClaims with pvc-autoscaler v0.2.0"
newsSubtitle: June 11, 2026
publishdate: 2026-06-11
authors:
- avatar: https://avatars.githubusercontent.com/plkokanov
  login: plkokanov
  name: Plamen Kokanov
tags:
- feature-announcement
aliases: ["/blog/2026/06/11/gep-0038-autoscaling-persistentvolumeclaims-with-pvc-autoscaler-v020"]
---

Managing storage in Kubernetes is a manual affair. `PersistentVolumeClaims` don't grow on their own — operators must either over-provision from the start (wasting resources on underutilized clusters) or manually resize when things get tight (risking downtime on busy ones). In large Gardener landscapes with hundreds of monitoring stacks, this doesn't scale.

[GEP-0038](https://github.com/gardener/pvc-autoscaler/releases/tag/v0.2.0) tackles this with the **pvc-autoscaler** — a controller that watches volume usage metrics from Prometheus and automatically resizes `PersistentVolumeClaims` before they run full.

## The Problem

Gardener deploys Prometheus, Vali, and VictoriaMetrics across seed and shoot clusters. On large seeds, monitoring volumes frequently run out of space, limiting metric retention to as little as 14 days. Smaller clusters, on the other hand, sit with gigabytes of unused provisioned storage. Both cases are wasteful — one in capacity, the other in cost.

Manual intervention doesn't scale when you're managing thousands of clusters.

## The Solution: PersistentVolumeClaimAutoscaler

The `pvc-autoscaler` v0.2.0 introduces a redesigned API modeled after VPA and HPA. You create a `PersistentVolumeClaimAutoscaler` resource that targets a workload controller (any resource supporting the scale subresource), and the controller automatically discovers and scales all associated `PersistentVolumeClaims`.

Here's what a typical `PersistentVolumeClaimAutoscaler` looks like:

```yaml
apiVersion: autoscaling.gardener.cloud/v1alpha1
kind: PersistentVolumeClaimAutoscaler
metadata:
  name: prometheus-pvca
  namespace: monitoring
spec:
  targetRef:
    apiVersion: apps/v1
    kind: StatefulSet
    name: prometheus
  volumePolicies:
  - storageThresholdPercentage: 80
    inodesThresholdPercentage: 80
    stepPercent: 100
    cooldownDuration: 10m
```

This tells the autoscaler: "Watch all PVCs belonging to the `prometheus` StatefulSet. When any of them exceeds 80% storage or inode usage, double its size. Don't resize again for at least 10 minutes."

## Key Features in v0.2.0

### StatefulSet Support

Previously, the pvc-autoscaler could only target individual `PersistentVolumeClaims`. With v0.2.0, you can target `StatefulSets` (and any other workload controller supporting the scale subresource) directly. The controller automatically discovers all PVCs associated with the workload and manages them collectively.

### Volume Policies

The new `.spec.volumePolicies` array gives fine-grained control over scaling behavior:

- **`storageThresholdPercentage`** — trigger resize when used space exceeds this percentage
- **`inodesThresholdPercentage`** — trigger resize when inode usage exceeds this percentage
- **`stepPercent`** — how much to grow the volume (100 = double the size)
- **`cooldownDuration`** — minimum time between consecutive resizes for the same PVC (important for cloud providers like AWS that limit volume modifications to 4 per 24 hours)

### Rich Status Reporting

The status now provides per-volume recommendations and conditions:

```yaml
status:
  conditions:
  - type: RecommendationsAvailable
    status: "True"
  - type: Resizing
    status: "True"
    message: "Resizing PVC from 1Gi to 2Gi (storage threshold exceeded)"
  volumeRecommendations:
  - persistentVolumeClaimName: data-prometheus-0
    currentSize: 2Gi
    targetSize: 2Gi
    usedSpacePercentage: 50
```

Operators can see at a glance which volumes are being resized, why (storage vs. inodes), and what the current utilization looks like.

### Direct PVC Targeting

For workloads that don't use StatefulSets (e.g., a standalone Pod with a PVC), you can still target a `PersistentVolumeClaim` directly — the old behavior is preserved.

## What's Next

The pvc-autoscaler is being integrated into Gardener's core infrastructure to manage monitoring volumes across seeds automatically. Future work includes glob/regex matching in volume policies for more selective scaling, and eventually offering PVC autoscaling as a feature for shoot cluster users as well (tracked in a separate GEP).

## Further Reading

- [Review Meeting Recording (demo)](https://youtu.be/iX9tPbZOuPk?t=1233)
- [pvc-autoscaler v0.2.0 Release](https://github.com/gardener/pvc-autoscaler/releases/tag/v0.2.0)
- [StatefulSet Support PR](https://github.com/gardener/pvc-autoscaler/pull/233)
- [New targetRef API](https://github.com/gardener/pvc-autoscaler/pull/135)
- [Volume Recommendations Status](https://github.com/gardener/pvc-autoscaler/pull/151)
