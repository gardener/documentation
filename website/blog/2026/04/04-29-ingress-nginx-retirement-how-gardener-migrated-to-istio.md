---
title: "Ingress NGINX Retirement: How Gardener Migrated to Istio"
linkTitle: "Ingress NGINX Retirement: How Gardener Migrated to Istio"
newsSubtitle: April 29, 2026
publishdate: 2026-04-29
authors:
- avatar: https://avatars.githubusercontent.com/u/30600170?v=4
  email: johannes.scheerer@sap.com
  login: ScheererJ
  name: Johannes Scheerer
aliases: ["/blog/2026/04/29/ingress-nginx-retirement-how-gardener-migrated-to-istio"]
---

With the [retirement of Ingress NGINX](https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/) in March 2026, Gardener has completed a full migration of its core components away from Ingress NGINX to Istio's native API — using `VirtualService` and `Gateway` resources for all internal traffic routing.

## Background

Ingress NGINX was a critical component in Gardener's architecture, used to expose observability tools (Plutono, Prometheus, Alertmanager, Vali), the dashboard, and other services across garden, seed, and shoot control plane namespaces. With upstream support ending, continuing to rely on it meant accepting unpatched security vulnerabilities in a component handling authentication and TLS termination.

## Migration Strategy

Gardener chose to migrate to Istio's native API (`VirtualService`, `Gateway`, `EnvoyFilter`) rather than the Kubernetes Gateway API. The reasoning:

- Istio-native API is already used for exposing `kube-apiserver` in shoot control planes — operators can focus on a single API surface.
- The Kubernetes Gateway API does not yet cover the full feature set required (e.g., external authorization filters still need Istio-native constructs).
- Migration to Gateway API can be revisited later without time pressure.

## What Changed

In Gardener v1.141, all core components have been migrated:

- **Garden runtime cluster** — Alertmanager, Gardener Dashboard, discovery server, Plutono, Prometheus (garden + longterm), and Vali now use `VirtualService` resources.
- **Seed cluster** — Plutono, Prometheus (aggregate), and Vali have been migrated.
- **Shoot control planes** — Alertmanager, logging/Vali, OpenTelemetry collector, Plutono, and Prometheus all use native Istio exposure.

Basic authentication (previously handled by NGINX auth annotations) is now implemented via a dedicated [external authorization server](https://github.com/gardener/ext-authz-server) that integrates with Envoy's `ext_authz` filter.

The network policy controller in `gardener-resource-manager` was also extended: just as it previously auto-generated network policies for `Ingress` resources, it now does the same for `VirtualService` resources backed by a `Gateway`.

## What's Next

Ingress NGINX is still deployed in Gardener landscapes — some extensions still depend on it. A new feature gate allows landscape operators to disable Ingress NGINX once their extensions have migrated. The tracking issue lists remaining work for extension migration.

For end users, the change is transparent. Observability endpoints are accessible exactly as before, with the same basic authentication flow — only the underlying routing has changed.

## Links

- [Recording (demo starts at 15:56)](https://youtu.be/xUINvwIt9Kk?t=956)
- [Tracking issue: Ingress NGINX retirement](https://github.com/gardener/gardener/issues/13448)
