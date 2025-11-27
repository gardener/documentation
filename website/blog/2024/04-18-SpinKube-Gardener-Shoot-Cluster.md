---
title: "SpinKube on Gardener - Serverless WASM on Kubernetes"
linkTitle: SpinKube on Gardener - Serverless WASM on Kubernetes
newsSubtitle: April 18, 2024
publishdate: 2024-04-18
authors:
- name: Dimitar Mirchev
  email: dimitar.mirchev@sap.com
  avatar: https://avatars.githubusercontent.com/dimityrmirchev
aliases: ["/blog/2024/04/18/02"]
---

# SpinKube on Gardener - Serverless WASM on Kubernetes

With the rising popularity of [WebAssembly (WASM)](https://webassembly.org/) and [WebAssembly System Interface (WASI)](https://wasi.dev/) comes a variety of integration possibilities. WASM is now not only suitable for the browser, but can be also utilized for running workloads on the server. In this post we will explore how you can get started writing serverless applications powered by [SpinKube](https://www.spinkube.dev/) on a Gardener Shoot cluster. This post is inspired by a similar tutorial that goes through the steps of [Deploying the Spin Operator on Azure Kubernetes Service](https://www.spinkube.dev/docs/spin-operator/tutorials/deploy-on-azure-kubernetes-service/). Keep in mind that this post does not aim to define a production environment. It is meant to show that Gardener Shoot clusters are able to run WebAssembly workloads, giving users the chance to experiment and explore this cutting-edge technology.

## Prerequisites

- [kubectl](https://kubernetes.io/docs/reference/kubectl/) - the Kubernetes command line tool
- [helm](https://helm.sh/) - the package manager for Kubernetes
- A running Gardener Shoot cluster

## Gardener Shoot Cluster

For this showcase I am using a Gardener Shoot cluster on AWS infrastructure with nodes powered by [Garden Linux](https://github.com/gardenlinux/gardenlinux), although the steps should be applicable for other infrastructures as well, since Gardener aims to provide a homogenous Kubernetes experience.

As a prerequisite for next steps, verify that you have access to your Gardener Shoot cluster.

```bash
# Verify the access to the Gardener Shoot cluster
kubectl get ns

NAME              STATUS   AGE
default           Active   4m1s
kube-node-lease   Active   4m1s
kube-public       Active   4m1s
kube-system       Active   4m1s
```

If you are having troubles accessing the Gardener Shoot cluster, please consult the [Accessing Shoot Clusters](https://github.com/gardener/gardener/blob/master/docs/usage/shoot/shoot_access.md) documentation page.

## Deploy the Spin Operator

As a first step, we will install the Spin Operator Custom Resource Definitions and the Runtime Class needed by `wasmtime-spin-v2`.

```bash
# Install Spin Operator CRDs
kubectl apply -f https://github.com/spinkube/spin-operator/releases/download/v0.1.0/spin-operator.crds.yaml

# Install the Runtime Class
kubectl apply -f https://github.com/spinkube/spin-operator/releases/download/v0.1.0/spin-operator.runtime-class.yaml
```

Next, we will install [cert-manager](https://github.com/cert-manager/cert-manager), which is required for provisioning TLS certificates used by the admission webhook of the Spin Operator. If you face issues installing `cert-manager`, please consult the [cert-manager installation](https://cert-manager.io/docs/installation/helm/) documentation.

```bash
# Add and update the Jetstack repository
helm repo add jetstack https://charts.jetstack.io
helm repo update

# Install the cert-manager chart alongside with CRDs needed by cert-manager
helm install \
  cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --version v1.14.4 \
  --set installCRDs=true
```

In order to install the `containerd-wasm-shim` on the Kubernetes nodes we will use the [kwasm-operator](https://kwasm.sh/). There is also a successor of `kwasm-operator` - [runtime-class-manager](https://github.com/spinkube/runtime-class-manager) which aims to address some of the limitations of `kwasm-operator` and provide a production grade implementation for deploying `containerd` shims on Kubernetes nodes. Since `kwasm-operator` is easier to install, for the purpose of this post we will use it instead of the `runtime-class-manager`.

```bash
# Add the kwasm helm repository
helm repo add kwasm http://kwasm.sh/kwasm-operator/
helm repo update

# Install KWasm operator
helm install \
  kwasm-operator kwasm/kwasm-operator \
  --namespace kwasm \
  --create-namespace \
  --set kwasmOperator.installerImage=ghcr.io/spinkube/containerd-shim-spin/node-installer:v0.13.1

# Annotate all nodes in the cluster so kwasm can select them and provision the required containerd shim
kubectl annotate node --all kwasm.sh/kwasm-node=true
```

We can see that a pod has started and completed in the `kwasm` namespace.

```bash
kubectl -n kwasm get pod

NAME                                                              READY   STATUS      RESTARTS   AGE
ip-10-180-7-60.eu-west-1.compute.internal-provision-kwasm-qhr8r   0/1     Completed   0          8s
kwasm-operator-6c76c5f94b-8zt4s                                   1/1     Running     0          15s
```

The logs of the `kwasm-operator` also indicate that the node was provisioned with the required shim.

```bash
kubectl -n kwasm logs kwasm-operator-6c76c5f94b-8zt4s

{"level":"info","node":"ip-10-180-7-60.eu-west-1.compute.internal","time":"2024-04-18T05:44:25Z","message":"Trying to Deploy on ip-10-180-7-60.eu-west-1.compute.internal"}
{"level":"info","time":"2024-04-18T05:44:31Z","message":"Job ip-10-180-7-60.eu-west-1.compute.internal-provision-kwasm is still Ongoing"}
{"level":"info","time":"2024-04-18T05:44:31Z","message":"Job ip-10-180-7-60.eu-west-1.compute.internal-provision-kwasm is Completed. Happy WASMing"}
```

Finally we can deploy the `spin-operator` alongside with a [shim-executor](https://www.spinkube.dev/docs/glossary/#spin-app-executor-crd).

```bash
helm install spin-operator \
  --namespace spin-operator \
  --create-namespace \
  --version 0.1.0 \
  --wait \
  oci://ghcr.io/spinkube/charts/spin-operator

kubectl apply -f https://github.com/spinkube/spin-operator/releases/download/v0.1.0/spin-operator.shim-executor.yaml
```

## Deploy a Spin App

Let's deploy a sample Spin application using the following command:

```bash
kubectl apply -f https://raw.githubusercontent.com/spinkube/spin-operator/main/config/samples/simple.yaml
```

After the CRD has been picked up by the `spin-operator`, a pod will be created running the sample application. Let's explore its logs.

```bash
kubectl logs simple-spinapp-56687588d9-nbrtq

Serving http://0.0.0.0:80
Available Routes:
  hello: http://0.0.0.0:80/hello
  go-hello: http://0.0.0.0:80/go-hello
```

We can see the available routes served by the application. Let's port forward to the application `service` and test them out.

```bash
kubectl port-forward services/simple-spinapp 8000:80

Forwarding from 127.0.0.1:8000 -> 80
Forwarding from [::1]:8000 -> 80
```

In another terminal, we can verify that the application returns a response.

```bash
curl http://localhost:8000/hello

Hello world from Spin!%
```

This sets the ground for further experimentation and testing. What the `SpinApp` CRD provides as capabilities and API can be explored through the [SpinApp CRD reference](https://www.spinkube.dev/docs/reference/spin-app/).

## Cleanup

Let's clean all deployed resources so far.

```bash
# Delete the spin app and its executor
kubectl delete spinapp simple-spinapp
kubectl delete spinappexecutors.core.spinoperator.dev containerd-shim-spin

# Uninstall the spin-operator chart
helm -n spin-operator uninstall spin-operator

# Remove the kwasm.sh/kwasm-node annotation from nodes
kubectl annotate node --all kwasm.sh/kwasm-node-

# Uninstall the kwasm-operator chart
helm -n kwasm uninstall kwasm-operator

# Uninstall the cert-manager chart
helm -n cert-manager uninstall cert-manager

# Delete the runtime class and SpinApp CRDs
kubectl delete runtimeclass wasmtime-spin-v2
kubectl delete crd spinappexecutors.core.spinoperator.dev
kubectl delete crd spinapps.core.spinoperator.dev
```

## Conclusion

In my opinion, WASM on the server is here to stay. Communities are expressing more and more interest in integrating Kubernetes with WASM workloads. As shown Gardener clusters are perfectly capable of supporting this use case. This setup is a great way to start exploring the capabilities that WASM can bring to the server. As stated in the introduction, bear in mind that this post does not define a production environment, but is rather meant to define a playground suitable for exploring and trying out ideas.
