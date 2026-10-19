---
github_repo: 'https://github.com/gardener/gardener-extension-shoot-falco-service'
github_subdir: docs
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-falco-service/extension-configuration.md
  to: extension-configuration.md
title: Extension Configuration
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
   https://github.com/gardener/gardener-extension-shoot-falco-service/blob/main/docs/extension-configuration.md
-->


# Gardener Falco Extension Configuration

The Gardener Falco extension consists of two components:
- The extension binary (`gardener-extension-shoot-falco-service`)
- The admission binary (`gardener-extension-admission-shoot-falco-service`), which includes mutating and validating webhooks as well as the maintenance controller.

## Extension: `gardener-extension-shoot-falco-service`

The extension binary uses a non-standard configuration parameter, `--config-file`, which points to a configuration YAML file as shown below:

```yaml
apiVersion: falco.extensions.config.gardener.cloud/v1alpha1
kind: Configuration
falco:
  certificateLifetime: 2100h
  certificateRenewAfter: 1600h
  priorityClassName: gardener-shoot-system-900
  centralStorage:
    tokenLifetime: "720h"
    url: <ingestor URL>
    tokenIssuerPrivateKey: |
      -----BEGIN RSA PRIVATE KEY-----
      ...
  clusterIdentityToken:
    tokenIssuerPrivateKey: |
      -----BEGIN RSA PRIVATE KEY-----
      ...
    tokenLifetime: "168h"
  globalDefaultDestinations:
  - name: central-splunk
    falcosidekickOutput:
      key: splunk
      value:
        host: "https://splunk-hec.example.com/services/collector/event"
        token: "my-hec-token"
        checkcert: true
  - name: central-elastic
    falcosidekickOutput:
      key: elasticsearch
      value:
        hostport: "https://elasticsearch.example.com:9200"
        index: "falco"
        suffix: "daily"
        username: "falco"
        password: "secret"
```

- `certificateLifetime`: Lifetime of certificates generated for communication between Falco and Falcosidekick.
- `certificateRenewAfter`: Time period after which certificates are renewed.
- `priorityClassName`: Priority class used for Falco when deployed.
- `centralStorage`: Optional configuration for central event storage (see below)
  - `tokenLifetime`: Lifetime of the JWT token generated during each reconcile for sending events to central storage.
  - `url`: URL of the Falco event ingestor.
  - `tokenIssuerPrivateKey`: Private key used for issuing the JWT token.
- `clusterIdentityToken`: Optional configuration for per-shoot JWT tokens used with the `<<.ClusterIdentityToken>>` template variable in global default destinations.
  - `tokenIssuerPrivateKey`: PEM-encoded RSA private key for signing tokens.
  - `tokenLifetime`: Lifetime of the issued token (default: 168h / 7 days).
- `globalDefaultDestinations`: Optional list of operator-provided Falcosidekick output destinations (see below).

## Central Storage

Falcosidekick can optionally send events to a central storage location. This requires a central storage setup based on the following projects:

- [falco-event-ingestor](https://github.com/gardener/falco-event-ingestor)
- [falco-event-provider](https://github.com/gardener/falco-event-provider)
- [falco-event-db-schema](https://github.com/gardener/falco-event-db-schema)

If central storage is configured, users can set `central` as the destination for Falco events.

## Global Default Destinations

Operators can define Falcosidekick output destinations that are automatically injected into all shoots and seeds. This allows operators to enforce centralized event forwarding (e.g., to a central Splunk or Elasticsearch instance) without requiring each shoot owner to manually configure them.

### Configuration

Each global default destination is defined with:

| Field | Description |
| --- | --- |
| `name` | A unique name identifying this destination. Must not conflict with standard destination names (`logging`, `custom`, `central`, `stdout`, `otlp`, `opensearch`, `splunk`). |
| `falcosidekickOutput.key` | The Falcosidekick output key (e.g., `splunk`, `webhook`, `elasticsearch`, `loki`, `otlp`). Each key can only be used once across all global defaults. |
| `falcosidekickOutput.value` | The configuration map passed to Falcosidekick for that output. Supports template variables (see below). |

### Template Variables

The `falcosidekickOutput.value` field supports Go templates with `<<` and `>>` delimiters. Available variables:

| Variable | Description |
| --- | --- |
| `<<.SeedIngressDomain>>` | The seed's ingress domain |
| `<<.ServiceAccountToken>>` | A service account token placeholder (replaced at reconcile time) |
| `<<.ClusterIdentityToken>>` | A per-shoot JWT token signed with the configured private key (requires `clusterIdentityToken` config) |

Example using templates:

```yaml
globalDefaultDestinations:
- name: central-loki
  falcosidekickOutput:
    key: loki
    value:
      hostport: "https://loki.<<.SeedIngressDomain>>"
      endpoint: "/loki/api/v1/push"
      checkcert: false
      customheaders:
        Authorization: "Bearer <<.ServiceAccountToken>>"
```

### Injection Behavior

The admission mutating webhook handles global default destination injection with the following rules:

1. **On CREATE**: Global default destinations are injected into the shoot's (or seed's) Falco configuration. If the shoot already defines a destination using the same Falcosidekick output key (e.g., shoot has `splunk` and a global default also uses `splunk`), the global default is still injected but with `enabled: false` to avoid conflicts.

1. **On UPDATE**: If the shoot already had a Falco configuration before the update, no new global defaults are injected (the shoot is considered already initialized). However, stale global defaults (those no longer present in the extension config) are automatically removed.

1. **Disabled destinations**: Destinations with `enabled: false` are skipped during reconciliation — they do not produce any Falcosidekick output configuration. This allows shoot owners to disable an operator-injected destination.

### Project Opt-Out

A Gardener project can opt out of global default destination injection by annotating its namespace:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: garden-my-project
  annotations:
    falco.gardener.cloud/skip-default-destinations: "true"
```

When this annotation is present, no global defaults are injected for shoots in that project.

## Additional Seed Managed Resources

Operators can configure additional Helm charts to be deployed as ManagedResources on the seed cluster. This is useful for deploying provider-specific components.

### Configuration

The `additional.seedManagedResources` field accepts a list of Helm charts to deploy:

```yaml
apiVersion: falco.extensions.config.gardener.cloud/v1alpha1
kind: Configuration
falco:
  additional:
    seedManagedResources:
    - name: my-nginx
      helm:
        ociRepository:
          ref: registry:tag
        values:
          replicaCount: 2
```

| Field | Description |
| --- | --- |
| `name` | A unique name for the resource. Must be a valid DNS label (lowercase, alphanumeric, hyphens, max 63 characters). Used as a suffix in the ManagedResource name (`falco-additional-<name>`). |
| `helm.ociRepository.ref` | Full OCI artifact reference for the Helm chart (required). |
| `helm.values` | Optional Helm values passed to the chart during rendering. |

### Validation

The admission validating webhook enforces:

- No two enabled destinations may use the same Falcosidekick output key. For example, a shoot cannot have both `splunk` (standard) and `central-splunk` (global default with `key: splunk`) enabled simultaneously.
- Global default destination names are accepted by the validator even though they are not in the standard destinations list.
- Disabled destinations are excluded from output key conflict checks.

### Shoot Owner Interaction

Shoot owners see global default destinations in their `FalcoServiceConfig` like any other destination:

```yaml
apiVersion: falco.extensions.gardener.cloud/v1alpha1
kind: FalcoServiceConfig
destinations:
- name: logging
- name: central-splunk
- name: central-elastic
  enabled: false
```

A shoot owner can disable an operator-injected destination by setting `enabled: false` on it. They cannot remove it — if they do, it will be re-injected on the next mutation (CREATE path). On UPDATE, already-initialized shoots are not re-injected, so removing a global default destination name from the list is effectively the same as the operator removing it from the config.

## Admission Webhook: `gardener-extension-admission-shoot-falco-service`

The webhook can be configured to enforce usage restrictions:

- The extension may only deploy Falco in clusters where the Gardener project namespace is annotated with:
  
  ```yaml
  falco.gardener.cloud/enabled: "true"
  ```

- The "central" storage option may only be configured from shoot clusters if their project namespace is annotated with:
  
  ```yaml
  falco.gardener.cloud/centralized-logging: "true"
  ```

These restrictions can be enabled by passing the `--restricted-usage` and `--restricted-centralized-logging` flags to the webhook binary.
