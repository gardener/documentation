---
title: "No More `/etc/hosts`: A New Era for DNS in Gardener's Local Setup"
linkTitle: "No More `/etc/hosts`: A New Era for DNS in Gardener's Local Setup"
newsSubtitle: March 18, 2026
publishdate: 2026-03-18
authors:
- avatar: https://avatars.githubusercontent.com/cerealsnow
  login: cerealsnow
  name: Nick
aliases: ["/blog/2026/03/18/no-more-etchosts-a-new-era-for-dns-in-gardeners-local-setup"]
---

Gardener's local development setup has received a significant overhaul, replacing the previous CoreDNS-based system with a more robust and efficient `bind9` DNS server. This change streamlines the development experience by eliminating the need for manual `/etc/hosts` file modifications and introducing near-instant DNS updates.

### The Challenges with the Old DNS Setup

Previously, the local development environment relied on a CoreDNS deployment. While functional, this approach presented several challenges for developers:
*   **Slow Updates:** DNS changes required writing to a ConfigMap and reloading CoreDNS, a process that could take up to a minute to propagate.
*   **No Wildcard Support:** The setup lacked support for wildcard `DNSRecords`, which complicated the handling of ingresses.
*   **Manual Configuration:** Developers had to manually edit their `/etc/hosts` file to resolve `local.gardener.cloud` domains, a cumbersome requirement that had to be managed across different environments like developer machines, CI jobs, and kind nodes.

### A Better Way: Dynamic DNS with BIND9

The new implementation replaces CoreDNS with a proper `bind9` DNS server, which acts as the authoritative server for the `local.gardener.cloud` zone. The most significant change is the complete rewrite of the `DNSRecord` actuator to use RFC 2136 dynamic DNS updates.

This new architecture works by having the `provider-local` controller push DNS updates directly to the `bind9` server whenever a `DNSRecord` object is reconciled. This method offers several key advantages:
*   **Near-Instant Updates:** DNS changes are propagated almost immediately, removing the lengthy delays of the old system.
*   **Wildcard Record Support:** Wildcard DNS records now work out of the box, simplifying ingress management.
*   **Unified DNS Resolution:** The `bind9` server is configured as the upstream resolver for all environments (developer machines, CI workers, and kind nodes), creating a single, consistent source for DNS resolution and removing the need for various hacks and manual file changes.

The only exception to the removal of manual host file entries is for the local container registry. To allow tools like Skaffold to push images without requiring developers to configure insecure registries in their Docker daemon, `registry.local.gardener.cloud` is still mapped to `127.0.0.1` and `::1` in the `/etc/hosts` file.

This substantial rework has not only improved the developer experience but has also resulted in a significant cleanup of the codebase, with over 1,000 lines of code being removed.

### Further Reading

*   [Recording of the presentation](https://youtu.be/JQLnnNJHOew?t=638)
*   [The pull request on GitHub](https://github.com/gardener/gardener/pull/14062)