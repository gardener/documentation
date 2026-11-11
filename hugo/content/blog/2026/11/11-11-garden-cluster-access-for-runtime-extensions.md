---
title: "Garden Cluster Access for Runtime Extensions"
linkTitle: "Garden Cluster Access for Runtime Extensions"
newsSubtitle: November 11, 2026
publishdate: 2026-11-11
authors:
- avatar: https://avatars.githubusercontent.com/timuthy
  login: timuthy
  name: Tim Usner
tags:
- feature-announcement
- security
- technical-deep-dive
aliases: ["/blog/2026/11/11/garden-cluster-access-for-runtime-extensions"]
---

Gardener extensions frequently need to talk to the Garden cluster's API server — to read and write resources that drive their reconciliation. Until now, only a subset of components could obtain such access automatically. With Gardener `v1.155`, we laid the groundwork to close that gap and let extensions running in the runtime cluster request a Garden cluster kubeconfig just like everyone else.

## How Garden Cluster Access Works Today

Components that need to reach the Garden cluster receive a short-lived token through a dedicated access `Secret` in the `garden` namespace. A `TokenRequestor` controller issues the token, continuously refreshes it, and writes it back into the `Secret` so the consuming component always holds valid credentials.

This mechanism already served admission controllers in the runtime cluster and extensions running in seed clusters. Extensions deployed into the runtime cluster itself, however, were left out: their namespaces (`runtime-extension-<name>`) were never reconciled by the controller responsible for issuing the tokens.

## Why Runtime Extensions Were Left Out

The `TokenRequestor` responsible for Garden cluster access ran inside the Gardener Resource Manager, whose cache — and therefore its reconciliation scope — is limited to the `garden` namespace and a set of explicitly configured namespaces. Extending that scope to the dedicated extension namespaces was undesirable, because the Gardener Resource Manager serving those namespaces would carry other, unwanted implications.

## What Changed in `v1.155`

To solve this, the `TokenRequestor` controller for Garden cluster access was moved from the Gardener Resource Manager to the **Gardener Operator**. The Operator is not constrained to a fixed set of namespaces, so it can now process token requests originating from any namespace — including the runtime extension namespaces. This mirrors the architecture already used by the `gardenlet`, which runs its own `TokenRequestor` for the same purpose.

Alongside the move, the access `Secret`s were renamed from `shoot-access-<component>` to `garden-access-<component>`. The previous naming was a historical artifact — the code powering Garden cluster access was originally borrowed from the shoot control plane — and the new name makes the intent unmistakable: these credentials grant access to the Garden cluster.

## Migrating Smoothly

Existing setups are migrated without manual intervention. On startup, the Gardener Operator reconciles the new `garden-access-<component>` `Secret`s and cleans up the stale `shoot-access-<component>` ones.

The token's class label transitions in two steps. In `v1.155` it uses an intermediate `garden-transitioner` class to keep the migration safe; a future release switches it to the final `garden` class. The old `TokenRequestor` in the Gardener Resource Manager — which honors the deprecated `shoot` class — keeps running for nine more Gardener releases before it is removed, giving extension maintainers a generous window to adopt the new `garden` class as part of the extension contract.

## What's Next

The change in `v1.155` is the prerequisite. The feature it unlocks — injecting a Garden cluster kubeconfig into extensions running in the runtime cluster via a simple `injectGardenKubeconfig` configuration — is expected to land in the next Gardener release. Once available, enabling it is a single configuration switch, after which the Operator takes care of provisioning the access `Secret`, the kubeconfig, and the corresponding volume mounts automatically.

## Learn More

- [Review Meeting Recording (v1.155)](https://youtu.be/xd8jeO7bk_A?t=444)
- [Add `TokenRequestor` Controller to Gardener Operator (#15940)](https://github.com/gardener/gardener/pull/15940)
- [Garden Kubeconfigs for Extensions (#15617)](https://github.com/gardener/gardener/issues/15617)
- [Using `gardenlet`-managed Garden access](https://github.com/gardener/gardener/blob/master/docs/extensions/garden-api-access.md#using-gardenlet-managed-garden-access)
