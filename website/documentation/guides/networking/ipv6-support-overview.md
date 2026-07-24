---
title: IPv6 Support Overview by Infrastructure
description: Overview of IPv6 and dual-stack networking support across all Gardener-supported infrastructures
weight: 5
level: intermediate
category: Networking
scope: operator
tags: ["networking", "ipv6", "dual-stack"]
---

## Summary

Gardener supports three IPv6 networking modes depending on the infrastructure:

| Mode | Description |
|------|-------------|
| **IPv6 Ingress for IPv4 clusters** | Adds a dual-stack load balancer to an existing IPv4-only cluster so external IPv6 clients can reach services. The cluster interior stays IPv4-only. |
| **Dual-stack** | Both IPv4 and IPv6 are active inside the cluster. Recommended migration path for existing IPv4 clusters. |
| **IPv6-only** | Only IPv6 is used inside the cluster. Ideal for validating full IPv6 compatibility. |

The `spec.networking.ipFamilies` field in the `Shoot` resource controls the mode:

```yaml
# IPv4-only (default)
ipFamilies: [IPv4]

# Dual-stack (IPv4 preferred)
ipFamilies: [IPv4, IPv6]

# IPv6-only
ipFamilies: [IPv6]
```

## Infrastructure Support Matrix

| Infrastructure | IPv6 Ingress for IPv4 | Dual-Stack | IPv6-only |
|---|:---:|:---:|:---:|
| AWS | ✅ | ✅ | ✅ |
| GCP | ❌ | ✅ | ❌ |
| Azure | ❌ | ❌ | ❌ |
| OpenStack | ❌ | ✅ | ❌ |
| Alibaba Cloud | ✅ | ❌ | ❌ |


## AWS

AWS has the most complete IPv6 support, offering all three modes: IPv6 ingress for IPv4 clusters, dual-stack, and IPv6-only.

### Requirements

- Worker nodes must use [Nitro-based instance types](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html#instance-hypervisor-type).
- IPv4 CIDR ranges are still required for the VPC and public/internal subnets, even for IPv6-only clusters (needed for load balancers).
- IPv6 address ranges are globally unique and internet-routable, provided by AWS.

### Migration

Add `IPv6` to `spec.networking.ipFamilies` to migrate an existing IPv4-only cluster to dual-stack. The cluster must already run in native routing mode (overlay disabled).

Migration between IPv6-only and dual-stack is **not supported** in either direction.

### Load Balancers

The AWS Load Balancer Controller is deployed automatically for dual-stack and IPv6-only clusters. New `LoadBalancer` services receive dual-stack annotations via a mutating webhook. Services without explicit annotations default to IPv4-only.

Connectivity to IPv4-only external services from IPv6-only clusters is handled transparently via DNS64/NAT64.

**References:**
- [AWS IPv6 guide](https://github.com/gardener/gardener-extension-provider-aws/blob/master/docs/usage/ipv6.md)
- [AWS dual-stack ingress guide](https://github.com/gardener/gardener-extension-provider-aws/blob/master/docs/usage/dual-stack-ingress.md)
- [Dual-stack network migration](https://github.com/gardener/gardener/blob/master/docs/usage/networking/dual-stack-networking-migration.md) (gardener/gardener)

## GCP

GCP supports dual-stack clusters. IPv6-only is not supported.

### Requirements

- IPv4 ranges are user-defined; IPv6 ranges are assigned automatically by GCP.
- The `ingress-gce` component is deployed automatically and is required for IPv6 load balancers (the GCP Cloud Controller Manager does not support IPv6 load balancers).

### Migration

Add `IPv6` to `spec.networking.ipFamilies`. The cluster must be in native routing mode. 

### Load Balancers

Services of type `LoadBalancer` require `spec.ipFamilies`, `spec.ipFamilyPolicy`, and the annotation `cloud.google.com/l4-rbs: enabled` (added automatically via webhook for new services). Internal IPv6 load balancers are **not supported**. Existing `LoadBalancer` services cannot be migrated to dual-stack; they must be recreated.

**References:**
- [GCP IPv6 guide](https://github.com/gardener/gardener-extension-provider-gcp/blob/master/docs/usage/ipv6.md)
- [Dual-stack network migration](https://github.com/gardener/gardener/blob/master/docs/usage/networking/dual-stack-networking-migration.md) (gardener/gardener)

## Azure

IPv6 is currently **not supported** on Azure. Neither dual-stack nor IPv6-only clusters can be created.

## OpenStack

OpenStack supports dual-stack clusters. IPv6-only is not supported.

### Requirements

IPv6 subnets are configured via `infrastructureConfig.networks.ipv6` using one of two options:

- **Subnet pool (recommended):** Provide a `subnetPoolID`; IPv6 CIDRs for nodes, pods, and services are allocated automatically from the pool.
- **Explicit CIDRs:** Specify `nodeCIDR`, `podCIDR`, and `serviceCIDR` directly.

> [!WARNING]
> The `networks.ipv6` configuration is immutable after cluster creation.

### Migration

Migration to dual-stack is not yet supported but planned for H2 2026.

### Load Balancers

Load Balancers are not yet supported.

**References:**
- [OpenStack provider usage docs](https://github.com/gardener/gardener-extension-provider-openstack/blob/master/docs/usage/usage.md)
- [Dual-stack network migration](https://github.com/gardener/gardener/blob/master/docs/usage/networking/dual-stack-networking-migration.md) (gardener/gardener)

## Alibaba Cloud

Alibaba Cloud supports dual-stack ingress. Full dual-stack and IPv6-only are not supported.

### Requirements

- Dual-stack requires Alibaba Cloud NLB support in the target region.
- Enable dual-stack by setting `dualStack.enabled: true` in `InfrastructureConfig`.
- For Gardener-managed VPCs: IPv6 is enabled on the VPC automatically. Each zone's VSwitch gets a `/64` from the VPC's `/56` block.
- For user-provided VPCs: IPv6 must already be enabled on the VPC, an IPv6 Gateway must exist, and `ipv6CidrBlock` must be specified for every zone.
- `ipv6CidrBlock` values (integers 0–255) select which `/64` subnet is assigned to each zone's VSwitch. The value is immutable once set. Plan carefully when multiple clusters share a VPC.

> [!WARNING]
> Do not use the Alibaba Cloud console's bulk IPv6-enable option on VSwitches. Gardener will not overwrite existing IPv6 CIDRs, and the console assigns subnet indices arbitrarily.

### Migration

Add `dualStack.enabled: true` to `InfrastructureConfig` and add `IPv6` to `spec.networking.ipFamilies`. The infrastructure will be reconciled to enable IPv6 on the VPC and assign `/64` CIDRs to each zone's VSwitch.

### Load Balancers

Only dual-stack (IPv4+IPv6) load balancers are supported via Alibaba Cloud NLB. IPv6-only load balancers are not available. Setting `dualStack.enabled: true` in `InfrastructureConfig` is a prerequisite, but each `Service` also requires explicit annotations to create a dual-stack NLB:

```yaml
apiVersion: v1
kind: Service
metadata:
  annotations:
    service.beta.kubernetes.io/alibaba-cloud-loadbalancer-ip-version: "DualStack"
    service.beta.kubernetes.io/alibaba-cloud-loadbalancer-zone-maps: "<zone-a>:<vswitch-id-a>,<zone-b>:<vswitch-id-b>"
spec:
  loadBalancerClass: alibabacloud.com/nlb
```

Alibaba Cloud NLB requires at least two VSwitches in different zones — this is a platform constraint, not specific to dual-stack. The VSwitch IDs can be found in the shoot's `InfrastructureStatus`.

**References:**
- [AliCloud provider usage docs](https://github.com/gardener/gardener-extension-provider-alicloud/blob/master/docs/usage/usage.md)
- [Dual-stack network migration](https://github.com/gardener/gardener/blob/master/docs/usage/networking/dual-stack-networking-migration.md) (gardener/gardener)

## Related Pages

- [Dual-stack network migration](https://github.com/gardener/gardener/blob/master/docs/usage/networking/dual-stack-networking-migration.md) — gardener/gardener
- [Shoot networking configurations](https://github.com/gardener/gardener/blob/master/docs/usage/networking/shoot_networking.md) — gardener/gardener
- [AWS IPv6 guide](https://github.com/gardener/gardener-extension-provider-aws/blob/master/docs/usage/ipv6.md) — gardener-extension-provider-aws
- [AWS dual-stack ingress guide](https://github.com/gardener/gardener-extension-provider-aws/blob/master/docs/usage/dual-stack-ingress.md) — gardener-extension-provider-aws
- [GCP IPv6 guide](https://github.com/gardener/gardener-extension-provider-gcp/blob/master/docs/usage/ipv6.md) — gardener-extension-provider-gcp
- [OpenStack provider usage docs](https://github.com/gardener/gardener-extension-provider-openstack/blob/master/docs/usage/usage.md) — gardener-extension-provider-openstack
- [AliCloud provider usage docs](https://github.com/gardener/gardener-extension-provider-alicloud/blob/master/docs/usage/usage.md) — gardener-extension-provider-alicloud
