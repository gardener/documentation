---
title: "New Emergency Brake for Gardener Shoot Reconciliations"
linkTitle: "New Emergency Brake for Gardener Shoot Reconciliations"
newsSubtitle: August 27, 2025
publishdate: 2025-08-27
authors:
- avatar: https://avatars.githubusercontent.com/LucaBernstein
  login: LucaBernstein
  name: Luca Bernstein
aliases: ["/blog/2025/08/27/new-emergency-brake-for-gardener-shoot-reconciliations"]
---

In large-scale Kubernetes landscapes, ensuring stability during updates is paramount. A faulty configuration or update can propagate quickly, potentially impacting numerous clusters. To provide operators with a powerful tool to mitigate such risks, Gardener has introduced an emergency stop mechanism for `Shoot` reconciliations.

### How It Works

Operators can now temporarily halt all reconciliation activities for `Shoot` clusters on a specific `Seed` by applying a simple annotation. This acts as an emergency brake, preventing further changes from being rolled out to the clusters managed by that `Seed`.

To activate the emergency stop for a `Seed`, apply the following annotation:

```bash
kubectl annotate seed <seed-name> shoot.gardener.cloud/emergency-stop-reconciliations=true
```

In a critical situation where you need to stop reconciliations across your entire landscape, you can annotate all `Seed` resources at once:

```bash
kubectl annotate seed --all shoot.gardener.cloud/emergency-stop-reconciliations=true
```

### Effects of the Emergency Stop

When the `shoot.gardener.cloud/emergency-stop-reconciliations=true` annotation is active on a `Seed`, the following effects take place:

*   **Paused Reconciliations:** The `Shoot` controller will not reconcile any existing `Shoot` clusters managed by the annotated `Seed`. This effectively freezes the clusters in their current state, preventing any new, potentially harmful, updates from being applied.
*   **Scheduling Prevention:** The Gardener scheduler will not assign new `Shoot` clusters to the affected `Seed`.
*   **Status Indication:** A new condition, `EmergencyStopShootReconciliations`, will be added to the `Seed`'s status. This provides clear visibility that the emergency stop is active.

### Resuming Operations

To resume normal operations, you can simply remove the annotation or set its value to `false`.

It is important to note that once the annotation is removed, `Shoot` clusters are **not** reconciled immediately. Instead, reconciliation will resume for each cluster during its next regularly scheduled reconciliation window. This prevents a sudden "thundering herd" of reconciliations and allows for a controlled return to normal operations.

### A Word of Caution

This feature is designed strictly for emergency situations to prevent widespread issues. It should be used with care and not as part of regular operational procedures, as pausing reconciliations for extended periods can lead to clusters becoming stale and out of sync.

### Further Reading

*   [Watch the recording](https://youtu.be/K15fRoS2WVs?t=783)
*   [GitHub Pull Request #12712](https://github.com/gardener/gardener/pull/12712)