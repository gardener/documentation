---
github_repo: 'https://github.com/gardener/gardener-extension-shoot-falco-service'
github_subdir: docs
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-falco-service/architecture.md
  to: architecture.md
title: Architecture
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
   https://github.com/gardener/gardener-extension-shoot-falco-service/blob/main/docs/architecture.md
-->


# Falco Extension — Internal Architecture

This document describes the internal design of the Falco extension for contributors.
It is not required reading for operators or end users.

## Components

The extension consists of two binaries:

- **`gardener-extension-shoot-falco-service`** — the extension controller. Runs on the seed, reconciles `Extension` resources, manages ManagedResources, handles certificates and the maintenance controller.
- **`gardener-extension-admission-shoot-falco-service`** — the admission binary. Runs the validating webhook for shoot and seed objects, and the Falco version maintenance controller.

## Lifecycle controller (`pkg/controller/lifecycle`)

The lifecycle actuator is the core of the extension. It is invoked by the Gardener extension framework on every reconcile of an `Extension` resource of type `shoot-falco-service`.

### Reconcile flow

1. Decode the `FalcoServiceConfig` from the extension's `providerConfig`.
1. Resolve the target namespace (technical shoot namespace on the seed).
1. Build Helm values via `configbuilder` (`pkg/values`) — selects Falco version, merges destination config, resolves secrets, etc.
1. Determine deployment mode: shoot, seed, or garden cluster.
1. For shoot deployments: call `createPerPoolShootResources` (see below).
1. For seed/garden deployments: render the chart once and create a single `ManagedResource`.

### Per-workerpool DaemonSet deployment

Shoots get one `falco-<pool-name>` DaemonSet per worker pool plus a shared `falco-default` DaemonSet. The `falco-default` DaemonSet is used to deploy on nodes without worker poll annotation, maily non-Gardener managed Kubernetes clusters. The chart is rendered separately for each pool and for the shared resources.

**Rendering modes** — the chart is rendered twice per pool iteration:

- **Per-workerpool render** (`daemonSetOnly=true`): produces only the worker pool's DaemonSet and its `falco-<pool-name>` ConfigMap (falco.yaml). All other templates (falcosidekick, RBAC, certs, rules ConfigMaps) are suppressed by `{{- if not .Values.daemonSetOnly }}` guards. Goes into `extension-shoot-falco-service-pool-<name>`.
- **Shared render** (no `daemonSetOnly`): produces `falco-default` DaemonSet + ConfigMap + all shared resources (falcosidekick, RBAC, certs, rules). Goes into `extension-shoot-falco-service-shoot`.

`daemonSetOnly` is an internal rendering flag — it is not in `values.yaml` and is not a user-facing chart value.

**Node targeting:**

| DaemonSet | Targeting |
| --- | --- |
| `falco-<pool-name>` | `nodeSelector: worker.gardener.cloud/pool: <name>` |
| `falco-default` | Node affinity: `worker.gardener.cloud/pool DoesNotExist` |

`falco-default` acts as a safety net for nodes lacking a pool label. In normal Gardener shoots all nodes carry this label, so `falco-default` idles at zero pods.

**ManagedResources:**

| Name | Content | Label |
| --- | --- | --- |
| `extension-shoot-falco-service-shoot` | Shared resources | — |
| `extension-shoot-falco-service-pool-<name>` | DaemonSet + ConfigMap per pool | `falco.gardener.cloud/pool-managed-resource: "true"` |

The per-pool MRs are labeled so that orphan cleanup can list them by label and delete any whose pool no longer exists in the shoot's worker list.

**Scaling:** Each per-pool MR secret contains only one DaemonSet + one ConfigMap, keeping it well under the Kubernetes 3 MiB secret size limit regardless of how many worker pools exist.

## Formula-based resource sizing (`pkg/adaptiveresources`)

Resource requests and limits on the Falco container accept either plain Kubernetes quantities (`"500m"`, `"2Gi"`) or arithmetic expressions evaluated against the machine type's capacity from the cloud profile.

### Evaluation

1. `formula.Compile(r *FalcoResources)` — parses each field. Plain quantities are stored verbatim; expressions are compiled with `expr-lang/expr` using `expr.Env(NodeEnv{})` and `expr.AsFloat64()`. Variable references are validated at compile time.
1. `compiled.Eval(env NodeEnv)` — runs each compiled program against the pool's node capacity. CPU results are formatted as millicores (`500` → `"500m"`); memory as MiB (`512` → `"512Mi"`).

### Node variables

| Variable | Value |
| --- | --- |
| `NodeCPU` | CPU cores (float64) |
| `NodeMemoryMi` | RAM in MiB |
| `NodeMemoryGi` | RAM in GiB |
| `NodeEphemeralGi` | Ephemeral storage in GiB (0 if not in cloud profile) |

Values are sourced from `CloudProfile.spec.machineTypes` — not from live node metrics.

### Admission validation

The shoot validator (`pkg/admission/validator/shoot_validator.go`) validates resource fields at admission time:

- Plain quantities are range-checked (positive, within sanity bounds, request ≤ limit).
- Non-quantity strings are compiled with `formula.CompileExpression` — syntax errors and unknown variable references are rejected immediately rather than failing at reconcile time.

### Per-pool overrides

`FalcoConfig.WorkerPoolResources` allows individual pools to override the default `FalcoConfig.Resources` block. The actuator checks for a pool-specific entry before falling back to the global resources.

## Certificate management (`pkg/secrets`)

Falco communicates with falcosidekick over mTLS. The extension generates its own CA and leaf certificates and stores them in secrets in the seed namespace. The lifecycle controller checks whether certificates need renewal or regeneration on each reconcile.

## Health checks (`pkg/controller/healthcheck`)

The extension registers two health check conditions:

- **`ObservabilityComponentsHealthy`**: checks the seed ManagedResource (`extension-shoot-falco-service-seed`).
- **`SystemComponentsHealthy`**: custom check (`falcohealth.customFalcoHealthCheck`):
  1. Lists all pods with `app.kubernetes.io/name=falco` in `kube-system`. If any has a detectable config error (ConfigMap mount failure, rule YAML parse error in logs), returns `False` with `ErrorConfigurationProblem`.
  1. If pods are found and healthy, returns `True`.
  1. If no pods are scheduled (all pools at zero nodes, taints, etc.) — falls back to checking the shared ManagedResource `extension-shoot-falco-service-shoot`. Healthy MR means the extension reconciled successfully; absence of pods is not itself an error.
  
  Only the shared MR is checked in the fallback (not all N per-pool MRs). If the shared MR is healthy the reconcile loop completed; per-pool MR failures would surface as pod health issues or as Gardener resource manager conditions independently.

## Falco profile (`pkg/profile`)

The `FalcoProfileManager` maintains the set of available Falco versions, their support classification (`supported`, `deprecated`), and expiration dates. It is populated from a `FalcoProfile` custom resource in the garden cluster and refreshed periodically. The validator uses it to check that the requested Falco version is valid and not expired.

## Maintenance controller (`pkg/controller/maintenance`)

The maintenance controller runs in the admission binary. It watches shoot objects and, when `autoUpdate: true` is set, updates the `falcoVersion` field to the latest supported version during the shoot's configured maintenance window.

## Downgrade note

The per-pool ManagedResource approach is a one-way migration. If this version is deployed and then rolled back to a version that does not know about per-pool MRs, the old version's reconcile will recreate the shared MR with a single `falco` DaemonSet but will not clean up the `extension-shoot-falco-service-pool-*` MRs left behind, resulting in duplicate DaemonSets. Manual cleanup of pool MRs is required after a downgrade.
