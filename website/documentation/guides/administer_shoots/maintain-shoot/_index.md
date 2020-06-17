---
title: Shoot Cluster Maintenance
description: "Understanding and configuring Gardener's Day-2 operations for Shoot clusters."
type: tutorial-page
level: advanced
index: 5
category: Operation
scope: operator
aliases: ["readmore/shoot-maintain"]
---

# Shoot Cluster Maintenance

Day two operations like updating the Kubernetes patch version and updating the Operating system version, happen in a daily maintenance time window of the Shoot cluster. The maintenance time window is part of the shoot spec (`.spec.maintenance.timeWindow`). If it is not specified during Shoot creation, Gardener will default to a randomized time window (to spread the load). The time interval cannot be less than 30 minutes and more than 6 hours.

When referring to an `operating system update` in this document, this means updating the Shoot's worker nodes with a machine image (e.g. [AMI](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html) for AWS) that comes with a higher version of the operating system.

During the maintenance, the Gardener Controller Manager updates the Shoot's Kubernetes and operating system versions.

A version is updated if either:
 - there is a higher [semantic version](http://semver.org/) available in the CloudProfile and the Shoot opts-in for [automatic version updates](https://github.com/gardener/gardener/blob/master/docs/usage/shoot_maintenance.md#automatic-version-updates). See [automatic Kubernetes version updates](#automatic-kubernetes-version-updates) and [automatic Operating System version updates](#automatic-operating-system-version-updates).
 - the currently used version is `expired`. See [forceful version updates](#forceful-version-updates).

A version update during the maintenance time triggers a Shoot reconciliation.

{{% notice tip %}}
<p>To manually trigger the maintenance operation, the Shoot can be annotated with `gardener.cloud/operation: maintain`.</p>
{{% /notice %}}

### Version Classifications

Gardener classifies versions into `preview`,`supported`, `deprecated` and `expired`.
Please see [here for more information](https://github.com/gardener/gardener/blob/master/docs/usage/shoot_versions.md#version-classifications).
Gardener takes version classifications into account during the maintenance operations as part of the efforts to ensure stable version updates without negatively impacting the workload deployed in the cluster.
As such, `preview` versions are excluded from updates during the maintenance.
This is because `preview` versions are typically recently releases version that have not yet undergone thorough testing and may contain bugs or security issues.

### Automatic Kubernetes Version Updates

If a Shoot is configured for automatic Kubenernetes version updates by setting `.spec.maintenance.autoUpdate.kubernetesVersion: true`, Gardener keeps the Kubernetes version of the Shoot up to date. During the daily maintenance time window, the Shoot's Kubernetes version is updated to the latest non-`preview` classified [patch version](https://github.com/kubernetes/community/blob/master/contributors/design-proposals/release/versioning.md#patch-releases) available in the associated `CloudProfile` (`spec.cloudProfileName`). The `CloudProfile` specifies the available Kubernetes versions in `.spec.kubernetes.versions`. 

It will never auto update the Major releases since Kubernetes does not garuantee backward compatibility and updateability in those releases. While this is also true for minor versions, (forceful minor version updates)[#forceful-version-updates] can  happen during the maintenance time window (even though specifying `.spec.maintenance.autoUpdate.kubernetesVersion: false`).

Consider a Shoot cluster with the field values below (only related fields are shown):

```yaml
spec:
  kubernetes:
    version: 1.10.0
  maintenance:
    timeWindow:
      begin: 220000+0000
      end: 230000+0000
    autoUpdate:
      kubernetesVersion: true
```

Updating the CloudProfile used in the Shoot by adding `1.10.5` and `1.11.0` to the `.spec.kubernetes.versions` list, automatically updates the Shoot to `1.10.5` between 22:00-23:00 UTC. The Shoot won't be automatically updated to `1.11.0` even though its the highest Kubernetes version in the `CloudProfile`. This is because that wouldn't be a patch release update but a minor release update, and as such potentially have breaking changes that could impact the deployed workload/applications.

In this example if the operator wants to update the Kubernetes version to `1.11.0`, he/she must update the Shoot's `.spec.kubernetes.version` to `1.11.0` manually.

Besides automatic versioning during the maintenance time, version updates can also be handled by updating the `.spec.kubernetes.version` field manually. In the above example, if the operator wants to update the Kubernetes version to `1.11.0`, he/she can update the Shoot's `.spec.kubernetes.version` to `1.11.0` manually. 

These updates will either be executed immediately (default) or can be [confined to the maintenance time window](https://github.com/gardener/gardener/blob/master/docs/usage/shoot_maintenance.md#confine-specification-changesupdates-roll-out).
Choosing the latter option, causes changes to the cluster (e.g. node pool rolling-updates) and the subsequent reconciliation, to only predictably happen during a defined time window. This is available since [Gardener version 1.4](https://github.com/gardener/gardener/releases/tag/v1.4.0).
**Before applying such update on minor or major releases, operators should check for all the breaking changes introduced in the target Kubernetes release changelog**.

### Automatic Operating System Version Updates

If a Shoot is configured for automatic Kubenernetes version updates by setting `.spec.maintenance.autoUpdate.machineImageVersion: true`, then during the maintenance time window, the Gardener makes sure that the Shoot is using the most recent patch version of the operating system.
An update to the operating system of a worker pool in the Shoot cluster causes the Shoot to be reconciled.

During the reconciliation, the corresponding `<Provider>MachineClass` resource in the Shoot namespace in the Seed will be updated and the machine controller manager will take care of the actual state to match the desired one.

{{% notice note %}}
<p>Please note, that in contrast to the Kubernetes version update, the Operating System always updates to the latest version available in the `CloudProfile`.</p>
{{% /notice %}}


### Forceful Version Updates

While the [automatic Kubernetes](#kubernetes-automatic-version-updates) and [operating system updates](#automatic-operating-system-version-updates), are an opt-in feature for the Shoot cluster owner, Gardener administrators can force patch and minor version updates.

Forceful updates are triggered by an `expiration date` in the past for the Kubernetes or Operating System versions in the `CloudProfile`. 
Whilst an administrator should [classify a version having an expiration date as `deprecated`](#version-classifications), such a labeling is not evaluated for the force update.

Version expiration dates allow smoother transitions for Shoot owners giving them time for testing before the actual forceful version update happens. 

{{% notice note %}}
<p>Please note, that specifying an `expiration date` for the latest version in the `CloudProfile` is not allowed.</p>
{{% /notice %}}

Just like automatic version updates, forceful updates are only applied during the next maintenance time window.

#### Force Version Updates for Kubernetes Versions

The following scenarios exemplify the automatic patch update from an expired Kubernetes version.

- Forceful patch version update from expired Kubernetes version.

Let's assume the following CloudProfile spec (only related fields are shown):

```yaml
spec:
  kubernetes:
    versions:
    - version: 1.12.8
    - version: 1.11.10
    - version: 1.10.13
    - version: 1.10.12
      expirationDate: "2019-04-13T08:00:00Z"
```

And the Shoot has the following spec:

```yaml
spec:
  kubernetes:
    version: 1.10.12
  maintenance:
    timeWindow:
      begin: 220000+0100
      end: 230000+0100
    autoUpdate:
      kubernetesVersion: false
```

The Shoot refers to a Kubernetes version that has an `expirationDate`. In the maintenance window on 2019-04-12 the Kubernetes version will stay the same as it is still not expired. But in the maintenance window on 2019-04-14 the Kubernetes version of the Shoot will be updated to `1.10.13` (no matter the value of `.spec.maintenance.autoUpdate.kubernetesVersion`). As long as there is a higher patch version available, the Cluster is always updated to the highest patch version.

- Forceful minor version update from expired Kubernetes version.

Starting with [Gardener version 1.4](https://github.com/gardener/gardener/releases/tag/v1.4.0), Shoot clusters can receive forceful minor updates when using an expired Kubernetes version.
Minor version updates are only performed if the version is the **latest** patch version of the minor version, having an `expiration date` in the past.

Let's assume the following CloudProfile spec (only related fields are shown):
```yaml
spec:
  kubernetes:
    versions:
    - version: 1.12.8
    - version: 1.11.10
    - version: 1.11.09
    - version: 1.10.12
      expirationDate: "2019-04-13T08:00:00Z"
```

The Shoot has the following spec:

```yaml
spec:
  kubernetes:
    version: 1.10.12
  maintenance:
    timeWindow:
      begin: 220000+0100
      end: 230000+0100
    autoUpdate:
      kubernetesVersion: false
```

The Shoot refers to a Kubernetes version that has an `expirationDate`. In the maintenance window on 2019-04-14 the Kubernetes version of the Shoot will be updated to `1.11.10`. This is the highest patch version of the consecutive minor version.

Kubernetes "minor version jumps" are not allowed - meaning to skip the update to the consecutive minor version but directly updating to any version after that.
In the example above, the version `1.10.x` can only update to a version `1.11.x`, not to `1.12.x` or any other version.
This is because Kubernetes does not guarantee updateability in this case, leading to possibly broken Shoot clusters.
The administrator has to set up the `CloudProfile` in such a way, that consecutive Kubernetes minor versions are available. Otherwise, Shoot clusters will fail to update during the maintenance time.

{{% notice note %}}
<p>Please note, that multiple consecutive minor version updates are possible. This can occur if the Shoot is updated to a version that in turn is also `expired`. In this case, the version is again updated in the **next** maintenance time.</p>
{{% /notice %}}

#### Force Version Updates for Operating System Versions

In the same fashion as automatic version updates, force Operating System updates are applied per Worker pool and updates to the Operating System are always performed to the latest version available in the `CloudProfile`. 

- Forceful update from expired operating system version.

Let's assume the following CloudProfile spec (only related fields are shown):

```yaml
spec:
  machineImages:
  - name: coreos
    versions:
    - version: 2191.5.0
    - version: 2191.4.1
    - version: 2135.6.0
      expirationDate: "2019-04-13T08:00:00Z"
```

The Shoot has the following spec:

```yaml
spec:
  provider:
    type: aws
    workers:
    - name: name
      maximum: 1
      minimum: 1
      maxSurge: 1
      maxUnavailable: 0
      image:
        name: coreos
        version: 2135.6.0
        type: m5.large
      volume:
        type: gp2
        size: 20Gi
  maintenance:
    timeWindow:
      begin: 220000+0100
      end: 230000+0100
    autoUpdate:
      machineImageVersion: false
```

The Shoot refers to an operating system version that has an `expirationDate`. 
In the maintenance window on 2019-04-12 the machine image version will stay the same as it is still not expired. 
But in the maintenance window on 2019-04-14 the machine image version of the Shoot will be updated to `2191.5.0` (no matter the value of `.spec.maintenance.autoUpdate.machineImageVersion`) as version `2135.6.0` is already expired.