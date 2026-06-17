---
title: Credential Rotation
weight: 3
---

## Overview

Gardener manages a number of credentials for every shoot cluster — certificate authorities, SSH key pairs, encryption keys, service account signing keys, and observability passwords.
Beyond those, you provide cloud provider credentials (such as an Azure Service Principal or AWS access keys) that Gardener uses to manage your cluster's infrastructure.

These two classes of credentials are distinct in how they are owned and how they are rotated:

| Class | Examples | Who rotates |
|---|---|---|
| **User-provided** | Cloud provider keys (AWS, Azure, GCP, OpenStack) | You, using the procedure below |
| **Gardener-managed** | CAs, SSH key pair, ETCD encryption key, ServiceAccount signing key, observability passwords | You, via `kubectl annotate` operations on the Shoot |

For step-by-step instructions, go directly to the relevant guide in the [Credentials Rotation for Shoot Clusters](https://github.com/gardener/gardener/blob/master/docs/usage/shoot-operations/shoot_credentials_rotation.md) documentation:
- [Rotating user-provided credentials](https://github.com/gardener/gardener/blob/master/docs/usage/shoot-operations/shoot_credentials_rotation.md#user-provided-credentials) (cloud provider keys)
- [Rotating Gardener-managed credentials](https://github.com/gardener/gardener/blob/master/docs/usage/shoot-operations/shoot_credentials_rotation.md#gardener-provided-credentials) (CAs, SSH, ETCD, etc.)

## Two-Phase Rotation Model

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
- ETCD encryption key (enabled by default on new shoots)
- Observability passwords

Certificate authorities and the ServiceAccount signing key require user action between phases and therefore cannot be rotated automatically.

For configuration details, see [Automatic Credentials Rotation](https://github.com/gardener/gardener/blob/master/docs/usage/shoot/shoot_maintenance.md#automatic-credentials-rotation).

## User-Provided Credentials

![user-provided-keys](./images/user-provided-keys.webp)

You grant Gardener permissions to create infrastructure resources by providing cloud provider keys.
These keys are stored in a `Secret` in the garden cluster and referenced by your Shoot via a `CredentialsBinding` (or the legacy `SecretBinding`).

When you rotate these credentials, you update the `Secret` with new keys, wait for all Shoots using that `Secret` to reconcile successfully, and only then deactivate the old keys in your cloud provider account.

> [!NOTE]
> It is not possible to move a Shoot to a different infrastructure account.

For the full rotation procedure, see [User-Provided Credentials](https://github.com/gardener/gardener/blob/master/docs/usage/shoot-operations/shoot_credentials_rotation.md#user-provided-credentials) in the Credentials Rotation guide.
