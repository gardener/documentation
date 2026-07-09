---
description: Gardener extension for deploying network problem detector
github_repo: >-
  https://github.com/gardener/gardener-extension-shoot-networking-problemdetector
github_subdir: .
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-networking-problemdetector/_index.md
  to: README.md
title: Networking Problem Detector
prev: false
next: false
managed: true
---

# Gardener Extension for Network Problem Detector

[![REUSE status](https://api.reuse.software/badge/github.com/gardener/gardener-extension-shoot-networking-problemdetector)](https://api.reuse.software/info/github.com/gardener/gardener-extension-shoot-networking-problemdetector)
[![Build](https://github.com/gardener/gardener-extension-shoot-networking-problemdetector/actions/workflows/non-release.yaml/badge.svg)](https://github.com/gardener/gardener-extension-shoot-networking-problemdetector/actions/workflows/non-release.yaml)
[![Go Report Card](https://goreportcard.com/badge/github.com/gardener/gardener-extension-shoot-networking-problemdetector)](https://goreportcard.com/report/github.com/gardener/gardener-extension-shoot-networking-problemdetector)

Project Gardener implements the automated management and operation of [Kubernetes](https://kubernetes.io/) clusters as a service.
Its main principle is to leverage Kubernetes concepts for all of its tasks.

Recently, most of the vendor specific logic has been developed [in-tree](https://github.com/gardener/gardener).
However, the project has grown to a size where it is very hard to extend, maintain, and test.
With [GEP-1](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md) we have proposed how the architecture can be changed in a way to support external controllers that contain their very own vendor specifics.
This way, we can keep Gardener core clean and independent.

This controller implements Gardener's extension contract for the `shoot-networking-problemdetector` extension.

An example for a `ControllerRegistration` resource that can be used to register this controller to Gardener can be found [here](https://github.com/gardener/gardener-extension-shoot-networking-problemdetector/blob/main/example/controller-registration.yaml).

Please find more information regarding the extensibility concepts and a detailed proposal [here](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md).

## Extension Resources

Currently there is nothing to specify in the extension spec.

Example extension resource:

```yaml
apiVersion: extensions.gardener.cloud/v1alpha1
kind: Extension
metadata:
  name: extension-shoot-networking-problemdetector
  namespace: shoot--project--abc
spec:
```

When an extension resource is reconciled, the extension controller will create two daemonsets `nwpd-agent-pod-net` and `nwpd-agent-node-net` deploying
the "network problem detector agent".
These daemon sets perform and collect various checks between all nodes of the Kubernetes cluster, to its Kube API server and/or external endpoints.
Checks are performed using TCP connections, PING (ICMP) or mDNS (UDP).
More details about the network problem detector agent can be found in its repository [gardener/network-problem-detector](https://github.com/gardener/network-problem-detector).

Please note, this extension controller relies on the [Gardener-Resource-Manager](/docs/gardener/concepts/resource-manager/) to deploy k8s resources to seed and shoot clusters.

## How to start using or developing this extension controller locally

You can run the controller locally on your machine by executing `make start`.

We are using Go modules for Golang package dependency management and [Ginkgo](https://github.com/onsi/ginkgo)/[Gomega](https://github.com/onsi/gomega) for testing.

## Feedback and Support

Feedback and contributions are always welcome!

Please report bugs or suggestions as [GitHub issues](https://github.com/gardener/gardener-extension-shoot-networking-problemdetector/issues) or reach out on [Slack](https://gardener-cloud.slack.com/) (join the workspace [here](https://gardener.cloud/community/#get-connected)).

## Learn more!

Please find further resources about out project here:

* [Our landing page gardener.cloud](https://gardener.cloud/)
* ["Gardener, the Kubernetes Botanist" blog on kubernetes.io](https://kubernetes.io/blog/2018/05/17/gardener/)
* ["Gardener Project Update" blog on kubernetes.io](https://kubernetes.io/blog/2019/12/02/gardener-project-update/)
* [GEP-1 (Gardener Enhancement Proposal) on extensibility](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md)
* [Extensibility API documentation](https://github.com/gardener/gardener/tree/master/docs/extensions)
* [Gardener Extensions Golang library](https://godoc.org/github.com/gardener/gardener/extensions/pkg)
* [Gardener API Reference](/docs/gardener/api-reference/)
