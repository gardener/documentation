---
category: Networking
github_repo: 'https://github.com/gardener/gardener-extension-provider-gcp'
github_subdir: docs/usage
last_reviewed: 09.04.2025
level: beginner
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/guides/networking/ipv6-gcp.md
  to: ipv6.md
publishdate: '2025-09-04'
scope: operator
title: Support for IPv6 on GCP
weight: 20
prev: false
next: false
managed: true
---

# Dual-Stack Support for Gardener GCP Extension

This document provides an overview of dual-stack support for the Gardener GCP extension.
Furthermore it clarifies which components are utilized, how the infrastructure is setup and how a dual-stack cluster can be provisioned.

## Overview

Gardener allows to create dual-stack clusters on GCP. In this mode, both IPv4 and IPv6 are supported within the cluster.
This significantly expands the available address space, enables seamless communication across both IPv4 and IPv6 environments, and ensures compliance with modern networking standards.

### Key Components for Dual-Stack Support

- **[Dual-Stack Subnets](#dual-stack-subnets)**: Separate subnets are created for nodes and services, with explicit IPv4 and external IPv6 ranges.
- **[Ingress-GCE](#ingress-gce)**: Responsible for creating dual-stack (IPv4,IPv6) Load Balancers.
- **[Cloud Allocator](#cloud-allocator)**: Manages the assignment of IPv4 and IPv6 ranges to nodes and pods.

## Dual-Stack Subnets

When provisioning a dual-stack cluster, the GCP provider creates distinct subnets:

### 1. **Node Subnet**

- **Primary IPv4 Range**: Used for IPv4 nodes.
- **Secondary IPv4 Range**: Used for IPv4 pods.
- **External IPv6 Range**: Auto-assigned with a `/64` prefix. Each VM gets an interface with a `/96` prefix.
- **Customization**:
  - IPv4 ranges (pods and nodes) can be defined in the shoot object.
  - IPv6 ranges are automatically filled by the GCP provider.

### 2. **Service Subnet**

- This subnet is dedicated to IPv6 services. It is created due to GCP's limitation of not supporting IPv6 range reservations.

### 3. **Internal Subnet (optional)**

- This subnet is dedicated for internal load balancer. Currently, only internal IPv4 loadbalancer are supported. They are provisioned by the Cloud Controller Manager (CCM).

## Ingress-GCE

The ingress-gce is a mandatory component for dual-stack clusters. It is responsible for creating dual-stack (IPv4,IPv6) Load Balancers. This is necessary because the GCP Cloud Controller Manager does not support provisioning IPv6 Load Balancer.

## Cloud Allocator

The Cloud Allocator is part of the GCP Cloud Controller Manager and plays a critical role in managing IPAM (IP Address Management) for dual-stack clusters.

### Responsibilities

- **Assigning PODCIDRs to Node Objects**: Ensures that both IPv4 and IPv6 pod ranges are correctly assigned to the node objects.
- **Leveraging Secondary IPv4 Range**:
  - Uses the secondary IPv4 range in the node subnet to allocate pod IP ranges.
  - Assigns both IPv4 and IPv6 pod ranges in compliance with GCP’s networking model.

### Operational Details

- The Cloud Allocator assigns a `/112` pod cidr range/subrange from the `/96` cidr range assigned to each VM.
- This ensures efficient utilization of IPv6 address space while maintaining compatibility with Kubernetes networking requirements.

#### Why Use a Secondary IPv4 Range for Pods?
The secondary IPv4 range is essential for:
- Enabling the Cloud Allocator to function correctly in assigning IP ranges.
- Supporting both IPv4 and IPv6 pods in dual-stack clusters.
- Aligning with GCP CCM’s requirement to separate pod IP ranges within the node subnet.

## Creating a Dual-Stack Cluster

To create a dual-stack cluster, both IP families (IPv4,IPv6) need to be specified under `spec.networking.ipFamilies`. Below is an example of a dual-stack shoot cluster configuration:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
  ...
spec:
  ...
  provider:
    type: gcp
    infrastructureConfig:
      apiVersion: gcp.provider.extensions.gardener.cloud/v1alpha1
      kind: InfrastructureConfig
      networks:
        workers: 10.250.0.0/16
  ...
  networking:
    type: ...
    ipFamilies:
    - IPv4
    - IPv6
    nodes: 10.250.0.0/16
  ...
```

## Migration of IPv4-Only Shoot Clusters to Dual-Stack

To migrate an IPv4-only shoot cluster to Dual-Stack simply change the `.spec.networking.ipFamilies` field in the `Shoot` resource from `IPv4` to `IPv4, IPv6` as shown below.

```yaml
kind: Shoot
apiVersion: core.gardener.cloud/v1beta1
metadata:
  ...
spec:
  ...
  networking:
    type: ...
    ipFamilies:
      - IPv4
      - IPv6
  ...
```

You can find more information about the process and the steps required [here](https://gardener.cloud/docs/gardener/networking/dual-stack-networking-migration/).

> [!WARNING]
> Please note that the dual-stack migration requires the IPv4-only cluster to run in native routing mode, i.e. pod overlay network needs to be disabled.
> The default quota of static routes per VPC in GCP is 200. This restricts the cluster size. Therefore, please adapt (if necessary) the quota for the routes per VPC (`STATIC_ROUTES_PER_NETWORK`) in the gcp cloud console accordingly before switching to native routing.
> Furthermore, if a VPC is shared among multiple Gardener shoot clusters, the pod CIDR ranges of the shoot clusters running without an overlay must be disjoint.

After triggering the migration a constraint of type `DualStackNodesMigrationReady` is added to the shoot status. It is in state `False` until all nodes have an IPv4 and IPv6 address assigned.
Changing the `ipFamilies` field triggers immediately an infrastructure reconciliation, where the infrastructure is reconfigured to additionally support IPv6. During this infrastructure migration process the subnets get an external IPv6 range and the node subnet gets a secondary IPv4 range. Pod specific cloud routes are deleted from the VPC route table and alias IP ranges for the pod routes are added to the NIC of Kubernetes nodes/instances.
With the next node roll-out which is a manual step and will not be triggered automatically, all nodes will get an IPv6 address and an IPv6 prefix for pods assigned. When all nodes have IPv4 and IPv6 pod ranges, the status of the `DualStackNodesMigrationReady` constraint will be changed to `True`.
Once all nodes are migrated, the remaining control plane components and the Container Network Interface (CNI) are configured for dual-stack networking and the migration constraint is removed at the end of this step.

## Load Balancer Service Configuration

To create a dual-stack LoadBalancer the `spec.ipFamilies` and `spec.ipFamilyPolicy` field needs to be specified in the Kubernetes service.
An example configuration is shown below:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx
  namespace: default
  annotations:
    cloud.google.com/l4-rbs: enabled
spec:
  ipFamilies:
  - IPv4
  - IPv6
  ipFamilyPolicy: PreferDualStack
  ports:
  - port: 12345
    protocol: TCP
    targetPort: 80
  selector:
    run: nginx
  type: LoadBalancer
```

The required annotation `cloud.google.com/l4-rbs: enabled` for ingress-gce is added automatically via webhook for services of `type: LoadBalancer` for new services.

**Note:** Existing LoadBalancer services cannot be migrated to dual-stack. They must be deleted and recreated.

### Internal Load Balancer
- Internal IPv6 LoadBalancers are currently **not supported**.
- To create internal IPv4 LoadBalancers, you can set one of the the following annotations:
  - `"networking.gke.io/load-balancer-type=Internal"`
  - `"cloud.google.com/load-balancer-type=internal"` (deprecated).
    Internal load balancers are created by cloud-controller-manger and get an IPv4 address from the internal subnet.
