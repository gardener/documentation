---
description: Developer documentation for the Envoy Gateway extension
github_repo: 'https://github.com/gardener/gardener-extension-envoy-gateway'
github_subdir: .
params:
  github_branch: main
path_base_for_github_subdir:
  from: content/contribute/extensions/gardener-extension-envoy-gateway/_index.md
  to: README.md
title: Envoy Gateway
weight: 40
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
   https://github.com/gardener/gardener-extension-envoy-gateway/blob/main/./README.md
-->


# Gardener Extension for Envoy Gateway

[![REUSE status](https://api.reuse.software/badge/github.com/gardener/gardener-extension-envoy-gateway)](https://api.reuse.software/info/github.com/gardener/gardener-extension-envoy-gateway)
[![Build](https://github.com/gardener/gardener-extension-envoy-gateway/actions/workflows/build-and-test.yaml/badge.svg)](https://github.com/gardener/gardener-extension-envoy-gateway/actions/workflows/build-and-test.yaml)

This extension implements [GEP-68](https://github.com/gardener/enhancements/pull/69). It ships
[Envoy Gateway](https://gateway.envoyproxy.io/) as the
[Gateway API](https://gateway-api.sigs.k8s.io/) implementation in Gardener shoot clusters,
alongside the standard-channel Gateway API CRDs and a single `GatewayClass` named
`gardener-envoy-gateway`.

It is the sibling of [gardener-extension-shoot-traefik](https://github.com/gardener/gardener-extension-shoot-traefik)
(GEP-57). Both extensions are intentionally disjoint and can run side by side in the same
shoot (though running both is generally not recommended in production).

## Features

* Installs the standard-channel Gateway API CRDs (`gateway.networking.k8s.io/v1`) in
  the shoot — `GatewayClass`, `Gateway`, `HTTPRoute`, `GRPCRoute`, `ReferenceGrant`.
* Optionally installs the experimental-channel CRDs (`TCPRoute`, `TLSRoute`, `UDPRoute`,
  `BackendTLSPolicy`) when `channel: experimental`.
* Installs the Envoy Gateway control plane (Deployment, Service, RBAC) in the
  `kube-system` namespace.
* Registers a `GatewayClass` named `gardener-envoy-gateway` bound to controller
  `gateway.envoyproxy.io/gatewayclass-controller`.
* Admission webhook restricts the extension to shoots with `purpose: evaluation`.
* All shoot resources are delivered via a `ManagedResource` so updates and deletes are
  idempotent.

## Usage

Enable the extension in a Shoot:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
  name: my-shoot
  namespace: garden-my-project
spec:
  purpose: evaluation
  extensions:
  - type: envoy-gateway
    providerConfig:
      apiVersion: envoy-gateway.extensions.gardener.cloud/v1alpha1
      kind: EnvoyGatewayConfig
      controlPlane:
        logLevel: info            # debug|info|warn|error (default: info)
      channel: standard           # standard|experimental (default: standard)
```

See [docs/usage/getting-started.md](/docs/extensions/others/gardener-extension-envoy-gateway/getting-started/) for a
full end-to-end walk-through (enable extension → `Gateway` → `HTTPRoute` →
`curl`), [docs/usage/configuration.md](/docs/extensions/others/gardener-extension-envoy-gateway/configuration/) for the
full field reference, and [examples/shoot.yaml](https://github.com/gardener/gardener-extension-envoy-gateway/blob/main/examples/shoot.yaml) for a
complete sample. When something doesn't work, see
[docs/usage/troubleshooting.md](/docs/extensions/others/gardener-extension-envoy-gateway/troubleshooting/).

## Deployment (operators)

Gardener operators register the extension on a landscape by applying an
`operator.gardener.cloud/v1alpha1.Extension` resource to the virtual garden
cluster. The full manifest, field reference, and rollout/removal procedure
are in [docs/usage/deployment.md](/docs/extensions/others/gardener-extension-envoy-gateway/deployment/). A ready-to-edit
copy lives at
[examples/operator-extension/base/extension.yaml](https://github.com/gardener/gardener-extension-envoy-gateway/blob/main/examples/operator-extension/base/extension.yaml).

## Requirements

* Go 1.26 or newer
* Make
* Docker (only required for `make docker-build`)
* For local development against a Gardener landscape: a working Gardener local KinD setup

## Versions shipped

| Component | Version |
| --- | --- |
| Envoy Gateway | v1.8.3 |
| Gateway API CRDs | v1.5.1 |

The CRD YAML manifests are downloaded once and embedded under
`pkg/envoygateway/assets/`. Refresh them with `hack/update-crds.sh` after bumping
versions in the script.

### Compatibility matrix

The Envoy Gateway minor release shipped by this extension determines the
compiled-in Envoy Proxy and Gateway API versions as well as the supported
Kubernetes range. The row in **bold** is the version currently shipped. See the
upstream [compatibility matrix](https://gateway.envoyproxy.io/news/releases/matrix/)
for the authoritative list.

| Envoy Gateway | Envoy Proxy | Gateway API | Kubernetes |
| --- | --- | --- | --- |
| **v1.8** | **v1.38.0** | **v1.5.1** | **v1.32 – v1.35** |
| v1.7 | v1.37.0 | v1.4.1 | v1.32 – v1.35 |
| v1.6 | v1.36.4 | v1.4.0 | v1.30 – v1.33 |
| v1.5 | v1.35.0 | v1.3.0 | v1.30 – v1.33 |

## Admission controller

The admission webhook is shipped as the same binary using the `webhook` subcommand and
deployed via the `gardener-extension-admission-envoy-gateway` Helm chart, which
splits into two subcharts:

* `runtime` — the admission webhook Deployment, Service, RBAC, PDB, optional VPA in
  the garden runtime cluster
* `application` — the cluster-scoped `ValidatingWebhookConfiguration`, ServiceAccount,
  and RBAC applied to the virtual garden cluster

## Development

```bash
make get          # download Go modules
make build        # build the extension binary into bin/
make test         # run unit tests under envtest
make check-helm   # lint Helm charts
make lint         # run golangci-lint
```

## Contributing

See [CONTRIBUTING.md](https://github.com/gardener/gardener-extension-envoy-gateway/blob/main/CONTRIBUTING.md).

## License

Apache 2.0. See [LICENSE](https://github.com/gardener/gardener-extension-envoy-gateway/blob/main/LICENSE).
