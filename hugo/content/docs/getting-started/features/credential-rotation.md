---
title: Credential Rotation
weight: 3
prev: false
next: false
---
<!-- BANNER:LOCAL -->
<!--
   █▀█ █▄▀
   █ █ █▀▄
   ▀▀▀ ▀ ▀

   ┌────────────────────────────────────────────────┐
   │  LOCAL FILE — maintained in gardener/            │
   │  documentation.                                  │
   │                                                  │
   │  Go ahead and edit this file directly.           │
   │  Changes here are the source of truth.           │
   └────────────────────────────────────────────────┘
-->


# Credential Rotation

## Overview

Gardener deals with two distinct classes of credentials for shoot clusters. They differ in scope, ownership, and how they are rotated:
- **Gardener project secrets** are owned and managed by the project owner or admin (Gardener service user). They are used by Gardener to authenticate to cloud provider APIs and manage cloud resources required for the shoots. Rotation of the project secrets is controlled by the project owner/admin and happens via the Gardener API or via the Gardener Dashboard.
- **Shoot cluster secrets** are created automatically when the shoot cluster is created and used for the cluster processes. Shoot cluster credential rotation is responsibility of the project owner/admin and is performed for most of the credentials in two steps. You can find more details below.

## Gardener Project Secrets (Infrastructure Credentials)

![user-provided-keys](./images/user-provided-keys.webp)

Gardener project secrets are cloud provider keys you supply to Gardener so it can manage your cluster's infrastructure (networks, VMs, disks, load balancers).
These keys are stored in a `Secret` in the garden cluster's project namespace and referenced by your shoot via a `CredentialsBinding`. A single `Secret` can be shared across multiple shoots.

When you rotate these credentials, you update the `Secret` with new keys, wait for all shoots referencing that `Secret` to reconcile successfully, and only then deactivate the old keys in your cloud provider account.

> [!NOTE]
> It is not possible to move a shoot to a different infrastructure account.

## Shoot Cluster Credential Rotation

For Gardener-managed credentials, rotation happens in two phases where possible.

![rotation-phases](./images/rotation-phases.webp)

In the **Preparing phase**, new credentials are created alongside the old ones — both sets are valid simultaneously.
This gives you time to update any API clients, kubeconfigs, or tooling that depend on the old credentials before they are invalidated.

In the **Completing phase**, the old credentials are invalidated and only the new set remains.
You should only trigger this phase after all clients have been updated to use the new credentials.

The shoot's status always reflects the current rotation phase, readable at `.status.credentials.rotation`.

You can also conveniently trigger rotation from the Gardener dashboard:

![Prepare the rotation of all credentials from the Gardener dashboard](./images/prepare-rotation-of-all-credentials.webp)

## Automatic Rotation

Some Gardener-managed credential types support automatic rotation during the maintenance window via `.spec.maintenance.autoRotation.credentials`:

- SSH key pair
- etcd encryption key (enabled by default on new shoots)
- Observability passwords

Certificate authorities and the ServiceAccount signing key require user action between phases and therefore cannot be rotated automatically.

For configuration details, see [Automatic Credentials Rotation](https://github.com/gardener/gardener/blob/master/docs/usage/shoot/shoot_maintenance.md#automatic-credentials-rotation).

## Additional Details

For step-by-step instructions, go directly to the relevant section in the Credentials Rotation for Shoot Clusters documentation:
- [Infrastructure credentials](https://github.com/gardener/gardener/blob/master/docs/usage/shoot-operations/shoot_credentials_rotation.md#infrastructure-credentials-project-scoped) (cloud provider keys)
- [Shoot credentials](https://github.com/gardener/gardener/blob/master/docs/usage/shoot-operations/shoot_credentials_rotation.md#shoot-credentials-gardener-managed) (CAs, SSH, ETCD, etc.)
