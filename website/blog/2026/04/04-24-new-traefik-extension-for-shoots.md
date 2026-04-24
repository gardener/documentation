---
title: "New Traefik Extension for Shoots"
linkTitle: "New Traefik Extension for Shoots"
newsSubtitle: April 24, 2026
publishdate: 2026-04-24
authors:
- avatar: https://avatars.githubusercontent.com/vlerenc
  email: vedran.lerenc@sap.com
  login: vlerenc
  name: Vedran Lerenc
- avatar: https://avatars.githubusercontent.com/DockToFuture
  email: sebastian.stauch@sap.com
  login: DockToFuture
  name: Sebastian Stauch
aliases: ["/blog/2026/04/24/new-traefik-extension-for-shoots"]
---

With the [retirement of Ingress-NGINX](https://kubernetes.io/blog/2025/06/ingress-nginx-end-of-an-era/) announced last year and its best-effort maintenance ending in March 2026, Gardener needed a modern, actively maintained replacement for shoot cluster ingress. Enter [gardener-extension-shoot-traefik](https://github.com/gardener/gardener-extension-shoot-traefik) — a new Gardener extension that deploys [Traefik](https://traefik.io/traefik/) v3.x as the ingress controller for shoot clusters.

## Why Traefik?

Traefik is a battle-tested, cloud-native reverse proxy and ingress controller with first-class Kubernetes support. Its architecture is built around three core concepts — routers, middleware, and services — that provide a clean processing pipeline for incoming requests. Routers match incoming traffic, middleware can alter requests or responses in-flight, and services handle load balancing to the actual backends.

Beyond standard Kubernetes Ingress resources, Traefik brings its own CRDs (`IngressRoute` for HTTP, TCP, and UDP) that unlock more expressive routing and configuration options directly within the cluster.

## How It Works

The extension integrates into Gardener through the established extension framework and leverages `ManagedResource` for lifecycle management. An admission webhook ensures the extension is only enabled on shoots with `purpose: evaluation`, keeping the rollout controlled.

Operators register the extension via the `gardener-operator` using an `Extension` resource that references OCI repositories for both the extension itself and its admission controller. Once registered, shoots can opt in by adding the extension to their spec:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
spec:
  purpose: evaluation
  extensions:
    - type: shoot-traefik
      providerConfig:
        apiVersion: traefik.extensions.gardener.cloud/v1alpha1
        kind: TraefikConfig
```

The extension takes care of deploying the Traefik pods, setting up DNS records for the load balancer (just like the nginx-ingress extension did), and installing Traefik's CRDs into the shoot cluster.

## Configuration

The `TraefikConfig` resource offers several knobs:

- **`ingressProvider`** — Choose between `KubernetesIngress` (native Traefik mode with ingress class `traefik`) and `KubernetesIngressNGINX` (nginx-compatible mode that supports a subset of NGINX annotations and uses ingress class `nginx`).
- **`replicas`** — Number of Traefik pod replicas (default: 2).
- **`logLevel`** — Verbosity from `Debug` to `Panic` (default: `Info`).
- **`dashboard`** — Enable the Traefik API and dashboard for debugging. Not recommended for production, as it exposes configuration details including sensitive data.

## Migrating from NGINX

The `KubernetesIngressNGINX` provider mode is specifically designed to ease migration. It maintains compatibility with a subset of NGINX annotations — for example, SSL redirect and TLS configuration — so existing Ingress resources can often work with minimal changes. The ingress class is set to `nginx` and the controller annotation to `k8s.io/ingress-nginx`, keeping existing class-based routing intact during the transition.

For a clean start without NGINX baggage, use the default `KubernetesIngress` mode instead.

## What's Next

The extension is available now — the latest release is [v0.4.0](https://github.com/gardener/gardener-extension-shoot-traefik/releases). Give it a spin on your evaluation shoots and report any issues or feature requests on the [repository](https://github.com/gardener/gardener-extension-shoot-traefik).

## Related

- [Recording of the v1.139 Review](https://youtu.be/3-PobAcbtbw?t=2042)
- [gardener-extension-shoot-traefik on GitHub](https://github.com/gardener/gardener-extension-shoot-traefik)
