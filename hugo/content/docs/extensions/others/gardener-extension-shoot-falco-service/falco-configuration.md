---
github_repo: 'https://github.com/gardener/gardener-extension-shoot-falco-service'
github_subdir: docs
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-falco-service/falco-configuration.md
  to: falco-configuration.md
title: Falco Configuration
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
   https://github.com/gardener/gardener-extension-shoot-falco-service/blob/main/docs/falco-configuration.md
-->


# Falco Configuration

## Introduction

Falco can be enabled and configured in the `extensions` section of the shoot manifest. The minimal configuration is:

```yaml
  - type: shoot-falco-service
```

Alternatively, you can specify a provider configuration:

```yaml
  - type: shoot-falco-service
    providerConfig:
      apiVersion: falco.extensions.gardener.cloud/v1alpha1
      kind: FalcoServiceConfig
```

This configuration deploys Falco into the `kube-system` namespace of the shoot cluster. Defaults for Falco versions, Falco rules, and event storage are applied according to the landscape configuration. For most deployments, the defaults are:

- The latest supported Falco version
- The [Falco rules](https://github.com/falcosecurity/rules/blob/main/rules/falco_rules.yaml) ruleset, possibly with extensions to avoid false positives in an empty cluster
- The `logging` destination for regular shoots, or `stdout` for shoots with purpose `testing` (since the logging stack is not deployed for testing shoots)

The configuration above will be expanded to (for a regular, non-testing shoot):

```yaml
    - type: shoot-falco-service
      providerConfig:
        kind: FalcoServiceConfig
        apiVersion: falco.extensions.gardener.cloud/v1alpha1
        falcoVersion: 0.40.0
        autoUpdate: true
        rules:
          standard:
          - falco-rules
        destinations:
        - name: logging
```

## Configuration Details

Below is the full configuration, explained in detail:

```yaml
  - type: shoot-falco-service
    providerConfig:
      apiVersion: falco.extensions.gardener.cloud/v1alpha1
      kind: FalcoServiceConfig
      # Optional: uses the latest version tagged as "supported" if omitted
      falcoVersion: 0.42.0
      # Optional: defaults to true
      autoUpdate: true|false
      # Optional
      nodeSelector:
        key: value
      falcoConfig:
        # Optional: static quantities or arithmetic expressions (see below)
        resources:
          limits:
            cpu: 200m
            memory: 1Gi
          requests:
            cpu: 150m
            memory: 512Mi
        # Optional: per-pool overrides (see below)
        # workerPoolResources:
        #   my-pool:
        #     requests:
        #       cpu: 1000m
      tolerations:
      - key: key1
        effect: NoSchedule
        operator: Equal
        value: value1
      # Optional: defaults to false
      heartbeatEvent: true|false
      rules:
        # Standard rules from https://github.com/falcosecurity/rules/tree/main/rules
        standard:
        - falco-rules
        - falco-incubating-rules
        - falco-sandbox-rules
        # Custom rules
        custom:
        - resourceName: rules1
      destinations:
        # Possible values: stdout, logging, custom, opensearch, splunk
        - name: custom
          # Options, may be required to configure destination
          resourceSecretName: secret
```

### Versions and Update Strategy

The `falcoVersion` field specifies the Falco version from the non-expired versions configured in the [Falco profile](/docs/extensions/others/gardener-extension-shoot-falco-service/falco-profile/). If omitted, the latest supported version is selected.

Setting `autoUpdate` to `false` allows users to opt out of automated Falco updates, for example, if certain rules are incompatible with newer Falco versions. When `autoUpdate` is `true`, the extension always updates Falco to the latest supported version in the Falco profile. No automated updates occur if `autoUpdate` is `false`, except when the configured version has expired (`expirationDate` is in the past). In that case, Falco is updated to the next non-expired version.

### Configuring Rules

The `rules` section configures both standard and custom Falco rules:

```yaml
      rules:
        standard:
        - falco-rules
        - falco-incubating-rules
        - falco-sandbox-rules
        # Custom rules
        custom:
        - resourceName: my-custom-rules
        - resourceName: more-custom-rules
        ...
```

Falco rules (`falco-rules`), incubating rules (`falco-incubating-rules`), and sandbox rules (`falco-sandbox-rules`) are provided by the [Falco community](https://github.com/falcosecurity/rules). The Falco rules have been extended to avoid false positives in an empty Kubernetes cluster managed by Gardener. Note that incubating and sandbox rules may still emit false positives. Only the listed values are accepted; rule files do not depend on each other.

The standard rules can be extended or replaced by custom rules. Custom
rules in the Gardener setup can be stored in a ConfigMap and applied to the
same Gardener project as the cluster shoot manifest. The ConfigMap must be
configured as a resource in the cluster as described
[here](https://github.com/gardener/gardener/blob/44e5d3ad6060633ee14a1013306e5f1191d2b523/example/90-shoot.yaml#L380).

The `my-custom-rules` name above requires an entry with the same name in the
`resources` section of the shoot manifest:

```yaml
  resources:
  - name: my-custom-rules
    resourceRef:
      apiVersion: v1
      kind: ConfigMap
      name: my-custom-rules-configmap
```

This entry refers to a ConfigMap named `my-custom-rules-configmap`:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-custom-rules-configmap
  namespace: garden-myproject
data:
  myrules.yaml: |-
    # Custom rules go here
    ...
  myrules-extended.yaml: |-
    # More custom rules
    ...
```

Each key (e.g., `myrules.yaml` or `myrules-extended.yaml`) results in one rules file. You can create a ConfigMap like the above with:

```bash
kubectl create configmap my-custom-rules-configmap --from-file=myrules.yaml \
            --from-file=myrules-extended.yaml
```

If ConfigMap size is restricted, you can add gzipped rule files. File names must end with `.gz`; other compression formats are not supported.

```bash
gzip myrules.yaml
gzip myrules-extended.yaml
kubectl create configmap my-custom-rules-configmap --from-file=myrules.yaml.gz \
            --from-file=myrules-extended.yaml.gz
```

Note: The maximum size of an unzipped rule file is 1MB, and there is a limit of 10 rule files per ConfigMap.

Ordering is important, as Falco rules may extend other rules that must be defined first. The order is:

1. Falco rules (if specified)
1. Falco incubating rules (if specified)
1. Falco sandbox rules (if specified)
1. Files from the first custom rule ConfigMap specified in the `customRules` array (ordered lexicographically by filename)
1. Files from the second custom rule ConfigMap
   ...

If no `rules` key is specified, the `falco-rules` standard rules are set by default; otherwise, no defaults are applied.

### Configuring Destinations

Falco can post events to several internal and external storage providers:

- `stdout`: Write events to the pod log only
- `central`: Post events to a central storage, if offered by the infrastructure provider
- `logging`: Post events to the cluster logging stack (Vali and/or OpenTelemetry Collector, depending on what the seed has deployed)
- `opensearch`: Post events to an OpenSearch cluster for centralized analysis
- `splunk`: Post events to a Splunk instance via the HTTP Event Collector (HEC)
- `custom`: Post events to a custom web server

Additionally, operators may inject global default destinations (e.g., `central-splunk`) into your configuration automatically. These appear in the `destinations` list alongside standard destinations.

More details for each destination are described below.

Each destination supports an optional `enabled` field:

```yaml
      destinations:
      - name: logging
      - name: central-splunk
        enabled: false
```

Setting `enabled: false` keeps the destination in the configuration but disables event forwarding to it. If omitted, the destination is enabled by default. This is useful for disabling operator-injected global default destinations on a per-shoot basis.

The `custom` destination requires additional configuration:

```yaml
      destinations:
      - name: custom
        resourceSecretName: custom-secret
```

The `resourceSecretName` references a secret defined in the `resources` section of the shoot manifest:

```yaml
  resources:
  - name: custom-secret
    resourceRef:
      apiVersion: v1
      kind: Secret
      name: my-custom-secret-config
```

The secret contains the following values:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-webhook-secret-config
  namespace: <project namespace in garden cluster>
stringData:
  address: "" # URL
  method: POST
  checkcerts: true | false
  customHeaders: |
    Authorization: Bearer <token>
    header1: value1
    ...
```

### Other Options

`FalcoServiceConfig` supports additional options:

```yaml
      # Optional
      nodeSelector:
        key: value
        key2: value2
      # Optional
      - key: key1
        effect: NoSchedule
        operator: Equal
        value: value1
      # Optional: defaults to false
      heartbeatEvent: true|false
```

The `nodeSelector` option specifies node selectors for Falco pods, following the Kubernetes API [specification](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#nodeselector). Only nodes matching the specified labels will run Falco pods.

The `tolerations` option allows Falco pods to be scheduled on nodes with taints, such as master/control-plane nodes or nodes marked with the NoSchedule effect. This follows the Kubernetes API [specification](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/) for tolerations. This is particularly useful when the Falco pods need to run on nodes that have taints like `NoSchedule` to ensure comprehensive security monitoring.

The `heartbeatEvent` option enables or disables the heartbeat event, which is a periodic event sent by Falco to indicate it is running and healthy. This is useful for monitoring.

The `falcoConfig` option configures resource requests and limits for the Falco container. Each value accepts either a plain Kubernetes quantity or an arithmetic expression evaluated against the node's capacity as published in the cloud profile.

### Static resources

Plain quantities apply the same values to all nodes:

```yaml
      falcoConfig:
        resources:
          limits:
            cpu: 200m
            memory: 1Gi
          requests:
            cpu: 150m
            memory: 512Mi
```

### Expression-based (adaptive) resources

Instead of a plain quantity, any `cpu` or `memory` field accepts an arithmetic expression. Expressions are evaluated at reconcile time against the machine type's capacity from the cloud profile — no runtime component is required. The extension deploys one `falco-<pool-name>` DaemonSet per worker pool, each with resources computed for that pool's machine type.

Available variables:

| Variable | Type | Value |
| --- | --- | --- |
| `NodeCPU` | float64 | CPU cores |
| `NodeMemoryMi` | float64 | RAM in MiB |
| `NodeMemoryGi` | float64 | RAM in GiB |
| `NodeEphemeralGi` | float64 | Ephemeral storage in GiB |

CPU expression results are interpreted as millicores; memory as MiB. Results are floor-truncated to integer.

Supported operators: `+`, `-`, `*`, `/`, `%` and ternary `condition ? a : b`.

```yaml
      falcoConfig:
        resources:
          requests:
            cpu: "NodeCPU < 4 ? 200 : (NodeCPU < 8 ? 400 : 800)"
            memory: "NodeMemoryGi * 32"
          limits:
            cpu: "NodeCPU < 4 ? 400 : (NodeCPU < 8 ? 800 : 1600)"
            memory: "NodeMemoryGi * 64"
```

You can mix plain quantities and expressions in the same block:

```yaml
      falcoConfig:
        resources:
          requests:
            cpu: "NodeCPU < 4 ? 200 : 400"
            memory: 512Mi
```

### Per-pool resource overrides

`workerPoolResources` allows individual pools to deviate from the default `resources` block, keyed by pool name. A pool listed here only needs to set the fields it wants to override — all other fields fall back to `resources`. Pools not listed use `resources` directly.

```yaml
      falcoConfig:
        resources:
          requests:
            cpu: "NodeMemoryGi < 10 ? 200 : 400"
            memory: 512Mi
        workerPoolResources:
          high-memory-pool:
            requests:
              cpu: 800m
              memory: 2Gi
            limits:
              cpu: 1600m
              memory: 4Gi
```

In this example `high-memory-pool` uses fixed quantities while all other pools use the expression-based defaults.

## Destinations

This section provides details about event destinations, use cases, and implementation.

## Do Not Forward Falco Events (`stdout` Option)

Events are logged to Falco pod stdout and not forwarded. Falcosidekick is not deployed if `stdout` is the only event destination. Users can deploy custom tools to scrape pod logs and store events.

Note: Writing logs to stdout forwards events to the cluster Vali database, as logs from pods in the `kube-system` namespace are generally stored there. Event details may not be stored in an optimal way for analysis. Use the `logging` destination if you plan to analyze events.

## Store Events in the Cluster Logging Stack (`logging` Option)

> [!NOTE]
> The `logging` destination requires the cluster logging stack (Vali/Loki). Shoots with purpose `testing` do not have the logging stack deployed, so the `logging` destination is not available for them and will be rejected. Use `stdout` or another destination for testing shoots.

Falco events are forwarded to whichever logging backends the seed has deployed:

- **Vali** — events are pushed via the Falcosidekick [Loki output](https://github.com/falcosecurity/falcosidekick/blob/master/docs/outputs/loki.md) and can be queried in the Vali section of the cluster Plutono UI:
  
  ```logql
  {rule=~".+", tags=~".+", source=~".+"}
  ```
  
  More details on possible queries can be found in the [LogQL documentation](https://grafana.com/docs/loki/latest/query/).
  
  Note: Events may be retained for a short period and could be overwritten if the Vali database experiences disk pressure. Replicating events to another location may be necessary.

- **OpenTelemetry Collector** — events are pushed via the Falcosidekick [OTLP output](https://github.com/falcosecurity/falcosidekick/blob/master/docs/outputs/otlp.md) using gRPC. This backend will become the primary logging sink as Gardener moves towards OTLP as its sole logging solution.

## Custom Destination (`custom` Option)

This option forwards Falco events to user-configurable destinations, such as a SIEM system. It requires a destination configuration in a secret referenced by `resourceSecretName`. The secret's contents configure the Falcosidekick [webhook output](https://github.com/falcosecurity/falcosidekick/blob/master/docs/outputs/webhook.md).

## OpenSearch Destination (`opensearch` Option)

This option forwards Falco events to an OpenSearch cluster for centralized security event analysis and long-term storage

### Configuration

The `opensearch` destination requires additional configuration:

```yaml
      destinations:
      - name: opensearch
        resourceSecretName: opensearch-config
```

The `resourceSecretName` references a secret defined in the `resources` section of the shoot manifest:

```yaml
  resources:
  - name: opensearch-config
    resourceRef:
      apiVersion: v1
      kind: Secret
      name: my-opensearch-config
```

The secret contains the following values:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-opensearch-config
  namespace: <project namespace in garden cluster>
stringData:
  # Required: OpenSearch endpoint URL
  hostport: "https://opensearch.example.com:9200"

  # Optional: Index name (default: "falco")
  index: "falco"

  # Optional: Index suffix for rotation (default: "daily")
  # Options: "none", "daily", "monthly", "annually"
  suffix: "daily"

  # Optional: OpenSearch username for authentication
  username: "falco-user"

  # Optional: OpenSearch password for authentication
  password: "secure-password"

  # Optional: Verify SSL certificates (default: false)
  checkcert: "false"

  # Optional: Minimum priority level (default: "debug")
  # Options: "emergency", "alert", "critical", "error", "warning", "notice", "informational", "debug"
  minimumpriority: "debug"

  # Optional: Number of index shards (default: OpenSearch default)
  numberofshards: "1"

  # Optional: Number of index replicas (default: OpenSearch default)
  numberofreplicas: "1"

  # Optional: Flatten nested fields for easier querying (default: false)
  flattenfields: "false"

  # Optional: Custom HTTP headers
  customheaders: |
    X-Custom-Header: value
```

### Features

- **Index Rotation**: Automatic daily, monthly, or annual index rotation for easier data management
- **Authentication**: Support for username/password authentication
- **TLS/SSL**: Configurable certificate verification for secure connections
- **Priority Filtering**: Filter events by minimum severity level
- **Custom Fields**: Enrich events with cluster metadata (cluster_id automatically added)
- **Index Configuration**: Configure shards and replicas for optimal performance

### Implementation Details

Falcosidekick uses the Elasticsearch output for OpenSearch integration, as OpenSearch maintains API compatibility with Elasticsearch. Events are sent using the OpenSearch [Bulk API](https://opensearch.org/docs/latest/api-reference/document-apis/bulk/) for efficient ingestion.

Index naming pattern: `{index}-{suffix}` (e.g., `falco-2024.12.15` for daily rotation)

### Example: Complete Configuration

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
  name: my-cluster
  namespace: garden-my-project
spec:
  extensions:
    - type: shoot-falco-service
      providerConfig:
        apiVersion: falco.extensions.gardener.cloud/v1alpha1
        kind: FalcoServiceConfig
        destinations:
          - name: opensearch
            resourceSecretName: opensearch-config
          - name: stdout
  resources:
    - name: opensearch-config
      resourceRef:
        apiVersion: v1
        kind: Secret
        name: my-opensearch-config
```

### Querying Events in OpenSearch

Once configured, Falco events can be queried in OpenSearch Dashboards:

1. Create an index pattern: `falco-*`
1. Use the Discover tab to explore events
1. Example query to find high-priority events:
   ```json
   {
     "query": {
       "bool": {
         "must": [
           { "term": { "priority": "Critical" } }
         ]
       }
     }
   }
   ```

### Monitoring

Check Falcosidekick logs to verify OpenSearch connectivity:

```bash
kubectl logs -n kube-system -l app.kubernetes.io/name=falcosidekick -f
```

Verify events are being indexed in OpenSearch:

```bash
curl -u username:password "https://opensearch.example.com:9200/falco-*/_count"
```

## Store Events Centrally (`central` Option)

Note: Central storage is optional and may not be provided as part of the Gardener landscape installation.

Falco events are forwarded to central storage via the Falcosidekick [webhook output](https://github.com/falcosecurity/falcosidekick/blob/master/docs/outputs/webhook.md).

The [Falco event ingestor](https://github.com/gardener/falco-event-ingestor) provides a REST API to receive Falco events, validates event integrity, stores events in an SQL database, and implements configurable rate limiting per cluster to prevent overload.

The [Falco event provider](https://github.com/gardener/falco-event-provider) offers a REST API to access the database. Cluster users must present a valid token (with Viewer access for the Gardener project namespace) to retrieve Falco events for their cluster.

## Splunk Destination (`splunk` Option)

This option forwards Falco events to a Splunk instance via the [HTTP Event Collector (HEC)](https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector). It uses the Falcosidekick [Splunk output](https://github.com/falcosecurity/falcosidekick/blob/master/docs/outputs/splunk.md).

### Configuration

The `splunk` destination requires additional configuration:

```yaml
      destinations:
      - name: splunk
        resourceSecretName: splunk-config
```

The `resourceSecretName` references a secret defined in the `resources` section of the shoot manifest:

```yaml
  resources:
  - name: splunk-config
    resourceRef:
      apiVersion: v1
      kind: Secret
      name: my-splunk-config
```

The secret contains the following values:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-splunk-config
  namespace: <project namespace in garden cluster>
stringData:
  # Required: Splunk HEC endpoint URL
  host: "https://splunk-hec.example.com/services/collector/event"

  # Required: Splunk HEC token
  token: "your-hec-token"

  # Optional: Verify SSL certificates (default: true)
  checkcert: "true"

  # Optional: Minimum priority level
  # Options: "emergency", "alert", "critical", "error", "warning", "notice", "informational", "debug"
  minimumpriority: "notice"

  # Optional: Custom HTTP headers (YAML map format)
  customheaders: |
    X-Custom-Header: value
```

### Prerequisites

Before configuring the Splunk destination, ensure that:

1. The Splunk HEC is enabled on your Splunk instance
1. A HEC token has been created with appropriate permissions
1. The HEC endpoint is reachable from the shoot cluster (the `host` field must include the full URL path)

## Known Issues

### Falco 0.41.x - Container Name Display Issue

**Issue**: In Falco versions 0.41.0 through 0.41.3, there is a known bug where the `container.name` field in alerts displays the `container.id` instead of the actual container name. See [GitHub Issue #3631](https://github.com/falcosecurity/falco/issues/3631) for details.

**Resolution**: This issue is fixed in Falco 0.42.0. If you need accurate container names in alerts, use Falco 0.40.0 or upgrade to 0.42.0.

**Affected Versions**: 0.41.0, 0.41.3
**Fixed In**: 0.42.0
