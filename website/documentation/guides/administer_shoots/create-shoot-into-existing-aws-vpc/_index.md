---
title: Create a Shoot Cluster Into an Existing AWS VPC
level: intermediate
category: Operation
scope: app-developer
---

## Overview

Gardener can create a new VPC, or use an existing one for your shoot cluster. Depending on your needs, you may want to create shoot(s) into an already created VPC. 
The tutorial describes how to create a shoot cluster into an existing AWS VPC. The steps are identical for Alicloud, Azure, and GCP. Please note that the existing VPC must be in the same region like the shoot cluster that you want to deploy into the VPC.

## TL;DR

If `.spec.provider.infrastructureConfig.networks.vpc.cidr` is specified, Gardener will create a new VPC with the given CIDR block and respectively will delete it on shoot deletion.  
If `.spec.provider.infrastructureConfig.networks.vpc.id` is specified, Gardener will use the existing VPC and respectively won't delete it on shoot deletion.

{{% alert color="info"  title="Note" %}}
It's not recommended to create a shoot cluster into a VPC that is managed by Gardener (that is created for another shoot cluster). In this case the deletion of the initial shoot cluster will fail to delete the VPC because there will be resources attached to it.

Gardener won't delete any manually created (unmanaged) resources in your cloud provider account.
{{% /alert %}}

## 1. Configure the AWS CLI

The `aws configure` command is a convenient way to setup your AWS CLI. It will prompt you for your credentials and settings which will be used in the following AWS CLI invocations:

```bash
$ aws configure
AWS Access Key ID [None]: <ACCESS_KEY_ID>
AWS Secret Access Key [None]: <SECRET_ACCESS_KEY>
Default region name [None]: <DEFAULT_REGION>
Default output format [None]: <DEFAULT_OUTPUT_FORMAT>
```

## 2. Create a VPC

Create the VPC by running the following command:

```bash
$ aws ec2 create-vpc --cidr-block <cidr-block>
{
  "Vpc": {
      "VpcId": "vpc-ff7bbf86",
      "InstanceTenancy": "default",
      "Tags": [],
      "CidrBlockAssociations": [
          {
              "AssociationId": "vpc-cidr-assoc-6e42b505",
              "CidrBlock": "10.0.0.0/16",
              "CidrBlockState": {
                  "State": "associated"
              }
          }
      ],
      "Ipv6CidrBlockAssociationSet": [],
      "State": "pending",
      "DhcpOptionsId": "dopt-38f7a057",
      "CidrBlock": "10.0.0.0/16",
      "IsDefault": false
  }
}
```

Gardener requires the VPC to have enabled [DNS support](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-dns.html), i.e the attributes `enableDnsSupport` and `enableDnsHostnames` must be set to *true*. `enableDnsSupport` attribute is enabled by default, `enableDnsHostnames` - not. Set the `enableDnsHostnames` attribute to *true*:

```bash
$ aws ec2 modify-vpc-attribute --vpc-id vpc-ff7bbf86 --enable-dns-hostnames
```

## 3. Create an Internet Gateway

Gardener also requires that an internet gateway is attached to the VPC. You can create one by using:

```bash
$ aws ec2 create-internet-gateway
{
    "InternetGateway": {
        "Tags": [],
        "InternetGatewayId": "igw-c0a643a9",
        "Attachments": []
    }
}
```

and attach it to the VPC using:

```bash
$ aws ec2 attach-internet-gateway --internet-gateway-id igw-c0a643a9 --vpc-id vpc-ff7bbf86
```

## 4. Create the Shoot

Prepare your shoot manifest (you could check the [example manifests](https://github.com/gardener/gardener/tree/master/example)). Please make sure that you choose the region in which you had created the VPC earlier (step 2). Also, put your VPC ID in the `.spec.provider.infrastructureConfig.networks.vpc.id` field:

```yaml
spec:
  region: <aws-region-of-vpc>
  provider:
    type: aws
    infrastructureConfig:
      apiVersion: aws.provider.extensions.gardener.cloud/v1alpha1
      kind: InfrastructureConfig
      networks:
        vpc:
          id: vpc-ff7bbf86
    # ...
```

Apply your shoot manifest:

```bash
$ kubectl apply -f your-shoot-aws.yaml
```

Ensure that the shoot cluster is properly created:

```bash
$ kubectl get shoot $SHOOT_NAME -n $SHOOT_NAMESPACE
NAME           CLOUDPROFILE   VERSION   SEED   DOMAIN           OPERATION   PROGRESS   APISERVER   CONTROL   NODES   SYSTEM   AGE
<SHOOT_NAME>   aws            1.15.0    aws    <SHOOT_DOMAIN>   Succeeded   100        True        True      True    True     20m
```