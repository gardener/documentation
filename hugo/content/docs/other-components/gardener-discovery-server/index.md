---
description: A server which provides public metadata for Gardener resources
github_repo: 'https://github.com/gardener/gardener-discovery-server'
github_subdir: .
params:
  github_branch: main
path_base_for_github_subdir:
  from: content/docs/other-components/gardener-discovery-server/_index.md
  to: README.md
title: Gardener Discovery Server
prev: false
next: false
managed: true
---

# Gardener Discovery Server

[![REUSE status](https://api.reuse.software/badge/github.com/gardener/gardener-discovery-server)](https://api.reuse.software/info/github.com/gardener/gardener-discovery-server)

A server capable of serving public metadata about different Gardener resources like shoot OIDC discovery documents and Gardener Workload Identity discovery.

## Development

As a prerequisite you need to have a Garden cluster up and running. The easiest way to get started is to follow the [Getting Started Locally Guide](https://github.com/gardener/gardener/blob/master/docs/development/getting_started_locally.md) which explains how to setup Gardener for local development.

Once the Garden cluster is up and running, export the `kubeconfig` pointing to the cluster as an environment variable.

```bash
export KUBECONFIG=/path-to/garden-kubeconfig
```

You should be able to start the discovery server with the following command.

```bash
make start
```

Alternatively you can deploy the discovery server in the local cluster with the following command.

```bash
make server-up
```
