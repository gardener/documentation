---
title: "Enhancing VPN High Availability with Round-Robin Bonding Mode"
linkTitle: "Enhancing VPN High Availability with Round-Robin Bonding Mode"
newsSubtitle: January 28, 2026
publishdate: 2026-01-28
authors:
- avatar: https://avatars.githubusercontent.com/domdom82
  email: Dominik.Froehlich@sap.com
  login: domdom82
  name: Dominik Froehlich
aliases: ["/blog/2026/01/28/enhancing-vpn-high-availability-with-round-robin-bonding-mode"]
---

Gardener's High Availability (HA) VPN setup is designed to ensure a stable and reliable connection between the shoot cluster's control plane and its worker nodes. By default, this setup operates in an `active-backup` mode, where one VPN tunnel is active while the other remains on standby. However, certain network degradation scenarios, such as packet loss on the primary connection, could lead to disruptions without triggering a failover to the backup tunnel.

To address this, Gardener now introduces an alternative bonding mode: `round-robin`.

### The Challenge with Active-Backup Bonding

In the default `active-backup` configuration, only one of the two VPN servers (`vpn-seed-server-0`) actively handles traffic. The second server (`vpn-seed-server-1`) acts as a passive backup. The system only switches to the backup if the primary link goes down completely. This model can be problematic when the primary connection experiences significant packet loss but the link itself remains technically "up." In such cases, connections can fail, but the bonding device won't initiate a failover, leading to service degradation.

### A More Resilient Approach: Round-Robin Bonding

To improve resilience against network degradation, Gardener now offers a `round-robin` (`balance-rr`) bonding mode for HA VPN configurations. When enabled, this mode utilizes both VPN tunnels simultaneously, distributing traffic across them. This approach makes the VPN connection more tolerant to issues like packet loss on a single link, as traffic can still flow through the other active tunnel, thus maintaining connectivity and enhancing overall availability.

This change only affects HA VPN setups; non-HA VPNs are not impacted.

### How to Enable the Feature

The round-robin bonding mode is introduced as an alpha feature and is disabled by default. To enable it, operators can activate the `VPNBondingModeRoundRobin` feature gate in the `gardenlet` configuration.

This feature is available starting with Gardener release `v1.135.0`. By introducing it behind a feature gate, operators can adopt it incrementally and monitor its behavior in their specific environments.

---
### Further Reading

*   [Recording of "HA VPN Round-Robin Bonding Mode"](https://youtu.be/2rOOsQWLO_w)
*   [GitHub Pull Request: Add feature gate for HA VPN round-robin bonding mode](https://github.com/gardener/gardener/pull/13649)