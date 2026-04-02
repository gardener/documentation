---
title: "Fine-Tune Your Shoot Control Plane Placement with Zone Awareness"
linkTitle: "Fine-Tune Your Shoot Control Plane Placement with Zone Awareness"
newsSubtitle: April 01, 2026
publishdate: 2026-04-01
authors:
- avatar: https://avatars.githubusercontent.com/rfranzke
  email: rafael.franzke@sap.com
  login: rfranzke
  name: Rafael Franzke
tags:
  - feature-announcement
  - high-availability
aliases: ["/blog/2026/04/01/fine-tune-your-shoot-control-plane-placement-with-zone-awareness"]
---

Gardener continuously evolves to provide operators with more granular control over their Kubernetes landscapes. A recent enhancement introduces zone-aware placement for `Shoot` control planes, allowing operators to optimize for latency and reduce cross-zonal traffic costs.

## The Challenge of Random Placement

Previously, when a `Shoot` cluster was scheduled on a multi-zone `Seed`, Gardener would place its control plane in a randomly selected availability zone (AZ) from the `Seed`'s list. While this works for many scenarios, it can be suboptimal for single-zone `Shoot`s or those running on custom infrastructure like OpenStack where AZs have a fixed physical mapping.

In such cases, if a `Shoot`'s worker nodes run in `zone-a` but its control plane is randomly placed in `zone-b`, all communication between them incurs cross-zonal latency and potential data transfer costs.

## Introducing Zone-Aware Placement

To address this, Gardener now offers a new `spec.settings.zoneSelection` field in the `Seed` API. This setting gives operators control over how the control plane's zone is determined, enabling it to be aligned with the `Shoot`'s worker node zones.

This feature primarily affects non-HA `Shoot`s and HA `Shoot`s with a failure tolerance type of `node`, as these are the configurations where the control plane resides in a single AZ. It has no effect on `zone`-type HA `Shoot`s, whose control planes are already spread across multiple zones by design.

The zone assignment occurs during the initial creation of a `Shoot` or when it is restored to a new `Seed`. Retrospectively changing a `Shoot`'s worker zones will not alter the location of its existing control plane.

## `Prefer` vs. `Enforce`: Choose Your Strategy

The `zoneSelection` setting supports two modes:

### `Prefer`

This mode offers a flexible approach. Gardener will attempt to place the control plane in a zone that is common to both the `Shoot`'s worker pools and the `Seed`'s zones. If there is no overlap (for example, due to a zone name mismatch between providers), Gardener falls back to its default behavior of selecting a random zone from the `Seed`.

With `Prefer` mode, scheduling will never fail due to zone mismatches, making it a safe option to enable broadly. The Gardener scheduler will prioritize `Seed`s that have an overlapping zone with the `Shoot`.

### `Enforce`

For stricter control, the `Enforce` mode requires that at least one of the `Shoot`'s worker zones exists on the `Seed`. If a `Shoot` is scheduled and no common zone is found, the control plane reconciliation will fail.

Furthermore, the Gardener scheduler will pre-emptively filter out any `Seed`s in `Enforce` mode that do not have a zone overlap with the `Shoot`'s worker pools, preventing incompatible assignments from the start.

This new capability provides a powerful tool for operators to optimize their cluster topology, particularly in environments where network locality is critical.

---

### Explore Further

*   [Recording: Zone-Aware Shoot Control Plane Placement](https://youtu.be/3-PobAcbtbw?t=1081s)
*   [GitHub Pull Request: Add zone selection setting to `Seed`s](https://github.com/gardener/gardener/pull/14238)