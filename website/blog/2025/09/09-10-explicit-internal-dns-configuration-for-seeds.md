---
title: "Explicit Internal DNS Configuration for Seeds"
linkTitle: "Explicit Internal DNS Configuration for Seeds"
newsSubtitle: September 10, 2025
publishdate: 2025-09-10
authors:
- avatar: https://avatars.githubusercontent.com/dimityrmirchev
  login: dimityrmirchev
  name: Dimitar Mirchev
aliases: ["/blog/2025/09/10/explicit-internal-dns-configuration-for-seeds"]
---

Gardener's DNS management capabilities have been enhanced to provide a more explicit, secure, and flexible method for configuring internal DNS for `Seed` clusters. This change moves away from a global, label-based secret selection to a direct configuration within the `Seed` API.

### A New API for Per-Seed Configuration

Previously, internal DNS settings were configured globally for an entire Gardener landscape via a single, specially labeled `Secret`. With the recent changes, the `Seed` specification has been extended with a new `.spec.dns.internal` field. This allows operators to define internal DNS settings on a per-seed basis.

The new `SeedDNSProviderConfig` object includes the following fields:
*   `type`: The DNS provider type (e.g., `aws-route53`, `local`).
*   `domain`: The internal domain name to be used by the provider.
*   `zone` (optional): The specific zone where DNS records are managed.
*   `credentialsRef`: A reference to a `Secret` that holds the credentials for authenticating with the DNS provider.

This new approach offers several advantages:
*   **Granular Control:** Operators can now configure different internal domains and credentials for each `Seed`, reducing the blast radius in case a secret is compromised. This also helps in avoiding potential rate limits from DNS providers.
*   **Explicit and Validated:** By moving the configuration into an explicit API field, it becomes easier to validate and is less prone to errors than the previous implicit, label-based discovery mechanism.
*   **Future-Ready:** The API is designed to support other credential types in the future, such as `WorkloadIdentity`.

### Migration Path for Operators

To ensure a smooth transition, Gardener provides an automatic migration path. On startup, a `gardenlet` will check if the `.spec.dns.internal` field is set for its `Seed`. If the field is empty, `gardenlet` will automatically populate it by reading the configuration from the existing globally-defined internal domain `Secret`.

However, this automatic population is a temporary measure to facilitate migration. Operators are required to adapt their `Seed` manifests and configuration templates to explicitly define the `.spec.dns.internal` block.

**Important:** The `.spec.dns.internal` field will become a **mandatory configuration** after the release of Gardener **v1.129.0**.

This enhancement is the first step in improving DNS configuration management. A similar change is also planned for the default domain configuration in a future release.

***

**For more details, you can check out the following resources:**
*   [Recording of the Talk](https://youtu.be/aUCxInp-yaA?t=1109)
*   [GitHub Pull Request #12663](https://github.com/gardener/gardener/pull/12663)