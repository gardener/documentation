
---
title: "Enhanced Network Flexibility: Gardener Now Supports CIDR Overlap for Non-HA Shoots"
linkTitle: "Enhanced Network Flexibility: Gardener Now Supports CIDR Overlap for Non-HA Shoots"
newsSubtitle: May 19, 2025
publishdate: 2025-05-19
authors:
- avatar: https://avatars.githubusercontent.com/vlerenc
  email: vedran.lerenc@sap.com
  login: vlerenc
  name: Vedran Lerenc
- avatar: https://avatars.githubusercontent.com/vlerenc
  email: vedran.lerenc@sap.com
  login: vlerenc
  name: Vedran Lerenc
aliases: ["/blog/2025/05/19/enhanced-network-flexibility-gardener-now-supports-cidr-overlap-for-non-ha-shoots"]
---

Gardener is continually evolving to offer greater flexibility and efficiency in managing Kubernetes clusters. A significant enhancement has been introduced that addresses a common networking challenge: the requirement for completely disjoint network CIDR blocks between a shoot cluster and its seed cluster. Now, Gardener allows for IPv4 network overlap in specific scenarios, providing users with more latitude in their network planning.

### Addressing IP Address Constraints

Previously, all shoot cluster networks (pods, services, nodes) had to be distinct from the seed cluster's networks. This could be challenging in environments with limited IP address space or complex network topologies. With this new feature, IPv4 or dual-stack shoot clusters can now define pod, service, and node networks that overlap with the IPv4 networks of their seed cluster.

### How It Works: NAT for Seamless Connectivity

This capability is enabled through a double Network Address Translation (NAT) mechanism within the VPN connection established between the shoot and seed clusters. When IPv4 network overlap is configured, Gardener intelligently maps the overlapping shoot and seed networks to a dedicated set of newly reserved IPv4 ranges. These ranges are used exclusively within the VPN pods to ensure seamless communication, effectively resolving any conflicts that would arise from the overlapping IPs.

The reserved mapping ranges are:
*   `241.0.0.0/8`: Seed Pod Mapping Range
*   `242.0.0.0/8`: Shoot Node Mapping Range
*   `243.0.0.0/8`: Shoot Service Mapping Range
*   `244.0.0.0/8`: Shoot Pod Mapping Range

### Conditions for Utilizing Overlapping Networks

To leverage this new network flexibility, the following conditions must be met:

1.  **Non-Highly-Available VPN:** The shoot cluster must utilize a non-highly-available (non-HA) VPN. This is typically the configuration for shoots with a non-HA control plane.
2.  **IPv4 or Dual-Stack Shoots:** The shoot cluster must be configured as either single-stack IPv4 or dual-stack (IPv4/IPv6). The overlap feature specifically pertains to IPv4 networks.
3.  **Non-Use of Reserved Ranges:** The shoot cluster's own defined networks (for pods, services, and nodes) must not utilize any of the Gardener-reserved IP ranges, including the newly introduced mapping ranges listed above, or the existing `240.0.0.0/8` range (Kube-ApiServer Mapping Range).

It's important to note that Gardener will prevent the migration of a non-HA shoot to an HA setup if its network ranges currently overlap with the seed, as this feature is presently limited to non-HA VPN configurations. For single-stack IPv6 shoots, Gardener continues to enforce non-overlapping IPv6 networks to avoid any potential issues, although IPv6 address space exhaustion is less common.

### Benefits for Gardener Users

This enhancement offers increased flexibility in IP address management, particularly beneficial for users operating numerous shoot clusters or those in environments with constrained IPv4 address availability. By relaxing the strict disjointedness requirement for non-HA shoots, Gardener simplifies network allocation and reduces the operational overhead associated with IP address planning.

### Explore Further

To dive deeper into this feature, you can review the original pull request and the updated documentation:

*   **GitHub PR:** [feat: Allow CIDR overlap for non-HA VPN shoots (#11582)](https://github.com/gardener/gardener/pull/11582)
*   **Gardener Documentation:** [Shoot Networking](https://github.com/gardener/gardener/blob/master/docs/usage/networking/shoot_networking.md#overlapping-ipv4-networks-between-seed-and-shoot)
*   **Developer Talk Recording:** [Gardener Development - Sprint Review #131](https://youtu.be/ZwurVm1IJ7o?t=0)