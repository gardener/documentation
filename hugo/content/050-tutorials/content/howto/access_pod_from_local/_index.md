---
title:  Access a port of a pod locally
level: beginner
index: 100
type: tutorial-page
reviewer: Tieyan Fu
status: Reviewed
last_reviewed: 30.05.2018
category: Debugging
scope: app-developer
---


## Question
You deployed an application with a web UI or an internal endpoint in your Kubernetes (K8s) cluster.  How could I access 
this endpoint **without an external load balancer** (e.g. Ingress)?
This tutorial presents two options:

- Using Kubernetes port forward
- Using Kubernetes apiserver proxy

Please note that the options described here are mostly for quick testing or troublshoot your application. For enabling access to your application for productive environment, please refer to [Access my service](2017-01-16-howto-service-access.md)

## Solution 1: Using Kubernetes port forward
You could use the port forwarding functionality of `kubectl` to access the pods from your 
local host __without involving a service__.

To access any pod follow these steps:
-   Run `kubectl get pods`
-   Note down the name of the pod in question as `<your-pod-name>`
-   Run `kubectl port-forward <your-pod-name> <local-port>:<your-app-port>`
-   Run a web browser or curl locally and enter the URL `http(s)://localhost:<local-port>`

In addition, `kubectl port-forward` allows using resource name, such as deployment name, service name, to select a matching pod to port forward.
More details in the [Kubernetes documentation](https://kubernetes.io/docs/tasks/access-application-cluster/port-forward-access-application-cluster/).

The main drawback of this approach is that the pods name changes as soon as it is restarted. Moreover, you need 
to have a web browser on your client and you need to make sure that the local port is not already used by an 
application running on your system. Finally, sometimes the port forwarding is canceled due to non obvious reasons. 
This leads to a kind of shaky approach. A more stable possibility is based on
accessing the app via the kube-proxy, which accesses the corresponding service.

![port-forward](howto-port-forward.svg)


## Solution 2: Using the apiserver proxy of your K8S cluster

There are several different proxies when using Kubernetes, [the official documentation](https://kubernetes.io/docs/concepts/cluster-administration/proxies/) provides a good overview.

In this tutorial we are using apiserver proxy to enable accessing services in your cluster without Ingress. __Different from the first solution, a service is required for the second solution__ .

Use following format to compose URL accessing your service through existing proxy on K8S cluster. For a detailed discussion of the format please refer to [official documentation](https://kubernetes.io/docs/tasks/access-application-cluster/access-cluster/#discovering-builtin-services)


`https://<your-cluster-master>/api/v1/namespace/<your-namespace>/services/<your-service>:<your-service-port>/proxy/<service-endpoint>`

**Example:**

| your-cluster-master  | your-namespace           | your-service  | your-service-port  | your-service-endpoint  | url to access service  |
| ------------------|:--------------------: | -----------:| ----------------:| ----------------:| ----------------:|
| api.testclstr.cpet.k8s.sapcloud.io     | default | nginx-svc     |  80                |   /           |  [url](http://api.testclstr.cpet.k8s.sapcloud.io/api/v1/namespaces/default/services/nginx-svc:80/proxy/)
| api.testclstr.cpet.k8s.sapcloud.io     | default | docker-nodejs-svc |  4500          |   /cpu?baseNumber=4 | [url](https://api.testclstr.cpet.k8s.sapcloud.io/api/v1/namespaces/default/services/docker-nodejs-svc:4500/proxy/cpu?baseNumber=4)

There are applications, which do __not__ yet support relative URLs like [Prometheus](https://github.com/prometheus/prometheus/issues/1583) (as of end of November, 2017).
This typically leads to missing JavaScript objects as it could be investigated with your browsers development tools. In this case please use the 
`port-forward` approach described above.
