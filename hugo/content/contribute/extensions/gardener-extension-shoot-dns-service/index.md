---
description: Developer documentation for the DNS services extension
github_repo: 'https://github.com/gardener/gardener-extension-shoot-dns-service'
github_subdir: .
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/contribute/extensions/gardener-extension-shoot-dns-service/_index.md
  to: README.md
title: DNS Services
prev: false
next: false
managed: true
---

# Gardener Extension for DNS services

[![REUSE status](https://api.reuse.software/badge/github.com/gardener/gardener-extension-shoot-dns-service)](https://api.reuse.software/info/github.com/gardener/gardener-extension-shoot-dns-service)
[![Build](https://github.com/gardener/gardener-extension-shoot-dns-service/actions/workflows/non-release.yaml/badge.svg)](https://github.com/gardener/gardener-extension-shoot-dns-service/actions/workflows/non-release.yaml)
[![Go Report Card](https://goreportcard.com/badge/github.com/gardener/gardener-extension-shoot-dns-service)](https://goreportcard.com/report/github.com/gardener/gardener-extension-shoot-dns-service)

Project Gardener implements the automated management and operation of [Kubernetes](https://kubernetes.io/) clusters as a service. Its main principle is to leverage Kubernetes concepts for all of its tasks.

Recently, most of the vendor specific logic has been developed [in-tree](https://github.com/gardener/gardener). However, the project has grown to a size where it is very hard to extend, maintain, and test. With [GEP-1](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md) we have proposed how the architecture can be changed in a way to support external controllers that contain their very own vendor specifics. This way, we can keep Gardener core clean and independent.

## Extension-Resources

Example extension resource:

```yaml
apiVersion: extensions.gardener.cloud/v1alpha1
kind: Extension
metadata:
  name: "extension-dns-service"
  namespace: shoot--project--abc
spec:
  type: shoot-dns-service
```

## How to start using or developing this extension controller locally

You can run the controller locally on your machine by executing `make start`. Please make sure to have the kubeconfig to the cluster you want to connect to ready in the `./dev/kubeconfig` file.
Static code checks and tests can be executed by running `make verify`. We are using Go modules for Golang package dependency management and [Ginkgo](https://github.com/onsi/ginkgo)/[Gomega](https://github.com/onsi/gomega) for testing.

## Feedback and Support

Feedback and contributions are always welcome!

Please report bugs or suggestions as [GitHub issues](https://github.com/gardener/gardener-extension-shoot-dns-service/issues) or reach out on [Slack](https://gardener-cloud.slack.com/) (join the workspace [here](https://gardener.cloud/community/#get-connected)).

## Learn more!

Please find further resources about out project here:

* [Our landing page gardener.cloud](https://gardener.cloud/)
* ["Gardener, the Kubernetes Botanist" blog on kubernetes.io](https://kubernetes.io/blog/2018/05/17/gardener/)
* ["Gardener Project Update" blog on kubernetes.io](https://kubernetes.io/blog/2019/12/02/gardener-project-update/)
* [Gardener Extensions Golang library](https://godoc.org/github.com/gardener/gardener/extensions/pkg)
* [GEP-1 (Gardener Enhancement Proposal) on extensibility](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md)
* [Extensibility API documentation](https://github.com/gardener/gardener/tree/master/docs/extensions)
