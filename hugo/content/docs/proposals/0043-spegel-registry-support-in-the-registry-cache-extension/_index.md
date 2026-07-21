---
github_repo: 'https://github.com/gardener/enhancements'
github_subdir: geps/0043-spegel-registry-support-in-the-registry-cache-extension
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/proposals/0043-spegel-registry-support-in-the-registry-cache-extension/README.md
  to: README.md
title: 0043 Spegel Registry Support In The Registry Cache Extension
prev: false
next: false
managed: true
---

# GEP-0043: Spegel Registry Support in the registry-cache extension

## Summary

This proposal introduces a new extension type `registry-spegel` to the [gardener-extension-registry-cache](https://github.com/gardener/gardener-extension-registry-cache) extension. When enabled in the Shoot specification, it will install [Spegel](https://github.com/spegel-org/spegel#spegel) local registry mirror on the Shoot cluster nodes.
Gardener operators should be able to enable `registry-spegel` extension type globally for all Shoots in a Gardener landscape. The local Spegel registry is able to mirror all container images pulled by the kubelet.

## Motivation

The current [solution for image cache](https://github.com/gardener/gardener-extension-registry-cache) is based on [Distribution project](https://github.com/distribution/distribution)'s pull-through cache.

### The Problem

The registry cache extension is not widely adopted in some Gardener landscapes, and not all used upstreams are covered by the extension's configurations. This is likely due to:
- **Explicit and non-trivial configuration**: A separate [configuration](https://github.com/gardener/gardener-extension-registry-cache/blob/v0.19.0/docs/usage/registry-cache/configuration.md#shoot-configuration) needs to be set for each upstream registry.
- **Additional resources**: A StatefulSet is created for each of the configured upstream. The PV size (defaults to 10Gi) should be monitored and [increased](https://github.com/gardener/gardener-extension-registry-cache/blob/v0.19.0/docs/usage/registry-cache/configuration.md#increase-the-cache-disk-size) if necessary, otherwise the cache becomes ineffective.
- **[Limitations](https://github.com/gardener/gardener-extension-registry-cache/blob/v0.19.0/docs/usage/registry-cache/configuration.md#limitations)**:
  - It is not possible to cache most of images from the pods in the `kube-system` namespace, as the cache can be used only after its Kubernetes service can be accessed from the host (i.e., after service routing was implemented, e.g. by kube-proxy configuring iptables/IPVS rules).
  - Only one set of [upstream credentials](https://github.com/gardener/gardener-extension-registry-cache/blob/v0.19.0/docs/usage/registry-cache/upstream-credentials.md#how-to-provide-credentials-for-upstream-registry) is supported, therefore some private images cannot be cached.
  - Amazon ECR mirroring is not supported - [ref](https://github.com/gardener/gardener-extension-registry-cache/issues/259).
  - Dynatrace registry mirroring is not effective, as incorrect `Content-Length: 0` header is returned for most of the image layers.
  - It is not possible to mirror private registries authenticated with a kubelet image credential provider - [ref](https://github.com/gardener/gardener-extension-registry-cache/issues/240).
  - Registry pods scaling is challenging and resource consuming.
  - [TTL](https://github.com/gardener/gardener-extension-registry-cache/blob/v0.19.0/docs/usage/registry-cache/configuration.md#garbage-collection) garbage collection setting is inefficient because it is not extended on access. Hence, an image is always deleted from the cache when its TTL expires, and will be re-pulled from upstream if requested again.

### Why Should We Care

Because the `registry-cache` cannot be enabled globally and not all upstream registries are covered, downloading images results in significant egress network traffic costs.
Additionally, there are costs for outbound traffic from image registries like `Amazon Elastic Container Registry`, `Google Cloud Artifact Registry`, and `Azure Container Registry`.
Even if the pull-through cache is configured, there are also costs for cross zonal traffic within the Shoot cluster.

Providing a peer-to-peer (p2p) image caching solution that is enabled by default and spans all upstream registries will reduce both cloud costs and image pull latency.

### Who Benefits

- **End users** benefit from the reduced latency when pulling images.
- **Stakeholders** see reduced costs for egress network and registries.
- **Gardener operators** are no longer engaged in monitoring notifications of PV sizes in the registry caches.

### Goals

- Introduce a new `registry-spegel` extension type that installs Spegel local registry mirror on the Shoot cluster nodes.
- Allow operators to enable `registry-spegel` extension type globally for all Shoots in a Gardener landscape.
- All container images pulled by the kubelet should go through the Spegel registry mirror.

### Non-Goals

- `registry-spegel` is not a replacement for the existing `registry-cache` and `registry-mirror` extension types, and they can be configured together in a containerd `hosts.toml` file:
  ```toml
  server = "https://registry-1.docker.io"
  
  [host."http://<node-internal-ip>:15500"]
    capabilities = ["pull", "resolve"]
  
  [host."https://<docker-registry-service-ip>:5000"]
    capabilities = ["pull","resolve"]
    ca = ["/etc/containerd/certs.d/ca-bundle.pem"]
  ```
- Support for topology-aware routing to reduce cross-zonal traffic is part of future enhancements.
- Container images pulled by the `gardener-node-init.service` via `ctr` cli and `containerd` client will not use Spegel, as is not yet available at this time. The following images cannot be covered by Spegel:
  - gardener-node-agent
  - hyperkube
  - opentelemetry-collector / valitail
  - spegel
  - other images used in `OperatingSystemConfig` referenced via `spec.files[].content.imageRef`

## Proposal

The proposal is to extend the existing [registry-cache](https://github.com/gardener/gardener-extension-registry-cache) extension with a p2p image cache based on Spegel. A new extension type `registry-spegel` is introduced to configure Spegel registry in the [`_default`](https://github.com/containerd/containerd/blob/v2.2.1/docs/hosts.md#setup-default-mirror-for-all-registries) mirror configuration in `containerd`. Gardener operators should be able to enable the extension globally, i.e. enable for all Shoot in a Gardener landscape.

### Introduction

A brief overview of the components used in this proposal.

#### Spegel Overview

[Spegel](https://github.com/spegel-org/spegel#spegel) is a p2p image cache. It runs a local image registry on each node in a Kubernetes cluster. The local registry subscribes for containerd's image related events and serves image blobs and manifests that are available in the containerd image store.
The content discovery in a Kubernetes cluster is based on [Kademlia DHT](https://docs.libp2p.io/concepts/discovery-routing/kaddht/#content-provider-routing). When an image content (blob, manifest or index) is available in the containerd image store, Spegel adds its `digest` to the DHT provider store, announcing that the node provides the content corresponding to the `digest`. Then, when the same `digest` is needed by another node, Spegel searches the DHT for peers that provide the content and pulls it from them.

The straightforward way to deploy Spegel to a Kubernetes cluster is by using the provided helm chart. However, this has some [drawbacks](https://spegel.dev/docs/faq/#what-should-i-do-if-other-pods-are-scheduled-on-new-nodes-before-spegel) when a new node joins the cluster.
Our goal is to be able to use Spegel for all images pulled from the kubelet, including the `registry.k8s.io/pause` image. Therefore we will [run](https://github.com/spegel-org/spegel/issues/829) Spegel registry as a systemd unit service on the host. The existing [HTTP bootstrapper](https://github.com/spegel-org/spegel/blob/99898409898e15894832a9f236d33903318c292c/pkg/routing/bootstrap.go#L136-L140) will be used with configured mTLS authentication with Spegel `bootstrapper` server.

#### Kademlia Distributed Hash Table Overview

An overview of Kademlia Distributed Hash Table is available [here](#kademlia-distributed-hash-table).

### Registry Spegel API Design

The `registry-spegel` API design is simple and provides options to overwrite default values for Spegel's `registryPort`, libp2p `routerPort`, `metricsPort` and `resolveTags`.
```go
// SpegelConfig contains information about the Spegel listening addresses of each Node.
type SpegelConfig struct {
	metav1.TypeMeta `json:",inline"`

	// RegistryPort is the port that serves the OCI registry on each Node.
	// `registryPort` should be a valid port number (1-65535, inclusive).
	// Defaults to 15500.
	// +optional
	RegistryPort *int32 `json:"registryPort,omitempty"`
	// RouterPort is the port for P2P router on each Node.
	// `routerPort` should be a valid port number (1-65535, inclusive).
	// Defaults to 15501.
	// +optional
	RouterPort *int32 `json:"routerPort,omitempty"`
	// MetricsPort is the metrics port on each Node.
	// `metricsPort` should be a valid port number (1-65535, inclusive).
	// Defaults to 19090.
	// +optional
	MetricsPort *int32 `json:"metricsPort,omitempty"`
	// ResolveTags describes whether Spegel will resolve tags to digests.
	// Defaults to true.
	// +optional
	ResolveTags *bool `json:"resolveTags,omitempty"`
}
```

### Architecture Overview

The `registry-spegel` extension type will support being enabled by default in the `operator.gardener.cloud/v1alpha1.Extension` resource:
```yaml
apiVersion: operator.gardener.cloud/v1alpha1
kind: Extension
metadata:
  name: extension-registry-cache
  annotations:
    security.gardener.cloud/pod-security-enforce: baseline
spec:
  resources:
  - kind: Extension
    type: registry-spegel
    autoEnable: [shoot]
    clusterCompatibility: [shoot]
  - kind: Extension
    type: registry-cache
    clusterCompatibility: [shoot]
  - kind: Extension
    type: registry-mirror
    clusterCompatibility: [shoot]
...
```
Spegel `bootstrapper` is deployed into the Shoot namespace in the Seed cluster. In the Shoot cluster nodes the `containerd`, `spegel`, and `kubelet` systemd units are started.
When `spegel` is starting, it gets the bootstrap peers from the `bootstrapper` and registers for image related events in `containerd`. It also lists existing content in the image store and advertises it to the DHT.

![alt text](/docs/proposals/0043-spegel-registry-support-in-the-registry-cache-extension/spegel-architecture.png)

Let `kubelet1` on Node1 pull an image. It sends a CRI PullImage request to `containerd1`. Then `containerd1` checks the mirror configuration in `hosts.toml` and sends a request to the local `spegel1` registry. The image doesn't exists on any node, so 404 NotFound is returned. The `containerd1` then pulls the image from the upstream and fires `/images/create` and `/content/create` events. Events are processed by `spegel1` and it is added as a content provider to the DHT for the image.
Let `kubelet2` on Node2 pull the same image. In this case, `spegel2` looks up the image content in the DHT and finds that the content is available on Node1. It then fetches the contents from the `spegel1` registry on Node1 and streams it directly into the response to `containerd2`. The `containerd2` then fires the image events and `spegel2` added itself as a content provider to the DHT.
Finally, let `kubelet<N>` on Node<N> pull the same image. Here, when `spegel<N>` looks for content, it finds that it is available on Node1 and Node2. It will then fetch some layers from Node1 and some from Node2.

### Spegel Binary and Systemd Unit

The `spegel` binary will be provided to the node in the `/opt/bin/` folder via an `OperatingSystemConfig` mutation. The same approach is used for `spegel.service` systemd unit that depends on containerd service and must be started before the kubelet service:

```sh
[Unit]
Description=spegel daemon
Documentation=https://github.com/spegel-org/spegel
After=containerd.service
Requires=containerd.service
Before=kubelet.service
[Install]
WantedBy=multi-user.target
[Service]
Restart=always
RestartSec=5
MemoryHigh=80M
MemoryMax=100M
ExecStartPre=/bin/sh -c 'sed -i "s/<<HOST_IP>>/$(hostname -i)/g" /var/lib/spegel/env'
ExecStartPre=/bin/sh -c 'find /etc/containerd/certs.d -type f -name "*.toml" | xargs sed -i "s/<<HOST_IP>>/$(hostname -i)/g"'
EnvironmentFile=/var/lib/spegel/env
ExecStart=/opt/bin/spegel \
    registry \
    --log-level=INFO \
    --mirror-resolve-retries=3 \
    --mirror-resolve-timeout=20ms \
    --registry-addr=${HOST_IP}:15500 \
    --router-addr=${HOST_IP}:15501 \
    --metrics-addr=${HOST_IP}:19090 \
    --containerd-sock=/run/containerd/containerd.sock \
    --containerd-namespace=k8s.io \
    --bootstrap-kind=http \
    --http-bootstrap-url=https://<spegel_bootstrapper_domain_name>/bootstrap-nodes \
    --http-bootstrap-cert-dir=/var/lib/spegel/certs \
    --containerd-content-path=/var/lib/containerd/io.containerd.content.v1.content
```

The certificates used for `mTLS` with `Bootstrapper` are also provided in the `/var/lib/spegel/certs` folder via the `OperatingSystemConfig` resource.

### Containerd Configuration

The `registry-spegel` extension ensures that the [`discard_unpacked_layers`](https://github.com/containerd/containerd/blob/cb15e731a101d3cfdb94e4c905e43318929104aa/internal/cri/config/config.go#L293-L296) setting is set to `false`. This is done via the `CRIConfig.Containerd.Plugins` field in the `OperatingSystemConfig` resource. If the value is `true` the image layers are deleted after unpacking and Spegel cannot serve the content. For details, see [Spegel compatibility](https://spegel.dev/docs/getting-started/#compatibility). `discard_unpacked_layers` is `false` by default on gardenlinux:
```bash
$ cat /etc/containerd/config.toml
disabled_plugins = []
...
version = 3
...
[plugins]

  [plugins."io.containerd.cri.v1.images"]
    concurrent_layer_fetch_buffer = 0
    disable_snapshot_annotations = true
    discard_unpacked_layers = false
...
```

The `registry-spegel` extension will configure the containerd with a [`_default`](https://github.com/containerd/containerd/blob/v2.2.1/docs/hosts.md#setup-default-mirror-for-all-registries) mirror configuration for the local `spegel` registry:
```bash
$ tree /etc/containerd/certs.d
/etc/containerd/certs.d
└── _default
    └── hosts.toml

$ cat /etc/containerd/certs.d/_default/hosts.toml
# managed by gardener-node-agent
[host."http://<node-internal-ip>:15500"]
  capabilities = ["pull", "resolve"]
```

For existing mirror configurations (e.g., provided by `registry-cache` and `image-rewriter` extensions) it will inject the local spegel registry as a first host entry in the `hosts.toml` file. This will be done via the mutation of the `CRIConfig.Containerd.Registries` field in `OperatingSystemConfig` resource and requires also a change in the components that mutate registry configurations (via webhooks) to respect this change.

### Spegel Bootstrapper

In the Shoot control plane a Spegel `bootstrapper` is provided. It consists of:
- Deployment
- Service
- Istio VirtualService and Gateway

The `spegel` registries send a GET request to `https://<spegel_bootstrapper_domain_name>/bootstrap-nodes` to get the bootstrap peers. Traffic is encrypted and authenticated using mTLS.
The `bootstrapper` uses client-go to access the `kube-apiserver` and lists the Kubernetes nodes. It sorts the nodes and returns a subset of the first few node `net.IPAddr` addresses, similar to what is done in [`DNSBootstrapper`](https://github.com/spegel-org/spegel/blob/v0.6.0/pkg/routing/bootstrap.go#L77-L80).

### Observability and Monitoring

The `spegel` registry exposes the following noticeable metrics:
- `http_response_size_bytes` - The size of the HTTP responses - histogram type.
- `http_request_duration_seconds` - The latency of the HTTP requests - histogram type.
- `spegel_mirror_requests_total` - Total number of mirror requests - counter type.
- `spegel_resolve_duration_seconds` - The duration for router to resolve a peer - histogram type.
- `spegel_advertised_keys` - Number of keys advertised to be available - gauge type.

With these metrics, Spegel cache's efficiency can be tracked. In the PoC branch, a [sample dashboard](https://github.com/dimitar-kostadinov/gardener-extension-registry-cache/blob/spegel_api_poc/pkg/component/registrycaches/monitoring/dashboard.json) is created.

### Future Enhancement

In the [Network topology awareness](https://github.com/spegel-org/spegel/issues/669) issue there are options to implement zone aware routing (e.g., enhance Kademlia DHT with Soft Partitioning).

A simple approach was tested locally on GCP infrastructure. When the content is available on the node, it registers `<digest>` and `<zone><digest>` as keys in the DHT. The disadvantage of this approach, besides duplication of keys, is that when searching for content, the `<zone><digest>` key is tried first, and if not enough peers providing the content are found, a new search is performed for the `<digest>` key.

### Proof of Concept

There is **PoC** of the above proposal available here:
- https://github.com/dimitar-kostadinov/gardener-extension-registry-cache/tree/spegel_api_poc

## Impact and Alternatives

### Risks, Downsides and Trade-offs

- **Images not covered by Spegel**: Images pulled by the `gardener-node-init.service` via the `ctr` CLI / containerd client (e.g. `gardener-node-agent`, `hyperkube`, `opentelemetry-collector`/`valitail`, `spegel` itself, and images referenced via `spec.files[].content.imageRef` in the `OperatingSystemConfig`) are pulled before Spegel is available and therefore always come from the upstream. See [Non-Goals](#non-goals).

- **Increased root disk usage**: To be able to serve image layers to peers, Spegel requires containerd's [`discard_unpacked_layers`](https://spegel.dev/docs/getting-started/#compatibility) setting to be `false`. On systems where this setting defaults to `true`, enabling `registry-spegel` will retain the compressed layer blobs on the node's root disk after unpacking, thus increasing the root disk usage. Spegel serves directly from containerd's content store - but it does prevent the space reclamation that `discard_unpacked_layers = true` would otherwise perform. On Garden Linux this setting is already `false` by default, so there is no change. This trade-off should be clearly documented for users so it does not come as a surprise.

- **Increased memory usage on the nodes**: Running Spegel as a systemd unit on every node adds a resident process that consumes memory (for the libp2p host, the Kademlia DHT routing table, and the advertised content records). The `spegel.service` unit constrains this via `MemoryHigh=80M` and `MemoryMax=100M`, so a node's available memory is reduced accordingly. As this memory is consumed on the host and not by a Kubernetes pod, it is not reflected in the node's kube-reserved/system-reserved and is therefore not visible as a scheduling reservation.

### Alternative approaches

#### Spegel as a DaemonSet

The straightforward way to deploy Spegel is to use upstream Helm chart and deploy it as a `DaemonSet`. This variant was implemented and tested as a PoC using the upstream DNS bootstrapper ([PoC](https://github.com/dimitar-kostadinov/gardener-extension-registry-cache/tree/spegel_api_poc2)), which works out of the box.

Pros:
- Improved visibility in Kubernetes: native monitoring, debugging (`kubectl logs`), autoscaling and resource reservation.

Cons:
- Does not cover most images in the `kube-system` namespace, because the Spegel pod (and, for the DNS bootstrapper, `kube-dns`) must be running before it can serve content. Images pulled during node bootstrap - measured at roughly `200MiB` per node are pulled from the upstream instead of from a peer.
- Like the systemd approach, it does not cover images pulled by the `gardener-node-agent`.

The systemd-unit approach was preferred because it covers **all** images pulled by the kubelet, including images from the `kube-system` namespace, which is where a significant share of the traffic savings comes from. The visibility trade-off is mitigated by the Gardener observability stack (metrics scraping and journald log collection via the OpenTelemetry Collector).

#### Dragonfly

[`Dragonfly`](https://github.com/dragonflyoss/dragonfly?tab=readme-ov-file#dragonfly) was evaluated as an alternative. Unlike Spegel, it is not stateless and requires central components such as:
- manager - to manage the p2p network.
- scheduler - for optimal parent peer selection.

They require `mysql` and `redis` storages. Another disadvantage is the additional image store on the node's root disk.

## Appendix (Optional)

### Kademlia Distributed Hash Table

[Kademlia DHT](https://github.com/libp2p/specs/blob/master/kad-dht/README.md) is part of libp2p library and is used by Spegel for peer routing and content provider advertisement and discovery.
A unique 256 bits ID is [generated](https://github.com/libp2p/go-libp2p/blob/636d44e15abc7bfbd1da09cc9fef674249625ae6/core/peer/peer.go#L163) for each peer node (this is the `Ed25519` public key in Spegel case). Based on the node ID, a routing table consisting of `k`-Buckets is maintained. Peers nodes are placed into `k`-Buckets based on how similar their IDs are to the local node's ID, using `XOR` distance to measure proximity.

- An example with 4 bits ID 0110 there will be 4 buckets for prefixes 1xxx (distance >= 8), 00xx (distance in [4,5,6,7]), 010x (distance in [2,3]) and 0111 (distance = 1)
  
  ![alt text](/docs/proposals/0043-spegel-registry-support-in-the-registry-cache-extension/spegel-kad-dht.png)

For each prefix, at most `k` nodes are included. The default value for `k` is [20](https://github.com/libp2p/go-libp2p-kad-dht/blob/77a76e94564531977d4bb65f740674798a39543a/amino/defaults.go#L26).

When a node joins the cluster, it must know the address of at least one peer (also known as [bootstrap peer](https://github.com/libp2p/go-libp2p-kad-dht/blob/0ad6ca5eeecff43283a334120a12f8c0add79f1b/dht.go#L521-L542)). The new node connects to the bootstrap peers and adds them to the routing table. It sends [`FIND_NODE`](https://github.com/libp2p/go-libp2p-kad-dht/blob/0ad6ca5eeecff43283a334120a12f8c0add79f1b/rtrefresh/rt_refresh_manager.go#L246) to bootstrap nodes for its own ID and receive information for the `k` closest nodes, adding them to the routing table. The new node then sends [`FIND_NODE`](https://github.com/libp2p/go-libp2p-kad-dht/blob/0ad6ca5eeecff43283a334120a12f8c0add79f1b/rtrefresh/rt_refresh_manager.go#L263) to the appropriate peers in the routing table for random keys within ranges corresponding to its empty `k`-Buckets. During the peer connection process, other peers may [add](https://github.com/libp2p/go-libp2p-kad-dht/blob/23423e3911906b85db01a829f6e36e3917185cf5/dht.go#L503-L507) the new node ID to their routing tables.

When an image, manifest, or blob becomes available on a node, it sends an [`ADD_PROVIDER`](https://github.com/libp2p/go-libp2p-kad-dht/blob/0ad6ca5eeecff43283a334120a12f8c0add79f1b/routing.go#L437-L466) message to the `k` peers that are closest to the content `digest`. Then, if the `digest` is needed by another node, it sends a [`GET_PROVIDERS`](https://github.com/libp2p/go-libp2p-kad-dht/blob/0ad6ca5eeecff43283a334120a12f8c0add79f1b/routing.go#L538-L619) message to the peers closest to the `digest` and receives a set of peers that provides the content.

### Supporting Materials (Linked or Embedded)

- [Spegel](https://github.com/spegel-org/spegel#spegel)
- [Setup Default Mirror for All Registries](https://github.com/containerd/containerd/blob/v2.2.1/docs/hosts.md#setup-default-mirror-for-all-registries)
- [Content provider routing](https://docs.libp2p.io/concepts/discovery-routing/kaddht/#content-provider-routing)
- [Kademlia DHT](https://github.com/libp2p/specs/blob/master/kad-dht/README.md)
- [Kademlia DHT Message Types](https://github.com/libp2p/specs/blob/master/kad-dht/README.md)
- [Dragonfly](https://github.com/dragonflyoss/dragonfly?tab=readme-ov-file#dragonfly)

### References to Related Issues

- [Run Spegel directly on host](https://github.com/spegel-org/spegel/issues/829)
- [Network topology awareness](https://github.com/spegel-org/spegel/issues/669)

