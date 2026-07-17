---
github_repo: 'https://github.com/gardener/documentation'
github_subdir: hugo/content/docs/faq
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/faq/rotate-iaas-keys.md
  to: rotate-iaas-keys.md
title: "How do you rotate IaaS keys for a running cluster?"
prev: false
next: false
local: true
---

# How do you rotate IaaS keys for a running cluster?

End-users must provide credentials such that Gardener and Kubernetes controllers can communicate with the respective cloud provider APIs in order to perform infrastructure operations. These credentials should be regularly rotated.

How to do so is explained in [Shoot Credentials Rotation](/docs/gardener/shoot-operations/shoot_credentials_rotation/#cloud-provider-keys).
