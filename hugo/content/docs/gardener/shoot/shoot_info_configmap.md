---
aliases:
  - /docs/gardener/shoot_info_configmap/
github_repo: 'https://github.com/gardener/gardener'
github_subdir: docs/usage/shoot
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/gardener/shoot/shoot_info_configmap.md
  to: shoot_info_configmap.md
persona: Users
title: Shoot Info Configmap
prev: false
next: false
managed: true
---

# Shoot Info `ConfigMap`

## Overview

The gardenlet maintains a [ConfigMap](https://kubernetes.io/docs/concepts/configuration/configmap/) inside the Shoot cluster that contains information about the cluster itself. The ConfigMap is named `shoot-info` and located in the `kube-system` namespace.

## Fields

The following fields are provided:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: shoot-info
  namespace: kube-system
data:
  domain: crazy-botany.core.my-custom-domain.com     # .spec.dns.domain field from the Shoot resource
  extensions: foobar,foobaz                          # List of extensions that are enabled
  kubernetesVersion: 1.25.4                          # .spec.kubernetes.version field from the Shoot resource
  maintenanceBegin: 220000+0100                      # .spec.maintenance.timeWindow.begin field from the Shoot resource
  maintenanceEnd: 230000+0100                        # .spec.maintenance.timeWindow.end field from the Shoot resource
  nodeNetwork: 10.250.0.0/16                         # .spec.networking.nodes field from the Shoot resource
  podNetwork: 100.96.0.0/11                          # .spec.networking.pods field from the Shoot resource
  projectName: dev                                   # .metadata.name of the Project
  provider: <some-provider-name>                     # .spec.provider.type field from the Shoot resource
  region: europe-central-1                           # .spec.region field from the Shoot resource
  serviceNetwork: 100.64.0.0/13                      # .spec.networking.services field from the Shoot resource
  shootName: crazy-botany                            # .metadata.name from the Shoot resource
```
