---
description: >-
  Gardener extension controller for the CoreOS/FlatCar Container Linux operating
  system
github_repo: 'https://github.com/gardener/gardener-extension-os-coreos'
github_subdir: .
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/extensions/os-extensions/gardener-extension-os-coreos/_index.md
  to: README.md
title: CoreOS/FlatCar OS
prev: false
next: false
managed: true
---

# Gardener Extension for CoreOS Container Linux

[![REUSE status](https://api.reuse.software/badge/github.com/gardener/gardener-extension-os-coreos)](https://api.reuse.software/info/github.com/gardener/gardener-extension-os-coreos)
[![Build status](https://github.com/gardener/gardener-extension-os-coreos/actions/workflows/head-update.yaml/badge.svg?branch=master)](https://github.com/gardener/gardener-extension-os-coreos/actions/workflows/head-update.yaml)
[![Go Report Card](https://goreportcard.com/badge/github.com/gardener/gardener-extension-os-coreos)](https://goreportcard.com/report/github.com/gardener/gardener-extension-os-coreos)

Project Gardener implements the automated management and operation of [Kubernetes](https://kubernetes.io/) clusters as a service. Its main principle is to leverage Kubernetes concepts for all of its tasks.

Recently, most of the vendor specific logic has been developed [in-tree](https://github.com/gardener/gardener). However, the project has grown to a size where it is very hard to extend, maintain, and test. With [GEP-1](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md) we have proposed how the architecture can be changed in a way to support external controllers that contain their very own vendor specifics. This way, we can keep Gardener core clean and independent.

This controller operates on the `OperatingSystemConfig` resource in the `extensions.gardener.cloud/v1alpha1` API group. It supports [CoreOS Container Linux](https://coreos.com/os/docs/latest/) and [Flatcar Container Linux](https://www.flatcar-linux.org/) ("a friendly fork of CoreOS Container Linux").

The controller manages those objects that are requesting [CoreOS Container Linux](https://coreos.com/os/docs/latest/) configuration (`.spec.type=coreos`) or [Flatcar Container Linux](https://www.flatcar-linux.org/) configuration (`.spec.type=flatcar`):

```yaml
---
apiVersion: extensions.gardener.cloud/v1alpha1
kind: OperatingSystemConfig
metadata:
  name: pool-01-original
  namespace: default
spec:
  type: coreos
  units:
    ...
  files:
    ...
```

Please find [a concrete example](https://github.com/gardener/gardener-extension-os-coreos/blob/master/example/40-operatingsystemconfig.yaml) in the `example` folder.

After reconciliation the resulting data will be stored in a secret within the same namespace (as the config itself might contain confidential data). The name of the secret will be written into the resource's `.status` field:

```yaml
...
status:
  ...
  cloudConfig:
    secretRef:
      name: osc-result-pool-01-original
      namespace: default
  command: /usr/bin/coreos-cloudinit -from-file=<path>
  units:
  - containerd-monitor.service
  - kubelet-monitor.service
  - kubelet.service
```

The secret has one data key `cloud_config` that stores the generation.

An example for a `ControllerRegistration` resource that can be used to register this controller to Gardener can be found [here](https://github.com/gardener/gardener-extension-os-coreos/blob/master/example/controller-registration.yaml).

Please find more information regarding the extensibility concepts and a detailed proposal [here](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md).

---

## How to start using or developing this extension controller locally

You can run the controller locally on your machine by executing `make start`. Please make sure to have the kubeconfig to the cluster you want to connect to ready in the `./dev/kubeconfig` file.

Static code checks and tests can be executed by running `make verify`. We are using Go modules for Golang package dependency management and [Ginkgo](https://github.com/onsi/ginkgo)/[Gomega](https://github.com/onsi/gomega) for testing.

## Feedback and Support

Feedback and contributions are always welcome!

Please report bugs or suggestions as [GitHub issues](https://github.com/gardener/gardener-extension-os-coreos/issues) or reach out on [Slack](https://gardener-cloud.slack.com/) (join the workspace [here](https://gardener.cloud/community/#get-connected)).

## Learn more!

Please find further resources about out project here:

* [Our landing page gardener.cloud](https://gardener.cloud/)
* ["Gardener, the Kubernetes Botanist" blog on kubernetes.io](https://kubernetes.io/blog/2018/05/17/gardener/)
* ["Gardener Project Update" blog on kubernetes.io](https://kubernetes.io/blog/2019/12/02/gardener-project-update/)
* [Gardener Extensions Golang library](https://godoc.org/github.com/gardener/gardener/extensions/pkg)
* [GEP-1 (Gardener Enhancement Proposal) on extensibility](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md)
* [Extensibility API documentation](https://github.com/gardener/gardener/tree/master/docs/extensions)
