---
title: Gardener 1.4.0 Released
newsSubtitle: May 07, 2020
publishdate: 2020-05-07
archivedate: 2020-05-15
newsType: release-notes
---
# Gardener Release 1.4
​
The Gardener release 1.4 is mainly focused on stability improvments and optimizations. For example, we twitched some configurations (e.g CPU and memory limits), and improved the monitoring and healtchechks. And there are some new features too. The list below is an overview of the most notable changes. Explore the full release notes in [GitHub Release 1.4](https://github.com/gardener/gardener/releases/tag/v1.4.0).
​​
## Notable Changes

### Now you decide when the reconciliation happens if you change your Shoot specification
​
Previously whenever you change a configuration of your `Shoot.yaml` specification, a reconciliation process was triggered enabling your desired state. Now using `.spec.maintenance.confineSpecUpdateRollout=true` you confine those changes to be updated in the individual maintenance time window. This is helpful if you want to update your Shoot but don't want the changes to be applied immediately. One example use-case would be a Kubernetes version upgrade that you want to roll out during the maintenance time window. It is important to note that if you change the maintenance window itself, then it will only be effective after the upcoming maintenance. Of course, there is an exception with the `.spec.hibernation.enabled` field, which changes are taken under consideration immediately. If you hibernate or wake-up your Shoots then Gardener gets active right away.
​
### New Grafana dashboard to monitor CoreDNS's stats
​
We exposed this Dashboard to give you insight over some CoreDNS metrics of your cluster, like: DNS Requests, DNS Lookups, Cache Hits/Misses.
​
### Better way of describing Shoot reconciliation errors
​
The Shoot health check controller has been improved to produce error codes (if applicable) to the `.status.conditions[].codes` that help to categorize observed problems. Also, there are two new error codes: `ERR_INFRA_RESOURCES_DEPLETED` indicates that the underlying infrastructure does not have enough resources anymore, and `ERR_CONFIGURATION_PROBLEM` indicates that the user has misconfigured something and should double-check the specification.

### Gardener will now block removal of Kubernetes and machine image versions from the `CloudProfile` which are still in use
​
The Gardener API Server now validates the changes of `CloudProfile` against Shoots that are using it. And will block removal of in use versions of Kubernetes and machine images from the `CloudProfile`. This is part of the "Gardener Versioning Policy" proposal that you can find at [GEP-5](https://github.com/gardener/gardener/blob/master/docs/proposals/05-versioning-policy.md)
​
### Forceful Shoot clusters updates
​
You can specify for which Kubernetes and machine image versions you can forcefully upgrade to newer ones when expired. This is part of the "Gardener Versioning Policy" proposal that you can find at [GEP-5](https://github.com/gardener/gardener/blob/master/docs/proposals/05-versioning-policy.md)

### Gardener supports `metadata.generateName` as alternative to `metadata.name`

### Create unlimited count of worker groups per Shoot

Previously it was not possible to create more that 20-25 worker groups, because the number of worker's cloud configs were limited by the size of the `Secret`. We divided the cloud config to dedicated managed resources to eliminate this limitation.

### Common library for simple validating webhooks
​
We introduced new common library in the extension package that will help you to develop simple validating or mutating webhooks for different K8s types with different handlers. Please have a look at [PR#69](https://github.com/gardener/gardener-extension-provider-gcp/pull/69) to see an implementation in action.

## Improvements

### Kubernetes Dashboard addon version v2.0.0
​
We bumped the already presented addon for Kubernetes Dashboard to v2.0.0

### Gardener validates Pod/Service — Service/Pod network intersection between the Shoot and the Seed
​
Previosuly an overlap of these networks resulted in a broken state, so we added such validation to our admission plugin.
​
### The infrastructure reconciliation for hibernated shoots is now skipped

### Endpoint managed by 3rd party operators doesn't block the Shoot's hibernation
​
Now, gardener checks if the Endpoints object is reconciled by `kube-controller-manager`, otherwise it ignores and does not block the hibernation.
​
### Fixed a bug in the healthcheck that prevents checks after a Shoot has been woken up from hibernation

If you have implemented custom extension controller for your cluster, you can vendor Gardener v1.4.0 to benefit from the fix.

### Detect outdated health check reports
​
The Gardenlet detects outdated health check reports on extension CRDs with a default threshold of 5 minutes in case Gardener extensions stop performing health checks. For backwards-compatibility reasons, the gardenlet does not check for stale extension reports per default. To enable, the field `controllers.shootCare.staleExtensionHealthCheckThreshold` in the Gardenlet configuration [file](https://github.com/gardener/gardener/blob/master/example/20-componentconfig-gardenlet.yaml) should be set.
​
### Updates on Grafana Dashboard
​
Removed the cluster overview dashboard since metrics used in this dashboard were removed.
Other dashboards are changed to no longer show data on a "Pod level" since pod level metrics have a high cardinality and have been mostly removed from the aggregate-prometheus.
​
### ETCD Encryption data is persisted in the ShootState
​
We now replicate the ETCD encryption into the `ShootState` for future restoration purposes.
​
### Improved Shoot operations
​
We fixed a race condition that led to incomplete maintenance operations for shoot clusters and fixed a bug that prevented the Shoot reconciliation to wait for the deletion of Extension CRDs.
​
### Extension controllers now support Migrate and Restore operations
​
The Actuator interface for the `Infrastructure`, `ControlPlane`, `Network`, `Worker`, `OperationSystemConfig`, `BackupEntry` extension controllers were extended to support `migrate` and `restore` operations.
​
### Autoscaler has configurable delay for Pod age before considering scaling-up​

### HVPA now properly scales ETCD containers

### Enhnaced etcd-backup-restore API for delta and full snapshots
​
Triggering full or delta snapshots now returns metadata for the snapshot taken in the response body. Also, new endpoint was introduces for fetching details of the latest full and delta snapshots.