---
description: >-
  Gardener extension controller which deploys a fluent-bit based audit log
  forwarder for shoot clusters.
github_repo: 'https://github.com/metal-stack/gardener-extension-audit'
github_subdir: .
params:
  github_branch: main
path_base_for_github_subdir:
  from: content/docs/extensions/others/gardener-extension-audit/_index.md
  to: README.md
title: Audit
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
   https://github.com/metal-stack/gardener-extension-audit/blob/main/./README.md
-->


# Gardener Extension Audit

[![GitHub License](https://img.shields.io/github/license/metal-stack/gardener-extension-audit)](https://github.com/metal-stack/gardener-extension-audit/blob/main/LICENSE)
[![Build](https://github.com/metal-stack/gardener-extension-audit/actions/workflows/build.yaml/badge.svg)](https://github.com/metal-stack/gardener-extension-audit/actions/workflows/build.yaml)

[Project Gardener](https://gardener.cloud/) implements the automated management and operation of [Kubernetes](https://kubernetes.io/) clusters as a service. This controller implements Gardener's extension contract to manage kube-apiserver audit logs for a shoot cluster.

The extension spins up a fluent-bit-based audit sink in the seed's shoot namespace prior to starting the shoot's API server. Therefore, it is required to run this extension with the reconcile lifecycle policy `BeforeKubeAPIServer`. Also the deletion has to happen `BeforeKubeAPIServer` as otherwise the managed resources of this extension block the shoot deletion flow.

This sink has the ability to buffer audit logs to a persistent volume and send them to the supported backends.

It reconciles the `Extension` resources of `type: audit`.

For more detailed documentation about the extension contract, please refer to the [Gardener docs](/docs/gardener/extensions/).

## Specifying An Audit Policy

A custom audit policy can be natively configured by Gardener in the shoot spec's API server configuration under `.spec.kubernetes.kubeAPIServer.auditConfig.auditPolicy.configMapRef.name`.

## Supported Backends

- Splunk
- S3
- Log (just logs to the container, only for devel-purposes)
- Cluster Forwarding (forwards audit logs into a pod in the shoot cluster)

> [!IMPORTANT]
> The Cluster Forwarding backend is mainly intended for showcasing and not for production purposes. It is known not to work with Gardener HA VPN Control Planes. If required, this feature can be disabled using the annotation `alpha.control-plane.shoot.gardener.cloud/high-availability-vpn: "false"`. In addition to that, there were issues reported when using it in combination with the Cilium CNI configured kubeproxyless with Native-Routing (audit entries do not arrive at the `audittailer` pod).

## Example

An example `ControllerRegistration` resource that can be used to register this controller to Gardener can be found [here](https://github.com/metal-stack/gardener-extension-audit/blob/main/example/controller-registration.yaml).

## Development

This extension can be developed in the gardener-local devel environment.

1. Start up the local devel environment
1. The extension's docker image can be pushed into Kind using `make push-to-gardener-local`
1. Install the extension `kubectl apply -k example/`
1. Parametrize the `example/shoot.yaml` and apply with `kubectl -f example/shoot.yaml`

## Feedback and Support

Feedback and contributions are always welcome! Please report bugs or suggestions as [GitHub issues](https://github.com/metal-stack/gardener-extension-audit/issues) or reach out to our [community](https://metal-stack.io/community).
