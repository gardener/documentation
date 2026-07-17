---
github_repo: 'https://github.com/gardener/documentation'
github_subdir: hugo/content/docs/faq
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/faq/backup.md
  to: backup.md
title: "Can you backup your Kubernetes cluster resources?"
prev: false
next: false
local: true
---

# Can you backup your Kubernetes cluster resources?

Backing up your Kubernetes cluster is possible through the use of specialized software like [Velero](https://velero.io/). Velero consists of a server-side component and a client tool that allow you to backup or restore all objects in your cluster, as well as the cluster resources and persistent volumes.
