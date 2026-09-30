---
github_repo: 'https://github.com/gardener/gardener-extension-provider-azure'
github_subdir: docs/proposals
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/proposals/flexible-network-configuration-spec.md
  to: flexible-network-configuration-spec.md
title: Flexible Network Configuration Spec
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
   https://github.com/gardener/gardener-extension-provider-azure/blob/master/docs/proposals/flexible-network-configuration-spec.md
-->


# Implementation Spec: Bring-Your-Own Subnet for User-Managed Egress on Azure

**Status**: implementation checklist derived from [flexible-network-configuration-proposal.md](/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/proposals/flexible-network-configuration-proposal/). The proposal is the source of truth for design intent and constraints; this spec captures the concrete file changes, code sketches, and test surface needed to satisfy the proposal's acceptance criteria.

**Audience**: coding agents and implementing engineers. Anything in this document may be revised during implementation as long as the changes still satisfy the proposal's acceptance criteria (referenced below by their proposal IDs — `A1`–`A5`, `B1`–`B5`, `C1`–`C12`, `D1`–`D4`, `E1`–`E14`, `F1`–`F4`, `G1`–`G5`).

<!-- toc -->

- [Scope and non-scope](#scope-and-non-scope)
- [API type changes](#api-type-changes)
- [Validation](#validation)
- [Reconciler](#reconciler)
- [Cloud-provider config](#cloud-provider-config)
- [CCM route-controller flag](#ccm-route-controller-flag)
- [`allow-egress` gating](#allow-egress-gating)
- [Bastion controller](#bastion-controller)
- [Testing plan](#testing-plan)
- [Suggested implementation order](#suggested-implementation-order)

<!-- /toc -->

## Scope and non-scope

**In scope for the initial PR**: everything below. Satisfies acceptance criteria groups A–G in the proposal.

**Out of scope, deferred to follow-up PRs**: explicit `OutboundType` enum surface; in-place transition between managed and user-managed egress on an existing shoot. Both are enumerated in the proposal's "Out of scope" section and must be actively rejected by validation in this PR (see `D1`, `D2`).

**Contract with the design**: if any of the following implementation details turn out to be wrong at coding time (e.g. a file path has shifted, an upstream API signature is different), revise the spec — do not silently deviate. If the deviation touches proposal-level design intent (a new mode, a different API shape, a different NSG contract), stop and get the proposal amended first.

## API type changes

**File**: `pkg/apis/azure/types_infrastructure.go`. Mirror in `pkg/apis/azure/v1alpha1/types_infrastructure.go` with JSON tags on the exported fields.

New nested field on `NetworkConfig`:

```go
// NetworkConfig holds information about the Kubernetes and infrastructure networks.
type NetworkConfig struct {
    // ... existing fields (VNet, Workers, NatGateway, ServiceEndpoints, Zones) ...

    // Subnet is an optional reference to an already-existing subnet inside the (also
    // user-provided) VNet. When set, Gardener's infrastructure reconciler will not create or
    // manage the worker subnet, its route table, or its network security group; it discovers
    // the subnet's NSG and (optional) route-table associations at reconcile time and threads
    // their names and resource groups into the shoot's cloud-provider config. Requires
    // VNet.Name and VNet.ResourceGroup to be set. Not compatible with Zones, Workers,
    // NatGateway, or ServiceEndpoints.
    // +optional
    Subnet *SubnetReference `json:"subnet,omitempty"`
}

// SubnetReference references an existing subnet in an existing VNet.
type SubnetReference struct {
    // Name is the name of the subnet.
    Name string `json:"name"`
}
```

Whether the seed CCM's route controller is needed is **not** expressed on this type. It is derived
from the shoot's networking provider configuration (`spec.networking.providerConfig`): overlay-CNI
shoots (Cilium/Calico with VXLAN or Geneve) do not need pod-CIDR routes in the underlying VNet, so
the reconciler does not require a route table to be attached to the BYO subnet.

`OutboundAccessType` enum gains a third value:

```go
const (
    OutboundAccessTypeNATGateway   OutboundAccessType = "NATGateway"
    OutboundAccessTypeLoadBalancer OutboundAccessType = "LoadBalancer"
    // OutboundAccessTypeUserManaged indicates that the user is responsible for egress
    // (firewall-based egress via a user-owned route table, or network-isolated with no
    // default route). Set when the user brought their own subnet and did not enable a NAT
    // Gateway.
    OutboundAccessTypeUserManaged OutboundAccessType = "UserManaged"
)
```

`RouteTable` and `SecurityGroup` status types both gain an optional `ResourceGroup`. In managed
mode both resources live in the shoot's cluster RG (nil in status); in BYO-subnet mode they may
live in any RG in the shoot's subscription (populated in status). The pointer shape keeps existing
managed-mode shoots round-tripping cleanly:

```go
type RouteTable struct {
    Purpose Purpose
    Name    string
    // ResourceGroup is the resource group hosting this route table. If nil, the shoot's
    // cluster resource group is assumed. Only populated in BYO-subnet mode.
    // +optional
    ResourceGroup *string
}

type SecurityGroup struct {
    Purpose Purpose
    Name    string
    // ResourceGroup is the resource group hosting this network security group. If nil, the
    // shoot's cluster resource group is assumed. Only populated in BYO-subnet mode where the
    // discovered NSG may live in any resource group in the shoot's subscription.
    // +optional
    ResourceGroup *string
}
```

Helper on `InfrastructureConfig`:

```go
// IsUsingUserManagedEgress reports whether the user opted into managing their own egress
// path by bringing an existing subnet.
func (c *InfrastructureConfig) IsUsingUserManagedEgress() bool {
    return c.Networks.Subnet != nil
}
```

Regenerate deep-copy / conversion / defaulter code via the usual codegen make target.

## Validation

**API-level** — `pkg/apis/azure/validation/infrastructure.go`:

When `Networks.Subnet != nil`, enforce every rule in the proposal's `Validation rules` table:

- `Networks.VNet.Name` and `Networks.VNet.ResourceGroup` must be set (`C1`).
- `Networks.VNet.CIDR` must be unset (`C6`).
- `Networks.VNet.DDosProtectionPlanID` must be unset (`C7`).
- `Networks.Workers` must be unset (`C3`).
- `Networks.Zones` must be empty (`C2`).
- `Networks.NatGateway` must be nil (`C4`).
- `Networks.ServiceEndpoints` must be empty (`C5`).
- `Networks.Subnet.Name` must be non-empty and conform to Azure subnet naming.

Extend `ValidateInfrastructureConfigUpdate` with:

- `Networks.Subnet.Name` immutable once set (`D3`).
- Mode transition forbidden — `Networks.Subnet` cannot be added or removed on an existing shoot (`D1`, `D2`).

**Runtime pre-flight validator** — new file `pkg/controller/infrastructure/configvalidator.go`:

Azure does not have a `ConfigValidator` today (provider-aws and provider-gcp both do; use their pattern). Called from the infrastructure controller before reconcile. Uses the shoot's Azure credentials to hit ARM. Checks:

- The referenced subnet exists in the BYO VNet (`C8`).
- The subnet has a `NetworkSecurityGroup` association (`C9b`).
- The subnet has a `RouteTable` association, unless the shoot uses an overlay CNI (`C9`).
- The subnet's CIDR is a subset of `shoot.spec.networking.nodes` and does not overlap `shoot.spec.networking.{pods,services}` (`C10`, `C11`).
- The discovered NSG and RT ARM IDs resolve to the same subscription as the shoot (`C12`).

Errors must include the subnet name and VNet identity so the user can debug without inspecting logs.

## Reconciler

**File**: `pkg/controller/infrastructure/infraflow/flow_context.go` — the task graph.

Add branching on `IsUsingUserManagedEgress()`:

- **Skip** `EnsureRouteTable` and `EnsureSecurityGroup` in BYO mode. Both resources are user-owned in that mode; Gardener neither creates nor deletes them.
- **Replace** `EnsureSubnets` with a new `EnsureUserSubnet` in BYO mode.

**New helper** `EnsureUserSubnet` — put adjacent to the existing `ensureUserVirtualNetwork` at `ensurer.go:136-156`:

```go
// EnsureUserSubnet verifies the user-referenced subnet exists inside the BYO VNet
// and discovers the associated NSG and route table, storing their names and resource
// groups on the whiteboard for status building and cloud-provider-config emission.
// Never writes to the subnet, NSG, or RT.
func (fctx *FlowContext) EnsureUserSubnet(ctx context.Context) error {
    // 1. GET the subnet from ARM.
    // 2. Verify subnet.Properties.NetworkSecurityGroup.ID is set. Parse to (rg, name); store on whiteboard.
    // 3. Parse subnet.Properties.RouteTable.ID -> (rg, name); store on the whiteboard.
    //    RT may be absent if the shoot uses an overlay CNI (helper.IsOverlayEnabled) — then any
    //    previously discovered RT entries are cleared from the whiteboard and RouteTables[] is
    //    not populated in status.
    // 4. Do NOT PUT the subnet back — discovery must be read-only. Satisfies E3.
}
```

Status builder (`ensurer.go:641-708` `EnsureInfrastructureStatus`):

- Read the discovered NSG and RT identifiers from the whiteboard.
- Emit `Networks.OutboundAccessType = UserManaged`.
- Emit exactly one entry each in `Networks.Subnets[]`, `SecurityGroups[]`, and `RouteTables[]` (RT only if discovered).
- Set `Networks.Layout = SingleSubnet`.
- Leave `EgressCIDRs` nil.

## Cloud-provider config

**Template**: `charts/internal/cloud-provider-config/templates/cloud-provider-config.tpl` — three conditional fields:

```yaml
{{- if hasKey .Values "routeTableResourceGroup" }}
routeTableResourceGroup: "{{ .Values.routeTableResourceGroup }}"
{{- end }}
{{- if hasKey .Values "securityGroupResourceGroup" }}
securityGroupResourceGroup: "{{ .Values.securityGroupResourceGroup }}"
{{- end }}
{{- if .Values.disableOutboundSNAT }}
disableOutboundSNAT: true
{{- end }}
```

`routeTableResourceGroup` and `securityGroupResourceGroup` are emitted in BYO-subnet mode when the
discovered RT / NSG live outside the shoot's cluster RG. Both default to `resourceGroup` upstream,
so managed-mode shoots (where the fields are omitted) keep behaving exactly as before.

Upstream references for the field semantics:

- `RouteTableResourceGroup` — `azure.go:62` upstream, fallback at `:278-279`.
- `SecurityGroupResourceGroup` — `azure.go:64` upstream, same fallback pattern.
- `DisableOutboundSNAT` — `azure.go:123-125` upstream, per-LB-rule applied at `azure_loadbalancer.go:3360`.

**Value provider**: `pkg/controller/controlplane/valuesprovider.go` (`getConfigChartValues`):

```go
if infraStatus.Networks.OutboundAccessType == azureapi.OutboundAccessTypeUserManaged {
    values["disableOutboundSNAT"] = true
}
for _, rt := range infraStatus.RouteTables {
    if rt.Purpose == azureapi.PurposeNodes && rt.ResourceGroup != nil {
        values["routeTableResourceGroup"] = *rt.ResourceGroup
    }
}
for _, sg := range infraStatus.SecurityGroups {
    if sg.Purpose == azureapi.PurposeNodes && sg.ResourceGroup != nil {
        values["securityGroupResourceGroup"] = *sg.ResourceGroup
    }
}
```

Verifies `E8`.

## CCM route-controller flag

**File**: `charts/internal/seed-controlplane/charts/cloud-controller-manager/templates/cloud-controller-manager.yaml`.

Currently hard-codes `--configure-cloud-routes=true`. Make it values-driven, defaulting to `true`
when the value is not provided (so callers that don't set it — including any consumers not yet
migrated — keep behaving as before). `valuesprovider.go` passes `!overlayEnabled`, where
`overlayEnabled` is derived from `helper.IsOverlayEnabled(shoot.Spec.Networking)` (the same signal
the CNI extension uses).

Actual template:

```yaml
- --configure-cloud-routes={{ if hasKey .Values "configureCloudRoutes" }}{{ .Values.configureCloudRoutes }}{{ else }}true{{ end }}
```

When `false`, the CCM does not run the route controller and does not touch any route table. Verifies acceptance criterion `B5` (and future overlay-CNI tests).

## `allow-egress` gating

**File**: `pkg/controller/controlplane/valuesprovider.go:766-771` (`deployAllowEgressChart`).

```go
func deployAllowEgressChart(cluster *extensions.Cluster, infraStatus *azureapi.InfrastructureStatus) bool {
    if metav1.HasAnnotation(cluster.Shoot.ObjectMeta, azure.AnnotationKeySkipAllowEgress) {
        return false
    }
    if infraStatus.Networks.OutboundAccessType != azureapi.OutboundAccessTypeLoadBalancer {
        return false
    }
    // ... existing zoned / VMO logic ...
}
```

Verifies `E7`.

## Bastion controller

**Files**: `pkg/controller/bastion/options.go`, `pkg/controller/bastion/actuator.go`.

- Replace the hard-coded `NSGName(clusterName)` with a lookup from
  `InfrastructureStatus.SecurityGroups` (find the `PurposeNodes` entry). Read `Name` for the NSG
  and `ResourceGroup` for the RG that hosts it. Fall back to the historical name and the shoot's
  cluster RG only when no `PurposeNodes` entry is present in the status (defensive; should not
  happen after this PR).
- ARM client call sites that operate on the NSG must use `SecurityGroupResourceGroup` (when
  populated in BYO mode) instead of assuming the cluster RG.
- `actuator.go` already handles the BYO-VNet case for the subnet lookup and now prefers
  `InfrastructureStatus.Networks.Subnets[].CIDR` (populated by `EnsureUserSubnet`) over the
  legacy `InfrastructureConfig`-based lookup for the workers CIDR.

Verifies `E13`, `E14`.

## Testing plan

**Unit tests** — add or extend:

- `pkg/apis/azure/validation/infrastructure_test.go` — cover every case in `C1`–`C7` and `D1`–`D4`. Use a table-driven test structure.
- `pkg/controller/infrastructure/configvalidator_test.go` (new) — cover `C8`–`C12`. Mock the Azure subnet/network client.
- `pkg/controller/infrastructure/infraflow/ensurer_test.go` — cover `EnsureUserSubnet` (happy path + missing NSG + missing RT with overlay off + missing RT with overlay on + cross-subscription reference).
- `pkg/controller/controlplane/valuesprovider_test.go` — cover `E7`, `E8`.
- `pkg/controller/bastion/bastion_test.go` — cover the NSG lookup path in BYO mode (`E13`).

**Integration tests** — `test/integration/infrastructure/`:

- Extend the existing integration harness so that BYO-mode shoots can be created against a real subscription. Requires pre-provisioned VNet + subnet + NSG (attached) + RT in a test resource group.
- New scenarios: `B1`, `B2`, `B3`, `B4`, `B5`, `E3`, `F1`, `F2`, `F3`.

**E2E** — the existing shoot-creation e2e in Gardener core covers the LB Service creation surface (`E10`, `E12`). Add one BYO-mode variant if capacity allows.

**Regression** — `A1`–`A5` must continue to pass unchanged. Run the existing infrastructure integration suite against master then against this branch to confirm parity.

## Suggested implementation order

Minimizes risk by getting the machine-checkable parts (types, validation, unit tests) in first, then reconciler behavior, then integration coverage:

1. **API types + generated code** (deep-copy, conversion, defaulter). No behavior change; unit tests can compile and be added.
1. **API-level validation** in `pkg/apis/azure/validation/infrastructure.go`. Unit tests for `C1`–`C7`, `D1`–`D4`.
1. **Status-shape changes** — extend `RouteTable` with `ResourceGroup`. Regenerate. Adjust existing status-builder code to always leave `ResourceGroup` nil (backward-compat baseline).
1. **Pre-flight `ConfigValidator`**. Wire it into the infrastructure controller. Unit tests for `C8`–`C12`.
1. **Reconciler task-graph branching** — add `EnsureUserSubnet`. Manual smoke test in a scratch shoot with a hand-crafted BYO subnet.
1. **`cloud-provider-config` template + valuesprovider changes**. Unit tests for `E8`.
1. **`allow-egress` gating change**. Unit test for `E7`.
1. **CCM route-controller flag** — chart change + valuesprovider wiring. Manual test with an overlay-CNI shoot to confirm `--configure-cloud-routes=false` is rendered.
1. **Bastion controller refactor**. Unit test for `E13`.
1. **Integration test harness updates**. Add scenarios `B1`–`B5`, `F1`–`F4`.
1. **Documentation** — `docs/usage/user-managed-egress.md` and the pointer from `docs/usage/usage.md`.
