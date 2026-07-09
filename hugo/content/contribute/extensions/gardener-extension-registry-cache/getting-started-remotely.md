---
description: >-
  Learn how to set up a remote development environment using an existing
  Kubernetes cluster
github_repo: 'https://github.com/gardener/gardener-extension-registry-cache'
github_subdir: docs/development
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/contribute/extensions/gardener-extension-registry-cache/getting-started-remotely.md
  to: getting-started-remotely.md
persona: Developers
title: Deploying Registry Cache Extension in Gardener's Remote Setup
prev: false
next: false
managed: true
---

# Deploying Registry Cache Extension in Gardener's Remote Setup

## Prerequisites

- Make sure that you have a running Gardener remote setup. The steps to complete this can be found in the [Deploying Gardener Remotely](/docs/gardener/deployment/getting_started_remotely/) guide.

> [!TIP]
> Ensure that the locally used Gardener version matches the version specified by the `github.com/gardener/gardener` dependency.
> The extension’s remote setup must run successfully against a Gardener remote setup at the version referenced by this dependency.

> [!NOTE]
> The location of the Gardener project is expected to be under the same root (e.g. `~/go/src/github.com/gardener/`). If this is not the case, the location of Gardener project should be specified in `GARDENER_REPO_ROOT` environment variable:
> ```bash
> export GARDENER_REPO_ROOT="<path_to_gardener_project>"
> ```

## Setting up the Registry Cache Extension

```bash
make remote-extension-up
```

The corresponding make target will build the registry-cache admission and extension container images, OCI artifacts for the admission runtime and application charts, and the extension chart. Then, the container images and the OCI artifacts are pushed into the container registry in the remote Gardener cluster.
Next, the gardener-extension-registry-cache `Extension.operator.gardener.cloud` resource is deployed into the Gardener runtime cluster. Based on this resource the gardener-operator will deploy the registry-cache admission component in the Gardener runtime cluster, as well as the registry-cache ControllerDeployment and ControllerRegistration resources in the virtual Gardener cluster.

## Creating a Shoot Cluster

> [!NOTE]
> Make sure that your `KUBECONFIG` environment variable is targeting the virtual Garden cluster (i.e. `<path_to_gardener_project>/dev-setup/kubeconfigs/virtual-garden/kubeconfig`).

Once the above step is completed, you can create a Shoot cluster. In order to create a Shoot cluster, please create your own Shoot definition depending on providers on your Seed cluster.

## Tearing Down the Development Environment

To tear down the development environment, delete the Shoot cluster or disable the `registry-cache` extension in the Shoot's specification. When the extension is not used by the Shoot anymore, you can run:

```bash
make remote-extension-down
```

The corresponding make target will delete the `Extension.operator.gardener.cloud` resource. Consequently, the gardener-operator will delete the registry-cache admission component and registry-cache ControllerDeployment and ControllerRegistration resources.
