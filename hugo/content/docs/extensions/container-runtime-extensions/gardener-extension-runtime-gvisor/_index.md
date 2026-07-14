---
description: Gardener extension controller for the gVisor container runtime sandbox
github_repo: 'https://github.com/gardener/gardener-extension-runtime-gvisor'
github_subdir: .
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/container-runtime-extensions/gardener-extension-runtime-gvisor/_index.md
  to: README.md
title: GVisor container runtime
prev: false
next: false
managed: true
---

# Gardener Extension for the gVisor Container Runtime Sandbox

[![REUSE status](https://api.reuse.software/badge/github.com/gardener/gardener-extension-runtime-gvisor)](https://api.reuse.software/info/github.com/gardener/gardener-extension-runtime-gvisor)
[![Build status](https://github.com/gardener/gardener-extension-runtime-gvisor/actions/workflows/non-release.yaml/badge.svg?branch=master)](https://github.com/gardener/gardener-extension-runtime-gvisor/actions/workflows/non-release.yaml)
[![Go Report Card](https://goreportcard.com/badge/github.com/gardener/gardener-extension-runtime-gvisor)](https://goreportcard.com/report/github.com/gardener/gardener-extension-runtime-gvisor)

Project Gardener implements the automated management and operation of [Kubernetes](https://kubernetes.io/) clusters as a service. Its main principle is to leverage Kubernetes concepts for all of its tasks.

Recently, most of the vendor specific logic has been developed [in-tree](https://github.com/gardener/gardener). However, the project has grown to a size where it is very hard to extend, maintain, and test. With [GEP-1](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md) we have proposed how the architecture can be changed in a way to support external controllers that contain their very own vendor specifics. This way, we can keep Gardener core clean and independent.

---

## How to use this Controller

This controller operates on the [ContainerRuntime](/docs/gardener/extensions/resources/containerruntime/) resource in the `extensions.gardener.cloud/v1alpha1 API` group.

It manages objects that are requesting (`.spec.type=gvisor`) to enable the gVisor container runtime sandbox for a worker pool of a shoot cluster.

The ContainerRuntime can be configured in the shoot manifest in `.spec.povider.workers[].cri.containerRuntimes` an example can be found [here](https://github.com/gardener/gardener-extension-runtime-gvisor/blob/master/example/shoot.yaml):

```yaml
kind: Shoot
apiVersion: core.gardener.cloud/v1beta1
metadata:
  name: gvisor-shoot
  namespace: garden-local
spec:
    ...
  provider:
    workers:
      - name: worker-xyz
    ...
        cri:
          name: containerd
          containerRuntimes:
            - type: gvisor
    ...
```

gVisor can be configured with additional configuration flags by adding them to the `configFlags` field in the providerConfig.
Right now the following flags are supported and all other flags are ignored:
- `debug: "true"`: This enables debug logs for runsc. The logs are written to `/var/log/runsc/<containerd-id>/<command>-gvisor.log` on the node.
- `net-raw: "true"`: This is required for some applications that need to use raw sockets, such as `traceroute`, or `istio` init conainers.
- `nvproxy: "true"`: Run GPU enabled containers in your gVisor sandbox. This flag is required for the NVIDIA GPU device plugin to work with gVisor.

```yaml
...
            - type: gvisor
              providerConfig:
                apiVersion: gvisor.runtime.extensions.config.gardener.cloud/v1alpha1
                kind: GVisorConfiguration
                configFlags:
                  debug: "true"
                  net-raw: "true"
                  nvproxy: "true"
                  ...
...
```

Based on the configuration in the shoot manifest the ContainerRuntime resource is created:

```yaml
---
apiVersion: extensions.gardener.cloud/v1alpha1
kind: ContainerRuntime
metadata:
  name: my-container-runtime
spec:
  binaryPath: /var/bin/containerruntimes
  type: gvisor
  providerConfig:
    apiVersion: gvisor.runtime.extensions.config.gardener.cloud/v1alpha1
    configFlags:
      net-raw: "true"
    kind: GVisorConfiguration
  workerPool:
    name: worker-ubuntu
    selector:
      matchLabels:
        worker.gardener.cloud/pool: worker-xyz
```

## NVProxy Usage

gVisor can be used with NVIDIA GPUs. To enable this, the `nvproxy` config flag must be set in the gVisor providerConfig of the shoot:

```yaml
...
            - type: gvisor
              providerConfig:
                apiVersion: gvisor.runtime.extensions.config.gardener.cloud/v1alpha1
                kind: GVisorConfiguration
                configFlags:
                  nvproxy: "true"
                  ...
...
```

### Pre-requisites

- The required NVIDIA drivers must be installed on the nodes.
  - In case of Gardenlinux, the [gardenlinux-nvidia-installer](https://github.com/gardenlinux/gardenlinux-nvidia-installer) can be used.
  - ⚠ Please note that the gardenlinux-nvidia-installer version must match the gardenlinux version.
- The [NVIDIA device plugin](https://github.com/NVIDIA/k8s-device-plugin?tab=readme-ov-file#nvidia-device-plugin-for-kubernetes) must be installed in the cluster.

### Known limitations:

gVisor does not support all NVIDIA GPUs and drivers. Please refer to the [gVisor documentation](https://gvisor.dev/docs/user_guide/gpu/) for detailed information.

Before using gVisor with NVIDIA GPUs, please check the supporded drivers by running the following command on your node with enabled gVisor:

```bash
$ /var/bin/containerruntimes/runsc nvproxy list-supported-drivers
535.183.01
535.183.06
535.216.01
535.230.02
550.54.14
550.54.15
550.90.07
550.90.12
550.127.05
560.35.03
565.57.01
570.86.15
```

---

## How to start using or developing this extension controller locally

You can run the controller locally on your machine by executing `make start`. Please make sure to have the kubeconfig to the cluster you want to connect to ready in the `./dev/kubeconfig` file.

Static code checks and tests can be executed by running `make verify`. We are using Go modules for Golang package dependency management and [Ginkgo](https://github.com/onsi/ginkgo)/[Gomega](https://github.com/onsi/gomega) for testing.

## Feedback and Support

Feedback and contributions are always welcome!

Please report bugs or suggestions as [GitHub issues](https://github.com/gardener/gardener-extension-runtime-gvisor/issues) or reach out on [Slack](https://gardener-cloud.slack.com/) (join the workspace [here](https://gardener.cloud/community/#get-connected)).

## Learn more!

Please find further resources about out project here:

- [Our landing page gardener.cloud](https://gardener.cloud/)
- ["Gardener, the Kubernetes Botanist" blog on kubernetes.io](https://kubernetes.io/blog/2018/05/17/gardener/)
- ["Gardener Project Update" blog on kubernetes.io](https://kubernetes.io/blog/2019/12/02/gardener-project-update/)
- [GEP-1 (Gardener Enhancement Proposal) on extensibility](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md)
- [GEP-10 (Additional Container Runtimes)](https://github.com/gardener/gardener/blob/master/docs/proposals/10-shoot-additional-container-runtimes.md)
- [Extensibility API documentation](https://github.com/gardener/gardener/tree/master/docs/extensions)
