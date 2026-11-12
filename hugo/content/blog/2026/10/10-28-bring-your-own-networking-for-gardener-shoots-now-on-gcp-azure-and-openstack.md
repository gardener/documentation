---
title: >-
  Bring-Your-Own Networking for Gardener Shoots — Now on GCP, Azure, and
  OpenStack
linkTitle: >-
  Bring-Your-Own Networking for Gardener Shoots — Now on GCP, Azure, and
  OpenStack
newsSubtitle: 'October 28, 2026'
publishdate: 2026-10-28T00:00:00.000Z
authors:
  - avatar: 'https://avatars.githubusercontent.com/hebelsan'
    login: hebelsan
    name: Alexander Hebel
tags:
  - feature-announcement
  - networking
  - provider-gcp
  - provider-azure
  - provider-openstack
  - extensions
aliases:
  - >-
    /blog/2026/10/28/bring-your-own-networking-for-gardener-shoots-now-on-gcp-azure-and-openstack
---
<!-- BANNER:LOCAL -->
<!--
   █▀█ █▄▀
   █ █ █▀▄
   ▀▀▀ ▀ ▀

   ┌────────────────────────────────────────────────┐
   │  LOCAL FILE — maintained in gardener/          │
   │  documentation                                 │
   │                                                │
   │  Go ahead and edit this file directly.         │
   │  Changes here are the source of truth.         │
   └────────────────────────────────────────────────┘
-->


# Bring-Your-Own Networking for Gardener Shoots — Now on GCP, Azure, and OpenStack

When Gardener provisions a shoot cluster, it typically owns the entire networking stack alongside it: virtual networks, subnets, Cloud NAT, routing rules, and firewall policies. This works well for most deployments, but enterprises operating in shared or pre-existing network environments often have a different requirement — they need Gardener to work *within* their existing network, not create a parallel one.

With the v1.154 release, **bring-your-own (BYO) networking support is now complete across all major cloud providers** — GCP, Azure, and OpenStack — following the AWS support introduced earlier this year. Users can now point a Gardener shoot at pre-existing networking infrastructure, and Gardener will use it without ever touching its lifecycle.

## The Core Principle

The BYO networking feature follows a single, consistent principle across all providers:

> Infrastructure that is referenced is never created and never deleted.

When a shoot is configured with BYO networking, Gardener treats the referenced resources as external: it reads them, uses them, but will not provision or clean them up. The feature is fully backwards compatible — existing shoots are completely unaffected, and BYO mode only activates when the new fields are explicitly set.

## Provider-Specific API

### GCP

BYO mode is activated by setting `networks.subnetWorkers` in the `InfrastructureConfig`. When this field is present, the GCP extension stops creating the worker subnet, Cloud Router, Cloud NAT, and static firewall rules — it references the user-provided subnet instead. Egress connectivity becomes the operator's responsibility.

Both single-stack and dual-stack subnet configurations are supported, including secondary ranges for pods and services.

### Azure

BYO mode is activated by setting `Networks.Subnet` in the `InfrastructureConfig`. When this field is set, the Azure extension stops creating a subnet, route table, NSG, and NAT gateway. Instead, it discovers the associations on the provided subnet and passes them into the cloud-controller-manager's configuration.

This unlocks two enterprise topologies that were previously blocked:

- **Firewall-based egress**: workers route traffic through an Azure Firewall or third-party NVA in a hub VNet via a user-owned route table.
- **Network-isolated shoots**: no default route; all traffic flows through Private Endpoints; no public IP anywhere.

Note: network resources in a separate subscription from the shoot are not supported in this initial version.

### OpenStack

The OpenStack implementation offers the most granular control, allowing each resource to be brought independently:

- `networks.subnetId` — deploy worker nodes into a pre-existing Neutron subnet (requires an existing network and router with an interface already attached to the subnet)
- `networks.securityGroupId` — use a pre-existing security group for worker nodes instead of having Gardener create and manage one
- `networks.shareNetworkId` — reference a pre-existing Manila share network for NFS/CSI Manila volumes
- `networks.ipv6.nodeSubnetId` — deploy dual-stack worker nodes into a pre-existing IPv6 subnet (requires BYO IPv4 subnet)

All fields are independent and additive — you can bring only the resources you need.

## Validation

Validation is built into every provider implementation to catch misconfigurations at admission time. For example, on GCP, Gardener verifies that a provided subnet belongs to the specified VPC. On OpenStack, CIDR ranges, network/router relationships, and subscription constraints are all checked upfront.

One important consideration applies to all providers: if user-managed firewall rules or routing tables inadvertently block traffic between the shoot's nodes and the seed cluster's control plane, Gardener cannot detect or prevent this. Ensuring seed–shoot reachability is the operator's responsibility when using BYO networking.

## Why This Matters

BYO networking unlocks several scenarios that were previously impractical:

- **Shared VPC / VNet environments**: teams running shoots inside a centrally managed network can now integrate without ceding network ownership to Gardener.
- **Compliance-driven topologies**: regulated environments that require pre-approved, audited network configurations can reuse them directly.
- **Hub-and-spoke architectures**: firewall-based egress through a hub network is now a first-class topology on Azure and GCP.

## Resources

- [📽️ v1.154 Review Meeting — BYO Subnet Segment](https://youtu.be/aq3M3-C0U14?t=1152)
- [gardener-extension-provider-gcp#1493 — Add bring-your-own subnet support](https://github.com/gardener/gardener-extension-provider-gcp/pull/1493)
- [gardener-extension-provider-azure#1602 — User-managed egress via BYO subnet](https://github.com/gardener/gardener-extension-provider-azure/pull/1602)
- [gardener-extension-provider-openstack#1422 — Flexible network configuration](https://github.com/gardener/gardener-extension-provider-openstack/pull/1422)
- [2026 Gardener Review Meetings](https://gardener.cloud/community/review-meetings/2026-reviews/)
