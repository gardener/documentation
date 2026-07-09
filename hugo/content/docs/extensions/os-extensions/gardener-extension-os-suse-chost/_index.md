---
description: >-
  Gardener extension controller for the SUSE Container Host operating system
  (CHost)
github_repo: 'https://github.com/gardener/gardener-extension-os-suse-chost'
github_subdir: .
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/os-extensions/gardener-extension-os-suse-chost/_index.md
  to: README.md
title: SUSE CHost OS
prev: false
next: false
managed: true
---

# Gardener Extension for SUSE CHost

[![REUSE status](https://api.reuse.software/badge/github.com/gardener/gardener-extension-os-suse-chost)](https://api.reuse.software/info/github.com/gardener/gardener-extension-os-suse-chost)
[![Build status](https://github.com/gardener/gardener-extension-os-suse-chost/actions/workflows/dev_build.yaml/badge.svg?branch=master)](https://github.com/gardener/gardener-extension-os-suse-chost/actions/workflows/dev_build.yaml)
[![Go Report Card](https://goreportcard.com/badge/github.com/gardener/gardener-extension-os-suse-chost)](https://goreportcard.com/report/github.com/gardener/gardener-extension-os-suse-chost)

This controller operates on the [`OperatingSystemConfig`](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md#cloud-config-user-data-for-bootstrapping-machines) resource in the `extensions.gardener.cloud/v1alpha1` API group. It manages those objects that are requesting SUSE Container Host configuration, i.e. `suse-chost` type:

```yaml
---
apiVersion: extensions.gardener.cloud/v1alpha1
kind: OperatingSystemConfig
metadata:
  name: pool-01-original
  namespace: default
spec:
  type: suse-chost
  units:
    ...
  files:
    ...
```

Please find [a concrete example](https://github.com/gardener/gardener-extension-os-suse-chost/blob/master/example/40-operatingsystemconfig-chost.yaml) in the `example` folder.

It is also capable of supporting the [vSMP MemoryOne](https://marketplace.cloud.vmware.com/services/details/vsmp-memoryone?slug=true) operating system with the `memoryone-chost` type. Please find more information [here](/docs/extensions/os-extensions/gardener-extension-os-suse-chost/usage/#support-for-vsmp-memoryone).

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

An example for a `ControllerRegistration` resource that can be used to register this controller to Gardener can be found [here](https://github.com/gardener/gardener-extension-os-suse-chost/blob/master/example/controller-registration.yaml).

Please find more information regarding the extensibility concepts and a detailed proposal [here](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md).

---

## How to start using or developing this extension controller locally

You can run the controller locally on your machine by executing `make start`. Please make sure to have the kubeconfig to the cluster you want to connect to ready in the `./dev/kubeconfig` file.
Static code checks and tests can be executed by running `make verify`. We are using Go modules for Golang package dependency management and [Ginkgo](https://github.com/onsi/ginkgo)/[Gomega](https://github.com/onsi/gomega) for testing.

## Feedback and Support

Feedback and contributions are always welcome!

Please report bugs or suggestions as [GitHub issues](https://github.com/gardener/gardener-extension-os-suse-chost/issues) or reach out on [Slack](https://gardener-cloud.slack.com/) (join the workspace [here](https://gardener.cloud/community/community-bio/)).

## Learn more!

Please find further resources about out project here:

* [Our landing page gardener.cloud](https://gardener.cloud/)
* ["Gardener, the Kubernetes Botanist" blog on kubernetes.io](https://kubernetes.io/blog/2018/05/17/gardener/)
* ["Gardener Project Update" blog on kubernetes.io](https://kubernetes.io/blog/2019/12/02/gardener-project-update/)
* [Gardener Extensions Golang library](https://godoc.org/github.com/gardener/gardener/extensions/pkg)
* [GEP-1 (Gardener Enhancement Proposal) on extensibility](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md)
* [Extensibility API documentation](https://github.com/gardener/gardener/tree/master/docs/extensions)
