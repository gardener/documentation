---
description: Gardener extension controller for egress filtering for shoot clusters
github_repo: 'https://github.com/gardener/gardener-extension-shoot-networking-filter'
github_subdir: .
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-networking-filter/_index.md
  to: README.md
title: Egress Filtering
prev: false
next: false
managed: true
---

# Gardener Extension for Networking Filter

[![REUSE status](https://api.reuse.software/badge/github.com/gardener/gardener-extension-shoot-networking-filter)](https://api.reuse.software/info/github.com/gardener/gardener-extension-shoot-networking-filter)
[![Build](https://github.com/gardener/gardener-extension-shoot-networking-filter/actions/workflows/non-release.yaml/badge.svg)](https://github.com/gardener/gardener-extension-shoot-networking-filter/actions/workflows/non-release.yaml)
[![Go Report Card](https://goreportcard.com/badge/github.com/gardener/gardener-extension-shoot-networking-filter)](https://goreportcard.com/report/github.com/gardener/gardener-extension-shoot-networking-filter)

Project Gardener implements the automated management and operation of [Kubernetes](https://kubernetes.io/) clusters as a service.
Its main principle is to leverage Kubernetes concepts for all of its tasks.

Recently, most of the vendor specific logic has been developed [in-tree](https://github.com/gardener/gardener).
However, the project has grown to a size where it is very hard to extend, maintain, and test.
With [GEP-1](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md) we have proposed how the architecture can be changed in a way to support external controllers that contain their very own vendor specifics.
This way, we can keep Gardener core clean and independent.

This controller implements Gardener's extension contract for the `shoot-networking-filter` extension.

An example for a `ControllerRegistration` resource that can be used to register this controller to Gardener can be found [here](https://github.com/gardener/gardener-extension-shoot-networking-filter/blob/master/example/controller-registration.yaml).

Please find more information regarding the extensibility concepts and a detailed proposal [here](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md).

## Extension Resources

Example extension resource:

```yaml
apiVersion: extensions.gardener.cloud/v1alpha1
kind: Extension
metadata:
  name: extension-shoot-networking-filter
  namespace: shoot--project--abc
spec:
  providerConfig:
    egressFilter:
      blackholingEnabled: false
      staticFilterList:
      - network: 1.2.3.4/31
        policy: BLOCK_ACCESS
      workers:
        blackholingEnabled: true
        names:
        - external-api
```

When an extension resource is reconciled, if the optional `workers` field is not used, the extension controller will create a daemonset `egress-filter-applier` on the shoot containing a [Dockerfile](https://github.com/gardener/egress-filter-refresher/blob/master/Dockerfile) container.

If the optional `workers` field is used, the extension controller will create one daemonset `egress-filter-applier-<worker name>` per **each worker group** on the shoot.

See the [usage documentation](/docs/extensions/others/gardener-extension-shoot-networking-filter/shoot-networking-filter/) for more details on how to configure the extension on a shoot cluster.

Please note, this extension controller relies on the [Gardener-Resource-Manager](/docs/gardener/concepts/resource-manager/) to deploy k8s resources to seed and shoot clusters.

## How to start using or developing this extension controller locally

You can run the controller locally on your machine by executing `make start`.

We are using Go modules for Golang package dependency management and [Ginkgo](https://github.com/onsi/ginkgo)/[Gomega](https://github.com/onsi/gomega) for testing.

## Feedback and Support

Feedback and contributions are always welcome!

Please report bugs or suggestions as [GitHub issues](https://github.com/gardener/gardener-extension-shoot-networking-filter/issues) or reach out on [Slack](https://gardener-cloud.slack.com/) (join the workspace [here](https://gardener.cloud/community/#get-connected)).

## Learn more!

Please find further resources about out project here:

* [Our landing page gardener.cloud](https://gardener.cloud/)
* ["Gardener, the Kubernetes Botanist" blog on kubernetes.io](https://kubernetes.io/blog/2018/05/17/gardener/)
* ["Gardener Project Update" blog on kubernetes.io](https://kubernetes.io/blog/2019/12/02/gardener-project-update/)
* [GEP-1 (Gardener Enhancement Proposal) on extensibility](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md)
* [Extensibility API documentation](https://github.com/gardener/gardener/tree/master/docs/extensions)
* [Gardener Extensions Golang library](https://godoc.org/github.com/gardener/gardener/extensions/pkg)
* [Gardener API Reference](/docs/gardener/api-reference/)
