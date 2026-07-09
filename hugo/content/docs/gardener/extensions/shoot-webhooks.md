---
github_repo: 'https://github.com/gardener/gardener'
github_subdir: docs/extensions
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/gardener/extensions/shoot-webhooks.md
  to: shoot-webhooks.md
title: Shoot Webhooks
prev: false
next: false
managed: true
---

# Shoot Resource Customization Webhooks

Gardener deploys several components/resources into the shoot cluster.
Some of these resources are essential (like the `kube-proxy`), others are optional addons (like the `kubernetes-dashboard` or the `nginx-ingress-controller`).
In either case, some provider extensions might need to mutate these resources and inject provider-specific bits into it.

## What's the approach to implement such mutations?

Similar to how [control plane components in the seed](/docs/gardener/extensions/controlplane-webhooks/) are modified, we are using `MutatingWebhookConfiguration`s to achieve the same for resources in the shoot.
Both the provider extension and the kube-apiserver of the shoot cluster are running in the same seed.
Consequently, the kube-apiserver can talk cluster-internally to the provider extension webhook, which makes such operations even faster.

## How is the `MutatingWebhookConfiguration` object created in the shoot?

The preferred approach is to use a `ManagedResource` (see also [Deploy Resources to the Shoot Cluster](/docs/gardener/extensions/managedresources/)) in the seed cluster.
This way the `gardener-resource-manager` ensures that end-users cannot delete/modify the webhook configuration.
The provider extension doesn't need to care about the same.

## What else is needed?

The shoot's kube-apiserver must be allowed to talk to the provider extension.
To achieve this, you need to make sure that the relevant `NetworkPolicy` get created for allowing the network traffic.
Please refer to [this guide](/docs/gardener/network_policies/#webhook-servers) for more information.

## Self-Hosted Shoot Clusters

If running in a self-hosted shoot cluster, the shoot webhooks should be merged into the seed webhooks.
You can do so by setting the `mergeShootWebhooksIntoSeedWebhooks` to `true` in the `extensions/pkg/webhook/cmd.AddToManager` function.
Take a look at [this document](/docs/gardener/extensions/registration/#helm-values) in order to determine whether the extension runs in a self-hosted shoot cluster.
