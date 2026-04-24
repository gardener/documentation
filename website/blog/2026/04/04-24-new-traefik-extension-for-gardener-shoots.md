---
title: "New Traefik Extension for Gardener Shoots"
linkTitle: "New Traefik Extension for Gardener Shoots"
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
aliases: ["/blog/2026/04/24/new-traefik-extension-for-gardener-shoots"]
---

With the [retirement of Ingress NGINX](https://kubernetes.io/blog/2025/06/02/ingress-nginx-project-update/) and its best-effort maintenance period ending in early 2026, the Gardener community needed a modern replacement for ingress in shoot clusters. The new [gardener-extension-shoot-traefik](https://github.com/gardener/gardener-extension-shoot-traefik) provides exactly that — deploying [Traefik](https://traefik.io/traefik/) v3.x as the ingress controller in Gardener shoot clusters.

## Two Ingress Provider Modes

The extension supports two Kubernetes Ingress provider types to accommodate both new deployments and migrations from NGINX:

- **KubernetesIngress** — the default mode, using Traefik's native Kubernetes Ingress provider with ingress class `traefik`.
- **KubernetesIngressNGINX** — an NGINX-compatible mode that recognizes a subset of NGINX annotations, making migration from Ingress NGINX to Traefik straightforward. In this mode, the ingress class is set to `nginx` and the IngressClass resource uses `controller: k8s.io/ingress-nginx` for compatibility with existing Ingress resources.

## How It Works

The extension follows the standard Gardener extension lifecycle. When enabled on a shoot, it deploys two ManagedResources: one for the Traefik deployment in the shoot cluster (including configuration, service, and Traefik CRDs such as IngressRoute for HTTP, TCP, and UDP), and another in the seed for the DNS record that points to the Traefik load balancer — just like the existing NGINX ingress setup.

Enabling the extension is as simple as adding it to the shoot's `.spec.extensions`:

```yaml
spec:
  purpose: evaluation
  extensions:
    - type: shoot-traefik
      providerConfig:
        apiVersion: traefik.extensions.gardener.cloud/v1alpha1
        kind: TraefikConfig
        spec:
          replicas: 2
          ingressProvider: KubernetesIngress
```

Configuration options include replica count, log level, ingress provider type, and an optional Traefik dashboard for debugging (not recommended for production, as it exposes the Traefik API).

## Current Scope

The extension is currently limited to shoots with `purpose: evaluation`, enforced by an admission webhook. This allows teams to test Traefik in non-production environments before broader rollout.

## Getting Started

The extension is deployed via the Gardener Operator using an `Extension` resource that references the Helm charts for both the extension controller and the admission webhook. See the [repository README](https://github.com/gardener/gardener-extension-shoot-traefik) for detailed setup instructions and examples.

## Links

- [Recording: Gardener v1.139 Community Review](https://youtu.be/3-PobAcbtbw?t=2042) — presentation of the Traefik extension
- [gardener-extension-shoot-traefik](https://github.com/gardener/gardener-extension-shoot-traefik) — extension repository
- [Traefik NGINX Annotations Support](https://doc.traefik.io/traefik/reference/install-configuration/providers/kubernetes/kubernetes-ingress-nginx/) — supported NGINX annotations in Traefik
- [NGINX to Traefik Migration Guide](https://doc.traefik.io/traefik/migrate/nginx-to-traefik/)
