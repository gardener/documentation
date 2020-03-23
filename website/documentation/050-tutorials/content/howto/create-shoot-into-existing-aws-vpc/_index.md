---
title: Create a Shoot cluster into existing AWS VPC
description: "Create a Shoot cluster into existing AWS VPC"
type: tutorial-page
level: intermediate
index: 10
category: Operation
scope: app-developer
aliases: ["readmore/shoot-into-existing-aws-vpc"]
---

# Create a Shoot cluster into existing AWS VPC

Gardener can create a new VPC, or use an existing one for your Shoot cluster. Depending on your needs you may want to create Shoot(s) into already created VPC. 
The tutorial describes how to create a Shoot cluster into existing AWS VPC. The steps are identical for Alicloud, Azure, and GCP. Please note that the existing VPC must be in the same region like the shoot cluster that you want to deploy into the VPC.

## TL;DR

If `.spec.provider.infrastructureConfig.networks.vpc.cidr` is specified, Gardener will create a new VPC with the given CIDR block and respectively will delete it on Shoot deletion.  
If `.spec.provider.infrastructureConfig.networks.vpc.id` is specified, Gardener will use the existing VPC and respectively won't delete it on Shoot deletion.


> It's not recommended to create a Shoot cluster into VPC that is managed by Gardener (that is created for another Shoot cluster). In this case the deletion of the initial Shoot cluster will fail to delete the VPC because there will be resources attached to it.  
> Gardener won't delete any manually created (unmanaged) resources in your cloud provider account.


## 1. Configure AWS CLI

The `aws configure` command is a convenient way to setup your AWS CLI. It will prompt you for your credentials and settings which will be used in the following AWS CLI invocations.

```bash
$ aws configure
AWS Access Key ID [None]: <ACCESS_KEY_ID>
AWS Secret Access Key [None]: <SECRET_ACCESS_KEY>
Default region name [None]: <DEFAULT_REGION>
Default output format [None]: <DEFAULT_OUTPUT_FORMAT>
```

## 2. Create VPC

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

## 3. Create Internet Gateway

Gardener also requires that an internet gateway is attached to the VPC. You can create one using:

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

Prepare your Shoot manifest (you could check the [example manifests](https://github.com/gardener/gardener/tree/master/example)). Please make sure that you choose the
region in which you had created the VPC earlier (step 2). Also, put your VPC ID in the `.spec.provider.infrastructureConfig.networks.vpc.id` field:

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

Apply your Shoot manifest.

```bash
$ kubectl apply -f your-shoot-aws.yaml
```

Ensure that the Shoot cluster is properly created.

```bash
$ kubectl get shoot $SHOOT_NAME -n $SHOOT_NAMESPACE
NAME           CLOUDPROFILE   VERSION   SEED   DOMAIN           OPERATION   PROGRESS   APISERVER   CONTROL   NODES   SYSTEM   AGE
<SHOOT_NAME>   aws            1.15.0    aws    <SHOOT_DOMAIN>   Succeeded   100        True        True      True    True     20m
```
