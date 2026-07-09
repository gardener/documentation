---
description: >-
  Learn about the format of audit events sent to backends and the custom
  annotations injected by Gardener
github_repo: 'https://github.com/gardener/gardener-extension-auditing'
github_subdir: docs/usage
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-auditing/usage-event-format.md
  to: event-format.md
title: Event Format for Shoot Clusters
prev: false
next: false
managed: true
---

# Audit Event Format for Shoot Clusters

The auditing extension forwards Kubernetes audit events to the configured backends using the standard Kubernetes Audit API format. The kube-apiserver sends audit events as [EventList](https://kubernetes.io/docs/reference/config-api/apiserver-audit.v1/#audit-k8s-io-v1-EventList) objects (following the `audit.k8s.io/v1` API schema), where each EventList contains one or more [Event](https://kubernetes.io/docs/reference/config-api/apiserver-audit.v1/#audit-k8s-io-v1-Event) objects.

The auditlog-forwarder receives these EventList batches from the kube-apiserver, enriches each individual Event with Gardener-specific annotations, and forwards them to the configured backends.

## EventList Structure

An EventList is a JSON object with the following structure:

```jsonc
{
  "kind": "EventList",
  "apiVersion": "audit.k8s.io/v1",
  "items": [
    // Array of Event objects (see below)
  ]
}
```

## Event Structure

An Event is a JSON object with the following structure:

```jsonc
{
  "kind": "Event",
  "apiVersion": "audit.k8s.io/v1",
  "level": "Metadata",
  // Other fields
}
```

For the complete event schema, refer to the [Kubernetes Audit Event API documentation](https://kubernetes.io/docs/reference/config-api/apiserver-audit.v1/#audit-k8s-io-v1-Event).

## Gardener Custom Annotations

The auditing extension automatically enriches each audit event with Gardener-specific annotations. These annotations are added to the `annotations` field of each event and provide context about the Gardener environment:

| Annotation Key | Description | Example |
| --- | --- | --- |
| `shoot.gardener.cloud/name` | Name of the Shoot cluster | `crazy-botany` |
| `shoot.gardener.cloud/namespace` | Namespace where the Shoot is defined | `garden-dev` |
| `shoot.gardener.cloud/id` | Unique identifier (UID) of the Shoot cluster | `a1b2c3d4-e5f6-7890-abcd-ef1234567890` |
| `seed.gardener.cloud/name` | Name of the Seed cluster hosting the Shoot | `aws-eu-west-1` |
| `seed.gardener.cloud/id` | Unique identifier (UID) of the Seed cluster | `12345678-abcd-ef12-3456-7890abcdef12` |

These annotations enable you to:
- Correlate audit events with specific Shoot and Seed clusters
- Filter and aggregate events by cluster in your audit backend
- Track cluster activity across your Gardener landscape
- Meet compliance requirements for multi-tenant environments

## Example EventList

Below is a simplified example of an EventList containing a single audit event with Gardener annotations. In practice, an EventList may contain multiple events batched together:

```jsonc
{
  "kind": "EventList",
  "apiVersion": "audit.k8s.io/v1",
  "items": [
    {
      "kind": "Event",
      "apiVersion": "audit.k8s.io/v1",
      "level": "Metadata",
      "auditID": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "stage": "ResponseComplete",
      "requestURI": "/api/v1/namespaces/default/pods",
      "verb": "list",
      "user": {
        "username": "system:serviceaccount:kube-system:default"
      },
      // Other fields
      "annotations": {
        "shoot.gardener.cloud/name": "crazy-botany",
        "shoot.gardener.cloud/namespace": "garden-dev",
        "shoot.gardener.cloud/id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "seed.gardener.cloud/name": "aws-eu-west-1",
        "seed.gardener.cloud/id": "12345678-abcd-ef12-3456-7890abcdef12"
        // Other non-Gardener annotations
      }
    }
  ]
}
```
