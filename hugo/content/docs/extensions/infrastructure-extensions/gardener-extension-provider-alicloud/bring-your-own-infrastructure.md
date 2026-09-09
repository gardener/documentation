---
github_repo: 'https://github.com/gardener/gardener-extension-provider-alicloud'
github_subdir: docs/usage
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/bring-your-own-infrastructure.md
  to: bring-your-own-infrastructure.md
persona: Users
title: Bring Your Own Infrastructure
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
   https://github.com/gardener/gardener-extension-provider-alicloud/blob/master/docs/usage/bring-your-own-infrastructure.md
-->


# Alibaba Cloud Infrastructure Setup for Bring-Your-Own Infrastructure

Gardener normally creates and manages all network resources for a shoot cluster. When network resources are provisioned centrally — for example by a platform team — you can provide a pre-existing VPC, VSwitches, and Security Groups instead.

## Infrastructure Provisioning Modes

Gardener supports two ways to use a pre-existing VPC. The key difference is whether Gardener manages the subnets inside the VPC.

|  | User-provided VPC | Full BYO (this document) |
| --- | --- | --- |
| VPC | User provides | User provides |
| VSwitches | Gardener creates per zone | User provides per zone (`workersVSwitchID`) |
| Security Group | Gardener creates; optionally user provides via `nodesSecurityGroupID` | Gardener creates; optionally user provides via `nodesSecurityGroupID` |
| NAT Gateway | User provides unique NGW, or Gardener creates with `gardenerManagedNATGateway: true` | User provides |
| Route table | Gardener uses system default RT, or creates custom RT with `useCustomRouteTable: true` | VSwitch's associated RT (user-managed) |
| CCM pod routes | Written into system default RT or Gardener-created custom RT | Written into VSwitch's associated RT |
| Gardener role | Creates and manages VSwitches, SG; optionally manages NGW and route table | Read-only; validates BYO resources on every reconcile |

The presence of `workersVSwitchID` is what determines the mode. `nodesSecurityGroupID` is orthogonal — it can be combined with either mode and only controls whether Gardener or the user manages the Security Group.

**User-provided VPC** is configured via `networks.vpc.id` + per-zone `workers` CIDR. Gardener still creates subnets and optionally a NAT Gateway. When `gardenerManagedNATGateway: false` (the default), you must ensure the VPC contains exactly one NAT Gateway whose default route is already configured in the route table that the shoot will use. Setting only `nodesSecurityGroupID` without `workersVSwitchID` also puts the shoot in this mode — all user-provided VPC requirements apply.

**Full BYO** (described in this document) is configured via `networks.vpc.id` + per-zone `workersVSwitchID`. Gardener treats all BYO resources as read-only and performs no environment setup. You are responsible for the complete network environment before creating the shoot.

> [!WARNING]
> In Full BYO mode, Gardener does not create or modify any network resources. You must ensure before creating the shoot that each VSwitch exists in the correct zone and VPC, that a NAT Gateway or equivalent egress path is in place, and that the route table associated with each VSwitch is correctly configured. Incorrect or incomplete environment setup is only detected at reconcile time, not at shoot creation.

Three fields in `InfrastructureConfig` support Full BYO:

| Field | Scope | Description |
| --- | --- | --- |
| `networks.vpc.id` | Cluster-wide | ID of the pre-existing VPC; required when using BYO VSwitches or a BYO Security Group |
| `networks.zones[].workersVSwitchID` | Per-zone | Pre-existing VSwitch for worker nodes in that zone |
| `networks.nodesSecurityGroupID` | Cluster-wide | Pre-existing Security Group attached to all worker nodes |

The VSwitch and Security Group fields are independent. You may use only `workersVSwitchID`, only `nodesSecurityGroupID`, or both. `networks.vpc.id` is required whenever either field is set — the VSwitch and Security Group must both reside in that VPC.

> [!NOTE]
> When `workersVSwitchID` is set, all zones must use it. Mixing BYO zones and Gardener-managed zones in the same shoot is not allowed.

## Prerequisites

> [!WARNING]
> Verify all resource IDs carefully before creating the shoot. The VSwitch ID, Security Group ID, and VPC ID are validated at reconcile time, not at creation time. If a wrong ID is provided and the zone is already referenced by a worker pool, the `workersVSwitchID` field becomes immutable and cannot be corrected without deleting and recreating the shoot. Ensure every ID is correct, belongs to the right VPC, and is in the right availability zone before submitting the shoot manifest.

### 1. VPC

Use an existing VPC or create one. Note its ID — you will need it in the shoot's `infrastructureConfig`.

### 2. NAT Gateway

Gardener does not create a NAT Gateway for BYO shoots. Worker nodes and pods need outbound connectivity to reach the Kubernetes API server, pull container images, and access external services. Ensure a NAT Gateway with a SNAT rule covering the VSwitch CIDRs, or an equivalent egress path, is already in place before creating the shoot.

Refer to the [Alibaba Cloud NAT Gateway guide](https://www.alibabacloud.com/help/en/nat-gateway/user-guide/use-internet-nat-gateway-for-public-network-access) for setup instructions.

### 3. VSwitches

For each availability zone you intend to use, prepare a VSwitch in the VPC:

1. Create the VSwitch in the correct availability zone inside the target VPC.
1. Choose a CIDR that is large enough for the maximum number of worker nodes you expect in that zone. Each node consumes one IP address from the VSwitch's CIDR pool.

Note the VSwitch ID (`vsw-xxxxxxxx`) for each zone.

### 4. Security Group

If you want to manage the worker node Security Group yourself:

1. Create a Security Group in the same VPC.
1. Configure rules according to your requirements. Gardener does **not** add or modify Security Group rules. The following table lists the rules that Gardener would add to a managed Security Group — use it as a reference minimum:
   
   **Inbound rules:**
   
   | Protocol | Port range | Source | Purpose |
   | --- | --- | --- | --- |
   | TCP | 30000–32767 | `0.0.0.0/0` | NodePort services |
   | TCP | All (except 23, 514) | VPC CIDR | Intra-VPC node communication |
   | UDP | All (except 23, 514) | VPC CIDR | Intra-VPC node communication |
   | ALL | All | Pods CIDR | Pod-to-node traffic |
   
   **Outbound rules:** None required — Alibaba Cloud allows all outbound traffic by default.

1. Note the Security Group ID (`sg-xxxxxxxx`).

> [!WARNING]
> The Security Group ID is **fully immutable** once the shoot is created. It cannot be changed or removed afterwards. Plan the Security Group configuration carefully before creating the shoot.

## Configuration

Reference your pre-existing resources in the shoot's `infrastructureConfig`. Replace the per-zone `workers` CIDR with `workersVSwitchID`:

```yaml
apiVersion: alicloud.provider.extensions.gardener.cloud/v1alpha1
kind: InfrastructureConfig
networks:
  vpc:
    id: vpc-xxxxxxxxxxxxxxxx
  nodesSecurityGroupID: sg-xxxxxxxxxxxxxxxx
  zones:
  - name: cn-hangzhou-i
    workersVSwitchID: vsw-xxxxxxxxxxxxxxxx
  - name: cn-hangzhou-j
    workersVSwitchID: vsw-yyyyyyyyyyyyyyyy
```

**Constraints:**

- `networks.vpc.id` is **required** when `workersVSwitchID` or `nodesSecurityGroupID` is set.
- `networks.vpc.cidr` must not be set — it is mutually exclusive with `vpc.id`.
- `networks.vpc.gardenerManagedNATGateway` must not be set in BYO mode.
- `networks.vpc.useCustomRouteTable` must not be set in BYO mode.
- `networks.zones[].workers` (CIDR) and `workersVSwitchID` are mutually exclusive per zone.
- `networks.zones[].natGateway` (including `eipAllocationID`) must not be set in BYO zones — Gardener does not manage NAT Gateways for BYO shoots.
- All zones must use the same mode — either all `workersVSwitchID` or all `workers` CIDR.

### Example Shoot manifest

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
  name: johndoe-alicloud-byo
  namespace: garden-dev
spec:
  cloudProfile:
    name: alicloud
  region: cn-hangzhou
  secretBindingName: core-alicloud
  provider:
    type: alicloud
    infrastructureConfig:
      apiVersion: alicloud.provider.extensions.gardener.cloud/v1alpha1
      kind: InfrastructureConfig
      networks:
        vpc:
          id: vpc-xxxxxxxxxxxxxxxx
        nodesSecurityGroupID: sg-xxxxxxxxxxxxxxxx
        zones:
        - name: cn-hangzhou-i
          workersVSwitchID: vsw-xxxxxxxxxxxxxxxx
        - name: cn-hangzhou-j
          workersVSwitchID: vsw-yyyyyyyyyyyyyyyy
    controlPlaneConfig:
      apiVersion: alicloud.provider.extensions.gardener.cloud/v1alpha1
      kind: ControlPlaneConfig
    workers:
    - name: worker-xoluy
      machine:
        type: ecs.sn2ne.large
      minimum: 2
      maximum: 4
      volume:
        size: 50Gi
        type: cloud_efficiency
      zones:
      - cn-hangzhou-i
      - cn-hangzhou-j
  networking:
    nodes: 10.0.0.0/16
    pods: 100.128.0.0/17
    services: 100.72.0.0/13
    type: calico
  kubernetes:
    version: 1.32.0
  maintenance:
    autoUpdate:
      kubernetesVersion: true
      machineImageVersion: true
```

## What Gardener Does and Does Not Do with BYO Resources

Gardener treats BYO VSwitches and Security Groups as **read-only**:

- Gardener does **not** create, tag, or delete BYO VSwitches or the BYO Security Group.
- Gardener does **not** add or modify Security Group rules.
- Deleting the shoot clears the shoot's internal state but leaves the VSwitch and Security Group intact in Alibaba Cloud.

On every reconcile, Gardener validates each BYO VSwitch:

- The VSwitch must exist in Alibaba Cloud.
- The VSwitch must belong to the configured VPC.
- The VSwitch must be located in the zone specified by `zones[].name`.
- For dual-stack shoots: the VSwitch must have an IPv6 CIDR pre-configured.

If any check fails, the reconcile is blocked with a descriptive error until the issue is resolved.

## Route Tables and CCM Behavior

On every reconcile, Gardener discovers the route table associated with each BYO VSwitch (custom route table if one is explicitly associated, otherwise the VPC system route table). The discovered route table ID is stored in the shoot's infrastructure status and forwarded to the Cloud Controller Manager.

CCM's route controller writes one route entry per worker node into the route table regardless of whether overlay networking is enabled:

```
destination: <node pod CIDR>  →  next-hop: <node IP>
```

Routes are added when nodes join and removed when nodes leave. In overlay mode these routes are redundant but are still written. Do not manually manage these entries.

> [!WARNING]
> When the shoot is deleted, Gardener removes its internal state but does **not** delete the pod CIDR routes that CCM wrote into your route table. Routes whose target node has already been terminated become blackhole entries. After shoot deletion, manually remove all routes with destinations within the shoot's pod CIDR from the route table.

> [!NOTE]
> Each BYO VSwitch should be dedicated to a single shoot. If multiple shoots use the same VSwitch and thus the same route table, their pod CIDRs must not overlap — overlapping pod CIDRs cause the CCMs to mutually delete each other's node routes. This applies regardless of whether overlay networking is enabled.

## VSwitch ID Immutability

`workersVSwitchID` is immutable once the zone is referenced by a worker pool. Plan VSwitch assignments carefully before creating the shoot — the ID cannot be changed under normal circumstances.

The only exceptions where a change is allowed are:

| Situation | Condition |
| --- | --- |
| The zone has never been used by any worker pool | The zone does not appear in any `spec.provider.workers[].zones` |
| The old VSwitch no longer exists in Alibaba Cloud | The admission webhook confirms the old VSwitch ID is absent before allowing the change |

These exceptions exist solely as a recovery path and are not intended for routine reconfiguration.

## Constraints

- **No migration from managed to BYO.** A shoot created with `workers` CIDR zones cannot be converted to BYO mode. This is enforced by admission validation.
- **All zones must use the same mode.** Either all zones use `workersVSwitchID` or all zones use `workers` CIDR. Partial BYO is not allowed.
- **`nodesSecurityGroupID` is immutable.** It cannot be changed or removed after the shoot is created.
- **No managed NAT Gateway.** Gardener does not provision egress for BYO shoots. Ensure egress connectivity is in place before the shoot is created.

## Version Compatibility

> [!WARNING]
> BYO infrastructure support (`workersVSwitchID`, `nodesSecurityGroupID`) was introduced in a specific version of this extension. Rolling back to an older version on a landscape with active BYO shoots has the following effects:
> - Every reconcile of a BYO shoot fails with an error. No infrastructure is modified or deleted.
> - The older admission webhook rejects any shoot updates, since it requires a `workers` CIDR that BYO zones do not have.
> - Existing nodes and workloads continue running — only infrastructure reconciliation and shoot updates are blocked.
> 
> The only recovery path is to upgrade back to the BYO-capable version. Do not roll back on a landscape with active BYO shoots without a plan to upgrade immediately.
