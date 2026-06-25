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
  - maxCapacity: 5Gi
    scaleUp:
      utilizationThresholdPercent: 80
      stepPercent: 100
      minStepAbsolute: 1Gi
      cooldownDuration: 10m
```

This tells the autoscaler: "Watch all PVCs belonging to the `prometheus` `StatefulSet`. When any of them exceeds 80% storage or inode usage, double its size. Don't resize again for at least 10 minutes."

## Key Features in v0.2.0

### StatefulSet Support

Previously, the pvc-autoscaler could only target individual `PersistentVolumeClaims`. With v0.2.0, you can target `StatefulSets` (and any other workload controller supporting the scale subresource) directly. The controller automatically discovers all PVCs associated with the workload and manages them collectively.

### Volume Policies

The new `.spec.volumePolicies` array gives fine-grained control over scaling behavior:

- **`maxCapacity`** - the maximum allowed size for a PVC. Once this limit is reached, no further scaling will occur
- **`scaleUp.utilizationThresholdPercent`** - trigger resize when used space or inodes exceed this percentage
- **`scaleUp.stepPercent`** - how much to grow the volume (100 = double the size)
- **`scaleUp.minStepAbsolute`** - the minimum absolute storage increase that must be applied during a scaling operation
- **`scaleUp.cooldownDuration`** - minimum time between consecutive resizes for the same PVC (important for cloud providers like AWS that limit volume modifications to 4 per 24 hours)

### Rich Status Reporting

The status now provides per-volume recommendations and conditions:

```yaml
status:
  conditions:
  - type: Resizing
    status: "True"
    reason: ResizeInProgress
    lastTransitionTime: "2025-08-07T11:59:54Z"
    message: |
      Some PersistentVolumeClaims are being resized:
      - PVC prometheus-1 is being resized due to passing inodes threshold.
  - type: RecommendationsAvailable
    status: "True"
    reason: RecommendationsProvided
    lastTransitionTime: "2025-08-07T11:59:54Z"
    message: Recommendations have been provided for all PersistentVolumeClaims.
  volumeRecommendations:
  - persistentVolumeClaimName: prometheus-0
    usedByPods: ["prometheus-0"]
    current:
      usedBytesPercentage: 30
      usedInodesPercentage: 20
      size: 4Gi
    target:
      size: 4Gi
  - persistentVolumeClaimName: prometheus-1
    usedByPods: ["prometheus-1"]
    current:
      usedBytesPercentage: 90
      usedInodesPercentage: 70
      size: 3Gi
    target:
      size: 4Gi
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
