---
title: Access a Port of a Pod Locally
level: beginner
reviewer: Tieyan Fu
status: Reviewed
last_reviewed: 30.05.2018
category: Debugging
scope: app-developer
---

## Question
You have deployed an application with a web UI or an internal endpoint in your Kubernetes (K8s) cluster. How to access this endpoint **without an external load balancer** (e.g. Ingress)?

This tutorial presents two options:

- Using Kubernetes port forward
- Using Kubernetes apiserver proxy

Please note that the options described here are mostly for quick testing or troubleshooting your application. For enabling access to your application for productive environment, please refer to the [official Kubernetes documentation](https://kubernetes.io/docs/concepts/services-networking/service/).

## Solution 1: Using Kubernetes port forward
You could use the port forwarding functionality of `kubectl` to access the pods from your local host **without involving a service**.

To access any pod follow these steps:
1. Run `kubectl get pods`
2. Note down the name of the pod in question as `<your-pod-name>`
3. Run `kubectl port-forward <your-pod-name> <local-port>:<your-app-port>`
4. Run a web browser or curl locally and enter the URL: `http(s)://localhost:<local-port>`

In addition, `kubectl port-forward` allows using a resource name, such as a deployment name or service name, to select a matching pod to port forward.
More details can be found in the [Kubernetes documentation](https://kubernetes.io/docs/tasks/access-application-cluster/port-forward-access-application-cluster/).

The main drawback of this approach is that the pod's name changes as soon as it is restarted. Moreover, you need to have a web browser on your client and you need to make sure that the local port is not already used by an application running on your system. Finally, sometimes the port forwarding is canceled due to nonobvious reasons. This leads to a kind of shaky approach. A more stable possibility is based on accessing the app via the kube-proxy, which accesses the corresponding service.

![port-forward](./images/howto-port-forward.svg)


## Solution 2: Using the apiserver proxy of Your Kubernetes Cluster

There are [several different proxies](https://kubernetes.io/docs/concepts/cluster-administration/proxies/) in Kubernetes. In this tutorial we will be using *apiserver proxy* to enable the access to the services in your cluster without Ingress. **Unlike the first solution, here a service is required.**

Use the following format to compose a URL for accessing your service through an existing proxy on the Kubernetes cluster:

`https://<your-cluster-master>/api/v1/namespace/<your-namespace>/services/<your-service>:<your-service-port>/proxy/<service-endpoint>`

**Example:**

| your-main-cluster  | your-namespace | your-service  | your-service-port  | your-service-endpoint  | url to access service  |
| ------------------|:--------------------: | -----------:| ----------------:| ----------------:| ----------------:|
| api.testclstr.cpet.k8s.sapcloud.io     | default | nginx-svc     |  80                |   /           | `http://api.testclstr.cpet.k8s.sapcloud.io/api/v1/namespaces/default/services/nginx-svc:80/proxy/` |
| api.testclstr.cpet.k8s.sapcloud.io     | default | docker-nodejs-svc |  4500          |   /cpu?baseNumber=4 | `https://api.testclstr.cpet.k8s.sapcloud.io/api/v1/namespaces/default/services/docker-nodejs-svc:4500/proxy/cpu?baseNumber=4` |

For more details on the format, please refer to the [official Kubernetes documentation](https://kubernetes.io/docs/tasks/access-application-cluster/access-cluster/#discovering-builtin-services).

{{% alert color="info"  title="Note" %}}
There are applications which do not support relative URLs yet, e.g. [Prometheus](https://github.com/prometheus/prometheus/issues/1583) (as of November, 2022).
This typically leads to missing JavaScript objects, which could be investigated with your browser's development tools. If such an issue occurs, please use the `port-forward` approach [described above](#solution-1-using-kubernetes-port-forward).
{{% /alert %}}