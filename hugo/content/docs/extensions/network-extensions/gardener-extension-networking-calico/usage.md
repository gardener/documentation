---
github_repo: 'https://github.com/gardener/gardener-extension-networking-calico'
github_subdir: docs/usage
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/network-extensions/gardener-extension-networking-calico/usage.md
  to: usage.md
persona: Users
title: Usage
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
   https://github.com/gardener/gardener-extension-networking-calico/blob/master/docs/usage/usage.md
-->


# Using the Networking Calico extension with Gardener as end-user

The [`core.gardener.cloud/v1beta1.Shoot` resource](https://github.com/gardener/gardener/blob/master/example/90-shoot.yaml) declares a `networking` field that is meant to contain network-specific configuration.

In this document we are describing how this configuration looks like for Calico and provide an example `Shoot` manifest with minimal configuration that you can use to create a cluster.

## Calico Typha

Calico Typha is an optional component of Project Calico designed to offload the Kubernetes API server. The Typha daemon sits between the datastore (such as the Kubernetes API server which is the one used by Gardener managed Kubernetes) and many instances of Felix. Typha’s main purpose is to increase scale by reducing each node’s impact on the datastore. You can opt-out Typha via `.spec.networking.providerConfig.typha.enabled=false` of your Shoot manifest. By default the Typha is enabled.

## EBPF Dataplane

Calico can be run in ebpf dataplane mode. This has several benefits, calico scales to higher troughput, uses less cpu per GBit and has native support for kubernetes services (without needing kube-proxy).
To switch to a pure ebpf dataplane it is recommended to run without an overlay network. The following configuration can be used to run without an overlay and without kube-proxy.

An example ebpf dataplane `NetworkingConfig` manifest:

```yaml
apiVersion: calico.networking.extensions.gardener.cloud/v1alpha1
kind: NetworkConfig
ebpfDataplane:
  enabled: true
overlay:
  enabled: false
```

To disable kube-proxy set the enabled field to false in the shoot manifest.

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
  name: ebpf-shoot
  namespace: garden-dev
spec:
  kubernetes:
    kubeProxy:
      enabled: false
```

### Know limitations of the EBPF Dataplane

Please note that the default settings for calico's ebpf dataplane may interfere with
[accelerated networking in azure](https://learn.microsoft.com/en-us/azure/virtual-network/accelerated-networking-overview)
rendering nodes with accelerated networking unusable in the network. The reason for this is that calico does not ignore
the accelerated networking interface `enP...` as it should, but applies its ebpf programs to it. A simple mitigation for
this is to adapt the `FelixConfiguration` `default` and ensure that the `bpfDataIfacePattern` does not include `enP...`.
Per default `bpfDataIfacePattern` is not set. The default value for this option can be found
[here](https://github.com/projectcalico/calico/blob/3f7fe4d290541bbdd73c97bdc89a29a29855a48a/felix/config/config_params.go#L180).
For example, you could apply the following change:

```
$ kubectl edit felixconfiguration default
...
apiVersion: crd.projectcalico.org/v1
kind: FelixConfiguration
metadata:
  ...
  name: default
  ...
spec:
  bpfDataIfacePattern: ^((en|wl|ww|sl|ib)[opsx].*|(eth|wlan|wwan).*|tunl0$|vxlan.calico$|wireguard.cali$|wg-v6.cali$)
  ...
```

## IPAM Configuration

Calico supports two IPAM (IP Address Management) types: `calico-ipam` and `host-local` (default).

### `calico-ipam`

The `calico-ipam` type uses Calico's built-in IPAM controller for IP address allocation. **Note**: `calico-ipam` cannot be used with IPv6 single-stack or dual-stack shoots.

### `host-local`

The `host-local` IPAM type is the recommended option and supports all networking configurations, including IPv4 single-stack, IPv6 single-stack, and dual-stack shoots.

An example `NetworkingConfig` with IPAM configuration:

```yaml
apiVersion: calico.networking.extensions.gardener.cloud/v1alpha1
kind: NetworkConfig
ipam:
  type: host-local
  cidr: usePodCIDR
```

## AutoScaling

Autoscaling defines how the calico components are automatically scaled. It allows to use either static resource assignment, vertical pod or cluster-proportional autoscaler (default: cluster-proportional).

The cluster-proportional autoscaling mode is preferable when conditions require minimal disturbances and vpa mode for improved cluster resource utilization. Static resource assignments causes no disruptions due to autoscaling, but has no dynamics to handle changing demands.

Please note VPA must be enabled on the shoot as a pre-requisite to enabling vpa mode.

An example `NetworkingConfig` manifest for vertical pod autoscaling:

```yaml
apiVersion: calico.networking.extensions.gardener.cloud/v1alpha1
kind: NetworkConfig
autoScaling:
  mode: "vpa"
  resources:
    node:
      cpu: 100m
      memory: 100Mi
    typha:
      cpu: 100m
      memory: 100Mi
```

The resources section is optional in conjunction with vpa mode. It allows to set the minimum allowed resource requests for `calico-node` and `calico-typha`. If not specified, no minimum value is defined.

An example `NetworkingConfig` manifest for static resource assignment:

```yaml
apiVersion: calico.networking.extensions.gardener.cloud/v1alpha1
kind: NetworkConfig
autoScaling:
  mode: "static"
  resources:
    node:
      cpu: 100m
      memory: 100Mi
    typha:
      cpu: 100m
      memory: 100Mi
```

> ℹ️ Please note that in static mode, you have the option to configure the resource requests for calico-node and calico-typha. If not specified, default settings will be used.
> If the resource requests are chosen too low, it might impact the stability/performance of the cluster.
> Specifying the resource requests for any other autoscaling mode has no effect.

## Restricting Access to the `kube-apiserver`

In a Gardener shoot cluster, pods reach the `kube-apiserver` via two different paths, and Calico observes a different destination IP for each of them:

1. **The in-cluster path.** Traffic to the `kubernetes` service in the `default` namespace is intercepted by the node-local `apiserver-proxy` and forwarded to the seed cluster. This path can be expressed in Calico policy with a [service based rule](https://docs.tigera.io/calico/latest/reference/resources/globalnetworkpolicy#servicematch).
1. **The `KUBERNETES_SERVICE_HOST` path.** Gardener [injects the out-of-cluster API server address](/docs/gardener/networking/shoot_kubernetes_service_host_injection/) into all shoot pods, so traffic goes directly to the load balancer of the seed's istio ingress gateway. The IP address of that load balancer is not known inside the shoot cluster, so it cannot be referenced in a policy.

To close that gap, the extension can maintain a Calico [`GlobalNetworkSet`](https://docs.tigera.io/calico/latest/reference/resources/globalnetworkset) in the shoot cluster which contains the IP address(es) of the `kube-apiserver` endpoint. The extension only provides this building block, it does **not** create any `NetworkPolicy` or `GlobalNetworkPolicy`.

Enable it in the `NetworkingConfig`:

```yaml
apiVersion: calico.networking.extensions.gardener.cloud/v1alpha1
kind: NetworkConfig
kubeAPIServerGlobalNetworkSet:
  enabled: true
```

> ℹ️ The extension operator can also enable this by default for all shoots. In that case the field only needs to be set in order to opt out of it (`enabled: false`).

The resulting object looks as follows:

```yaml
apiVersion: crd.projectcalico.org/v1
kind: GlobalNetworkSet
metadata:
  name: gardener-kube-apiserver
  labels:
    networking.gardener.cloud/endpoint: kube-apiserver
spec:
  nets:
  - 192.0.2.34/32
```

The name `gardener-kube-apiserver` and the label `networking.gardener.cloud/endpoint=kube-apiserver` form the contract for referencing the set. Neither is configurable, so that policies can rely on them, and the label is the only one the extension sets - the labels of a `GlobalNetworkSet` are selector input for Calico policies rather than mere bookkeeping, so any additional one would be matched by a `destination.selector` too.

If the addresses cannot be determined, the extension does **not** publish an incomplete set, since that would match nothing and thereby block the traffic your policies mean to allow. It fails the shoot reconciliation instead, stating why.

### Example policy

Both paths have to be allowed, which requires two separate rules because `destination.services` cannot be combined with any other selection criteria in one egress rule:

```yaml
apiVersion: crd.projectcalico.org/v1
kind: GlobalNetworkPolicy
metadata:
  name: allow-to-kube-apiserver
spec:
  order: 100
  selector: all()
  types:
  - Egress
  egress:
  # 1) in-cluster path: cluster IP and endpoints of the `kubernetes` service
  - action: Allow
    protocol: TCP
    destination:
      services:
        name: kubernetes
        namespace: default
  # 2) injected KUBERNETES_SERVICE_HOST path: the seed's istio ingress gateway
  - action: Allow
    protocol: TCP
    destination:
      selector: networking.gardener.cloud/endpoint == 'kube-apiserver'
      ports:
      - 443
```

The same rules work in a namespaced `NetworkPolicy`, except that the second one needs `namespaceSelector: global()` next to the `selector`, because a `GlobalNetworkSet` is not a namespaced resource:

```yaml
  - action: Allow
    protocol: TCP
    destination:
      namespaceSelector: global()
      selector: networking.gardener.cloud/endpoint == 'kube-apiserver'
      ports:
      - 443
```

### Things to keep in mind

- **Restrict the port.** The load balancer of the istio ingress gateway is shared by all shoot clusters of a seed and also serves other ports, for example for the `apiserver-proxy` and the VPN connection. Always combine the rule with `protocol: TCP` and `ports: [443]`, the port the istio ingress gateway serves the kube-apiserver on.
- **The set is not specific to your cluster.** Because that load balancer is shared, its addresses front the `kube-apiserver`s of all shoot clusters on the same seed, and the istio ingress gateway routes by TLS SNI, not by IP address. A rule allowing traffic to the set therefore allows traffic to every `kube-apiserver` behind it, not only to your own. This is as tight as an IP based rule can be here.
- **The set reflects the addresses at reconciliation time.** Where the `kube-apiserver` is exposed via a hostname rather than an IP address, the extension resolves the hostname when it reconciles the shoot, so the set becomes outdated if the load balancer's addresses change in between. Shoots whose kube-apiserver has no managed DNS at all cannot use the feature: the reconciliation fails until the feature is disabled again.
- **Egress only.** Traffic from the `kube-apiserver` to a pod (webhooks, `kubectl exec`, `kubectl logs`, metrics) arrives through the VPN tunnel and therefore does *not* have the load balancer IP as source address. The set must not be used in `ingress` rules.
- **No server-side defaulting.** Since the Calico API server is not deployed in shoot clusters, the CRD based API group `crd.projectcalico.org/v1` has to be used. It performs no defaulting and no validation of selector expressions, so `spec.types`, `spec.selector` and `spec.order` must be set explicitly. An invalid selector is accepted by the API server and only fails later in `calico-node`/`calico-typha`, where it may drop the whole policy - check their logs if a policy misbehaves, and consider staging new policies with `action: Log` first.
- **The set is managed by Gardener.** It is deployed via a `ManagedResource`, so manual modifications are reverted.
- **`hostNetwork` pods are not covered.** They are not Calico workload endpoints, so Calico policies do not apply to them.
- **DNS.** Pods usually also need egress to the cluster DNS, i.e. to `kube-dns` and, if enabled, to [`node-local-dns`](/docs/gardener/networking/node-local-dns/). The `NetworkPolicies` in the `kube-system` namespace of the shoot show which rules Gardener uses for that. See also the known limitations at the end of this document.

## Example `NetworkingConfig` manifest

An example `NetworkingConfig` for the Calico extension looks as follows:

```yaml
apiVersion: calico.networking.extensions.gardener.cloud/v1alpha1
kind: NetworkConfig
ipam:
  type: host-local
  cidr: usePodCIDR
vethMTU: "1440"
typha:
  enabled: true
overlay:
  enabled: true
autoScaling:
  mode: "vpa"
kubeAPIServerGlobalNetworkSet:
  enabled: true
```

## Example `Shoot` manifest

Please find below an example `Shoot` manifest with calico networking configratations:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
  name: johndoe-azure
  namespace: garden-dev
spec:
  cloudProfileName: azure
  region: westeurope
  secretBindingName: core-azure
  provider:
    type: azure
    infrastructureConfig:
      apiVersion: azure.provider.extensions.gardener.cloud/v1alpha1
      kind: InfrastructureConfig
      networks:
        vnet:
          cidr: 10.250.0.0/16
        workers: 10.250.0.0/19
      zoned: true
    controlPlaneConfig:
      apiVersion: azure.provider.extensions.gardener.cloud/v1alpha1
      kind: ControlPlaneConfig
    workers:
    - name: worker-xoluy
      machine:
        type: Standard_D4_v3
      minimum: 2
      maximum: 2
      volume:
        size: 50Gi
        type: Standard_LRS
      zones:
      - "1"
      - "2"
  networking:
    type: calico
    nodes: 10.250.0.0/16
    providerConfig:
      apiVersion: calico.networking.extensions.gardener.cloud/v1alpha1
      kind: NetworkConfig
      ipam:
        type: host-local
      vethMTU: "1440"
      overlay:
        enabled: true
      typha:
        enabled: false
      kubeAPIServerGlobalNetworkSet:
        enabled: true
  kubernetes:
    version: 1.32.0
  maintenance:
    autoUpdate:
      kubernetesVersion: true
      machineImageVersion: true
  addons:
    kubernetesDashboard:
      enabled: true
    nginxIngress:
      enabled: true
```

## Known Limitations in conjunction with `NodeLocalDNS`

If [`NodeLocalDNS`](/docs/gardener/networking/node-local-dns/) is active in a shoot cluster, which uses calico as CNI without overlay network, it may be impossible to block DNS traffic to the cluster DNS server via network policy. This is due to `FELIX_CHAININSERTMODE` being set to `APPEND` instead of `INSERT` in case SNAT is being applied to requests to the infrastructure DNS server. In this scenario the `iptables` rules of `NodeLocalDNS` already accept the traffic before the network policies are checked.

This only applies to traffic directed to `NodeLocalDNS`. If blocking of all DNS traffic is desired via network policy the pod `dnsPolicy` should be changed to `Default` so that the cluster DNS is not used. Alternatives are usage of overlay network or disabling of `NodeLocalDNS`.
