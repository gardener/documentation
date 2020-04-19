---
title: Maintain a Shoot cluster
description: "Maintain a Shoot cluster"
type: tutorial-page
level: advanced
index: 5
category: Operation
scope: operator
aliases: ["readmore/shoot-maintain"]
---

# Maintain Shoot Cluster

Day two operations like updating [Kubernetes patch version](#kubernetes-patch-version) (if the auto-update is enabled) and updating [Operating system version](#operating-system-version) happen in the maintenance time window of the Shoot cluster. The maintenance time window is part of the shoot spec (`.spec.maintenance.timeWindow`). If it is not specified during Shoot creation, Gardener will default to a randomized time window (to spread the load). The time interval cannot be less than 30 minutes and more than 6 hours.

To trigger the maintenance operation, you can annotate the Shoot with `shoot.gardener.cloud/operation: maintain`.

### Kubernetes Patch Version

If a Shoot has `.spec.maintenance.autoUpdate.kubernetesVersion: true` in the manifest, and you update the `.spec.kubernetes.versions` field in the CloudProfile used in the Shoot, then the maintenance controller will apply Kubernetes [patch releases](https://github.com/kubernetes/community/blob/master/contributors/design-proposals/release/versioning.md#patch-releases) updates automatically during the maintenance time window.

Since Kubernetes follows [Semantic Versioning](http://semver.org/), if indicated so, Gardener will automatically apply the patch release updates. But it will never auto update the Major or Minor releases since there is no effort to keep backward compatibility in those releases.

Major or Minor updates must be handled by updating the `.spec.kubernetes.version` field manually, these updates will be executed immediately and will not wait for maintenance time window. **Before applying such update on Minor or Major releases, operators should check for all the breaking changes introduced in the target release Changelog**.

E.g. If you have a Shoot cluster with the field values below (only related fields are shown):

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

If you update the CloudProfile used in the Shoot and add `1.10.5` and `1.11.0` to the `.spec.kubernetes.versions` list, the Shoot will be updated to `1.10.5` between 22:00-23:00 UTC. Your Shoot won't be updated to `1.11.0` even though its the highest Kubernetes version in the CloudProfile. This is because that wouldn't be a patch release update but a minor release update, and potentially have breaking changes that could impact your deployed resources.

In this example if the operator wants to update the Kubernetes version to `1.11.0`, he/she must update the Shoot's `.spec.kubernetes.version` to `1.11.0` manually.

### Kubernetes Version Expiration Date

Gardener administrators can also specify expiration dates for the Kubernetes versions in the CloudProfile. Kubernetes version expiration dates allow smoother transitions for Shoot owners giving them time for testing before the actual Kubernetes version update happens. Expiration date for the latest Kubernetes version in the CloudProfile is not allowed.

We can check the following scenarios for better understanding on Kubernetes version expiration dates:

- Automatic patch update from expired Kubernetes version.

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

And let's the Shoot has the following spec:

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

The Shoot refers a Kubernetes version that has an `expirationDate`. In the maintenance window on 2019-04-12 the Kubernetes version will stay the same as it is still not expired. But in the maintenance window on 2019-04-14 the Kubernetes version of the Shoot will be updated to `1.10.13` (no matter the value of `.spec.maintenance.autoUpdate.kubernetesVersion`).

- Automatic patch update from dropped Kubernetes version:

Let's assume the following CloudProfile spec (only related fields are shown):

```yaml
spec:
  kubernetes:
    versions:
    - version: 1.12.8
    - version: 1.11.10
    - version: 1.10.13
```

And let's the Shoot has the following spec:

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

The Shoot refers a Kubernetes version that was dropped from the CloudProfile. In the upcoming maintenance window the Kubernetes version of the Shoot will be updated to the next patch version - `1.10.13`. `.spec.maintenance.autoUpdate.kubernetesVersion` needs to be true, otherwise no version update will happen.

### Operating System Version

If a Shoot has `.spec.maintenance.autoUpdate.machineImageVersion: true` in the manifest, and you update the `.spec.machineImages` field in the CloudProfile used in the Shoot, then the maintenance controller will apply the new machine image to the Shoot spec (and will mark the Shoot to be reconciled) during the maintenance time window. During the reconciliation the corresponding `<Provider>MachineClass` resource in the Shoot namespace in the Seed will be updated and the machine controller manager will take care of the actual state to match the desired one.

### Machine Image Expiration Date

- Automatic update from expired machine image version.

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

And let's the Shoot has the following spec:

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

The Shoot refers a machine image version that has an `expirationDate`. In the maintenance window on 2019-04-12 the machine image version will stay the same as it is still not expired. But in the maintenance window on 2019-04-14 the machine image version of the Shoot will be updated to `2191.5.0` (no matter the value of `.spec.maintenance.autoUpdate.machineImageVersion`) as version `2135.6.0` will be expired.
