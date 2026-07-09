---
github_repo: 'https://github.com/gardener/documentation'
github_subdir: hugo/content/docs/getting-started/observability
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/getting-started/observability/_index.md
  to: _index.md
title: Observability
weight: 7
prev: false
next: false
local: true
---

## Overview

Gardener offers out-of-the-box observability for the control plane, Gardener managed system-components, and the nodes of a shoot cluster.

Having your workload survive on day 2 can be a challenge. The goal of this topic is to give you the tools with which to observe, analyze, and alert when the control plane or system components of your cluster become unhealthy. This will let you guide your containers through the storm of operating in a production environment.
