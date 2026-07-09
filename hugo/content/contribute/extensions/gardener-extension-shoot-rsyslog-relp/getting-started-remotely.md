---
description: >-
  Learn how to set up a development environment using own Seed clusters on an
  existing Kubernetes cluster
github_repo: 'https://github.com/gardener/gardener-extension-shoot-rsyslog-relp'
github_subdir: docs/development
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/contribute/extensions/gardener-extension-shoot-rsyslog-relp/getting-started-remotely.md
  to: getting-started-remotely.md
persona: Developers
title: Deploying Rsyslog Relp Extension Remotely
prev: false
next: false
managed: true
---

# Deploying Rsyslog Relp Extension Remotely

This document will walk you through running the Rsyslog Relp extension controller on a remote seed cluster and the rsyslog relp admission component in your local garden cluster for development purposes. This guide uses Gardener's [setup with provider extensions](/docs/gardener/deployment/getting_started_locally_with_extensions/) and builds on top of it.

If you encounter difficulties, please open an issue so that we can make this process easier.

## Prerequisites

- Make sure that you have a running Gardener setup with provider extensions. The steps to complete this can be found in the [Deploying Gardener Locally and Enabling Provider-Extensions](/docs/gardener/deployment/getting_started_locally_with_extensions/) guide.
- Make sure you are running Gardener version `>= 1.95.0` or the latest version of the master branch.

> [!TIP]
> Ensure that the locally used Gardener version matches the version specified by the `github.com/gardener/gardener` dependency.
> The extension’s local setup must run successfully against a local Gardener setup at the version referenced by this dependency.

## Setting up the Rsyslog Relp Extension

**Important:** Make sure that your `KUBECONFIG` env variable is targeting the local Gardener cluster!

The location of the Gardener project from the Gardener setup is expected to be under the same root as this repository (e.g. ~/go/src/github.com/gardener/). If this is not the case, the location of Gardener project should be specified in `GARDENER_REPO_ROOT` environment variable:

```bash
export GARDENER_REPO_ROOT="<path_to_gardener_project>"
```

Then you can run:

```bash
make remote-extension-up
```

In case you have added additional Seeds you can specify the seed name:

```bash
make remote-extension-up SEED_NAME=<seed-name>
```

## Creating a Shoot Cluster

Once the above step is completed, you can create a Shoot cluster. In order to create a Shoot cluster, please create your own `Shoot` definition depending on providers on your `Seed` cluster.

## Configuring the Shoot Cluster and deploying the Rsyslog Relp Echo Server

To be able to properly test the rsyslog relp extension you need a running rsyslog relp echo server to which logs from the Shoot nodes can be sent. To deploy the server and configure the rsyslog relp extension on your Shoot cluster you can run:

```bash
make configure-shoot SHOOT_NAME=<shoot-name> SHOOT_NAMESPACE=<shoot-namespace>
```

This command will deploy an rsyslog relp echo server in your Shoot cluster in the `rsyslog-relp-echo-server` namespace.
It will also add configuration for the `shoot-rsyslog-relp` extension to your `Shoot` spec by patching it with `./example/extension/<shoot-name>--<shoot-namespace>--extension-config-patch.yaml`. This file is automatically copied from `extension-config-patch.yaml.tmpl` in the same directory when you run `make configure-shoot` for the first time. The file also includes explanations of the properties you should set or change.
The command will also deploy the `rsyslog-relp-tls` secret in case you wish to enable tls.

## Tearing Down the Development Environment

To tear down the development environment, delete the Shoot cluster or disable the `shoot-rsyslog-relp` extension in the Shoot's specification. When the extension is not used by the Shoot anymore, you can run:

```bash
make remote-extension-down
```

The make target will delete the ControllerDeployment and ControllerRegistration of the extension, and the `shoot-rsyslog-relp` admission helm deployment.
