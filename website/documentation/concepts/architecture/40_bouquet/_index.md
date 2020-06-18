---
title: Bouquet
remote: https://github.com/gardener/bouquet.git
url: /components/bouquet/
type: components
---
# Bouquet

Bouquet is a draft addon manager for the Gardener.
It incorporates some of the requested features of the community but not
yet all of them.

> Caution: This software is early alpha. It is not meant for production use
> and shall (currently) only serve as a possible outlook of what is possible
> with pre-deployed software on Gardener Kubernetes clusters.

## Installation

If you want to deploy Bouquet on a target Gardener cluster, run the following:

```bash
helm install charts/bouquet \
  --name gardener-bouquet \
  --namespace garden
```

This will deploy Bouquet with the required permissions into your garden
cluster.

## Structure

As of now, Bouquet comes with two new custom resources: `AddonManifest` and
`AddonInstance`.

An `AddonManifest` can be considered equivalent to a Helm template. The
manifest itself only contains metadata (like the name, default values etc.).
The actual content of a manifest is specified via its `source` attribute.
Currently, the only available source is a `ConfigMap`.

An `AddonInstance` references an `AddonManifest` and a target `Shoot`. It
may also contain value overrides in its spec. As soon as an `AddonInstance`
is created, Bouquet will apply the values to the templates and then ensure
that the objects exist in the target shoot.
If an `AddonInstance` is deleted, Bouquet will also make sure that the
created objects are deleted as well.

## Example use case

Say you want your cluster to contain istio right from the start. How can you
do that?

First you need to get the `.yaml` files necessary to deploy istio into your
cluster. Download an istio release as follows:

```bash
wget -O istio.yaml https://raw.githubusercontent.com/kubernetes/kubernetes/master/cluster/addons/istio/noauth/istio.yaml
```

This will fetch a `.yaml` file containing all necessary kubernetes objects
of istio. To make this data available in your garden cluster, create a
configmap in your cluster via

```bash
kubectl -n garden create configmap istio-files --from-file ./istio.yaml
```

Now you need to create an `AddonManifest` that references this file and push
it to Kubernetes. The file could look like the following:

```yaml
apiVersion: "garden.sapcloud.io/v1alpha1"
kind: "AddonManifest"
metadata:
  name: "istio-0.0.1"
  spec:
    configMap: "istio-files"
```

You can submit this manifest to Kubernetes via `kubectl` (given that you saved
the file to `addonmanifest.yaml`:

```bash
kubectl -n garden apply -f addonmanifest.yaml
```

Once this is done, the only thing left to do is to create an `AddonInstance`
referencing both your target `Shoot` and your `AddonManifest`. This
`AddonInstance` has to be in the same namespace as your target `Shoot`:

```yaml
apiVersion: "garden.sapcloud.io/v1alpha1"
kind: "AddonInstance"
metadata:
  name: "example"
  finalizers:
    - "bouquet"
spec:
  manifest:
    namespace: "garden"
    name: "istio"
    version: "0.0.1"
  target:
    shoot: "addon-test"
```

And apply it via `kubectl` (given that you saved the file to
`addoninstance.yaml`):

```bash
kubectl -n garden-addon-test apply -f addoninstance.yaml
```

Bouquet will then start deploying your objects to the target `Shoot` once
it is ready.

## Outlook / Future

Since this is just a tech-preview, features like value / chart updates, more
efficient templating, company addon guidelines etc. are not yet implemented /
yet to come / yet to be discussed. It is also not yet clear whether this
should eventually move into the Gardener or remain as a stand-alone component.

Core points that have to be tackled are:
* Fire and forget mode (only deploy objects once, don't monitor afterwards)
* Reconciliation (currently, updating behavior is not correctly implemented)
* Updates of an addon (-> Update strategies)
* Dependent addons / dependency resolution / dependency lifecycle

As such, contributions and help on shaping this topic is highly appreciated.

