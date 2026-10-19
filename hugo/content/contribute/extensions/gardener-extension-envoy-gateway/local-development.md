---
github_repo: 'https://github.com/gardener/gardener-extension-envoy-gateway'
github_subdir: docs/development
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/contribute/extensions/gardener-extension-envoy-gateway/local-development.md
  to: local-development.md
persona: Developers
title: Local Development
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
   https://github.com/gardener/gardener-extension-envoy-gateway/blob/main/docs/development/local-development.md
-->


# Local development

This document covers building and testing the `envoy-gateway` extension
on a developer machine.

## Prerequisites

* Go 1.26 or newer.
* `helm` v4 — used by `make check-helm`.
* GNU Make.
* (Optional) `docker` — only required if you intend to build the container
  image with `make docker-build`.

## Build

```bash
make get          # download and tidy Go modules
make build        # compile bin/extension-envoy-gateway
```

The resulting binary supports two subcommands:

```bash
bin/extension-envoy-gateway manager   # runs the controller manager
bin/extension-envoy-gateway webhook   # runs the admission webhook
```

## Tests

```bash
make test         # runs unit tests (race-enabled) under envtest
```

## Lint

```bash
make lint         # runs golangci-lint via the internal/tools toolchain
```

## Helm chart checks

```bash
make check-helm   # lints all three Helm charts and validates rendered manifests
```

## Refreshing the embedded CRDs

The Gateway API and Envoy Gateway CRDs are committed to the repository under
`pkg/envoygateway/assets/`. To refresh them after bumping the versions in
`hack/update-crds.sh`:

```bash
bash hack/update-crds.sh
```

The script downloads the upstream YAML manifests and renders the Envoy
Gateway Helm chart, then writes the result under `pkg/envoygateway/assets/`.
Commit the resulting files so the build stays reproducible offline.

## Versioning

The image tag of the Envoy Gateway control plane is pinned in
`imagevector/images.yaml`. Update the file, then refresh the embedded CRDs
to match.

## Bumping Envoy Gateway

Whenever the pinned Envoy Gateway or Gateway API release changes, run
through this checklist. It codifies the drift-catching steps that a naïve
version bump misses (RBAC in particular — the hand-authored
`ClusterRole` in `pkg/envoygateway/deployer.go` is not derived from the
upstream chart and must be reconciled by hand).

1. **Bump the version pins.**
   * `GATEWAY_API_VERSION` and `ENVOY_GATEWAY_VERSION` in
     `hack/update-crds.sh`.
   * `tag:` in `imagevector/images.yaml`.
   * The version rows in `README.md` (Envoy Gateway / Gateway API versions
     and the compatibility matrix).

1. **Refresh the embedded CRDs.**
   ```bash
   bash hack/update-crds.sh
   ```

1. **Reconcile the ClusterRole against upstream.** The upstream Envoy
   Gateway helm chart defines its own `ClusterRole`; ours is a rewritten
   copy. Compare and add anything missing:
   ```bash
   helm template envoy-gateway oci://docker.io/envoyproxy/gateway-helm \
     --version "${ENVOY_GATEWAY_VERSION}" \
     --namespace kube-system \
     | yq eval-all 'select(.kind == "ClusterRole")' -
   ```
   Common drift after a release: new Gateway API resources like
   `listenersets`, new Envoy Gateway policy CRDs (`SecurityPolicy`,
   `BackendTrafficPolicy`, …). Any `list/watch` verb missing from the Go
   `clusterRole()` will manifest as `Failed to watch […] is forbidden`
   errors in the Envoy Gateway control-plane logs — see
   [usage/troubleshooting.md](/docs/extensions/others/gardener-extension-envoy-gateway/troubleshooting/#envoy-gateway-pod-is-crashloopbackoff-or-spamming-failed-to-watch).

1. **Run the local checks.**
   ```bash
   make test check-helm lint
   ```

1. **Deploy against a local Gardener** (kind/dev landscape) and smoke-test:
   * `GatewayClass envoy-gateway` reaches `Accepted=True`.
   * A demo `Gateway` reaches `Programmed=True`.
   * An `HTTPRoute` routes traffic through the LB (the flow described in
     [usage/getting-started.md](/docs/extensions/others/gardener-extension-envoy-gateway/getting-started/)).

1. **Update the compatibility matrix** in `README.md` if the Envoy
   Proxy or supported Kubernetes range shifted (per the upstream
   [compatibility matrix](https://gateway.envoyproxy.io/news/releases/matrix/)).

1. **Commit** the version bump, the refreshed CRD assets, the RBAC
   updates, and the README diff as one changeset. Reviewers should be
   able to see everything the bump touched in one place.
