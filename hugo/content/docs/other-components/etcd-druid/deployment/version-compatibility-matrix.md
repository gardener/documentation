---
github_repo: 'https://github.com/gardener/etcd-druid'
github_subdir: docs/deployment
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/other-components/etcd-druid/deployment/version-compatibility-matrix.md
  to: version-compatibility-matrix.md
title: Version Compatibility Matrix
prev: false
next: false
managed: true
---

# Version Compatibility

## Kubernetes

We strongly recommend using `etcd-druid` with the supported kubernetes versions, published in this document.
The following is a list of kubernetes versions supported by the respective `etcd-druid` versions.

| etcd-druid version | Kubernetes version |
| --- | --- |
| >=v0.20 | >=v1.21 |
| >=v0.14 && <0.20 | All versions supported |
| <v0.14 | < v1.25 |

## etcd-backup-restore & etcd-wrapper

| etcd-druid version | etcd-backup-restore version | etcd-wrapper version |
| --- | --- | --- |
| >=v0.23.1 | >=v0.30.2 | >=v0.2.0 |
