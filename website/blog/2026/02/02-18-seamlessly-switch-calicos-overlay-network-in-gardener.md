---
title: "Seamlessly Switch Calico's Overlay Network in Gardener"
linkTitle: "Seamlessly Switch Calico's Overlay Network in Gardener"
newsSubtitle: February 18, 2026
publishdate: 2026-02-18
authors:
- avatar: https://avatars.githubusercontent.com/DockToFuture
  email: sebastian.stauch@sap.com
  login: DockToFuture
  name: Sebastian Stauch
aliases: ["/blog/2026/02/18/seamlessly-switch-calicos-overlay-network-in-gardener"]
---

Switching networking configurations in a live Kubernetes cluster is a delicate operation where timing is everything. A common scenario for Gardener operators is transitioning a cluster's Calico networking from an overlay mode (like IPIP) to a non-overlay, native routing mode. Previously, this switch could lead to temporary network disruptions. We're happy to announce a new feature that ensures this transition is seamless and free of downtime.

### The Challenge: A Race for Routes

In a non-overlay mode, Calico relies on the cloud provider's infrastructure to route traffic between nodes. This is typically handled by a route controller that creates the necessary entries in the provider's route tables.

The problem was a potential race condition. When an operator disabled the overlay network, the Calico daemonset would begin to roll and reconfigure itself. If this happened *before* the route controller had finished creating the required routes for all nodes, pods could temporarily lose the ability to communicate with each other, resulting in a period of network downtime. This was especially problematic in large clusters, where route creation can take time or even fail due to cloud provider quotas.

### The Solution: A Coordinated, Seamless Switch

To solve this, Gardener now introduces the `SeamlessOverlaySwitch`, an alpha feature gate in the `gardener-extension-networking-calico`. When enabled, this feature orchestrates the transition to ensure the underlying network is ready before Calico is reconfigured.

This is made possible by a foundational enhancement to the `aws-custom-route-controller`. The controller now updates the standard `NetworkUnavailable` condition on each Kubernetes node. When it successfully creates the required routes for a node, it sets this condition to `False` with the reason `RouteCreated`.

With this crucial signal in place, the Calico extension can now perform a coordinated switch:

1.  An operator initiates the switch by disabling the overlay in the Shoot specification.
2.  With the `SeamlessOverlaySwitch` feature enabled, the Calico extension detects the requested change but pauses the reconfiguration.
3.  It begins monitoring the `NetworkUnavailable` condition on all nodes in the cluster.
4.  The extension waits until it has verified that **all** nodes are reporting `NetworkUnavailable=False` with the reason `RouteCreated`.
5.  Only once this confirmation is received does the extension proceed with rolling the Calico daemonset to the new non-overlay configuration.

If the routes are not yet ready on all nodes, the reconciliation process is safely retried, and the existing overlay network remains active and uninterrupted. This guarantees a zero-downtime transition and prevents the cluster from entering a partially configured, inconsistent state. This enhancement is currently available for AWS, with support for other cloud providers to follow.

***

### Further Reading

*   [Recording: Seamless Overlay Network Switch](https://youtu.be/jScp5zha7Fc?t=1591)
*   [Pull Request: Add `SeamlessOverlaySwitch` feature gate](https://github.com/gardener/gardener-extension-networking-calico/pull/779)
*   [Pull Request: Set network unavailable condition](https://github.com/gardener/aws-custom-route-controller/pull/411)