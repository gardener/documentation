---
github_repo: 'https://github.com/gardener/gardener-extension-provider-gcp'
github_subdir: docs/usage
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/infrastructure-extensions/gardener-extension-provider-gcp/gcp-resource-labels.md
  to: gcp-resource-labels.md
persona: Users
title: Gcp Resource Labels
prev: false
next: false
managed: true
---

# GCP Resource Labels

This document describes the labels applied by `gardener-extension-provider-gcp` to GCP resources, and the label sanitization rules that apply to worker pool labels propagated to VM instances.

## Worker Nodes (Compute Engine VM Instances)

Worker node VMs receive labels from two sources: fixed labels set by the extension and labels derived from the worker pool configuration.

### Fixed Labels

| Label Key | Label Value | Description |
| --- | --- | --- |
| `name` | `worker.name` | Identifies the shoot the node belongs to |
| `k8s-cluster-name` | Sanitized Technical ID of the Shoot | Ensures consistency with the label added to all disks by the CSI driver |

### Worker Pool Labels

All labels configured in the worker pool's `.spec.pools[].labels` field are propagated to the corresponding VM instances after sanitization (see [Label Sanitization](#label-sanitization) below).

### VM Network Tags

In addition to labels, GCP VM network tags are set on worker node instances. Network tags are used by GCP firewall rules to control traffic.

| Tag | Description |
| --- | --- |
| `<shoot-technical-id>` | Technical ID of the Shoot; used by Gardener firewall rules to identify the cluster |
| `kubernetes-io-cluster-<shoot-technical-id>` | Cluster identifier following the Kubernetes GCP cloud-provider / CCM convention; required by components such as the GCP CCM and CSI driver that look up cluster resources by this tag |
| `kubernetes-io-role-node` | Marks the instance as a Kubernetes worker node |

### Disks

Boot volumes and data volumes attached to worker nodes receive the same labels as the VM instance they are attached to (i.e., the fixed labels and sanitized worker pool labels described above).

## Bastion Instances

Bastion host VMs are created with a single network tag set to the bastion instance name. This tag is used to scope the dedicated firewall ingress and egress rules to the bastion instance only.

| Tag | Value |
| --- | --- |
| Network tag | `<cluster-name>-<bastion-name>-bastion-<5-char-hash>` |

## Label Sanitization

GCP labels have restrictions on allowed characters. Both label keys and values must:

- Contain only lowercase letters (`a-z`), digits (`0-9`), hyphens (`-`), and underscores (`_`)
- Be at most 63 characters long

The extension sanitizes worker pool label keys and values before applying them to VM instances and disks:

1. The key/value is converted to lowercase.
1. Any character not matching `[a-z0-9_-]` is replaced with an underscore (`_`).
1. For label keys only: leading digits and underscores are stripped, since GCP requires keys to start with a letter.
1. Keys or values that exceed 63 characters are truncated to 63 characters.
1. Keys that are empty after sanitization are dropped entirely.

### Key Collisions

Sanitization can cause key collisions in two situations:

- **Pool label collides with a fixed label** — if a pool label sanitizes to `name` or `k8s-cluster-name` (the fixed keys), the pool label silently overwrites the fixed value. For example, a pool label with key `name` would replace the shoot-name label.
- **Two pool labels sanitize to the same key** — different raw keys can produce the same sanitized key (e.g. `My-label` and `my_label` both become `my-label`). In that case one value silently overwrites the other (Go map iteration order is random, so the winning value is non-deterministic).

To avoid unexpected behavior, ensure pool label keys are unique after sanitization and do not clash with the fixed keys `name` and `k8s-cluster-name`.

### Example

Given a worker pool with the following labels in the Shoot spec:

```yaml
spec:
  provider:
    workers:
    - name: worker-pool-1
      labels:
        worker.gardener.cloud/pool: worker-pool-1
        node.gardener.cloud/critical-components-only: "true"
        example.com/my-label: my-value
```

The labels applied to the corresponding VM instances would be:

```text
worker_gardener_cloud_pool = worker-pool-1
node_gardener_cloud_critical-components-only = true
example_com_my-label = my-value
```
