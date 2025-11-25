---
title: "Introducing `gardenadm bootstrap` for Autonomous Shoot Clusters"
linkTitle: "Introducing `gardenadm bootstrap` for Autonomous Shoot Clusters"
newsSubtitle: November 25, 2025
publishdate: 2025-11-25
authors:
- email: vedran.lerenc@sap.com
aliases: ["/blog/2025/11/25/introducing-gardenadm-bootstrap-for-autonomous-shoot-clusters"]
---

Gardener is taking a significant step forward in the evolution of autonomous Shoot clusters, as outlined in GAP-28. A new `gardenadm bootstrap` command has been introduced to dramatically simplify the creation of these clusters, particularly for the "medium-touch" scenario.

### The "Medium Touch" Scenario

The medium-touch scenario is designed for environments where Gardener manages the underlying infrastructure for you. The new `gardenadm bootstrap` command serves as the primary entry point for this process, providing the simplest way to get an autonomous Shoot cluster up and running.

### How It Works

The bootstrapping process is initiated from a temporary "bootstrap cluster," which can be a simple `kind` cluster. From there, the `gardenadm bootstrap` command orchestrates the creation of your new autonomous cluster.

Here’s a high-level overview of the steps involved:
1.  **Infrastructure Provisioning**: Gardener’s existing extensions and the Machine-Controller-Manager (MCM) are used to provision the necessary infrastructure and the first worker node, which will host the control plane.
2.  **Secure Access**: A bastion host is created to provide secure SSH access to the new machine for bootstrapping purposes.
3.  **State and Manifest Transfer**: The command copies essential resources to the new machine. This includes the cluster manifests (like the `Shoot` spec and `CloudProfile`) and a new `ShootState` object. This `ShootState` resource is crucial as it contains secrets and machine state from the bootstrap cluster, ensuring a seamless transition and preventing the loss of critical data like SSH keys.
4.  **Control Plane Initialization**: Once the manifests and state are in place, `gardenlet init` is executed on the machine to initialize the control plane. The control plane components, such as `etcd` and the `kube-apiserver`, run as static pods on the node.
5.  **Accessing the Cluster**: Upon successful initialization, a `kubeconfig` for the new autonomous cluster is stored as a Secret in the original bootstrap cluster, allowing you to connect and interact with it.

At the end of this process, the temporary bootstrap cluster is no longer needed and can be discarded.

### What's Next?

This is the first major milestone for the `gardenadm bootstrap` command, and work is already underway on the next set of enhancements. The future roadmap includes:

*   **Self-Management**: Migrating the management of infrastructure, worker, and DNS resources from the bootstrap cluster into the autonomous Shoot cluster itself. This will allow the cluster to manage its own lifecycle.
*   **Scalability**: Enabling the autonomous cluster to join additional worker nodes automatically, moving beyond the initial single-node setup.
*   **External Access**: Exposing the cluster's API server to the outside world, as it is currently only accessible via its internal IP.

The new `gardenadm bootstrap` command represents a powerful new capability for creating and managing autonomous, self-contained Kubernetes clusters with Gardener.

***

### Further Reading

*   [Recording of the presentation](https://youtu.be/GArG1wh2j1o?t=703)