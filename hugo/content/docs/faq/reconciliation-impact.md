---
github_repo: 'https://github.com/gardener/documentation'
github_subdir: hugo/content/docs/faq
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/faq/reconciliation-impact.md
  to: reconciliation-impact.md
title: Reconciliation
prev: false
next: false
local: true
---

# Reconciliation

## What is impacted during a reconciliation?

Infrastructure and DNSRecord reconciliation are only done during usual reconciliation if there were relevant changes. Otherwise, they are only done during maintenance.

## How do you steer a reconciliation?

Reconciliation is bound to the maintenance time window of a cluster. This means that your shoot will be reconciled regularly, without need for input.

Outside of the maintenance time window your shoot will only reconcile if you change the specification or if you explicitly trigger it. To learn how, see [Trigger shoot operations](/docs/gardener/shoot-operations/shoot_operations/).
