---
title: "Say Goodbye to `provider-extensions`: Introducing the New `remote` Setup"
linkTitle: "Say Goodbye to `provider-extensions`: Introducing the New `remote` Setup"
newsSubtitle: March 18, 2026
publishdate: 2026-03-18
authors:
- avatar: https://avatars.githubusercontent.com/oliver-goetz
  login: oliver-goetz
  name: "Oliver G\xF6tz"
tags:
  - feature-announcement
  - extensions
  - apeiro
aliases: ["/blog/2026/03/18/say-goodbye-to-provider-extensions-introducing-the-new-remote-setup"]
---

The Gardener team is excited to announce a significant overhaul of the development setup for working with provider extensions. The former `provider-extensions` setup, which relied on a deprecated Helm chart, has been completely replaced by a new, streamlined `remote` setup based on `gardener-operator`.

## A New, Fully Remote Architecture

The previous setup involved a mix of a local `kind` cluster acting as the garden runtime and a remote seed cluster running on a real infrastructure. This hybrid approach had limitations and required workarounds, such as an SSH tunnel to connect `gardenlet` and a complex deployment for workload identity.

The new `remote` setup simplifies this by running entirely on a single remote Kubernetes cluster. This cluster serves as both the garden runtime and the soil, eliminating the need for a local `kind` cluster in this workflow. This change offers several key advantages:

*   **Simplified Architecture:** By removing the hybrid local/remote model, the new setup is cleaner and easier to understand.
*   **Increased Stability:** Developers can keep their setup running on the remote cluster without worrying about breaking a local `kind` cluster or impacting their local machine's resources.
*   **Improved Reliability:** The new architecture eliminates previous workarounds, like the SSH tunnel, resulting in a more robust and reliable development environment.

## Getting Started with the `remote` Setup

This rework moves the development environment to leverage the `gardener-operator` and the standardized structure in the `./dev-setup/` directory, using Skaffold for building and deploying components.

Getting started is now centered around the `make remote-up` command and the configuration files located in directories containing `remote` within `./dev-setup/`. The process is detailed in the new [Deploying Gardener Remotely](https://github.com/gardener/gardener/blob/master/docs/deployment/getting_started_remotely.md) documentation.

On the first run, the setup automatically generates the necessary YAML files from templates. If you use a Gardener Shoot cluster as your remote cluster, many configuration steps—like setting up networking, regions, and provider types—are automated by pulling information from the shoot's `shoot-info` ConfigMap.

## Future Enhancements

Currently, the `remote` setup supports a single soil cluster. However, work is underway to enable the creation of multiple seeds, including managed seeds across different providers, within a single remote setup. This will be further simplified by upcoming native support for image pull secrets in Gardener, which will remove the need for certain workarounds.

## A Breaking Change for a Better Experience

It is important to note that this is a **breaking change**. The `provider-extensions` setup has been removed, and there is no direct migration path to the new `remote` setup. If you have an existing setup, you must check out a previous Gardener version (v1.137.0 or earlier) to properly delete it and remove all resources from your infrastructure before adopting the new `remote` setup.

This change represents a significant step forward in improving the developer experience for Gardener, making it more stable, streamlined, and powerful.

***

## Further Reading

*   [Recording: Provider Extensions Setup Migrated to `gardener-operator`-Based `remote` Setup](https://youtu.be/JQLnnNJHOew?t=1098)
*   [GitHub Pull Request: Replace `provider-extensions` with `remote` setup](https://github.com/gardener/gardener/pull/13994)
