---
github_repo: 'https://github.com/gardener/gardener-extension-provider-azure'
github_subdir: docs/usage
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/azure-resource-tagging.md
  to: azure-resource-tagging.md
persona: Users
title: Azure Resource Tagging
prev: false
next: false
managed: true
---

# Azure Resource Tagging

This document describes which Azure resources are tagged by `gardener-extension-provider-azure` and what tags are applied to each resource type.

## Overview

The extension applies tags to Azure resources for two primary purposes:

1. **Ownership identification** — marking resources as Gardener-managed so they can be found, filtered, and reconciled correctly.
1. **Kubernetes node labeling** — propagating Shoot worker pool labels onto VM instances so that Kubernetes node labels are backed by Azure VM tags (used by the cloud controller manager).

## Tagged Resource Types

### Virtual Machines (Worker Nodes)

Worker node VMs receive tags derived from the worker pool configuration in the Shoot spec.

| Tag Key | Value | Source |
| --- | --- | --- |
| `Name` | Technical ID of the Shoot | Shoot technical ID |
| `kubernetes.io-cluster-{technicalID}` | `"1"` | Shoot technical ID |
| `kubernetes.io-role-node` | `"1"` | Static |
| `{label-key}` | `{label-value}` | Each entry in `shoot.spec.provider.workers[].labels` |

**Example:** Given the following worker pool configuration:

```yaml
spec:
  provider:
    workers:
    - name: production
      labels:
        worker.gardener.cloud/pool: production
        workload-type: high-memory
```

The resulting VM tags are:

```
Name:                                                    shoot--my-project--my-cluster
kubernetes.io-cluster-shoot--my-project--my-cluster:     "1"
kubernetes.io-role-node:                                 "1"
worker.gardener.cloud_pool:                              production
workload-type:                                           high-memory
```

> Note: The label key `worker.gardener.cloud/pool` is sanitized to `worker.gardener.cloud_pool` because `/` is not allowed in Azure tag keys.

### Virtual Machine Scale Sets / Flexible Orchestration Mode for Virtual Machine Scale Sets (VMSS)

Azure Virtual Machine Scale Set resources created for worker pools receive tags that identify them as Gardener-managed and associate them with a specific worker pool.

| Tag Key | Value | Source |
| --- | --- | --- |
| `machineset.azure.extensions.gardener.cloud` | `"1"` | Static — marks the VMSS as Gardener-managed |
| `machineset.azure.extensions.gardener.cloud.worker-name` | Worker pool name | `worker.Name` |

These tags are also used as a filter when listing VMSS resources to determine which ones belong to the extension.

### Public IP Addresses

Public IP addresses created for load balancers (Services of type `LoadBalancer`) are tagged so the extension can identify and manage them across reconciliation cycles.

| Tag Key | Value | Source |
| --- | --- | --- |
| `managed-by-gardener` | `"true"` | Static |
| `gardener-shoot-name` | Technical ID of the Shoot | Shoot technical ID |

During reconciliation, the extension filters Public IPs by requiring **both** of these tags to match.
This prevents the extension from touching Public IPs it did not create.

### Bastion Resources

When a bastion host is created, the following resources are all tagged with the same set of tags:

- Bastion Virtual Machine
- Network Interface Card (NIC) attached to the bastion VM
- Public IP Address of the bastion

| Tag Key | Value | Source |
| --- | --- | --- |
| `Name` | Bastion instance name (cluster name + bastion name + hash) | Derived from cluster and bastion metadata |
| `Type` | `"gardenctl"` | Static |

### Blob Storage Objects

Blobs in Azure Storage accounts may be tagged when they cannot be deleted immediately due to an immutability policy (e.g. WORM retention).
In this case a tag is applied to mark the blob for deferred deletion via a storage lifecycle policy.

| Tag Key | Value | Source |
| --- | --- | --- |
| `blob-marked-for-deletion` | `"true"` | Static |

## Tag Sanitization

Azure VM tags do not allow the characters `< > % \ & ? /` or spaces in tag keys.
Worker pool label keys (and the Shoot technical ID used in `kubernetes.io-cluster-*` keys) are sanitized by replacing any of these characters with an underscore (`_`) and converted to lowercase before the tags are applied.

Note that sanitization can cause key collisions: two distinct label keys that differ only in restricted characters (e.g. `foo/bar` and `foo\bar`) will both be sanitized to the same tag key (`foo_bar`).
In that case the last value written wins and one label will silently be dropped from the VM tags.
