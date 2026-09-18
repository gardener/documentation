---
title: "Better Support for BYO Infrastructure on AWS"
linkTitle: "Better Support for BYO Infrastructure on AWS"
newsSubtitle: August 19, 2026
publishdate: 2026-08-19
authors:
- avatar: https://avatars.githubusercontent.com/hebelsan
  login: hebelsan
  name: Alexander Hebel
tags:
- feature-announcement
- extensions
- provider-aws
- networking
aliases: ["/blog/2026/08/19/better-support-for-byo-infrastructure-on-aws"]
---

Many organizations running Gardener on AWS already have established cloud infrastructure — VPCs, subnets, route tables, and security groups — managed independently through their own IaC tooling or centrally by a platform team. Until now, Gardener's AWS provider extension assumed full ownership of networking infrastructure, creating NAT gateways, route tables, and security groups as part of each shoot lifecycle. This worked well for greenfield deployments but left little room for organizations with pre-existing infrastructure.

Gardener v1.149 introduces improved Bring Your Own (BYO) infrastructure support for AWS, letting operators deploy shoot clusters into existing subnets and integrate with infrastructure components they already manage.

## What's New

The extension now supports deploying shoots into **pre-existing subnets** rather than always creating new ones. This means worker nodes can be placed in subnets already connected to the organization's network topology — including custom transit gateway attachments, VPC peering, and firewall rules.

Beyond subnets, operators can now configure:

- **User-managed route tables** — instead of Gardener creating and managing route tables, you can reference existing ones, allowing full control over how traffic is routed. This is particularly useful for directing egress through centralized firewalls, transit gateways, or VPN gateways.
- **Custom security groups** — attach pre-existing security groups to shoot worker nodes, enabling consistent enforcement of your organization's security policies across Gardener-managed and self-managed workloads.
- **Ingress and egress traffic control** — when a custom default route is provided, Gardener skips NAT gateway creation and relies on your existing routing for internet connectivity.

## Why It Matters

For enterprise deployments, infrastructure governance is often centralized. Network admins control VPCs and subnets; security teams manage security groups; platform teams own routing policies. The previous model forced a clean split: Gardener-owned infrastructure alongside manually-managed infrastructure, with no bridge between them.

With BYO infrastructure support, Gardener shoots become first-class citizens of an existing AWS environment rather than isolated tenants. This unlocks scenarios like:

- Shoot clusters that share a transit gateway with other workloads, with no NAT gateway required
- Workers placed in subnets subject to centrally-managed NACLs and flow logs
- Consistent security group policies applied across the entire organization

## Getting Started

Configure the infrastructure section of your `Shoot` resource to reference existing AWS resources. See [gardener-extension-provider-aws#1741](https://github.com/gardener/gardener-extension-provider-aws/pull/1741) for full details on the new fields and configuration options.

---

**Sources:**

- [📽️ Recording — Review Meeting 2026/08/19](https://youtu.be/Y9sqwVqV2Es?t=45)
- [gardener-extension-provider-aws#1741: Better support for BYO Infrastructure](https://github.com/gardener/gardener-extension-provider-aws/pull/1741)
