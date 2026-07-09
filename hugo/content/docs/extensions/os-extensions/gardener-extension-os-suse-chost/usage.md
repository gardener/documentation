---
github_repo: 'https://github.com/gardener/gardener-extension-os-suse-chost'
github_subdir: docs/usage
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/os-extensions/gardener-extension-os-suse-chost/usage.md
  to: usage.md
persona: Users
title: Usage
prev: false
next: false
managed: true
---

# Using the SuSE CHost extension with Gardener as end-user

The [`core.gardener.cloud/v1beta1.Shoot` resource](https://github.com/gardener/gardener/blob/master/example/90-shoot.yaml) declares a few fields that must be considered when this OS extension is used.

In this document we describe how this configuration looks like and under which circumstances your attention may be required.

## AWS VPC settings for SuSE CHost workers

Gardener allows you to create SuSE CHost based worker nodes by:

1. Using a Gardener managed VPC
1. Reusing a VPC that already exists (VPC `id` specified in [InfrastructureConfig](/docs/extensions/infrastructure-extensions/gardener-extension-provider-aws/usage/#infrastructureconfig)]

If the second option applies to your use-case please make sure that your VPC has enabled **DNS Support**. Otherwise SuSE CHost based nodes aren't able to join or operate in your cluster properly.

**[DNS](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-dns.html)** settings (required):

- `enableDnsHostnames`: true
- `enableDnsSupport`: true

## Support for vSMP MemoryOne

This extension controller is also capable of generating user-data for the [vSMP MemoryOne](https://marketplace.cloud.vmware.com/services/details/vsmp-memoryone?slug=true) operating system in conjunction with SuSE CHost.
It reacts on the `memoryone-chost` extension type.

### Customizing the MemoryOne hypervisor

To pass configuration parameters to the MemoryOne hypervisor, this extension supports two configuration types.

#### Legacy configuration **(deprecated)**

It is possible to configure the parameters for `memoryTopology` and `systemMemory` through respective dedicated fields:

```yaml
apiVersion: memoryone-chost.os.extensions.gardener.cloud/v1alpha1
kind: OperatingSystemConfiguration
memoryTopology: "4"
systemMemory: "8x"
```

- The `memoryTopology` field controls the `mem_topology` setting. If it's not provided then it will default to `2`.
- The `systemMemory` field controls the `system_memory` setting. If it's not provided then it defaults to `6x`.

As these two fields are not sufficient to pass in any other of the several dozens of parameters that vSMP MemoryOne supports, it is possible to *inject* additional key-value pairs through either `memoryTopology` or `systemMemory` by separating them by a semicolon `;`:

```yaml
apiVersion: memoryone-chost.os.extensions.gardener.cloud/v1alpha1
kind: OperatingSystemConfiguration
memoryTopology: "3;debug_features=&0xffffffff"
systemMemory: "7x"
```

This however is discouraged and hence, the legacy fields for `memoryTopology` or `systemMemory` are **deprecated** and will be removed in a future version.

#### New vSMP configuration **(recommended)**

It is possible to configure any key-value pair that configures the vSMP MemoryOne hypervisor by passing them in the `vsmpConfiguration` map. Note, that the keys must be the ones that vSMP MemoryOne understands, i.e. `mem_topology` instead of `memoryTopology` and `system_memory` instead of `systemMemory`.

```yaml
apiVersion: memoryone-chost.os.extensions.gardener.cloud/v1alpha1
kind: OperatingSystemConfiguration
vsmpConfiguration:
  mem_topology: "3"
  system_memory: "7x"
  debug_features: "&0xffffff"
  pci_dev_filter: "\"00:0a:ce\""
```

Internally, this is a `map[string]string` hence, numbers/integers and/or booleans must be quoted. If quotes are necessary in values, they can be escaped.

**Please note** that semicola `;` are not allowed inside values for `vsmpConfiguration` - if a semicolon is found in a value, it and anything that follows will get stripped before being processed any further.

### Using vSMP MemoryOne with Shoots

As the vSMP MemoryOne OS image you select in a Shoot manifest only contains the MemoryOne hypervisor, you will need a snapshot ID of a SuSE CHost/CHost volume (see below how to create it).

An exemplary worker pool configuration inside a `Shoot` resource using for the vSMP MemoryOne operating system would look as follows:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
  name: vsmp-memoryone
  namespace: garden-foo
spec:
  ...
  workers:
  - name: cpu-worker3
    minimum: 1
    maximum: 1
    maxSurge: 1
    maxUnavailable: 0
    machine:
      image:
        name: memoryone-chost
        version: 9.5.195
        providerConfig:
          apiVersion: memoryone-chost.os.extensions.gardener.cloud/v1alpha1
          kind: OperatingSystemConfiguration
          vsmpConfiguration:
            mem_topology: "3"
            system_memory: "7x"
            debug_features: "&0xffffff"
            pci_dev_filter: "\"00:0a:ce\""
      type: c5d.metal
    volume:
      size: 20Gi
      type: gp2
    dataVolumes:
    - name: chost
      size: 50Gi
      type: gp2
    providerConfig:
      apiVersion: aws.provider.extensions.gardener.cloud/v1alpha1
      kind: WorkerConfig
      dataVolumes:
      - name: chost
        snapshotID: snap-123456
    zones:
    - eu-central-1b
```

Please consult the documentation of vSMP MemoryOne to find out which instance types on the different cloud providers support running vSMP MemoryOne.

### Generating an AWS snapshot ID for the CHost/CHost operating system

The following script will help to generate the snapshot ID on AWS.
It runs in the region that is selected in your `$HOME/.aws/config` file.
Consequently, if you want to generate the snapshot in multiple regions, you have to run in multiple times after configuring the respective region using `aws configure`.

```bash
ami="ami-1234" #Replace the ami with the intended one.
name=`aws ec2 describe-images --image-ids $ami  --query="Images[].Name" --output=text`
cur=`aws ec2 describe-snapshots --filter="Name=description,Values=snap-$name" --query="Snapshots[].Description" --output=text`
if [ -n "$cur" ]; then
  echo "AMI $name exists as snapshot $cur"
  continue
fi
echo "AMI $name ... creating private snapshot"
inst=`aws ec2 run-instances --instance-type t3.nano --image-id $ami --query 'Instances[0].InstanceId' --output=text --subnet-id subnet-1234 --tag-specifications 'ResourceType=instance,Tags=[{Key=scalemp-test,Value=scalemp-test}]'` #Replace the subnet-id with the intended one.
aws ec2 wait instance-running --instance-ids $inst
vol=`aws ec2 describe-instances --instance-ids $inst --query "Reservations[].Instances[].BlockDeviceMappings[0].Ebs.VolumeId" --output=text`
snap=`aws ec2 create-snapshot --description "snap-$name" --volume-id $vol --query='SnapshotId' --tag-specifications "ResourceType=snapshot,Tags=[{Key=Name,Value=\"$name\"}]" --output=text`
aws ec2 wait snapshot-completed --snapshot-ids $snap
aws ec2 terminate-instances --instance-id $inst > /dev/null
echo $snap
```
