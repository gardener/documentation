---
title: Credential Rotation
weight: 3
---

## Keys

There are plenty of keys in Gardener. The ETCD has an encryption key to store secrets encrypted at rest. Gardener generates several certificate authorities (CAs) to ensure secured communication between the various components and actors. Service account tokens are signed with a dedicated key. There is an SSH key pair to allow debugging of nodes and the observability stack has its own passwords too. 

![](./images/keys-1.png)

All of these keys share a common property: they are all Gardener managed. Rotating them however, is potentially very disruptive. Hence, Gardener does not do it automatically, but offers means to users to perform these tasks easily. For a single cluster, a user may conveniently use the dashboard. Of course, it is also possible to do the same by annotating the shoot resource accordingly.

![](./images/keys-2.png)

Where possible, the rotation happens in two phases. Phase 1 introduces new keys while the old ones are still valid. Users can safely exchange keys / CA bundles whereever they are used. Afterwards, phase 2 will invalidate the old keys / CA bundles.

## Rotation Phases

![](./images/rotation-phases.png)

Where possible, credentials rotation is implemented in phases. At the beginning, only the old set of credentials exists. By triggering the rotation, new credentials are created in phase 1 and both sets are valid. Now, all clients have to update and start using the new credentials. Only afterwards it is safe to trigger phase 2, which invalidates the old credentials.

The Shoot's status will always show the current status / phase of the rotation.

## User-Provided Credentials

![](./images/user-provided-keys.png)

A user grants Gardener permissions to create resources by handing over cloud provider keys. These keys are stored in a Secret and referenced to a shoot via a SecretBinding. Gardener uses the keys to create the network for the cluster resources, routes, VMs, disks, and IP addresses. 

When a users rotates credentials, the new keys have to be stored in the same Secret and the Shoot needs to reconcile successfully to ensure the replication to every controller. Afterwards, the old keys can be deleted safely from Gardener's perspective. 

While the reconciliation can be triggered manually, there is no need for it (if you're not in a hurry). Each Shoot reconciles once within 24h and the new keys will be picked up during the next maintenance window.

{{% alert color="info"  title="Note" %}}
It is not possible to move a Shoot to a different infrastructure account (at all!).
{{% /alert %}}