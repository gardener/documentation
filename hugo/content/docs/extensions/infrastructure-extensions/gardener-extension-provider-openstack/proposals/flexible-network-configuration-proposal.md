---
authors:
  - '@kon-angelo'
  - '@hebelsan'
creation-date: '2026-08-27'
github_repo: 'https://github.com/gardener/gardener-extension-provider-openstack'
github_subdir: docs/proposals
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/infrastructure-extensions/gardener-extension-provider-openstack/proposals/flexible-network-configuration-proposal.md
  to: flexible-network-configuration-proposal.md
reviewers:
  - '@TBD'
status: implementable
title: Flexible Network Configuration (BYO Subnet)
prev: false
next: false
---
<!-- BANNER:MANAGED -->
<!--
   █▀▀ ▀█▀ █▀█ █▀█
   ▀▀█  █  █ █ █▀▀
   ▀▀▀  ▀  ▀▀▀ ▀

   ┌────────────────────────────────────────────────┐
   │  MANAGED FILE — aggregated from upstream       │
   │                                                │
   │  Editing here is pointless: The nightly        │
   │  aggregation run overwrites this file.         │
   │                                                │
   │  Open a PR against the source instead: ─────┐  │
   │                          ┌──┐    ┌──────────┘  │
   │                          └──│────┘             │
   │           ┌─────────────────┘                  │
   └───────────│────────────────────────────────────┘
               ▼               
   https://github.com/gardener/gardener-extension-provider-openstack/blob/master/docs/proposals/flexible-network-configuration-proposal.md
-->


# Flexible Network Configuration – Bring Your Own Subnet

## Table of Contents

- [Summary](#summary)
- [Motivation](#motivation)
  - [Goals](#goals)
  - [Non-Goals](#non-goals)
- [Comparison with Other Providers](#comparison-with-other-providers)
- [Proposal](#proposal)
  - [Resource Ownership Overview](#resource-ownership-overview)
  - [API Changes](#api-changes)
  - [Validation Rules](#validation-rules)
  - [Configuration Patterns](#configuration-patterns)
  - [Share Network (Manila CSI) Considerations](#share-network-manila-csi-considerations)
  - [BYO IPv6 Node Subnet (Dual-Stack)](#byo-ipv6-node-subnet-dual-stack)
  - [Delete Semantics](#delete-semantics)
  - [Implementation Status](#implementation-status)
- [What Is Missing Compared to Other Providers](#what-is-missing-compared-to-other-providers)
- [Open Questions](#open-questions)

---

## Summary

This proposal enables users to deploy Gardener-managed Kubernetes clusters into pre-provisioned OpenStack
network infrastructure. Specifically, users can provide an existing subnet (`networks.subnetId`)
into which worker nodes are placed, instead of having Gardener create a new subnet.

The feature is additive and backwards-compatible: existing clusters that do not set `networks.subnetId`
are entirely unaffected.

---

## Motivation

Enterprise organizations and platform teams frequently pre-provision network infrastructure that must be
shared across multiple clusters or integrated into a larger hub-and-spoke topology. Reasons include:

- **Pre-approved network topology** – security teams pre-provision subnets, route tables, and firewall
  rules before any cluster is created.
- **Shared network between clusters** – multiple Gardener shoots sharing a single Neutron network (and
  its subnets) for peering or centralized services.
- **Centralized egress / NAT** – a transit router or centralized NAT appliance owned by the platform team;
  Gardener should not create a new router or NAT.
- **Interoperability with existing workloads** – non-Kubernetes VMs or services already running in a
  subnet that the cluster nodes need to communicate with.

Today, Gardener always creates a new subnet inside the network (even when an existing network is provided
via `networks.id`). This prevents the integration patterns described above.

### Goals

- Allow users to reference an existing subnet (`networks.subnetId`) instead of specifying a worker CIDR.
- Gardener must not create or delete user-provided subnets.
- The feature must be immutable once set (cannot switch between BYO and managed subnet after creation).
- Zero breaking changes for existing clusters.

### Non-Goals

- ~~Supporting BYO subnets for IPv6 or dual-stack configurations in the initial implementation.~~ *(implemented — see [BYO IPv6 Node Subnet](#byo-ipv6-node-subnet-dual-stack))*
- Allowing partial BYO configurations (e.g., mixing BYO subnet with a Gardener-created subnet).
- Validating pod CIDR overlap between clusters sharing a subnet (the user is responsible).
- User-managed egress / CCM route controller changes

---

## Proposal

### Resource Ownership Overview

```
User-Managed (never created or deleted by Gardener):
  - Neutron network        (networks.id)
  - Neutron subnet         (networks.subnetId)   <-- NEW
  - Neutron router         (networks.router.id)  <-- required when subnetId is set
  - Router interface to subnet                    <-- must exist before shoot creation

Gardener-Managed:
  - Security group
  - SSH key pair
  - Router interface (if no router.id specified)
  - Router (if no router.id specified)
  - Network (if no networks.id specified)
```

The **Design Principle** is: BYO resources are referenced, never created or deleted by Gardener.

### API Changes

The `Networks` struct in `InfrastructureConfig` gains three new optional fields (`SubnetID`,
`SecurityGroupID`, `ShareNetworkID`), and `IPv6Config` gains a new `NodeSubnetID` field:

```go
// Networks holds information about the Kubernetes and infrastructure networks.
type Networks struct {
    Router  *Router  `json:"router,omitempty"`
    Worker  string   `json:"worker,omitempty"`   // deprecated
    Workers string   `json:"workers,omitempty"`
    SubnetPool *SubnetPool `json:"subnetPool,omitempty"`

    // ID is the ID of an existing private network.
    // +optional
    ID *string `json:"id,omitempty"`

    // SubnetID is the ID of an existing subnet for worker nodes.
    // When set, Gardener will NOT create a new subnet.
    // Requires networks.id. Mutually exclusive with workers/worker/subnetPool.
    // +optional
    SubnetID *string `json:"subnetId,omitempty"`

    // SecurityGroupID is the ID of an existing security group for worker nodes.
    // When set, Gardener will not create a security group.
    // Requires networks.id.
    // +optional
    SecurityGroupID *string `json:"securityGroupId,omitempty"`

    // ShareNetworkID is the ID of an existing Manila share network.
    // When set, Gardener will use it and will not delete it on shoot teardown.
    // Requires networks.id. Mutually exclusive with shareNetwork.enabled.
    // +optional
    ShareNetworkID *string `json:"shareNetworkId,omitempty"`

    // ShareNetwork holds information about the share network (used for shared file systems like NFS)
    // +optional
    ShareNetwork *ShareNetwork `json:"shareNetwork,omitempty"`

    // IPv6 holds the IPv6 configuration. Used for dual-stack clusters.
    // +optional
    IPv6 *IPv6Config `json:"ipv6,omitempty"`
    // ...
}

// IPv6Config contains the IPv6 CIDR configuration for nodes, pods, and services.
type IPv6Config struct {
    // ... existing fields (SubnetPoolID, NodeCIDR, PodCIDR, ServiceCIDR) ...

    // NodeSubnetID is the ID of an existing IPv6 subnet for worker nodes.
    // When set, Gardener will NOT create an IPv6 node subnet.
    // Requires networks.id, networks.router.id, and networks.subnetId.
    // PodCIDR and ServiceCIDR must be set explicitly.
    // Mutually exclusive with SubnetPoolID and NodeCIDR.
    // +optional
    NodeSubnetID *string `json:"nodeSubnetId,omitempty"`
}
```

**JSON key:** `subnetId` (camelCase, consistent with `id` for the network field).

#### Example: Minimal BYO subnet

```yaml
apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
kind: InfrastructureConfig
floatingPoolName: MY-FLOATING-POOL
networks:
  id: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"      # existing network
  subnetId: "11111111-2222-3333-4444-555555555555" # existing subnet
  router:
    id: "rrrrrrrr-rrrr-rrrr-rrrr-rrrrrrrrrrrr"    # existing router (required)
```

The router must already have an interface to the provided subnet. Gardener reuses all three
existing resources and will not create or delete any of them.

### Validation Rules

#### Static validation (admission webhook)

| Rule | Error path | Details |
| --- | --- | --- |
| `subnetId` requires `id` | `networks.subnetId` | Cannot use a subnet without specifying the parent network |
| `subnetId` requires `router.id` | `networks.subnetId` | Must provide an existing router when providing an existing subnet |
| `subnetId` must be a valid UUID | `networks.subnetId` | OpenStack IDs are UUIDs |
| `subnetId` is mutually exclusive with `workers`/`worker` | `networks.subnetId` | Cannot specify both a CIDR and an existing subnet |
| `subnetId` is mutually exclusive with `subnetPool` | `networks.subnetId` | Cannot combine with pool-based allocation |
| `subnetId` is immutable | `networks.subnetId` | Once set, cannot be changed |
| `securityGroupId` requires `id` | `networks.securityGroupId` | Cannot reference a security group without specifying the parent network |
| `securityGroupId` must be a valid UUID | `networks.securityGroupId` | OpenStack IDs are UUIDs |
| `securityGroupId` is immutable | `networks.securityGroupId` | Once set, cannot be changed |
| `shareNetworkId` requires `id` | `networks.shareNetworkId` | Cannot reference a share network without specifying the parent network |
| `shareNetworkId` must be a valid UUID | `networks.shareNetworkId` | OpenStack IDs are UUIDs |
| `shareNetworkId` is mutually exclusive with `shareNetwork.enabled` | `networks.shareNetworkId` | Cannot combine BYO and managed share network |
| `shareNetworkId` is immutable | `networks.shareNetworkId` | Once set, cannot be changed |
| `ipv6.nodeSubnetId` requires `networks.id` | `networks.ipv6.nodeSubnetId` | Parent network must be specified |
| `ipv6.nodeSubnetId` requires `networks.router.id` | `networks.ipv6.nodeSubnetId` | Router must have an interface to the IPv6 subnet |
| `ipv6.nodeSubnetId` requires `networks.subnetId` | `networks.ipv6.nodeSubnetId` | BYO dual-stack requires BYO IPv4 subnet |
| `ipv6.nodeSubnetId` must be a valid UUID | `networks.ipv6.nodeSubnetId` | OpenStack IDs are UUIDs |
| `ipv6.nodeSubnetId` is mutually exclusive with `ipv6.subnetPoolId` | `networks.ipv6.nodeSubnetId` | Cannot combine BYO subnet with pool-based allocation |
| `ipv6.nodeSubnetId` is mutually exclusive with `ipv6.nodeCIDR` | `networks.ipv6.nodeSubnetId` | Cannot specify both a CIDR and an existing subnet |
| `ipv6.podCIDR` is required when `ipv6.nodeSubnetId` is set | `networks.ipv6.podCIDR` | Needed to configure KCM, CNI, and kube-proxy |
| `ipv6.serviceCIDR` is required when `ipv6.nodeSubnetId` is set | `networks.ipv6.serviceCIDR` | Needed to configure kube-apiserver and kube-proxy |
| `ipv6.podCIDR` prefix length must be ≤ /64 | `networks.ipv6.podCIDR` | KCM allocates /64 per node; a smaller cluster CIDR cannot be subdivided |
| `ipv6` is immutable | `networks.ipv6` | Once set, the entire IPv6 config block cannot be changed |

#### Dynamic validation (config validator, requires OpenStack API)

| Rule | Error path | Details |
| --- | --- | --- |
| Network ID must exist | `networks.id` | The specified network must be retrievable |
| Subnet ID must exist in the network | `networks.subnetId` | The subnet must belong to the specified network |
| Router ID must exist (if specified) | `networks.router.id` | The specified router must be retrievable |
| Router must have interface to subnet | `networks.router` | If both `router.id` and `subnetId` are set, the router must already have a port on the subnet |
| Security group must exist | `networks.securityGroupId` | The specified security group must be retrievable |
| Share network must exist | `networks.shareNetworkId` | The specified share network must be retrievable |
| IPv6 node subnet must exist in the network | `networks.ipv6.nodeSubnetId` | The subnet must belong to the specified network |
| Router must have interface to IPv6 node subnet | `networks.router` | The router must already have a port on the IPv6 subnet |

### Configuration Patterns

#### Pattern 1: Managed (existing behavior, unchanged)

```yaml
networks:
  workers: "10.250.0.0/19"
```

Gardener creates: network, subnet, router, router interface.

#### Pattern 2: BYO Network, Gardener creates subnet + router

```yaml
networks:
  id: "<network-uuid>"
  workers: "10.250.0.0/19"
```

Gardener creates: subnet (in the provided network), router, router interface.

#### Pattern 3: BYO Network + Router, Gardener creates subnet

```yaml
networks:
  id: "<network-uuid>"
  router:
    id: "<router-uuid>"
  workers: "10.250.0.0/19"
```

Gardener creates: subnet (in the provided network), router interface.
Gardener does NOT create or delete network or router.

#### Pattern 4: BYO Network + Subnet + Router  ← NEW

```yaml
networks:
  id: "<network-uuid>"
  subnetId: "<subnet-uuid>"
  router:
    id: "<router-uuid>"
```

User responsibility: the router must already have an interface to the subnet.
Gardener creates: nothing in the network layer (SSH key pair and security group are still managed by default; use Pattern 5 to also bring your own security group).
Gardener does NOT create or delete network, subnet, or router.

#### Pattern 5: BYO Security Group (combinable with any of the above)

`networks.securityGroupId` is independent of the subnet patterns and can be added to any of
Patterns 1–4. Example combined with Pattern 4 (fully BYO):

```yaml
networks:
  id: "<network-uuid>"
  subnetId: "<subnet-uuid>"
  router:
    id: "<router-uuid>"
  securityGroupId: "<security-group-uuid>"
```

Requires `networks.id` to be set. The user is responsible for the security group rules; Gardener
will not add or remove any rules. The security group must allow at minimum:
- All ingress within the same group (node-to-node)
- TCP/UDP ingress on ports 30000–32767 (NodePort range)
- All egress

Gardener does NOT create or delete the security group.

### Share Network (Manila CSI) Considerations

`networks.shareNetwork.enabled: true` is fully supported together with `networks.subnetId`.

When both are set, the infrastructure reconciler creates a Manila share network bound to the
user-provided subnet, exactly as it would for a Gardener-managed subnet. The reconciler first
searches for an existing share network matching the shoot name and the `(networkID, subnetID)`
tuple — so if the user pre-provisions a Manila share network for the subnet, Gardener will
discover and adopt it automatically without creating a new one.

**Delete semantics:** On shoot deletion, Gardener deletes the share network it found or created.
If the user pre-provisioned the share network and wants it to survive shoot deletion, use
`networks.shareNetworkId` instead of `shareNetwork.enabled`.

---

### BYO IPv6 Node Subnet (Dual-Stack)

`networks.ipv6.nodeSubnetId` extends the BYO pattern to dual-stack clusters. It allows users to
provide an existing IPv6 subnet for worker nodes instead of having Gardener create one.

#### Constraints

- Requires `networks.id`, `networks.router.id`, and `networks.subnetId` — BYO dual-stack is only
  supported on top of a fully BYO IPv4 setup (Pattern 4).
- The router must already have an interface attached to both the IPv4 and IPv6 subnets before
  the shoot is created.
- `ipv6.podCIDR` and `ipv6.serviceCIDR` must be set explicitly. These are virtual Kubernetes
  address ranges (not Neutron subnets). Gardener propagates them into `shoot.status.networking`
  so the gardenlet, KCM, CNI, kube-proxy, and CoreDNS pick them up. They cannot be derived from
  the node subnet because `spec.networking.pods`/`services` only hold IPv4 CIDRs.
- `ipv6.podCIDR` prefix length must be ≤ `/64`. The kube-controller-manager allocates a `/64`
  per node (`--node-cidr-mask-size-ipv6=64`) and will crash with
  `mask size of cluster CIDR must be less than or equal to --node-cidr-mask-size` if the cluster
  pod CIDR is too small. A `/56` provides 256 per-node `/64` blocks and is a safe default.
- `ipv6.nodeSubnetId` is mutually exclusive with `ipv6.subnetPoolId` and `ipv6.nodeCIDR`.
- The entire `ipv6` block is immutable once set.

#### Example

```yaml
apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
kind: InfrastructureConfig
floatingPoolName: MY-FLOATING-POOL
networks:
  id: "<network-uuid>"
  subnetId: "<ipv4-nodes-subnet-uuid>"
  router:
    id: "<router-uuid>"
  ipv6:
    nodeSubnetId: "<ipv6-nodes-subnet-uuid>"
    podCIDR: "fd00::/56"
    serviceCIDR: "fd01::/112"
```

The shoot must also declare dual-stack in `spec.networking`:

```yaml
spec:
  networking:
    ipFamilies: [IPv4, IPv6]
    pods: "10.96.0.0/11"
    services: "100.64.0.0/13"
```

Note: `spec.networking.pods`/`services` are IPv4 only. The IPv6 pod/service CIDRs are carried
exclusively through `networks.ipv6.podCIDR` / `networks.ipv6.serviceCIDR`.

#### Resource Ownership

| Resource | Owned by Gardener? |
| --- | --- |
| IPv6 node subnet (`ipv6.nodeSubnetId` not set, dual-stack) | Yes — created and deleted |
| IPv6 node subnet (`ipv6.nodeSubnetId` set) | No — never touched |
| IPv6 router interface (BYO IPv6 node subnet) | No — must pre-exist, never touched |

#### Admission webhook changes

The `validateShoot` function was updated to accept `ipv6.nodeSubnetId` as a valid IPv6 config
for dual-stack shoots, in addition to the existing `subnetPoolId` and explicit CIDR paths:

```go
if core.IsDualStack(context.shoot.Spec.Networking.IPFamilies) {
    ipv6 := context.infraConfig.Networks.IPv6
    if ipv6 == nil || (ipv6.SubnetPoolID == nil && ipv6.NodeCIDR == "" && ipv6.NodeSubnetID == nil) {
        allErrs = append(allErrs, field.Required(...))
    }
}
```

---

### Delete Semantics

On shoot deletion, Gardener will:

- **NOT delete** the subnet if `networks.subnetId` was set.
- **NOT delete** the network if `networks.id` was set.
- **NOT delete** the router if `networks.router.id` was set.
- **NOT delete** the security group if `networks.securityGroupId` was set.
- **NOT delete** the share network if `networks.shareNetworkId` was set.
- **NOT delete** the IPv6 node subnet if `networks.ipv6.nodeSubnetId` was set.
- **Delete** the router interface (if the router was not BYO and Gardener created it).
- **Delete** the security group (if `networks.securityGroupId` was NOT set).
- **Delete** the share network (if `networks.shareNetworkId` was NOT set and `shareNetwork.enabled` was true).
- **Delete** the IPv6 node subnet (if `networks.ipv6.nodeSubnetId` was NOT set and dual-stack was enabled).
- **Delete** the SSH key pair (always Gardener-managed).

This matches the principle: BYO resources are never deleted by Gardener.

### Implementation Status

The following changes are already implemented on the `feature/existing-subnet` branch:

- [X] `SubnetID *string` added to `Networks` struct (internal + v1alpha1 types)
- [X] DeepCopy generated for the new field
- [X] Conversion between internal and v1alpha1 types
- [X] Static validation in `ValidateInfrastructureConfig`
  - [X] `subnetId` requires `id`
  - [X] `subnetId` requires `router.id`
  - [X] `subnetId` is a valid UUID
  - [X] `subnetId` mutually exclusive with `workers`/`worker`/`subnetPool`
  - [X] Immutability enforced in `ValidateInfrastructureConfigUpdate`
- [X] Dynamic validation in `configValidator.Validate`
  - [X] Network existence check
  - [X] Subnet existence in network check
  - [X] Router existence check
  - [X] Router-to-subnet interface check
- [X] Infrastructure reconciliation: skip subnet creation if `subnetId` is set
- [X] Infrastructure deletion: skip subnet deletion if `subnetId` was set
- [X] `shareNetwork.enabled` supported alongside `subnetId` (restriction lifted)
- [X] BYO share network: `networks.shareNetworkId` field added
  - [X] Static validation: requires `networks.id`, must be valid UUID, mutually exclusive with `shareNetwork.enabled`, immutable
  - [X] Dynamic validation: share network existence check
  - [X] Infrastructure reconciliation: use existing share network if `shareNetworkId` is set
  - [X] Infrastructure deletion: skip share network deletion if `shareNetworkId` was set
- [X] BYO security group: `networks.securityGroupId` field added
  - [X] Static validation: requires `networks.id`, must be valid UUID, immutable
  - [X] Dynamic validation: security group existence check
  - [X] Infrastructure reconciliation: skip security group creation if `securityGroupId` is set
  - [X] Infrastructure deletion: skip security group deletion if `securityGroupId` was set
- [X] BYO IPv6 node subnet: `networks.ipv6.nodeSubnetId` field added
  - [X] Static validation: requires `networks.id`, `networks.router.id`, and `networks.subnetId`
  - [X] Static validation: must be valid UUID
  - [X] Static validation: mutually exclusive with `ipv6.subnetPoolId` and `ipv6.nodeCIDR`
  - [X] Static validation: `ipv6.podCIDR` and `ipv6.serviceCIDR` required when `nodeSubnetId` is set
  - [X] Static validation: `ipv6.podCIDR` prefix length must be ≤ `/64`
  - [X] Immutability enforced (entire `ipv6` block) in `ValidateInfrastructureConfigUpdate`
  - [X] Dynamic validation: IPv6 node subnet existence in network check
  - [X] Dynamic validation: router-to-IPv6-subnet interface check
  - [X] Infrastructure reconciliation: skip IPv6 node subnet creation if `nodeSubnetId` is set
  - [X] Infrastructure deletion: skip IPv6 node subnet deletion if `nodeSubnetId` was set
  - [X] Admission webhook: `nodeSubnetId` accepted as a valid dual-stack IPv6 config
- [X] Documentation updated (`docs/usage/flexible-network-configuration.md`)

---

## Open Questions

1. **CCM security group management:** The OpenStack CCM equivalent to `DisableSecurityGroupIngress`
   is the `manage-security-groups` flag in `cloud.conf [LoadBalancer]`. However, this is only
   relevant for `lb-provider=ovn`, where it is already set to `true` in the CCM config template and
   causes the CCM to dynamically add/remove security group rules per `LoadBalancer` Service.
   
   For the common LB providers (`amphora`, `haproxy`), the CCM **never touches security groups**.
   Octavia spins up a dedicated Amphora VM that forwards traffic to worker nodes via the NodePort
   range (30000–32767), which is already open in the Gardener-managed worker security group.
   No additional CCM flag is needed for BYO subnet users on these providers.
   
   For OVN (Open Virtual Network) users who want full security group control, a follow-up could expose
   `cloudControllerManager.manageSecurityGroups *bool` in `ControlPlaneConfig` to allow overriding
   the default. This is low priority given OVN's limited adoption.

1. **CCM route controller and BYO router:** When the shoot CNI uses a **non-overlay** network mode
   (e.g. Calico in BGP/non-overlay mode), the OpenStack CCM route controller is activated. It reads
   `router-id` from `cloud.conf [Route]` — which Gardener sets to `infraStatus.Networks.Router.ID` —
   and programs **per-node host routes** on that router so that pod CIDRs are routable across nodes.
   
   When a user-provided router (`networks.router.id`) is combined with a non-overlay CNI:
   - The CCM will add and remove `/32` or `/24` host routes on the **user's router** as nodes join or leave.
   - This is expected and required for pod-to-pod communication, but operators managing the router
     outside Gardener should be aware of this automatic route management.
   
   When the CNI uses an **overlay** network (e.g. Calico VXLAN, Cilium VXLAN), pod traffic is
   encapsulated and the route controller is inactive — the router is not touched.
   
   No action is required in the implementation; this is an operational note for users combining BYO
   router with non-overlay CNI configurations.
