---
github_repo: >-
  https://github.com/gardener/gardener-extension-shoot-networking-problemdetector
github_subdir: docs/usage
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-networking-problemdetector/shoot-networking-problemdetector.md
  to: shoot-networking-problemdetector.md
persona: Users
title: Shoot Networking Problemdetector
prev: false
next: false
managed: true
---

# Shoot Networking Problem Detector Extension

## Introduction

Within a shoot cluster, it is possible to enable the network problem detector. It is necessary that the Gardener installation your shoot cluster runs in is equipped with a `shoot-networking-problemdetector` extension. Please ask your Gardener operator if the extension is available in your environment.

## Enable the Extension

In most of the Gardener setups the `shoot-networking-problemdetector` extension is not enabled globally and thus must be configured per shoot cluster. Please adapt the shoot specification by the configuration shown below to activate the extension individually.

```yaml
kind: Shoot
...
spec:
  extensions:
    - type: shoot-networking-problemdetector
...
```

## Opt-out

If the shoot network problem detector is globally enabled by default, it can be disabled per shoot. To disable the service for a shoot, the shoot manifest must explicitly state it.

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
...
spec:
  extensions:
    - type: shoot-networking-problemdetector
      disabled: true
...
```

## Shoot-level Configuration (`providerConfig`)

Per-shoot behaviour can be tuned by adding a `providerConfig` to the extension entry. All fields are optional.

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
...
spec:
  extensions:
    - type: shoot-networking-problemdetector
      providerConfig:
        apiVersion: shoot-networking-problemdetector.extensions.config.gardener.cloud/v1alpha1
        kind: NetworkProblemDetectorConfig
        icmpEnabled: false
        additionalProbes:
          - jobID: check-registry
            protocol: TCP
            host: registry.example.com
            port: 443
          - jobID: ping-gateway
            protocol: ICMP
            host: 192.0.2.1
```

### `icmpEnabled`

| Field | Type | Default |
| --- | --- | --- |
| `icmpEnabled` | `bool` | `false` |

Enables or disables ICMP ping checks between nodes.

### `additionalProbes`

A list of additional network probes that run independently of the shoot cluster topology. Each probe is added as a job to both the host-network and pod-network agents.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `jobID` | `string` | yes | Unique identifier for the probe job. Must be unique within the list. |
| `protocol` | `string` | yes | Probe protocol: `TCP`, `HTTPS`, or `ICMP`. |
| `host` | `string` | yes | Target hostname or IP address. |
| `port` | `int` | TCP/HTTPS | Target port (1–65535). Not used for `ICMP`. |
| `period` | `duration` | no | Override the check interval for this probe. Defaults to `60s`. Minimum: `10s`. |

**Protocol behaviour:**

- **TCP** — opens a TCP connection to `host`. The agent job argument is `checkTCPPort --endpoints <host>:<host>:<port>`.
- **HTTPS** — performs an HTTPS GET (TLS without certificate verification). The agent job argument is `checkHTTPSGet --endpoints <host>:<port>`.
- **ICMP** — sends an ICMP echo request to `host`. The agent job argument is `pingHost --hosts <host>:<host>`.

**Examples:**

```yaml
additionalProbes:
  # TCP: hostname resolves at runtime
  - jobID: check-registry
    protocol: TCP
    host: registry.example.com
    port: 443

  # TCP: using a fixed IP address directly
  - jobID: check-internal-endpoint
    protocol: TCP
    host: 10.0.0.5
    port: 8080

  # HTTPS: checks TLS connectivity
  - jobID: check-api
    protocol: HTTPS
    host: api.example.com
    port: 443

  # ICMP: reachability check by hostname
  - jobID: ping-gateway
    protocol: ICMP
    host: gateway.example.com

  # ICMP: reachability check by IP
  - jobID: ping-ip
    protocol: ICMP
    host: 192.0.2.1

  # Custom period
  - jobID: slow-check
    protocol: TCP
    host: slow.example.com
    port: 9090
    period: 60s
```

## Operator Configuration

Operators configure the extension globally via the `spec.deployment.extension.values` field of the `operator.gardener.cloud/v1alpha1` `Extension` resource.

```yaml
apiVersion: operator.gardener.cloud/v1alpha1
kind: Extension
metadata:
  name: extension-shoot-networking-problemdetector
spec:
  deployment:
    extension:
      values:
        networkProblemDetector:
          defaultPeriod: 30s
          maxPeerNodes: 10
          icmpEnabled: true
          k8sExporter:
            enabled: true
            heartbeatPeriod: 1m
            minFailingPeerNodeShare: 0.3
          additionalProbes:
            - jobID: check-seed-registry
              protocol: TCP
              host: registry.example.com
              port: 443
```

### `networkProblemDetector`

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `defaultPeriod` | `duration` | `5s` | Default interval for all check jobs (e.g. `30s`). |
| `maxPeerNodes` | `int` | `25` | Maximum number of peer nodes each agent checks. |
| `icmpEnabled` | `bool` | `false` | Enable ICMP ping checks between nodes. Can be overridden per shoot. |
| `k8sExporter` | object | disabled | Configures node condition reporting (see below). |
| `additionalProbes` | list | — | Global additional probes added to every shoot. Same schema as the shoot-level probes above; merged with any shoot-level probes. |

### `networkProblemDetector.k8sExporter`

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | `bool` | `false` | Activates the Kubernetes exporter, which patches node conditions and creates events. |
| `heartbeatPeriod` | `duration` | `3m` | How often node conditions are updated. Minimum: `1m`. |
| `minFailingPeerNodeShare` | `float` | `0.2` | Minimum fraction of failing peer nodes [0.0–1.0] before `ClusterNetworkProblems` or `HostNetworkProblems` node conditions are reported. |
