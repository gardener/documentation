---
title: "Unifying DNS Behavior: Custom CoreDNS Configurations Now Supported in node-local-dns"
linkTitle: "Unifying DNS Behavior: Custom CoreDNS Configurations Now Supported in node-local-dns"
newsSubtitle: October 27, 2025
publishdate: 2025-10-27
authors:
- avatar: https://avatars.githubusercontent.com/DockToFuture
  email: sebastian.stauch@sap.com
  login: DockToFuture
  name: Sebastian Stauch
aliases: ["/blog/2025/10/27/unifying-dns-behavior-custom-coredns-configurations-now-supported-in-node-local-dns"]
---

Gardener is committed to making `node-local-dns` a standard feature across all shoot clusters to enhance DNS performance and reliability. A recent enhancement ensures that enabling this feature is a seamless experience, even for clusters with specialized DNS configurations. Gardener now supports applying custom CoreDNS rules directly within `node-local-dns`.

### The Challenge: Inconsistent DNS Resolution

Previously, enabling `node-local-dns` could alter the expected DNS resolution behavior for operators who defined custom rules in the `coredns-custom` ConfigMap. The `node-local-dns` agent, which acts as a DNS cache on each node, is designed to forward requests to either the in-cluster CoreDNS or directly to upstream DNS servers.

This created a problem: if a user configured a custom rule—for example, to rewrite an external domain to a cluster-internal service—`node-local-dns` might forward the request directly to an upstream server, bypassing the main CoreDNS and ignoring the custom rule. This resulted in failed requests and inconsistent behavior compared to clusters without `node-local-dns`.

### The Solution: Applying Custom Rules to the Node Cache

To address the inconsistency, Gardener now automatically mounts the `coredns-custom` ConfigMap into the `node-local-dns` pods. The Corefile for `node-local-dns` has been updated to include any custom server blocks (custom/*.server) or override rules (custom/*.override) specified in this ConfigMap. To get the correct server blocks, a sidecar container is added to the `node-local-dns` pods. This sidecar reads the server block from the `coredns-custom` ConfigMap and generates a new configuration file with the appropriate bind statement and port mappings. This newly generated configuration file is then imported into the NodeLocalDNS pods.

This change ensures that the same custom DNS logic is applied at the node-level cache, before any requests are forwarded. As a result, DNS resolution remains consistent whether `node-local-dns` is active or not, and the previous workaround of forcing all requests through the central CoreDNS is no longer necessary.

### Further Information

For a more detailed look at the implementation, you can review the pull request on GitHub. To see a demonstration of this feature, you can watch the relevant segment from our recent community meeting.

*   **GitHub Pull Request:** 
    - [apply coredns-custom cm also for the node local dns coredns server #12893](https://github.com/gardener/gardener/pull/12893)
    - [support server block imports for node-local-dns](https://github.com/gardener/gardener/pull/13160)
*   **Recording:** [Gardener Community Meeting Recording](https://youtu.be/sfByvNPAnz8?t=1052s)
*   **Documentation:** [Custom DNS configuration](https://github.com/gardener/gardener/blob/master/docs/usage/networking/custom-dns-config.md)