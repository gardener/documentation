---
github_repo: 'https://github.com/gardener/enhancements'
github_subdir: geps/0057-replace-nginx-ingress-shoot-addon-with-traefik-extension
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/proposals/0057-replace-nginx-ingress-shoot-addon-with-traefik-extension/README.md
  to: README.md
title: 0057 Replace Nginx Ingress Shoot Addon With Traefik Extension
prev: false
next: false
managed: true
---

# GEP-57: Replace Nginx Ingress Shoot Addon with Traefik Extension

## Summary

[Ingress NGINX](https://github.com/kubernetes/ingress-nginx/) — the standard
ingress controller previously bundled as a shoot addon in Gardener — was
[officially retired by the Kubernetes project in March 2026](https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/).
From that point onward no further releases, bug fixes, or security patches
will be produced, making continued Gardener reliance on it untenable.

This GEP proposes the introduction of
[`gardener-extension-shoot-traefik`](https://github.com/gardener/gardener-extension-shoot-traefik)
as the official, community-owned Gardener extension that deploys
[Traefik](https://traefik.io/) as an ingress controller inside Gardener
shoot clusters.  The extension follows the standard Gardener extension
contract (controller registration, `ManagedResource`-based deployment,
admission webhooks) and provides a migration-friendly path for workloads that
previously relied on NGINX-specific `Ingress` annotations.

## Motivation

Gardener has historically shipped `nginx-ingress-controller` as part of its
shoot addons (`spec.addons.nginxIngress`).  Users and platform teams have
built ingress routing on top of this addon.  The Kubernetes
community's November 2025 announcement of Ingress NGINX's retirement — with
best-effort maintenance ceasing in March 2026 — creates an need for a
supported replacement.

Key problems this GEP addresses:

* **Security exposure**: After March 2026, any newly discovered CVE in Ingress
  NGINX will receive no patch. Gardener shoot clusters that continue running
  the retired addon are directly exposed.  The severity of this risk was
  already illustrated by [CVE-2025-1974](https://kubernetes.io/blog/2025/03/24/ingress-nginx-cve-2025-1974/),
  a critical remote-code-execution vulnerability in the NGINX admission
  controller that would have required emergency remediation across all impacted clusters if the validating admission controller wouldn't have been disabled.

* **Architectural debt**: The legacy shoot addon model (`spec.addons`) is a
  tightly coupled, opinionated delivery mechanism.  Migrating to a
  first-class Gardener extension decouples the ingress controller lifecycle
  from the Gardener core, enabling independent versioning, operator
  opt-in/opt-out, and community maintenance.

* **Ecosystem alignment**: The Kubernetes ecosystem is actively converging on
  [Gateway API](https://gateway-api.sigs.k8s.io/) as the successor to the
  `Ingress` resource.  Traefik ships with first-class Gateway API support
  alongside classic `Ingress` support, providing a forward-compatible landing
  zone for Gardener users.

* **Operator choice**: By delivering the replacement as an extension,
  Gardener operators retain flexibility — they can offer Traefik, offer a
  different ingress controller of their choice, or offer both side-by-side.

### Goals

1. Introduce `gardener-extension-shoot-traefik` as an
   extension in the [Gardener GitHub organization](https://github.com/gardener).
1. Provide a drop-in migration path for shoot clusters previously using
   `spec.addons.nginxIngress`, including annotation compatibility via a
   dedicated ingress provider mode (`KubernetesIngressNGINX`).
1. Install and manage the Traefik custom resource definitions in the shoot cluster, enabling operators and users to configure ingress routing declaratively using Traefik-native resources.
1. Integrate with Gardener's standard resource-management, observability, and
   lifecycle mechanisms (`ManagedResource`, heartbeat, metrics, VPA/HPA).
1. Enable safe, incremental rollout: restrict the extension to shoots with
   `purpose: evaluation`.

### Non-Goals

1. This GEP does **not** propose migrating Gardener core to Gateway API.
   Traefik's Gateway API capabilities can be enabled by users independently
   once this extension is in place.
   The migration of gardener/gardener itself is tracked in https://github.com/gardener/gardener/issues/13448.
1. This GEP does **not** deprecate or remove the legacy `spec.addons.nginxIngress`
   field.  The deprecation path for the old addon is a separate concern and is addressed in https://github.com/gardener/gardener/pull/13845.
1. This GEP does **not** prescribe a single ingress controller for all
   Gardener setups.  Operators are free to use any other ingress extension;
   this proposal covers only the Traefik extension.
1. This GEP does **not** cover multi-tenant ingress isolation, network
   policies, or advanced traffic shaping beyond what Traefik exposes out
   of the box through its standard Kubernetes Ingress and IngressRoute CRDs.

## Proposal

Introduce `gardener-extension-shoot-traefik` as a new extension in the
Gardener GitHub organization.  The extension follows the well-established
[Gardener Extension Concept](https://gardener.cloud/docs/gardener/extensions/overview/)
and implements the `Extension` reconciler contract.

When enabled on a Shoot, the extension:

1. Reconciles a set of `ManagedResource` objects in the shoot's seed namespace
   that describe all Kubernetes resources required by Traefik (Deployment,
   Service, RBAC, IngressClass, CRDs, PodDisruptionBudget, optional HPA/VPA).
1. Registers an admission webhook that validates `Shoot` objects
   enabling the extension to enforce the evaluation-purpose scope constraint
   and to validate the `TraefikConfig` provider config.
1. Exposes a `/metrics` endpoint on the extension controller for Gardener's
   monitoring stack to scrape.
1. Participates in the Gardener heartbeat protocol to report extension health.

The extension type identifier is **`shoot-traefik`** (referenced in
`spec.extensions[].type` of the Shoot manifest).

### Notes/Constraints/Caveats

* **Traefik CRDs are installed into the shoot cluster.**  The IngressRoute,
  Middleware, and other Traefik CRDs are embedded in the extension binary and
  included in the shoot `ManagedResource` on every reconcile.  The Gardener
  resource-manager applies them to the shoot cluster using server-side apply.
  Operators should be aware that these CRDs will exist in all shoots where the
  extension is enabled, even if users do not use IngressRoute objects.

* **Ingress class `nginx` for NGINX-compat mode.**  When `ingressProvider: KubernetesIngressNGINX` is configured, the extension registers the Traefik
  deployment under the `nginx` ingress class name.  This allows existing
  Ingress resources referencing `kubernetes.io/ingress.class: nginx` to be
  picked up without modification.  Only a subset of NGINX-specific annotations
  is translated by Traefik; unsupported annotations are silently ignored.
  The supported NGINX annotations are listed in the Traefik documentation: [Annotations support](https://doc.traefik.io/traefik/reference/routing-configuration/kubernetes/ingress-nginx/#annotations-support).

* **Dashboard disabled by default.**  The Traefik API and dashboard
  (`spec.dashboard: true`) expose all routing configuration including
  potentially sensitive middleware details.  It is disabled by default and
  enabling it in any environment beyond developer evaluation is strongly
  discouraged.

* **Scope is currently restricted to `purpose: evaluation` shoots.**  This
  constraint is enforced by the admission webhook and exists to allow the
  extension to mature in low-risk environments.

### Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Traefik annotation subset is insufficient for NGINX migration | Medium | High | The `KubernetesIngressNGINX` provider mode covers the most commonly used annotations.  [Unsupported annotations](https://doc.traefik.io/traefik-hub/api-gateway/reference/routing/kubernetes/ref-ingress-nginx#unsupported-nginx-annotations) are documented.  Users requiring full NGINX annotation support should consider a Traefik IngressRoute migration or another ingress controller. |
| CRD conflicts if Traefik is pre-installed in the shoot | Low | High | CRDs are part of the shoot `ManagedResource` and are applied by the Gardener resource-manager using server-side apply, so pre-existing CRDs (e.g. from a user-managed Traefik installation) are updated idempotently without field-ownership conflicts. |
| Extension limited to evaluation shoots | High | Medium | The evaluation-purpose restriction is intentional.  The extension is currently scoped to `purpose: evaluation` shoots only. |
| Legacy addon and new extension run simultaneously | Low | Medium | Both the old nginx addon and the Traefik extension register separate IngressClasses (`nginx` / `traefik`), so they can coexist without routing conflicts during a migration window.  Documentation will advise against using both long-term. |

## Design Details

### Extension Registration

The extension is installed as Gardener resources:

Either as `Extension`

```yaml
# Extension
apiVersion: operator.gardener.cloud/v1alpha1
kind: Extension
metadata:
  name: gardener-extension-shoot-traefik
spec:
  deployment:
    admission:
      runtimeCluster:
        helm:
          ociRepository:
            ref: europe-docker.pkg.dev/gardener-project/releases/charts/gardener/extensions/admission-shoot-traefik-runtime:latest
        values:
          image:
            repository: europe-docker.pkg.dev/gardener-project/releases/gardener/extensions/gardener-extension-shoot-traefik
            tag: latest
      virtualCluster:
        helm:
          ociRepository:
            ref: europe-docker.pkg.dev/gardener-project/releases/charts/gardener/extensions/admission-shoot-traefik-application:latest
    extension:
      helm:
        ociRepository:
          ref: europe-docker.pkg.dev/gardener-project/releases/charts/gardener/extensions/gardener-extension-shoot-traefik:latest
      values:
        image:
          repository: europe-docker.pkg.dev/gardener-project/releases/gardener/extensions/gardener-extension-shoot-traefik
          tag: latest
        replicaCount: 1
        resources:
          requests:
            cpu: 30m
            memory: 128Mi
        vpa:
          enabled: true
          resourcePolicy:
            minAllowed:
              memory: 64Mi
          updatePolicy:
            updateMode: Recreate
  resources:
  - clusterCompatibility:
    - shoot
    kind: Extension
    lifecycle:
      delete: BeforeKubeAPIServer
      migrate: AfterKubeAPIServer
      reconcile: AfterKubeAPIServer
    type: shoot-traefik
    workerlessSupported: false
```
or as `ControllerDeployment` and `ControllerRegistration`.

```yaml
# ControllerDeployment
apiVersion: core.gardener.cloud/v1beta1
kind: ControllerDeployment
metadata:
  name: gardener-extension-shoot-traefik
helm:
  rawChart: <base64-encoded Helm chart>
```

```yaml
# ControllerRegistration
apiVersion: core.gardener.cloud/v1beta1
kind: ControllerRegistration
metadata:
  name: shoot-traefik
spec:
  resources:
    - kind: Extension
      type: shoot-traefik
      globallyEnabled: false   # opt-in per shoot
      lifecycle:
        reconcile: AfterKubeAPIServer
        delete:   BeforeKubeAPIServer
  deployment:
    deploymentRefs:
      - name: gardener-extension-shoot-traefik
```

The extension controller is deployed per seed and watches `Extension` objects of
type `shoot-traefik`.

### API

The extension introduces a new API group `traefik.extensions.gardener.cloud`
with a single versioned kind `TraefikConfig`:

```yaml
apiVersion: traefik.extensions.gardener.cloud/v1alpha1
kind: TraefikConfig
spec:
  # Number of Traefik replica pods (default: 2)
  replicas: 2

  # Traefik log level: Debug | Info | Warn | Error | Fatal | Panic (default: Info)
  logLevel: Info

  # Ingress provider mode:
  #   KubernetesIngress      — standard Kubernetes Ingress (ingress class: "traefik")
  #   KubernetesIngressNGINX — NGINX-compat mode           (ingress class: "nginx")
  # (default: KubernetesIngress)
  ingressProvider: KubernetesIngress

  # Enable the Traefik API/dashboard (default: false, not recommended outside dev)
  dashboard: false
```

This object is embedded as `providerConfig` in the Shoot's
`spec.extensions[].providerConfig` field.  Internal type conversion and
defaulting are handled by the API machinery registered under
`traefik.extensions.gardener.cloud/v1alpha1`.

### Ingress Provider Modes

| Mode | IngressClass name | NGINX annotation translation | Use case |
| --- | --- | --- | --- |
| `KubernetesIngress` (default) | `traefik` | No | New deployments, Traefik-native usage |
| `KubernetesIngressNGINX` | `nginx` | Yes (subset) | Migration from nginx-ingress-controller |

When `KubernetesIngressNGINX` is active, Traefik is configured with its
built-in [Kubernetes Ingress NGINX provider](https://doc.traefik.io/traefik/reference/routing-configuration/kubernetes/ingress-nginx/)
which translates supported `nginx.ingress.kubernetes.io/*` annotations into
equivalent Traefik middleware and router configuration at runtime.

### Admission Webhook

A `ValidatingWebhookConfiguration` is registered at path
`/webhooks/validate-shoot-traefik`.  It validates:

1. **Purpose restriction**: The extension may only be enabled (`disabled: false`)
   on Shoots whose `spec.purpose` is `evaluation`.  Adding the extension to a
   non-evaluation shoot is rejected with a descriptive error.
1. **Provider config schema**: If a non-nil `providerConfig` is supplied, it
   must decode successfully as a `TraefikConfig` object.  Unknown fields cause
   a validation error (strict decoding).
1. **Field constraints**: `spec.replicas` must be ≥ 1; `spec.logLevel` must be
   one of the accepted enum values.

### Lifecycle Management

The extension interacts with Gardener's lifecycle protocol as follows:

| Phase | Behaviour |
| --- | --- |
| Reconcile | Creates/updates a `ManagedResource` in the shoot namespace on the seed with all shoot-cluster resources (CRDs, Deployment, Service, RBAC, IngressClass, PDB).  Waits for `ManagedResource` to become healthy before marking the `Extension` as reconciled. |
| Delete | Deletes the `ManagedResource` and waits up to 2 minutes for all managed objects to be removed from the shoot cluster before completing. |
| Heartbeat | Extension controller participates in the Gardener heartbeat protocol and reports liveness. |
| Metrics | Prometheus metrics are exposed on port 8080 under `/metrics`; Gardener's monitoring stack can scrape them via `ServiceMonitor`. |
| VPA/HPA | Optional VPA and HPA manifests for the extension controller pod are provided in the Helm chart (disabled by default). |

### Scope Restriction: Evaluation Shoots Only

The current restriction to `purpose: evaluation` shoots is a deliberate safety
measure adopted during the initial incubation phase of the extension.
This allows:

* Early adopters to validate the extension's behaviour in evaluation
  environments.
* The maintainer team to gather operational feedback.

The restriction is enforced exclusively in the admission webhook and can be
removed or made configurable by operators without any API change.

## Future Enhancements

### Feature Gate Configuration

In the initial release, the extension's behaviour is controlled exclusively
through `TraefikConfig` provider config fields and the admission webhook's
hard-coded evaluation-purpose restriction.  A future iteration will expose
selected behaviours (e.g. activating
experimental Gateway API integration) via
Gardener-style feature gates on the extension controller.  This allows operators
to opt individual seeds or environments into new or experimental functionality
without requiring a new extension release, and aligns with the feature-gate
model used in Gardener core.

### Traefik Version Handling

In the initial release, the Traefik version is pinned inside the extension
binary — every extension release ships exactly one Traefik version.  Upgrading
Traefik therefore requires upgrading the extension itself.

A future iteration will decouple the Traefik version from the extension
release, allowing operators to manage a catalog of Traefik versions for example with
lifecycle classifications (aligned with
[GEP-32](/docs/proposals/0032-version-classification-lifecycle/)) and letting
shoot owners pin a specific version.

## Drawbacks

* **Incomplete annotation parity with NGINX**: The `KubernetesIngressNGINX`
  compatibility mode does not support all NGINX annotations, see [unsupported annotations](https://doc.traefik.io/traefik-hub/api-gateway/reference/routing/kubernetes/ref-ingress-nginx#unsupported-nginx-annotations).
  Users relying on unsupported annotations (e.g. complex `nginx.ingress.kubernetes.io/configuration-snippet`
  directives) will need additional migration effort beyond switching the
  ingress provider mode.

* **Traefik CRD proliferation**: Even users who only use standard Kubernetes
  `Ingress` objects will have Traefik-specific CRDs installed in their shoot.
  This adds a small amount of API surface that may be unexpected.

## Alternatives

### 1. Continue Shipping Ingress NGINX

**Rejected.**  Ingress NGINX entered retirement in March 2026.  From that
point, no security patches will be released.  Continuing to deploy it in
Gardener shoot clusters creates an unacceptable, unmitigatable security
exposure for Gardener operators and users.

### 2. Use a Cloud-Provider-Specific Ingress Controller

Several cloud providers (AWS ALB, GCP GCLB, Azure AGIC) offer ingress
controllers.  However, these are tied to their respective infrastructure
platforms and cannot serve as a provider-agnostic drop-in replacement in
a multi-cloud environment like Gardener.

### 3. Adopt Kubernetes Gateway API Exclusively

The Kubernetes community recommends Gateway API as the long-term replacement
for Ingress.  However, Gateway API adoption requires users to migrate API
objects (from `Ingress` to `HTTPRoute`/`Gateway`), change tooling, re-train
teams, and re-test workloads.  This is a significant lift that cannot be
mandated on short notice.  Traefik supports both Ingress and Gateway API
concurrently, so choosing Traefik does not foreclose a future Gateway API
migration — it actually provides a smooth bridge toward it.

### 4. Ingress NGINX Fork / Community Takeover

At the time of the retirement announcement, the Kubernetes community attempted
to find additional maintainers for Ingress NGINX and also initiated the
InGate project as a successor.  Neither effort progressed to the point where a
maintained, production-ready artifact was available.  Forking Ingress NGINX
within the Gardener organisation would impose the full maintenance burden on
a small team and does not resolve the underlying technical debt.

### 5. Different Ingress Controller (e.g. Contour, Emissary, HAProxy Ingress)

Other CNCF-hosted ingress controllers (Contour, Emissary-ingress, HAProxy
Ingress) were evaluated.  Traefik was selected for the following reasons:

* **Active upstream**: Traefik is under active development with regular
  releases, a large community, and commercial backing.
* **Native NGINX migration path**: Traefik's `KubernetesIngressNGINX` provider
  offers built-in, upstream-supported annotation translation that no other
  controller matches.
* **Gateway API readiness**: Traefik has production-grade Gateway API support,
  making it the most forward-compatible choice.
* **Operational simplicity**: A single Traefik binary serves both Ingress and
  Gateway API routes with no external dependencies (no separate control-plane
  component required).
