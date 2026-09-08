---
github_repo: 'https://github.com/gardener/gardener-extension-shoot-traefik'
github_subdir: docs/api-reference
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-traefik/api-reference/traefik.extensions.gardener.cloud.md
  to: traefik.extensions.gardener.cloud.md
title: Traefik.extensions.gardener.cloud
prev: false
next: false
---
<!-- BANNER:MANAGED -->
<!--
   █▀▀ ▀█▀ █▀█ █▀█
   ▀▀█  █  █ █ █▀▀
   ▀▀▀  ▀  ▀▀▀ ▀

   ┌────────────────────────────────────────────────┐
   │  MANAGED FILE — aggregated from upstream       │
   │                                                │
   │  Editing here is pointless: The nightly        │
   │  aggregation run overwrites this file.         │
   │                                                │
   │  Open a PR against the source instead: ─────┐  │
   │                          ┌──┐    ┌──────────┘  │
   │                          └──│────┘             │
   │           ┌─────────────────┘                  │
   └───────────│────────────────────────────────────┘
               ▼               
   https://github.com/gardener/gardener-extension-shoot-traefik/blob/main/docs/api-reference/traefik.extensions.gardener.cloud.md
-->


# API Reference

## Packages
- [traefik.extensions.gardener.cloud/v1alpha2](#traefikextensionsgardenercloudv1alpha2)

## traefik.extensions.gardener.cloud/v1alpha2

Package v1alpha2 provides the v1alpha2 version of the external API types.
Unlike v1alpha1, the configuration fields live at the top level with no spec wrapper,
following the convention of other Gardener extension providerConfig APIs.

#### HTTPEntrypointType

*Underlying type:* *string*

HTTPEntrypointType defines how the Traefik LoadBalancer handles plain HTTP (port 80).

*Appears in:*
- [TraefikConfig](#traefikconfig)

| Field | Description |
| --- | --- |
| `Enabled` | HTTPEntrypointEnabled exposes the Service port 80 and serves plain HTTP (default).<br /> |
| `Redirect` | HTTPEntrypointRedirect exposes the Service port 80 and redirects all HTTP requests to HTTPS (301).<br /> |
| `Disabled` | HTTPEntrypointDisabled does not expose the Service port 80. The container web entrypoint (:8000)<br />is kept regardless, because the /ping health probes depend on it.<br /> |

#### IngressProviderType

*Underlying type:* *string*

IngressProviderType defines the type of Kubernetes Ingress provider to use.

*Appears in:*
- [TraefikConfig](#traefikconfig)

| Field | Description |
| --- | --- |
| `KubernetesIngress` | IngressProviderKubernetesIngress is the standard Kubernetes Ingress provider.<br /> |
| `KubernetesIngressNGINX` | IngressProviderKubernetesIngressNGINX is the NGINX-compatible Kubernetes Ingress provider.<br />This provider supports NGINX Ingress Controller annotations, making it easier to migrate<br />from NGINX Ingress Controller to Traefik.<br /> |
