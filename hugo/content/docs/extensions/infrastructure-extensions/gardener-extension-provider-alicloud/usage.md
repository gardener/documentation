---
github_repo: 'https://github.com/gardener/gardener-extension-provider-alicloud'
github_subdir: docs/usage
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/usage.md
  to: usage.md
persona: Users
title: Usage
prev: false
next: false
managed: true
---

# Using the Alicloud provider extension with Gardener as end-user

The [`core.gardener.cloud/v1beta1.Shoot` resource](https://github.com/gardener/gardener/blob/master/example/90-shoot.yaml) declares a few fields that are meant to contain provider-specific configuration.

This document describes the configurable options for Alicloud and provides an example `Shoot` manifest with minimal configuration that can be used to create an Alicloud cluster (modulo the landscape-specific information like cloud profile names, secret binding names, etc.).

## Alicloud Provider Credentials

In order for Gardener to create a Kubernetes cluster using Alicloud infrastructure components, a Shoot has to provide credentials with sufficient permissions to the desired Alicloud project.
Every shoot cluster references a `SecretBinding` or a `CredentialsBinding` which itself references a `Secret`, and this `Secret` contains the provider credentials of the Alicloud project.

This `Secret` must look as follows:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: core-alicloud
  namespace: garden-dev
type: Opaque
data:
  accessKeyID: base64(access-key-id)
  accessKeySecret: base64(access-key-secret)
```

The `SecretBinding`/`CredentialsBinding` is configurable in the [Shoot cluster](https://github.com/gardener/gardener/blob/master/example/90-shoot.yaml) with the field `secretBindingName`/`credentialsBindingName`.

The required credentials for the Alicloud project are an [AccessKey Pair](https://www.alibabacloud.com/help/doc-detail/29009.htm) associated with a [Resource Access Management (RAM) User](https://www.alibabacloud.com/help/doc-detail/28627.htm).
A RAM user is a special account that can be used by services and applications to interact with Alicloud Cloud Platform APIs.
Applications can use AccessKey pair to authorize themselves to a set of APIs and perform actions within the permissions granted to the RAM user.

Make sure to [create a Resource Access Management User](https://www.alibabacloud.com/help/doc-detail/93720.htm), and [create an AccessKey Pair](https://partners-intl.aliyun.com/help/doc-detail/116401.htm) that shall be used for the Shoot cluster.

### Permissions

Please make sure the provided credentials have the correct privileges. You can use the following Alicloud RAM policy document and attach it to the RAM user backed by the credentials you provided.

<details>
  <summary>Click to expand the Alicloud RAM policy document!</summary>

```json
{
    "Statement": [
        {
            "Action": [
                "vpc:*"
            ],
            "Effect": "Allow",
            "Resource": [
                "*"
            ]
        },
        {
            "Action": [
                "ecs:*"
            ],
            "Effect": "Allow",
            "Resource": [
                "*"
            ]
        },
        {
            "Action": [
                "slb:*"
            ],
            "Effect": "Allow",
            "Resource": [
                "*"
            ]
        },
        {
            "Action": [
                "nlb:*"
            ],
            "Effect": "Allow",
            "Resource": [
                "*"
            ]
        },
        {
            "Action": [
                "ram:GetRole",
                "ram:CreateRole",
                "ram:CreateServiceLinkedRole"
            ],
            "Effect": "Allow",
            "Resource": [
                "*"
            ]
        },
        {
            "Action": [
                "ros:*"
            ],
            "Effect": "Allow",
            "Resource": [
                "*"
            ]
        }
    ],
    "Version": "1"
}
```
</details>

## `InfrastructureConfig`

The infrastructure configuration mainly describes how the network layout looks like in order to create the shoot worker nodes in a later step, thus, prepares everything relevant to create VMs, load balancers, volumes, etc.

An example `InfrastructureConfig` for the Alicloud extension looks as follows:

```yaml
apiVersion: alicloud.provider.extensions.gardener.cloud/v1alpha1
kind: InfrastructureConfig
# dualStack:
#   enabled: true
networks:
  vpc: # specify either 'id' or 'cidr'
  # id: my-vpc
    cidr: 10.250.0.0/16
  # gardenerManagedNATGateway: true
  # useCustomRouteTable: true
  zones:
  - name: eu-central-1a
    workers: 10.250.1.0/24
  # ipv6CidrBlock: 0
  # natGateway:
    # eipAllocationID: eip-ufxsdg122elmszcg
```

The `networks.vpc` section describes whether you want to create the shoot cluster in an already existing VPC or whether to create a new one:

* If `networks.vpc.id` is given then you have to specify the VPC ID of the existing VPC that was created by other means (manually, other tooling, ...).
* If `networks.vpc.cidr` is given then you have to specify the VPC CIDR of a new VPC that will be created during shoot creation.
  You can freely choose a private CIDR range.
* Either `networks.vpc.id` or `networks.vpc.cidr` must be present, but not both at the same time.
* When `networks.vpc.id` is present, in addition, you can also choose to set `networks.vpc.gardenerManagedNATGateway`. It is by default `false`. When it is set to `true`,
  Gardener will create an Enhanced NATGateway in the VPC and associate it with a VSwitch created in the first zone in the `networks.zones`.
* Please note that when `networks.vpc.id` is present, and `networks.vpc.gardenerManagedNATGateway` is `false` or not set, you have to **manually** create an Enhance NATGateway
  and associate it with a VSwitch that you **manually** created. In this case, make sure the worker CIDRs in `networks.zones` do not overlap with the one you created.
  If a NATGateway is created manually and a shoot is created in the same VPC with `networks.vpc.gardenerManagedNATGateway` set `true`, you need to manually adjust the route rule accordingly.
  You may refer to [here](https://www.alibabacloud.com/help/en/doc-detail/121139.html).

The `networks.zones` section describes which subnets you want to create in availability zones.
For every zone, the Alicloud extension creates one subnet:

* The `workers` subnet is used for all shoot worker nodes, i.e., VMs which later run your applications.

For every subnet, you have to specify a CIDR range contained in the VPC CIDR specified above, or the VPC CIDR of your already existing VPC.
You can freely choose these CIDR and it is your responsibility to properly design the network layout to suit your needs.

If you want to use multiple availability zones then add a second, third, ... entry to the `networks.zones[]` list and properly specify the AZ name in `networks.zones[].name`.

Apart from the VPC and the subnets the Alicloud extension will also create a NAT gateway (only if a new VPC is created), a key pair, elastic IPs, VSwitches, a SNAT table entry, and security groups.

By default, the Alicloud extension will create a corresponding Elastic IP that it attaches to this NAT gateway and which is used for egress traffic.
The `networks.zones[].natGateway.eipAllocationID` field allows you to specify the Elastic IP Allocation ID of an existing Elastic IP allocation in case you want to bring your own.
If provided, no new Elastic IP will be created and, instead, the Elastic IP specified by you will be used.

⚠️ If you change this field for an already existing infrastructure then it will disrupt egress traffic while Alicloud applies this change, because the NAT gateway must be recreated with the new Elastic IP association.
Also, please note that the existing Elastic IP will be permanently deleted if it was earlier created by the Alicloud extension.

## Custom Route Table (`networks.vpc.useCustomRouteTable`)

`networks.vpc.useCustomRouteTable` defaults to `false` (or `nil`, which is equivalent). It can only be specified at shoot **creation time** — any attempt to change it on an existing shoot is rejected by admission validation, regardless of direction. When set to `true`, Gardener creates a dedicated route table for this shoot instead of using the VPC's system default route table. All shoot VSwitches will be associated with this custom route table.

Gardener adds the following routes to the custom route table:
* `0.0.0.0/0 → NatGateway` — default IPv4 egress route.
* `::/0 → IPv6Gateway` — default IPv6 egress route (only when `dualStack.enabled: true`).

This feature works regardless of whether the VPC is Gardener-managed or user-provided.

**User-provided VPC requirement:** When `useCustomRouteTable: true` is combined with a user-provided VPC (`networks.vpc.id`), `networks.vpc.gardenerManagedNATGateway` must also be set to `true`. This ensures each shoot manages its own NAT Gateway, preventing a multi-shoot VPC scenario where one shoot's cleanup inadvertently deletes a shared NAT Gateway that other shoots in the same VPC depend on.

**Immutability:** `useCustomRouteTable` can only be set at shoot creation time and cannot be changed or removed afterwards. Attempting to modify it on an existing shoot will be rejected by admission validation.

**CCM integration:** The route table ID is written to `InfrastructureStatus.VPC.routeTableID` and forwarded to the Cloud Controller Manager as `routeTableIDS`, so CCM can manage pod-to-node routes in the correct table.

### Multiple Shoots Sharing a User-Provided VPC

The custom route table feature is what makes it practical to run multiple shoots in the same user-provided VPC. Without it, all shoots would compete over the VPC's single system route table, where only one NAT Gateway can hold the `0.0.0.0/0` default route. With each shoot owning a dedicated route table, routing is fully isolated regardless of how many shoots share the VPC.

**Recommended pattern — the only supported multi-shoot configuration with Gardener-managed NAT Gateways:**

Each shoot must set both:
```yaml
networks:
  vpc:
    id: <shared-vpc-id>
    gardenerManagedNATGateway: true
    useCustomRouteTable: true
```

This gives every shoot:
- Its own managed NAT Gateway, tagged with the shoot's `kubernetes.io/cluster/<namespace>` tag.
- Its own custom route table with a `0.0.0.0/0 → own NAT Gateway` entry (and `::/0 → IPv6 Gateway` when dual-stack is enabled).
- Full isolation: deleting one shoot removes only its own NAT Gateway and route table without affecting any other shoot in the VPC.

**Enforcement:** When creating a new shoot into a user-provided VPC that already contains other Gardener-managed shoots, if `gardenerManagedNATGateway: true` is set, the infrastructure validator will also require `useCustomRouteTable: true`. This prevents a new Gardener-managed NAT Gateway from being stranded outside the system route table. This check runs only at creation time and is skipped during subsequent reconciles.

**Note:** `useCustomRouteTable` can only be set at shoot creation time and cannot be changed afterwards. Plan the configuration before creating the shoot.

**VSwitch CIDR planning:** Ensure that the worker CIDRs configured in `networks.zones[].workers` do not overlap with the CIDR of any existing VSwitch in the shared VPC. Overlapping CIDRs will cause VSwitch creation to fail.

## Dual-Stack Support (`dualStack`)

`dualStack.enabled` defaults to `false`. Setting `dualStack.enabled: true` at the top level of `InfrastructureConfig` enables dual-stack for the shoot so that you can create dual-stacked NLB services in the shoot. This causes Gardener to:

* Enable IPv6 on the VPC (Gardener-managed VPC only).
* Ensure an IPv6 Gateway exists in the VPC.
* Assign a `/64` IPv6 CIDR to each shoot VSwitch.
* Add a `::/0 → IPv6Gateway` route (to the system default route table, or to the custom route table when `useCustomRouteTable: true`).

**Prerequisites — Region support:** Dual-stack requires Alibaba Cloud NLB (Network Load Balancer) support in the region. Supported regions are:

`cn-hangzhou`, `cn-beijing`, `cn-shenzhen`, `cn-shanghai`, `cn-qingdao`, `cn-zhangjiakou`, `cn-chengdu`, `cn-guangzhou`, `cn-hongkong`, `cn-heyuan`, `cn-wulanchabu`, `ap-southeast-7`, `ap-southeast-6`, `ap-southeast-1`, `ap-northeast-1`, `ap-northeast-2`, `ap-southeast-3`, `ap-southeast-5`, `eu-central-1`, `eu-west-1`, `us-east-1`, `us-west-1`, `na-south-1`

### Gardener-managed VPC (`networks.vpc.cidr`)

When Gardener creates the VPC, it will automatically enable IPv6 on the VPC and create an IPv6 Gateway.

`networks.zones[].ipv6CidrBlock` is **optional** for Gardener-managed VPC. Each zone contains one VSwitch, and `ipv6CidrBlock` specifies which `/64` subnet from the VPC's `/56` IPv6 CIDR block is assigned to that zone's VSwitch. The value is an integer in the range **0–255**. For example, if the VPC IPv6 CIDR is `2408:xxxx::/56`, then setting `ipv6CidrBlock: 0` on a zone assigns `2408:xxxx:0::/64` to that zone's VSwitch, and `ipv6CidrBlock: 1` assigns `2408:xxxx:1::/64` to another zone's VSwitch.

If `ipv6CidrBlock` is omitted for a zone, Gardener uses the zone's **array index** in `networks.zones` as the default value (first zone → 0, second zone → 1, and so on). Since zones can only be appended (not reordered), this default is stable across reconciliation cycles.

Effective values — whether explicit or defaulted from the array index — must be **unique across all zones**. If you mix explicit and omitted values, admission validates that no default index collides with an explicit value in another zone and reports an error if it does.

### User-provided VPC (`networks.vpc.id`)

Before enable dual-stack, you must enable IPv6 on the VPC and ensure an IPv6 Gateway exists:

* When you enable IPv6 on a VPC through the **Alibaba Cloud console**, an IPv6 Gateway is **created automatically**. The console also offers the option to enable IPv6 on all existing VSwitches in the VPC at the same time (assigning each a `/64` CIDR). **We strongly recommend against using this bulk-enable option.** If a VSwitch already has an IPv6 CIDR assigned, Gardener will not overwrite it, which means any `ipv6CidrBlock` value you specify in the shoot will have no effect. More importantly, the Alibaba Cloud console assigns subnet indices arbitrarily, giving you no visibility or control over which `/64` block each VSwitch receives. Since a VPC's `/56` IPv6 CIDR provides only 256 non-overlapping `/64` subnets (indices 0–255), careful planning is essential — especially when multiple shoots share the same VPC. Instead, leave the VSwitch IPv6 upgrade to Gardener and control the assignment explicitly via `ipv6CidrBlock`.
* Gardener validates at shoot reconcile time that the VPC has IPv6 enabled and that an IPv6 Gateway exists. If either is missing, the shoot reconcile will fail with a descriptive error. If the VPC was enabled for IPv6 via means other than the Alibaba Cloud console (which normally creates the IPv6 Gateway automatically), you may need to create the IPv6 Gateway manually. Note that each VPC can have at most one IPv6 Gateway.

**`networks.zones[].ipv6CidrBlock` is required** for every zone when using a user-provided VPC. The value is an integer in the range **0–255** that selects the `/64` subnet to assign to that zone's VSwitch. If the VSwitch already has an IPv6 CIDR assigned (e.g., via the Alibaba Cloud console), Gardener will **not** overwrite it and the value is effectively a no-op for that VSwitch — but it must still be provided.

**Important notes for user-provided VPCs:**
* If the target `/64` subnet is already occupied by another VSwitch in the VPC, the API call will fail. Change `ipv6CidrBlock` to a different value and trigger reconciliation.
* When multiple shoots share the same VPC, plan your `ipv6CidrBlock` values carefully to avoid conflicts. Each VSwitch in the VPC can hold only one `/64` IPv6 CIDR, and there are only 256 available slots (0–255) per VPC.
* Once `ipv6CidrBlock` is set for a zone, it cannot be removed (set back to `nil`). It can be changed to a different integer value when prev value is wrong, and will not take effect if the vswitch already has a `/64` CIDR.

**Immutability:** Once `dualStack.enabled: true` is set, it cannot be changed back to `false`. This is enforced by admission validation.

### Creating Dual-Stack NLB Services

Once dual-stack is enabled, the Cloud Controller Manager can provision **DualStack NLB (Network Load Balancer)** services in the shoot cluster. Refer to the [Alibaba Cloud NLB annotations guide](https://www.alibabacloud.com/help/en/ack/ack-managed-and-ack-dedicated/user-guide/configure-nlb-instances-by-using-annotations) for the full list of supported annotations.

**Zone requirement:** Alibaba Cloud requires an NLB instance to span at least **two VSwitches in different NLB-supported zones**. Before creating an NLB service, verify that the shoot's infrastructure contains at least two zones. If not, add additional zones to `networks.zones` in the `InfrastructureConfig` and reconcile the shoot first.

*Note:* Alibaba Cloud supports **Single Zone** instances via a privilege quota (which is disabled by default) . You can apply for this privilege through the [NLB Quotas](https://www.alibabacloud.com/help/en/slb/network-load-balancer/user-guide/nlb-quotas) page. Once the application is approved, you will be able to create an NLB instance in a single zone.

The VSwitch IDs and their corresponding zones are available in the shoot's infrastructure status, which can be found in the shoot's control plane namespace on the seed cluster.

The following is an example of a dual-stack NLB Service. Replace the `zone-maps` annotation values with the actual zone names and VSwitch IDs from the shoot's infrastructure status:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-nlb-service
  annotations:
    # Required: map each zone to its VSwitch ID (at least two zones).
    # Obtain zone names and VSwitch IDs from the shoot's infrastructure status.
    service.beta.kubernetes.io/alibaba-cloud-loadbalancer-zone-maps: "cn-hangzhou-i:vsw-aaaaaaaaaaaaaaaa,cn-hangzhou-j:vsw-bbbbbbbbbbbbbbbb"
    # Optional: set IP version to DualStack (IPv4 + IPv6).
    service.beta.kubernetes.io/alibaba-cloud-loadbalancer-ip-version: DualStack
    service.beta.kubernetes.io/alibaba-cloud-loadbalancer-ipv6-address-type: internet
spec:
  type: LoadBalancer
  # Required: select NLB instead of the default SLB.
  loadBalancerClass: alibabacloud.com/nlb
  ports:
    - name: http
      port: 80
      protocol: TCP
      targetPort: 80
  selector:
    app: my-app
```

### Example: Gardener-managed VPC with dual-stack and custom route table

```yaml
apiVersion: alicloud.provider.extensions.gardener.cloud/v1alpha1
kind: InfrastructureConfig
dualStack:
  enabled: true
networks:
  vpc:
    cidr: 10.250.0.0/16
    useCustomRouteTable: true
  zones:
  - name: cn-hangzhou-i
    workers: 10.250.0.0/24
    ipv6CidrBlock: 0
  - name: cn-hangzhou-j
    workers: 10.250.1.0/24
    ipv6CidrBlock: 1
```

### Example: User-provided VPC with dual-stack

```yaml
apiVersion: alicloud.provider.extensions.gardener.cloud/v1alpha1
kind: InfrastructureConfig
dualStack:
  enabled: true
networks:
  vpc:
    id: vpc-xxxxxxxxxxxxxxx
  zones:
  - name: cn-hangzhou-i
    workers: 10.250.0.0/24
    ipv6CidrBlock: 0
  - name: cn-hangzhou-j
    workers: 10.250.1.0/24
    ipv6CidrBlock: 1
```

## `ControlPlaneConfig`

The control plane configuration mainly contains values for the Alicloud-specific control plane components.
Today, the Alicloud extension deploys the `cloud-controller-manager` and the CSI controllers.

An example `ControlPlaneConfig` for the Alicloud extension looks as follows:

```yaml
apiVersion: alicloud.provider.extensions.gardener.cloud/v1alpha1
kind: ControlPlaneConfig
csi:
  enableADController: true
# cloudControllerManager:
#   featureGates:
#     SomeKubernetesFeature: true
```
The `csi.enableADController` is used as the value of environment [DISK_AD_CONTROLLER](https://github.com/kubernetes-sigs/alibaba-cloud-csi-driver/blob/cd0788a0a440926d504d8f8fb7f6e738fe96f3ae/pkg/disk/nodeserver.go#L80), which is used for AliCloud csi-disk-plugin. This field is optional. When a new shoot is creatd, this field is automatically set true. For an existing shoot created in previous versions, it remains unchanged. If there are persistent volumes created before year 2021, please be cautious to set this field *true* because they may fail to mount to nodes.

The `cloudControllerManager.featureGates` contains a map of explicitly enabled or disabled feature gates.
For production usage it's not recommend to use this field at all as you can enable alpha features or disable beta/stable features, potentially impacting the cluster stability.
If you don't want to configure anything for the `cloudControllerManager` simply omit the key in the YAML specification.

## `WorkerConfig`

The Alicloud extension does not support a specific `WorkerConfig`. However, it supports additional data volumes (plus encryption) per machine.
By default (if not stated otherwise), all the disks are unencrypted.
For each data volume, you have to specify a name.
It also supports encrypted system disk.
However, only [Customized image](https://www.alibabacloud.com/help/doc-detail/172789.htm?spm=a2c63.l28256.b99.244.5da67453bNBrCt) is currently supported to be used as a basic image for encrypted system disk.
Please be noted that the change of system disk encryption flag will cause reconciliation of a shoot, and it will result in nodes rolling update within the worker group.

The following YAML is a snippet of a `Shoot` resource:

```yaml
spec:
  provider:
    workers:
    - name: cpu-worker
      ...
      volume:
        type: cloud_efficiency
        size: 20Gi
        encrypted: true
      dataVolumes:
      - name: kubelet-dir
        type: cloud_efficiency
        size: 25Gi
        encrypted: true
```

## Example `Shoot` manifest (one availability zone)

Please find below an example `Shoot` manifest for one availability zone:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
  name: johndoe-alicloud
  namespace: garden-dev
spec:
  cloudProfile:
    name: alicloud
  region: eu-central-1
  secretBindingName: core-alicloud
  provider:
    type: alicloud
    infrastructureConfig:
      apiVersion: alicloud.provider.extensions.gardener.cloud/v1alpha1
      kind: InfrastructureConfig
      networks:
        vpc:
          cidr: 10.250.0.0/16
        zones:
        - name: eu-central-1a
          workers: 10.250.0.0/19
    controlPlaneConfig:
      apiVersion: alicloud.provider.extensions.gardener.cloud/v1alpha1
      kind: ControlPlaneConfig
    workers:
    - name: worker-xoluy
      machine:
        type: ecs.sn2ne.large
      minimum: 2
      maximum: 2
      volume:
        size: 50Gi
        type: cloud_efficiency
      zones:
      - eu-central-1a
  networking:
    nodes: 10.250.0.0/16
    type: calico
  kubernetes:
    version: 1.32.0
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

## Example `Shoot` manifest (two availability zones)

Please find below an example `Shoot` manifest for two availability zones:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
  name: johndoe-alicloud
  namespace: garden-dev
spec:
  cloudProfile:
    name: alicloud
  region: eu-central-1
  secretBindingName: core-alicloud
  provider:
    type: alicloud
    infrastructureConfig:
      apiVersion: alicloud.provider.extensions.gardener.cloud/v1alpha1
      kind: InfrastructureConfig
      networks:
        vpc:
          cidr: 10.250.0.0/16
        zones:
        - name: eu-central-1a
          workers: 10.250.0.0/26
        - name: eu-central-1b
          workers: 10.250.0.64/26
    controlPlaneConfig:
      apiVersion: alicloud.provider.extensions.gardener.cloud/v1alpha1
      kind: ControlPlaneConfig
    workers:
    - name: worker-xoluy
      machine:
        type: ecs.sn2ne.large
      minimum: 2
      maximum: 4
      volume:
        size: 50Gi
        type: cloud_efficiency
        # NOTE: Below comment is for the case when encrypted field of an existing shoot is updated from false to true.
        # It will cause affected nodes to be rolling updated. Users must trigger a MAINTAIN operation of the shoot.
        # Otherwise, the shoot will fail to reconcile.
        # You could do it either via Dashboard or annotating the shoot with gardener.cloud/operation=maintain
        encrypted: true
      zones:
      - eu-central-1a
      - eu-central-1b
  networking:
    nodes: 10.250.0.0/16
    type: calico
  kubernetes:
    version: 1.32.0
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

## Kubernetes Versions per Worker Pool

This extension supports `gardener/gardener`'s `WorkerPoolKubernetesVersion` feature gate, i.e., having [worker pools with overridden Kubernetes versions](https://github.com/gardener/gardener/blob/8a9c88866ec5fce59b5acf57d4227eeeb73669d7/example/90-shoot.yaml#L69-L70) since `gardener-extension-provider-alicloud@v1.33`.

## Shoot CA Certificate and `ServiceAccount` Signing Key Rotation

This extension supports `gardener/gardener`'s `ShootCARotation` feature gate since `gardener-extension-provider-alicloud@v1.36` and `ShootSARotation` feature gate since `gardener-extension-provider-alicloud@v1.37`.

## BackupBucket

Gardener manages `etcd's` backups for Shoot clusters using provider specific storage solutions. On Alicloud, this storage is implemented through [Alicloud object storage service](https://www.alibabacloud.com/en/product/object-storage-service), which store the backups/snapshots of the `etcd's` cluster data.

The `BackupBucket` resource abstracts the backup infrastructure, enabling Gardener and its extension controllers to manage it seamlessly. This abstraction allows Gardener to create, delete, and maintain backup buckets across various cloud providers in a standardized manner.

The `BackupBucket` resource includes a `spec` field, which defines the configuration details for the backup bucket. These details include:

- A `region` is reference to a region where the bucket should be created.
- A `secretRef` is reference to the secret containing credentials for accessing the cloud provider.
- A `type` field defines the storage provider type like aws, azure, alicloud etc.
- A `providerConfig` field defines provider specific configurations.

### BackupBucketConfig

The `BackupBucketConfig` describes the configuration that needs to be passed over for creation of the backup bucket infrastructure. Configuration for immutability feature a.k.a [worm lock](https://www.alibabacloud.com/help/en/oss/developer-reference/worm) in OSS that can be set on the bucket are specified in `BackupBucketConfig`.

Immutability feature (WORM, i.e. write-once-read-many model) ensures that once backups is written to the bucket, it will prevent locked object from being permanently deleted, hence it cannot be modified or deleted for a specified period. This feature is crucial for protecting backups from accidental or malicious deletion, ensuring data safety and availability for restoration.

The Gardener extension provider for Alicloud supports creating bucket (and enabling already existing buckets if immutability configured) to use [worm lock](https://www.alibabacloud.com/help/en/oss/developer-reference/worm) feature provided by storage provider Alicloud OSS(object storage service).

Here is an example configuration for `BackupBucketConfig`:

```yaml
apiVersion: alicloud.provider.extensions.gardener.cloud/v1alpha1
kind: BackupBucketConfig
immutability:
  retentionType: bucket
  retentionPeriod: 1
  locked: true
```

- **`retentionType`**: Specifies the type of retention policy. Currently, Alicloud OSS supports worm(write-once-read-many) lock on `bucket` level. The allowed value is `bucket`, which applies the retention policy and retention period to the entire bucket. For more details, refer to the [documentation](https://www.alibabacloud.com/help/en/oss/user-guide/oss-retention-policies). Objects in the bucket will inherit the retention period which is set on the bucket.
- **`retentionPeriod`**: Defines the duration for which object(s) in the bucket will remain immutable. Alicloud only supports immutability durations in days, therefore this field must be set as integer.
- **`locked`**: Defines a boolean indicating whether the retention policy is locked or not. Once locked, the policy cannot be removed or shortened, ensuring immutability. Learn more about retention policies [here](https://www.alibabacloud.com/help/en/oss/user-guide/oss-retention-policies).

> [!Note]
> Once OSS bucket is worm policy is locked, it cannot be disabled.

To configure a `BackupBucket` with immutability, include the `BackupBucketConfig` in the `ProviderConfig` of the `BackupBucket` resource. If the `locked` field is set to `true`, the retention policy will be locked, preventing further changes.

Here is an example of configuring a `BackupBucket` OSS worm lock with retentionPeriod set to `1 Day` and locked `true`.

```yaml
apiVersion: extensions.gardener.cloud/v1alpha1
kind: BackupBucket
metadata:
  name: my-backup-bucket
spec:
  type: alicloud
  region: eu-central-1
  secretRef:
    name: my-ali-secret
    namespace: my-namespace
  providerConfig:
    apiVersion: alicloud.provider.extensions.gardener.cloud/v1alpha1
    kind: BackupBucketConfig
    immutability:
      retentionType: bucket
      retentionPeriod: 1
      locked: true
```

> [!Note]
> For Alicloud OSS, if the retention policy is not locked within 24 hours of its creation, the policy becomes invalid.
> Moreover, retention period can only be extended when retention policy is locked.
