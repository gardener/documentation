---
title: "Enhancing Extension Webhooks: Accessing Cluster and Shoot Client from the Context"
linkTitle: "Enhancing Extension Webhooks: Accessing Cluster and Shoot Client from the Context"
newsSubtitle: June 25, 2025
publishdate: 2025-06-25
authors:
- avatar: https://avatars.githubusercontent.com/timuthy
  login: timuthy
  name: Tim Usner
aliases: ["/blog/2025/06/25/enhancing-extension-webhooks-accessing-cluster-and-shoot-client-from-the-context"]
---

Gardener's extensibility is one of its core strengths, allowing developers to tailor and enhance its functionality. A key part of this is the extensions webhook library, which provides a convenient way to implement mutating and validating webhooks. A recent enhancement further improves this library, offering a more powerful and consistent way for webhooks to access crucial cluster information.

### Accessing the `Cluster` Object

Previously, if a webhook needed information about the cluster it was operating on—such as details from the Shoot, Seed, or CloudProfile specification—it had to fetch these resources manually. Now, extension developers can have the corresponding `Cluster` object injected directly into their webhook's context.

To enable this, a mutator or validator simply needs to implement the new `WantsClusterObject` interface. When this interface is implemented, the extensions library ensures that the `Cluster` object is available in the `context.Context` passed to the `Mutate` or `Validate` function. The object can then be easily retrieved using the `ClusterObjectContextKey`. This change simplifies the logic within webhooks, making them cleaner and more focused on their primary task.

### A Unified Way to Get the Shoot Client

For consistency, the method for obtaining a client for the shoot cluster has also been refactored. This introduces a breaking change for extension developers.

The `MutatorWithShootClient` interface has been removed. Instead, developers should now use the new `WantsShootClient` interface. Similar to accessing the `Cluster` object, implementing this interface signals to the library that a shoot client is required. The client can then be retrieved from the context using the `ShootClientContextKey`.

This change streamlines the development process by providing a single, unified pattern for requesting and receiving contextual objects like the `Cluster` object and the shoot `client.Client`.

These enhancements empower extension developers to build more sophisticated and robust webhooks with less boilerplate code.

### Further Information

*   [Watch the recording of the presentation](https://youtu.be/kcXSyloteSs?t=1782)
*   [See the changes on GitHub in Pull Request #12273](https://github.com/gardener/gardener/pull/12273)