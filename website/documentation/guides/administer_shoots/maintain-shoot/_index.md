---
title: Shoot Cluster Maintenance
description: "Understanding and configuring Gardener's Day-2 operations for Shoot clusters."
level: advanced
category: Operation
scope: operator
---

## Overview

Day two operations for shoot clusters are related to:

* The Kubernetes version of the control plane and the worker nodes
* The operating system version of the worker nodes

{{% alert color="info" title="Note" %}}
When referring to an update of the "operating system version" in this document, the update of the machine image of the shoot cluster's worker nodes is meant. For example, Amazon Machine Images (AMI) for AWS.
{{% /alert %}}


The following table summarizes what options Gardener offers to maintain these versions:

|     |   Auto-Update   |  Forceful Updates  |  Manual Updates  | 
|:----|:----|:----|:-----|
| Kubernetes version | Patches only | Patches and consecutive minor updates only  | yes |
| Operating system version |  yes | yes | yes |


## Allowed Target Versions in the `CloudProfile`

Administrators maintain the allowed target versions that you can update to in the `CloudProfile` for each IaaS-Provider. Users with access to a Gardener project can check supported target versions with:

```
kubectl get cloudprofile [IAAS-SPECIFIC-PROFILE] -o yaml
```

| Path |  Description  |  More Information |
|:-----|:-----|:-----|
|`spec.kubernetes.versions`| The supported Kubernetes version `major.minor.patch`. | [Patch releases](https://github.com/kubernetes/design-proposals-archive/blob/main/release/versioning.md#patch-releases)|
|`spec.machineImages`| The supported operating system versions for worker nodes | 

Both the Kubernetes version and the operating system version follow semantic versioning that allows Gardener to handle updates automatically. 

For more information, see [Semantic Versioning](http://semver.org/).

### Impact of Version Classifications on Updates

Gardener allows to classify versions in the `CloudProfile` as `preview`, `supported`, `deprecated`, or `expired`. During maintenance operations, `preview` versions are excluded from updates, because they’re often recently released versions that haven’t yet undergone thorough testing and may contain bugs or security issues. 

For more information, see [Version Classifications](https://github.com/gardener/gardener/blob/master/docs/usage/shoot_versions.md#version-classifications).

## Let Gardener Manage Your Updates

### The Maintenance Window

Gardener can manage updates for you automatically. It offers users to specify a _maintenance window_ during which updates are scheduled:

* The time interval of the maintenance window can’t be less than 30 minutes or more than 6 hours.
* If there’s no maintenance window specified during the creation of a shoot cluster, Gardener chooses a maintenance window randomly to spread the load. 

You can either specify the maintenance window in the shoot cluster specification (`.spec.maintenance.timeWindow`) or the start time of the maintenance window using the Gardener dashboard (**CLUSTERS** > **[YOUR-CLUSTER]** > **OVERVIEW** > **Lifecycle** > **Maintenance**).

### Auto-Update and Forceful Updates

To trigger updates during the maintenance window automatically, Gardener offers the following methods:

* _Auto-update_: <br>Gardener starts an update during the next maintenance window whenever there’s a version available in the `CloudProfile` that is higher than the one of your shoot cluster specification, and that isn’t classified as `preview` version. For Kubernetes versions, auto-update only updates to higher patch levels.
  
  You can either activate auto-update on the Gardener dashboard (**CLUSTERS** > **[YOUR-CLUSTER]** > **OVERVIEW** > **Lifecycle** > **Maintenance**) or in the shoot cluster specification:
  
  *  `.spec.maintenance.autoUpdate.kubernetesVersion: true`
  *  `.spec.maintenance.autoUpdate.machineImageVersion: true`

* _Forceful updates_: <br>In the maintenance window, Gardener compares the current version given in the shoot cluster specification with the version list in the `CloudProfile`. If the version has an expiration date and if the date is before the start of the maintenance window, Gardener starts an update to the highest version available in the `CloudProfile` that isn’t classified as `preview` version. The highest version in `CloudProfile` can’t have an expiration date. For Kubernetes versions, Gardener only updates to higher patch levels or consecutive minor versions. 

If you don’t want to wait for the next maintenance window, you can annotate the shoot cluster specification with `shoot.gardener.cloud/operation: maintain`. Gardener then checks immediately if there’s an auto-update or a forceful update needed.

{{% alert color="info" title="Note" %}}
Forceful version updates are executed even if the auto-update for the Kubernetes version(or the auto-update for the machine image version) is deactivated (set to `false`).
{{% /alert %}}

With expiration dates, administrators can give shoot cluster owners more time for testing before the actual version update happens, which allows for smoother transitions to new versions.

### Kubernetes Update Paths

The bigger the delta of the Kubernetes source version and the Kubernetes target version, the better it must be planned and executed by operators. Gardener only provides automatic support for updates that can be applied safely to the cluster workload:

|   Update Type    |   Example         | Update Method  |
|:-----------------|:------------------|:--------------|
| Patches | `1.10.12` to `1.10.13`     | auto-update or Forceful update |
| Update to consecutive minor version | `1.10.12` to `1.11.10` | Forceful update |
| Other | `1.10.12` to `1.12.0` | Manual update |

Gardener doesn’t support automatic updates of nonconsecutive minor versions, because Kubernetes doesn’t guarantee updateability in this case. However, multiple minor version updates are possible if not only the minor source version is expired, but also the minor target version is expired. Gardener then updates the Kubernetes version first to the expired target version, and waits for the next maintenance window to update this version to the next minor target version.

{{% alert color="warning" title="Warning" %}}
The administrator who maintains the `CloudProfile` has to ensure that the list of Kubernetes versions consists of consecutive minor versions, for example, from `1.10.x` to `1.11.y`. If the minor version increases in bigger steps, for example, from `1.10.x` to `1.12.y`, then the shoot cluster updates will fail during the maintenance window. 
{{% /alert %}}

## Manual Updates

To update the Kubernetes version or the node operating system manually, change the `.spec.kubernetes.version` field or the `.spec.provider.workers.machine.image.version` field correspondingly.  

Manual updates are required if you would like to do a minor update of the Kubernetes version. Gardener doesn’t do such updates automatically, as they can have breaking changes that could impact the cluster workload.

Manual updates are either executed immediately (default) or can be confined to the maintenance time window.  
Choosing the latter option causes changes to the cluster (for example, node pool rolling-updates) and the subsequent reconciliation to only predictably happen during a defined time window (available since [Gardener version 1.4](https://github.com/gardener/gardener/releases/tag/v1.4.0)).

For more information, see [Confine Specification Changes/Update Roll Out](https://github.com/gardener/gardener/blob/master/docs/usage/shoot_maintenance.md#confine-specification-changesupdates-roll-out).

{{% alert color="warning" title="Warning" %}}
Before applying such an update on minor or major releases, operators should check for all the breaking changes introduced in the target Kubernetes release changelog.
{{% /alert %}}

## Examples

In the examples for the `CloudProfile` and the shoot cluster specification, only the fields relevant for the example are shown.

### Auto-Update of Kubernetes Version

Let's assume that the Kubernetes versions `1.10.5` and `1.11.0` were added in the following `CloudProfile`:

```yaml
spec:
  kubernetes:
    versions:
    - version: 1.11.0
    - version: 1.10.5
    - version: 1.10.0
```

Before this change, the shoot cluster specification looked like this:

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

As a consequence, the shoot cluster is updated to Kubernetes version  `1.10.5` between 22:00-23:00 UTC. Your shoot cluster isn't updated automatically to `1.11.0`, even though it's the highest Kubernetes version in the `CloudProfile`, because Gardener only does automatic updates of the Kubernetes patch level.

### Forceful Update Due to Expired Kubernetes Version

Let's assume the following `CloudProfile` exists on the cluster:

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

Let's assume the shoot cluster has the following specification:

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

The shoot cluster specification refers to a Kubernetes version that has an `expirationDate`. In the maintenance window on `2019-04-12`, the Kubernetes version stays the same as it’s still not expired. But in the maintenance window on `2019-04-14`, the Kubernetes version of the shoot cluster is updated to `1.10.13` (independently of the value of `.spec.maintenance.autoUpdate.kubernetesVersion`).

### Forceful Update to New Minor Kubernetes Version

Let's assume the following `CloudProfile` exists on the cluster:

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

Let's assume the shoot cluster has the following specification:

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

The shoot cluster specification refers a Kubernetes version that has an `expirationDate`. In the maintenance window on `2019-04-14`, the Kubernetes version of the shoot cluster is updated to `1.11.10`, which is the highest patch version of minor target version `1.11` that follows the source version `1.10`.

### Automatic Update from Expired Machine Image Version

Let's assume the following `CloudProfile` exists on the cluster:

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

Let's assume the shoot cluster has the following specification:

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

The shoot cluster specification refers a machine image version that has an `expirationDate`. In the maintenance window on `2019-04-12`, the machine image version stays the same as it’s still not expired. But in the maintenance window on `2019-04-14`, the machine image version of the shoot cluster is updated to `2191.5.0` (independently of the value of `.spec.maintenance.autoUpdate.machineImageVersion`) as version `2135.6.0` is expired.