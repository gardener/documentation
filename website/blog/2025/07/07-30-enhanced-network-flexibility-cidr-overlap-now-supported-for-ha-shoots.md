---
title: "Enhanced Network Flexibility: CIDR Overlap Now Supported for HA Shoots"
linkTitle: "Enhanced Network Flexibility: CIDR Overlap Now Supported for HA Shoots"
newsSubtitle: July 30, 2025
publishdate: 2025-07-30
authors:
- avatar: https://avatars.githubusercontent.com/domdom82
  email: Dominik.Froehlich@sap.com
  login: domdom82
  name: Dominik Froehlich
aliases: ["/blog/2025/07/30/enhanced-network-flexibility-cidr-overlap-now-supported-for-ha-shoots"]
---

# Enhanced Network Flexibility: CIDR Overlap Now Supported for HA Shoots

Gardener continues to enhance its networking capabilities, offering users greater flexibility in managing their cluster landscapes. A significant advancement is the extension of IPv4 network overlap support to Shoot clusters with high-availability (HA) control planes. Previously a feature exclusive to non-HA Shoots, this update allows both single-stack IPv4 and dual-stack Shoots to utilize pod, service, and node network ranges that overlap with the networks of their Seed cluster.

### Disentangling Networks with Double NAT

The challenge of overlapping IP addresses between a Seed and a Shoot is solved through a clever implementation of double Network Address Translation (NAT) within the VPN connection. When Gardener detects an overlap between a Shoot's IPv4 networks and the Seed's pod network, it dynamically reconfigures the networking stack to ensure seamless, conflict-free communication.

For HA Shoots, this is achieved by conditionally injecting an Envoy proxy as a sidecar container into the `kube-apiserver` pod. The `kube-apiserver` is then configured with an egress selector to direct all traffic destined for the Shoot through this local Envoy proxy.

This isolation allows Gardener to apply a set of `iptables` rules that perform the double NAT:
1.  **Source NAT (SNAT):** The source IP of the `kube-apiserver` pod is translated.
2.  **Destination NAT (DNAT):** The destination IP addresses for the Shoot's pods, services, and nodes are translated to a reserved, non-routable IP range (`240.0.0.0/4`).

This entire translation process is contained within the VPN tunnel and is reversed on the Shoot side, ensuring that the overlapping addresses never cause routing conflicts in either the Seed or the Shoot cluster.

### A Conditional and Efficient Approach

To maintain efficiency and minimize resource consumption, the Envoy proxy and its associated networking rules are only deployed when an actual CIDR overlap is present. For HA Shoots that do not have overlapping networks with their Seed, the `kube-apiserver` deployment remains unchanged. This conditional approach ensures that there is no performance or resource overhead for clusters that do not require this feature, while providing maximum flexibility for those that do.

This enhancement removes a key networking constraint for HA clusters, simplifying IP address management in complex or IP-constrained environments.

### Further Information
*   **Watch the presentation:** [CIDR Overlap w/ Seed For HA Shoots](https://youtu.be/xYiWsIQ8n1o?t=1092)
*   **GitHub Pull Request:** [feat: Allow CIDR overlap for HA VPN shoots #12204](https://github.com/gardener/gardener/pull/12204)
*   **Documentation:** [Overlapping IPv4 Networks between Seed and Shoot](https://github.com/gardener/gardener/blob/master/docs/usage/networking/shoot_networking.md#overlapping-ipv4-networks-between-seed-and-shoot)