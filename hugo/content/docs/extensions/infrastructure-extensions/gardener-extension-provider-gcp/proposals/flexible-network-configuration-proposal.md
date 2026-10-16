---
github_repo: 'https://github.com/gardener/gardener-extension-provider-gcp'
github_subdir: docs/proposals
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/infrastructure-extensions/gardener-extension-provider-gcp/proposals/flexible-network-configuration-proposal.md
  to: flexible-network-configuration-proposal.md
title: Flexible Network Configuration Proposal
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
   https://github.com/gardener/gardener-extension-provider-gcp/blob/master/docs/proposals/flexible-network-configuration-proposal.md
-->


# User-Managed Egress via BYO Subnet

> **Companion document**: an implementation checklist derived from this proposal lives in [`flexible-network-configuration-spec.md`](/docs/extensions/infrastructure-extensions/gardener-extension-provider-gcp/proposals/flexible-network-configuration-spec/). This proposal is the source of truth for design intent and acceptance criteria; the spec captures the concrete file paths, code sketches, and testing surface a coding agent (or engineer) needs to implement it.

<!-- toc -->

- [Summary](#summary)
- [Motivation](#motivation)
  - [Goals](#goals)
  - [Non-Goals](#non-goals)
- [Background: today's egress in `provider-gcp`](#background-todays-egress-in-provider-gcp)
- [Background: GCP egress patterns](#background-gcp-egress-patterns)
- [Proposal](#proposal)
  - [API changes](#api-changes)
  - [Derived mode](#derived-mode)
  - [Validation rules](#validation-rules)
  - [Reconciler behavior](#reconciler-behavior)
  - [Status shape](#status-shape)
  - [Cloud-provider config](#cloud-provider-config)
  - [Firewall-rule mutation contract](#firewall-rule-mutation-contract)
  - [Route-controller and pod routing](#route-controller-and-pod-routing)
  - [Bastion](#bastion)
  - [Single-stack IPv4 specifics](#single-stack-ipv4-specifics)
  - [Dual-stack specifics](#dual-stack-specifics)
- [Configuration patterns](#configuration-patterns)
- [Migration and immutability](#migration-and-immutability)
- [User responsibilities](#user-responsibilities)
- [Deletion / teardown](#deletion--teardown)
- [Documentation](#documentation)
- [Acceptance criteria](#acceptance-criteria)
- [Risks and upstream conflicts](#risks-and-upstream-conflicts)
- [Alternatives considered](#alternatives-considered)
- [Resolved questions](#resolved-questions)
- [Out of scope](#out-of-scope)

<!-- /toc -->

## Summary

Give shoot owners full control over GCP network topology and egress by allowing them to bring their own worker subnetwork inside their own VPC. In this mode the infrastructure reconciler creates no network-layer resources — no worker subnet, no Cloud Router, no Cloud NAT, no static firewall rules — and only *references* the pre-existing user resources. Egress becomes the user's responsibility: their own Cloud NAT, a custom default route to a network virtual appliance (NVA) or VPN/Interconnect, or no default route at all for network-isolated shoots.

Firewall rules programmed at runtime by the cloud-controller-manager (for `Service type=LoadBalancer`) and by `ingress-gce` (for dual-stack shoots) are tag-scoped to worker VMs and additive; they compose safely with any firewall policy the user has already installed on the BYO VPC.

Both single-stack IPv4 and dual-stack shoots are supported. The mode is signaled by a single API field; there is no new outbound-type enum.

## Motivation

Today the extension supports BYO VPC and BYO Cloud Router, but always creates the worker subnetwork, the Cloud Router NAT gateway, and four untargeted firewall rules inside whichever VPC is referenced. This does not compose with common enterprise topologies:

- **Central firewall egress.** All `0.0.0.0/0` from workers is sent to a central NVA or firewall equivalent in a hub project. Requires a user-owned default route on the worker subnet, incompatible with the Gardener-managed Cloud NAT that would otherwise SNAT the same traffic.
- **No egress at all.** Network-isolated shoots that terminate all traffic via Private Google Access + Private Service Connect. The user has no `0.0.0.0/0` route at all.
- **Fully user-owned VPC.** Enterprise platforms provision every subnet through a central team and hand shoot owners a subnet name. The four Gardener-created firewall rules — untargeted, applying to every VM in the VPC — are unacceptable in such shared VPCs.

### Goals

- Support BYO worker subnetwork inside a BYO VPC, for both IPv4-only and dual-stack shoots.
- Skip creating the Cloud Router, Cloud NAT, and static firewall rules when the user has taken over egress.
- Reuse the BYO worker subnet as the default subnet for internal Load Balancer forwarding-rule IP allocation, matching GCP's stock default.
- Zero breaking changes for existing shoots. Opting in is purely additive.

### Non-Goals

- **No new `OutboundType` enum.** Mode is derived from BYO field presence.
- **No BYO Cloud NAT or BYO Cloud Router API field.** In BYO mode Gardener owns neither the router nor the NAT gateway; users provision their own entirely out-of-band.
- **No BYO firewall-rule API field.** GCP firewall rules are per-Service objects and the CCM's runtime writes are tag-scoped, so BYO firewall behavior is achieved by *not creating* rules on the reconciler side.
- **No BYO internal LB subnet.** In BYO mode the workers subnet is the LB subnet, matching GCP's stock default. Users who require partitioned LB IP space use the per-Service annotation `networking.gke.io/internal-load-balancer-subnet`, supported upstream.
- **No shared VPC (host / service project split).** Deferred.
- **No in-place transition** between managed and BYO on an existing shoot.

## Background: today's egress in `provider-gcp`

- `InfrastructureConfig` API: `pkg/apis/gcp/types_infrastructure.go`. BYO surface today = VPC (`Networks.VPC.Name`) and Cloud Router (`Networks.VPC.CloudRouter.Name`). Neither covers the subnet, NAT, or firewall-rule dimensions.
- Reconciler is flow-based: `pkg/controller/infrastructure/infraflow/graph.go`. Task graph creates VPC → subnets → Cloud Router → Cloud NAT → firewall rules.
- The four static firewall rules are explicitly untargeted — `NullFields` in `ensure_utils.go` nulls `TargetTags` and `TargetServiceAccounts`, so every VM in the VPC is a valid destination.
- At runtime, the CCM and (for dual-stack) `ingress-gce` write additional resources into the same VPC:

| Resource | Written by | Cleaned up by |
| --- | --- | --- |
| Custom routes `shoot--*` (per-node pod CIDR, IPv4 only) | CCM route controller | `ensureKubernetesRoutesDeleted` |
| Firewall rules `k8s-fw-*` per LB Service | CCM LB controller, tag-scoped | `ensureFirewallRulesDeleted` |
| Firewall rules `k8s-fw-l7-*`, forwarding rules, backends, NEGs | `ingress-gce` (dual-stack) | firewall cleanup filter matches |

### GCP network primitives

- A **VPC network** is a global object; **subnetworks** within it are regional and span all zones in a region.
- **Firewall rules** are VPC-scoped and can target VMs by network tag, service account, or (if unscoped) every VM in the VPC.
- **Cloud Router** hosts BGP sessions and hosts **Cloud NAT** gateways. A Cloud NAT gateway source-NATs egress traffic for specific subnets.
- **Alias IP ranges** are secondary CIDRs on a subnetwork, used for container-native pod IPAM (required for dual-stack).
- **Custom routes** are VPC-scoped per-node pod-CIDR routes written by the CCM route controller (single-stack IPv4 only).
- **Internal Load Balancer forwarding rules** allocate their IP from a referenced subnet's CIDR. The CCM defaults to the subnet named in `subnetwork-name` in its cloud config; Services may override with an annotation.

## Background: GCP egress patterns

| Egress path | Automation creates | User provides |
| --- | --- | --- |
| Cloud NAT (Gardener-managed) | Cloud Router + Cloud NAT + external IPs | — |
| User-owned Cloud NAT on user-owned Cloud Router | nothing | BYO VPC + subnet + Cloud Router + Cloud NAT |
| Route to NVA / firewall | nothing | BYO VPC + subnet + `0.0.0.0/0` route to NVA |
| No egress (network-isolated) | nothing | BYO VPC + subnet; no default route |

The CCM has no concept of an egress topology. It only creates forwarding rules reactively for `Service type=LoadBalancer`. Any egress-topology decision must be made at the infra-reconciler level by choosing what *not* to create.

## Proposal

### Resource summary

**Per-shoot resources created by the infrastructure reconciler:**

| # | Resource | Managed mode | BYO mode |
| --- | --- | --- | --- |
| 1 | GCP IAM Service Account | created (`<technicalID>`) | not created — the BYO reconcile branch does not schedule `ensureServiceAccount` |
| 2 | VPC network | created (`<technicalID>`) unless `Networks.VPC.Name` set | required BYO reference (`Networks.VPC.Name`) — verify-only |
| 3 | Worker subnetwork (`PurposeNodes`) | created (`<technicalID>-nodes`) | required BYO reference (`Networks.SubnetWorkers.Name`) — verify-only |
| 4 | Internal subnetwork (`PurposeInternal`) | created (`<technicalID>-internal`) if `Networks.Internal` set | forbidden; internal LB IPs allocate from the workers subnet via `subnetwork-name` fallback in `cloudprovider.conf` |
| 5 | Services subnetwork (`PurposeServices`) | created (`<technicalID>-services`), dual-stack only | dual-stack: required BYO reference (`Networks.SubnetServices.Name`) — verify-only; IPv4: N/A |
| 6 | Cloud Router | created (`<technicalID>-cloud-router`) unless `Networks.VPC.CloudRouter.Name` set | not created; user manages any router out-of-band |
| 7 | Cloud NAT gateway | created on the Cloud Router | not created; user manages egress out-of-band |
| 8 | Cloud NAT external IPs | auto-allocated, or referenced via `Networks.CloudNAT.NatIPNames` | N/A — no NAT |
| 9 | Firewall rule `<technicalID>-allow-internal-access` (IPv4) | created, untargeted | not created; user pre-provisions equivalent (recommended: tag-scoped to `<technicalID>`) |
| 10 | Firewall rule `<technicalID>-allow-health-checks` (IPv4) | created, untargeted | not created; user pre-provisions equivalent |
| 11 | Firewall rule `<technicalID>-allow-internal-access-ipv6` | created, untargeted, dual-stack only | dual-stack: not created; user pre-provisions equivalent |
| 12 | Firewall rule `<technicalID>-allow-health-checks-ipv6` | created, untargeted, dual-stack only | dual-stack: not created; user pre-provisions equivalent |
| 13 | IPv6 CIDR assignment on subnets | waited-for during reconcile, dual-stack only | dual-stack: `ensureIPv6CIDRs` slices the shoot's IPv6 node/services CIDRs from the user subnets' pre-assigned external `/64` prefixes; Gardener assigns nothing on the subnet itself |
| 14 | Alias-IP ranges on worker VMs (dual-stack only) | written per-VM by MCM using the workers subnet's secondary range `ipv4-pod-cidr` | dual-stack: written per-VM by MCM using the workers subnet's secondary range named by `SubnetWorkers.PodSecondaryRangeName` |

**Per-Bastion resources (bastion controller):**

| # | Resource | Managed mode | BYO mode |
| --- | --- | --- | --- |
| 15 | Bastion VM + disk + NIC + external IP | created; NIC attaches to workers subnet | unchanged; NIC attaches to BYO workers subnet |
| 16 | Firewall rule `<base>-allow-ssh` | created, tag-scoped to bastion VM | unchanged |
| 17 | Firewall rule `<base>-egress-worker` | created, tag-scoped to bastion VM | unchanged; `Networks.Workers` is empty, so the CIDR is read live from GCP via `GetSubnet(SubnetWorkers.Name)` (`subnet.IpCidrRange`) instead |
| 18 | Firewall rule `<base>-deny-all` | created, tag-scoped to bastion VM | unchanged |

**Resources written at runtime by upstream controllers:**

| # | Resource | Written by | Managed mode | BYO mode |
| --- | --- | --- | --- | --- |
| 19 | Custom routes `shoot--*` (per-node pod CIDR) | CCM route controller | written to Gardener-managed VPC (single-stack IPv4 only) | written to BYO VPC (single-stack IPv4 only) |
| 20 | Firewall rules `k8s-fw-*` (per LB Service) | CCM LB controller | tag-scoped to `<technicalID>` in Gardener-managed VPC | tag-scoped to `<technicalID>` in BYO VPC — composes with user's rules |
| 21 | Firewall rules `k8s-fw-l7-*`, forwarding rules, backends, health checks, NEGs, IPv6 LB frontends | `ingress-gce` (dual-stack only) | in Gardener-managed VPC + project | in BYO VPC + user's project |

**Cleanup on shoot delete:**

| # | What | Managed mode | BYO mode |
| --- | --- | --- | --- |
| Rows 1–14 | Resources created by the infrastructure reconciler | deleted by the reconciler | not created, nothing to delete |
| Rows 15–18 | Bastion resources | deleted by bastion controller on Bastion CR delete | unchanged |
| Row 19 | CCM custom routes | deleted by `ensureKubernetesRoutesDeleted` | deleted by `ensureKubernetesRoutesDeleted` (BYO branch runs it as a force-delete safety net); normally the in-cluster CCM route controller removes them first as nodes are deleted |
| Row 20 | CCM firewall rules | deleted by `ensureFirewallRulesDeleted` (filter: `k8s`-prefix + `TargetTag = <technicalID>`) | deleted by `ensureCCMFirewallRulesDeleted` (filter: `k8s-fw-*` prefix + `TargetTag = <technicalID>`); normally the in-cluster CCM LB controller removes them first when the owning `Service` is deleted |
| Row 21 | `ingress-gce` resources | cleaned up by `ingress-gce` when owning `Ingress`/`Service` deleted; firewall rules swept by `ensureFirewallRulesDeleted` | same; user's project retains leaked global resources if `ingress-gce` deletion did not complete cleanly |

### API changes

Two new optional fields on `NetworkConfig` (`pkg/apis/gcp/types_infrastructure.go` + v1alpha1 mirror):

```go
// NetworkConfig holds information about the Kubernetes and infrastructure networks.
type NetworkConfig struct {
    // ... existing fields (VPC, CloudNAT, Internal, Worker, Workers, FlowLogs, MTU) ...

    // SubnetWorkers is a reference to a user-managed subnet for worker nodes.
    // When set, the extension operates in BYO (bring-your-own) subnet mode:
    // Gardener does not create or delete the subnet; it only attaches to it.
    // VPC.Name must be set; CloudNAT, Internal, Worker/Workers, FlowLogs, and MTU must not be set.
    // +optional
    SubnetWorkers *SubnetReference `json:"subnetWorkers,omitempty"`

    // SubnetServices is a reference to a user-managed subnet for services (required for dual-stack BYO shoots).
    // Only valid when SubnetWorkers is set.
    // +optional
    SubnetServices *SubnetReference `json:"subnetServices,omitempty"`
}

// SubnetReference is a reference to a user-managed GCP subnetwork.
type SubnetReference struct {
    // Name is the name of the subnetwork.
    Name string `json:"name"`

    // PodSecondaryRangeName is the name of the secondary IP range on the workers subnet
    // that is used for pod IPs (required for dual-stack BYO shoots).
    // Only valid on SubnetWorkers; forbidden on SubnetServices.
    // +optional
    PodSecondaryRangeName *string `json:"podSecondaryRangeName,omitempty"`
}
```

No new status enum. Mode is inferred from `SubnetWorkers` presence (see [Derived mode](#derived-mode)).

**Summary of subnets and ranges the extension references** (BYO mode):

| Shoot networking | Worker subnetwork (`SubnetWorkers`) | Services subnetwork (`SubnetServices`) |
| --- | --- | --- |
| Single-stack IPv4 | Primary IPv4 range only. No secondary range. | Not used. |
| Dual-stack | Primary IPv4 range + secondary IPv4 range for pods (`PodSecondaryRangeName`) + external IPv6 `/64`. | External IPv6 `/64`. No secondary range. |

### Derived mode

```go
// IsUserManagedEgress reports whether the shoot opts into BYO subnetworks and
// user-managed egress (i.e., SubnetWorkers is set), meaning the extension does
// not manage egress resources.
func (i *InfrastructureConfig) IsUserManagedEgress() bool {
    return i.Networks.SubnetWorkers != nil
}
```

The mode is signaled solely by `Networks.SubnetWorkers`. No enum, no explicit switch. Used in validation, reconciler task-gating, cloud-provider config emission, and deletion.

### Validation rules

Added in `pkg/apis/gcp/validation/infrastructure.go`.

**API-level, when `Networks.SubnetWorkers != nil`:**

| Rule | Reason |
| --- | --- |
| `Networks.VPC.Name` required | BYO subnet requires BYO VPC. |
| `Networks.VPC.CloudRouter` forbidden | Router is out of scope in BYO mode. |
| `Networks.Workers` (and deprecated `Networks.Worker`) forbidden | Worker CIDR is discovered from the actual subnet. |
| `Networks.Internal` forbidden | Internal LB IPs allocate from the workers subnet (see [Cloud-provider config](#cloud-provider-config)). |
| `Networks.CloudNAT` forbidden | User manages egress out-of-band. |
| `Networks.FlowLogs` forbidden | Flow logs are configured on the BYO subnet by the user. |
| `Networks.MTU` forbidden | MTU is a property of the BYO subnet. |
| `Networks.SubnetWorkers.Name` non-empty, valid GCP resource name | Standard field validation. |
| `Networks.SubnetWorkers.PodSecondaryRangeName` forbidden for single-stack IPv4 | Not used (custom routes). |
| `Networks.SubnetWorkers.PodSecondaryRangeName` required and non-empty for dual-stack | Alias-IP pod IPAM depends on it. |
| `Networks.SubnetServices` required for dual-stack | IPv6 services CIDR is sliced from this subnet's IPv6 range. |
| `Networks.SubnetServices.Name` non-empty when SubnetServices is set | Standard field validation. |
| `Networks.SubnetServices.PodSecondaryRangeName` forbidden | Only meaningful on the workers subnet. |
| `Networks.SubnetServices` forbidden for single-stack IPv4 | Only used for IPv6 services. |
| `Networks.SubnetServices` forbidden without `Networks.SubnetWorkers` | The two are a matched pair. |
| `Networks.SubnetServices.Name` must differ from `Networks.SubnetWorkers.Name` | Services IPv6 is sliced from the services subnet's `/64`; nodes/pods use the workers subnet's `/64`. Pointing both at one subnet would overlap services with nodes/pods. |

**Runtime (pre-flight, `pkg/controller/infrastructure/configvalidator.go`):**

| Rule | Reason |
| --- | --- |
| Referenced VPC exists (`GetNetwork`) | Fail fast with a clear error. |
| Referenced worker subnet exists in the VPC and in the shoot's region | Fail fast. |
| Worker subnet CIDR contains `shoot.spec.networking.nodes` and is non-overlapping with `shoot.spec.networking.{pods,services}` | Node IPs are assigned from the subnet's primary range; the subnet must cover the full declared nodes CIDR. |
| (dual-stack) Worker subnet has `stackType: IPV4_IPV6` and an assigned external IPv6 CIDR | Required for IPv6 pods and LBs. |
| (dual-stack) Secondary range named by `PodSecondaryRangeName` exists on the worker subnet, and its `ipCidrRange` equals `shoot.spec.networking.pods` | Alias-IP pod IPAM depends on exact CIDR match. |
| (dual-stack) Referenced services subnet exists in the VPC and region, has `stackType: IPV4_IPV6`, and has an assigned external IPv6 CIDR | Services subnet is used only for its IPv6 range. |

**Immutability** (`ValidateInfrastructureConfigUpdate`):

- Switching between BYO and managed mode is forbidden (`SubnetWorkers` present on exactly one of old/new config).
- In BYO mode `Networks.SubnetWorkers`, `Networks.SubnetServices`, and `Networks.VPC` are each validated as whole-struct immutable fields (`apivalidation.ValidateImmutableField`) — so `Name`, `PodSecondaryRangeName`, `CloudRouter`, etc. are all immutable once set.
- Existing VPC and CloudRouter immutability rules continue to apply in managed mode.

**Stack migration** (`ValidateInfrastructureConfigStackMigration`): in BYO mode, migrating a shoot between single-stack and dual-stack networking (adding/removing `IPv6` from `shoot.spec.networking.ipFamilies`) is forbidden. The BYO subnets are provisioned for a fixed stack type, so a stack change would invalidate the referenced ranges.

### Reconciler behavior

Task-gating in `pkg/controller/infrastructure/infraflow/graph.go`:

The reconcile graph takes a dedicated early-return branch in BYO mode (`buildReconcileGraph`): it schedules only the tasks below and returns, rather than gating each managed-mode task individually.

| Task | BYO mode |
| --- | --- |
| `ensureServiceAccount` | **skipped** — not scheduled in the BYO branch |
| `ensureVPC` | verify-only; `ensureVPC` dispatches to `ensureUserManagedVPC` whenever `Networks.VPC != nil` |
| `ensureNodesSubnet` | **replaced** by `ensureUserManagedWorkersSubnet` — verify existence, populate whiteboard, do not create or patch |
| `ensureInternalSubnet` | **skipped** |
| `ensureServicesSubnet` | **replaced** by `ensureUserManagedServicesSubnet` (dual-stack); skipped in IPv4 |
| `ensureCloudRouter` | **skipped** |
| `ensureCloudNAT` | **skipped** |
| `ensureIpAddresses` | **skipped** |
| `ensureFirewallRules` | **skipped** |
| `ensureIPv6CIDRs` | **run** in dual-stack BYO — slices the shoot's IPv6 node/services CIDRs from the user subnets' external `/64` prefixes; skipped in IPv4 |
| `ensureAliasIpRanges` | **skipped** — the dual-stack-migration task is managed-mode only and is not scheduled in the BYO branch |

Delete graph (`buildDeleteGraph`): the BYO branch schedules exactly two cleanup tasks and returns — `ensureKubernetesRoutesDeleted` (removes CCM-authored `shoot--*` per-node routes) and `ensureCCMFirewallRulesDeleted` (removes only CCM-authored `k8s-fw-*` rules that are tag-scoped to this cluster). These run as a force-delete safety net for the case where the in-cluster CCM is already gone and could not clean up after itself. All resource-destroying tasks (workers subnet, services subnet, VPC, router, NAT, static firewall rules) are skipped — those resources are user-owned. Note `ensureCCMFirewallRulesDeleted` is distinct from managed-mode `ensureFirewallRulesDeleted`: it never touches the static `FirewallRuleAllow*` rules, which in BYO mode are user-created.

### Status shape

`InfrastructureStatus.Networks` in BYO mode:

| Field | Value |
| --- | --- |
| `VPC.Name` | user-provided |
| `VPC.CloudRouter` | omitted |
| `Subnets[]` | `{Purpose: PurposeNodes, Name: <BYO name>}`, plus `{Purpose: PurposeServices, Name: <BYO name>}` for dual-stack |
| `NatIPs[]` | empty |
| `IPFamilies` | as shoot networking |

`Infrastructure.Status.EgressCIDRs` is **empty** in BYO mode. The status builder derives egress CIDRs from the NAT IPs (`status.Networks.NatIPs`), which is empty in BYO mode since Gardener provisions no NAT; the dual-stack IPv6 egress CIDR is only appended when IPv4 egress CIDRs already exist, so it is not added either. Gardener has no reliable way to know the user's egress IPs — they may come from a user-provisioned Cloud NAT, an NVA, an on-prem gateway, or nothing at all. Downstream consumers that rely on this field must handle the empty case.

### Cloud-provider config

Changes in `pkg/controller/controlplane/valuesprovider.go` (`getNetworkNames` at line ~748) and the cloud-provider-config template.

`getNetworkNames` gains a fallback: when the `PurposeInternal` subnet is absent — which is always the case in BYO mode — `subNetworkName` is populated from the `PurposeNodes` subnet name. Managed-mode behavior is untouched.

Resulting `cloudprovider.conf` in BYO mode:

```ini
[Global]
project-id="<projectID>"
network-name="<BYO VPC name>"
subnetwork-name="<BYO workers subnet name>"
multizone=true
local-zone="<region-zone>"
token-url=nil
node-tags="<shoot technicalID>"
```

The two upstream controllers (main CCM and `ingress-gce` for dual-stack) both receive the BYO workers subnet as their `subnetwork-name`. Internal Load Balancer forwarding rules default to allocating their IP from the workers subnet's CIDR, matching GCP's stock default. Users who need to partition LB IP space from worker IP space use the per-Service annotation `networking.gke.io/internal-load-balancer-subnet`.

### Firewall-rule mutation contract

**What the infrastructure reconciler does in BYO mode**: nothing. The four static allow rules are not created. The user takes over responsibility for these ingress paths.

**What the CCM writes at runtime** (`kubernetes/cloud-provider-gcp` LB controller):

| Trigger | Rule name | Target | Sources | Ports |
| --- | --- | --- | --- | --- |
| `Service type=LoadBalancer` (external or internal) | `k8s-fw-<hash>-<svcName>` | `TargetTags = [<technicalID>]` | `spec.loadBalancerSourceRanges` or `0.0.0.0/0` | Service node ports |
| Same | `k8s-<hash>-hc` | Same | GCP LB proxy ranges | Health-check ports |
| Service delete | (removed) |  |  |  |

All CCM writes are **tag-scoped to worker VMs**. They are additive with respect to any firewall rules the user already has on the BYO VPC.

**What `ingress-gce` writes** (dual-stack shoots only): additional firewall rules with names `k8s-fw-l7-*`, likewise tag-scoped.

**What the user must pre-provision on the BYO VPC** before creating the shoot:

Single-stack IPv4:

```bash
# Equivalent of <technicalID>-allow-internal-access
gcloud compute firewall-rules create <name>-allow-internal \
  --project=<project> --network=<vpc> \
  --direction=INGRESS --priority=1000 \
  --source-ranges=<shoot.nodes> \
  --target-tags=<technicalID> \
  --rules=icmp,ipip,tcp:1-65535,udp:1-65535

# Equivalent of <technicalID>-allow-health-checks
gcloud compute firewall-rules create <name>-allow-health-checks \
  --project=<project> --network=<vpc> \
  --direction=INGRESS --priority=1000 \
  --source-ranges=35.191.0.0/16,130.211.0.0/22,209.85.152.0/22,209.85.204.0/22 \
  --target-tags=<technicalID> \
  --rules=tcp:30000-32767,udp:30000-32767
```

Dual-stack additionally requires IPv6 mirrors:

```bash
# IPv6 intra-VPC
gcloud compute firewall-rules create <name>-allow-internal-ipv6 \
  --project=<project> --network=<vpc> \
  --direction=INGRESS --priority=1000 \
  --source-ranges=<workers subnet IPv6 CIDR>,<services subnet IPv6 CIDR> \
  --target-tags=<technicalID> \
  --rules=ipv6-icmp,ipip,tcp:1-65535,udp:1-65535

# IPv6 GCP LB proxy ranges
gcloud compute firewall-rules create <name>-allow-health-checks-ipv6 \
  --project=<project> --network=<vpc> \
  --direction=INGRESS --priority=1000 \
  --source-ranges=2600:2d00:1:b029::/64,2600:2d00:1:1::/64,2600:1901:8001::/48 \
  --target-tags=<technicalID> \
  --rules=tcp:30000-32767,udp:30000-32767
```

The `<technicalID>` value is the shoot's Kubernetes technical ID (e.g. `shoot--foo--bar`), which is the network tag every worker VM carries — see `pkg/controller/worker/machines.go:232-237`. It is also the value emitted as `node-tags` in the CCM's `cloudprovider.conf`.

Users MAY omit `--target-tags` to make the rules VPC-wide, matching today's managed-mode behavior exactly. Tag-scoping is strongly recommended for shared BYO VPCs.

> **Note on today's managed-mode rules**: the four static rules created by the reconciler today are explicitly untargeted — every VM in the VPC is a valid destination. This is workable in single-owner VPCs but permissive in shared VPCs. Every worker VM already carries the shoot's technical ID as a network tag, so the scope information exists; today's static rules simply don't use it. Users replacing these rules in BYO mode are recommended to close that gap. Tightening managed-mode rules is a natural follow-up but out of scope here.

### Route-controller and pod routing

**Single-stack IPv4**: pod-to-pod traffic uses **custom routes** written to the BYO VPC by the CCM route controller (`--configure-cloud-routes=true`, one route per node, named `shoot--*`, next-hop instance = the node VM). The CCM writes these routes into the user's VPC and they are cleaned up by `ensureKubernetesRoutesDeleted` on shoot delete.

The default 400-routes-per-VPC quota applies. Large shoots on a densely populated shared BYO VPC may need the extended quota (support ticket). Documented as a user-facing note.

**Dual-stack**: no custom routes. Pod-to-pod traffic uses alias IPs on the workers subnet. The MCM writes alias IP ranges per-VM using the secondary range named by `SubnetWorkers.PodSecondaryRangeName`.

### Bastion

Bastion works as-is in BYO mode, with one correction:

The bastion controller currently reads `WorkersCIDR` from `InfrastructureConfig.Networks.Workers` (`actuator.go:83-84`). In BYO mode that field is empty. It instead looks up the worker subnet's primary CIDR live from GCP via `GetSubnet(SubnetWorkers.Name)` and returns `subnet.IpCidrRange` (`actuator.go:87-97`). Small refactor; no API change.

The three bastion firewall rules (`<base>-allow-ssh`, `<base>-egress-worker`, `<base>-deny-all`) are tag-scoped to the bastion VM and land on the BYO VPC as tightly-scoped rules that clean up on bastion delete.

Gardener's GCP principal must have `compute.firewalls.{create,update,delete}` permission on the project owning the BYO VPC.

### Single-stack IPv4 specifics

In single-stack IPv4 BYO mode, the worker subnet must have `stackType: IPV4_ONLY` (or omitted, which defaults to IPv4-only). Pod-to-pod traffic uses **custom routes**: the CCM route controller writes one `shoot--*` VPC route per node (next-hop = the node VM). No secondary IP range is required or permitted on the worker subnet — setting `SubnetWorkers.PodSecondaryRangeName` is rejected. `SubnetServices` is likewise forbidden. Custom routes are cleaned up by `ensureKubernetesRoutesDeleted` on shoot deletion.

The user must pre-provision firewall rules equivalent to `<technicalID>-allow-internal-access` (IPv4 intra-VPC) and `<technicalID>-allow-health-checks` (GCP LB health-check probes). IAM permissions to create/delete custom routes and firewall rules in the BYO project are required for the Gardener GCP principal.

### Dual-stack specifics

In dual-stack BYO mode, both `SubnetWorkers` and `SubnetServices` must be provided. The worker subnet must have `stackType: IPV4_IPV6` with an assigned external IPv6 `/64`. Pod-to-pod traffic uses **alias IPs**: the MCM writes an alias IP range per VM from the secondary IPv4 range named by `SubnetWorkers.PodSecondaryRangeName`, whose `ipCidrRange` must exactly match `shoot.spec.networking.pods`. No custom routes are written.

The services subnet must have `stackType: IPV4_IPV6` and `ipv6AccessType: EXTERNAL`; the extension slices a `/108` from its IPv6 `/64` for the shoot's IPv6 services CIDR. Additional firewall rules for IPv6 (`<technicalID>-allow-internal-access-ipv6`, `<technicalID>-allow-health-checks-ipv6`) must be pre-provisioned by the user. `ingress-gce` writes `k8s-fw-l7-*` rules into the BYO VPC at runtime.

## Configuration patterns

**Managed (unchanged, today's default):**

```yaml
apiVersion: gcp.provider.extensions.gardener.cloud/v1alpha1
kind: InfrastructureConfig
networks:
  workers: 10.250.0.0/16
```

**Managed subnetwork inside a BYO VPC (unchanged existing capability):**

```yaml
apiVersion: gcp.provider.extensions.gardener.cloud/v1alpha1
kind: InfrastructureConfig
networks:
  vpc:
    name: my-vpc
    cloudRouter:
      name: my-cloud-router
  workers: 10.250.0.0/16
```

**BYO subnetwork, single-stack IPv4:**

```yaml
apiVersion: gcp.provider.extensions.gardener.cloud/v1alpha1
kind: InfrastructureConfig
networks:
  vpc:
    name: my-vpc
  subnetWorkers:
    name: my-workers
```

Shoot spec:

```yaml
spec:
  networking:
    ipFamilies: [IPv4]
    nodes:    10.100.0.0/16
    pods:     10.96.0.0/11
    services: 10.200.0.0/20
```

User pre-provisions `my-workers` in `my-vpc` with a primary range that contains `shoot.spec.networking.nodes` (e.g. `10.100.0.0/16`), and any egress topology of their choice.

**BYO subnetwork, dual-stack:**

```yaml
apiVersion: gcp.provider.extensions.gardener.cloud/v1alpha1
kind: InfrastructureConfig
networks:
  vpc:
    name: my-vpc
  subnetWorkers:
    name: my-workers
    podSecondaryRangeName: my-pods
  subnetServices:
    name: my-services
```

Shoot spec:

```yaml
spec:
  networking:
    ipFamilies: [IPv4, IPv6]
    nodes:    10.100.0.0/16
    pods:     10.96.0.0/11
    services: 10.200.0.0/20
```

User pre-provisions:

- `my-workers` — `stackType: IPV4_IPV6`, external `/64` IPv6 CIDR assigned, primary range `10.100.0.0/16` (must contain `shoot.spec.networking.nodes: 10.100.0.0/16`), secondary range `my-pods = 10.96.0.0/11` (must exactly equal `shoot.spec.networking.pods`).
- `my-services` — `stackType: IPV4_IPV6`, external `/64` IPv6 CIDR assigned.

## Migration and immutability

- Existing managed shoots continue to work with no changes. `Networks.SubnetWorkers` and `Networks.SubnetServices` are optional and additive.
- New shoots may opt into BYO mode at creation time.
- In-place transition between managed and BYO mode is **forbidden**. Once created with `SubnetWorkers` set, the shoot stays in BYO mode; once created without, it stays managed. Enforced in `ValidateInfrastructureConfigUpdate`. Rationale: transitioning would recreate/delete the worker subnet, Cloud Router, Cloud NAT, and firewall rules while workloads are running — disruptive and unnecessary for initial delivery.
- In BYO mode, migrating a shoot between single-stack and dual-stack (changing `shoot.spec.networking.ipFamilies`) is **forbidden**, enforced in `ValidateInfrastructureConfigStackMigration`. The BYO subnets are pre-provisioned for a fixed stack type and ranges; a stack change would invalidate them.

## User responsibilities

Before creating a BYO shoot the user MUST provide:

1. A VPC network.
1. A worker subnetwork inside that VPC in the shoot's region, with primary IPv4 CIDR that contains `shoot.spec.networking.nodes` and is non-overlapping with `shoot.spec.networking.{pods,services}`.
1. (Dual-stack only) The worker subnetwork additionally configured with:
   - `stackType: IPV4_IPV6` and `ipv6AccessType: EXTERNAL` — GCP assigns an external `/64` IPv6 CIDR at subnet creation.
   - A secondary IPv4 range with `ipCidrRange` **exactly equal** to `shoot.spec.networking.pods`. The name is arbitrary and passed into `Networks.SubnetWorkers.PodSecondaryRangeName`.
1. (Dual-stack only) A separate services subnetwork in the same VPC and region, with `stackType: IPV4_IPV6` and `ipv6AccessType: EXTERNAL`. A primary IPv4 range is required by GCP (any small non-overlapping range will do; it is unused by Gardener) and no secondary range is needed. The extension slices a `/108` out of this subnet's `/64` for the IPv6 services CIDR.
1. Firewall rules on the VPC allowing intra-shoot traffic and GCP LB health-check probes to worker VMs. See [Firewall-rule mutation contract](#firewall-rule-mutation-contract) for the concrete `gcloud` commands.
1. An egress topology of the user's choice: user-owned Cloud NAT on a user-owned Cloud Router, a `0.0.0.0/0` route to an NVA / VPN / Interconnect, or no default route for network-isolated shoots.
1. IAM permissions on the project owning the BYO VPC such that Gardener's GCP principal can create/update/delete firewall rules and (in single-stack IPv4) custom routes at runtime for the CCM and bastion controller.

The user MUST NOT:

- Rely on `shoot.status.provider.egressCIDRs` — it is empty in BYO mode.
- Run competing automation against the CCM's `shoot--*` routes or `k8s-fw-*` firewall rules; these are managed by the in-cluster CCM lifecycle.

## Deletion / teardown

- BYO VPC, worker subnetwork, services subnetwork (dual-stack) — never deleted by Gardener.
- Cloud Router / Cloud NAT — never created in BYO mode, never deleted.
- Four static infra firewall rules — never created in BYO mode, never deleted.
- CCM-authored `k8s-fw-*` firewall rules — normally removed by the in-cluster CCM LB controller when the owning `Service` is deleted; the BYO delete flow additionally runs `ensureCCMFirewallRulesDeleted` as a force-delete safety net (tag-scoped `k8s-fw-*` rules only; never the static user-owned allow rules).
- CCM-authored `shoot--*` custom routes (IPv4 only) — normally removed by the in-cluster CCM route controller as nodes are drained; the BYO delete flow additionally runs `ensureKubernetesRoutesDeleted` as a safety net.
- `ingress-gce` L7 global resources — cleaned up by `ingress-gce` when the owning `Ingress`/`Service` is deleted. Users must ensure all such objects are deleted before shoot deletion.
- Orphan artifacts (CCM-authored firewall rules, custom routes) that the CCM did not manage to remove before teardown (crash, force-delete, transient API errors) remain in the user's VPC. The user is responsible for pruning them.

## Documentation

Two new user-facing documents:

1. `docs/usage/user-managed-egress.md` — step-by-step guide with `gcloud` recipes for pre-provisioning VPC + subnet(s) + firewall rules, worked examples for both egress patterns (user-owned Cloud NAT, NVA route, no-egress), and explicit warnings about the empty `EgressCIDRs` status.
1. A new subsection in `docs/usage/usage.md` cross-linking to (1).

The existing `docs/usage/ipv6.md` gains a section on dual-stack BYO requirements (secondary range naming, services subnet).

`docs/usage/user-managed-egress.md` must include a dedicated section documenting every Gardener component that writes into the BYO VPC at runtime, so users understand what their VPC will be subject to beyond the initial pre-provisioning step:

| Component | Runs in | Writes to BYO VPC | Cleaned up by |
| --- | --- | --- | --- |
| MCM | seed | Creates/deletes worker VMs in the nodes subnet; attaches network tags (`<technicalID>`, `kubernetes-io-cluster-<technicalID>`, `kubernetes-io-role-node`) to every VM NIC | MCM on scale-down / node deletion |
| CCM (IPv4) | shoot | Creates one `shoot--*` custom route per node for pod-CIDR routing | `ensureKubernetesRoutesDeleted` on shoot delete; CCM on node deletion |
| CCM (LB) | shoot | Creates `k8s-fw-<hash>` firewall rule + `k8s-<hash>-hc` health-check rule per `Service type=LoadBalancer`, tag-scoped to `<technicalID>` | CCM on Service delete |
| `ingress-gce` | seed (dual-stack only) | Creates `k8s-fw-l7-*` firewall rules + global forwarding rules, backend services, health checks, NEGs | `ingress-gce` on Ingress/Service delete; firewall rules swept by `ensureFirewallRulesDeleted` |
| Bastion controller | seed | Creates bastion VM + disk + NIC in nodes subnet; creates three tag-scoped firewall rules | Bastion controller on Bastion CR delete |
| Infrastructure reconciler (delete) | seed | Deletes CCM-authored `k8s-fw-*` rules and `shoot--*` routes remaining at shoot deletion time | — |

Users must ensure their IAM setup grants Gardener's GCP principal `compute.firewalls.*` and `compute.routes.*` on the project owning the BYO VPC, and must not run competing automation against the CCM-authored routes or firewall rules.

## Acceptance criteria

### Group A — Regression

| ID | Configuration | Pass criteria |
| --- | --- | --- |
| A1 | Managed default (no BYO fields) | Reconciles green; VPC, worker subnet, Cloud Router, Cloud NAT, four firewall rules all created; egress via Cloud NAT. |
| A2 | Managed subnet inside BYO VPC (`Networks.VPC.Name` + `CloudRouter.Name`) | Reconciles green; Gardener creates worker subnet + Cloud NAT on user's router + firewall rules inside BYO VPC. |
| A3 | Managed with `Networks.CloudNAT.NatIPNames` set | NAT uses user's static IPs; `EgressCIDRs` populated with `/32` entries. |
| A4 | Managed dual-stack | Reconciles green; workers + services subnets created; ingress-gce deployed; alias-IP pod IPAM works; IPv6 LBs functional. |

### Group B — Valid BYO configurations

| ID | Configuration | Pass criteria |
| --- | --- | --- |
| B1 | BYO subnet, IPv4, user-owned Cloud NAT already attached | Shoot reconciles green; `cloudprovider.conf` contains `subnetwork-name = <BYO workers subnet>`; egress flows via user's NAT. |
| B2 | BYO subnet, IPv4, `0.0.0.0/0` route to NVA in user's VPC | Same reconcile; egress flows via NVA; per-node pod CIDR routes still written to VPC by CCM. |
| B3 | BYO subnet, IPv4, no default route (network-isolated) | Reconciles green; in-VPC traffic works; internet egress fails as expected. |
| B4 | BYO subnet + services subnet, dual-stack | Reconciles green; alias-IP pods functional; IPv6 services allocated from services subnet; ingress-gce creates IPv6 LBs. |
| B5 | BYO subnet, IPv4, multiple shoots sharing the same BYO VPC | Both reconcile; each shoot's CCM writes are tag-scoped and do not interfere. |

### Group C — Rejected configurations

| ID | Configuration | Pass criteria |
| --- | --- | --- |
| C1 | `SubnetWorkers` set, `VPC.Name` unset | API validation rejects. |
| C2 | `SubnetWorkers` set + `VPC.CloudRouter` set | Rejected. |
| C3 | `SubnetWorkers` set + `Networks.Workers` non-empty | Rejected. |
| C4 | `SubnetWorkers` set + `Networks.Internal` set | Rejected. |
| C5 | `SubnetWorkers` set + `Networks.CloudNAT` set | Rejected. |
| C6 | `SubnetWorkers` set + `Networks.FlowLogs` set | Rejected. |
| C7 | `SubnetWorkers` set + `Networks.MTU` set | Rejected. |
| C8 | IPv4 shoot + `SubnetWorkers.PodSecondaryRangeName` set | Rejected. |
| C9 | Dual-stack shoot + `SubnetWorkers.PodSecondaryRangeName` unset | Rejected. |
| C10 | Dual-stack shoot + `SubnetServices` unset | Rejected. |
| C11 | IPv4 shoot + `SubnetServices` set | Rejected. |
| C12 | `SubnetServices` set without `SubnetWorkers` | Rejected. |
| C13 | BYO subnet name refers to a subnet that does not exist | Runtime validator rejects. |
| C14 | BYO subnet CIDR does not contain `shoot.spec.networking.nodes` | Runtime validator rejects. |
| C15 | Dual-stack BYO subnet with `stackType: IPV4_ONLY` | Runtime validator rejects. |
| C16 | Dual-stack BYO subnet where `PodSecondaryRangeName` does not exist on the subnet | Runtime validator rejects. |
| C17 | Dual-stack BYO subnet where secondary range CIDR mismatches `shoot.spec.networking.pods` | Runtime validator rejects. |
| C18 | Dual-stack BYO + `SubnetServices.Name` equal to `SubnetWorkers.Name` | API validation rejects. |

### Group D — Update / immutability

| ID | Change | Pass criteria |
| --- | --- | --- |
| D1 | Managed shoot: attempt to add `SubnetWorkers` | Rejected. |
| D2 | BYO shoot: attempt to remove `SubnetWorkers` | Rejected. |
| D3 | BYO shoot: change `SubnetWorkers.Name` | Rejected. |
| D4 | Dual-stack BYO shoot: change `SubnetWorkers.PodSecondaryRangeName` or `SubnetServices.Name` | Rejected. |
| D5 | BYO shoot: change `Networks.VPC` | Rejected (VPC is whole-struct immutable in BYO mode). |
| D6 | BYO shoot: change `shoot.spec.networking.ipFamilies` (single-stack ↔ dual-stack) | Rejected by `ValidateInfrastructureConfigStackMigration`. |

### Group E — Runtime invariants

| ID | Assertion |
| --- | --- |
| E1 | Reconciler makes zero create/update calls against the BYO VPC, worker subnet, or services subnet. |
| E2 | No `<technicalID>-cloud-router` or `cloud-nat` resource exists in the shoot's project after reconcile. |
| E3 | No `<technicalID>-allow-internal-access` firewall rule exists after reconcile. |
| E4 | `cloudprovider.conf` contains `subnetwork-name = <BYO workers subnet>`. |
| E5 | Creating `Service type=LoadBalancer` (external) → CCM creates `k8s-fw-*` rules tag-scoped to the shoot technical ID; deleting → rules removed. |
| E6 | Creating `Service type=LoadBalancer` with `cloud.google.com/load-balancer-type: Internal` → forwarding rule allocates IP from workers subnet CIDR. |
| E7 | Creating `Service type=LoadBalancer` with `networking.gke.io/internal-load-balancer-subnet: my-lb-subnet` → forwarding rule allocates IP from `my-lb-subnet`. |
| E8 | Creating a `Bastion` resource → bastion VM created with NIC in BYO worker subnet; three tag-scoped firewall rules created; ingress SSH from `Bastion.Spec.Ingress` CIDRs succeeds. |
| E9 | `Infrastructure.Status.EgressCIDRs` is empty. |

### Group F — Deletion / teardown

| ID | Action | Pass criteria |
| --- | --- | --- |
| F1 | Delete shoot after all `Service type=LoadBalancer` and `Ingress` objects deleted | BYO VPC, worker subnet, services subnet remain unchanged. Zero Gardener-created resources remain in the BYO VPC. |
| F2 | Delete shoot with an outstanding `Service type=LoadBalancer` | CCM removes the LB and its firewall rules before Gardener finalizes deletion. |
| F3 | Delete shoot where two shoots share the same BYO VPC | Deleted shoot's `k8s-fw-*` and `shoot--*` resources removed; other shoot's resources untouched. |

## Risks and upstream conflicts

| # | Category | Concern | Mitigation / stance |
| --- | --- | --- | --- |
| 1 | Untargeted rules in managed mode | Today's four static firewall rules are network-wide (no `TargetTags`). BYO shoots that omit `--target-tags` in their replacement rules replicate this behavior. In a shared VPC this allows cross-cluster traffic. | Strongly documented. Tag-scoping is the recommendation. Tightening managed-mode rules is a future follow-up. |
| 2 | Custom routes quota (IPv4) | In single-stack IPv4, the CCM writes per-node pod-CIDR routes to the BYO VPC. The default 400-route limit per VPC applies across all shoots using it. Dense shared VPCs may need the 1000-route quota increase. | Documented user-facing note. Runtime validator does not check quota. |
| 3 | Orphan artifacts on shoot deletion | CCM-authored firewall rules and custom routes that were not cleaned up before teardown remain in the user's VPC. | Not cleaned up by Gardener. User responsibility. Documented. |
| 4 | `ingress-gce` global resources | Global resources created by `ingress-gce` (URL maps, target proxies) are not cleaned up by the extension's teardown. | User must delete all `Ingress`/dual-stack `Service` objects before shoot deletion. Documented. |
| 5 | IAM permissions | Gardener's GCP principal needs `compute.firewalls.*` and `compute.routes.*` on the project owning the BYO VPC. In locked-down enterprise projects where only specific roles are assigned, LB Services and bastion creation fail. | User-facing prerequisite. Documented. |
| 6 | `EgressCIDRs` empty | Downstream consumers (e.g. NetworkPolicy automation that uses egress IPs) that rely on `shoot.status.provider.egressCIDRs` will receive an empty list. | Documented. Consumers must handle the empty case. |

## Alternatives considered

**Explicit `OutboundType` enum.** Rejected: presence-derived mode is consistent with prior Gardener extension work, and a five-value enum where four values are placeholder is worse than no enum.

**BYO firewall-rule API field.** Rejected: GCP firewall rules are per-Service objects, not shared containers. The CCM's runtime writes are already tag-scoped and additive. Adding a BYO firewall field would create API surface with no functional benefit — the extension simply stops creating its own untargeted allow rules.

**BYO internal LB subnet as a separate field.** Rejected: the workers subnet serves as the LB subnet by default (matches GCP stock behavior). Users who need a specific LB subnet use the upstream per-Service annotation `networking.gke.io/internal-load-balancer-subnet`.

**BYO Cloud NAT / Cloud Router as API fields.** Rejected: in BYO mode Gardener owns neither the router nor the NAT gateway. If the user wants NAT egress they provision their own out-of-band; Gardener has no reason to reference either.

**Auto-discover the pod secondary range name from the subnet.** Rejected: subnets may have multiple secondary ranges, and inference from CIDR compatibility is fragile. Explicit `PodSecondaryRangeName` is one small field with clear semantics.

**In-place transition between managed and BYO.** Rejected: recreates/deletes the worker subnet, Cloud Router, Cloud NAT, and firewall rules while workloads are running. Deferred as future work.

## Resolved questions

- **Internal LB subnet in BYO mode** — Resolved. Forbidden. The workers subnet serves as the default ILB subnet via the `getNetworkNames` fallback (when `PurposeInternal` is absent, `subNetworkName` falls back to `PurposeNodes`). Users requiring a dedicated LB IP pool use `networking.gke.io/internal-load-balancer-subnet` per-Service.
- **Pod routing in single-stack IPv4** — Resolved. Custom routes (existing CCM behavior). No alias-IP secondary range required. `PodSecondaryRangeName` is forbidden for IPv4-only shoots.
- **Pod routing in dual-stack** — Resolved. Alias IPs via the user-named secondary range (`PodSecondaryRangeName`). The MCM writes alias IP ranges per-VM. No custom routes in dual-stack mode.
- **Firewall ownership in BYO mode** — Resolved. Static infra rules are not created. CCM writes tag-scoped rules at runtime; user pre-provisions equivalent static rules. See [Firewall-rule mutation contract](#firewall-rule-mutation-contract).

## Out of scope

- Shared VPC (host / service project split). Would require emitting `network-project-id` in `cloudprovider.conf`. `Networks.VPC` can grow a `HostProjectID` field without a breaking rename.
- BYO firewall rules as an API field.
- BYO Cloud NAT or Cloud Router as API fields.
- BYO internal LB subnet as an API field.
- In-place transition between managed and BYO on an existing shoot.
- `--configure-cloud-routes=false` for overlay-CNI shoots in IPv4 single-stack mode. Would let the BYO VPC stay free of per-node routes when using an overlay CNI. Deferred; requires a new `SubnetWorkers.SkipRouteReconciliation` field and chart changes to the CCM deployment.
- Tightening the managed-mode static firewall rules to be tag-scoped. Natural follow-up but independent of this feature.
- Proxy-only subnet (`purpose: REGIONAL_MANAGED_PROXY`) for Internal HTTP(S) Load Balancer via `ingress-gce`. Not created today; users provision it themselves if needed.
- Metadata labels (`kubernetes-io-cluster-<technicalID>: shared`) on the BYO VPC / subnets. The reconciler does not label user-owned resources; ownership tracking for shared BYO VPCs is deferred.
