---
aliases:
  - /docs/gardener/worker_pool_manual_rollout/
github_repo: 'https://github.com/gardener/gardener'
github_subdir: docs/usage/shoot-operations
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/gardener/shoot-operations/worker_pool_manual_rollout.md
  to: worker_pool_manual_rollout.md
persona: Users
title: Worker Pool Manual Rollout
prev: false
next: false
managed: true
---

# Manual Worker Pool Rollout

> [!NOTE]
> This feature is currently only available for worker pools that are **not** configured with one of the `InPlace` update strategies - either `AutoInPlaceUpdate` or `ManualInPlaceUpdate`.

There may be cases when an end-user might want to trigger a manual worker pool rollout.
For example, the [dual-stack migration](/docs/gardener/networking/dual-stack-networking-migration/) requires to roll nodes.
This can be accomplished by annotating the `Shoot` with the `rollout-workers` operation annotation and specifying which worker pools you'd like to be rolled out.

```bash
kubectl -n <shoot-namespace> annotate shoot <shoot-name> 'gardener.cloud/operation=rollout-workers=<pool1-name>[,<pool2-name>,...]'
```

Alternatively, you can use `*` to roll out all worker pools:

```bash
kubectl -n <shoot-namespace> annotate shoot <shoot-name> 'gardener.cloud/operation=rollout-workers=*'
```

This will cause the status field `manualWorkerPoolRollout` to be set on the `Shoot`.
It will keep track of the worker pools that are currently being rolled out.

Example status field:
```yaml
    manualWorkerPoolRollout:
      pendingWorkersRollouts:
      - lastInitiationTime: "2025-10-17T14:38:13Z"
        name: local
```
