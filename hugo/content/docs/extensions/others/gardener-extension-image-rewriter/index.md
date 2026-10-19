---
description: >-
  Gardener extension controller which rewrites container image references in
  shoot clusters.
github_repo: 'https://github.com/gardener/gardener-extension-image-rewriter'
github_subdir: .
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/extensions/others/gardener-extension-image-rewriter/_index.md
  to: README.md
title: Image Rewriter
weight: 100
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
   https://github.com/gardener/gardener-extension-image-rewriter/blob/master/./README.md
-->


# Gardener Extension for Image Rewrites

[![REUSE status](https://api.reuse.software/badge/github.com/gardener/gardener-extension-image-rewriter)](https://api.reuse.software/info/github.com/gardener/gardener-extension-image-rewriter)

This project provides a Gardener extension that replaces pod image references for **system components** of shoot clusters.
Additionally, it can handle mirror configuration for containerd.

## Components

- Mutating webhook for shoots to replace image references of `Pod`s running in the `kube-system` namespace.
- Mutating webhook for seeds to replace image references in `OperatingSystemConfig` resources.
- Mutating webhook for seeds to add containerd configuration to `OperatingSystemConfig` resources.

## Configuration

A separate configuration file is used to define the image rewrites. Please see [here](https://github.com/gardener/gardener-extension-image-rewriter/blob/master/example/00-componentconfig.yaml) for an example.
