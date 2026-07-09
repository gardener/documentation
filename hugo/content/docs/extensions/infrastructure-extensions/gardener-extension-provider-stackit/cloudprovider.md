---
github_repo: 'https://github.com/stackitcloud/gardener-extension-provider-stackit'
github_subdir: docs
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/infrastructure-extensions/gardener-extension-provider-stackit/cloudprovider.md
  to: cloudprovider.md
title: Cloudprovider
prev: false
next: false
managed: true
---

# CloudProvider Configuration

This document describes the CloudProvider configuration for the STACKIT Gardener Extension, including the cloudprovider secret and the `CloudProfileConfig`.

## CloudProvider Secret

The cloudprovider secret requires the following fields:

| Field | Key | Description | Required |
| --- | --- | --- | --- |
| Project ID | `project-id` | project identifier | Yes |
| Service Account JSON | `serviceaccount.json` | service account credentials in JSON format | Yes |

**Example Secret:**

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: cloudprovider
  namespace: shoot--<project>--<cluster>
type: Opaque
stringData:
  project-id: <project-id>
  serviceaccount.json: <sa-json>
```

The service account needs the following permissions:

| Permission | Purpose |
| --- | --- |
| `nlb.admin` | CCM service-controller, network load balancer and self-hosted shoot exposure controller |
| `blockstorage.admin` | CSI driver |
| `compute.admin` | CCM node-controller and MCM |
| `iaas.network.admin` | bastion and infrastructure controller |
| `iaas.isolated-network.admin` | infrastructure controller |

## CloudProfileConfig Fields

Example with comments:

```yaml
providerConfig:
  # image mappings used for bastion and workers
  machineImages:
    - name: ubuntu
      versions:
        - version: "22.04"
          regions:
            - name: eu01
              # provider-specific image ID
              id: <image-id>
              architecture: amd64
  # rescan block devices after resize
  rescanBlockStorageOnResize: true
  # list of IPs of DNS servers used while creating subnets
  dnsServers:
    - 1.1.1.1
  # shoot storage classes
  storageClasses:
    - name: default
      default: true
      parameters:
        type: "storage_premium_perf4"
      provisioner: block-storage.csi.stackit.cloud
```
