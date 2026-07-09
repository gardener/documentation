---
aliases:
  - /blog/2026/05/21/gind-gardener-in-docker-for-local-development
authors:
  - avatar: 'https://avatars.githubusercontent.com/timebertt'
    email: timebertt@gmail.com
    login: timebertt
    name: Tim Ebert
github_repo: 'https://github.com/gardener/documentation'
github_subdir: hugo/content/blog/2026/05
linkTitle: 'GinD: Gardener-in-Docker for Local Development'
newsSubtitle: 'May 21, 2026'
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/blog/2026/05/05-21-gind-gardener-in-docker-for-local-development.md
  to: 05-21-gind-gardener-in-docker-for-local-development.md
publishdate: '2026-05-21'
tags:
  - feature-announcement
title: 'GinD: Gardener-in-Docker for Local Development'
local: true
---

# GinD: Gardener-in-Docker for Local Development

With Gardener v1.142, we introduce **GinD** (Gardener-in-Docker) — a Docker Compose-based local development setup for self-hosted shoots with unmanaged infrastructure. Instead of running machine pods inside a KinD cluster, GinD runs Docker containers directly as machines, providing a more realistic "bare metal" experience while eliminating KinD overhead for this scenario.

## Why GinD?

As part of [GEP-28](https://github.com/gardener/gardener/issues/2906) (self-hosted shoot clusters), Gardener is building `gardenadm` — a tool analogous to `kubeadm` but for bootstrapping autonomous Gardener clusters. The previous local development setup used KinD to simulate machines, which added an unnecessary abstraction layer. GinD takes a more direct approach: Docker containers *are* the machines, and `gardenadm` bootstraps them — just like it would on real hardware.

The name follows the same pattern as KinD (Kubernetes-in-Docker): GinD is Gardener-in-Docker.

## Getting Started

A single command sets up the environment:

```bash
make gind-up
```

This starts four machine containers via Docker Compose along with a static Envoy TCP proxy for API server access from the host. By default, it runs `gardenadm init` to bootstrap the control plane on the first machine and exports the kubeconfig.

## Scenarios

A `SCENARIO` variable controls how far the provisioning goes:

| `SCENARIO` | Description |
| --- | --- |
| `machines` | Starts machine containers and installs `gardenadm`, but doesn't run it. Useful for developing `gardenadm` itself. |
| `default` | Starts machines and runs `gardenadm init`, exports the kubeconfig. |
| `join` | Like `default`, but also runs `gardenadm join` on a second machine as a worker node. |
| `connect` | Like `join`, but also deploys `gardener-operator`, creates a Garden, and runs `gardenadm connect` to register the shoot. |

For quick iteration, set `FAST=true` to skip steps like transitioning to etcd and redeploying extensions — useful when you just need a cluster up quickly.

## What's Next

The next step is promoting a self-hosted shoot to a managed seed — landing in an upcoming release. This will complete the full autonomous cluster lifecycle within the GinD setup, bringing the local development experience even closer to production topology.

Refer to the [updated documentation](/docs/gardener/deployment/getting_started_locally_with_gardenadm/) for full details on getting started.

## References

- [Review Meeting Recording (GinD section)](https://www.youtube.com/watch?v=WHITqFSYilc&t=1354)
- [gardener/gardener#14700](https://github.com/gardener/gardener/pull/14700)
