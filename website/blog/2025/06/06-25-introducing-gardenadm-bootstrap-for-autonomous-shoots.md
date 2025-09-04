---
title: "Introducing `gardenadm bootstrap` for Autonomous Shoots"
linkTitle: "Introducing `gardenadm bootstrap` for Autonomous Shoots"
newsSubtitle: June 25, 2025
publishdate: 2025-06-25
authors:
- avatar: https://avatars.githubusercontent.com/timebertt
  email: timebertt@gmail.com
  login: timebertt
  name: Tim Ebert
aliases: ["/blog/2025/06/25/introducing-gardenadm-bootstrap-for-autonomous-shoots"]
---

Gardener is enhancing its capabilities to support autonomous Shoot clusters, a model where the control plane runs on dedicated nodes within the cluster itself rather than on a separate Seed cluster. This approach is ideal for edge, air-gapped, or self-hosted Gardener environments. A new command-line tool, `gardenadm`, is being developed to streamline the creation and management of these clusters, as outlined in [GEP-28](https://github.com/gardener/gardener/tree/master/docs/proposals/28-autonomous-shoot-clusters.md).

A significant step forward is the new `gardenadm bootstrap` command, which implements the "medium-touch" provisioning scenario.

### The "Medium-Touch" Provisioning Scenario

The medium-touch approach simplifies the creation of autonomous Shoots by leveraging existing Gardener components. Instead of requiring manual infrastructure setup, it uses a temporary bootstrap cluster, such as a local `kind` cluster, to provision the control plane machines on your cloud provider of choice.

This method automates the initial, complex steps of setting up machines and networking, providing a smoother path to a fully autonomous Kubernetes cluster.

### A Look Inside the Bootstrap Process

The `gardenadm bootstrap` command orchestrates a sequence of operations on the temporary bootstrap cluster:

1.  **Component Deployment:** It begins by deploying essential Gardener components, including the Gardener Resource Manager (GRM), the Machine Controller Manager (MCM), and the required provider-specific extensions.
2.  **Infrastructure Provisioning:** It creates `Infrastructure` and `Worker` resources. The provider extension acts on these resources to set up the necessary networking (like VPCs and security groups), and the MCM begins provisioning the virtual machines for the control plane.
3.  **A New Mode for MCM:** In this scenario, the MCM operates in a special mode. Since the Shoot's control plane doesn't exist yet, MCM creates the machines on the cloud infrastructure and immediately sets their status to `Available` without waiting for a corresponding `Node` object to be registered.
4.  **Machine Preparation:** Once a machine is created, a specialized systemd service downloads the `gardenadm` binary onto it, preparing it for the final bootstrapping phase.

### The Road Ahead

With the control plane machines provisioned and prepared, the process is ready for the final steps. This involves using a bastion to access the new machines, copying over the necessary manifests, and executing `gardenadm init` to bring the Kubernetes control plane to life.

Finally, the cluster's state (such as the `Infrastructure` and `Worker` state) will be exported from the temporary bootstrap environment and imported into the new autonomous Shoot. This allows the new cluster to take over the management of its own resources, rendering the temporary bootstrap cluster obsolete.

### Find Out More

To learn more about the ongoing development of autonomous Shoot clusters, you can explore the resources below:

*   **[GEP-28 Umbrella Issue](https://github.com/gardener/gardener/issues/2906)**
*   **[Recording of the Community Meeting Presentation](https://youtu.be/kcXSyloteSs?t=1116)**