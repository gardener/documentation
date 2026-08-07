---
title: "Migrating shoot-dns-service to the Next-Generation DNS Controller"
linkTitle: "Migrating shoot-dns-service to the Next-Generation DNS Controller"
newsSubtitle: June 24, 2026
publishdate: 2026-06-24
authors:
- avatar: https://avatars.githubusercontent.com/MartinWeindel
  email: martin.weindel@sap.com
  login: MartinWeindel
  name: Martin Weindel
tags:
- feature-announcement
- networking
- extensions
aliases: ["/blog/2026/06/24/migrating-shoot-dns-service-to-the-next-generation-dns-controller"]
---

The `shoot-dns-service` extension manages DNS records for Shoot clusters — automatically creating entries for `Service`, `Ingress`, and `DNSEntry` resources. Until now, it relied on the [Gardener controller-manager library](https://github.com/gardener/controller-manager-library), a legacy framework that has been in maintenance mode for years. Keeping up with Kubernetes releases and adding new features required working around an increasingly unfamiliar codebase. The solution: a full rewrite using the standard [controller-runtime](https://github.com/kubernetes-sigs/controller-runtime) library.

## What Changed Under the Hood

The rewrite is not just a dependency swap — it brought meaningful architectural improvements.

**Authoritative DNS queries on reconciliation.** Instead of periodically syncing the full zone state from the provider API, the new controller queries the *authoritative* DNS server directly when checking whether a record needs updating. The authoritative server reflects changes almost immediately, which means the controller only calls the provider API when a write is actually necessary. This is particularly valuable for providers with strict rate limits like AWS Route 53.

The one exception: private zones (unreachable from the seed) and routing-policy records (where the full record set is not visible via public DNS) still fall back to the provider API.

**Direct DNS entry reconciliation.** The old architecture split work across a seed-level controller instance and per-shoot control plane instances, with optional caching layers in between. The new architecture simplifies this: a single DNS controller manager runs per Shoot control plane and communicates directly with the DNS provider, eliminating the shared seed-level instance and any intermediate cache.

**YAML-based configuration.** The new controller uses a YAML config file instead of CLI flags, making operator configuration more explicit and version-controllable.

## A Gradual Rollout — Fully Reversible

A hard cutover would be too risky for production Gardener installations managing hundreds or thousands of Shoots. Instead, three granular opt-in mechanisms are available:

1. **Per Shoot** — set `useNextGenerationController: true` in the extension's `providerConfig` within the Shoot manifest.
2. **Per Seed** — label the Seed with `service.dns.extensions.gardener.cloud/use-next-generation-controller=true`. All Shoots on that Seed then default to the new controller, with per-Shoot opt-out available by setting the field to `false`.
3. **Globally** — set the `--use-next-generation-controller` flag on the extension deployment to enable the new controller for all Shoots across all Seeds.

Importantly, the migration is fully reversible. Reverting the opt-in flag and triggering a Shoot reconciliation restores the previous state — useful if an unforeseen issue surfaces during rollout.

Old and new controller instances can coexist on the same Seed, enabling a phased migration where some Shoots run the new controller while others remain on the legacy one.

## What Operators and Users See

For Shoot users, nothing changes. DNS annotations on `Service` and `Ingress` objects remain the same; `DNSEntry` resources behave identically. The underlying controller is swapped transparently.

For operators, the deployment footprint shrinks: the new architecture removes the seed-level shared DNS controller instance and any DNS proxy layers that existed purely to reduce provider API read traffic. Those optimizations are no longer needed now that the controller uses authoritative DNS queries instead.

## Getting Started

Enable the new controller for a single Shoot by adding the following to its manifest:

```yaml
spec:
  extensions:
  - type: shoot-dns-service
    providerConfig:
      apiVersion: service.dns.extensions.gardener.cloud/v1alpha1
      kind: DNSConfig
      useNextGenerationController: true
```

For a Seed-wide rollout, label the Seed:

```bash
kubectl label seed <seed-name> service.dns.extensions.gardener.cloud/use-next-generation-controller=true
```

More details on the architecture and migration mechanics are linked in the pull requests below.

## References

- [📽️ Recording — Review Meeting 2026/06/24, v1.145 Release](https://youtu.be/sxIoblNMKA4?t=3205)
- [shoot-dns-service#727 — Add global flag to enable next-generation controller for all Shoots](https://github.com/gardener/gardener-extension-shoot-dns-service/pull/727)
- [shoot-dns-service#643 — Add label for Seed to control usage of next-generation controller](https://github.com/gardener/gardener-extension-shoot-dns-service/pull/643)
- [shoot-dns-service#615 — Allow per-Shoot configuration in Shoot manifest](https://github.com/gardener/gardener-extension-shoot-dns-service/pull/615)
