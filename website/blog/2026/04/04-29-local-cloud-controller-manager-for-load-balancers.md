---
title: "Local cloud-controller-manager for Load Balancers"
linkTitle: "Local cloud-controller-manager for Load Balancers"
newsSubtitle: April 29, 2026
publishdate: 2026-04-29
authors:
- avatar: https://avatars.githubusercontent.com/rfranzke
  email: rafael.franzke@sap.com
  login: rfranzke
  name: Rafael Franzke
aliases: ["/blog/2026/04/29/local-cloud-controller-manager-for-load-balancers"]
---

Gardener's local development setup now includes a proper cloud-controller-manager that implements `LoadBalancer` services dynamically — replacing the previous hard-coded port mapping hacks and enabling load balancers in local shoot clusters for the first time.

## The Problem

The previous implementation of load balancers in the local setup relied on a service controller in `gardener-extension-provider-local` that patched services to well-known node ports statically mapped on the kind container. This approach was:

- **Inflexible** — only pre-configured services could get a load balancer; adding new ones required code changes.
- **Kind-cluster only** — load balancers in local shoot clusters were not supported at all.
- **Hard to maintain** — hard-coded port mappings and static provisioning made the setup brittle and difficult to extend.

## The New Approach

The new `cloud-controller-manager-local` draws inspiration from [cloud-provider-kind](https://github.com/kubernetes-sigs/cloud-provider-kind) by the Kubernetes SIG. It uses the standard Kubernetes cloud-provider library to implement a proper service controller that dynamically provisions load balancers.

Here's how it works:

1. **Loopback IP range** — During kind cluster creation, a range of 32 external IPs is configured as loopback device aliases on the host machine.
2. **Docker socket mounting** — The cloud-controller-manager mounts the Docker socket and creates dedicated Envoy containers for each `LoadBalancer` service.
3. **Dynamic port mapping** — Each Envoy container binds to an available loopback IP and forwards traffic to the service's node ports on the kind cluster nodes.
4. **Envoy with dynamic config** — Envoy is configured with file-based dynamic resources, allowing backends to be updated when nodes are added or removed.

The cloud-controller-manager is deployed in two places:

- In the `kube-system` namespace of the kind cluster itself (for infrastructure-level services like the Gardener API server ingress).
- In each shoot control plane namespace as part of the `ControlPlane` reconciliation of `gardener-extension-provider-local`.

## Load Balancers in Shoots

With the cloud-controller-manager also running for shoots, `LoadBalancer` services in local shoot clusters work for the first time. Since shoot nodes aren't directly reachable from the Envoy containers, additional IP routes are configured to route traffic via the kind nodes to reach the shoot worker nodes.

This means developers can now test load balancer behavior in shoots locally — including features like `externalTrafficPolicy: Local` — without needing a cloud provider.

## Links

- [Recording (demo starts at 23:36)](https://youtu.be/xUINvwIt9Kk?t=1416)
- [PR: Implement cloud-controller-manager-local with support for load balancers](https://github.com/gardener/gardener/pull/14415)
