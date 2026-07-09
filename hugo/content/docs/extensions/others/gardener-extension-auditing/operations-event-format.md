---
description: Learn about the format of audit events sent from Garden clusters
github_repo: 'https://github.com/gardener/gardener-extension-auditing'
github_subdir: docs/operations
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-auditing/operations-event-format.md
  to: event-format.md
title: Event Format for Garden Clusters
prev: false
next: false
managed: true
---

# Audit Event Format for Garden Clusters

For a complete overview of the audit event format, see the [Audit Event Format documentation](/docs/extensions/others/gardener-extension-auditing/usage-event-format/) in the usage guide. This page covers Garden-specific annotations.

## Garden-Specific Annotations

When the auditing extension is configured for a Garden cluster (via `operator.gardener.cloud/v1alpha1` Garden resource), the following annotation is added to each audit event:

| Annotation Key | Description | Example |
| --- | --- | --- |
| `garden.gardener.cloud/id` | Unique identifier (UID) of the Garden cluster (garden.metadata.uid) | `a1b2c3d4-e5f6-7890-abcd-ef1234567890` |
| `garden.gardener.cloud/name` | Name of the Garden resource (garden.metadata.name) | `dev` |
| `garden.gardener.cloud/clusterIdentity` | Cluster identity of the Garden cluster (garden.spec.virtualCluster.gardener.clusterIdentity) | `garden-dev` |

This enables operators to:
- Correlate audit events with specific Garden clusters
- Filter and aggregate events by Garden in centralized audit backends

## Example Garden Annotations

Below is an example showing the Garden-specific annotations in an audit event:

```jsonc
{
  "kind": "EventList",
  "apiVersion": "audit.k8s.io/v1",
  "items": [
    {
      "kind": "Event",
      "apiVersion": "audit.k8s.io/v1",
      "level": "Metadata",
      "auditID": "ba578868-b445-4855-b45c-722d38032874",
      "stage": "ResponseComplete",
      "requestURI": "/api/v1/namespaces/default/serviceaccounts",
      "verb": "list",
      "user": {
        "username": "system:serviceaccount:kube-system:default"
      },
      // Other fields
      "annotations": {
        "garden.gardener.cloud/id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "garden.gardener.cloud/name": "dev",
        "garden.gardener.cloud/clusterIdentity": "garden-dev",
        // Other non-Gardener annotations
      }
    }
  ]
}
```
