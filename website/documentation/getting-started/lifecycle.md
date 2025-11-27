---
title: Shoot Lifecycle
weight: 6
prev: false
next: false
---

# Shoot Lifecycle

## Reconciliation in Kubernetes and Gardener

The starting point of all reconciliation cycles is the constant observation of both the desired and actual state. A component would analyze any differences between the two states and try to converge the actual towards the desired state using appropriate actions. Typically, a component is responsible for a single resource type but it also watches others that have an implication on it.

As an example, the Kubernetes controller for ReplicaSets will watch pods belonging to it in order to ensure that the specified replica count is fulfilled. If one pod gets deleted, the controller will create a new pod to enforce the desired over the actual state.

This is all standard behaviour, as Gardener is following the native Kubernetes approach. All elements of a shoot cluster have a representation in Kubernetes resources and controllers are watching / acting upon them.

If we pick up the example of the ReplicaSet - a user typically creates a `deployment` resource and the ReplicaSet is implicitly generated on the way to create the pods. Similarly, Gardener takes the user's intent (shoot) and creates lots of domain specific resources on the way. They all reconcile and make sure their actual and desired states match.

## Updating the Desired State of a Shoot

Based on the shoot's specifications, Gardener will create network resources on a hyperscaler, backup resources for the ETCD, credentials, and other resources, but also representations of the worker pools. Eventually, this process will result in a fully functional Kubernetes cluster.

If you change the desired state, Gardener will reconcile the shoot and run through the same cycle to ensure the actual state matches the desired state.

![update-shoot-state](./images/update-shoot-state.png)

For example, the (infrastructure-specific) machine type can be changed within the shoot resource. The following reconciliation will pick up the change and initiate the creation of new nodes with a different machine type and the removal of the old nodes.

## Maintenance Window and Daily Reconciliation

![maintenance-window](./images/maintenance-window.png)

EVERY shoot cluster reconciles once per day during the so-called "maintenance window". You can confine the rollout of spec changes to this window.

Additionally, the daily reconciliation will help pick up all kind of version changes. When a new Gardener version was rolled out to the landscape, shoot clusters will pick up any changes during their next reconciliation. For example, if a new Calico version is introduced to fix some bug, it will automatically reach all shoots.

## Impact of a Change

![change-impact](./images/change-impact.png)

It is important to be aware of the impacts that a change can have on a cluster and the workloads within it.

An operator pushing a new Gardener version with a new calico image to a landscape will cause all calico pods to be re-created. Another example would be the rollout of a new etcd backup-restore image. This would cause etcd pods to be re-created, rendering a non-HA control plane unavailable until etcd is up and running again.

When you change the shoot spec, it can also have significant impact on the cluster. Imagine that you have changes the machine type of a worker pool. This will cause new machines to be created and old machines to be deleted. Or in other words: all nodes will be drained, the pods will be evicted and then re-created on newly created nodes.

## Kubernetes Version Update (Minor + Patch)

![k8s-version-update](./images/k8s-version-update.png)

Some operations are rather common and have to be performed on a regular basis. Updating the Kubernetes version is one them. Patch updates cause relatively little disruption, as only the control-plane pods will be re-created with new images and the kubelets on all nodes will restart.

A minor version update is more impactful - it will cause all nodes to be recreated and rolls components of the control plane.

## OS Version Update

![os-update](./images/os-update.png)

The OS version is defined for each worker pool and can be changed per worker pool. You can freely switch back and forth. However, as there is no in-place update, each change will cause the entire worker pool to roll and nodes will be replaced.
For OS versions different update strategies can be configured. Please check the [documentation](https://github.com/gardener/gardener/blob/master/docs/usage/shoot-operations/shoot_versions.md#update-path-for-machine-image-versions) for details.

## Available Versions​

<img style="width: 80%; height: auto; margin: 0, auto" alt="available-versions" src="./images/available-versions.png"/>

Gardener has a dedicated resource to maintain a list of available versions – the so-called `cloudProfile`.

A cloudProfile provides information about supported​:

- Kubernetes versions​
- OS versions (and where to find those images)​
- Regions (and their zones)​
- Machine types​

Each shoot references a cloudProfile in order to obtain information about available / possible versions and configurations.

## Version Classifications

![version-classifications](./images/version-classifications.png)

Gardener has the following classifications for Kubernetes and OS image versions:

- `preview`: still in testing phase (several versions can be in preview at the same time)

- `supported`: recommended version

- `deprecated`: a new version has been set to "supported", updating is recommended (might have an expiration date)

- `expired`: cannot be used anymore, clusters using this version will be force-upgraded

Version information is maintained in the relevant cloud profile resource. There might be circumstances where a version will never become `supported` but instead move to `deprecated` directly. Similarly, a version might be directly introduced as `supported`.

## AutoUpdate / Forced Updates

![auto-update](./images/auto-update.png)

AutoUpdate for a machine image version will update all node pools to the latest supported version based on the defined update strategy. Whenever a new version is set to `supported`, the cluster will pick it up during its next maintenance window.

For Kubernetes versions the mechanism is the same, but only applied to patch version. This means that the cluster will be kept on the latest supported patch version of a specific minor version.

In case a version used in a cluster expires, there is a force update during the next maintenance window. In a worst case scenario, 2 minor versions expire simultaneously. Then there will be two consecutive minor updates enforced.

For more information, see [Shoot Kubernetes and Operating System Versioning in Gardener](https://github.com/gardener/gardener/blob/master/docs/usage/shoot-operations/shoot_versions.md).

## Applying Changes to a Seed

![seeds-change](./images/seeds-change.png)

It is important to keep in mind that a seed is just another Kubernetes cluster. As such, it has its own lifecycle (daily reconciliation, maintenance, etc.) and is also a subject to change.

From time to time changes need to be applied to the seed as well. Some (like updating the OS version) cause the node pool to roll. In turn, this will cause the eviction of ALL pods running on the affected node. If your etcd is evicted and you don't have a highly available control plane, it will cause downtime for your cluster. Your workloads will continue to run ,of course, but your cluster's API server will not function until the etcd is up and running again.
