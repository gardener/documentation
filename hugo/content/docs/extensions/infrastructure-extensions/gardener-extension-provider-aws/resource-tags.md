---
github_repo: 'https://github.com/gardener/gardener-extension-provider-aws'
github_subdir: docs/usage
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/infrastructure-extensions/gardener-extension-provider-aws/resource-tags.md
  to: resource-tags.md
persona: Users
title: Resource Tags
prev: false
next: false
managed: true
---

# AWS Resource Tags

This document gives an overview of all AWS resource tags applied by the different components of the `gardener-extension-provider-aws`.

## Overview

AWS resource tags are used to:
- Identify resources that belong to a specific cluster
- Mark resources managed by Gardener
- Indicate the role of subnets for Kubernetes load balancer routing
- Enable garbage collection of S3 objects

## Tags by Component

### Infrastructure Controller

The infrastructure controller (`pkg/controller/infrastructure/`) manages all VPC-related resources.
It establishes a set of **common tags** applied to every resource it creates:

| Tag Key | Tag Value | Description |
| --- | --- | --- |
| `Name` | `<shoot-namespace>` | Human-readable resource name |
| `kubernetes.io/cluster/<shoot-namespace>` | `1` | Cluster ownership marker, used for resource discovery |

The following EC2 resource types receive these common tags at creation time (via `pkg/aws/client/client.go`):

- DHCP Options
- VPC
- Security Groups (default + nodes)
- Internet Gateway
- Egress-Only Internet Gateway
- VPC Endpoint
- Route Tables
- Elastic IPs
- NAT Gateways
- Key Pair

#### Subnet-Specific Tags

Subnets receive the common tags plus a name suffix and, for utility subnets, an additional ELB role tag:

| Subnet Type | Additional Tag Key | Tag Value | Purpose |
| --- | --- | --- | --- |
| Workers | `Name` | `<namespace>-nodes-<zone-suffix>` | Identifies worker node subnet |
| Public utility | `Name` | `<namespace>-public-utility-<zone-suffix>` | Identifies public subnet |
| Public utility | `kubernetes.io/role/elb` | `1` | Allows Kubernetes cloud controller to use subnet for public load balancers |
| Private utility | `Name` | `<namespace>-private-utility-<zone-suffix>` | Identifies private subnet |
| Private utility | `kubernetes.io/role/internal-elb` | `1` | Allows Kubernetes cloud controller to use subnet for internal load balancers |

#### EFS Resources

EFS file systems receive the common tags extended with the managed tag if created by gardener:

| Tag Key | Tag Value | Description |
| --- | --- | --- |
| `Name` | `<shoot-namespace>` | Resource name |
| `kubernetes.io/cluster/<shoot-namespace>` | `1` | Cluster ownership marker |
| `managed-by-gardener` | `true` | Marks resource as managed by Gardener |

### Worker Controller

The worker controller (`pkg/controller/worker/`) creates `MachineClass` objects that configure EC2 instances for worker nodes.
Each instance receives:

| Tag Key | Tag Value | Description |
| --- | --- | --- |
| `kubernetes.io/cluster/<shoot-technical-id>` | `1` | Cluster ownership marker (uses technical ID, not namespace) |
| `kubernetes.io/role/node` | `1` | Identifies EC2 instance as a Kubernetes node |
| `<pool-label-key>` | `<pool-label-value>` | All labels from the worker pool are propagated as tags |

### Control Plane Controller (AWS Load Balancer Controller)

The control plane controller configures the [AWS Load Balancer Controller](https://kubernetes-sigs.github.io/aws-load-balancer-controller/) with default tags that are applied to every AWS load balancer it creates:

| Tag Key | Tag Value | Description |
| --- | --- | --- |
| `KubernetesCluster` | `<shoot-namespace>` | Legacy cluster identifier for ALB |
| `kubernetes.io/cluster/<shoot-namespace>` | `owned` | ALB cluster ownership marker |

Note: The value `owned` (instead of `1`) follows the [Kubernetes cloud provider tag convention for load balancers](https://kubernetes-sigs.github.io/aws-load-balancer-controller/latest/guide/ingress/annotations/#tags).

### Bastion Controller

The bastion controller creates a dedicated security group for SSH bastion hosts. It only applies a `Name` tag:

| Tag Key | Tag Value | Description |
| --- | --- | --- |
| `Name` | `<bastion-security-group-name>` | Identifies the bastion security group |

### S3 Garbage Collection

S3 objects scheduled for deletion are tagged to be picked up by an S3 lifecycle policy:

| Tag Key | Tag Value | Description |
| --- | --- | --- |
| `gc-marked-for-deletion` | `true` | Marks object for deletion via S3 lifecycle rule `GC-forTaggedObjects` |

## Summary Table

| Tag Key | Tag Value | Applied By | AWS Resource Types |
| --- | --- | --- | --- |
| `Name` | resource-specific | Infrastructure controller | All VPC resources, subnets, EFS |
| `Name` | bastion SG name | Bastion controller | Security group |
| `kubernetes.io/cluster/<namespace>` | `1` | Infrastructure controller | VPC, subnets, security groups, gateways, route tables, EIPs, NAT gateways, EFS |
| `kubernetes.io/cluster/<technical-id>` | `1` | Worker controller | EC2 instances |
| `kubernetes.io/cluster/<namespace>` | `owned` | AWS LB controller | Load balancers (ALB/NLB) |
| `kubernetes.io/role/elb` | `1` | Infrastructure controller | Public utility subnets |
| `kubernetes.io/role/internal-elb` | `1` | Infrastructure controller | Private utility subnets |
| `kubernetes.io/role/node` | `1` | Worker controller | EC2 instances |
| `managed-by-gardener` | `true` | Infrastructure controller | EFS file systems |
| `KubernetesCluster` | `<namespace>` | AWS LB controller | Load balancers (ALB/NLB) |
| `gc-marked-for-deletion` | `true` | Infrastructure controller | S3 objects |
| `<pool-label-key>` | `<pool-label-value>` | Worker controller | EC2 instances |
