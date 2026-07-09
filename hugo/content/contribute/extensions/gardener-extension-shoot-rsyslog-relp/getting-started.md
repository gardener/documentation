---
github_repo: 'https://github.com/gardener/gardener-extension-shoot-rsyslog-relp'
github_subdir: docs/development
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/contribute/extensions/gardener-extension-shoot-rsyslog-relp/getting-started.md
  to: getting-started.md
persona: Developers
title: Getting Started
prev: false
next: false
managed: true
---

# Deploying Rsyslog Relp Extension Locally

This document will walk you through running the Rsyslog Relp extension and a fake rsyslog relp service on your local machine for development purposes. This guide uses Gardener's local development setup and builds on top of it.

If you encounter difficulties, please open an issue so that we can make this process easier.

## Prerequisites

- Make sure that you have a running local Gardener setup. The steps to complete this can be found [here](/contribute/developer-starter-kit/getting_started_locally/).
- Make sure you are running Gardener version `>= 1.135.1` or the latest version of the master branch.

> [!TIP]
> Ensure that the locally used Gardener version matches the version specified by the `github.com/gardener/gardener` dependency.
> The extension’s local setup must run successfully against a local Gardener setup at the version referenced by this dependency, as verified by end-to-end tests.

> [!NOTE]
> The location of the Gardener project is expected to be under the same root as this repository (for example `~/go/src/github.com/gardener/`). If this is not the case, set the location of the Gardener project in the `GARDENER_REPO_ROOT` environment variable:
> ```bash
> export GARDENER_REPO_ROOT="<path_to_gardener_project>"
> ```

## Setting up the Rsyslog Relp Extension

**Important:** Make sure that your `KUBECONFIG` environment variable is targeting the virtual Garden cluster (i.e. `<path_to_gardener_project>/dev-setup/kubeconfigs/virtual-garden/kubeconfig`).

```bash
make extension-up
```

This will build the `shoot-rsyslog-relp`, `shoot-rsyslog-relp-admission`, and `shoot-rsyslog-relp-echo-server` container images, OCI artifacts for the admission runtime and application charts, and the extension chart. Then, the container images and the OCI artifacts are pushed into the default skaffold registry (i.e. `registry.local.gardener.cloud:5001`). Next, the `shoot-rsyslog-relp` `Extension.operator.gardener.cloud` resource is deployed into the KinD cluster. Based on this resource the gardener-operator will deploy the `shoot-rsyslog-relp` admission component. The `shoot-rsyslog-relp-echo-server` will act as development replacement of a real rsyslog relp server.

## Creating a Shoot Cluster

Once the above step is completed, we can deploy and configure a Shoot cluster with default rsyslog relp settings.

```bash
kubectl apply -f ./example/shoot.yaml
```

Once the Shoot's namespace is created, we can create a `networkpolicy` that will allow egress traffic from the `rsyslog` on the Shoot's nodes to the `rsyslog-relp-echo-server` that serves as a fake rsyslog target server.

**Important:** Make sure that for all the following commands your `KUBECONFIG` environment variable is targeting the runtime Garden cluster (i.e. `<path_to_gardener_project>/dev-setup/kubeconfigs/runtime/kubeconfig`).

```bash
kubectl apply -f ./example/local/allow-machine-to-rsyslog-relp-echo-server-netpol.yaml
```

Currently, the Shoot's nodes run Ubuntu, which does not have the `rsyslog-relp` and `auditd` packages installed, so the configuration done by the extension has no effect.
Once the Shoot is created, we have to manually install the `rsyslog-relp` and `auditd` packages:

```bash
kubectl -n shoot--local--local exec -it $(kubectl -n shoot--local--local get po -l app=machine,machine-provider=local -o name) -- bash -c "
   apt-get update && \
   apt-get install -y rsyslog-relp auditd && \
   systemctl enable rsyslog.service && \
   systemctl start rsyslog.service"
```

Once that is done we can verify that log messages are forwarded to the `rsyslog-relp-echo-server` by checking its logs.

```bash
kubectl -n rsyslog-relp-echo-server logs deployment/rsyslog-relp-echo-server
```

## Making Changes to the Rsyslog Relp Extension

Changes to the rsyslog relp extension can be applied to the local environment by repeatedly running the `make` recipe.

```bash
make extension-up
```

## Tearing Down the Development Environment

To tear down the development environment, delete the Shoot cluster or disable the `shoot-rsyslog-relp` extension in the Shoot's spec. When the extension is not used by the Shoot anymore, you can run:

```bash
make extension-down
```

This will delete the locally deployed `Extension.operator.gardener.cloud` resource, the `shoot-rsyslog-relp-admission` deployment, and the `rsyslog-relp-echo-server` deployment.

# Maintaining the Publicly Available Image for the rsyslog-relp Echo Server

The [testmachinery tests](https://github.com/gardener/gardener-extension-shoot-rsyslog-relp/tree/main/test/testmachinery/shoot) use an `rsyslog-relp-echo-server` image from a publicly available repository. The one which is currently used is `eu.gcr.io/gardener-project/gardener/extensions/shoot-rsyslog-relp-echo-server:v0.1.0`.

Sometimes it might be necessary to update the image and publish it, e.g. when updating the `alpine` base image version specified in the repository's [Dokerfile](https://github.com/gardener/gardener-extension-shoot-rsyslog-relp/blob/main/Dockerfile#L34).

To do that:
1. Bump the version with which the image is built in the [Makefile](https://github.com/gardener/gardener-extension-shoot-rsyslog-relp/blob/main/Makefile#L17).
1. Build the `shoot-rsyslog-relp-echo-server` image:
   ```bash
   make echo-server-docker-image
   ```

1. Once the image is built, push it to `gcr` with:
   ```bash
   make push-echo-server-image
   ```

1. Finally, bump the version of the image used by the `testmachinery` tests [here](https://github.com/gardener/gardener-extension-shoot-rsyslog-relp/blob/main/test/testmachinery/shoot/common_test.go).
1. Create a PR with the changes.
