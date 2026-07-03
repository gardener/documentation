---
title: "EFA Support for AWS Worker Pools: Enabling High-Performance AI Workloads on Gardener"
linkTitle: "EFA Support for AWS Worker Pools: Enabling High-Performance AI Workloads on Gardener"
newsSubtitle: June 10, 2026
publishdate: 2026-06-10
authors:
- avatar: https://avatars.githubusercontent.com/shreyas-s-rao
  login: shreyas-s-rao
  name: Shreyas Rao
tags:
- feature-announcement
- provider-aws
- node-management
- networking
- ai
- gpu
aliases: ["/blog/2026/06/10/efa-support-for-aws-worker-pools-enabling-high-performance-ai-workloads-on-gardener"]
---

Modern AI training and inference workloads demand extreme inter-node communication bandwidth. A single GPU is rarely enough — distributed training jobs span dozens or hundreds of nodes, each running multiple GPUs that must exchange large tensors rapidly. On AWS, the technology that makes this possible is the Elastic Fabric Adapter (EFA): a high-performance network interface designed specifically for tightly coupled, latency-sensitive workloads.

Until recently, Gardener AWS shoot clusters could not take full advantage of EFA-enabled instance types. A set of changes to the AWS provider extension now closes this gap, bringing four new capabilities to worker pool configuration.

## What is EFA?

EFA (Elastic Fabric Adapter) is a network interface for AWS EC2 instances that provides accelerated east-west traffic for inter-node GPU communication. Unlike a standard ENA (Elastic Network Adapter), EFA bypasses the host CPU and kernel when combined with NVIDIA GPUDirect RDMA, allowing nodes to access each other's GPU memory directly. The result is dramatically reduced latency and higher bandwidth — up to 400 Gbps on P4d instances and into the terabits-per-second range on newer H200 and B200 instance families.

## What Changed

### Multiple Network Interfaces per Worker Pool

Worker pools can now declare multiple network interfaces in the provider config. Each interface entry specifies:

- **type** — `interface`, `efa`, or `efa-only`
- **device index** — the interface index on the instance
- **network card index** — the NIC slot

For instance types that expose many EFA interfaces (a P5.48xlarge exposes 32 EFA NICs plus one ENA), listing every interface individually would bloat the shoot spec. A range expansion shorthand is available: specify a network card index range with a static device index and type, and the extension expands it at instance creation time.

### Placement Groups

Placement groups are now a first-class field in the worker pool provider config. Users can reference an existing AWS placement group by ID, choosing a policy such as `cluster` (nodes co-located on the same rack for minimum latency) or `spread`. For EFA-intensive workloads, a cluster placement group is the recommended choice.

### ML Capacity Blocks and Capacity Reservations

High-demand instance types (H200, P200, GP200, and similar) are rarely available on demand. The provider config now supports:

- **`capacityReservationID`** — references a pre-purchased capacity reservation of EC2 instances
- **`instanceMarketOptions.marketType: capacity-block`** — allows users to specify the reservation type as an ML Capacity Block, required specifically for capacity reservations of many high-end GPU instance types

### End-to-End Shoot Spec Example

With all three features enabled, the worker section of a shoot's provider config would include a `workerConfig` that declares the network interfaces, a `placementGroupID`, and `instanceMarketOptions` with the capacity reservation ID.

## Validation

To validate the implementation, [NCCL all-reduce performance tests](https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/usage/collectives.html#allreduce) were run on a two-node worker pool of [p4d.24xlarge instances](https://aws.amazon.com/ec2/instance-types/p4/) (each with eight A100 GPUs and four EFA NICs). The theoretical ceiling for this instance type is 400 Gbps; the tests achieved approximately 342 Gbps, confirming that EFA traffic is flowing correctly end-to-end through the Gardener-managed cluster. The difference in the bandwidth can be attributed to fine-tuning of the tests and other network and instance conditions at runtime.

## What Users Need to Do

Enabling EFA in the provider config is only the first step. To make EFA devices and GPUs schedulable within the cluster, two additional components must be installed:

1. **AWS EFA Kubernetes Device Plugin** — available as a [Helm chart from AWS](https://artifacthub.io/packages/helm/aws/aws-efa-k8s-device-plugin). It deploys a DaemonSet on EFA-enabled nodes, exposeing EFA devices as schedulable resources (`vpc.amazonaws.com/efa`), and making them visible to pods.
2. **NVIDIA GPU Operator** - available as a [Helm chart from NVIDIA](https://github.com/nvidia/gpu-operator). It deploys the nvidia-gpu-operator Deployment and various DaemonSets on the GPU-supported nodes, making GPUs available to cluster workloads and as schedulable resources on the cluster (`nvidia.com/gpu`). If running these nodes with [GardenLinux OS](https://github.com/gardenlinux/gardenlinux), use it with the [Garden Linux NVIDIA installer](https://github.com/gardenlinux/gardenlinux-nvidia-installer) flavor to install the right GPU drivers and container runtime plugins.

Both must currently be installed manually. Dedicated Gardener extensions to automate this are already in progress — watch upcoming community meetings for updates.

## Further Reading

- [Recording: Gardener Community Meeting — EFA Support for AWS Workers](https://www.youtube.com/watch?v=iX9tPbZOuPk&t=2373)
- [GitHub PR: EFA Support for AWS Workers](https://github.com/gardener/gardener-extension-provider-aws/pull/1791)
- [AWS Elastic Fabric Adapter](https://aws.amazon.com/hpc/efa/)
- [AWS User Guide - EFA for AI/ML and HPC workloads](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/efa.html)
