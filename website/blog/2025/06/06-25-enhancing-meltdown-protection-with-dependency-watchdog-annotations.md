---
title: "Enhancing Meltdown Protection with Dependency-Watchdog Annotations"
linkTitle: "Enhancing Meltdown Protection with Dependency-Watchdog Annotations"
newsSubtitle: June 25, 2025
publishdate: 2025-06-25
authors:
- avatar: https://avatars.githubusercontent.com/ashwani2k
  login: ashwani2k
  name: Ashwani Kumar
aliases: ["/blog/2025/06/25/enhancing-meltdown-protection-with-dependency-watchdog-annotations"]
---

Gardener's `dependency-watchdog` is a crucial component for ensuring cluster stability. During infrastructure-level outages where worker nodes cannot communicate with the control plane, it activates a "meltdown protection" mechanism. This involves scaling down key control plane components like the `machine-controller-manager` (MCM), `cluster-autoscaler` (CA), and `kube-controller-manager` (KCM) to prevent them from taking incorrect actions based on stale information, such as deleting healthy nodes that are only temporarily unreachable.

### The Challenge: Premature Scale-Up During Reconciliation

Previously, a potential race condition could undermine this protection. While `dependency-watchdog` scaled down the necessary components, a concurrent `Shoot` reconciliation, whether triggered manually by an operator or by other events, could misinterpret the situation. The reconciliation logic, unaware that the scale-down was a deliberate protective measure, would attempt to restore the "desired" state by scaling the `machine-controller-manager` and `cluster-autoscaler` back up.

This premature scale-up could have serious consequences. An active `machine-controller-manager`, for instance, might see nodes in an `Unknown` state due to the ongoing outage and incorrectly decide to delete them, defeating the entire purpose of the meltdown protection.

### The Solution: A New Annotation for Clearer Signaling

To address this, Gardener now uses a more explicit signaling mechanism between `dependency-watchdog` and `gardenlet`. When `dependency-watchdog` scales down a deployment as part of its meltdown protection, it now adds the following annotation to the resource:

`dependency-watchdog.gardener.cloud/meltdown-protection-active`

This annotation serves as a clear, persistent signal that the component has been intentionally scaled down for safety.

### How It Works

The `gardenlet` component has been updated to recognize and respect this new annotation. During a `Shoot` reconciliation, before scaling any deployment, `gardenlet` now checks for the presence of the `dependency-watchdog.gardener.cloud/meltdown-protection-active` annotation.

If the annotation is found, `gardenlet` will not scale up the deployment. Instead, it preserves the current replica count set by `dependency-watchdog`, ensuring that the meltdown protection remains effective until the underlying infrastructure issue is resolved and `dependency-watchdog` itself restores the components. This change makes the meltdown protection mechanism more robust and prevents unintended node deletions during any degradation of connectivity between the nodes and control plane.

Additionally on a deployment which has `dependency-watchdog.gardener.cloud/meltdown-protection-active` annotation set, if the operator decides to ignores such a deployment from meltdown consideration by annotating it with `dependency-watchdog.gardener.cloud/ignore-scaling`, then for such deployments `dependency-watchdog` shall remove the `dependency-watchdog.gardener.cloud/meltdown-protection-active` annotation and the deployment shall be considered for scale-up as part of next shoot reconciliation. The operator can also explicitly scale up such a deployment and not wait for the next shoot reconciliation.

### For More Information

To dive deeper into the implementation details, you can review the changes in the corresponding pull request.

*   **[GitHub PR #12272](https://github.com/gardener/gardener/pull/12272)**
*   **[Watch the demo](https://youtu.be/kcXSyloteSs?t=501)**