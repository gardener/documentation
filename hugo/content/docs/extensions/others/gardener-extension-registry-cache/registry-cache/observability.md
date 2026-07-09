---
github_repo: 'https://github.com/gardener/gardener-extension-registry-cache'
github_subdir: docs/usage/registry-cache
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-registry-cache/registry-cache/observability.md
  to: observability.md
persona: Users
title: Observability
prev: false
next: false
managed: true
---

# Registry Cache Observability

The `registry-cache` extension exposes metrics for the registry caches running in the Shoot cluster so that they can be easily viewed by cluster owners and operators in the Shoot's Prometheus and Plutono instances. The exposed monitoring data provides an overview of the performance of the pull-through caches, including hit rate and network traffic data.

## Metrics

A registry cache serves [several metrics](https://github.com/distribution/distribution/blob/v3.1.1/registry/proxy/proxymetrics.go#L12-L21). The metrics are scraped by the [Shoot's Prometheus instance](/docs/gardener/monitoring/#shoot-prometheus).

The `Registry Caches` dashboard in the Shoot's Plutono instance contains several panels which are built using the registry cache metrics. From the `Registry` dropdown menu you can select the upstream for which you wish the metrics to be displayed (by default, metrics are summed for all upstream registries).

Following is a list of all exposed registry cache metrics. The `upstream_host` label can be used to determine the upstream host to which the metrics are related, while the `type` label can be used to determine weather the metric is for an image `blob` or an image `manifest`:

#### registry_proxy_requests_total

The number of total incoming request received.
- Type: Counter
- Labels: `upstream_host` `type`

#### registry_proxy_hits_total

The number of total cache hits; i.e. the requested content exists in the registry cache's image store and it is served from there (upstream is not contacted at all for serving the requested content).
- Type: Counter
- Labels: `upstream_host` `type`

#### registry_proxy_misses_total

The number of total cache misses; i.e. the requested content does not exist in the registry cache's image store and it is fetched from the upstream.
- Type: Counter
- Labels: `upstream_host` `type`

#### registry_proxy_pulled_bytes_total

The size of total bytes that the registry cache has pulled from the upstream.
- Type: Counter
- Labels: `upstream_host` `type`

#### registry_proxy_pushed_bytes_total

The size of total bytes pushed to the registry cache's clients.
- Type: Counter
- Labels: `upstream_host` `type`

## Alerts

There are two alerts defined for the registry cache `PersistentVolume` in the Shoot's Prometheus instance:

#### RegistryCachePersistentVolumeUsageCritical

This indicates that the registry cache `PersistentVolume` is almost full and less than 5% is free. When there is no available disk space, no new images will be cached. However, image pull operations are not affected. An alert is fired when the following expression evaluates to true:

```
100 * (
 kubelet_volume_stats_available_bytes{persistentvolumeclaim=~"^cache-volume-registry-.+$"}
   /
 kubelet_volume_stats_capacity_bytes{persistentvolumeclaim=~"^cache-volume-registry-.+$"}
) < 5
```

#### RegistryCachePersistentVolumeFullInFourDays

This indicates that the registry cache `PersistentVolume` is expected to fill up within four days based on recent sampling. An alert is fired when the following expression evaluates to true:

```
100 * (
 kubelet_volume_stats_available_bytes{persistentvolumeclaim=~"^cache-volume-registry-.+$"}
   /
 kubelet_volume_stats_capacity_bytes{persistentvolumeclaim=~"^cache-volume-registry-.+$"}
) < 15
and
predict_linear(kubelet_volume_stats_available_bytes{persistentvolumeclaim=~"^cache-volume-registry-.+$"}[30m], 4 * 24 * 3600) <= 0
```

Users can subscribe to these alerts by following the Gardener [alerting guide](/docs/gardener/monitoring/alerting/#alerting-for-users).

## Logging

To view the registry cache logs in Plutono, navigate to the `Explore` tab and select `vali` from the `Explore` dropdown menu. Afterwards enter the following `vali` query:

- `{container_name="registry-cache"}` to view the logs for all registries.
- `{pod_name=~"registry-<upstream_host>.+"}` to view the logs for specific upstream registry.
