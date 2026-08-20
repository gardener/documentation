---
title: Reconciliation
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


# Reconciliation

## What is impacted during a reconciliation?

Infrastructure and DNSRecord reconciliation are only done during usual reconciliation if there were relevant changes. Otherwise, they are only done during maintenance.

## How do you steer a reconciliation?

Reconciliation is bound to the maintenance time window of a cluster. This means that your shoot will be reconciled regularly, without need for input.

Outside of the maintenance time window your shoot will only reconcile if you change the specification or if you explicitly trigger it. To learn how, see [Trigger shoot operations](/docs/gardener/shoot-operations/shoot_operations/).
