---
description: >-
  Gardener extension controller for the Debian/Ubuntu operating system on
  metal-stack
github_repo: 'https://github.com/metal-stack/os-metal-extension'
github_subdir: .
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/extensions/os-extensions/os-metal-extension/_index.md
  to: README.md
title: Debian/Ubuntu (metal-stack)
weight: 20
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
   https://github.com/metal-stack/os-metal-extension/blob/master/./README.md
-->


# os-metal-extension

[![GitHub License](https://img.shields.io/github/license/metal-stack/os-metal-extension)](https://github.com/metal-stack/os-metal-extension/blob/master/LICENCE)
[![Build](https://github.com/metal-stack/os-metal-extension/actions/workflows/build.yaml/badge.svg)](https://github.com/metal-stack/os-metal-extension/actions/workflows/build.yaml)

This controller operates on the [`OperatingSystemConfig`](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md#cloud-config-user-data-for-bootstrapping-machines) resource in the `extensions.gardener.cloud/v1alpha1` API group. It manages those objects that are requesting:

- [Ubuntu](https://www.ubuntu.com/) configuration (`.spec.type=ubuntu`)
- [Debian](https://www.debian.org/) configuration (`.spec.type=debian`)

In comparison to the official OSC extensions from Gardener, this extension transforms the `OperatingSystemConfig` resources into [Ignition](https://www.flatcar.org/docs/latest/provisioning/ignition/) userdata. This userdata can be applied during machine provisioning as done by the metal-stack project.

This extension was made for working with operating system images built in the [metal-images](https://github.com/metal-stack/metal-images) repository.

## Example

An example `ControllerRegistration` resource that can be used to register this controller to Gardener can be found [here](https://github.com/metal-stack/os-metal-extension/blob/master/example/controller-registration.yaml).

## Development

Development currently needs to happen against a real environment because there are many dependencies to external APIs for reconciliation. It is planned to allow development in the [mini-lab](https://github.com/metal-stack/mini-lab) soon.

## Feedback and Support

Feedback and contributions are always welcome! Please report bugs or suggestions as [GitHub issues](https://github.com/metal-stack/os-metal-extension/issues) or reach out to our [community](https://metal-stack.io/community).
