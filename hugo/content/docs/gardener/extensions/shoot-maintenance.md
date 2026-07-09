---
github_repo: 'https://github.com/gardener/gardener'
github_subdir: docs/extensions
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/gardener/extensions/shoot-maintenance.md
  to: shoot-maintenance.md
title: Shoot Maintenance
prev: false
next: false
managed: true
---

# Shoot Maintenance

There is a general [document about shoot maintenance](/docs/gardener/shoot/shoot_maintenance/) that you might want to read.
Here, we describe how you can influence certain operations that happen during a shoot maintenance.

## Restart Control Plane Controllers

As outlined in the above linked document, Gardener offers to restart certain control plane controllers running in the seed during a shoot maintenance.

Extension controllers can extend the amount of pods being affected by these restarts.
If your Gardener extension manages pods of a shoot's control plane (shoot namespace in seed) and it could potentially profit from a regular restart, please consider labeling it with `maintenance.gardener.cloud/restart=true`.
