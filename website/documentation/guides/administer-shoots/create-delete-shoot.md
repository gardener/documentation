---
title: Create / Delete a Shoot Cluster
level: advanced
category: Operation
scope: operator
---

## Create a Shoot Cluster

As you have already prepared an [example Shoot manifest](https://github.com/gardener/gardener/blob/master/example/90-shoot.yaml) in the steps described in the development documentation, please open another Terminal pane/window with the `KUBECONFIG` environment variable pointing to the Garden development cluster and send the manifest to the Kubernetes API server:

```bash
$ kubectl apply -f your-shoot-aws.yaml
```

You should see that Gardener has immediately picked up your manifest and has started to deploy the Shoot cluster.

In order to investigate what is happening in the Seed cluster, please download its proper Kubeconfig yourself (see next paragraph). The namespace of the Shoot cluster in the Seed cluster will look like that: `shoot-johndoe-johndoe-1`, whereas the first `johndoe` is your namespace in the Garden cluster (also called "project") and the `johndoe-1` suffix is the actual name of the Shoot cluster.

To connect to the newly created Shoot cluster, you must download its Kubeconfig as well. Please connect to the proper Seed cluster, navigate to the Shoot namespace, and download the Kubeconfig from the `kubecfg` secret in that namespace.

## Delete a Shoot Cluster

In order to delete your cluster, you have to set an annotation confirming the deletion first, and trigger the deletion after that. You can use the prepared `delete shoot` script which takes the Shoot name as first parameter. The namespace can be specified by the second parameter, but it is optional. If you don't state it, it defaults to your namespace (the username you are logged in with to your machine).

```bash
$ ./hack/usage/delete shoot johndoe-1 johndoe
```
(the `hack` bash script can be found at [GitHub](https://github.com/gardener/gardener/blob/master/hack/usage/delete))

# Configure a Shoot cluster alert receiver

The receiver of the Shoot alerts can be configured from the `.spec.monitoring.alerting.emailReceivers` section in the Shoot specification. The value of the field has to be a list of valid mail addresses.

The alerting for the Shoot clusters is handled by the Prometheus Alertmanager. The Alertmanager will be deployed next to the control plane when the `Shoot` resource specifies `.spec.monitoring.alerting.emailReceivers` and if a [SMTP secret](https://github.com/gardener/gardener/blob/master/example/10-secret-alerting.yaml) exists.

If the field gets removed then the Alertmanager will be also removed during the next reconcilation of the cluster. The opposite is also valid if the field is added to an existing cluster.
