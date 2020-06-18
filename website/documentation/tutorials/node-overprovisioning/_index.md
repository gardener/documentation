---
title: Cluster Overprovisioning
description: How to overprovision cluster nodes for quick scaling and failover
type: docs
layout: single-page
remote: https://github.com/gardener-samples/kube-overprovisioning.git
level: beginner
category: High Availability
scope: app-developer
aliases: ["/readmore/overprovisioning", "/050-tutorials/content/app/node-overprovisioning"]
---
# Cluster Overprovisioning

This tutorial describes how to overprovisioning of cluster nodes for scaling and failover. This is desired 
when you have work loads that need to scale up quickly without waiting for the new cluster nodes to be created 
and join the cluster.

![teaser](https://raw.githubusercontent.com/gardener-samples/kube-overprovisioning/master/images/teaser.png?raw=true)

A similar problem occurs when crashing a node from the Hyperscaler. This must be replaced by Kubernetes as fast 
as possible. The solution can be **overprovisioning** of nodes

> Overprovisioning: Allocating more computer resources than is strictly necessary 
> 
>   *https://en.wikipedia.org/wiki/Overprovisioning*

## When does the autoscaler change the size of the cluster?
Below is a description of how the cluster behaves when there is a requirement to scale. 

### Scaling without overprovisioning

 1. load hits the cluster (or a node is crashed)
 1. cannot schedule application-pods due to insufficient resources, scaling fails 💀
 1. cluster-autoscaler notices and begins to provision new instance
 1. wait for instance to be provisioned, boot, join the cluster and become ready
 1. kube-scheduler will notice there is somewhere to put the application-pods and will schedule them

### Scaling with Overprovisioning

 1. load hits the cluster (or a node is crashed)
 1. *placeholder-pods* are evicted, 
 1. **scaling of application-pod is immediately successful**
 1. placeholder-pods cannot be scheduled due to insufficient resources
 1. wait for instance to be provisioned, boot, join the cluster and become ready
 1. kube-scheduler will notice there is somewhere to put the placeholder pods and will schedule them

You can apply the above scenario one-to-one to the case when a node of the Hyperscaler dies.

## Real Scenario Test
We executed *normal* and *overprovisioning* tests on a gardener cluster on different infrastructure provider (aws, azure, gcp, 
alicloud). All of them tested the downtime of the application pod running in the cluster, when a node dies.

The test results for the different IaaS provider are shown below.

## Results
The results provided should only show how long the downtimes can be approximately.
> *The downtime results could vary +- 1 min, because the minimum request interval in UpTime is 1 minute*  

## <img src="https://raw.githubusercontent.com/gardener-samples/kube-overprovisioning/master/images/logos/aws.png?raw=true" class="inline" style="display: inline-block;margin:0;height:30px"> Amazon

### Normal
![chart](https://raw.githubusercontent.com/gardener-samples/kube-overprovisioning/master/images/result/normal/aws.png?raw=true)

### Overprovisioning
![chart](https://raw.githubusercontent.com/gardener-samples/kube-overprovisioning/master/images/result/overprovision/aws.png?raw=true)

## <img src="https://raw.githubusercontent.com/gardener-samples/kube-overprovisioning/master/images/logos/azure.png?raw=true" class="inline" style="display: inline-block;margin:0;height:30px"> Azure
### Normal
![chart](https://raw.githubusercontent.com/gardener-samples/kube-overprovisioning/master/images/result/normal/azure.png?raw=true)

### Overprovisioning
![chart](https://raw.githubusercontent.com/gardener-samples/kube-overprovisioning/master/images/result/overprovision/azure.png?raw=true)

## <img src="https://raw.githubusercontent.com/gardener-samples/kube-overprovisioning/master/images/logos/gcp.png?raw=true" class="inline" style="display: inline-block;margin:0;height:30px"> GCP
### Normal
![chart](https://raw.githubusercontent.com/gardener-samples/kube-overprovisioning/master/images/result/normal/gcp.png?raw=true)

### Overprovisioning
![chart](https://raw.githubusercontent.com/gardener-samples/kube-overprovisioning/master/images/result/overprovision/gcp.png?raw=true)

## <img src="https://raw.githubusercontent.com/gardener-samples/kube-overprovisioning/master/images/logos/alicloud.png?raw=true" class="inline" style="display: inline-block;margin:0;height:30px"> AliCloud
### Normal
![chart](https://raw.githubusercontent.com/gardener-samples/kube-overprovisioning/master/images/result/normal/alicloud.png?raw=true)

### Overprovisioning
![chart](https://raw.githubusercontent.com/gardener-samples/kube-overprovisioning/master/images/result/overprovision/alicloud.png?raw=true)


## Summary of results

### Normal

| Provider        | AWS       | Azure     | GCP       | AliCloud  |
|-----------------|-----------|-----------|-----------|-----------|
| Node deleted    | 08:56     | 09:32     | 09:39     | 09:53     | 
| Pod rescheduled | 09:17     | 09:50     | 09:53     | 10:14     |
| **Downtime**    | 21 min    | 18 min    | 14 min    | 21 min    |

### Overprovisioning

| Provider         | AWS       | Azure     | GCP       | AliCloud  |
|-----------------------------------|-----------|-----------|-----------|-----------|
| Node deleted     | 14:20     | 06:00     | 06:05     | 08:23     |
| Pod rescheduled  | 14:22     | 06:02     | 06:06     | 08:25     |
| **Downtime**     | 2 min     | 2 min     | 1 min     | 2 min     |

## Test Description
We deployed a nginx web server and a service of type LoadBalancer to expose it. So we are able to call our 
endpoint with external tools like UpTime to check the availability of our nginx. It takes only a few seconds 
to deploy a nginx web server on kubernetes, so we could say: when your endpoint works, your node is up and running.

We wanted to test how much time it takes, when your node gets killed and your cluster has to create a new one to run 
your application on it.

``` 
kubectl get nodes

# select the node where your nginx is running on
kubectl delete node <NGINX-HOSTED-NODE>
```

The downtime is tested with UpTime, which does every minute a request to our endpoint. Further we checked manually, 
if the node startup time and the timestamps on UpTime are almost similar.  

Next, deploy the **overprovisioned** version of our demo application and kill the node with the NGINX.
As you can see - the pod comes up very fast and can serve content again.


