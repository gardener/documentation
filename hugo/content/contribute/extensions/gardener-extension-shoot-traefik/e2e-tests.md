---
github_repo: 'https://github.com/gardener/gardener-extension-shoot-traefik'
github_subdir: docs/development
params:
  github_branch: main
path_base_for_github_subdir:
  from: content/contribute/extensions/gardener-extension-shoot-traefik/e2e-tests.md
  to: e2e-tests.md
persona: Developers
title: E2e Tests
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
   https://github.com/gardener/gardener-extension-shoot-traefik/blob/main/docs/development/e2e-tests.md
-->


# End-to-End Tests

The e2e tests in `test/e2e/` deploy two real Shoot clusters against a Gardener landscape and validate that the traefik extension works correctly for both ingress providers:

- `KubernetesIngress` — Traefik as ingress controller (ingress class `traefik`)
- `KubernetesIngressNGINX` — NGINX as ingress controller (ingress class `nginx`)

Each test creates a Shoot, deploys a [`traefik/whoami`](https://hub.docker.com/r/traefik/whoami) workload, creates an Ingress, and validates HTTP connectivity through the load balancer.

## Prerequisites

- A running [Gardener](https://gardener.cloud/) landscape (virtual garden API server)
- A Project namespace with a valid `CredentialsBinding` pointing to a cloud provider account
- `KUBECONFIG` pointing to the **virtual garden** API server (not a shoot kubeconfig)
- `go` 1.24+ and `make`

## Running Locally

### Minimal invocation (local provider)

```sh
export KUBECONFIG=/path/to/virtual-garden/kubeconfig
make test-e2e
```

### AWS example

The following command mirrors the setup used in CI:

```sh
export KUBECONFIG=~/go/src/github.com/gardener/gardener/dev-setup/kubeconfigs/virtual-garden/kubeconfig
export PROJECT_NAMESPACE=garden
export CLOUD_PROFILE_NAME=aws
export PROVIDER_TYPE=aws
export REGION=eu-central-1
export CREDENTIALS_BINDING=aws
export WORKER_MACHINE_TYPE=m5.large
export WORKER_ZONE=eu-central-1a
export WORKER_VOLUME_SIZE=50Gi
export WORKER_VOLUME_TYPE=gp3
export NODES_CIDR=10.250.0.0/16
export SHOOT_BASE_NAME=traefik-e2e-$(whoami | cut -c1-4)
make test-e2e
```

> **Note**: `SHOOT_BASE_NAME` is automatically truncated so that
> `len(projectName) + len(shootName) <= 21` (Gardener's hard limit). Using
> `$(whoami | cut -c1-4)` helps avoid name collisions when multiple developers
> run tests on the same landscape simultaneously.

### Running a single test context

Use Ginkgo's `--label-filter` or `--focus` flag via `go test`:

```sh
# Only the KubernetesIngress context
go test -v -timeout 120m -count=1 ./test/e2e/... \
  --ginkgo.focus "KubernetesIngress provider"

# Only the KubernetesIngressNGINX context
go test -v -timeout 120m -count=1 ./test/e2e/... \
  --ginkgo.focus "KubernetesIngressNGINX provider"
```

## Environment Variable Reference

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `KUBECONFIG` | **Yes** | — | Path to the virtual garden kubeconfig |
| `PROJECT_NAMESPACE` | No | `garden-local` | Gardener project namespace (e.g. `garden-myproject`) |
| `CLOUD_PROFILE_NAME` | No | `local` | Cloud profile name in Gardener |
| `CLOUD_PROFILE_KIND` | No | `CloudProfile` | Kind of the cloud profile (`CloudProfile` or `NamespacedCloudProfile`) |
| `CREDENTIALS_BINDING` | No | `local` | Name of the `CredentialsBinding` object in the project |
| `PROVIDER_TYPE` | No | `local` | Infrastructure provider type (e.g. `aws`, `azure`, `gcp`) |
| `REGION` | No | `local` | Cloud region for the shoot (e.g. `eu-central-1`) |
| `NETWORKING_TYPE` | No | `calico` | CNI plugin (`calico`, `cilium`, etc.) |
| `WORKER_MACHINE_TYPE` | No | `local` | Machine type for worker nodes (e.g. `m5.large`) |
| `WORKER_CRI_NAME` | No | `containerd` | Container runtime (`containerd`) |
| `KUBERNETES_VERSION` | No | — | Kubernetes version; omit to use cloud profile default |
| `NODES_CIDR` | No | `10.0.0.0/16` | CIDR for worker nodes |
| `SHOOT_BASE_NAME` | No | `traefik-e2e` | Base name for test shoots (auto-truncated) |
| `SHOOT_DOMAIN` | No | — | DNS domain suffix; shoot FQDN becomes `<name>.<domain>` |
| `WORKER_VOLUME_SIZE` | No | — | Root volume size (e.g. `50Gi`); omit to use provider default |
| `WORKER_VOLUME_TYPE` | No | — | Root volume type (e.g. `gp3`); omit to use provider default |
| **AWS-specific** |  |  |  |
| `WORKER_ZONE` | No | — | Availability zone for `InfrastructureConfig` subnet layout (e.g. `eu-central-1a`) |
| `WORKER_SPEC_ZONES` | No | — | Comma-separated zones for the worker spec; falls back to `WORKER_ZONE` |
| `VPC_CIDR` | No | `NODES_CIDR` | VPC CIDR for `InfrastructureConfig`; defaults to `NODES_CIDR` |
| `WORKER_ZONE_WORKERS_CIDR` | No | `10.250.0.0/19` | Subnet CIDR for worker nodes in the zone |
| `WORKER_ZONE_PUBLIC_CIDR` | No | `10.250.96.0/22` | Subnet CIDR for public traffic in the zone |
| `WORKER_ZONE_INTERNAL_CIDR` | No | `10.250.112.0/22` | Subnet CIDR for internal traffic in the zone |
| **Advanced overrides** |  |  |  |
| `INFRASTRUCTURE_CONFIG` | No | — | Raw JSON `InfrastructureConfig`; overrides auto-generation |
| `WORKERS_CONFIG` | No | — | Raw JSON `ProviderConfig` for the worker; provider-specific |

## Required Permissions

The user bound to the `KUBECONFIG` must have the following permissions in the project namespace:

| Resource | Verbs |
| --- | --- |
| `shoots` | `create`, `get`, `list`, `watch`, `patch`, `delete` |
| `shoots/adminkubeconfig` | `create` |

The `adminkubeconfig` subresource is used to fetch a short-lived admin kubeconfig for the created shoot clusters without relying on the legacy `<shoot>.kubeconfig` Secret.

A typical Gardener `Project` membership with the `admin` role grants all of the above.

## GitHub Actions

The workflow in `.github/workflows/e2e-tests.yaml` runs on:

- Every pull request against the repository (only when `E2E_KUBECONFIG_BASE64` is configured)
- Every release (called from `.github/workflows/release.yaml`)
- Manual trigger via `workflow_dispatch`

### Configuring secrets and variables

In the GitHub repository settings, add the following:

| Type | Name | Value |
| --- | --- | --- |
| Secret | `E2E_KUBECONFIG_BASE64` | `base64 -i /path/to/virtual-garden/kubeconfig` |
| Variable | `E2E_PROJECT_NAMESPACE` | e.g. `garden-myproject` |
| Variable | `E2E_CLOUD_PROFILE_NAME` | e.g. `aws` |
| Variable | `E2E_CLOUD_PROFILE_KIND` | `CloudProfile` |
| Variable | `E2E_CREDENTIALS_BINDING` | e.g. `core-e2e-aws` |
| Variable | `E2E_PROVIDER_TYPE` | e.g. `aws` |
| Variable | `E2E_REGION` | e.g. `eu-central-1` |
| Variable | `E2E_NETWORKING_TYPE` | e.g. `calico` |
| Variable | `E2E_WORKER_MACHINE_TYPE` | e.g. `m5.large` |
| Variable | `E2E_WORKER_CRI_NAME` | `containerd` |
| Variable | `E2E_NODES_CIDR` | e.g. `10.250.0.0/16` |

Any variable that is not set falls back to the default value shown in the [environment variable reference](#environment-variable-reference) above.

When `E2E_KUBECONFIG_BASE64` is absent (e.g. on forks), the workflow skips the e2e steps without failing.

## Prow

A `.prow.yaml` is provided for use with [Gardener's Prow](https://prow.gardener.cloud/) instance:

- **Presubmit** (`e2e-traefik-extension`): optional, not always run. Triggered manually or via `/test e2e-traefik-extension` in a PR comment. Runs when code under `cmd/`, `pkg/`, `test/`, `charts/`, `go.mod`, `go.sum`, `Makefile`, or `Dockerfile` changes.
- **Periodic** (`e2e-traefik-extension-periodic`): runs every 24 hours on the `main` branch.

Credentials are injected automatically via the `preset-gardener-e2e-kubeconfig: "true"` label — no manual secret configuration is needed in Prow.

Update the `env` values in `.prow.yaml` to match your Prow landscape (project namespace, cloud profile, credentials binding, etc.) before enabling the jobs.
