---
github_repo: 'https://github.com/gardener/gardener-extension-shoot-cert-service'
github_subdir: docs/usage
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-cert-service/dns_challenge_on_shoot.md
  to: dns_challenge_on_shoot.md
persona: Users
title: Dns Challenge On Shoot
prev: false
next: false
---
<!-- BANNER:MANAGED -->
<!--
   █▀▀ ▀█▀ █▀█ █▀█
   ▀▀█  █  █ █ █▀▀
   ▀▀▀  ▀  ▀▀▀ ▀

   ┌────────────────────────────────────────────────┐
   │  MANAGED FILE — aggregated from upstream       │
   │                                                │
   │  Editing here is pointless: The nightly        │
   │  aggregation run overwrites this file.         │
   │                                                │
   │  Open a PR against the source instead: ─────┐  │
   │                          ┌──┐    ┌──────────┘  │
   │                          └──│────┘             │
   │           ┌─────────────────┘                  │
   └───────────│────────────────────────────────────┘
               ▼               
   https://github.com/gardener/gardener-extension-shoot-cert-service/blob/master/docs/usage/dns_challenge_on_shoot.md
-->


# DNS01 Challenge on Shoot

## Overview

When requesting certificates via the ACME DNS01 challenge, `cert-management` needs to create a temporary DNS `TXT` record to prove domain ownership to the CA. By default, this DNS entry is written to the **seed cluster's** control plane namespace (where `cert-management` runs).

The `dnsChallengeOnShoot` option routes DNS01 challenge entries to the **shoot cluster** instead. Use it when:

- The shoot manages its own DNS providers (e.g. via an own deployment of [external-dns-management](https://github.com/gardener/external-dns-management)) and the seed has no write access to the shoot's DNS zones.
- You are using a private or custom ACME server whose DNS zone is only reachable from the shoot cluster.
- You want DNS challenge entries isolated per-shoot rather than written into the shared seed control plane namespace.

## Configuration

Set `dnsChallengeOnShoot` in the shoot's `Extension` resource under `spec.providerConfig`:

```yaml
kind: Shoot
apiVersion: core.gardener.cloud/v1beta1
...
spec:
  extensions:
  - type: shoot-cert-service
    providerConfig:
      apiVersion: service.cert.extensions.gardener.cloud/v1alpha1
      kind: CertConfig
      dnsChallengeOnShoot:
        enabled: true
        namespace: mynamespace   # required
        dnsClass: myclass        # optional, selects a specific DNS controller instance
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `enabled` | `bool` | yes | Enables DNS01 challenge entries on the shoot cluster. When `false` (default), entries are created in the seed control plane namespace. |
| `namespace` | `string` | yes | Namespace in the shoot cluster where DNS challenge entries are created. |
| `dnsClass` | `string` | no | DNS class annotation set on created `DNSEntry` objects. Use this to select a specific DNS controller instance in the shoot cluster. |

When `enabled` is `true`, `cert-controller-manager` uses a separate kubeconfig pointing to the shoot cluster for DNS operations. The shoot's DNS controllers (e.g. `shoot-dns-service`) then handle TXT record propagation instead of the seed-level DNS management.

## Example

A custom ACME issuer for a private domain with DNS challenges routed to the shoot cluster:

```yaml
kind: Shoot
apiVersion: core.gardener.cloud/v1beta1
metadata:
  name: my-shoot
  namespace: my-project
spec:
  extensions:
  - type: shoot-cert-service
    providerConfig:
      apiVersion: service.cert.extensions.gardener.cloud/v1alpha1
      kind: CertConfig
      issuers:
      - name: my-private-issuer
        server: https://acme.private.company-net/directory
        email: admin@company-net
        precheckNameservers:
        - dns1.private.company-net:53
      dnsChallengeOnShoot:
        enabled: true
        namespace: my-namespace
```
