---
github_repo: 'https://github.com/gardener/gardener-extension-envoy-gateway'
github_subdir: docs/usage
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-envoy-gateway/deployment.md
  to: deployment.md
persona: Users
title: Deployment
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
   https://github.com/gardener/gardener-extension-envoy-gateway/blob/main/docs/usage/deployment.md
-->


# Deployment

This page describes how a Gardener operator registers the
`envoy-gateway` extension on a landscape so that shoot owners can
enable it on their shoots. End-user (shoot-level) configuration is covered
in [usage/configuration.md](/docs/extensions/others/gardener-extension-envoy-gateway/configuration/).

The extension supports two registration paths:

1. **`operator.gardener.cloud/v1alpha1.Extension`** — recommended for any
   landscape running [gardener-operator](https://gardener.cloud/docs/gardener/concepts/operator/).
   One manifest applied to the virtual garden cluster; the operator does the
   rest.
1. **Classic `ControllerDeployment` + `ControllerRegistration`** — for
   gardenlet-only landscapes. See
   [examples/dev-setup/](https://github.com/gardener/gardener-extension-envoy-gateway/tree/main/examples/dev-setup).

The rest of this page focuses on path 1.

## Prerequisites

* An OCI registry reachable from every seed and the garden runtime cluster.
* The controller image and the three Helm charts pushed to that registry —
  see the publish steps in [development/local-development.md](/contribute/extensions/gardener-extension-envoy-gateway/local-development/).
* `kubectl` access to the **virtual garden cluster** of the landscape.

You need URIs for four artefacts:

| Artefact | What it is |
| --- | --- |
| `<registry>/.../extensions/gardener-extension-envoy-gateway:<tag>` | The controller binary image |
| `<registry>/.../charts/.../gardener-extension-envoy-gateway:<tag>` | The seed-side controller Helm chart |
| `<registry>/.../charts/.../admission-envoy-gateway-runtime:<tag>` | The garden-runtime admission Helm chart |
| `<registry>/.../charts/.../admission-envoy-gateway-application:<tag>` | The virtual-garden admission Helm chart (ValidatingWebhookConfiguration, RBAC) |

## The `Extension` resource

Apply this manifest to the virtual garden cluster. Replace the four refs and
the image tag with your published artefacts.

```yaml
apiVersion: operator.gardener.cloud/v1alpha1
kind: Extension
metadata:
  name: gardener-extension-envoy-gateway
  annotations:
    security.gardener.cloud/pod-security-enforce: baseline
spec:
  deployment:
    admission:
      runtimeCluster:
        helm:
          ociRepository:
            ref: <registry>/charts/admission-envoy-gateway-runtime:<tag>
      virtualCluster:
        helm:
          ociRepository:
            ref: <registry>/charts/admission-envoy-gateway-application:<tag>
      values:
        image:
          repository: <registry>/gardener-extension-envoy-gateway
          tag: <tag>
    extension:
      helm:
        ociRepository:
          ref: <registry>/charts/gardener-extension-envoy-gateway:<tag>
      values:
        image:
          repository: <registry>/gardener-extension-envoy-gateway
          tag: <tag>
        replicaCount: 1
        resources:
          requests:
            cpu: 50m
            memory: 192Mi
        vpa:
          enabled: true
          resourcePolicy:
            minAllowed:
              memory: 128Mi
          updatePolicy:
            updateMode: Recreate
  resources:
    - kind: Extension
      type: envoy-gateway
      workerlessSupported: false
      clusterCompatibility:
        - shoot
      lifecycle:
        reconcile: AfterKubeAPIServer
        delete: BeforeKubeAPIServer
        migrate: AfterKubeAPIServer
```

A ready-to-edit copy lives at
[examples/operator-extension/base/extension.yaml](https://github.com/gardener/gardener-extension-envoy-gateway/blob/main/examples/operator-extension/base/extension.yaml).
Apply it with:

```bash
kubectl --context <virtual-garden> apply -f examples/operator-extension/base/extension.yaml
```

### Field reference

* **`spec.deployment.extension.helm`** — the seed-side controller chart.
  gardener-operator deploys it into every seed that gets a shoot enabling
  the extension.
* **`spec.deployment.admission.runtimeCluster.helm`** — the admission
  webhook Deployment chart. Runs in the garden **runtime** cluster (the
  cluster hosting gardener-operator).
* **`spec.deployment.admission.virtualCluster.helm`** — the
  `ValidatingWebhookConfiguration`, RBAC and ServiceAccount applied to the
  **virtual garden** cluster, pointing at the admission Deployment above.
* **`spec.deployment.admission.values`** — Helm values applied to **both**
  admission charts (runtime and virtual). The schema rejects `values` nested
  inside `runtimeCluster`/`virtualCluster`; it must live at the
  `admission`-level.
* **`spec.resources[0]`** — declares the `Extension` type the controller
  reconciles. Required keys:
  * `kind: Extension`
  * `type: envoy-gateway` — must match the actuator's `ExtensionType`.
  * `workerlessSupported: false` — Envoy Gateway is a workload running
    inside the shoot; workerless shoots have no nodes.
  * `clusterCompatibility: [shoot]` — currently only standard shoot clusters
    are supported. Workerless and autonomous shoots are not.
  * `lifecycle.reconcile: AfterKubeAPIServer` — the shoot API server must
    exist before the Envoy Gateway control plane can be applied via the
    `ManagedResource`.
  * `lifecycle.delete: BeforeKubeAPIServer` — the Envoy Gateway control
    plane must be removed before the shoot API server is torn down.
  * `lifecycle.migrate: AfterKubeAPIServer` — same ordering on control
    plane migration.

## Verification

After applying the Extension:

```bash
kubectl --context <virtual-garden> get extensions.operator.gardener.cloud \
  gardener-extension-envoy-gateway -o yaml
```

The status conditions should converge to `True`. If they don't, inspect the
gardener-operator logs in the runtime cluster.

gardener-operator generates a matching `ControllerRegistration` and
`ControllerDeployment` for you — you do not apply those manifests yourself
in this path.

## Enabling on a shoot

Once registered, shoot owners enable the extension in their Shoot manifest
as described in [usage/configuration.md](/docs/extensions/others/gardener-extension-envoy-gateway/configuration/). The admission
webhook deployed in step above will reject the request unless
`spec.purpose: evaluation` is set during the GEP-68 incubation phase.

## Updates

Updating image tags and chart versions is a simple `kubectl apply` of an
edited Extension manifest. gardener-operator rolls the change out to all
seeds and to the admission Deployment automatically.

## Removal

```bash
kubectl --context <virtual-garden> delete extensions.operator.gardener.cloud \
  gardener-extension-envoy-gateway
```

gardener-operator will refuse to delete the resource while any Shoot in the
landscape still references `envoy-gateway`. The actuator itself also
refuses to delete the extension from a live shoot while user-owned
`Gateway` objects exist — see the delete-guard note in
[usage/configuration.md](/docs/extensions/others/gardener-extension-envoy-gateway/configuration/).
