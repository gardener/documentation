---
title: "Machine Preservation on Failure in Gardener"
linkTitle: "Machine Preservation on Failure in Gardener"
newsSubtitle: July 23, 2026
publishdate: 2026-07-23
authors:
- avatar: https://avatars.githubusercontent.com/thiyyakat
  login: thiyyakat
tags:
- feature-announcement
- node-management
- autoscaling
aliases: ["/blog/2026/07/23/machine-preservation-on-failure-in-gardener"]
---

When a node fails in a Kubernetes cluster, the normal response is immediate replacement: Machine Controller Manager (MCM) terminates the failed machine and creates a new one. This is the right default for self-healing clusters, but it leaves operators with a narrow window — or none at all — to investigate what went wrong.

Gardener v1.147 integrates [MCM's machine preservation feature](https://github.com/gardener/gardener/blob/master/docs/usage/shoot/shoot_machine_preservation.md), giving operators the ability to retain failed machines in the `Failed` phase for a configurable period so they can collect logs, inspect state, and perform root-cause analysis before the machine disappears.

## How It Works

Machine preservation keeps a failed machine alive instead of terminating it. The node is cordoned (no new pod scheduling), all non-DaemonSet pods are drained, and a `scale-down-disabled` annotation is added to prevent the Cluster Autoscaler from removing it. The machine remains in this state until either the issue resolves itself (transitioning back to `Running`) or the preservation timeout expires.

There are two modes:

- **Automatic preservation**: MCM preserves failed machines up to a configured limit per worker pool, without any manual intervention.
- **Manual preservation**: An operator annotates a specific machine or node with `node.machine.sapcloud.io/preserve=when-failed` before or at failure time.

## Configuration

Both fields are set per worker pool under `spec.provider.workers[].machineControllerManager`:

```yaml
spec:
  provider:
    workers:
    - name: worker-pool-1
      minimum: 1
      maximum: 5
      machineControllerManager:
        autoPreserveFailedMachineMax: 2
        machinePreserveTimeout: 72h
```

- **`autoPreserveFailedMachineMax`**: the maximum number of failed machines MCM will auto-preserve concurrently in this worker pool. Defaults to `0` (disabled). For worker pools that host system components, the value must be at most `maximum - 1`.
- **`machinePreserveTimeout`**: how long a machine stays preserved before MCM automatically terminates it. Defaults to `96h` if not set.

## Shoot-Level Visibility

Gardener exposes preservation state transparently in the Shoot status so operators always know what is happening:

**`PreservedFailedMachinesAbsent` constraint**: Set to `False` whenever any `MachineDeployment` has preserved failed machines, with a count of how many. This makes reduced availability immediately visible without requiring operators to inspect individual machines.

**`EveryNodeReady` condition**: Failures attributable to preserved nodes are reported with a `(node and backing machine preserved by MCM)` suffix rather than triggering an immediate early return, so real issues on non-preserved nodes are surfaced first.

**`SystemComponentsHealthy` condition**: DaemonSet health failures caused entirely by pods on preserved nodes are suppressed, provided there are no other system component failures. This prevents a single intentionally-failed node from turning the cluster health red.

## Cluster Autoscaler Integration

When `autoPreserveFailedMachineMax` is set on any worker pool, Gardener configures the Cluster Autoscaler with `--max-total-unready-percentage=100`. This disables the CA's cluster-health guard, which would otherwise suppress scale-up when too many nodes are unready — ensuring that workload evicted from preserved nodes can still trigger new nodes to be provisioned.

## Limitations to Keep in Mind

- Preservation is skipped during rolling updates and shoot hibernation.
- Preserved machines count toward the MachineDeployment's desired replica count — availability is reduced while a machine is preserved.
- `kubectl delete machine` or `kubectl delete node` still deletes the machine regardless of preservation state.
- Preservation of machines for nodes that never registered requires Kubernetes ≥ v1.34.

## Further Reading

- [📽️ Recording (Review Meeting 2026/07/22)](https://youtu.be/Xs5TbQjLBKY?t=390)
- [Shoot Machine Preservation documentation](https://github.com/gardener/gardener/blob/master/docs/usage/shoot/shoot_machine_preservation.md)
- [gardener/gardener#14767](https://github.com/gardener/gardener/pull/14767)
