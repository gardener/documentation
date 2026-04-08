---
title: "Introducing the New Traefik Ingress Controller Extension for Gardener"
linkTitle: "Introducing the New Traefik Ingress Controller Extension for Gardener"
newsSubtitle: April 01, 2026
publishdate: 2026-04-01
authors:
- avatar: https://avatars.githubusercontent.com/DockToFuture
  email: sebastian.stauch@sap.com
  login: DockToFuture
  name: Sebastian Stauch
tags:
  - feature-announcement
  - networking
  - extensions
aliases: ["/blog/2026/04/01/introducing-the-new-traefik-ingress-controller-extension-for-gardener"]
---

With the official retirement of the Ingress-NGINX controller from the Kubernetes project, Gardener is introducing a new, robust, and feature-rich alternative: the `gardener-extension-shoot-traefik`. This extension allows you to use [Traefik](https://traefik.io/traefik/) as the ingress controller for your `Shoot` clusters, providing a modern and powerful solution for managing external access to your services.

## Seamless Migration and Flexible Configuration

The new Traefik extension is designed for both flexibility and ease of migration. It can be configured in two primary modes:

*   **NGINX Compatibility Mode (`kubernetes-ingress-nginx-mode`):** To simplify the transition from Ingress-NGINX, this mode supports a subset of the familiar NGINX ingress annotations. This allows you to migrate your existing `Ingress` resources with minimal changes, as demonstrated with features like SSL redirects.
*   **Traefik Native Mode (`kubernetes-ingress`):** For those who do not need to migrate. This mode leverages Traefik's built-in `IngressClass` support and exposes the full power of Traefik's routing engine directly through standard Kubernetes `Ingress` resources. In addition, you can gradually adopt Traefik-native CRDs such as `IngressRoute`, `Middleware`, and `TLSOption` to unlock advanced capabilities — including request transformation, rate limiting, circuit breaking, and fine-grained TLS configuration — without being tied to any NGINX-specific annotation conventions.

Beyond the primary modes, the extension also allows for configuring the log level for debugging and enabling a dashboard for testing and evaluation purposes.

## How It Works

The extension seamlessly integrates into the Gardener ecosystem. When enabled for a `Shoot` cluster, it deploys the necessary `ManagedResource`s containing the Traefik `Deployment` and its configuration into the `Shoot`. It also handles the creation of the required DNS records in the `Seed` cluster, pointing to the Traefik load balancer, just as with other ingress controllers.

Traefik's architecture is built on the core concepts of **Routers**, **Middleware**, and **Services**:
*   **Routers** are the entry point — they analyze incoming requests and decide which service should handle them based on rules.
*   **Middleware** sit between the router and the service. They modify requests and/or responses — think of them as a processing pipeline.
*   **Services** define how to reach the actual backend servers and how to load-balance traffic to them.

This modular design, exposed through CRDs like `IngressRoute`, provides a highly flexible and extensible ingress solution for your clusters.

The new `gardener-extension-shoot-traefik` is now available, offering a powerful and future-proof ingress solution for your Gardener-managed Kubernetes clusters.

---
## Explore Further
*   [Recording: New Traefik Extension for `Shoot`s](https://youtu.be/3-PobAcbtbw?t=2045)
*   [GitHub: gardener-extension-shoot-traefik](https://github.com/gardener/gardener-extension-shoot-traefik)
