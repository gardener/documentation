---
aliases:
  - /blog/2026/05/21/farewell-gardenercontrolplane-helm-chart
authors:
  - avatar: 'https://avatars.githubusercontent.com/oliver-goetz'
    login: oliver-goetz
    name: Oliver Götz
github_repo: 'https://github.com/gardener/documentation'
github_subdir: hugo/content/blog/2026/05
linkTitle: 'Farewell, gardener/controlplane Helm Chart'
newsSubtitle: 'May 21, 2026'
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/blog/2026/05/05-21-farewell-gardenercontrolplane-helm-chart.md
  to: 05-21-farewell-gardenercontrolplane-helm-chart.md
publishdate: '2026-05-21'
tags:
  - milestone
title: 'Farewell, gardener/controlplane Helm Chart'
local: true
---

# Farewell, gardener/controlplane Helm Chart

With Gardener v1.142, the deprecated `gardener/controlplane` Helm chart has been removed. All local development scenarios and e2e tests now run exclusively on `gardener-operator` — the canonical way to deploy Gardener. This marks the end of a migration journey that began over a year ago.

## gardener-operator Is the Way Forward

The [`gardener-operator`](/docs/gardener/concepts/operator/) is the single supported method for deploying and managing Gardener landscapes. It reconciles a [`Garden` resource](/docs/gardener/deployment/setup_gardener/), creating and managing the virtual garden cluster with its `etcd`, `kube-apiserver`, `gardener-apiserver`, and all other required components. If you haven't migrated yet, now is the time — the legacy Helm chart no longer exists.

## What Changed for Local Development

The removal also brings a cleaner local development experience:

- **New `dev-setup/` directory** — all development-related configuration (Skaffold files, scripts, configs) is consolidated in a single `dev-setup/` folder, replacing files previously scattered across the repository.
- **Kustomize replaces Helm** — the local setup uses Kustomize with a base/components/overlay pattern. Each scenario (single-node, multi-node, multi-zone) is an overlay that composes a base configuration with scenario-specific patches.
- **Unified kubeconfig directory** — all kubeconfigs live in `dev-setup/kubeconfigs/` with subdirectories for each cluster type (`runtime`, `seed`, `virtual-garden`).
- **Simplified Make targets** — `make kind-up` is now an alias for `make kind-single-node-up`, and the former `make operator-seed-{up,dev,down}` targets are renamed to `make gardener-{up,dev,down}`.
- **Merged kubeconfig script** — `generate-admin-kubeconfig-local.sh` is merged into `generate-kubeconfig.sh` with subcommands (`shoot`, `virtual-garden`, `self-hosted-shoot`).

## The Experience Stays Familiar

Despite the restructuring, the top-level workflow remains the same:

```bash
make kind-up       # Start KinD cluster (picks your scenario)
make gardener-up   # Deploy Gardener via gardener-operator
```

The scenario is now selected at `kind-up` time and automatically detected by subsequent commands — no more switching between incompatible `make` targets mid-session.

## Breaking Changes for Developers

If you maintain an existing local development setup or CI scripts:

- Replace `make operator-seed-{up,dev,down}` with `make gardener-{up,dev,down}`
- Update references to `./hack/usage/generate-admin-kubeconfig-local.sh` → use `./hack/usage/generate-kubeconfig.sh --help`
- For the remote setup, the seed kubeconfig moved from `dev-setup/remote/kubeconfigs/kubeconfig` to `dev-setup/kubeconfigs/remote/kubeconfig`

## References

- [Review Meeting Recording (Helm chart removal section)](https://www.youtube.com/watch?v=WHITqFSYilc&t=349)
- [gardener/gardener#14614](https://github.com/gardener/gardener/pull/14614)
- [Getting Started Locally](/contribute/developer-starter-kit/getting_started_locally/)
- [How to Set Up a Gardener Landscape](/docs/gardener/deployment/setup_gardener/)
