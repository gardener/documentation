---
title: "Gateway API Comes to Gardener Shoots: Introducing the Envoy Gateway Extension"
linkTitle: "Gateway API Comes to Gardener Shoots: Introducing the Envoy Gateway Extension"
newsSubtitle: September 16, 2026
publishdate: 2026-09-16
authors:
- avatar: https://avatars.githubusercontent.com/DockToFuture
  email: sebastian.stauch@sap.com
  login: DockToFuture
  name: Sebastian Stauch
tags:
- feature-announcement
- networking
- extensions
aliases: ["/blog/2026/09/16/gateway-api-comes-to-gardener-shoots-introducing-the-envoy-gateway-extension"]
---

Kubernetes Ingress has served the ecosystem well, but it is now frozen — no new features will be added, and its annotation-heavy interface makes consistent, multi-team workflows difficult. The Kubernetes community is converging on [Gateway API](https://gateway-api.sigs.k8s.io/), its successor: a role-oriented, vendor-neutral standard with native L4/L7 routing, TLS termination, and TCP/UDP support built in.

With Gardener v1.150, [GEP-68](https://github.com/gardener/enhancements/pull/69) ships as a new extension: `gardener-extension-envoy-gateway`. It brings [Envoy Gateway](https://gateway.envoyproxy.io/) — an official Envoy Proxy-based Gateway API implementation — directly into shoot clusters as a first-class, operator-managed component.

## What Gets Installed

When you enable the extension on a shoot, Gardener reconciles the following into the cluster:

- **Standard-channel Gateway API CRDs** (`GatewayClass`, `Gateway`, `HTTPRoute`, `GRPCRoute`, `ReferenceGrant`, `BackendTLSPolicy`) — optionally the experimental-channel CRDs (`TCPRoute`, `TLSRoute`, `UDPRoute`) with `channel: experimental`
- **Envoy Gateway control plane** in `kube-system` (`Deployment`, RBAC, `Service`)
- **Envoy-specific CRDs** (`EnvoyProxy`, `BackendTrafficPolicy`, and others)
- A single **`GatewayClass`** named `gardener-envoy-gateway`, pre-bound to `gateway.envoyproxy.io/gatewayclass-controller`

All resources are delivered via a `ManagedResource`, so updates and deletions are idempotent and reconciled by Gardener's resource manager.

## Enabling the Extension

Add the extension to the `spec.extensions` field of your `Shoot`:

```yaml
spec:
  purpose: evaluation        # required during the GEP-68 incubation phase
  extensions:
    - type: envoy-gateway
      providerConfig:
        apiVersion: envoy-gateway.extensions.gardener.cloud/v1alpha1
        kind: EnvoyGatewayConfig
        controlPlane:
          logLevel: info     # debug|info|warn|error
        channel: standard    # standard|experimental
```

After the `Shoot` is reconciled, verify the `GatewayClass` is accepted:

```bash
kubectl get gatewayclass gardener-envoy-gateway
# NAME                     CONTROLLER                                       ACCEPTED
# gardener-envoy-gateway   gateway.envoyproxy.io/gatewayclass-controller    True
```

## Creating Your First HTTPRoute

With the `GatewayClass` in place, create a `Gateway` and an `HTTPRoute` to expose a `Service`:

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: my-gateway
  namespace: demo
spec:
  gatewayClassName: gardener-envoy-gateway
  listeners:
    - name: http
      protocol: HTTP
      port: 80
      allowedRoutes:
        namespaces:
          from: Same
---
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: my-route
  namespace: demo
spec:
  parentRefs:
    - name: my-gateway
  rules:
    - backendRefs:
        - name: my-service
          port: 80
```

Envoy Gateway provisions a `Service` of type `LoadBalancer` for the `Gateway`. Traffic is evenly distributed across matching backend pods, and routing rules — path matching, header-based rules, traffic splitting — are expressed directly on the `HTTPRoute`.

## Coexistence with `gardener-extension-shoot-traefik`

The extension is the sibling of [`gardener-extension-shoot-traefik`](https://github.com/gardener/gardener-extension-shoot-traefik) (GEP-57). Both extensions are intentionally disjoint and can run side by side in the same shoot — though running both simultaneously in production is generally not recommended. Teams already on Traefik can evaluate Envoy Gateway without interference.

## Current Status

The extension ships **Envoy Gateway v1.8.3** with **Gateway API CRDs v1.5.1**, supporting Kubernetes v1.32–v1.35. During the GEP-68 incubation phase, an admission webhook restricts usage to shoots with `spec.purpose: evaluation`. Operator-controlled version pinning is planned via the upcoming extension profile feature.

Operators register the extension on a landscape by applying an `Extension` resource to the virtual garden cluster — see the [deployment guide](https://github.com/gardener/gardener-extension-envoy-gateway/blob/main/docs/usage/deployment.md) for the full procedure.

## Further Reading

- [📽️ Recording](https://youtu.be/jUgYGYulHwY?t=74)
- [gardener-extension-envoy-gateway repository](https://github.com/gardener/gardener-extension-envoy-gateway)
- [Getting started guide](https://github.com/gardener/gardener-extension-envoy-gateway/blob/main/docs/usage/getting-started.md)
- [GEP-68](https://github.com/gardener/enhancements/pull/69)
- [Envoy Gateway](https://gateway.envoyproxy.io/)
- [Kubernetes Gateway API](https://gateway-api.sigs.k8s.io/)
