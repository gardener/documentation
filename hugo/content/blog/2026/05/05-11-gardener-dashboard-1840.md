---
aliases:
  - /blog/2026/05/11/gardener-dashboard-1840
authors:
  - avatar: 'https://avatars.githubusercontent.com/petersutter'
    login: petersutter
    name: Peter Sutter
github_repo: 'https://github.com/gardener/documentation'
github_subdir: hugo/content/blog/2026/05
linkTitle: Gardener Dashboard 1.84.0
newsSubtitle: 'May 11, 2026'
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/blog/2026/05/05-11-gardener-dashboard-1840.md
  to: 05-11-gardener-dashboard-1840.md
publishdate: '2026-05-11'
tags:
  - dashboard
  - release-notes
title: Gardener Dashboard 1.84.0
local: true
---

# Gardener Dashboard 1.84.0

The Gardener Dashboard [1.84.0](https://github.com/gardener/dashboard/releases/tag/1.84.0) release brings a dedicated Seeds view, vendor branding, improved DNS handling, and several operator and user experience enhancements.

## Seeds List and Details

Operators and landscape viewers now have a dedicated **Seeds** section in the dashboard. The seed list shows status, conditions, Gardener version, access restrictions, and scheduling state. For managed seeds, conditions are sourced from the underlying shoot for richer detail. Managed seeds additionally link to their underlying shoot resource.

The seed details page mirrors the familiar shoot details layout — including YAML view, gardenctl target commands, and observability links.

## Vendor Branding

Landscape administrators can now customize how infrastructure providers, DNS providers, and machine image vendors appear throughout the dashboard. This includes overriding display names, icons, and sort order. For example, an operator running on OpenStack can rebrand it to a corporate name and move it to the top of the provider list.

As part of this change, all built-in providers now show proper display names (e.g. "Google Cloud" instead of the internal identifier `gcp`).

## DNS and Credentials Updates

The dashboard now uses the new `credentialsRef` / `credentials` keys for DNS provider configuration, replacing the deprecated `secretName` field. Workload identities are supported for DNS providers as well, and a new migration button on the credentials page helps transition existing secret bindings to the newer credential bindings format.

## Additional Highlights

- **Seed Plutono link on shoot details:** Operators see a direct link to the seed's Plutono from the shoot details page.
- **Avatar source configuration:** A new `avatarSource` frontend config lets administrators disable Gravatar globally (`none`) and show placeholder icons instead.
- **Target Control Plane for viewers:** Landscape viewers with the appropriate permissions now see the "Target Control Plane" gardenctl command without requiring admin access.
- **Scrollable status tags:** Status tags in cluster lists are now horizontally scrollable when they overflow.
- **Search engine protection:** The dashboard sets `robots.txt` and meta tags to prevent automatic crawling by search engines.

## Helm Chart Deprecation Notice

The `gardener-dashboard` Helm chart is **deprecated** in favor of `gardener-operator` managed deployments. The `identity` Helm chart is **deprecated without replacement**. Both charts will be removed earliest around November 2026. If you still rely on Helm-based dashboard installations, please plan your migration to `gardener-operator` — see the [migration guide](/docs/gardener/concepts/operator/#migrating-an-existing-gardener-landscape-to-gardener-operator).

## Links

- [Recording — Dashboard segment of the Gardener community meeting](https://www.youtube.com/watch?v=xUINvwIt9Kk&t=2207)
- [Release notes — Gardener Dashboard 1.84.0](https://github.com/gardener/dashboard/releases/tag/1.84.0)
- [Helm chart deprecation PR](https://github.com/gardener/dashboard/pull/2935)
