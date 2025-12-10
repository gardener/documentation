---
title: "Manually Trigger Worker Pool Rollouts"
linkTitle: "Manually Trigger Worker Pool Rollouts"
newsSubtitle: November 19, 2025
publishdate: 2025-11-19
authors:
- avatar: https://avatars.githubusercontent.com/rrhubenov
  login: rrhubenov
  name: rhubenov
aliases: ["/blog/2025/11/19/manually-trigger-worker-pool-rollouts"]
---

Gardener is introducing a new capability that allows users to manually trigger a rollout for specific worker pools on demand. This provides a level of control similar to `kubectl rollout restart deployment` but for the nodes in a Shoot cluster's worker pools.

This feature is particularly useful in scenarios that require a deliberate node replacement, such as the migration to a dual-stack network configuration, which necessitates a node rollout to apply networking changes that cannot be done in-place.

### How to Trigger a Rollout

You can initiate a manual rollout by adding a specific annotation to your `Shoot` resource. The annotation key is `gardener.cloud/operation`, and the value should be `rollout-workers=` followed by a comma-separated list of the worker pool names you wish to roll out.

To roll out a single worker pool named `pool-1`:
```bash
kubectl -n <shoot-namespace> annotate shoot <shoot-name> 'gardener.cloud/operation=rollout-workers=pool-1'
```

To roll out multiple pools, simply list them:
```bash
kubectl -n <shoot-namespace> annotate shoot <shoot-name> 'gardener.cloud/operation=rollout-workers=pool-1,pool-2'
```

You can also use a wildcard (`*`) to trigger a rollout for all worker pools in the Shoot simultaneously. Note that the annotation value should be quoted to prevent the shell from interpreting the wildcard.
```bash
kubectl -n <shoot-namespace> annotate shoot <shoot-name> 'gardener.cloud/operation=rollout-workers=*'
```

Once the operation is accepted, Gardener adds an annotation to the corresponding `MachineDeployment` resource(s). This action signals the Machine Controller Manager (MCM) to begin the rolling update process, which terminates old machines and creates new ones to replace them.

### Tracking the Rollout Status

When a rollout is triggered, Gardener updates the Shoot's status to reflect the ongoing operation. A new field, `manualWorkerPoolRollout`, is added to the `.status` block, listing the worker pools that are pending rollout.

Here is an example of what the status looks like:
```yaml
status:
  manualWorkerPoolRollout:
    pendingWorkersRollouts:
    - lastInitiationTime: "2025-10-17T14:38:13Z"
      name: local
```

### Important Limitations

This on-demand rollout feature is designed for worker pools that use a rolling update strategy. It is **not compatible** with worker pools configured to use an `InPlace` update strategy (`AutoInPlaceUpdate` or `ManualInPlaceUpdate`). The in-place strategy is designed to avoid node recreation, which directly conflicts with the goal of a manual rollout. An attempt to trigger a rollout on a worker pool with an in-place update strategy will be rejected.

### Resources

*   [Recording: On-Demand Worker Pool Rollout Trigger](https://youtu.be/oehF0Uoe7lg?t=2595)
*   [GitHub Pull Request: Worker pool rollout v2](https://github.com/gardener/gardener/pull/12829)