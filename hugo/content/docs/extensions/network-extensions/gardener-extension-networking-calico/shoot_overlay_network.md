---
github_repo: 'https://github.com/gardener/gardener-extension-networking-calico'
github_subdir: docs/usage
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/network-extensions/gardener-extension-networking-calico/shoot_overlay_network.md
  to: shoot_overlay_network.md
persona: Users
title: Shoot Overlay Network
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
   https://github.com/gardener/gardener-extension-networking-calico/blob/master/docs/usage/shoot_overlay_network.md
-->


# Enable / disable overlay network for shoots with Calico
Gardener can be used with or without the overlay network.

Starting versions:
- [provider-gcp@v1.25.0](https://github.com/gardener/gardener-extension-provider-gcp/releases/tag/v1.25.0)
- [provider-alicloud@v1.43.0](https://github.com/gardener/gardener-extension-provider-alicloud/releases/tag/v1.43.0)
- [provider-aws@v1.38.2](https://github.com/gardener/gardener-extension-provider-aws/releases/tag/v1.38.2)
- [provider-openstack@v1.30.0](https://github.com/gardener/gardener-extension-provider-openstack/releases/tag/v1.30.0)

The default configuration of shoot clusters is without overlay network.

## Understanding overlay network
The Overlay networking permits the routing of packets between multiples pods located on multiple nodes, even if the pod and the node network are not the same.

This is done through the encapsulation of pod packets in the node network so that the routing can be done as usual. We use `ipip` encapsulation with calico as default in case the overlay network is enabled. This (simply put) sends an IP packet as workload in another IP packet.

![](/docs/extensions/network-extensions/gardener-extension-networking-calico/assets/overlay-network.drawio.png)

In order to simplify the troubleshooting of problems and reduce the latency of packets traveling between nodes, the overlay network is disabled by default as stated above for all new clusters.

![](/docs/extensions/network-extensions/gardener-extension-networking-calico/assets/no-overlay-network.drawio.png)

This means that the routing is done directly through the VPC routing table. Basically, when a new node is created, it is assigned a slice (usually a /24) of the pod network. All future pods in that node are going to be in this slice. Then, the cloud-controller-manager updates the cloud provider router to add the new route (all packets within the network slice as destination should go to that node).

This has the advantage of:
- Doing less work for the node as encapsulation takes some CPU cycles.
- The maximum transmission unit (MTU) is slightly bigger resulting in slightly better performance, i.e. potentially more workload bytes per packet.
- More direct and simpler setup, which makes the problems much easier to troubleshoot.

**In the case where multiple shoots are in the same VPC and the overlay network is disabled, if the pod's network is not configured properly, there is a very strong chance that some pod IP address might overlap, which is going to cause all sorts of funny problems.** So, if someone asks you how to avoid that, they need to make sure that the podCIDRs for each shoot **do not overlap with each other**.

## Enabling the overlay network
In certain cases, the overlay network might be preferable if, for example, the customer wants to create multiple clusters in the same VPC without ensuring there's no overlap between the pod networks.

To enable the overlay network, add the following to the shoot's YAML:
```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
...
spec:
...
  networking:
    type: calico
    providerConfig:
      apiVersion: calico.networking.extensions.gardener.cloud/v1alpha1
      kind: NetworkConfig
      overlay:
        enabled: true
  ...
```

## Disabling the overlay network
Inversely, here is how to disable the overlay network:
```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
...
spec:
...
  networking:
    type: calico
    providerConfig:
      apiVersion: calico.networking.extensions.gardener.cloud/v1alpha1
      kind: NetworkConfig
      overlay:
        enabled: false
  ...
```

## Using VXLAN as overlay

To enable the overlay network with VXLAN, add the following to the shoot's YAML:
```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
...
spec:
...
  networking:
    type: calico
    providerConfig:
      apiVersion: calico.networking.extensions.gardener.cloud/v1alpha1
      kind: NetworkConfig
      overlay:
        enabled: true
      vxlan:
        enabled: true
  ...
```

## Installing pod routes without an overlay (`createPodRoutes`)
On infrastructures where all cluster nodes share a single L2 network, the overlay can be disabled while still having Calico program the pod routes itself (via the BIRD backend), instead of relying on the cloud provider's route controller. This is controlled by the optional `overlay.createPodRoutes` field:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
...
spec:
...
  networking:
    type: calico
    providerConfig:
      apiVersion: calico.networking.extensions.gardener.cloud/v1alpha1
      kind: NetworkConfig
      overlay:
        enabled: false
        createPodRoutes: true
  ...
```

> [!WARNING]
> `createPodRoutes` only works if all cluster nodes share a single L2 network. On routed/multi-subnet infrastructures the installed routes will not be reachable.

## How to know if a cluster is using overlay or not?
You can look at any of the old nodes. If there are `tunl0` devices at least at some point in time the overlay network was used.
Another way is to look into the Network object in the shoot's control plane namespace on the seed (see example above). Alternatively, inspect the Calico `default-ipv4-ippool` IPPool on the shoot: `spec.ipipMode=Always` means the overlay is active, `spec.ipipMode=Never` means native routing.

## Migrating between overlay and native routing

### From native routing to overlay
The migration from no overlay to overlay is fairly simple by just enabling the overlay in the shoot's `NetworkConfig` (as described in [Enabling the overlay network](#enabling-the-overlay-network)):

```yaml
      overlay:
        enabled: true
```

Calico starts encapsulating traffic once the change is rolled out.

### From overlay to native routing
Switching the other way (overlay → native routing) is more delicate. The overlay has to be disabled in the shoot's `NetworkConfig`:

```yaml
      overlay:
        enabled: false
```

In addition, the pod-CIDR routes must exist in the infrastructure routing table (or on the nodes themselves) before Calico stops encapsulating traffic. If the IPPool is flipped to `ipipMode=Never` while those routes are still missing, cross-node pod traffic is dropped until the routes appear.

Because Calico applies the new IPPool configuration slowly (one `calico-node` at a time), an uncoordinated switch can cause network outages for the duration of the rollout.

To avoid such an outage, the extension offers the `SeamlessOverlaySwitch` feature gate (see below), which holds the overlay in place until the infrastructure routes have been created on every node, so the switch can be performed without downtime.

## Seamless IP-in-IP overlay-to-native switch (`SeamlessOverlaySwitch` feature gate)

The `SeamlessOverlaySwitch` feature gate (alpha, off by default) makes the switch from the default IP-in-IP overlay to native routing downtime-free by only reconfiguring Calico once the infrastructure routes for every node's pod CIDR exist. It is enabled on the `networking-calico` extension deployment:

```yaml
# ControllerDeployment / extension configuration
featureGates:
  SeamlessOverlaySwitch: true
```

### How it works
When the feature gate is enabled and a shoot's `overlay.enabled` is changed from `true` to `false`, the extension's reconciler detects the switch (by comparing the desired `NetworkConfig` against the actual state of the `calico-node` DaemonSet). As long as the switch is in progress, it does **not** apply `ipipMode=Never` to the IPPool. Instead it checks every node for the `NetworkUnavailable` condition and only proceeds once **all** nodes report:

```
type:    NetworkUnavailable
status:  False
reason:  RouteCreated
```

Until then, the reconcile fails with `waiting for routes to be created on all nodes before disabling overlay` and is retried. The overlay therefore stays active until the infrastructure routes are in place, after which Calico switches to native routing without dropping cross-node traffic.

This mirrors the approach used on AWS, where the switch is gated on the per-node route condition rather than being applied blindly (see the AWS implementation below).

### Prerequisites
- The `SeamlessOverlaySwitch` feature gate must be enabled on the `networking-calico` extension.
- The infrastructure provider must set the `NetworkUnavailable=False` / `reason=RouteCreated` node condition once it has created the pod-CIDR route for a node. On AWS this is done by the dedicated `aws-custom-route-controller`; on the other infrastructures supported by Gardener the routes are managed by the cloud-controller-manager, which sets the same condition (see below). Providers that do not set this condition cannot benefit from the gate — the switch would wait indefinitely.
- `MutatingAdmissionPolicy` must be available on the shoot's kube-apiserver: it is GA (always on) from Kubernetes `1.36`. On `1.34`/`1.35` it is beta and requires an explicit opt-in via the `MutatingAdmissionPolicy` feature gate plus a matching `runtimeConfig` entry (`admissionregistration.k8s.io/v1beta1`); earlier versions need the alpha `admissionregistration.k8s.io/v1alpha1`. If it is not available, the gate is skipped and the switch happens the (potentially disruptive) regular way.

> [!NOTE]
> A system/integration test that exercises this behaviour end-to-end (including an injected "routes not yet created" hazard window) lives under [`test/system/shoot_networking_switch`](https://github.com/gardener/gardener-extension-networking-calico/blob/master/test/system/shoot_networking_switch/README.md).

## Route management per infrastructure
When the overlay is disabled, the pod-CIDR routes have to be programmed into the infrastructure routing table. On all infrastructures supported by Gardener except AWS this is done by the **cloud-controller-manager**, which creates the route for each node's pod CIDR and sets that node's `NetworkUnavailable` condition to `status=False` with `reason=RouteCreated`.

### AWS implementation
On AWS, it is not possible to use the cloud-controller-manager for managing the routes as it does not support multiple route tables, which Gardener creates (one per zone). Therefore, when the overlay is disabled, provider-aws instead deploys a dedicated [`aws-custom-route-controller`](https://github.com/gardener/aws-custom-route-controller) into the shoot's control-plane namespace to manage the routes.

The route controller watches the shoot's nodes, reads each node's pod CIDR, and programs the corresponding routes into all of the cluster's VPC route tables. Once it has successfully created a node's route, it sets that node's `NetworkUnavailable` condition to `status=False` with `reason=RouteCreated` (and to `status=True` / `reason=NoRouteCreated` on failure) — the same condition the cloud-controller-manager sets on the other infrastructures.

Either way, this per-node condition is exactly the signal the `SeamlessOverlaySwitch` gate waits for before switching Calico to native routing, which is why the switch effectively only happens once the infrastructure routes have been created.
