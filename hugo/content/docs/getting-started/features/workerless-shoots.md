---
title: Workerless Shoots
weight: 2
prev: false
next: false
---
<!-- BANNER:LOCAL -->
<!--
   █▀█ █▄▀
   █ █ █▀▄
   ▀▀▀ ▀ ▀

   ┌────────────────────────────────────────────────┐
   │  LOCAL FILE — maintained in gardener/            │
   │  documentation.                                  │
   │                                                  │
   │  Go ahead and edit this file directly.           │
   │  Changes here are the source of truth.           │
   └────────────────────────────────────────────────┘
-->


# Workerless Shoots

## Controlplane as a Service

![workerless-shoots](/docs/getting-started/features/images/workerless-shoots.webp)

Sometimes, there may be use cases for Kubernetes clusters that don't require pods but only features of the control plane. Gardener can create the so-called "workerless" shoots, which are exactly that. A Kubernetes cluster without nodes (and without any controller related to them).

In a scenario where you already have multiple clusters, you can use it for orchestration (leases) or factor out components that require many CRDs.

As part of the control plane, the following components are deployed in the seed cluster for workerless shoot:

- etcds
- kube-apiserver
- kube-controller-manager
- gardener-resource-manager
- Logging and monitoring components
- Extension components (to find out if they support workerless shoots, see the [Extensions](/docs/gardener/extensions/resources/extension/#what-is-required-to-register-and-support-an-extension-type) documentation)
