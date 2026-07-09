---
github_repo: 'https://github.com/gardener/dependency-watchdog'
github_subdir: docs/development/setup
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/contribute/other-components/dependency-watchdog/setup/dwd-using-local-garden.md
  to: dwd-using-local-garden.md
persona: Developers
title: Dwd Using Local Garden
prev: false
next: false
managed: true
---

# Dependency Watchdog with Local Garden Cluster

## Setting up Local Garden cluster

A convenient way to test local dependency-watchdog changes is to use a local garden cluster.
To setup a local garden cluster you can follow the [setup-guide](/contribute/developer-starter-kit/getting_started_locally/).

## Dependency Watchdog resources

As part of the local garden installation, a `local` seed will be available.

### Dependency Watchdog resources created in the seed

#### Namespaced resources
In the `garden` namespace of the seed cluster, following resources will be created:

| Resource (GVK) | Name |
| --- | --- |
| {apiVersion: v1, Kind: ServiceAccount} | dependency-watchdog-prober |
| {apiVersion: v1, Kind: ServiceAccount} | dependency-watchdog-weeder |
| {apiVersion: apps/v1, Kind: Deployment} | dependency-watchdog-prober |
| {apiVersion: apps/v1, Kind: Deployment} | dependency-watchdog-weeder |
| {apiVersion: v1, Kind: ConfigMap} | dependency-watchdog-prober-* |
| {apiVersion: v1, Kind: ConfigMap} | dependency-watchdog-weeder-* |
| {apiVersion: rbac.authorization.k8s.io/v1, Kind: Role} | gardener.cloud:dependency-watchdog-prober:role |
| {apiVersion: rbac.authorization.k8s.io/v1, Kind: Role} | gardener.cloud:dependency-watchdog-weeder:role |
| {apiVersion: rbac.authorization.k8s.io/v1, Kind: RoleBinding} | gardener.cloud:dependency-watchdog-prober:role-binding |
| {apiVersion: rbac.authorization.k8s.io/v1, Kind: RoleBinding} | gardener.cloud:dependency-watchdog-weeder:role-binding |
| {apiVersion: resources.gardener.cloud/v1alpha1, Kind: ManagedResource} | dependency-watchdog-prober |
| {apiVersion: resources.gardener.cloud/v1alpha1, Kind: ManagedResource} | dependency-watchdog-weeder |
| {apiVersion: v1, Kind: Secret} | managedresource-dependency-watchdog-weeder |
| {apiVersion: v1, Kind: Secret} | managedresource-dependency-watchdog-prober |

#### Cluster resources

| Resource (GVK) | Name |
| --- | --- |
| {apiVersion: rbac.authorization.k8s.io/v1, Kind: ClusterRole} | gardener.cloud:dependency-watchdog-prober:cluster-role |
| {apiVersion: rbac.authorization.k8s.io/v1, Kind: ClusterRole} | gardener.cloud:dependency-watchdog-weeder:cluster-role |
| {apiVersion: rbac.authorization.k8s.io/v1, Kind: ClusterRoleBinding} | gardener.cloud:dependency-watchdog-prober:cluster-role-binding |
| {apiVersion: rbac.authorization.k8s.io/v1, Kind: ClusterRoleBinding} | gardener.cloud:dependency-watchdog-weeder:cluster-role-binding |

### Dependency Watchdog resources created in Shoot control namespace

| Resource (GVK) | Name |
| --- | --- |
| {apiVersion: v1, Kind: Secret} | dependency-watchdog-prober |
| {apiVersion: resources.gardener.cloud/v1alpha1, Kind: ManagedResource} | shoot-core-dependency-watchdog |

### Dependency Watchdog resources created in the kube-node-lease namespace of the shoot

| Resource (GVK) | Name |
| --- | --- |
| {apiVersion: rbac.authorization.k8s.io/v1, Kind: Role} | gardener.cloud:target:dependency-watchdog |
| {apiVersion: rbac.authorization.k8s.io/v1, Kind: RoleBinding} | gardener.cloud:target:dependency-watchdog |

These will be created by the GRM and will have a managed resource named `shoot-core-dependency-watchdog` in the shoot namespace in the seed.

## Update Gardener with custom Dependency Watchdog Docker images

### Build, Tag and Push docker images
To build dependency watchdog docker images run the following make target:
```bash
> make docker-build
```
Local gardener hosts a docker registry which can be access at `localhost:5001`. To enable local gardener to be able to access the custom docker images you need to tag and push these images to the embedded docker registry. To do that execute the following commands:
```bash
> docker images
# Get the IMAGE ID of the dependency watchdog images that were built using docker-build make target.
> docker tag <IMAGE-ID> localhost:5001/europe-docker.pkg.dev/gardener-project/public/gardener/dependency-watchdog-prober:<TAGNAME>
> docker push localhost:5001/europe-docker.pkg.dev/gardener-project/public/gardener/dependency-watchdog-prober:<TAGNAME>
```

### Update ManagedResource

Garden resource manager will revert back any changes that are done to the kubernetes deployment for dependency watchdog. This is quite useful in live landscapes where only tested and qualified images are used for all gardener managed components. Any change therefore is automatically reverted.

However, during development and testing you will need to use custom docker images. To prevent garden resource manager from reverting the changes done to the kubernetes deployment for dependency watchdog components you must update the respective managed resources first.

```bash
# List the managed resources
> kubectl get mr -n garden | grep dependency
# Sample response
dependency-watchdog-weeder            seed    True      True      False         26h
dependency-watchdog-prober            seed    True      True      False         26h
# Lets assume that you are currently testing prober and would like to use a custom docker image
> kubectl edit mr dependency-watchdog-prober -n garden
# This will open the resource YAML for editing. Add the annotation resources.gardener.cloud/ignore=true
# Reference: https://github.com/gardener/gardener/blob/master/docs/concepts/resource-manager.md
# Save the YAML file.
```

When you are done with your testing then you can again edit the ManagedResource and remove the annotation. Garden resource manager will revert back to the image with which gardener was initially built and started.

### Update Kubernetes Deployment

Find and update the kubernetes deployment for dependency watchdog.

```bash
> kubectl get deploy -n garden | grep dependency
# Sample response
dependency-watchdog-weeder            1/1     1            1           26h
dependency-watchdog-prober            1/1     1            1           26h

# Lets assume that you are currently testing prober and would like to use a custom docker image
> kubectl edit deploy dependency-watchdog-prober -n garden
# This will open the resource YAML for editing. Change the image or any other changes and save.
```
