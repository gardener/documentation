---
description: Gardener extension controller for the Garden Linux operating system
github_repo: 'https://github.com/gardener/gardener-extension-os-gardenlinux'
github_subdir: .
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/os-extensions/gardener-extension-os-gardenlinux/_index.md
  to: README.md
title: Garden Linux OS
prev: false
next: false
managed: true
---

# Gardener Extension for Garden Linux OS

[![REUSE status](https://api.reuse.software/badge/github.com/gardener/gardener-extension-os-gardenlinux)](https://api.reuse.software/info/github.com/gardener/gardener-extension-os-gardenlinux)
[![Build status](https://github.com/gardener/gardener-extension-os-gardenlinux/actions/workflows/dev_build.yaml/badge.svg?branch=master)](https://github.com/gardener/gardener-extension-os-gardenlinux/actions/workflows/dev_build.yaml)
[![Go Report Card](https://goreportcard.com/badge/github.com/gardener/gardener-extension-os-gardenlinux)](https://goreportcard.com/report/github.com/gardener/gardener-extension-os-gardenlinux)

This controller operates on the [`OperatingSystemConfig`](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md#cloud-config-user-data-for-bootstrapping-machines) resource in the `extensions.gardener.cloud/v1alpha1` API group.

It manages those objects that are requesting...

- [Garden Linux OS](https://gardenlinux.io/) configuration (`.spec.type=gardenlinux`) and its FIPS hardened variant (`.spec.type=gardenlinux-fips`):
  
  ```yaml
  ---
  apiVersion: extensions.gardener.cloud/v1alpha1
  kind: OperatingSystemConfig
  metadata:
    name: pool-01-original
    namespace: default
  spec:
    type: gardenlinux
    units:
      ...
    files:
      ...
  ```
  
  Please find [a concrete example](https://github.com/gardener/gardener-extension-os-gardenlinux/blob/master/example/40-operatingsystemconfig-gardenlinux.yaml) in the `example` folder.

- MemoryOne on Garden Linux configuration (`spec.type=memoryone-gardenlinux`):
  
  ```yaml
  ---
  apiVersion: extensions.gardener.cloud/v1alpha1
  kind: OperatingSystemConfig
  metadata:
    name: pool-01-original
    namespace: default
  spec:
    type: memoryone-gardenlinux
    units:
      ...
    files:
      ...
    providerConfig:
      apiVersion: memoryone-gardenlinux.os.extensions.gardener.cloud/v1alpha1
      kind: OperatingSystemConfiguration
      memoryTopology: "2"
      systemMemory: "6x"
  ```
  
  Please find [a concrete example](https://github.com/gardener/gardener-extension-os-gardenlinux/blob/master/example/40-operatingsystemconfig-memoryonegardenlinux.yaml) in the `example` folder.

After reconciliation the resulting data will be stored in a secret within the same namespace (as the config itself might contain confidential data). The name of the secret will be written into the resource's `.status` field:

```yaml
...
status:
  ...
  cloudConfig:
    secretRef:
      name: osc-result-pool-01-original
      namespace: default
  command: /usr/bin/env bash <path>
  units:
  - kubelet-monitor.service
  - kubelet.service
```

The secret has one data key `cloud_config` that stores the generation.

An example for a `ControllerRegistration` resource that can be used to register this controller to Gardener can be found [here](https://github.com/gardener/gardener-extension-os-gardenlinux/blob/master/example/controller-registration.yaml).

Please find more information regarding the extensibility concepts and a detailed proposal [here](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md).

---

## How to start using or developing this extension controller locally

You can run the controller locally on your machine by executing `make start`. Please make sure to have the kubeconfig to the cluster you want to connect to ready in the `./dev/kubeconfig` file.
Static code checks and tests can be executed by running `make verify`. We are using Go modules for Golang package dependency management and [Ginkgo](https://github.com/onsi/ginkgo)/[Gomega](https://github.com/onsi/gomega) for testing.

## Feedback and Support

Feedback and contributions are always welcome!

Please report bugs or suggestions as [GitHub issues](https://github.com/gardener/gardener-extension-os-gardenlinux/issues) or reach out on [Slack](https://gardener-cloud.slack.com/) (join the workspace [here](https://gardener.cloud/community/#get-connected)).

## Learn more!

Please find further resources about out project here:

- [Our landing page gardener.cloud](https://gardener.cloud/)
- ["Gardener, the Kubernetes Botanist" blog on kubernetes.io](https://kubernetes.io/blog/2018/05/17/gardener/)
- ["Gardener Project Update" blog on kubernetes.io](https://kubernetes.io/blog/2019/12/02/gardener-project-update/)
- [Gardener Extensions Golang library](https://godoc.org/github.com/gardener/gardener/extensions/pkg)
- [GEP-1 (Gardener Enhancement Proposal) on extensibility](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md)
- [Extensibility API documentation](https://github.com/gardener/gardener/tree/master/docs/extensions)
