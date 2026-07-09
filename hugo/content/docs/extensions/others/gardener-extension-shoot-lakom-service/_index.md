---
description: >-
  A k8s admission controller verifying pods are using signed images (cosign
  signatures) and a gardener extension to install it for shoots and seeds.
github_repo: 'https://github.com/gardener/gardener-extension-shoot-lakom-service'
github_subdir: .
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-lakom-service/_index.md
  to: README.md
title: Lakom Service
prev: false
next: false
managed: true
---

# Gardener Extension for lakom services

[![Build](https://github.com/gardener/gardener-extension-shoot-lakom-service/actions/workflows/non-release.yaml/badge.svg)](https://github.com/gardener/gardener-extension-shoot-lakom-service/actions/workflows/non-release.yaml)
[![Go Report Card](https://goreportcard.com/badge/github.com/gardener/gardener-extension-shoot-lakom-service)](https://goreportcard.com/report/github.com/gardener/gardener-extension-shoot-lakom-service)
[![REUSE status](https://api.reuse.software/badge/github.com/gardener/gardener-extension-shoot-lakom-service)](https://api.reuse.software/info/github.com/gardener/gardener-extension-shoot-lakom-service)

Project Gardener implements the automated management and operation of [Kubernetes](https://kubernetes.io/) clusters as a service.
Its main principle is to leverage Kubernetes concepts for all of its tasks.

Recently, most of the vendor specific logic has been developed [in-tree](https://github.com/gardener/gardener).
However, the project has grown to a size where it is very hard to extend, maintain, and test.
With [GEP-1](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md) we have proposed how the architecture can be changed in a way to support external controllers that contain their very own vendor specifics.
This way, we can keep Gardener core clean and independent.

This controller implements Gardener's extension contract for the `shoot-lakom-service` extension.

An example for a `ControllerRegistration` resource that can be used to register this controller to Gardener can be found [here](https://github.com/gardener/gardener-extension-shoot-lakom-service/blob/main/example/controller-registration.yaml).

Please find more information regarding the extensibility concepts and a detailed proposal [here](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md).

## Lakom Admission Controller

Lakom is kubernetes admission controller which purpose is to implement [cosign](https://github.com/sigstore/cosign) image signature verification against public cosign key. It also takes care to resolve image tags to sha256 digests. It also caches all OCI artifacts to reduce the load toward the OCI registry.

## Extension Resources

Example extension resource:

```yaml
apiVersion: extensions.gardener.cloud/v1alpha1
kind: Extension
metadata:
  name: extension-shoot-lakom-service
  namespace: shoot--project--abc
spec:
  type: shoot-lakom-service
```

When an extension resource is reconciled, the extension controller will create an instance of `lakom` admission controller. These resources are placed inside the shoot namespace on the seed. Also, the controller takes care about generating necessary `RBAC` resources for the seed as well as for the shoot.

Please note, this extension controller relies on the [Gardener-Resource-Manager](/docs/gardener/concepts/resource-manager/) to deploy k8s resources to seed and shoot clusters.

## How to start using or developing this extension controller locally

The `Lakom` admission controller can be configured with `make dev-setup` and started with `make start-lakom`.
You can run the lakom extension controller locally on your machine by executing `make start`.

If you'd like to develop Lakom using a local cluster such as KinD, make sure your `KUBECONFIG` environment variable is targeting the local Garden cluster.
Add `127.0.0.1 registry.local.gardener.cloud` to your `/etc/hosts`. You can then run:

```bash
make extension-up
```

This will trigger a skaffold deployment that builds the images, pushes them to the registry and installs the helm charts from `/charts`.

If you are running local Gardener operator, then it is more appropriate to run the command:

```bash
make extension-operator-up
```

We are using Go modules for Golang package dependency management and [Ginkgo](https://github.com/onsi/ginkgo)/[Gomega](https://github.com/onsi/gomega) for testing.

## Feedback and Support

Feedback and contributions are always welcome!

Please report bugs or suggestions as [GitHub issues](https://github.com/gardener/gardener-extension-shoot-lakom-service/issues) or reach out on [Slack](https://gardener-cloud.slack.com/) (join the workspace [here](https://gardener.cloud/community/#get-connected)).

## Learn more

Please find further resources about out project here:

* [Our landing page gardener.cloud](https://gardener.cloud/)
* ["Gardener, the Kubernetes Botanist" blog on kubernetes.io](https://kubernetes.io/blog/2018/05/17/gardener/)
* ["Gardener Project Update" blog on kubernetes.io](https://kubernetes.io/blog/2019/12/02/gardener-project-update/)
* [GEP-1 (Gardener Enhancement Proposal) on extensibility](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md)
* [Extensibility API documentation](https://github.com/gardener/gardener/tree/master/docs/extensions)
* [Gardener Extensions Golang library](https://godoc.org/github.com/gardener/gardener/extensions/pkg)
* [Gardener API Reference](/docs/gardener/api-reference/)
