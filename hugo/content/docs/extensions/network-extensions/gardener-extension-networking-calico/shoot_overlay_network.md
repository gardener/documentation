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
managed: true
---

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

## How to know if a cluster is using overlay or not?
You can look at any of the old nodes. If there are `tunl0` devices at least at some point in time the overlay network was used.
Another way is to look into the Network object in the shoot's control plane namespace on the seed (see example above).

## Do we have some documentation somewhere on how to do the migration?
No, not yet. The migration from no overlay to overlay is fairly simply by just setting the configuration as specified above. The other way is more complicated as the Network configuration needs to be changed AND the local routes need to be cleaned.
Unfortunately, the change will be rolled out slowly (one calico-node at a time). Hence, it implies some network outages during the migration.

## AWS implementation
On AWS, it is not possible to use the cloud-controller-manager for managing the routes as it does not support multiple route tables, which Gardener creates. Therefore, a custom controller is created to manage the routes.
