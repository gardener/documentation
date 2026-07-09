---
aliases:
  - >-
    /blog/2025/10/22/enhanced-endpoint-discovery-with-extensible-advertised-addresses
authors:
  - avatar: 'https://avatars.githubusercontent.com/dnaeon'
    login: dnaeon
    name: Marin Atanasov Nikolov
github_repo: 'https://github.com/gardener/documentation'
github_subdir: hugo/content/blog/2025/10
linkTitle: Enhanced Endpoint Discovery with Extensible Advertised Addresses
newsSubtitle: 'October 22, 2025'
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/blog/2025/10/10-22-extensible-advertised-addresses-for-shoots.md
  to: 10-22-extensible-advertised-addresses-for-shoots.md
publishdate: '2025-10-22'
tags:
  - feature-announcement
  - security
  - observability
  - extensions
  - apeiro
title: Enhanced Endpoint Discovery with Extensible Advertised Addresses
local: true
---

# Enhanced Endpoint Discovery with Extensible Advertised Addresses

Gardener has introduced a new feature that enhances the discoverability of services running within a Shoot's control plane. While the `.status.advertisedAddresses` field in the `Shoot` resource has always provided key endpoints like the API server URL, it now supports extension by other components.

### The Challenge of Endpoint Discovery

Previously, only a default set of addresses, such as the internal and external API server URLs and the service account issuer URL, were published in a Shoot's status. Endpoints for other essential services deployed in the control plane—like Plutono, Prometheus, or Vali—remained hidden. Discovering these required direct access to the Seed cluster and knowledge of the Shoot's technical ID, making them inaccessible to end-users and external tooling that only interact with the `Shoot` resource.

### A New Standard for Advertising Endpoints

To solve this, Gardener now allows any `Ingress` resource in the Shoot's control-plane namespace to be advertised in the `Shoot` status. By applying a simple label, extension developers and operators can make their services easily discoverable.

When an `Ingress` resource is labeled with `endpoint.shoot.gardener.cloud/advertise=true`, Gardener automatically processes it during the next reconciliation. The hostnames found in the `Ingress`'s TLS configuration are then added as new entries to the `.status.advertisedAddresses` list.

For example, to advertise the endpoint for a Plutono dashboard, you would apply the label to its `Ingress` resource:
```bash
kubectl --namespace shoot--<project>--<name> \
    label ingress plutono endpoint.shoot.gardener.cloud/advertise=true
```

After the Shoot reconciles, the list of advertised addresses will include a new entry for Plutono. The name is automatically generated to ensure uniqueness, following the pattern `ingress/<ingress-name>/<tls-index>/<host-index>`.

A typical list of advertised addresses might look like this after the change:
```yaml
- name: external
  url: https://api.my-shoot.external.gardener.cloud
- name: internal
  url: https://api.my-shoot.internal.gardener.cloud
- name: service-account-issuer
  url: https://discovery.gardener.cloud/projects/my-project/shoots/shoot-id/issuer
- name: ingress/plutono/0/0
  url: https://gu-my-shoot.ingress.seed.gardener.cloud
```

This mechanism provides a standardized way for any component, including custom extensions, to publish its endpoints directly on the `Shoot` object, making them programmatically discoverable for users and automation.

### Future Enhancements

This feature currently supports `Ingress` resources, with plans to include support for `Gateway` resources from the Kubernetes Gateway API in the future.

### Find Out More

To learn more about this feature, you can explore the following resources:
* [Watch the original presentation](https://youtu.be/GArG1wh2j1o?t=432)
* [Review the implementation on GitHub](https://github.com/gardener/gardener/pull/13043)
* [Read the developer documentation](/contribute/gardener/shoot-advertised-addresses/)
