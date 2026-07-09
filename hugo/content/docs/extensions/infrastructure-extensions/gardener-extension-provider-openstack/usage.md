---
github_repo: 'https://github.com/gardener/gardener-extension-provider-openstack'
github_subdir: docs/usage
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/infrastructure-extensions/gardener-extension-provider-openstack/usage.md
  to: usage.md
persona: Users
title: Usage
prev: false
next: false
managed: true
---

# Using the OpenStack provider extension with Gardener as end-user

The [`core.gardener.cloud/v1beta1.Shoot` resource](https://github.com/gardener/gardener/blob/master/example/90-shoot.yaml) declares a few fields that are meant to contain provider-specific configuration.

In this document we are describing how this configuration looks like for OpenStack and provide an example `Shoot` manifest with minimal configuration that you can use to create an OpenStack cluster (modulo the landscape-specific information like cloud profile names, secret binding names, etc.).

## Provider Secret Data

Every shoot cluster references a `SecretBinding` or a `CredentialsBinding` which itself references a `Secret`, and this `Secret` contains the provider credentials of your OpenStack tenant.
This `Secret` must look as follows:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: core-openstack
  namespace: garden-dev
type: Opaque
data:
  domainName: base64(domain-name)
  tenantName: base64(tenant-name)
  
  # either use username/password
  username: base64(user-name)
  password: base64(password)

  # or application credentials
  #applicationCredentialID: base64(app-credential-id)
  #applicationCredentialName: base64(app-credential-name) # optional
  #applicationCredentialSecret: base64(app-credential-secret)
```

Please look up https://docs.openstack.org/keystone/pike/admin/identity-concepts.html as well.

For authentication with username/password see [Keystone username/password](https://docs.openstack.org/keystone/latest/user/supported_clients.html)

Alternatively, for authentication with application credentials see [Keystone Application Credentials](https://docs.openstack.org/keystone/latest/user/application_credentials.html).

⚠️ Depending on your API usage it can be problematic to reuse the same provider credentials for different Shoot clusters due to rate limits.
Please consider spreading your Shoots over multiple credentials from different tenants if you are hitting those limits.

## `InfrastructureConfig`

The infrastructure configuration mainly describes how the network layout looks like in order to create the shoot worker nodes in a later step, thus, prepares everything relevant to create VMs, load balancers, volumes, etc.

An example `InfrastructureConfig` for the OpenStack extension looks as follows:

```yaml
apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
kind: InfrastructureConfig
floatingPoolName: MY-FLOATING-POOL
# floatingPoolSubnetName: my-floating-pool-subnet-name
networks:
# id: 12345678-abcd-efef-08af-0123456789ab
# router:
#   id: 1234
  workers: 10.250.0.0/19

# shareNetwork:
#   enabled: true
```

The `floatingPoolName` is the name of the floating pool you want to use for your shoot.
If you don't know which floating pools are available look it up in the respective `CloudProfile`.

With `floatingPoolSubnetName` you can explicitly define to which subnet in the floating pool network (defined via `floatingPoolName`) the router should be attached to.

`networks.id` is an optional field. If it is given, you can specify the uuid of an existing private Neutron network (created manually, by other tooling, ...) that should be reused. A new subnet for the Shoot will be created in it.

If a `networks.id` is given and calico shoot clusters are created without a network overlay within one network make sure that the pod CIDR specified in `shoot.spec.networking.pods` is not overlapping with any other pod CIDR used in that network.
Overlapping pod CIDRs will lead to disfunctional shoot clusters.

The `networks.router` section describes whether you want to create the shoot cluster in an already existing router or whether to create a new one:

* If `networks.router.id` is given then you have to specify the router id of the existing router that was created by other means (manually, other tooling, ...).
  If you want to get a fresh router for the shoot then just omit the `networks.router` field.

* In any case, the shoot cluster will be created in a **new** subnet.

The `networks.workers` section describes the CIDR for a subnet that is used for all shoot worker nodes, i.e., VMs which later run your applications.

You can freely choose these CIDRs and it is your responsibility to properly design the network layout to suit your needs.

Instead of specifying an explicit CIDR via `networks.workers`, you can use `networks.subnetPool` to let OpenStack automatically allocate a subnet CIDR from a pre-configured subnet pool:

```yaml
apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
kind: InfrastructureConfig
floatingPoolName: MY-FLOATING-POOL
networks:
  subnetPool:
    id: MY-SUBNET-POOL-ID
    prefixLength: 24  # request a /24 subnet from the pool
```

`networks.subnetPool.id` is the UUID of the OpenStack subnet pool to allocate from, and `networks.subnetPool.prefixLength` controls the size of the allocated subnet (e.g. `24` for a `/24`). The `networks.workers` and `networks.subnetPool` fields are mutually exclusive.

Apart from the router and the worker subnet the OpenStack extension will also create a network, router interfaces, security groups, and a key pair.

The optional `networks.shareNetwork.enabled` field controls the creation of a share network. This is only needed if shared
file system storage (like NFS) should be used. Note, that in this case, the `ControlPlaneConfig` needs additional configuration, too.

### Dual-Stack Networking (IPv4/IPv6)

For dual-stack clusters that use both IPv4 and IPv6, you have two configuration options:

#### Option 1: Using a Subnet Pool (Recommended)

The `networks.ipv6.subnetPoolID` field specifies the OpenStack subnet pool ID from which IPv6 subnets will be allocated automatically for nodes, pods, and services.

An example `InfrastructureConfig` for dual-stack with subnet pool looks as follows:

```yaml
apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
kind: InfrastructureConfig
floatingPoolName: MY-FLOATING-POOL
networks:
  workers: 10.250.0.0/19
  ipv6:
    subnetPoolID: MY-SUBNET-POOL-ID
```

Unlike IPv4 where you explicitly specify the CIDR in `networks.workers`, IPv6 addresses are typically allocated from a larger prefix managed by your OpenStack environment.

#### Option 2: Explicit IPv6 CIDR Configuration

Alternatively, you can explicitly specify IPv6 CIDRs for nodes, pods, and services using the `networks.ipv6` field.
In this case, IPv6 subnets are created using the provided CIDRs directly, so no `subnetPoolID` is required.
If both `subnetPoolID` and explicit CIDRs are set, the explicit CIDRs take precedence and the pool is not used for CIDR allocation.

```yaml
apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
kind: InfrastructureConfig
floatingPoolName: MY-FLOATING-POOL
networks:
  workers: 10.250.0.0/19
  ipv6:
    nodeCIDR: 2001:db8:1::/64      # IPv6 CIDR for worker nodes
    podCIDR: 2001:db8:2::/64        # IPv6 CIDR for pods
    serviceCIDR: 2001:db8:3::/112   # IPv6 CIDR for services
```

⚠️ The `networks.ipv6` configuration is immutable after cluster creation.

## `ControlPlaneConfig`

The control plane configuration mainly contains values for the OpenStack-specific control plane components.
Today, the only component deployed by the OpenStack extension is the `cloud-controller-manager`.

An example `ControlPlaneConfig` for the OpenStack extension looks as follows:

```yaml
apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
kind: ControlPlaneConfig
loadBalancerProvider: haproxy
loadBalancerClasses:
- name: lbclass-1
  purpose: default
  floatingNetworkID: fips-1-id
  floatingSubnetName: internet-*
- name: lbclass-2
  floatingNetworkID: fips-1-id
  floatingSubnetTags: internal,private
- name: lbclass-3
  purpose: private
  subnetID: internal-id
# cloudControllerManager:
#   featureGates:
#     SomeKubernetesFeature: true
# storage:
#   csiManila:
#     enabled: true
```

The `loadBalancerProvider` is the provider name you want to use for load balancers in your shoot.
If you don't know which types are available look it up in the respective `CloudProfile`.

The `loadBalancerClasses` field contains an optional list of load balancer classes which will be available in the cluster. Each entry can have the following fields:
- `name` to select the load balancer class via the kubernetes [service annotations](https://github.com/kubernetes/cloud-provider-openstack/blob/master/docs/openstack-cloud-controller-manager/expose-applications-using-loadbalancer-type-service.md#switching-between-floating-subnets-by-using-preconfigured-classes) `loadbalancer.openstack.org/class=name`
- `purpose` with values `default` or `private`
  - The configuration of the `default` load balancer class will be used as default for all other kubernetes loadbalancer services without a class annotation
  - The configuration of the `private` load balancer class will be also set to the global loadbalancer configuration of the cluster, but will be overridden by the `default` purpose
- `floatingNetworkID` can be specified to receive an ip from an floating/external network, additionally the subnet in this network can be selected via
  - `floatingSubnetName` can be either a full subnet name or a regex/glob to match subnet name
  - `floatingSubnetTags` a comma seperated list of subnet tags
  - `floatingSubnetID` the id of a specific subnet
- `subnetID` can be specified by to receive an ip from an internal subnet (will not have an effect in combination with floating/external network configuration)

The `cloudControllerManager.featureGates` contains a map of explicitly enabled or disabled feature gates.
For production usage it's not recommended to use this field at all as you can enable alpha features or disable beta/stable features, potentially impacting the cluster stability.
If you don't want to configure anything for the `cloudControllerManager` simply omit the key in the YAML specification.

The optional `storage.csiManila.enabled` field is used to enable the deployment of the CSI Manila driver to support NFS persistent volumes.
In this case, please ensure to set `networks.shareNetwork.enabled=true` in the `InfrastructureConfig`, too.
Additionally, if CSI Manila driver is enabled, several StorageClasses are deployed:
- `csi-manila-nfs`:
  - Useful if you don’t care about which AZ the volume lands in, e.g. small clusters or test workloads.
  - This StorageClass is not tied to a specific availability zone.
- `csi-manila-nfs-auto`:
  - `autoTopology: "true"` -> Driver automatically decides AZ.
  - Similar to `csi-manila-nfs`, but the CSI driver automatically chooses the best availability zone based on where the pod is scheduled.
- `csi-manila-nfs-<zone>`:
  - `availability: <zone>` -> Each AZ gets its own StorageClass.
  - Useful for workloads that should live in a specific AZ for performance, latency, or regulatory reasons.

## `WorkerConfig`

Each worker group in a shoot may contain provider-specific configurations and options. These are contained in the `providerConfig` section of a worker group and can be configured using a `WorkerConfig` object.
An example of a `WorkerConfig` looks as follows:

```yaml
apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
kind: WorkerConfig
serverGroup:
  policy: soft-anti-affinity
# nodeTemplate: # (to be specified only if the node capacity would be different from cloudprofile info during runtime)
#   capacity:
#     cpu: 2
#     gpu: 0
#     memory: 50Gi
#   virtualCapacity:
#     subdomain.domain.com/resource-name: 1234567
# machineLabels:
#  - name: my-label
#    value: foo
#  - name: my-rolling-label
#    value: bar
#    triggerRollingOnUpdate: true # means any change of the machine label value will trigger rolling of all machines of the worker pool
# additionalSecurityGroups:
# - my-existing-security-group
```

### ServerGroups
When you specify the `serverGroup` section in your worker group configuration, a new server group will be created with the configured policy for each worker group that enabled this setting and all machines managed by this worker group will be assigned as members of the created server group.

For users to have access to the server group feature, it must be enabled on the `CloudProfile` by your operator.
Existing clusters can take advantage of this feature by updating the server group configuration of their respective worker groups. Worker groups that are already configured with server groups can update their setting to change the policy used, or remove it altogether at any time.

Users must be aware that **any change to the server group settings will result in a rolling deployment of new nodes for the affected worker group**.

Please note the following restrictions when deploying workers with server groups:
+ The `serverGroup` section is optional, but if it is included in the worker configuration, it must contain a valid policy value.
+ The available `policy` values that can be used, are defined in the provider specific section of `CloudProfile` by your operator.
+ Certain policy values may induce further constraints. Using the `affinity` policy is only allowed when the worker group utilizes a single zone.

### MachineLabels
The `machineLabels` section in the worker group configuration allows to specify additional machine labels. These labels are added to the machine
instances only, but not to the node object. Additionally, they have an optional `triggerRollingOnUpdate` field. If it is set to `true`, changing the label value
will trigger a rolling of all machines of this worker pool.

### AdditionalSecurityGroups
The `additionalSecurityGroups` field allows attaching one or more pre-existing OpenStack security groups to every node in the worker pool, in addition to the security group that is automatically managed by the infrastructure reconciler. The security groups are referenced by name and must already exist in OpenStack before the worker pool is reconciled.

Any change to the list of additional security groups (adding, removing, or renaming entries) will trigger a rolling replacement of all machines in the worker pool. Reordering the list without changing the entries does not trigger a roll.

### Node Templates
Node templates allow users to override the capacity of the nodes as defined by the server flavor specified in the `CloudProfile`'s `machineTypes`. This is useful for certain dynamic scenarios as it allows users to customize cluster-autoscaler's behavior for these workergroup with their provided values.
The `nodeTemplate.virtualCapacity` can be used to specify node extended resources that are updated on nodes belonging to the pool. There are in general no caveats wrt rollouts
* Any addition, deletions, or updates to the `providerConfig` will not trigger a rolling update of nodes.

## Example `Shoot` manifest (one availability zone)

Please find below an example `Shoot` manifest for one availability zone:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
  name: johndoe-openstack
  namespace: garden-dev
spec:
  cloudProfile:
    name: openstack
  region: europe-1
  secretBindingName: core-openstack
  provider:
    type: openstack
    infrastructureConfig:
      apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
      kind: InfrastructureConfig
      floatingPoolName: MY-FLOATING-POOL
      networks:
        workers: 10.250.0.0/19
    controlPlaneConfig:
      apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
      kind: ControlPlaneConfig
      loadBalancerProvider: haproxy
    workers:
    - name: worker-xoluy
      machine:
        type: medium_4_8
      minimum: 2
      maximum: 2
      zones:
      - europe-1a
  networking:
    nodes: 10.250.0.0/16
    type: calico
  kubernetes:
    version: 1.33.0
  maintenance:
    autoUpdate:
      kubernetesVersion: true
      machineImageVersion: true
  addons:
    kubernetesDashboard:
      enabled: true
    nginxIngress:
      enabled: true
```

## CSI volume provisioners

Every OpenStack shoot cluster will be deployed with the OpenStack Cinder CSI driver.
It is compatible with the legacy in-tree volume provisioner that was deprecated by the Kubernetes community and will be removed in future versions of Kubernetes.
End-users might want to update their custom `StorageClass`es to the new `cinder.csi.openstack.org` provisioner.

### VolumeSnapshotClass

Every OpenStack shoot cluster is deployed with a managed `VolumeSnapshotClass` named `csi-cinder` for the Cinder CSI driver:

```yaml
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshotClass
metadata:
  name: csi-cinder
driver: cinder.csi.openstack.org
deletionPolicy: Delete
```

By default, this class is annotated as the cluster-wide default (`snapshot.storage.kubernetes.io/is-default-class: "true"`), so `VolumeSnapshot` objects that do not explicitly reference a snapshot class will use it automatically.

## Kubernetes Versions per Worker Pool

This extension supports `gardener/gardener`'s `WorkerPoolKubernetesVersion` feature gate, i.e., having [worker pools with overridden Kubernetes versions](https://github.com/gardener/gardener/blob/8a9c88866ec5fce59b5acf57d4227eeeb73669d7/example/90-shoot.yaml#L69-L70) since `gardener-extension-provider-openstack@v1.23`.

## Shoot CA Certificate and `ServiceAccount` Signing Key Rotation

This extension supports `gardener/gardener`'s `ShootCARotation` and `ShootSARotation` feature gates since `gardener-extension-provider-openstack@v1.26`.
