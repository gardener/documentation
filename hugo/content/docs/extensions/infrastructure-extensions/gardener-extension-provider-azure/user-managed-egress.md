---
github_repo: 'https://github.com/gardener/gardener-extension-provider-azure'
github_subdir: docs/usage
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/user-managed-egress.md
  to: user-managed-egress.md
persona: Users
title: User-managed egress via BYO subnet
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
   https://github.com/gardener/gardener-extension-provider-azure/blob/master/docs/usage/user-managed-egress.md
-->


# User-managed egress via BYO subnet

Azure shoots may bring their own worker **subnet** inside their own **VNet** to take full control of
egress. In this mode Gardener stops creating and managing the worker subnet, its route table, its
network security group, the NAT Gateway, and the `allow-{tcp,udp}-egress` loadbalancer workaround
services.

You pre-provision the subnet and the network security group attached to it. A route table is
required only for shoots that do **not** use an overlay CNI, because that is the case where the seed
cloud-controller-manager has to write per-node pod-CIDR routes into the VNet. A NAT Gateway is
optional and only needed if you want Azure-managed egress instead of your own firewall or NVA.
Gardener only discovers and references whatever you attach.

> [!NOTE]
> The BYO worker subnet must carry a **single address prefix**. Azure lets a subnet grow by
> adding multiple prefixes, but Gardener's infrastructure status and the bastion NSG rules are
> single-CIDR today, so multi-prefix subnets are rejected during infrastructure reconciliation.

The NSG attached to your subnet is what the Azure cloud-controller-manager writes
`Service type=LoadBalancer` ingress rules onto, and what the bastion controller writes bastion SSH
rules onto. See [The NSG](#the-nsg) for the details of what rules land there and what flows the
NSG must permit.

> [!IMPORTANT]
> **The BYO subnet (and its route table) must not be shared with any other Gardener shoot.**
> If you provision a subnet for a shoot, that subnet is dedicated to that one shoot.
> 
> Why: in non-overlay CNI shoots (`overlay.enabled: false`), the seed cloud-controller-manager
> writes one route per node into the route table attached to your subnet. Azure allows exactly
> one route table per subnet. Two shoots pointing at the same subnet therefore share the same
> route table, and their CCMs *mutually delete* each other's routes on every reconcile —
> silently breaking pod-to-pod connectivity across nodes. Overlay-CNI shoots (Gardener default:
> Cilium with VXLAN) do not have this specific writer conflict, but the CCM still writes
> LB Service rules into the NSG attached to your subnet — and Azure enforces one NSG per subnet
> as well, so a shared subnet still means a shared NSG on the CCM's write path. The
> "one-shoot-per-subnet" rule therefore applies uniformly across CNI modes.
> 
> Gardener does not enforce this rule at admission time — it is your responsibility to keep
> subnets one-to-one with shoots.

This document covers the shoot-owner's side of the workflow. For the full design intent and
acceptance criteria see the design proposal at
[`docs/proposals/flexible-network-configuration-proposal.md`](/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/proposals/flexible-network-configuration-proposal/).

## When to use it

Reach for BYO subnet when any of the following applies:

- **Central firewall egress** — all `0.0.0.0/0` from workers should flow through an Azure Firewall
  or third-party NVA sitting in a hub VNet. The user attaches a route table with a
  `VirtualAppliance` next-hop to their worker subnet.
- **Network-isolated / air-gapped shoots** — the shoot must not have any internet egress. The user
  attaches a route table with no default route; Kubernetes traffic terminates via Private
  Endpoints (private API server, Private Endpoints for MCR, etc.).
- **Platform-team provisioned networking** — the enterprise's platform team pre-provisions the
  subnet and route table and hands the shoot owner the identifiers.

For every other scenario the default managed-mode shoot (with an optional NAT Gateway) is simpler
and unchanged.

## Prerequisites (user responsibilities)

Before creating the shoot, the user MUST provide the following in their Azure subscription:

1. A **VNet**.
1. A **subnet** inside that VNet, whose CIDR fits inside `shoot.spec.networking.nodes` and does not
   overlap `shoot.spec.networking.pods` or `.services`. **The subnet must be dedicated to this
   shoot** — no other Gardener Azure shoot may reference the same subnet. See the important
   callout above for the rationale.
1. A **network security group** attached to that subnet, dedicated to this shoot. Gardener does
   not create it, and the CCM will write LB Service rules onto it during shoot operation. It must
   permit the flows listed in [The NSG](#the-nsg) below.
1. A **route table** attached to that subnet, dedicated to this shoot (do not attach it to any
   other subnet used by another Gardener shoot). For firewall-based egress this route table should
   contain a `0.0.0.0/0` route to the user's firewall / NVA (next-hop = `VirtualAppliance` +
   firewall IP). For network-isolated shoots the route table may be empty. If the shoot uses an
   overlay CNI (Cilium with VXLAN or Geneve — i.e. `shoot.spec.networking.providerConfig`
   sets `overlay.enabled: true`), the route table can be omitted entirely; the seed CCM's route
   controller is disabled automatically in that case (same behavior as provider-gcp). Note: Calico
   overlay is **not supported on Azure** (the admission webhook rejects it) — only Cilium supports
   overlay mode on Azure.
1. Any firewall rules required for Azure control-plane traffic and container image pulls —
   at minimum the `AzureCloud` service tag, the `AzureContainerRegistry` service tag, and the
   public MCR endpoint (`mcr.microsoft.com` and its CDN backends).
1. Both the NSG and the route table must live in the **same Azure subscription** as the shoot.
   They may live in any resource group within that subscription — cluster RG, VNet RG, or a
   central network-team RG are all supported.

The user MUST NOT:

- **Reuse the subnet, its NSG, or its route table across multiple Gardener Azure shoots** (see
  the callout at the top of this page).
- Run competing automation (Terraform, policy engines) against the discovered NSG or route table
  in ways that fight the CCM/bastion controller's normal rule/route management.
- Rely on `shoot.status.networking.egressCIDRs` for firewall allowlisting on the receiving side.
  That field is empty (`nil`) in BYO mode because Gardener has no reliable way to know the user's
  firewall / NVA egress IPs.
- Expect Gardener to prune orphan rules or routes on shoot deletion — see [Deletion](#deletion)
  below.

## Configuring a BYO-subnet shoot

Set `networks.subnet.name` on the InfrastructureConfig and reference the pre-provisioned VNet:

```yaml
apiVersion: azure.provider.extensions.gardener.cloud/v1alpha1
kind: InfrastructureConfig
zoned: true
networks:
  vnet:
    name: hub-spoke-workers-vnet
    resourceGroup: platform-network-rg
  subnet:
    name: shoot-a-workers
```

Presence of `networks.subnet` alone signals user-managed-egress mode; no `outboundType` enum or
marker annotation is required. When the config is submitted Gardener:

- Verifies the referenced subnet exists in the BYO VNet and that its CIDR is compatible with the
  shoot's networking config. Both a network security group and a route table (unless the shoot
  uses an overlay CNI, i.e. `spec.networking.providerConfig.overlay.enabled: true`) must be
  attached to the subnet before shoot creation.
- Skips creation of the worker subnet, worker NSG, route table, and NAT Gateway.
- Discovers the NSG and route-table associations at reconcile time and threads their names and
  resource groups into the shoot's `azure.json` as `securityGroupName`/`securityGroupResourceGroup`
  and `routeTableName`/`routeTableResourceGroup`.
- Sets `disableOutboundSNAT: true` in `azure.json` so that any user-created
  `Service type=LoadBalancer` does not become an accidental egress path bypassing the user's route
  table.
- Skips deploying the `allow-tcp-egress` and `allow-udp-egress` services in the shoot's
  `kube-system` namespace.
- Rejects the `azure.provider.extensions.gardener.cloud/disable-default-outbound-access` annotation
  at admission. Gardener does not create or mutate the BYO subnet, so it cannot apply the setting;
  configure `defaultOutboundAccess` on the subnet yourself before shoot creation.

The `zoned` field remains valid — the shoot can still be zonal even though the worker subnet is
single-subnet.

## Fields that are forbidden in BYO mode

The following fields must **not** be set when `networks.subnet` is set:

| Forbidden field | Rationale |
| --- | --- |
| `networks.workers` | Worker CIDR is discovered from the BYO subnet. |
| `networks.zones` | Multi-subnet (zoned) layout is not supported with BYO subnet. |
| `networks.natGateway` | NAT is user-managed. Attach a NAT gateway to the BYO subnet out-of-band if needed. |
| `networks.serviceEndpoints` | Service endpoints are managed by the user on their own subnet. |
| `networks.vnet.cidr` | VNet CIDR is discovered from the actual VNet, not declared. |
| `networks.vnet.ddosProtectionPlanID` | DDoS plan is managed by the user on the BYO VNet. |

## Overlay-CNI shoots

Shoots using an overlay CNI (Cilium with VXLAN or Geneve) do not need pod-CIDR routes in
the underlying VNet: pod-to-pod traffic is encapsulated at the node level. Gardener automatically
disables the seed CCM's route controller (`--configure-cloud-routes=false`) whenever the shoot's
networking provider config sets `overlay.enabled: true`, using the same signal as `provider-gcp`.

> [!NOTE]
> **Calico overlay is not supported on Azure.** The admission webhook rejects `type: calico` with
> `overlay.enabled: true` (`validation/shoot.go`). On Azure, Calico always runs in non-overlay
> (VNet-native) mode and always requires a route table. Only Cilium supports overlay mode on Azure.

In BYO mode, this also relaxes the "subnet must have a route table" precondition — a Cilium
overlay BYO shoot may attach no route table at all:

```yaml
spec:
  networking:
    type: cilium
    nodes: 10.250.0.0/16
    pods: 100.96.0.0/11
    services: 100.64.0.0/13
    providerConfig:
      apiVersion: cilium.networking.extensions.gardener.cloud/v1alpha1
      kind: NetworkConfig
      overlay:
        enabled: true
  provider:
    type: azure
    infrastructureConfig:
      apiVersion: azure.provider.extensions.gardener.cloud/v1alpha1
      kind: InfrastructureConfig
      networks:
        vnet:
          name: hub-spoke-workers-vnet
          resourceGroup: platform-network-rg
        subnet:
          name: shoot-a-workers   # may reference a subnet with no route table attached
```

The user takes ownership of ensuring the shoot really uses an overlay CNI. Gardener does not
verify that `networking.type` matches the overlay setting.

## Migration and immutability

- Existing shoots keep working. Opting in requires setting `networks.subnet` at shoot **creation**
  time.
- In-place transitions between managed and BYO mode are forbidden. Once created with
  `networks.subnet` set, the field must stay set; once created without, it must stay unset. Users
  who need to migrate must create a fresh shoot.
- `networks.subnet.name` is immutable once set.

## The NSG

Your subnet has exactly one network security group attached to it. In BYO mode this NSG is the
CCM-facing NSG for the shoot — Gardener discovers it, threads its identity into the shoot's
`azure.json`, and the Azure cloud-controller-manager writes `Service type=LoadBalancer` ingress
rules onto it. The bastion controller also writes bastion SSH rules onto the same NSG.

This is your NSG: you created it, you own its lifecycle, Gardener never deletes it. The CCM and
bastion controller do write named, scoped rules onto it during normal shoot operation. Rule names
follow a well-known convention:

- `k8s-azure-lb_allow_<v4|v6>_<hash>` — LB Service ingress rules written by the Azure CCM.
- `k8s-azure-lb_deny-all_<v4|v6>` — deny-all rules the CCM adds under specific Service
  configurations (`disableFloatingIP` + `loadBalancerSourceRanges`).
- `<bastion-instance-name>-*` — bastion controller rules (SSH in/out and deny-all-out).

These rules are added on resource creation and removed on resource deletion under normal
operation. Do not run competing automation (Terraform, policy engines) that fights the CCM or
bastion controller on this NSG.

At minimum your NSG must permit the following flows for the cluster to function:

| Direction | Source | Destination | Protocol | Port | Use |
| --- | --- | --- | --- | --- | --- |
| Inbound | Node CIDR | Node CIDR | any | any | Node ↔ node |
| Inbound | Pod CIDR | Node CIDR | any | any | Service routing (kube-proxy, kubelet health) |
| Inbound | Pod CIDR | Pod CIDR | any | any | Pod ↔ pod (only relevant for flat-CNI shoots) |
| Inbound | AzureLoadBalancer service tag | Node CIDR | TCP | any | LB health probes |
| Outbound | Node CIDR | Kubernetes API server | TCP | 443, 4443 | Node → apiserver |

For overlay CNIs (Cilium with VXLAN/Geneve — the Gardener default) the pod↔pod
flow is encapsulated inside node↔node traffic; only the node↔node row is required.

Misconfiguration (denying a required flow, or blocking the CCM/bastion rule priorities) breaks
the cluster; Gardener has no way to detect this at reconcile time. This is your responsibility.

## Deletion

- The BYO VNet, subnet, route table, and NSG are never deleted by Gardener — they belong to you.
- Under normal (graceful) shoot deletion, the CCM removes its `k8s-azure-lb_*` rules from your
  NSG as each `Service type=LoadBalancer` is deleted, and the bastion controller removes its
  `<bastion-instance-name>-*` rules as each Bastion is deleted. The seed CCM's route controller
  removes its per-node routes from your RT as MCM scales workers down (non-overlay CNI shoots
  only).
- If teardown does not go gracefully — CCM crash during control-plane teardown, API server
  becoming unreachable before all Nodes are drained, force-delete of the shoot, transient Azure
  API errors past the CCM's retry budget — orphan rules may remain on the NSG and orphan routes
  on the RT. They will point at IPs that no longer exist. Gardener does not clean them up. Prune
  them yourself if they matter to your operational surface (Azure NSGs have a 1000-rule soft cap).
  Overlay-CNI shoots are unaffected by the RT side of this (the CCM's route controller is
  disabled and no per-node routes are ever written) but the NSG side still applies.
