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

## What gets installed in the shoot

When the extension reconciles a shoot, it creates a `ManagedResource` in the
shoot's control-plane namespace on the seed. The contents of the
`ManagedResource` are applied into the shoot cluster:

1. ServiceAccount, ClusterRole, ClusterRoleBinding, leader-election Role and
   RoleBinding for the Envoy Gateway controller (in `kube-system`).
1. The Envoy Gateway control-plane `Deployment` and `Service` (in
   `kube-system`).
1. A `PodDisruptionBudget` and `NetworkPolicy` objects for the control plane
   and the data-plane proxies.
1. A single `GatewayClass` named `gardener-envoy-gateway` bound to the
   controller `gateway.envoyproxy.io/gatewayclass-controller`, plus a default
   `EnvoyProxy` template it references.
1. Standard-channel Gateway API CRDs (and the experimental channel when
   `channel: experimental`), unless `manageCRDs: false`.
1. Envoy Gateway's own CRDs (`EnvoyProxy`, `BackendTrafficPolicy`,
   `ClientTrafficPolicy`, `SecurityPolicy`, etc.) which power
   implementation-specific configuration, unless `manageCRDs: false`.

The Envoy Gateway control plane spawns one Envoy data-plane Deployment +
LoadBalancer Service per user-created `Gateway`, in `kube-system`. The
cloud-provider load-balancer controller provisions the underlying LB for each
Service.

## Validation

The admission webhook validates the following on every Shoot create/update:

1. `spec.purpose` must be `evaluation` when the extension is enabled.
1. `providerConfig`, if supplied, must decode strictly as an
   `EnvoyGatewayConfig` (unknown fields are rejected).
1. `controlPlane.logLevel` and `dataPlane.logLevel`, if set, must be one of
   `debug`, `info`, `warn`, `error`.
1. `channel`, if set, must be one of `standard`, `experimental`.
