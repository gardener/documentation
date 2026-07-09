---
description: Gardener extension controller for OpenID Connect services for shoot clusters
github_repo: 'https://github.com/gardener/gardener-extension-shoot-oidc-service'
github_subdir: .
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-oidc-service/_index.md
  to: README.md
title: OpenID Connect Services
prev: false
next: false
managed: true
---

# Gardener Extension for openid connect services

[![REUSE status](https://api.reuse.software/badge/github.com/gardener/gardener-extension-shoot-oidc-service)](https://api.reuse.software/info/github.com/gardener/gardener-extension-shoot-oidc-service)
[![Build](https://github.com/gardener/gardener-extension-shoot-oidc-service/actions/workflows/non-release.yaml/badge.svg)](https://github.com/gardener/gardener-extension-shoot-oidc-service/actions/workflows/non-release.yaml)
[![Go Report Card](https://goreportcard.com/badge/github.com/gardener/gardener-extension-shoot-oidc-service)](https://goreportcard.com/report/github.com/gardener/gardener-extension-shoot-oidc-service)

Project Gardener implements the automated management and operation of [Kubernetes](https://kubernetes.io/) clusters as a service.
Its main principle is to leverage Kubernetes concepts for all of its tasks.

Recently, most of the vendor specific logic has been developed [in-tree](https://github.com/gardener/gardener).
However, the project has grown to a size where it is very hard to extend, maintain, and test.
With [GEP-1](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md) we have proposed how the architecture can be changed in a way to support external controllers that contain their very own vendor specifics.
This way, we can keep Gardener core clean and independent.

This controller implements Gardener's extension contract for the `shoot-oidc-service` extension.

An example for a `ControllerRegistration` resource that can be used to register this controller to Gardener can be found [here](https://github.com/gardener/gardener-extension-shoot-oidc-service/blob/master/example/controller-registration.yaml).

Please find more information regarding the extensibility concepts and a detailed proposal [here](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md).

## Compatibility

The following lists compatibility requirements of this extension controller with regards to other Gardener components.

| OIDC Extension | Gardener | Notes |
| --- | --- | --- |
| `== v0.15.0` | `>= 1.60.0 <= v1.64.0` | A typical side-effect when running Gardener < v1.63.0 is an unexpected scale-down of the OIDC webhook from `2 -> 1`. |
| `== v0.16.0` | `>= 1.65.0` |  |
***

## Extension Resources

Example extension resource:

```yaml
apiVersion: extensions.gardener.cloud/v1alpha1
kind: Extension
metadata:
  name: extension-shoot-oidc-service
  namespace: shoot--project--abc
spec:
  type: shoot-oidc-service
```

When an extension resource is reconciled, the extension controller will create an instance of [OIDC Webhook Authenticator](https://github.com/gardener/oidc-webhook-authenticator).
- If the extension has class: **shoot**
  These resources are placed inside the shoot namespace on the seed. Also, the controller takes care about generating necessary `RBAC` resources for the seed as well as for the shoot.
- If the extension has class: **garden**
  These resources are placed inside the garden namespace on the runtime garden cluster. Also, the controller takes care about generating necessary `RBAC` resources for the runtime garden as well as for the virtual garden clusters.

Please note, this extension controller relies on the [Gardener-Resource-Manager](/docs/gardener/concepts/resource-manager/) to deploy k8s resources to seed and shoot clusters.

## How to start using or developing this extension controller locally

You can run the controller locally on your machine by executing `make start`.
Alternatively, in a Garden managed with `gardener-operator` the extension can be deployed by executing the command `make extension-up`.

We are using Go modules for Golang package dependency management and [Ginkgo](https://github.com/onsi/ginkgo)/[Gomega](https://github.com/onsi/gomega) for testing.

## Feedback and Support

Feedback and contributions are always welcome!

Please report bugs or suggestions as [GitHub issues](https://github.com/gardener/gardener-extension-shoot-oidc-service/issues) or reach out on [Slack](https://gardener-cloud.slack.com/) (join the workspace [here](https://gardener.cloud/community/#get-connected)).

## Learn more!

Please find further resources about out project here:

* [Our landing page gardener.cloud](https://gardener.cloud/)
* ["Gardener, the Kubernetes Botanist" blog on kubernetes.io](https://kubernetes.io/blog/2018/05/17/gardener/)
* ["Gardener Project Update" blog on kubernetes.io](https://kubernetes.io/blog/2019/12/02/gardener-project-update/)
* [GEP-1 (Gardener Enhancement Proposal) on extensibility](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md)
* [Extensibility API documentation](https://github.com/gardener/gardener/tree/master/docs/extensions)
* [Gardener Extensions Golang library](https://godoc.org/github.com/gardener/gardener/extensions/pkg)
* [Gardener API Reference](/docs/gardener/api-reference/)
