---
title: "New Shared File Storage Options on AWS and GCP"
linkTitle: "New Shared File Storage Options on AWS and GCP"
newsSubtitle: October 08, 2025
publishdate: 2025-10-08
authors:
- avatar: https://avatars.githubusercontent.com/hebelsan
  login: hebelsan
  name: Alexander Hebel
aliases: ["/blog/2025/10/08/new-shared-file-storage-options-on-aws-and-gcp"]
---

# New Shared File Storage Options on AWS and GCP

Gardener continues to expand its storage capabilities, now offering integrated support for managed Network File System (NFS) services on Amazon Web Services (AWS) and Google Cloud Platform (GCP). These additions provide a straightforward way to provision shared, persistent storage with `ReadWriteMany` access for workloads that require concurrent access from multiple pods.

### AWS Elastic File System (EFS) Support

You can now enable the [AWS EFS CSI driver](https://github.com/kubernetes-sigs/aws-efs-csi-driver) for your shoot clusters. When enabled, Gardener automates the necessary setup within your AWS account.

#### What Gardener Manages for You

To simplify the usage of EFS, Gardener will:
*   Create a new, encrypted EFS file system instance for your cluster. Alternatively, you can specify an existing EFS file system to use.
*   Set up EFS mount targets in the subnets for each of your shoot's availability zones.
*   Automatically configure the worker node security groups with the necessary inbound rules on TCP port 2049 to allow NFS traffic.
*   Add the required IAM permissions to the worker node instance profile, allowing the driver to communicate with AWS APIs.
*   Deploy the EFS CSI driver components and a `StorageClass` named `efs-sc` preconfigured to use the file system.

Due to a limitation in the current EFS CSI driver, both the controller and the node components of the driver are deployed directly into the shoot cluster.

#### How to Enable It

To activate the EFS CSI driver, simply enable it in the `infrastructureConfig` section of your shoot manifest. This configuration is immutable after cluster creation.

```yaml
spec:
  provider:
    infrastructureConfig:
      apiVersion: aws.provider.extensions.gardener.cloud/v1alpha1
      kind: InfrastructureConfig
      elasticFileSystem:
        enabled: true
        # id: fs-12345678 # Optional: Use an existing EFS file system
```
> [!NOTE] 
> When using this feature, the instance metadata setting `httpTokens` must not be set to `required`, as this would prevent the driver from accessing the necessary metadata.

### GCP Filestore Support

For clusters on GCP, Gardener now integrates the [GCP Filestore CSI driver](https://cloud.google.com/filestore/docs/csi-driver), providing access to Google's fully managed NFS service.

#### Integration and Deployment

The GCP Filestore CSI driver is integrated following Gardener's standard architecture: the CSI controller components are deployed into the seed cluster's control plane namespace, while the CSI node plugin runs as a DaemonSet on the worker nodes in the shoot cluster.

When you provision a `PersistentVolumeClaim` using the `csi-filestore` storage class, the driver will automatically create a new Filestore instance in your GCP project.

#### How to Enable It

Before enabling the driver, ensure the Filestore API is enabled in your GCP project and that your service account has the `roles/file.editor` permission.

You can enable the driver by setting the `csiFilestore.enabled` flag in the `controlPlaneConfig` of your shoot manifest:

```yaml
spec:
  provider:
    controlPlaneConfig:
      apiVersion: gcp.provider.extensions.gardener.cloud/v1alpha1
      kind: ControlPlaneConfig
      storage:
        csiFilestore:
          enabled: true
```

Once enabled, a `StorageClass` named `csi-filestore` becomes available for provisioning shared volumes.

### Further Information

To learn more, you can explore the original pull requests and the recording from our developer meeting:
*   **Talk Recording:** [EFS + Filestore CSI Drivers](https://youtu.be/mqSwkR8TmuE?t=1174)
*   **AWS EFS Pull Request:** [gardener-extension-provider-aws #1174](https://github.com/gardener/gardener-extension-provider-aws/pull/1174)
*   **GCP Filestore Pull Request:** [gardener-extension-provider-gcp #1095](https://github.com/gardener/gardener-extension-provider-gcp/pull/1095)