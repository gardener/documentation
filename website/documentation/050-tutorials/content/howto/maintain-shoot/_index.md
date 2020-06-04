---
title: Shoot Cluster Maintenance
description: "Maintain a Shoot cluster"
type: tutorial-page
level: advanced
index: 5
category: Operation
scope: operator
aliases: ["readmore/shoot-maintain"]
---

# Shoot Cluster Maintenance

Day two operations for shoot clusters are related to:

* The Kubernetes version of the control planes and the worker nodes and
* the operating system version of the worker nodes. 

The following table summarizes what options Gardener offers to maintain these versions:

|     |   Managed updates*  |  Manual updates  | 
|:----|:----|:----|
| Kubernetes version | Patches only | yes |
| Machine Image (node OS) |  yes | yes |

\* Gardener offers _auto-update_ and _expiration dates_ to manage updates automatically.

## Possible Target Versions 

Administrators maintain possible target versions that you can update to in the `CloudProfile` for each IaaS-Provider. Users with access to a Gardener project can check supported target versions with:
```
kubectl get cloudprofile [IAAS-SPECIFIC-PROFILE] -o yaml
```

| Path |  Description  |  More information |
|:-----|:-----|:-----|
|`spec.kubernetes.versions`| The supported Kubernetes version `major.minor.patch`. | [Patch releases](https://github.com/kubernetes/community/blob/master/contributors/design-proposals/release/versioning.md#patch-releases)|
|`spec.machineImages`| The supported operating systems for Kubernetes nodes. | 

### Kubernetes Patch Version

Since Kubernetes follows Semantic Versioning, if indicated so, Gardener can automatically apply patch release updates. But it never updates the major or minor releases automatically since there’s no effort to keep backward compatibility in those releases. More information: [Semantic Versioning](http://semver.org/).

> Major or minor updates must be handled manually. Before applying such updates, check for all the breaking changes introduced in the target release changelog.

## Let Gardener manage your updates

### The Maintenance Window

Gardener can manage updates for you automatically. It offers users to specify a _maintenance window_ during which updates are scheduled:

* The time interval of the maintenance window can’t be less than 30 minutes or more than 6 hours.
* If there’s no maintenance window specified during the creation of a shoot cluster, Gardener chooses a maintenance window randomly to spread the load. 

You can either specify the maintenance window in the shoot spec (`.spec.maintenance.timeWindow`) or the start time of the maintenance window using the Gardener dashboard (**CLUSTERS** > **[YOUR-CLUSTER]** > **OVERVIEW** > **Lifecycle** > **Maintenance**).

### Auto-Update and Expiration Dates

To trigger updates during the maintenance window automatically, Gardener offers the following methods:

* _Auto-update_: <br>Gardener starts an update during the next maintenance window whenever there’s a version available in the `CloudProfile` that is higher than the one of your shoot cluster specification. For Kubernetes versions, auto-update only updates to higher patch levels.
  
  You can either activate auto-update on the Gardener dashboard (**CLUSTERS** > **[YOUR-CLUSTER]** > **OVERVIEW** > **Lifecycle** > **Maintenance**) or in the shoot cluster specification:
  
  *  `.spec.maintenance.autoUpdate.kubernetesVersion: true`
  *  `.spec.maintenance.autoUpdate.machineImageVersion: true`

* _Expiration dates_: <br>In the maintenance window, Gardener compares the current version given in the shoot cluster specification with the version list in the `CloudProfile`. If the version has an expiration date and if it's before the start of the maintenance window, Gardener starts an update to the highest version available in the `CloudProfile`. For Kubernetes versions, Gardener only updates to higher patch levels. The highest version in `CloudProfile` can’t have an expiration date.

If you don’t want to wait for the next maintenance window, you can annotate the `Shoot` specification with `shoot.gardener.cloud/operation: maintain`. Gardener then checks immediately if there’s an auto-update or an update based on expiration dates needed.

> Managed updates using expiration dates are even executed if the auto-update for the Kubernetes version, or the auto-update for the machine image version is deactivated (set to `false`).

With expiration dates, administrators can give shoot cluster owners more time for testing before the actual version update happens, which allows smoother transitions to new versions.

## Manual Updates

To update the Kubernetes version or the node operating system manually, change the `.spec.kubernetes.version` field or the `.spec.provider.workers.machine.image.version` field correspondingly. Manual updates are triggered immediately and don’t wait for the maintenance time window.

Manual updates are required if you would like to do a minor update or a major update of the Kubernetes version. Gardener doesn’t do such updates automatically as they can have breaking changes that could impact your deployed resources.

## Examples

In the examples for the `CloudProfile` and the `Shoot` specification, only the fields relevant for the example are shown.

### Auto-Update of Kubernetes Version

Let's assume Kubernetes version `1.10.5` and `1.11.0` were added in the following `CloudProfile`:

```yaml
spec:
  kubernetes:
    versions:
    - version: 1.11.0
    - version: 1.10.5
    - version: 1.10.0
```

Before this change, your shoot cluster specification looked like this:

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

As a consequence, the shoot cluster is updated to Kubernetes version  `1.10.5` between 22:00-23:00 UTC. Your `Shoot` isn't updated automatically to `1.11.0` even though it's the highest Kubernetes version in the `CloudProfile`, because Gardener does only do automatic updates of the Kubernetes patch level.

### Patch Update Due to Expired Kubernetes Version

Let's assume the following `CloudProfile`:

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

Let's assume the `Shoot` has the following specification:

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

The `Shoot` specification refers a Kubernetes version that has an `expirationDate`. In the maintenance window on `2019-04-12`, the Kubernetes version stays the same as it’s still not expired. But in the maintenance window on `2019-04-14` the Kubernetes version of the shoot cluster is updated to `1.10.13` (independently of the value of `.spec.maintenance.autoUpdate.kubernetesVersion`).

### Automatic Patch Update from Dropped Kubernetes Version:

Let's assume the following `CloudProfile`:

```yaml
spec:
  kubernetes:
    versions:
    - version: 1.12.8
    - version: 1.11.10
    - version: 1.10.13
```

Let's assume the `Shoot` has the following specification:

```yaml
spec:
  kubernetes:
    version: 1.10.12
  maintenance:
    timeWindow:
      begin: 220000+0100
      end: 230000+0100
    autoUpdate:
      kubernetesVersion: true
```

The `Shoot` specification refers a Kubernetes version that was dropped from the `CloudProfile`. In the upcoming maintenance window, the Kubernetes version of the shoot cluster is updated to the next patch version `1.10.13`. In the `Shoot` specification, `.spec.maintenance.autoUpdate.kubernetesVersion` must be true, otherwise no version update is triggered.

### Automatic Update from Expired Machine Image Version

Let's assume the following `CloudProfile`:

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

Let's assume the `Shoot` has the following specification:

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

The `Shoot` specification refers a machine image version that has an `expirationDate`. In the maintenance window on `2019-04-12`, the machine image version stays the same as it’s still not expired. But in the maintenance window on `2019-04-14` the machine image version of the shoot cluster is updated to `2191.5.0` (independently of the value of `.spec.maintenance.autoUpdate.machineImageVersion`) as version `2135.6.0` is expired.
