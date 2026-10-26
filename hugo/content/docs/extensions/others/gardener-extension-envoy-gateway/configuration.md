---
github_repo: 'https://github.com/gardener/gardener-extension-envoy-gateway'
github_subdir: docs/usage
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-envoy-gateway/configuration.md
  to: configuration.md
persona: Users
title: Configuration
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
   https://github.com/gardener/gardener-extension-envoy-gateway/blob/main/docs/usage/configuration.md
-->


# Configuration

The `envoy-gateway` extension is enabled per shoot by adding an
`Extension` entry to `spec.extensions`. The extension is restricted to shoots
with `purpose: evaluation` during the GEP-68 incubation phase.

> The cluster-admin side of the deployment (registering the extension on the
> landscape so shoot owners can enable it) is documented separately in
> [deployment.md](/docs/extensions/others/gardener-extension-envoy-gateway/deployment/).

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
spec:
  purpose: evaluation
  extensions:
    - type: envoy-gateway
      providerConfig:
        apiVersion: envoy-gateway.extensions.gardener.cloud/v1alpha1
        kind: EnvoyGatewayConfig
        controlPlane:
          replicas: 2
          logLevel: info
        dataPlane:
          replicas: 2
          logLevel: info
        channel: standard
        manageCRDs: true
        manageDataPlaneNetworkPolicies: false
        envoyProxyDefaults:
          accessLogging: true
          resources:
            requests:
              cpu: 100m
              memory: 256Mi
```

The `EnvoyGatewayConfig` has no `spec`/`status` wrapper — the configuration
fields live at the top level, following the convention of other Gardener
extension `providerConfig` APIs.

## Fields

### `controlPlane`

Envoy Gateway control-plane settings.

- `replicas` (int) — number of control-plane replicas. Default: `2`.
- `logLevel` (string) — control-plane log level. One of `debug`, `info`,
  `warn`, `error`. Default: `info`.

### `dataPlane`

Envoy data-plane (proxy) settings, applied per `Gateway`.

- `replicas` (int) — number of proxy replicas per `Gateway`. Default: `2`.
- `logLevel` (string) — data-plane log level. One of `debug`, `info`, `warn`,
  `error`. Default: `info`.

### `channel`

The Gateway API CRD channel to install. One of `standard` or `experimental`.
Default: `standard`.

Selecting `experimental` additionally installs the experimental-channel
Gateway API CRDs (`TCPRoute`, `TLSRoute`, `UDPRoute`, `BackendTLSPolicy`).
Experimental APIs may change in backwards-incompatible ways across Gateway
API releases. Operators that enable this option should track the upstream
release notes carefully.

### `manageCRDs`

When `true` (default), the extension installs and updates the Gateway API and
Envoy Gateway CRDs. Set to `false` if the CRDs are owned externally (for
example, managed by another controller or shipped via static manifests), in
which case the extension leaves them alone.

### `envoyProxyDefaults`

Opinionated defaults applied to every `Gateway` via an `EnvoyProxy` template
reference. Currently exposes:

- `accessLogging` (bool) — enables access-log emission on the data-plane
  Envoy proxies.
- `resources` (`corev1.ResourceRequirements`) — compute resources applied to
  every data-plane Envoy proxy container.

### `manageDataPlaneNetworkPolicies`

When `true`, the extension manages the `NetworkPolicy` objects that let
**traffic reach the `Gateway`** on a shoot that enforces a default-deny
`NetworkPolicy` posture. Defaults to `false`.

It manages two policies per `Gateway` namespace:

- an **ingress** policy named `envoy-gateway-proxies` that selects the
  data-plane proxy pods (`app.kubernetes.io/managed-by: envoy-gateway`,
  `app.kubernetes.io/name: envoy`) and allows ingress **from anywhere** on the
  data-plane ports (`10080`, `10443`, `19003`), so traffic reaching the
  `Gateway`'s load balancer — external or internal — can be delivered to the
  proxies; and
- an **egress** policy named `envoy-gateway-proxies-egress` that selects the
  same proxy pods and allows egress to **DNS** (so the proxies can resolve
  names) and to the **Envoy Gateway control plane** (xDS, in `kube-system`), so
  the proxies program their listeners and become `Ready`.

> **Scope — this covers traffic *to* the `Gateway`, not *through* it to your
> backends.** A request to a `Gateway` traverses three hops, and on a
> default-deny namespace each must be allowed independently:
> 
> | Hop | Allowed by |
> | --- | --- |
> | client → Envoy proxy (proxy ingress) | `manageDataPlaneNetworkPolicies` — **this feature** |
> | Envoy proxy → your backend (proxy egress) | **you** — always required (see below) |
> | your backend accepts proxy (backend ingress) | **you** — always required (see below) |
> Because NetworkPolicies are **additive**, the managed proxy-egress policy and
> your own backend policies coexist: you do **not** replace the managed policy,
> you **add** a second egress policy for your backends alongside it. On a
> default-deny namespace the proxy→backend and backend-ingress hops are **always
> required** — without them the proxy reaches DNS and its control plane but can
> never reach your backend, so every request fails. The extension deliberately
> does not derive these hops from your routes: that route-driven backend
> reachability is planned as a separate feature. Until it lands, if you enable
> this feature on a default-deny namespace and see `upstream connect error or disconnect/reset before headers` from Envoy, external traffic *is* reaching the
> proxies — the missing piece is the backend `NetworkPolicy` pair below. For
> example:
> ```yaml
> # 1. Allow the proxies to egress to your backend. This is ADDED alongside the
> #    managed proxy-egress policy (which already permits DNS and xDS) — policies
> #    are additive, so you do not restate the DNS/xDS rules here.
> apiVersion: networking.k8s.io/v1
> kind: NetworkPolicy
> metadata:
>   name: allow-proxy-to-backend-egress
>   namespace: <gateway-namespace>
> spec:
>   podSelector:
>     matchLabels:
>       app.kubernetes.io/managed-by: envoy-gateway
>       app.kubernetes.io/name: envoy
>   policyTypes: [Egress]
>   egress:
>     # Your backend pods. Add a namespaceSelector too if the backend is in a
>     # different namespace than the Gateway.
>     - to:
>         - podSelector:
>             matchLabels:
>               app: <your-backend>
> ---
> # 2. Allow your backend pods to accept ingress from the proxies.
> apiVersion: networking.k8s.io/v1
> kind: NetworkPolicy
> metadata:
>   name: allow-backend-ingress
>   namespace: <backend-namespace>
> spec:
>   podSelector:
>     matchLabels:
>       app: <your-backend>
>   policyTypes: [Ingress]
>   ingress:
>     - from:
>         - podSelector:
>             matchLabels:
>               app.kubernetes.io/managed-by: envoy-gateway
>               app.kubernetes.io/name: envoy
> ```
> The `allow-backend-ingress` policy above opens only the backend's **ingress**
> from the proxies. If your default-deny posture also restricts **egress**
> (e.g. a `default-deny` policy with `policyTypes: [Ingress, Egress]` selecting
> all pods), the backend additionally needs its own egress rules for anything it
> initiates itself — DNS, and any other services it calls. Replies on the
> connection the proxy opened are stateful and do not need an egress rule.

Three ingress ports are opened because they serve different callers:

- `10080` / `10443` — the HTTP and HTTPS listeners that carry user traffic.
  Envoy Gateway shifts the Service's `:80`/`:443` down to these target ports
  because the proxies run non-root and cannot bind privileged ports.
- `19003` — the proxy's readiness endpoint (`/readyz`), probed by the kubelet
  and, in IP-target LB modes (e.g. GKE NEG, AWS NLB `target-type: ip`), by the
  load balancer directly.

> **Only `Gateway` listeners on `:80` and `:443` are supported.** The managed
> ingress policy opens exactly the two shifted ports (`10080`, `10443`) these
> map to. A `Gateway` that listens on any other port will have its traffic
> blocked on a default-deny namespace — the managed policy will not open it.

The policies are reconciled by a small per-shoot controller the extension runs
in the shoot's control-plane namespace **on the seed** (not inside the shoot).
It watches the shoot's `Gateway` objects through the shoot-access token and
reconciles the policies **on change** rather than on the extension's periodic
poll, so a newly created `Gateway` gets its policies promptly. Running the
controller on the seed keeps the "write `NetworkPolicy` into any namespace"
privilege out of reach of shoot nodes and tenant workloads.

The extension owns the policies' full lifecycle: they are created when a
namespace gains its first `Gateway` and removed once the namespace no longer
holds one, or when the feature is disabled.

Enable this only on shoots whose default-deny `NetworkPolicy` posture would
otherwise block traffic to the `Gateway`.

## How the data-plane NetworkPolicy controller works

> This section explains the controller behind
> [`manageDataPlaneNetworkPolicies`](#managedataplanenetworkpolicies). It is
> background for operators; nothing here is configurable.

**Where it runs.** The controller is a single-replica `Deployment` the extension
creates **per shoot, on the seed**, in that shoot's control-plane namespace
(`shoot--<project>--<name>`). It is not deployed into the shoot. It runs the
extension's own image under the `netpol-controller` subcommand — the same image
as the extension pod, not the upstream Envoy Gateway image.

**Two cluster connections.** The controller's manager holds two connections:

- the **seed** (its own in-cluster config), used only for its leader-election
  lease; and
- the **shoot** API server, built from the generic kubeconfig the token-requestor
  projects into the pod. That kubeconfig uses a `tokenFile` whose token is
  rotated and reloaded without a restart, so the controller reads `Gateway`s and
  writes `NetworkPolicy` objects into the shoot through a scoped shoot-access
  token.

Running on the seed keeps the "write a `NetworkPolicy` into any shoot namespace"
privilege out of reach of shoot nodes and tenant workloads — a node compromise
cannot reach the controller's credentials.

**Event-driven, keyed by Gateway namespace.** Rather than polling, the controller
watches the shoot and reconciles **on change**. Each watch maps the changed
object back to the affected `Gateway` namespace(s), and a reconcile recomputes
the policy set for that one namespace. It watches:

| Watched object | Why |
| --- | --- |
| `Gateway` | the unit of reconciliation; its namespace is the key |
| `NetworkPolicy` (the ones it manages) | **self-heal** — if someone edits or deletes a managed policy, the change re-enqueues the namespace and the controller restores it |

**What a reconcile writes.** For a `Gateway` namespace that holds at least one
`Gateway` of this extension's `GatewayClass`, the controller creates/updates:

- the **proxy-ingress** policy (`envoy-gateway-proxies`); and
- the **proxy-egress** policy (`envoy-gateway-proxies-egress`), carrying the DNS
  and xDS rules the proxy needs to become `Ready`.

When a namespace no longer holds a managed `Gateway`, both policies are pruned.

**Lifecycle.** The extension manages the controller's `Deployment` alongside the
rest of the shoot's envoy-gateway resources: it is created when the feature is
enabled, **scaled to zero** while the shoot is hibernated (the shoot-access
secret is kept so it resumes on wake-up), and torn down when the feature is
disabled or the shoot is deleted.

## What gets installed in the shoot

When the extension reconciles a shoot, it creates a `ManagedResource` in the
shoot's control-plane namespace on the seed. The contents of the
`ManagedResource` are applied into the shoot cluster:

1. ServiceAccount, ClusterRole, ClusterRoleBinding, leader-election Role and
   RoleBinding for the Envoy Gateway controller (in `kube-system`).
1. The Envoy Gateway control-plane `Deployment` and `Service` (in
   `kube-system`).
1. A `PodDisruptionBudget` and `NetworkPolicy` objects for the control plane.
1. A single `GatewayClass` named `gardener-envoy-gateway` bound to the
   controller `gateway.envoyproxy.io/gatewayclass-controller`, plus a default
   `EnvoyProxy` template it references.
1. Standard-channel Gateway API CRDs (and the experimental channel when
   `channel: experimental`), unless `manageCRDs: false`.
1. Envoy Gateway's own CRDs (`EnvoyProxy`, `BackendTrafficPolicy`,
   `ClientTrafficPolicy`, `SecurityPolicy`, etc.) which power
   implementation-specific configuration, unless `manageCRDs: false`.

The data-plane ingress `NetworkPolicy` objects are **not** part of the
`ManagedResource`; when `manageDataPlaneNetworkPolicies` is enabled the extension
writes them directly into the `Gateway` namespaces (see
[`manageDataPlaneNetworkPolicies`](#managedataplanenetworkpolicies) above).

The Envoy Gateway control plane spawns one Envoy data-plane Deployment +
LoadBalancer Service per user-created `Gateway`, **in the `Gateway`'s own
namespace**. The cloud-provider load-balancer controller provisions the
underlying LB for each Service.

> [!NOTE]
> The data plane runs in the `Gateway`'s namespace because the extension pins
> Envoy Gateway to the `GatewayNamespace` deploy mode
> (`provider.kubernetes.deploy.type`). Earlier extension versions used the
> upstream default (`ControllerNamespace`), which placed every data-plane proxy
> and its LoadBalancer Service in `kube-system` using the control plane's
> privileged ServiceAccount — a confused-deputy escalation. See
> [Migration: data plane moved out of `kube-system`](#migration-data-plane-moved-out-of-kube-system)
> for what this means when upgrading an existing cluster.

## Migration: data plane moved out of `kube-system`

> **Applies to:** shoots upgrading to **v0.2.0** (the first release that pins
> the `GatewayNamespace` deploy mode) from **v0.1.0**, which used the upstream
> `ControllerNamespace` mode with the data plane in `kube-system`. It applies
> to every v0.2.0-or-later upgrade from a v0.1.x cluster. On a cluster first
> created on v0.2.0 or later there is nothing to migrate.

Extensions upgraded across the `GatewayNamespace` switch move each `Gateway`'s
data-plane proxy `Deployment` and its LoadBalancer `Service` from `kube-system`
into the `Gateway`'s own namespace.

> [!WARNING]
> **This migration is disruptive in two ways:**
> 1. **A new load balancer is provisioned.** The proxy's `Service` is recreated
>    in the `Gateway` namespace, so the cloud-controller-manager provisions a
>    **new** cloud LB with a **new address**. Clients pinned to the old LB's
>    IP/hostname (or DNS that has not yet repropagated) will not follow
>    automatically.
> 1. **There is no make-before-break guarantee.** Envoy Gateway recreates the
>    proxy bundle in the new namespace independently of tearing down the old one;
>    nothing sequences "new proxy is `Ready` and serving" before the old data
>    plane stops receiving traffic. Expect a window where neither the old nor the
>    new LB reliably serves the `Gateway`. Plan the upgrade in a maintenance
>    window for traffic-bearing clusters.

Envoy Gateway **recreates** the bundle in the
new namespace but does **not** garbage-collect the old copies it left in
`kube-system` — they were created directly by the controller (not via the
extension's `ManagedResource`), so nothing owns them anymore. Left alone this
would leave, per `Gateway`:

- an idle proxy `Deployment` (dead pods), and
- an orphaned `Service` of type `LoadBalancer` — which keeps a **cloud load
  balancer provisioned and billing** even though no traffic reaches it.

**The extension cleans this up automatically.** On every reconcile, right after
deploying the control plane, it sweeps `kube-system` for objects that carry
Envoy Gateway's `app.kubernetes.io/managed-by=envoy-gateway` label **and** a
`gateway.envoyproxy.io/owning-gateway-name` label (i.e. per-`Gateway` data-plane
infra: `Service`, `Deployment`, `ServiceAccount`, `ConfigMap`, and any
`PodDisruptionBudget`/`HorizontalPodAutoscaler`) and deletes them. The
control-plane objects the extension installs in `kube-system` carry **no**
`owning-gateway-*` label, so the sweep never touches them. Deleting the orphaned
`LoadBalancer` Service triggers the cloud-controller-manager to deprovision its
LB, reclaiming the cost.

The sweep is idempotent and best-effort: once the orphans are gone it is a no-op,
it runs on the next reconcile after the new-namespace bundle exists, and a
transient failure is logged and retried on the following reconcile rather than
blocking reconciliation. No operator action is required — the cleanup happens the
next time each shoot reconciles under the new version. To confirm it has run, see
[Duplicate LoadBalancer / orphaned proxies in `kube-system` after upgrade](/docs/extensions/others/gardener-extension-envoy-gateway/troubleshooting/#duplicate-loadbalancer--orphaned-proxies-in-kube-system-after-upgrade)
in the troubleshooting guide.

## Validation

The admission webhook validates the following on every Shoot create/update:

1. `spec.purpose` must be `evaluation` when the extension is enabled.
1. `providerConfig`, if supplied, must decode strictly as an
   `EnvoyGatewayConfig` (unknown fields are rejected).
1. `controlPlane.logLevel` and `dataPlane.logLevel`, if set, must be one of
   `debug`, `info`, `warn`, `error`.
1. `channel`, if set, must be one of `standard`, `experimental`.
