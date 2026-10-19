---
description: Gardener extension controller for Cloudflare as a DNS provider.
github_repo: 'https://github.com/schrodit/gardener-extension-provider-dns-cloudflare'
github_subdir: .
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-provider-dns-cloudflare/_index.md
  to: README.md
title: Cloudflare
weight: 45
prev: false
next: false
---
<!-- BANNER:MANAGED -->
<!--
   █▀▀ ▀█▀ █▀█ █▀█
   ▀▀█  █  █ █ █▀▀
   ▀▀▀  ▀  ▀▀▀ ▀

   ┌────────────────────────────────────────────────┐
   │  MANAGED FILE — aggregated from upstream       │
   │                                                │
   │  Editing here is pointless: The nightly        │
   │  aggregation run overwrites this file.         │
   │                                                │
   │  Open a PR against the source instead: ─────┐  │
   │                          ┌──┐    ┌──────────┘  │
   │                          └──│────┘             │
   │           ┌─────────────────┘                  │
   └───────────│────────────────────────────────────┘
               ▼               
   https://github.com/schrodit/gardener-extension-provider-dns-cloudflare/blob/main/./README.md
-->


# [Gardener DNS Extension for Cloudflare](https://gardener.cloud)

[![Go Report Card](https://goreportcard.com/badge/github.com/schrodit/gardener-extension-provider-dns-cloudflare)](https://goreportcard.com/report/github.com/schrodit/gardener-extension-provider-dns-cloudflare)

Project Gardener implements the automated management and operation of [Kubernetes](https://kubernetes.io/) clusters as a service.
Its main principle is to leverage Kubernetes concepts for all of its tasks.

Recently, most of the vendor specific logic has been developed [in-tree](https://github.com/gardener/gardener).
However, the project has grown to a size where it is very hard to extend, maintain, and test.
With [GEP-1](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md) we have proposed how the architecture can be changed in a way to support external controllers that contain their very own vendor specifics.
This way, we can keep Gardener core clean and independent.

This controller implements Gardener's extension contract for the Cloudflare provider.

An example for a `ControllerRegistration` resource that can be used to register this controller to Gardener can be found [here](https://github.com/schrodit/gardener-extension-provider-dns-cloudflare/blob/main/example/controller-registration.yaml).

Please find more information regarding the extensibility concepts and a detailed proposal [here](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md).

## Supported Kubernetes versions

This extension controller follows the Kubernetes minor versions supported by the current Gardener dependency line used in this repository.

At the time of writing, the supported shoot Kubernetes versions are:

| Version |
| --- |
| Kubernetes 1.32 |
| Kubernetes 1.33 |
| Kubernetes 1.34 |
| Kubernetes 1.35 |

The repository currently runs its test suite against Kubernetes `1.33` and generates API reference artifacts against Kubernetes `1.34`.

Please take a look [here](https://gardener.cloud/docs/gardener/shoot-operations/supported_k8s_versions/) to see which Kubernetes versions are supported by Gardener in general.

---

## How to start using or developing this extension controller locally

You can run the controller locally on your machine by executing `make start`.

Static code checks and tests can be executed by running `make verify`. We are using Go modules for Golang package dependency management and [Ginkgo](https://github.com/onsi/ginkgo)/[Gomega](https://github.com/onsi/gomega) for testing.

## Feedback and Support

Feedback and contributions are always welcome. Please report bugs or suggestions as [GitHub issues](https://github.com/schrodit/gardener-extension-provider-dns-cloudflare/issues) or join our [Slack channel #gardener](https://kubernetes.slack.com/messages/gardener) (please invite yourself to the Kubernetes workspace [here](http://slack.k8s.io)).

## Learn more!

Please find further resources about out project here:

* [Our landing page gardener.cloud](https://gardener.cloud/)
* ["Gardener, the Kubernetes Botanist" blog on kubernetes.io](https://kubernetes.io/blog/2018/05/17/gardener/)
* ["Gardener Project Update" blog on kubernetes.io](https://kubernetes.io/blog/2019/12/02/gardener-project-update/)
* [GEP-1 (Gardener Enhancement Proposal) on extensibility](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md)
* [GEP-4 (New `core.gardener.cloud/v1alpha1` API)](https://github.com/gardener/gardener/blob/master/docs/proposals/04-new-core-gardener-cloud-apis.md)
* [Extensibility API documentation](https://github.com/gardener/gardener/tree/master/docs/extensions)
* [Gardener Extensions Golang library](https://godoc.org/github.com/gardener/gardener/extensions/pkg)
* [Gardener API Reference](https://gardener.cloud/api-reference/)
