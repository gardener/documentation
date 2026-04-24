---
title: "New Traefik Extension for Gardener Shoot Clusters"
linkTitle: "New Traefik Extension for Gardener Shoot Clusters"
newsSubtitle: April 24, 2026
publishdate: 2026-04-24
authors:
- avatar: https://avatars.githubusercontent.com/DockToFuture
  email: sebastian.stauch@sap.com
  login: DockToFuture
  name: Sebastian Stauch
aliases: ["/blog/2026/04/24/new-traefik-extension-for-gardener-shoot-clusters"]
---

With the [retirement of Ingress NGINX](https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/) and its best-effort maintenance ending in March 2026, the Gardener community needed a modern replacement for ingress management in shoot clusters. The new [`gardener-extension-shoot-traefik`](https://github.com/gardener/gardener-extension-shoot-traefik) fills that gap by deploying [Traefik](https://traefik.io/traefik/) v3.x as an ingress controller into Gardener-managed shoot clusters.

## Why Traefik?

Traefik is a cloud-native reverse proxy and ingress controller built around a dynamic configuration model. Its architecture is based on three core concepts — routers, middleware, and services — which form a processing pipeline for incoming requests. Routers match requests and direct them to services, while middleware can alter requests or responses along the way (e.g., SSL redirects, header manipulation, rate limiting).

## Two Ingress Provider Modes

The extension offers two provider modes to ease adoption:

- **KubernetesIngress** (default) — the standard Traefik provider implementing the core Kubernetes Ingress specification. Ingress resources use the `traefik` ingress class.
- **KubernetesIngressNGINX** — a compatibility mode that supports a subset of NGINX annotations, making it straightforward to migrate existing Ingress resources from NGINX without rewriting them. In this mode, the ingress class is set to `nginx` and Traefik handles the NGINX-annotated resources transparently.

This dual-mode approach lets teams migrate incrementally: start with `KubernetesIngressNGINX` to keep existing annotations working, then move to native Traefik configuration at their own pace.

## Configuration

The extension is enabled through the shoot manifest's `.spec.extensions` field with configurable options for replicas, log level, ingress provider type, and an optional Traefik dashboard for debugging and evaluation:

```yaml
spec:
  extensions:
    - type: shoot-traefik
      providerConfig:
        apiVersion: traefik.extensions.gardener.cloud/v1alpha1
        kind: TraefikConfig
        spec:
          replicas: 2
          logLevel: Info
          ingressProvider: KubernetesIngress
          dashboard: false
```

Traefik also installs its CRDs into the shoot cluster, so advanced users can leverage Traefik-native resources like `IngressRoute` for HTTP, TCP, and UDP routing beyond what the standard Kubernetes Ingress API offers.

## Current Scope

The extension is currently available for shoots with `purpose: evaluation`, enforced by an admission webhook. This allows teams to test and validate the Traefik integration before broader rollout. An extension of the supported scope is expected to follow.

## Links

- [Recording of the presentation](https://youtu.be/3-PobAcbtbw?t=2042) (Gardener v1.139 Community Review, April 1, 2026)
- [gardener-extension-shoot-traefik on GitHub](https://github.com/gardener/gardener-extension-shoot-traefik)
- [Ingress NGINX Retirement: What You Need to Know](https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/)
- [Traefik NGINX Annotations Support](https://doc.traefik.io/traefik/reference/install-configuration/providers/kubernetes/kubernetes-ingress-nginx/)
- [NGINX to Traefik Migration Guide](https://doc.traefik.io/traefik/migrate/nginx-to-traefik/)
