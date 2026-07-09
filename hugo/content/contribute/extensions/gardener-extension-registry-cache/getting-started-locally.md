---
description: Learn how to set up a local development environment
github_repo: 'https://github.com/gardener/gardener-extension-registry-cache'
github_subdir: docs/development
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/contribute/extensions/gardener-extension-registry-cache/getting-started-locally.md
  to: getting-started-locally.md
persona: Developers
title: Deploying Registry Cache Extension Locally
prev: false
next: false
managed: true
---

# Deploying Registry Cache Extension Locally

## Prerequisites

- Make sure that you have a running local Gardener setup. The steps to complete this can be found in the [Deploying Gardener Locally guide](/contribute/developer-starter-kit/getting_started_locally/).

> [!TIP]
> Ensure that the locally used Gardener version matches the version specified by the `github.com/gardener/gardener` dependency.
> The extension’s local setup must run successfully against a local Gardener setup at the version referenced by this dependency, as verified by end-to-end tests.

> [!NOTE]
> The location of the Gardener project is expected to be under the same root (e.g. `~/go/src/github.com/gardener/`). If this is not the case, the location of Gardener project should be specified in `GARDENER_REPO_ROOT` environment variable:
> ```bash
> export GARDENER_REPO_ROOT="<path_to_gardener_project>"
> ```

## Setting up the Registry Cache Extension

```bash
make extension-up
```

The corresponding make target will build the registry-cache admission and extension container images, OCI artifacts for the admission runtime and application charts, and the extension chart. Then, the container images and the OCI artifacts are pushed into the default skaffold registry (i.e. `registry.local.gardener.cloud:5001`). Next, the registry-cache `Extension.operator.gardener.cloud` resource is deployed into the KinD cluster. Based on this resource the gardener-operator will deploy the registry-cache admission component, as well as the registry-cache ControllerDeployment and ControllerRegistration resources.

## Creating a Shoot Cluster

> [!NOTE]
> Make sure that your `KUBECONFIG` environment variable is targeting the virtual Garden cluster (i.e. `<path_to_gardener_project>/dev-setup/kubeconfigs/virtual-garden/kubeconfig`).

Once the above step is completed, you can create a Shoot cluster.

[`example/shoot-registry-cache.yaml`](https://github.com/gardener/gardener-extension-registry-cache/blob/main/example/shoot-registry-cache.yaml) contains a Shoot specification with the `registry-cache` extension:
```bash
kubectl create -f example/shoot-registry-cache.yaml
```

[`example/shoot-registry-mirror.yaml`](https://github.com/gardener/gardener-extension-registry-cache/blob/main/example/shoot-registry-mirror.yaml) contains a Shoot specification with the `registry-mirror` extension:
```bash
kubectl create -f example/shoot-registry-mirror.yaml
```

## Tearing Down the Development Environment

To tear down the development environment, delete the Shoot cluster or disable the `registry-cache` extension in the Shoot's specification. When the extension is not used by the Shoot anymore, you can run:

```bash
make extension-down
```

The corresponding make target will delete the `Extension.operator.gardener.cloud` resource. Consequently, the gardener-operator will delete the registry-cache admission component and registry-cache ControllerDeployment and ControllerRegistration resources.
