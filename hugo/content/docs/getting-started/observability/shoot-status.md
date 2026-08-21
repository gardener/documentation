---
github_repo: 'https://github.com/gardener/documentation'
github_subdir: hugo/content/docs/getting-started/observability
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/getting-started/observability/shoot-status.md
  to: shoot-status.md
title: "Shoot Status"
weight: 3
prev: false
next: false
local: true
---

# Shoot Status

## Overview

In this topic you can see various shoot statuses and how you can use them to monitor your shoot cluster.

## Conditions

You can retrieve the shoot status by using `kubectl get shoot -o yaml`

It contains conditions that give you information about the health of your cluster. These conditions are also forwarded to the Gardener dashboard and show your cluster as healthy or unhealthy.

<img style="width: 60%; height: auto; margin: 0, auto" alt="shoot-status-1" src="/docs/getting-started/observability/images/shoot-status-1.webp"/>

## Constraints

The shoot status also contains constraints. If any of these constraints has the status `False`, your cluster operations will be impaired and the cluster is likely to fail at some point. Please watch them and act accordingly.

<img style="width: 60%; height: auto; margin: 0, auto" alt="shoot-status-2" src="/docs/getting-started/observability/images/shoot-status-2.webp"/>

## Last Operation

The `lastOperation`, `lastErrors`, and `lastMaintenance` give you information on what was last happening in your clusters. This is especially useful when you are facing an error.

In this example, nodes are being recreated and not all machines have reached the desired state yet.

<img style="width: 60%; height: auto; margin: 0, auto" alt="shoot-status-3" src="/docs/getting-started/observability/images/shoot-status-3.webp"/>

## Credentials Rotation

You can also see the status of the last credentials rotation. Here you can also programmatically derive when the last rotation was done in order to schedule the next rotation.

<img style="width: 60%; height: auto; margin: 0, auto" alt="shoot-status-4" src="/docs/getting-started/observability/images/shoot-status-4.webp"/>
