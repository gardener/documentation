---
title: "Enhanced Storage Flexibility: Introducing AWS EFS and GCP Filestore CSI Drivers"
linkTitle: "Enhanced Storage Flexibility: Introducing AWS EFS and GCP Filestore CSI Drivers"
newsSubtitle: October 08, 2025
publishdate: 2025-10-08
authors:
- avatar: https://avatars.githubusercontent.com/hebelsan
  login: hebelsan
  name: Alexander Hebel
aliases: ["/blog/2025/10/08/enhanced-storage-flexibility-introducing-aws-efs-and-gcp-filestore-csi-drivers"]
---

Gardener continues to expand its storage capabilities, now offering integrated support for shared file systems on AWS and Google Cloud Platform (GCP). With the introduction of the AWS Elastic File System (EFS) and GCP Filestore CSI drivers, you can easily provision and manage scalable, network-attached storage (NFS) for your Kubernetes workloads. This is particularly beneficial for stateful applications that require a shared persistence layer accessible by multiple pods simultaneously.

### Native NFS Support on GCP with Filestore

Gardener now integrates with Google Cloud's fully managed NFS service, GCP Filestore. By enabling the Filestore CSI driver, you can dynamically provision shared file storage for your applications.

#### Enabling the Driver
To get started, simply enable the feature in your shoot's `ControlPlaneConfig`:
```yaml
provider:
  type: gcp
  controlPlaneConfig:
    apiVersion: gcp.provider.extensions.gardener.cloud/v1alpha1
    kind: ControlPlaneConfig
    storage:
      csiFilestore:
        enabled: true
```
Before enabling the driver, ensure that the [Filestore API is active](https://console.cloud.google.com/apis/library/file.googleapis.com) in your GCP project and that the service account in use has the `roles/file.editor` permission.

Once enabled, Gardener automatically deploys the GCP Filestore CSI driver to your shoot. This includes the controller in the seed and the node plugin on your worker nodes. A `StorageClass` named `csi-filestore` is also created, allowing you to provision volumes simply by creating a `PersistentVolumeClaim`.

### Integrating AWS Elastic File System (EFS)

For shoots running on AWS, Gardener now supports the AWS Elastic File System (EFS), a scalable, managed NFS file system. This integration simplifies the process of using shared storage for your containerized applications.

#### Enabling the Driver
You can activate the AWS EFS CSI driver by updating the `InfrastructureConfig` in your shoot specification:
```yaml
provider:
  type: aws
  infrastructureConfig:
    apiVersion: aws.provider.extensions.gardener.cloud/v1alpha1
    kind: InfrastructureConfig
    elasticFileSystem:
      enabled: true
```
This feature is available for shoots using the `flow` infrastructure reconciler. Once enabled, this configuration is immutable.

When you enable the driver, Gardener automates several setup tasks:
*   **EFS Instance Creation**: An EFS file system is automatically provisioned for your shoot. Alternatively, you can use an existing EFS instance by specifying its ID in the `elasticFileSystem.id` field.
*   **Networking**: Mount targets are created in each of your shoot's zones, and the necessary inbound rules are added to your security groups to allow NFS traffic on port 2049.
*   **Permissions**: The required IAM policies are attached to your worker node instance profiles, granting the driver access to the EFS service.
*   **Driver Deployment**: The EFS CSI driver components (both controller and node daemonset) are deployed directly into your shoot cluster.
*   **StorageClass**: A `StorageClass` named `efs-sc` is created, referencing the provisioned EFS file system.

**Important Consideration**: Due to how the driver accesses credentials, you must not set `instanceMetadataOptions.httpTokens` to `required` in your worker configuration when the EFS CSI driver is enabled.

### For More Information
*   [Recording of the presentation](https://youtu.be/mqSwkR8TmuE?t=1172)
*   [AWS EFS CSI Driver GitHub Repository](https://github.com/kubernetes-sigs/aws-efs-csi-driver)
*   [GCP Filestore CSI Driver GitHub Repository](https://github.com/kubernetes-sigs/gcp-filestore-csi-driver)
*   [Gardener AWS Provider Extension PR for EFS](https://github.com/gardener/gardener-extension-provider-aws/pull/1174)
*   [Gardener GCP Provider Extension PR for Filestore](https://github.com/gardener/gardener-extension-provider-gcp/pull/1095)