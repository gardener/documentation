---
github_repo: 'https://github.com/gardener/etcd-druid'
github_subdir: docs/development
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/contribute/other-components/etcd-druid/getting-started-locally.md
  to: getting-started-locally.md
persona: Developers
title: Getting Started Locally
prev: false
next: false
managed: true
---

# Developing etcd-druid locally

You can setup `etcd-druid` locally by following detailed instructions in [this document](/docs/other-components/etcd-druid/deployment/getting-started-locally/getting-started-locally/).

* For best development experience you should use `make deploy-dev` - this helps during development where you wish to make changes to the code base and with a key-press allow automatic re-deployment of the application to the target Kubernetes cluster.
* In case you wish to start a debugging session then use `make deploy-debug` - this will additionally disable leader election and prevent leases to expire and process to stop.

!!! info
We leverage [skaffold debug](https://skaffold.dev/docs/workflows/debug/) and [skaffold dev](https://skaffold.dev/docs/workflows/dev/) features.
