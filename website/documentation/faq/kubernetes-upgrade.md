---
title: Upgrading Kubernetes Versions
aliases:
  - /docs/faq/automatic-upgrade/
prev: false
next: false
---

# Upgrading Kubernetes Versions

## How can I upgrade my cluster versions?

Upgrading your shoot cluster version can be done manually or by pressing the *Upgrade* button in the Dashboard.

In order to manually update your cluster, you need to change the value of `kubernetes.version` in your shoot spec. Some specifics:

- You must only increment by one minor version (`01.XX.01`) at a time. Supported versions can be found in your garden cluster's cloud profile.
- You can increment by as many patch versions (`01.01.XX`) as you would like at once.
- Once your cluster has been upgraded, you cannot rollback to a previous version.

> [!WARNING]
> Before updating a cluster, you should be aware of the [potential errors this might cause](https://github.com/gardener/gardener/blob/master/docs/usage/shoot/shoot_kubernetes_versions.md).

The following video will dive into a Kubernetes outage in production that Monzo experienced, its causes and effects, and the architectural and operational lessons learned.

<iframe width="560" height="315" src="https://www.youtube.com/embed/OUYTNywPk-s" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

It is therefore recommended to first update your test cluster and validate it before performing changes on a productive environment.

## Can Kubernetes upgrade automatically?

There is no automatic migration of major/minor versions of Kubernetes. You need to [update your clusters manually](#how-can-i-upgrade-my-cluster-versions) or press the *Upgrade* button in the Dashboard.
