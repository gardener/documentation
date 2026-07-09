---
github_repo: 'https://github.com/gardener/gardener'
github_subdir: docs/extensions
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/gardener/extensions/heartbeat.md
  to: heartbeat.md
title: Heartbeat
prev: false
next: false
managed: true
---

# Heartbeat Controller

The heartbeat controller renews a dedicated `Lease` object named `gardener-extension-heartbeat` at regular 30 second intervals by default. This `Lease` is used for heartbeats similar to how `gardenlet` uses `Lease` objects for seed heartbeats (see [gardenlet heartbeats](/docs/gardener/concepts/gardenlet/#heartbeats)).

The `gardener-extension-heartbeat` `Lease` can be checked by other controllers to verify that the corresponding extension controller is still running. Currently, `gardenlet` checks this `Lease` when performing shoot health checks and expects to find the `Lease` inside the namespace where the extension controller is deployed by the corresponding `ControllerInstallation`. For each extension resource deployed in the Shoot control plane, `gardenlet` finds the corresponding `gardener-extension-heartbeat` `Lease` resource and checks whether the `Lease`'s `.spec.renewTime` is older than the allowed threshold for stale extension health checks - in this case, `gardenlet` considers the health check report for an extension resource as "outdated" and reflects this in the `Shoot` status.
