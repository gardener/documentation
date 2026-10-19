---
github_repo: 'https://github.com/gardener/gardener-extension-envoy-gateway'
github_subdir: docs/usage
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-envoy-gateway/troubleshooting.md
  to: troubleshooting.md
persona: Users
title: Troubleshooting
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
   https://github.com/gardener/gardener-extension-envoy-gateway/blob/main/docs/usage/troubleshooting.md
-->


# Troubleshooting

Common failure modes and where to look. If none of these match, open an
issue in the [gardener-extension-envoy-gateway](https://github.com/gardener/gardener-extension-envoy-gateway/issues)
repository with the log excerpts described in each section below.

## Where the logs live

There are three components with three distinct log streams. Knowing which
one is quiet and which is complaining is usually enough to localise a
problem.

| Component | Cluster | How to tail |
| --- | --- | --- |
| Extension controller (reconciles the `Extension` on the seed) | Seed, in the shoot's control-plane namespace | `kubectl --context <seed> -n <shoot-namespace> logs -l app.kubernetes.io/name=gardener-extension-envoy-gateway -f` |
| Admission webhook (validates `Shoot` objects) | Garden runtime cluster | `kubectl --context <runtime-garden> -n garden logs -l app.kubernetes.io/name=gardener-extension-admission-envoy-gateway -f` |
| Envoy Gateway control plane (turns `Gateway`/`*Route` into xDS) | Shoot, `kube-system` namespace | `kubectl --context <shoot> -n kube-system logs -l app.kubernetes.io/name=envoy-gateway -f` |
| Envoy data plane (per `Gateway`, actual traffic) | Shoot, `kube-system` namespace | `kubectl --context <shoot> -n kube-system logs -l gateway.envoyproxy.io/owning-gateway-name=<gateway-name> -f` |

The extension controller also emits Prometheus metrics on `/metrics` — see
the operational metrics in `pkg/metrics/metrics.go`.

## Envoy Gateway pod is `CrashLoopBackOff` or spamming "Failed to watch"

Symptoms in the control-plane log:

```
error   provider.controller-runtime.cache.UnhandledError   Failed to watch
  {"type": "*v1.SomeResource",
   "error": "someresources.gateway.networking.k8s.io is forbidden:
             User \"system:serviceaccount:kube-system:envoy-gateway\" cannot
             list resource \"someresources\" ..."}
```

**Cause.** The Envoy Gateway release ships informers for a Gateway API
resource that the extension's `ClusterRole` doesn't grant `list/watch` on.
This typically shows up right after a version bump.

**Fix.** Compare the resources listed in
`pkg/envoygateway/deployer.go` → `clusterRole()` against the upstream
Envoy Gateway helm chart's ClusterRole for that version, and add whatever
is missing. See [Bumping Envoy Gateway](/contribute/extensions/gardener-extension-envoy-gateway/local-development/#bumping-envoy-gateway)
for a checklist that catches this drift.

**Workaround while a fix is in flight.** Extend the ClusterRole in the
shoot manually — the extension will reconcile it back to its expected
shape on the next Reconcile, so the workaround is temporary anyway.

## My `Gateway` stays `Programmed=False`

```bash
kubectl -n <ns> describe gateway <name>
```

Look at the `Programmed` and `Accepted` conditions.

* **`Accepted=False`** — the `gatewayClassName` doesn't match. It must be
  `gardener-envoy-gateway`.
* **`Programmed=False, reason=Pending`** — the data-plane Envoy Deployment
  has been created but no external address has been assigned yet. Look at
  the LoadBalancer Service:
  ```bash
  kubectl -n kube-system get svc \
    -l gateway.envoyproxy.io/owning-gateway-name=<name>
  ```
  If `EXTERNAL-IP` is `<pending>`, the cloud-provider LB controller isn't
  provisioning. Check the shoot's cloud-controller-manager logs on the
  seed.
* **`Programmed=False, reason=AddressNotAssigned`** — same root cause,
  cloud-provider side.

## `ManagedResource` is `Healthy=False` on the seed

```bash
kubectl --context <seed> -n <shoot-ns> get managedresource extension-envoy-gateway -o yaml
```

The `.status.conditions` and `.status.resourcesApplied` fields tell you
which specific object failed to apply. Common reasons:

* **CRD conflict.** A CRD already exists in the shoot with a different
  owner. Fix by deleting the offending CRD or by setting `manageCRDs: false`
  in the `providerConfig` so the extension leaves the CRDs alone.
* **RBAC missing on the seed.** `gardener-resource-manager` needs a
  ServiceAccount token; if it's missing the ManagedResource never applies.
  Look at `gardener-resource-manager` logs in the shoot's control-plane
  namespace on the seed.
* **Webhook rejection.** Something in the shoot has an
  admission/validating webhook that rejects the extension's objects.
  `describe managedresource` shows the exact error.

## Extension refuses to be removed (live-Gateway guard)

Symptom on `kubectl` output when disabling the extension on a live shoot:

```
Error: refusing to delete envoy-gateway extension: user Gateways still exist
```

**Cause.** The extension refuses to detach from a live shoot while user-owned
`Gateway` objects still exist — pulling out from under live Gateways would
silently drop traffic.

**Fix.** Delete the `Gateway` objects in the shoot first:

```bash
kubectl --context <shoot> get gateway.gateway.networking.k8s.io -A
# ... delete them ...
```

Then remove the `spec.extensions[]` entry from the Shoot. The guard is
bypassed automatically when the entire shoot itself is being deleted
(`shoot.deletionTimestamp != nil`).

> **Recommended.** Delete your `Gateway` (and any custom `GatewayClass`)
> objects *before* disabling the extension or terminating the shoot. This
> avoids the guard on a live shoot and avoids a slow, finalizer-driven
> teardown on deletion.
> 
> If you forget on shoot deletion, the extension self-heals: it clears the
> upstream `gateway-exists-finalizer.gateway.networking.k8s.io` finalizer from
> the `gardener-envoy-gateway` GatewayClass so the GatewayClass, its CRD, and
> the extension's `ManagedResource` no longer hang in `Terminating`.

## Admission webhook rejects the Shoot

Typical rejection messages:

* `spec.purpose must be "evaluation" when extension "envoy-gateway" is enabled`
  → the GEP-68 incubation-phase scope restriction. Set
  `spec.purpose: evaluation`.
* `unknown field "..."` in `providerConfig` → strict decoding is on; typo in
  a field name or you're using an API version the current extension doesn't
  understand.
* `controlPlane.logLevel`/`dataPlane.logLevel`: must be one of debug, info, warn, error → self-explanatory.

Look at the admission webhook logs (see the log table above) for the full
error path.

## Extension controller reports invalid `providerConfig`

Symptom in the extension-controller log:

```
error   failed to decode provider config, using defaults
```

**Cause.** The `providerConfig` on the `Shoot` failed strict decoding —
usually a typo or a field that has been removed in a newer API version.

**Fix.** The controller falls back to defaults so the extension still
runs, but the operator-supplied config is ignored. Correct the field name
in the Shoot; the next reconcile picks it up.

## Data-plane Envoy pods can't reach the API server

Symptom in the Envoy data-plane logs:

```
[...] connection error [...] envoy-gateway.kube-system:18000
```

**Cause.** Something in the shoot's `NetworkPolicy` set blocks the Envoy
pod from reaching the Envoy Gateway control plane on the xDS port.

**Fix.** The extension ships two `NetworkPolicy` objects
(`networkpolicy.yaml` and `networkpolicy-proxies.yaml`) that carry the
necessary allow rules and pod labels. If a stricter user `NetworkPolicy`
in the same namespace denies traffic, the two must be reconciled — either
loosen the user policy or scope it to a different label selector.

## Hibernated shoot: extension appears "stuck"

The extension logs `shoot is hibernated, skipping envoy-gateway deployment`
and does nothing else. This is intentional — a hibernated shoot has no
worker nodes to run pods on. The extension will resume on wake-up.
