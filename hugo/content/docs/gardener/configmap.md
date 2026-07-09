---
github_repo: 'https://github.com/gardener/gardener'
github_subdir: docs/operations
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/gardener/configmap.md
  to: configmap.md
persona: Operators
title: Configmap
prev: false
next: false
managed: true
---

# Gardener Info `ConfigMap`

## Overview

The Gardener Operator maintains a [ConfigMap](https://kubernetes.io/docs/concepts/configuration/configmap/) inside the Garden cluster that contains information about the Garden landscape.
The ConfigMap is named `gardener-info` and located in the `gardener-system-public` namespace. It is visible to all authenticated users.

## Fields

The following fields are provided:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: gardener-info
  namespace: gardener-system-public
data:
  gardenerAPIServer: |                                                      # key name of the gardener-apiserver section
    version: v1.111.0                                                       # version of the gardener-apiserver
    workloadIdentityIssuerURL: https://issuer.gardener.cloud.local          # the URL of the authority that issues workload identity tokens
```
