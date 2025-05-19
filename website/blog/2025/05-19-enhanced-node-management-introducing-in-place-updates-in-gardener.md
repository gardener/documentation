---
title: "Enhanced Node Management: Introducing In-Place Updates in Gardener"
linkTitle: "Enhanced Node Management: Introducing In-Place Updates in Gardener"
newsSubtitle: May 19, 2025
publishdate: 2025-05-19
authors:
- avatar: https://avatars.githubusercontent.com/shafeeqes
  email: shafeeque.e.s@sap.com
  login: shafeeqes
  name: Shafeeque E S
- avatar: https://avatars.githubusercontent.com/ary1992
  login: ary1992
  name: Ashish Ranjan Yadav
aliases: ["/blog/2025/05/19/enhanced-node-management-introducing-in-place-updates-in-gardener"]
---

Gardener is committed to providing efficient and flexible Kubernetes cluster management. Traditionally, updates to worker pool configurations, such as machine image or Kubernetes version changes, trigger a rolling update. This process involves replacing existing nodes with new ones, which is a robust approach for many scenarios. However, for environments with physical or bare-metal nodes, or stateful workloads sensitive to node replacement, this can introduce challenges like extended update times and potential disruptions.

To address these needs, Gardener now introduces **In-Place Node Updates**. This new capability allows certain updates to be applied directly to existing worker nodes without requiring their replacement, significantly reducing disruption and speeding up update processes for compatible changes.

### New Update Strategies for Worker Pools

Gardener now supports three distinct update strategies for your worker pools, configurable via the `updateStrategy` field in the `Shoot` specification's worker pool definition:

*   **`AutoRollingUpdate`**: This is the classic and default strategy. When updates occur, nodes are cordoned, drained, terminated, and replaced with new nodes incorporating the changes.
*   **`AutoInPlaceUpdate`**: With this strategy, compatible updates are applied directly to the existing nodes. The MachineControllerManager (MCM) automatically selects nodes, cordons and drains them, and then signals the Gardener Node Agent (GNA) to perform the update. Once GNA confirms success, MCM uncordons the node.
*   **`ManualInPlaceUpdate`**: This strategy also applies updates directly to existing nodes but gives operators fine-grained control. After an update is specified, MCM marks all nodes in the pool as candidates. Operators must then manually label individual nodes to select them for the in-place update process, which then proceeds similarly to the `AutoInPlaceUpdate` strategy.

The `AutoInPlaceUpdate` and `ManualInPlaceUpdate` strategies are available when the `InPlaceNodeUpdates` feature gate is enabled in Gardener.

### What Can Be Updated In-Place?

In-place updates are designed to handle a variety of common operational tasks more efficiently:

*   **Machine Image Updates**: Newer versions of a machine image can be rolled out by executing an update command directly on the node, provided the image and cloud profile are configured to support this.
*   **Kubernetes Patch Version Updates**: Minor patches to the Kubernetes version of worker nodes can be applied in-place.
*   **Kubelet Configuration Changes**: Modifications to the Kubelet configuration can be applied directly.
*   **Credentials Rotation**: Critical for security, rotation of Certificate Authorities (CAs) and ServiceAccount signing keys can now be performed on existing nodes without replacement.

However, some changes still necessitate a rolling update (node replacement):
*   Changing the machine image name (e.g., switching from Ubuntu to Garden Linux).
*   Modifying the machine type.
*   Altering volume types or sizes.
*   Changing the Container Runtime Interface (CRI) name (e.g., from Docker to containerd).
*   Enabling or disabling node-local DNS.

### Key API and Component Adaptations

Several Gardener components and APIs have been enhanced to support in-place updates:

*   **CloudProfile**: The `CloudProfile` API now allows specifying `inPlaceUpdates` configuration within `machineImage.versions`. This includes a boolean `supported` field to indicate if a version supports in-place updates and an optional `minVersionForUpdate` string to define the minimum OS version from which an in-place update to the current version is permissible.
*   **Shoot Specification**: As mentioned, the `Shoot.spec.provider.workers[].updateStrategy` field allows selection of the desired update strategy. Additionally, `Shoot.spec.provider.workers[].machineControllerManagerSettings` now includes `machineInPlaceUpdateTimeout` and `disableHealthTimeout` (which defaults to `true` for in-place strategies to prevent premature machine deletion during lengthy updates). For `ManualInPlaceUpdate`, `maxSurge` defaults to `0` and `maxUnavailable` to `1`.
*   **OperatingSystemConfig (OSC)**: The OSC resource, managed by OS extensions, now includes `status.inPlaceUpdates.osUpdate` where extensions can specify the `command` and `args` for the Gardener Node Agent to execute for OS updates. The `spec.inPlaceUpdates` field in the OSC will carry information like the target OS version, Kubelet version, and credential rotation status to the node.
*   **Gardener Node Agent (GNA)**: GNA is responsible for executing the in-place updates on the node. It watches for a specific node condition ( `InPlaceUpdate` with reason `ReadyForUpdate`) set by MCM, performs the OS update, Kubelet updates, or credentials rotation, restarts necessary pods (like DaemonSets), and then labels the node with the update outcome.
*   **MachineControllerManager (MCM)**: MCM orchestrates the in-place update process. For in-place strategies, while new machine classes and machine sets are created to reflect the desired state, the actual machine objects are not deleted and recreated. Instead, their ownership is transferred to the new machine set. MCM handles cordoning, draining, and setting node conditions to coordinate with GNA.
*   **Shoot Status & Constraints**: To provide visibility, the `Shoot.status.inPlaceUpdates.pendingWorkerUpdates` field now lists worker pools pending `autoInPlaceUpdate` or `manualInPlaceUpdate`. A new `ShootManualInPlaceWorkersUpdated` constraint is added if any manual in-place updates are pending, ensuring operators are aware.
*   **Worker Status**: The `Worker` extension resource now includes `status.inPlaceUpdates.workerPoolToHashMap` to track the configuration hash of worker pools that have undergone in-place updates. This helps Gardener determine if a pool is up-to-date.
*   **Forcing Updates**: If an in-place update is stuck, the `gardener.cloud/operation=force-in-place-update` annotation can be added to the Shoot to allow subsequent changes or retries.

### Benefits of In-Place Updates

*   **Reduced Disruption**: Minimizes workload interruptions by avoiding full node replacements for compatible updates.
*   **Faster Updates**: Applying changes directly can be quicker than provisioning new nodes, especially for OS patches or configuration changes.
*   **Bare-Metal Efficiency**: Particularly beneficial for bare-metal environments where node provisioning is more time-consuming and complex.
*   **Stateful Workload Friendly**: Lessens the impact on stateful applications that might be sensitive to node churn.

In-place node updates represent a significant step forward in Gardener's operational flexibility, offering a more nuanced and efficient approach to managing node lifecycles, especially in demanding or specialized environments.

### Dive Deeper

To explore the technical details and contributions that made this feature possible, refer to the following resources:
*   **GEP-31 API Changes**: [PR #11191](https://github.com/gardener/gardener/pull/11191)
*   **OSC Adaptations**: [PR #11393](https://github.com/gardener/gardener/pull/11393)
*   **MCM API Changes**: [PR #11631](https://github.com/gardener/gardener/pull/11631)
*   **Worker Reconciler Adaptations**: [PR #11713](https://github.com/gardener/gardener/pull/11713)
*   **Gardener Node Agent Adaptations**: [PR #11718](https://github.com/gardener/gardener/pull/11718)
*   **Shoot Reconciler Adaptations**: [PR #11843](https://github.com/gardener/gardener/pull/11843)
*   **Shoot Status Reconciler**: [PR #11844](https://github.com/gardener/gardener/pull/11844)
*   **Controller Optimizations & E2E Tests**: [PR #11953](https://github.com/gardener/gardener/pull/11953)
*   **Developer Talk Recording (starting at 39m37s)**: [https://youtu.be/ZwurVm1IJ7o?t=2377](https://youtu.be/ZwurVm1IJ7o?t=2377)