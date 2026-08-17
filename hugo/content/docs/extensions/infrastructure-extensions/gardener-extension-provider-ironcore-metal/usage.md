---
github_repo: 'https://github.com/ironcore-dev/gardener-extension-provider-ironcore-metal'
github_subdir: docs/usage
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/infrastructure-extensions/gardener-extension-provider-ironcore-metal/usage.md
  to: usage.md
persona: Users
title: Usage
prev: false
next: false
managed: true
---

# Using the `metal` provider extension with Gardener as end-user

The [`core.gardener.cloud/v1beta1.Shoot` resource](https://github.com/gardener/gardener/blob/master/example/90-shoot.yaml)
declares a few fields that are meant to contain provider-specific configuration.

This document describes the configurable options for `metal` and provides an example `Shoot` manifest with minimal
configuration that can be used to create an `metal` cluster (modulo the landscape-specific information like cloud
profile names, secret binding names, etc.).

## `metal` Provider Credentials

In order for Gardener to create a Kubernetes cluster using the `metal` infrastructure components, a Shoot has to
provide credentials with sufficient permissions to the desired `metal` project.

In the `metal` provider extension the infrastructure credential secret has to contain the following components:
`namespace` which is the namespace in the corresponding `metal` cluster, `username` which is the name of the
`ServiceAccount` in the `metal` cluster and a `token` which is the token generated for the `ServiceAccount`. An
example secret is shown below:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-credentials 
  namespace: garden-dev
type: Opaque
data:
  namespace: my-metal-namespace
  token: abcd1234
  username: my-serviceaccount-user
```

## `InfrastructureConfig`

The infrastructure configuration mainly describes how the network layout looks like in order to create the shoot worker
nodes in a later step, thus, prepares everything relevant to create VMs, load balancers, volumes, etc.

An example `InfrastructureConfig` for the `metal` extension looks as follows:

```yaml
apiVersion: metal.provider.extensions.gardener.cloud/v1alpha1
kind: InfrastructureConfig
networkRef:
  name: "my-network"
prefixRef:
  name: "my-prefix"
```

Here the `networkRef` field refer to network and `prefixRef` field refer to prefix. Both are used for Shoot creation.

## `ControlPlaneConfig`

The control plane configuration mainly contains values for the `metal` specific control plane components.
Today, the only components deployed by the `metal` extension is the `cloud-controller-manager` and the
`metal-csi-driver`.

An example `ControlPlaneConfig` for the `metal` extension looks as follows:

```yaml
apiVersion: metal.provider.extensions.gardener.cloud/v1alpha1
kind: ControlPlaneConfig
cloudControllerManager:
  featureGates:
    CustomResourceValidation: true
```

The `cloudControllerManager.featureGates` contains a map of explicitly enabled or disabled feature gates.
For production usage it's not recommend to use this field at all as you can enable alpha features or disable beta/stable
features, potentially impacting the cluster stability. If you don't want to configure anything for the
`cloudControllerManager` simply omit the key in the YAML specification.

## WorkerConfig

At this moment the `metal` extension does not have any worker specific provider configuration.

## Example `Shoot` manifest

An example to a `Shoot` manifest [here](https://github.com/metal-dev/gardener-extension-provider-metal/blob/doc/usage-as-operator/docs/usage-as-operator.md):

## CSI volume provisioners

Every `metal` Shoot cluster will be deployed with the `metal-csi-driver`.
