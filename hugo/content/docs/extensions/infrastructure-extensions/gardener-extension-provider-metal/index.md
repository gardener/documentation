---
description: Gardener extension controller for the metal-stack cloud provider
github_repo: 'https://github.com/metal-stack/gardener-extension-provider-metal'
github_subdir: .
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/infrastructure-extensions/gardener-extension-provider-metal/_index.md
  to: README.md
title: Provider metal-stack
prev: false
next: false
managed: true
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
   https://github.com/metal-stack/gardener-extension-provider-metal/blob/master/./README.md
-->


# Gardener Extension for Provider metal-stack

[![GitHub License](https://img.shields.io/github/license/metal-stack/gardener-extension-provider-metal)](https://github.com/metal-stack/gardener-extension-provider-metal/blob/master/LICENCE)
[![Build](https://github.com/metal-stack/gardener-extension-provider-metal/actions/workflows/build.yaml/badge.svg)](https://github.com/metal-stack/gardener-extension-provider-metal/actions/workflows/build.yaml)

[Project Gardener](https://gardener.cloud/) implements the automated management and operation of [Kubernetes](https://kubernetes.io/) clusters as a service. This controller implements [Gardener's extension contract](/docs/gardener/extensions/) for the [**metal-stack**](https://metal-stack.io/) provider.

It reconciles the `Infrastructure`, `ControlPlane`, and `Worker` resources of `type: metal`, and additionally contains a validator for all metal-specific provider configs as well as mutating webhooks.

The `Worker` resource will also create a `FirewallDeployment` resource reconciled by the [firewall-controller-manager](https://github.com/metal-stack/firewall-controller-manager).

For the shoot `ControlPlane`, the extension provider also deploys [MetalLB](https://metallb.io/) into the cluster, which gets dynamically configured by the [metal-ccm](https://github.com/metal-stack/metal-ccm).

## Example

An example `ControllerRegistration` resource that can be used to register this controller to Gardener can be found in [`example/controller-registration.yaml`](https://github.com/metal-stack/gardener-extension-provider-metal/blob/master/example/controller-registration.yaml).

## Development

Development currently needs to happen against a real environment because there are many dependencies to external APIs for reconciliation. It is planned to allow development in the [mini-lab](https://github.com/metal-stack/mini-lab) soon.

## Feedback and Support

Feedback and contributions are always welcome! Please report bugs or suggestions as [GitHub issues](https://github.com/metal-stack/gardener-extension-provider-metal/issues) or reach out to our [community](https://metal-stack.io/community).
