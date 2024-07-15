---
title: Container Image Not Pulled
description: "Wrong Container Image or Invalid Registry Permissions"
level: beginner
reviewer: Tieyan Fu
last_reviewed: 22.06.2018
category: Fails
scope: app-developer
---

## Problem
Two of the most common causes of this problems are specifying the wrong container image or trying to use private images without providing registry credentials.

{{% alert color="info"  title="Note" %}}
There is no observable difference in pod status between a missing image and incorrect registry permissions. 
In either case, Kubernetes will report an `ErrImagePull` status for the pods. For this reason, this article deals with 
both scenarios.
{{% /alert %}}

## Example
Let's see an example. We'll create a pod named *fail*, referencing a non-existent Docker image:

```sh
kubectl run -i --tty fail --image=tutum/curl:1.123456
```

The command doesn't return and you can terminate the process with `Ctrl+C`.

## Error Analysis

We can then inspect our pods and see that we have one pod with a status of **ErrImagePull** or **ImagePullBackOff**.

```sh
$ (minikube) kubectl get pods
NAME                      READY     STATUS         RESTARTS   AGE
client-5b65b6c866-cs4ch   1/1       Running        1          1m
fail-6667d7685d-7v6w8     0/1       ErrImagePull   0          <invalid>
vuejs-578574b75f-5x98z    1/1       Running        0          1d
$ (minikube) 

```

For some additional information, we can `describe` the failing pod.

```sh 
kubectl describe pod fail-6667d7685d-7v6w8
```

As you can see in the events section, your image can't be pulled:

```
Name:		fail-6667d7685d-7v6w8
Namespace:	default
Node:		minikube/192.168.64.10
Start Time:	Wed, 22 Nov 2017 10:01:59 +0100
Labels:		pod-template-hash=2223832418
		run=fail
Annotations:	kubernetes.io/created-by={"kind":"SerializedReference","apiVersion":"v1","reference":{"kind":"ReplicaSet","namespace":"default","name":"fail-6667d7685d","uid":"cc4ccb3f-cf63-11e7-afca-4a7a1fa05b3f","a...
.
.
.
.
Events:
  FirstSeen	LastSeen	Count	From			SubObjectPath		Type		Reason			Message
  ---------	--------	-----	----			-------------		--------	------			-------
  1m		1m		1	default-scheduler				Normal		Scheduled		Successfully assigned fail-6667d7685d-7v6w8 to minikube
  1m		1m		1	kubelet, minikube				Normal		SuccessfulMountVolume	MountVolume.SetUp succeeded for volume "default-token-9fr6r" 
  1m		6s		4	kubelet, minikube	spec.containers{fail}	Normal		Pulling			pulling image "tutum/curl:1.123456"
  1m		5s		4	kubelet, minikube	spec.containers{fail}	Warning		Failed			Failed to pull image "tutum/curl:1.123456": rpc error: code = Unknown desc = Error response from daemon: manifest for tutum/curl:1.123456 not found
  1m		<invalid>	10	kubelet, minikube				Warning		FailedSync		Error syncing pod
  1m		<invalid>	6	kubelet, minikube	spec.containers{fail}	Normal		BackOff			Back-off pulling image "tutum/curl:1.123456"
```  
  
**Why couldn't Kubernetes pull the image?**
There are three primary candidates besides network connectivity issues:
 - The image tag is incorrect
 - The image doesn't exist
 - Kubernetes doesn't have permissions to pull that image

If you don't notice a typo in your image tag, then it's time to test using your local machine. I usually start by 
running **docker pull on my local development machine** with the exact same image tag. In this case, I would 
run `docker pull tutum/curl:1.123456`.

If this succeeds, then it probably means that Kubernetes doesn't have the correct permissions to pull that image. 

Add the docker registry user/pwd to your cluster:

```sh
kubectl create secret docker-registry dockersecret --docker-server=https://index.docker.io/v1/ --docker-username=<username> --docker-password=<password> --docker-email=<email>
```

If the exact image tag fails, then I will test without an explicit image tag:

```sh
docker pull tutum/curl
``` 
This command will attempt to pull the latest tag. If this succeeds, then that means the originally specified tag doesn't exist. Go to the Docker registry and check which tags are available for this image.

If `docker pull tutum/curl` (without an exact tag) fails, then we have a bigger problem - that image does not exist at all in our image registry.