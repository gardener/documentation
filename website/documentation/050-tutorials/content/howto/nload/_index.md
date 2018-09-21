---
title: Network Monitor for Nodes
description: "How to monitor the network traffic for a dedicated node"
type: tutorial-page
level: intermediate
index: 10
category: Debugging
scope: app-developer
---
## Intro

**nload** is a linux tool which monitors network traffic and bandwidth usage in 
real time. It visualizes the in- and outgoing traffic on the terminal using two graphs and 
provides additional info like the total amount of transfered data and min/max network usage. 

We generate a docker container to monitor the traffic of a *Node* within your Kubernetes cluster


## Why
Why use such a simple tool when there are excellent monitoring solutions like **Grafana** or 
**Prometheus** out there? It would be overkill to install and Grafana for a quick debug session.

Sometimes the little helpers can make life easier.

But on the long run you are right: [grafana](https://grafana.com/) or [prometheus](https://prometheus.io/) should be the
tool of choice for monitoring your cluster.


## #!/bin/bash

**Install the DaemonSet into your cluster.**

``` 
kubectl create -f https://github.wdf.sap.corp/raw/d023280/kube-nload/master/yaml/deamonset.yaml
```

**Get the Pods.**

Remember that, because of the DaemenSet, every node in Kubernetes 
has a nload pod running.


```
bash$> kubectl get pods

    NAME                          READY     STATUS    RESTARTS   AGE
    nload-cxdxj                   1/1       Running   0          4s
    nload-gxzjc                   1/1       Running   0          4s
    nload-m485v                   1/1       Running   0          4s
    nload-tfpnw                   1/1       Running   0          4s
    nload-x8bnj                   1/1       Running   0          4s
    privileged-pod                1/1       Running   0          4h
    tts-server-79584868b6-d44ll   1/1       Running   0          3d
    tts-server-79584868b6-kqlsl   1/1       Running   1          3d
    tts-server-79584868b6-vqb4g   1/1       Running   0          3h
    wrk-64d6db6d85-gphv5          1/1       Running   0          9d
    wrk-64d6db6d85-rqht9          1/1       Running   0          9d
    wrk-64d6db6d85-szr8n          1/1       Running   0          9d

```

**Get into a Pod.**

Get into any pod to monitor the traffic of the related **Node**! and not the **Pod**.
The reason for this is that we use a privileged pod which has access to the host.

``` 
bash$> kubectl exec -ti nload-cxdxj bash
```

and monitor the `eth0` network device

``` 
$> nload eth0 
```

## Recording

![nload](howto-nload.gif)

## Sources
Feel free to clone the repo: [https://github.wdf.sap.corp/d023280/kube-nload](https://github.wdf.sap.corp/d023280/kube-nload)
