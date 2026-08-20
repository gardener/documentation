---
title: How do you rotate IaaS keys for a running cluster?
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


# How do you rotate IaaS keys for a running cluster?

End-users must provide credentials such that Gardener and Kubernetes controllers can communicate with the respective cloud provider APIs in order to perform infrastructure operations. These credentials should be regularly rotated.

How to do so is explained in [Shoot Credentials Rotation](/docs/gardener/shoot-operations/shoot_credentials_rotation/#cloud-provider-keys).
