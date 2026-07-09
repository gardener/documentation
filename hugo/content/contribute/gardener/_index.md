---
description: Developer documentation for the Gardener project
github_repo: 'https://github.com/gardener/documentation'
github_subdir: hugo/content/contribute/gardener
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/contribute/gardener/_index.md
  to: _index.md
title: Gardener
weight: 30
prev: false
next: false
local: true
---

# Gardener

This section contains the developer documentation for core Gardener functionality.

Before diving in, check out the [Developer Starter Kit](/contribute/developer-starter-kit/). There you can learn how to set up your local environment and get familiar with the general development guidelines for Gardener.

- [Releases, Features, Hotfixes](/contribute/gardener/process/)
- [Checklist For Adding New Components](/contribute/gardener/component-checklist/)
- [High Availability of Deployed Components](/contribute/gardener/high-availability-of-components/)
- [Autoscaling Specifics for Components](/contribute/gardener/autoscaling-specifics-for-components/)
- [`PriorityClass`es in Gardener Clusters](/contribute/gardener/priority-classes/)
- [Secrets Management for Seed and Shoot Cluster](/contribute/gardener/secrets_management/)
- [Reversed VPN Tunnel Setup and Configuration](/contribute/gardener/reversed-vpn-tunnel/)
- [IPv6 in Gardener Clusters](/contribute/gardener/ipv6/)
- [Shoot Advertised Addresses](/contribute/gardener/shoot-advertised-addresses/)
- [The Logging Stack in Gardener](/contribute/gardener/logging-stack/)
- [Creating Log Parsers for fluent-bit](/contribute/gardener/log_parsers/)
- [Adding Support For a New Kubernetes Version](/contribute/gardener/new-kubernetes-version/)
- [Removing Support For a Kubernetes Version](/contribute/gardener/remove-support-for-kubernetes-version/)
- [Adding a New Cloud Provider](/contribute/gardener/new-cloud-provider/)
- [Extending the Monitoring Stack](/contribute/gardener/monitoring-stack/)
