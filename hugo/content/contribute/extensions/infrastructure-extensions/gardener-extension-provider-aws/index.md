---
description: Developer documentation for the AWS cloud provider extension
github_repo: 'https://github.com/gardener/gardener-extension-provider-aws'
github_subdir: .
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/contribute/extensions/infrastructure-extensions/gardener-extension-provider-aws/_index.md
  to: README.md
title: Provider AWS
prev: false
next: false
managed: true
---

# Gardener Extension for AWS provider
[![REUSE status](https://api.reuse.software/badge/github.com/gardener/gardener-extension-provider-aws)](https://api.reuse.software/info/github.com/gardener/gardener-extension-provider-aws)
[![Build](https://github.com/gardener/gardener-extension-provider-aws/actions/workflows/head-update.yaml/badge.svg)](https://github.com/gardener/gardener-extension-provider-aws/actions/workflows/head-update.yaml)
[![Go Report Card](https://goreportcard.com/badge/github.com/gardener/gardener-extension-provider-aws)](https://goreportcard.com/report/github.com/gardener/gardener-extension-provider-aws)

Project Gardener implements the automated management and operation of [Kubernetes](https://kubernetes.io/) clusters as a service.
Its main principle is to leverage Kubernetes concepts for all of its tasks.

Recently, most of the vendor specific logic has been developed [in-tree](https://github.com/gardener/gardener).
However, the project has grown to a size where it is very hard to extend, maintain, and test.
With [GEP-1](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md) we have proposed how the architecture can be changed in a way to support external controllers that contain their very own vendor specifics.
This way, we can keep Gardener core clean and independent.

This controller implements Gardener's extension contract for the AWS provider.

An example for a `ControllerRegistration` resource that can be used to register this controller to Gardener can be found [here](https://github.com/gardener/gardener-extension-provider-aws/blob/master/example/controller-registration.yaml).

Please find more information regarding the extensibility concepts and a detailed proposal [here](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md).

## Supported Kubernetes versions

This extension controller supports the following Kubernetes versions:

| Version | Support | Conformance test results |
| --- | --- | --- |
| Kubernetes 1.36 | 1.36.0+ | N/A |
| Kubernetes 1.35 | 1.35.0+ | [![Gardener v1.35 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.35%20AWS/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.35%20AWS) |
| Kubernetes 1.34 | 1.34.0+ | [![Gardener v1.34 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.34%20AWS/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.34%20AWS) |
| Kubernetes 1.33 | 1.33.0+ | [![Gardener v1.33 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.33%20AWS/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.33%20AWS) |
| Kubernetes 1.32 | 1.32.0+ | [![Gardener v1.32 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.32%20AWS/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.32%20AWS) |

Please take a look [here](/docs/gardener/shoot-operations/supported_k8s_versions/) to see which versions are supported by Gardener in general.

## Compatibility

The following lists known compatibility issues of this extension controller with other Gardener components.

| AWS Extension | Gardener | Action | Notes |
| --- | --- | --- | --- |
| `<= v1.15.0` | `> v1.10.0` | Please update the provider version to `> v1.15.0` or disable the feature gate `MountHostCADirectories` in the Gardenlet. | Applies if feature flag `MountHostCADirectories` in the Gardenlet is enabled. Shoots with CSI enabled (Kubernetes version >= 1.18) miss a mount to the directory `/etc/ssl` in the Shoot API Server. This can lead to not trusting external Root CAs when the API Server makes requests via webhooks or OIDC. |
| `>= v1.71.0` | `< v1.135.0` | Please update Gardener to version `>= v1.135.0` | The shoot API field `shoot.spec.dns.providers[].secretName` has been deprecated in favor of `shoot.spec.dns.providers[].credentialsRef` which is available in Gardener `>= v1.135.0`, the provider extension is adapted to use the new field from `v1.71.0` version onward. |

---

## How to start using or developing this extension controller locally

You can run the controller locally on your machine by executing `make start`.

Static code checks and tests can be executed by running `make verify`. We are using Go modules for Golang package dependency management and [Ginkgo](https://github.com/onsi/ginkgo)/[Gomega](https://github.com/onsi/gomega) for testing.

## Feedback and Support

Feedback and contributions are always welcome!

Please report bugs or suggestions as [GitHub issues](https://github.com/gardener/gardener-extension-provider-aws/issues) or reach out on [Slack](https://gardener-cloud.slack.com/) (join the workspace [here](https://gardener.cloud/community/#get-connected)).

## Learn more!

Please find further resources about out project here:

* [Our landing page gardener.cloud](https://gardener.cloud/)
* ["Gardener, the Kubernetes Botanist" blog on kubernetes.io](https://kubernetes.io/blog/2018/05/17/gardener/)
* ["Gardener Project Update" blog on kubernetes.io](https://kubernetes.io/blog/2019/12/02/gardener-project-update/)
* [GEP-1 (Gardener Enhancement Proposal) on extensibility](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md)
* [GEP-4 (New `core.gardener.cloud/v1beta1` API)](https://github.com/gardener/gardener/blob/master/docs/proposals/04-new-core-gardener-cloud-apis.md)
* [Extensibility API documentation](https://github.com/gardener/gardener/tree/master/docs/extensions)
* [Gardener Extensions Golang library](https://godoc.org/github.com/gardener/gardener/extensions/pkg)
* [Gardener API Reference](https://gardener.cloud/api-reference/)
