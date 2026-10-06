---
github_repo: 'https://github.com/gardener/gardener-extension-provider-openstack'
github_subdir: docs/usage
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/infrastructure-extensions/gardener-extension-provider-openstack/flexible-network-configuration.md
  to: flexible-network-configuration.md
persona: Users
title: Flexible Network Configuration
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
   https://github.com/gardener/gardener-extension-provider-openstack/blob/master/docs/usage/flexible-network-configuration.md
-->


# Flexible Network Configuration – Bring Your Own Infrastructure

This document describes how to deploy a Gardener-managed Kubernetes cluster into pre-provisioned
OpenStack network infrastructure. All BYO fields are optional and additive — existing shoots that
do not set any of these fields are entirely unaffected.

## Overview

By default, Gardener creates and manages all network resources for a shoot: network, subnet, router,
router interface, and security group. Each of these can optionally be replaced by a user-provided
resource. The core principle is: **BYO resources are referenced, never created or deleted by Gardener**.

### Fields

| Field | Type | Description |
| --- | --- | --- |
| `networks.id` | `string` (UUID) | ID of an existing Neutron network. Gardener will create the subnet inside it. |
| `networks.router.id` | `string` (UUID) | ID of an existing Neutron router. Gardener will not create a router. |
| `networks.subnetId` | `string` (UUID) | ID of an existing subnet. Gardener will not create a subnet. Requires `networks.id` and `networks.router.id`. |
| `networks.securityGroupId` | `string` (UUID) | ID of an existing security group for worker nodes. Gardener will not create or modify the security group. Requires `networks.id`. |
| `networks.shareNetworkId` | `string` (UUID) | ID of an existing Manila share network. Gardener will use it and will not delete it on shoot teardown. Requires `networks.id`. Mutually exclusive with `shareNetwork.enabled`. |
| `networks.ipv6.nodeSubnetId` | `string` (UUID) | ID of an existing IPv6 subnet for worker nodes (dual-stack only). Gardener will not create an IPv6 node subnet. Requires `networks.id` and `networks.router.id`. `ipv6.podCIDR` and `ipv6.serviceCIDR` must be set explicitly. |

All BYO fields are **immutable** once set on a shoot.

### Resource ownership summary

| Resource | Owned by Gardener? |
| --- | --- |
| Network (`networks.id` not set) | Yes — created and deleted |
| Network (`networks.id` set) | No — never touched |
| Subnet (`networks.subnetId` not set) | Yes — created and deleted |
| Subnet (`networks.subnetId` set) | No — never touched |
| Router (`networks.router.id` not set) | Yes — created and deleted |
| Router (`networks.router.id` set) | No — never touched |
| Router interface | Yes — created and deleted (unless the router is BYO and the interface pre-exists) |
| Security group (`networks.securityGroupId` not set) | Yes — created, rules managed, deleted |
| Security group (`networks.securityGroupId` set) | No — never touched, rules are the user's responsibility |
| Share network (`networks.shareNetworkId` not set, `shareNetwork.enabled: true`) | Yes — created and deleted |
| Share network (`networks.shareNetworkId` set) | No — never touched |
| IPv6 node subnet (`networks.ipv6.nodeSubnetId` not set, dual-stack) | Yes — created and deleted |
| IPv6 node subnet (`networks.ipv6.nodeSubnetId` set) | No — never touched |
| IPv6 router interface (BYO IPv6 node subnet) | No — must pre-exist, never touched |
| SSH key pair | Always Gardener-managed |

---

## Configuration Patterns

### Pattern 1: Fully managed (default)

```yaml
networks:
  workers: "10.250.0.0/19"
```

Gardener creates: network, subnet, router, router interface, security group.

No pre-provisioning required.

### Pattern 2: BYO Network

```yaml
networks:
  id: "<network-uuid>"
  workers: "10.250.0.0/19"
```

Gardener creates: subnet, router, router interface, security group.

```bash
# Create the network
openstack network create my-network
# Note the network ID from the output
```

### Pattern 3: BYO Network + Router

```yaml
networks:
  id: "<network-uuid>"
  router:
    id: "<router-uuid>"
  workers: "10.250.0.0/19"
```

Gardener creates: subnet, router interface, security group.

```bash
# Create the network
openstack network create my-network

# Create the router and attach it to an external network
openstack router create my-router
openstack router set my-router --external-gateway <floating-pool-network-name>
```

### Pattern 4: BYO Network + Subnet + Router

```yaml
networks:
  id: "<network-uuid>"
  subnetId: "<subnet-uuid>"
  router:
    id: "<router-uuid>"
```

Gardener creates: security group only. The router must already have an interface attached to the
provided subnet before the shoot is created — Gardener validates this at admission time.

The subnet must be configured for node bootstrap to succeed:
- **DHCP enabled** — nodes receive their IP address via DHCP on first boot
- **Gateway IP set** — required so nodes can route traffic off-subnet (toward the seed API server)
- **DNS nameservers** — leave unset unless `cloudProfileConfig.dnsServers` is non-empty for your environment; when unset, OpenStack's built-in DHCP DNS is used (same as managed subnets). Setting public resolvers like `8.8.8.8` will break DNS in private OpenStack deployments where those addresses are unreachable

```bash
# Create the network
openstack network create my-network

# Create the subnet with DHCP (default).
# Do NOT set explicit DNS nameservers unless your operator requires specific ones
# (i.e. cloudProfileConfig.dnsServers is non-empty for your environment).
# When dnsServers is empty, Gardener sets none and nodes use OpenStack's built-in
# DHCP DNS. Setting public resolvers like 8.8.8.8 will break DNS if they are not
# reachable from the tenant network (common in private OpenStack deployments).
openstack subnet create my-subnet \
  --network my-network \
  --subnet-range 10.250.0.0/19

# Create the router and attach it to an external network
openstack router create my-router
openstack router set my-router --external-gateway <floating-pool-network-name>

# Attach the router to the subnet (required before shoot creation)
openstack router add subnet my-router my-subnet
```

⚠️ If DHCP is disabled, the gateway IP is missing, DNS nameservers are not configured, or the
configured DNS servers are not reachable from the tenant network, worker nodes will be created in
OpenStack but will fail to bootstrap — they will appear as `Pending` machines in the
machine-controller-manager and never join the cluster. Node-level DNS failures also prevent the
Manila CSI driver from authenticating to the OpenStack identity endpoint at mount time.

⚠️ `networks.subnetId` is mutually exclusive with `networks.workers`, `networks.worker`, and
`networks.subnetPool`.

### Pattern 5: BYO Security Group

`networks.securityGroupId` is independent of the subnet patterns and can be combined with any of
Patterns 1–4. Example combined with Pattern 4 (fully BYO):

```yaml
networks:
  id: "<network-uuid>"
  subnetId: "<subnet-uuid>"
  router:
    id: "<router-uuid>"
  securityGroupId: "<security-group-uuid>"
```

When `securityGroupId` is set, Gardener attaches the provided security group to every worker node
and does not create, modify, or delete it. The user is responsible for maintaining the following
minimum rules:

- **Ingress:** allow all traffic within the same security group (node-to-node and pod-to-pod)
- **Ingress:** TCP and UDP on ports 30000–32767 from any source (Kubernetes NodePort range, required for load balancer backends)
- **Egress:** allow all outbound traffic

```bash
# Create the security group
openstack security group create my-worker-sg

# Node-to-node: allow all ingress within the security group
openstack security group rule create my-worker-sg \
  --protocol any --remote-group my-worker-sg --ingress

# NodePort range: TCP
openstack security group rule create my-worker-sg \
  --protocol tcp --dst-port 30000:32767 --remote-ip 0.0.0.0/0 --ingress

# NodePort range: UDP
openstack security group rule create my-worker-sg \
  --protocol udp --dst-port 30000:32767 --remote-ip 0.0.0.0/0 --ingress

# All egress (usually the default, but make it explicit)
openstack security group rule create my-worker-sg \
  --protocol any --egress
```

Note: `WorkerConfig.additionalSecurityGroups` can be used alongside `securityGroupId` to attach
further pre-existing security groups to worker nodes.

### Pattern 6: BYO Share Network (Manila CSI)

`networks.shareNetworkId` is independent of the subnet patterns and can be combined with any of
Patterns 1–5. It requires `networks.id`. Mutually exclusive with `shareNetwork.enabled`. Example
combined with Pattern 4:

```yaml
networks:
  id: "<network-uuid>"
  subnetId: "<subnet-uuid>"
  router:
    id: "<router-uuid>"
  shareNetworkId: "<share-network-uuid>"
```

Also enable the Manila CSI driver in `ControlPlaneConfig`:

```yaml
apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
kind: ControlPlaneConfig
loadBalancerProvider: haproxy
storage:
  csiManila:
    enabled: true
```

Gardener will use the provided share network for all Manila-backed `PersistentVolume` operations
and will not create or delete it on shoot teardown.

```bash
# A Manila share network binds a Neutron network and subnet together.
# The subnet must already exist (e.g. from Pattern 4).
openstack share network create \
  --neutron-net-id <network-uuid> \
  --neutron-subnet-id <subnet-uuid> \
  --name my-share-network
```

⚠️ `networks.shareNetworkId` is mutually exclusive with `shareNetwork.enabled`. It is immutable
once set.

### Pattern 7: BYO IPv6 Node Subnet (dual-stack)

`networks.ipv6.nodeSubnetId` requires `networks.subnetId` to be set — it can only be combined
with Pattern 4 (or Pattern 5 on top of Pattern 4). Example:

```yaml
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

The router must already have an interface attached to both the IPv4 and IPv6 subnets before the
shoot is created — Gardener validates this at admission time.

```bash
# (Assumes the network, IPv4 subnet, and router from Pattern 4 already exist)

# Create the IPv6 subnet (SLAAC mode for node address assignment)
openstack subnet create my-subnet-ipv6 \
  --network my-network \
  --ip-version 6 \
  --subnet-range fd10::/64 \
  --ipv6-ra-mode slaac \
  --ipv6-address-mode slaac

# Attach the router to the IPv6 subnet (required before shoot creation)
openstack router add subnet my-router my-subnet-ipv6
```

When using a BYO security group (`networks.securityGroupId`) together with dual-stack, the
security group must include IPv6 ingress rules in addition to the IPv4 rules from Pattern 5:

```bash
# Node-to-node IPv6: allow all ingress within the security group
openstack security group rule create my-worker-sg \
  --protocol any --remote-group my-worker-sg --ingress --ethertype IPv6

# NodePort range IPv6: TCP
openstack security group rule create my-worker-sg \
  --protocol tcp --dst-port 30000:32767 --remote-ip ::/0 --ingress --ethertype IPv6

# NodePort range IPv6: UDP
openstack security group rule create my-worker-sg \
  --protocol udp --dst-port 30000:32767 --remote-ip ::/0 --ingress --ethertype IPv6
```

Without these rules, worker nodes will be created in OpenStack but will fail to join the cluster —
they appear as `Pending` machines in the machine-controller-manager and the VPN component will also
fail to become ready.

`ipv6.podCIDR` and `ipv6.serviceCIDR` are virtual — they are Kubernetes address ranges for the
CNI and kube-proxy respectively, not Neutron subnets. Pick any free IPv6 prefix (e.g. from ULA
`fd00::/8`) that does not overlap with the node subnet or other shoots sharing the network.
Gardener propagates these into `shoot.status.networking` so the gardenlet and CNI pick them up.

The pod CIDR must be large enough for the kube-controller-manager to allocate a `/64` per node
(`--node-cidr-mask-size-ipv6=64`). A `/56` provides 256 per-node `/64` blocks and is a safe
default. Do **not** use `/112` or smaller — the KCM will crash with
`mask size of cluster CIDR must be less than or equal to --node-cidr-mask-size`.
The service CIDR `/112` is fine since services are not allocated per-node.

⚠️ `networks.ipv6.nodeSubnetId` is mutually exclusive with `networks.ipv6.subnetPoolID` and
`networks.ipv6.nodeCIDR`. It requires `networks.subnetId` to be set — BYO dual-stack is only
supported together with BYO IPv4 subnet. It is immutable once set (enforced as part of the whole
`ipv6` field).

---

## Validation

### Static (admission webhook)

| Rule | Field |
| --- | --- |
| `subnetId` requires `networks.id` | `networks.subnetId` |
| `subnetId` requires `networks.router.id` | `networks.subnetId` |
| `subnetId` must be a valid UUID | `networks.subnetId` |
| `subnetId` is mutually exclusive with `workers`/`worker`/`subnetPool` | `networks.subnetId` |
| `subnetId` is immutable once set | `networks.subnetId` |
| `securityGroupId` requires `networks.id` | `networks.securityGroupId` |
| `securityGroupId` must be a valid UUID | `networks.securityGroupId` |
| `securityGroupId` is immutable once set | `networks.securityGroupId` |
| `shareNetworkId` requires `networks.id` | `networks.shareNetworkId` |
| `shareNetworkId` must be a valid UUID | `networks.shareNetworkId` |
| `shareNetworkId` is mutually exclusive with `shareNetwork.enabled` | `networks.shareNetworkId` |
| `shareNetworkId` is immutable once set | `networks.shareNetworkId` |
| `ipv6.nodeSubnetId` requires `networks.id` | `networks.ipv6.nodeSubnetId` |
| `ipv6.nodeSubnetId` requires `networks.router.id` | `networks.ipv6.nodeSubnetId` |
| `ipv6.nodeSubnetId` requires `networks.subnetId` (BYO IPv4 subnet) | `networks.ipv6.nodeSubnetId` |
| `ipv6.nodeSubnetId` must be a valid UUID | `networks.ipv6.nodeSubnetId` |
| `ipv6.nodeSubnetId` is mutually exclusive with `ipv6.subnetPoolID` | `networks.ipv6.nodeSubnetId` |
| `ipv6.nodeSubnetId` is mutually exclusive with `ipv6.nodeCIDR` | `networks.ipv6.nodeSubnetId` |
| `ipv6.podCIDR` is required when `ipv6.nodeSubnetId` is set | `networks.ipv6.podCIDR` |
| `ipv6.serviceCIDR` is required when `ipv6.nodeSubnetId` is set | `networks.ipv6.serviceCIDR` |
| `ipv6` is immutable once set | `networks.ipv6` |

### Dynamic (config validator, requires OpenStack API)

| Rule | Field |
| --- | --- |
| Network must exist | `networks.id` |
| Subnet must exist in the specified network | `networks.subnetId` |
| Router must exist | `networks.router.id` |
| Router must have an interface to the subnet | `networks.router` |
| Security group must exist | `networks.securityGroupId` |
| Share network must exist | `networks.shareNetworkId` |
| IPv6 node subnet must exist in the specified network | `networks.ipv6.nodeSubnetId` |
| Router must have an interface to the IPv6 node subnet | `networks.router` |

---

## Share Network (Manila CSI / NFS)

There are two ways to use Manila share networks with a shoot.

### Gardener-managed share network (`shareNetwork.enabled`)

Set `networks.shareNetwork.enabled: true` to have Gardener create and manage the share network.
This works with all subnet patterns including BYO subnet (`networks.subnetId`). The reconciler
first searches for an existing share network matching the shoot name and the
`(networkID, subnetID)` tuple — so if the user has pre-provisioned a Manila share network,
Gardener will discover and adopt it automatically.

**Delete semantics:** On shoot deletion, Gardener deletes the share network it found or created.

```yaml
networks:
  id: "<network-uuid>"
  subnetId: "<subnet-uuid>"
  router:
    id: "<router-uuid>"
  shareNetwork:
    enabled: true
```

### BYO share network (`shareNetworkId`)

Set `networks.shareNetworkId` to reference a pre-existing Manila share network. Gardener will use
it but will **not** create or delete it on shoot teardown. Requires `networks.id`. Mutually
exclusive with `shareNetwork.enabled`.

```yaml
networks:
  id: "<network-uuid>"
  subnetId: "<subnet-uuid>"
  router:
    id: "<router-uuid>"
  shareNetworkId: "<share-network-uuid>"
```

### Enabling Manila CSI

In both cases, enable the driver in `ControlPlaneConfig`:

```yaml
apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
kind: ControlPlaneConfig
loadBalancerProvider: haproxy
storage:
  csiManila:
    enabled: true
```

---

## Route controller and BYO router

When the shoot CNI runs in **non-overlay** mode (e.g. Calico BGP, Cilium without encapsulation),
the OpenStack CCM route controller is active. Gardener passes the router ID to the CCM via
`cloud.conf [Route] router-id`, and the CCM dynamically adds and removes **per-node host routes**
on that router as nodes join or leave the cluster.

When `networks.router.id` is set (BYO router), this means the **user's router will be mutated** by
the CCM — route entries for each node's pod CIDR are automatically added and removed. This is
required for pod-to-pod communication in non-overlay setups and is expected behavior, but operators
who manage the router outside Gardener should account for these CCM-programmed routes.

When the CNI uses an **overlay** network (e.g. Calico VXLAN, Cilium VXLAN), pod traffic is
encapsulated at the node level and the route controller is inactive. In this case the router is
not touched regardless of whether it is BYO or Gardener-managed.

---

## Pod CIDR overlap

When multiple shoots share the same subnet (i.e. the same `networks.id` and/or `networks.subnetId`),
and a CNI without an overlay network (e.g. Calico in non-overlay mode) is used, the pod CIDRs
specified in `shoot.spec.networking.pods` must not overlap between shoots. Overlapping pod CIDRs
will cause routing failures. Gardener does not validate this — it is the user's responsibility.
