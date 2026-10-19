---
description: >-
  Gardener extension for deploying Falco runtime security monitoring for shoot
  clusters.
github_repo: 'https://github.com/gardener/gardener-extension-shoot-falco-service'
github_subdir: .
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-falco-service/_index.md
  to: README.md
title: Falco Service
weight: 80
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
   https://github.com/gardener/gardener-extension-shoot-falco-service/blob/main/./README.md
-->


# [Gardener Extension for Falco](https://gardener.cloud)

[![REUSE status](https://api.reuse.software/badge/github.com/gardener/gardener-extension-shoot-falco-service)](https://api.reuse.software/info/github.com/gardener/gardener-extension-shoot-falco-service)
[![Build](https://github.com/gardener/gardener-extension-shoot-falco-service/actions/workflows/non-release.yaml/badge.svg)](https://github.com/gardener/gardener-extension-shoot-falco-service/actions/workflows/non-release.yaml)
[![Go Report Card](https://goreportcard.com/badge/github.com/gardener/gardener-extension-shoot-falco-service)](https://goreportcard.com/report/github.com/gardener/gardener-extension-shoot-falco-service)

Project Gardener implements the automated management and operation of [Kubernetes](https://kubernetes.io/) clusters as a service.
Its main principle is to leverage Kubernetes concepts for all of its tasks.

Recently, most of the vendor specific logic has been developed [in-tree](https://github.com/gardener/gardener).
However, the project has grown to a size where it is very hard to extend, maintain, and test.
With [GEP-1](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md) we have proposed how the architecture can be changed in a way to support external controllers that contain their very own vendor specifics. This way, we can keep Gardener core clean and independent.

This extension integrates [Falco](https://falco.org/), the cloud-native runtime security tool, into Gardener shoot clusters. It enables automated deployment, configuration, and lifecycle management of Falco, providing real-time security event detection for container workloads. This functionality of this extension was first proposed in the [GEP-27](https://github.com/gardener/gardener/blob/a0f959ee152e13a22db1b0d9f6f146bc16c8b7ed/docs/proposals/27-falco-extension.md).

## Overview
- **Extension Name:** `gardener-extension-shoot-falco-service`
- **Purpose:** Deploy and manage Falco in shoot clusters via Gardener’s extension mechanism
- **Features:**
  - Automated Falco deployemnt with lifecycle management
  - Deployment with standard or custom Falco rules
  - Support for custom event storage

## Getting Started

### Prerequisites
- A running Gardener landscape (see Gardener documentation)
- Access to a shoot cluster
- Extension enabled in the landscape configuration via [extension configuration](/docs/extensions/others/gardener-extension-shoot-falco-service/extension-configuration/)

### Installation
Add the extension to your shoot manifest:
```yaml
  extensions:
    - type: shoot-falco-service
```

For a full shoot extension section configuration, refer to the [configuration documentation](/docs/extensions/others/gardener-extension-shoot-falco-service/falco-configuration/)

## How to start using or developing this extension controller locally

You can run the controller locally on your machine by executing `make start`. Please make sure to reference the kubeconfig to the seed you want to connect to via the `KUBECONFIG` variable and the respective gardener via the `GARDEN_KUBECONFIG` variable.
Static code checks and tests can be executed by running `make verify`. We are using Go modules for Golang package dependency management and [Ginkgo](https://github.com/onsi/ginkgo)/[Gomega](https://github.com/onsi/gomega) for testing.

## Feedback and Support

Feedback and contributions are always welcome!

Please report bugs or suggestions as [GitHub issues](https://github.com/gardener/gardener-extension-shoot-falco-service/issues) or reach out on [Slack](https://gardener-cloud.slack.com/) (join the workspace [here](https://gardener.cloud/community/community-bio/)).

## Learn more!

Please find further resources about our project here:

* [Our landing page gardener.cloud](https://gardener.cloud/)
* ["Gardener, the Kubernetes Botanist" blog on kubernetes.io](https://kubernetes.io/blog/2018/05/17/gardener/)
* ["Gardener Project Update" blog on kubernetes.io](https://kubernetes.io/blog/2019/12/02/gardener-project-update/)
* [Gardener Extensions Golang library](https://godoc.org/github.com/gardener/gardener/extensions/pkg)
* [GEP-1 (Gardener Enhancement Proposal) on extensibility](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md)
* [Extensibility API documentation](https://github.com/gardener/gardener/tree/master/docs/extensions)

<p align="center"><img alt="Bundesministerium für Wirtschaft und Energie (BMWE)-EU funding logo" src="https://apeirora.eu/assets/img/BMWK-EU.png" width="400"/></p>
