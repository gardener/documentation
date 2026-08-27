---
github_repo: 'https://github.com/gardener/dependency-watchdog'
github_subdir: docs/deployment
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/other-components/dependency-watchdog/deployment/monitor.md
  to: monitor.md
title: Monitor
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
   https://github.com/gardener/dependency-watchdog/blob/master/docs/deployment/monitor.md
-->


# Monitoring

## *Work In Progress*

We will be introducing metrics for `Dependency-Watchdog-Prober` and `Dependency-Watchdog-Weeder`. These metrics will be pushed to prometheus. Once that is completed we will provide details on all the metrics that will be supported here.
