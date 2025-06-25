---
title: "Enabling Seamless IPv4 to Dual-Stack Migration for Kubernetes Clusters on GCP"
linkTitle: "Enabling Seamless IPv4 to Dual-Stack Migration for Kubernetes Clusters on GCP"
newsSubtitle: June 25, 2025
publishdate: 2025-06-25
authors:
- avatar: https://avatars.githubusercontent.com/DockToFuture
  email: sebastian.stauch@sap.com
  login: DockToFuture
  name: Sebastian Stauch
aliases: ["/blog/2025/06/25/enabling-seamless-ipv4-to-dual-stack-migration-for-kubernetes-clusters-on-gcp"]
---

Gardener continues to enhance its networking capabilities, now offering a streamlined migration path for existing IPv4-only shoot clusters on Google Cloud Platform (GCP) to dual-stack (IPv4 and IPv6). This allows clusters to leverage the benefits of IPv6 networking while maintaining IPv4 compatibility.

### The Shift to Dual-Stack: What Changes?

Transitioning a Gardener-managed Kubernetes cluster on GCP from a single-stack IPv4 to a dual-stack setup involves several key modifications to the underlying infrastructure and networking configuration.

#### Triggering the Migration
The migration process is initiated by updating the shoot specification. Users simply need to add `IPv6` to the `spec.networking.ipFamilies` field, changing it from `[IPv4]` to `[IPv4, IPv6]`.

#### Infrastructure Adaptations
Once triggered, Gardener orchestrates the necessary infrastructure changes on GCP:
*   **IPv6-Enabled Subnets:** The existing subnets (node subnet and internal subnet) within the Virtual Private Cloud (VPC) get external IPv6 ranges assigned.
*   **New IPv6 Service Subnet:** A new subnet is provisioned specifically for services, also equipped with an external IPv6 range.
*   **Secondary IPv4 Range for Node Subnet:** The node subnet is allocated an additional (secondary) IPv4 range. This is crucial as dual-stack load balancing on GCP, is managed via `ingress-gce`, which utilizes alias IP ranges.

#### Enhanced Pod Routing on GCP
A significant change occurs in how pod traffic is routed. In the IPv4-only setup with native routing, the Cloud Controller Manager (CCM) creates individual routes in the VPC route table for each node's pod CIDR. During the migration to dual-stack:
*   These existing pod-specific cloud routes are systematically deleted from the VPC routing table.
*   To maintain connectivity, the corresponding alias IP ranges are directly added to the Network Interface Card (NICs) of the Kubernetes worker nodes (VM instances).

### The Migration Journey

The migration is a multi-phase process, tracked by a `DualStackNodesMigrationReady` constraint in the shoot's status, which gets removed after a successfull migration.

*   **Phase 1: Infrastructure Preparation**
    Immediately after the `ipFamilies` field is updated, an infrastructure reconciliation begins. This phase includes the subnet modifications mentioned above. A critical step here is the transition from VPC routes to alias IP ranges for existing nodes. The system carefully manages the deletion of old routes and the creation of new alias IP ranges on the virtual machines to ensure a smooth transition. Information about the routes to be migrated is temporarily persisted during this step in the infrastructure state.

*   **Phase 2: Node Upgrades**
    For nodes to become dual-stack aware (i.e., receive IPv6 addresses for themselves and their pods), they need to be rolled out. This can happen during the next scheduled Kubernetes version or gardenlinux update or can be expedited by manually deleting the nodes, allowing Gardener to recreate the nodes with a new dual-stack configuration. Once all nodes have been updated and posses IPv4 and IPv6 pod CIDRs, the `DualStackNodesMigrationReady` constraint will change to `True`.

*   **Phase 3: Finalizing Dual-Stack Activation**
    With the infrastructure and nodes prepared, the final step involves configuring the remaining control plane components like kube-apiserver and the Container Network Interface (CNI) plugin like Calico or Cilium for dual-stack operation. After these components are fully dual-stack enabled, the migration constraint is removed, and the cluster operates in a full dual-stack mode. Existing IPv4 pods keep their IPv4 address, new ones receive both (IPv4 and IPv6) addresses.

### Important Considerations for GCP Users

Before initiating the migration, please note the following:
*   **Native Routing Prerequisite:** The IPv4-only cluster must be operating in native routing mode this. This means the pod overlay network needs to be disabled.
*   **GCP Route Quotas:** When using native routing, especially for larger clusters, be mindful of GCP's default quota for static routes per VPC (often 200, referred to as `STATIC_ROUTES_PER_NETWORK`). It might be necessary to request a quota increase via the GCP cloud console before enabling native routing or migrating to dual-stack to avoid hitting limits.

This enhancement provides a clear path for Gardener users on GCP to adopt IPv6, paving the way for future-ready network architectures.

For further details, you can refer to the [official pull request](https://github.com/gardener/gardener-extension-provider-gcp/pull/1010) and the [relevant segment of the developer talk](https://youtu.be/HguO_KY86ac?t=82). Additional documentation can also be found within the [Gardener documentation](https://gardener.cloud/docs/gardener/networking/dual-stack-networking-migration/).