---
title: "Unifying HTTP Proxy Infrastructure in Gardener"
linkTitle: "Unifying HTTP Proxy Infrastructure in Gardener"
newsSubtitle: October 22, 2025
publishdate: 2025-10-22
authors:
- avatar: https://avatars.githubusercontent.com/hown3d
  login: hown3d
  name: Lukas Hoehl
aliases: ["/blog/2025/10/22/unifying-http-proxy-infrastructure-in-gardener"]
---

# Unifying HTTP Proxy Infrastructure in Gardener

Gardener is simplifying its networking infrastructure by moving towards a single, unified entrypoint for all HTTP CONNECT proxy traffic. This change, introduced as part of [GEP-30](https://github.com/gardener/gardener/blob/master/docs/proposals/30-apiserver-proxy.md), aims to streamline configuration and reduce complexity.

### The `UseUnifiedHTTPProxyPort` Feature Gate

The transition to this new model is managed by a new alpha feature gate, `UseUnifiedHTTPProxyPort`.

When an operator enables this feature gate, the Istio ingress gateway in the seed cluster opens a new port, `8443`, dedicated to handling all HTTP CONNECT proxy requests. For backward compatibility and to ensure a smooth transition, the legacy port `8132` remains active alongside the new one.

### How It Works

With the feature gate enabled, Gardener components that rely on the proxy are reconfigured:

*   The **shoot VPN client** and the **API server proxy** are updated to send their traffic to the new unified port (`8443`).
*   A new, standardized HTTP header, `X-Gardener-Destination`, is now used to route the traffic, replacing the legacy `Reversed-VPN` header.

These changes ensure that traffic is correctly routed through the new, unified infrastructure.

### Tracking Adoption and Future Steps

To safely manage the transition, Gardener now adds a new condition, `ShootUsesUnifiedHTTPProxyPort`, to the `Shoot` status. This condition is set to `True` once a cluster's components have been successfully configured to use the new port `8443`.

This tracking mechanism will allow operators to monitor the adoption of the new proxy infrastructure across all clusters. The ultimate goal is to deprecate and remove the old port `8132` in a future release, leading to a cleaner and more maintainable networking setup.

### Further Reading

*   [Recording of the talk](https://youtu.be/GArG1wh2j1o?t=1358)
*   [GitHub Pull Request #13003](https://github.com/gardener/gardener/pull/13003)
*   [GEP-30: Unifying the HTTP-Proxy Infrastructure](https://github.com/gardener/gardener/blob/master/docs/proposals/30-apiserver-proxy.md)