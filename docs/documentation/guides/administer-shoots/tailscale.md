# Access the Kubernetes apiserver from your tailnet

## Overview

If you would like to strengthen the security of your Kubernetes cluster even further, this guide post explains how this can be achieved.

The most common way to secure a Kubernetes cluster which was created with Gardener is to apply the ACLs described in the [Gardener ACL Extension](https://github.com/stackitcloud/gardener-extension-acl) repository or to use [ExposureClass](https://gardener.cloud/docs/gardener/exposureclasses/), which exposes the Kubernetes apiserver in a corporate network not exposed to the public internet.

However, those solutions are not without their drawbacks. Managing the ACL extension becomes fairly difficult with the growing number of participants, especially in a dynamic environment and work from home scenarios, and using ExposureClass requires you to first have a corporate network suitable for this purpose.

But there is a solution which bridges the gap between these two approaches by the use of a mesh VPN based on [WireGuard](https://www.wireguard.com/).

## Tailscale

Tailscale is a mesh VPN network which uses Wireguard under the hood, but automates the key exchange procedure.
Please consult the official [tailscale documentation](https://tailscale.com/kb/1151/what-is-tailscale) for a detailed explanation.

## Target Architecture

![architecture](images/tailscale.drawio.svg)

### Installation

In order to be able to access the Kubernetes apiserver only from a tailscale VPN, you need this steps:

1. Create a tailscale account and ensure [MagicDNS](https://tailscale.com/kb/1081/magicdns?q=magic) is enabled.
2. Create an OAuth ClientID and Secret [OAuth ClientID and Secret](https://tailscale.com/kb/1236/kubernetes-operator#prerequisites). Don't forget to create the required tags.
3. Install the tailscale operator [tailscale operator](https://tailscale.com/kb/1236/kubernetes-operator#installation).

If all went well after the operator installation, you should be able to see the tailscale operator by running `tailscale status`:

```bash
# tailscale status
...
100.83.240.121  tailscale-operator   tagged-devices linux   -
...
```

### Expose the Kubernetes apiserver

Now you are ready to expose the Kubernetes apiserver in the tailnet by annotating the service which was created by Gardener:

```bash
kubectl annotate -n default kubernetes tailscale.com/expose=true tailscale.com/hostname=kubernetes
```

It is required to `kubernetes` as the hostname, because this is part of the certificate common name of the Kubernetes apiserver.

After annotating the service, it will be exposed in the tailnet and can be shown by running `tailscale status`:

```bash
# tailscale status
...
100.83.240.121  tailscale-operator   tagged-devices linux   -
100.96.191.87   kubernetes           tagged-devices linux   idle, tx 19548 rx 71656
...
```

### Modify the kubeconfig

In order to access the cluster via the VPN, you must modify the kubeconfig to point to the Kubernetes service exposed in the tailnet, by changing the `server` entry to `https://kubernetes`.

```yaml
---
apiVersion: v1
clusters:
  - cluster:
      certificate-authority-data: <base64 encoded secret>
      server: https://kubernetes
    name: my-cluster
...
```

### Enable ACLs to Block All IPs

Now you are ready to use your cluster from every device which is part of your tailnet. Therefore you can now block all access to the Kubernetes apiserver with the ACL extension.

## Caveats

### Multiple Kubernetes Clusters

You can actually not join multiple Kubernetes Clusters to join your `tailnet` because the `kubernetes` service in every cluster would overlap.

### Headscale

It is possible to host a tailscale coordination by your own if you do not want to rely on the service tailscale.com offers.
The [headscale project](https://github.com/juanfont/headscale) is a open source implementation of this.

This works for basic tailscale VPN setups, but not for the tailscale operator described here, because `headscale` does not implement all required API endpoints for the tailscale operator.
The details can be found in this [Github Issue](https://github.com/juanfont/headscale/issues/1202).
