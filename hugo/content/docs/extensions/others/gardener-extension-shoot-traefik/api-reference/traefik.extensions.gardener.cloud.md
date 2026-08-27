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
- [traefik.extensions.gardener.cloud/v1alpha1](#traefikextensionsgardenercloudv1alpha1)

## traefik.extensions.gardener.cloud/v1alpha1

Package v1alpha1 provides the v1alpha1 version of the external API types.

#### HTTPEntrypointType

*Underlying type:* *string*

HTTPEntrypointType defines how the Traefik LoadBalancer handles plain HTTP (port 80).

*Appears in:*
- [TraefikConfigSpec](#traefikconfigspec)

| Field | Description |
| --- | --- |
| `Enabled` | HTTPEntrypointEnabled exposes the Service port 80 and serves plain HTTP (default).<br /> |
| `Redirect` | HTTPEntrypointRedirect exposes the Service port 80 and redirects all HTTP requests to HTTPS (301).<br /> |
| `Disabled` | HTTPEntrypointDisabled does not expose the Service port 80. The container web entrypoint (:8000)<br />is kept regardless, because the /ping health probes depend on it.<br /> |

#### IngressProviderType

*Underlying type:* *string*

IngressProviderType defines the type of Kubernetes Ingress provider to use.

*Appears in:*
- [TraefikConfigSpec](#traefikconfigspec)

| Field | Description |
| --- | --- |
| `KubernetesIngress` | IngressProviderKubernetesIngress is the standard Kubernetes Ingress provider.<br /> |
| `KubernetesIngressNGINX` | IngressProviderKubernetesIngressNGINX is the NGINX-compatible Kubernetes Ingress provider.<br />This provider supports NGINX Ingress Controller annotations, making it easier to migrate<br />from NGINX Ingress Controller to Traefik.<br /> |

#### TraefikConfigSpec

TraefikConfigSpec defines the desired state of [TraefikConfig]

*Appears in:*
- [TraefikConfig](#traefikconfig)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `replicas` *integer* | Replicas is the number of Traefik replicas to deploy.<br />Defaults to 2 if not specified. |  |  |
| `ingressProvider` *[IngressProviderType](#ingressprovidertype)* | IngressProvider specifies which Kubernetes Ingress provider to use.<br />Valid values are:<br />- "KubernetesIngress" (default): Standard Kubernetes Ingress provider<br />- "KubernetesIngressNGINX": NGINX-compatible provider with support for NGINX annotations<br />Use KubernetesIngressNGINX when migrating from NGINX Ingress Controller to maintain<br />compatibility with existing NGINX-specific annotations. |  |  |
| `logLevel` *string* | LogLevel sets the Traefik log level.<br />Valid values are: Debug, Info, Warn, Error, Fatal, Panic<br />Defaults to "Info" if not specified. |  |  |
| `dashboard` *boolean* | Dashboard enables the Traefik dashboard.<br />The dashboard is exposed on port 9000 and accessible via port-forwarding.<br />Enabling the API and the dashboard in production is not recommended, because it will expose all<br />configuration elements, including sensitive data, for which access should be reserved to administrators.<br />Defaults to false if not specified. |  |  |
| `httpEntrypoint` *[HTTPEntrypointType](#httpentrypointtype)* | HTTPEntrypoint controls how the Traefik LoadBalancer handles plain HTTP (port 80).<br />Valid values are:<br />- "Enabled" (default): expose Service port 80 and serve plain HTTP.<br />- "Redirect": expose Service port 80 and redirect all HTTP requests to HTTPS (301).<br />- "Disabled": do not expose Service port 80 (HTTPS only).<br />Defaults to "Enabled" if not specified. |  |  |
