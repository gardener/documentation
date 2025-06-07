---
title: How do you rotate IaaS keys for a running cluster?
---

End-users must provide credentials such that Gardener and Kubernetes controllers can communicate with the respective cloud provider APIs in order to perform infrastructure operations. These credentials should be regularly rotated.

How to do so is explained in [Shoot Credentials Rotation](https://github.com/gardener/gardener/blob/master/docs/usage/shoot-operations/shoot_credentials_rotation.md#cloud-provider-keys).
