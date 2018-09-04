---
title: How to debug a pod
description: "Your pod doesn't run as expected. Are there any log files? Where? How could I debug a pod?"
type: tutorial-page
level: intermediate
index: 500
reviewer: Tieyan Fu
status: Reviewed
last_reviewed: 19.06.2018
category: Debugging
scope: app-developer
---

## Introduction

Kubernetes offers powerful options to get more details about startup or runtime failures of pods as e.g. described in 
[Application Introspection and Debugging](https://kubernetes.io/docs/tasks/debug-application-cluster/debug-application-introspection/) 
or [Debug Pods and Replication Controllers](https://kubernetes.io/docs/tasks/debug-application-cluster/debug-pod-replication-controller/).

In order to identify pods with potential issus you could e.g. run `kubectl get pods --all-namespaces | grep -iv Running ` to filter 
out the pods which are not in the state `Running`. One of frequent error state is `CrashLoopBackOff`, which tells that 
a pod crashes right after the start. Kubernetes then tries to restart the pod, but often the pod startup fails again.

**Here is a short list of possible reasons which might lead to a pod crash:**

1. error during image pull caused by e.g. wrong/missing secrets or wrong/missing image
1. the app runs in an error state caused e.g. by missing environmental variables (ConfigMaps) or secrets
1. liveness probe failed
1. too high resource consumption (memory and/or CPU) or too strict quota settings
1. persistent volumes can't be created/mounted
1. the container image is not updated


Basically, the commands `kubectl logs ...` and `kubectl describe ...` with additional parameters are used to get more 
detailed information. By calling e.g. `kubectl logs --help` you get more detailed information about the command and its 
parameters.

In the next sections you'll find some basic approaches to get some ideas what went wrong.

Remarks:   
- Even if the pods seem to be running as the status `Running` indicates, a high counter of the `Restarts` shows potential problems
- There is as well an [interactive Tutorial Troubleshooting with Kubectl](https://kubernetes.io/docs/tutorials/kubernetes-basics/explore-intro/) 
available which explains basic debugging activities
- The examples below are deployed into the namespace `default`. In case you want to change it use the optional 
parameter `--namespace <your-namespace>` to select the target namespace. They require Kubernetes release &ge; _1.8_.

## Prerequisites
Your deployment was successful (no logical/syntactical errors in the manifest files), but the pod(s) aren't running.

## Error caused by wrong image name
You run `kubectl describe pod <your-pod> <your-namespace>` to get detailed information about the pod startup. 

In the `Events` section, you get an error message like `Failed to pull image ...` and `Reason: Failed`. The pod is 
in state `ImagePullBackOff`.

The example below is based on [demo in Kubernetes documentation](https://kubernetes.io/docs/tasks/debug-application-cluster/determine-reason-pod-failure/). In all examples the `default` namespace is used.

First, cleanup  with  

```bash
kubectl delete pod termination-demo
```
    
Next, create a resource based on the yaml content below

```yaml
apiVersion: v1
kind: Pod 
metadata:
  name: termination-demo
spec:
  containers:
  - name: termination-demo-container
    image: debiann
    command: ["/bin/sh"]
    args: ["-c", "sleep 10 && echo Sleep expired > /dev/termination-log"]
```

`kubectl describe pod termination-demo` lists the following content in the `Event` section


```bash
Events:
  FirstSeen	LastSeen	Count	From							SubObjectPath					Type		Reason			Message
  ---------	--------	-----	----							-------------					--------	------			-------
  2m		2m		1	default-scheduler											Normal		Scheduled		Successfully assigned termination-demo to ip-10-250-17-112.eu-west-1.compute.internal
  2m		2m		1	kubelet, ip-10-250-17-112.eu-west-1.compute.internal							Normal		SuccessfulMountVolume	MountVolume.SetUp succeeded for volume "default-token-sgccm" 
  2m		1m		4	kubelet, ip-10-250-17-112.eu-west-1.compute.internal	spec.containers{termination-demo-container}	Normal		Pulling			pulling image "debiann"
  2m		1m		4	kubelet, ip-10-250-17-112.eu-west-1.compute.internal	spec.containers{termination-demo-container}	Warning		Failed			Failed to pull image "debiann": rpc error: code = Unknown desc = Error: image library/debiann:latest not found
  2m		54s		10	kubelet, ip-10-250-17-112.eu-west-1.compute.internal							Warning		FailedSync		Error syncing pod
  2m		54s		6	kubelet, ip-10-250-17-112.eu-west-1.compute.internal	spec.containers{termination-demo-container}	Normal		BackOff			Back-off pulling image "debiann"
  ```
The error message with `Reason: Failed` tells that there is an error during pulling the image. A closer look at the 
image name indicates a misspelling.



## App runs in an error state caused by missing ConfigMaps or Secrets

This example illustrates the behavior in case of the app expecting environment variables but the corresponding 
Kubernetes artifacts are missing.

First, cleanup  with  

```yaml
kubectl delete deployment termination-demo
kubectl delete configmaps app-env
```

Next, deploy this manifest 

```yaml
apiVersion: apps/v1beta2 
kind: Deployment
metadata:
  name: termination-demo
  labels:
     app: termination-demo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: termination-demo
  template:
    metadata:
      labels:
        app: termination-demo
    spec:
      containers:
      - name: termination-demo-container
        image: debian
        command: ["/bin/sh"]
        args: ["-c", "sed \"s/foo/bar/\" < $MYFILE"]
```            
Now, the command `kubectl get pods` lists the pod `termination-demo-xxx` in the state `Error` or `CrashLoopBackOff`. 
The command `kubectl describe pod termination-demo-xxx` tells that there is no error during startup but gives no clue
 about what caused the crash.

```bash
Events:
  FirstSeen	LastSeen	Count	From							SubObjectPath					Type		Reason		Message
  ---------	--------	-----	----							-------------					--------	------		-------
  19m		19m		1	default-scheduler											Normal		Scheduled	Successfully assigned termination-demo-5fb484867d-xz2x9 to ip-10-250-17-112.eu-west-1.compute.internal
  19m		19m		1	kubelet, ip-10-250-17-112.eu-west-1.compute.internal							Normal		SuccessfulMountVolume	MountVolume.SetUp succeeded for volume "default-token-sgccm" 
  19m		19m		4	kubelet, ip-10-250-17-112.eu-west-1.compute.internal	spec.containers{termination-demo-container}	Normal		Pulling		pulling image "debian"
  19m		19m		4	kubelet, ip-10-250-17-112.eu-west-1.compute.internal	spec.containers{termination-demo-container}	Normal		Pulled		Successfully pulled image "debian"
  19m		19m		4	kubelet, ip-10-250-17-112.eu-west-1.compute.internal	spec.containers{termination-demo-container}	Normal		Created		Created container
  19m		19m		4	kubelet, ip-10-250-17-112.eu-west-1.compute.internal	spec.containers{termination-demo-container}	Normal		Started		Started container
  19m		14m		24	kubelet, ip-10-250-17-112.eu-west-1.compute.internal	spec.containers{termination-demo-container}	Warning		BackOff		Back-off restarting failed container
  19m		4m		69	kubelet, ip-10-250-17-112.eu-west-1.compute.internal							Warning		FailedSync	Error syncing pod
  ```
The command `kubectl get logs termination-demo-xxx` gives access to the output, the application writes on stderr and 
stdout. In this case, you get an output like

```bash
/bin/sh: 1: cannot open : No such file
```

So you need to have a closer look at the application. In this case the environmental variable `MYFILE`is missing. To fix this
issue you could e.g. add a ConfigMap to your deployment as it is shown in the  manifest listed below.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-env
data:
  MYFILE: "/etc/profile"
---
apiVersion: apps/v1beta2 
kind: Deployment
metadata:
  name: termination-demo
  labels:
     app: termination-demo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: termination-demo
  template:
    metadata:
      labels:
        app: termination-demo
    spec:
      containers:
      - name: termination-demo-container
        image: debian
        command: ["/bin/sh"]
        args: ["-c", "sed \"s/foo/bar/\" < $MYFILE"]
        envFrom:
        - configMapRef:
            name: app-env 
```

Note that once you fix the error and re-run the scenario, you might still see the pod in `CrashLoopBackOff` status.
It is because the container finishes the command `sed ...` and runs to completion.  In order to keep the container in `Running` status,
a long running task is required, e.g.

```ymal
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-env
data:
  MYFILE: "/etc/profile"
  SLEEP: "5"
---
apiVersion: apps/v1beta2
kind: Deployment
metadata:
  name: termination-demo
  labels:
     app: termination-demo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: termination-demo
  template:
    metadata:
      labels:
        app: termination-demo
    spec:
      containers:
      - name: termination-demo-container
        image: debian
        command: ["/bin/sh"]
        # args: ["-c", "sed \"s/foo/bar/\" < $MYFILE"]
        args: ["-c", "while true; do sleep $SLEEP; echo sleeping; done;"]
        envFrom:
        - configMapRef:
            name: app-env
```


## Too high resource consumption or too strict quota settings

You can optionally specify the amount of memory and/or CPU your container gets during runtime. In case these settings are missing, 
the default requests settings are taken: CPU: 0m (in Milli CPU) and RAM: 0Gi which indicate no other limits than the 
ones of the node(s) itself. Find more details in [Configure Default Memory Requests and 
Limits for a Namespace](https://kubernetes.io/docs/tasks/administer-cluster/memory-default-namespace/),

In case your application needs more resources, Kubernetes distinguishes between `requests` and `limit` settings: `requests` 
specify the guaranteed amount of resource, whereas `limit` tells Kubernetes the maximum amount of resource the container might 
need.  Mathematically both settings could be described by the relation `0 <= requests <= limit`. For both settings you need to 
consider the total amount of resources the available nodes provide. For a detailed description of the concept see [Resource Quality of 
Service in Kubernetes](https://github.com/kubernetes/community/blob/master/contributors/design-proposals/node/resource-qos.md).

Use `kubectl describe nodes` to get a first overview of the resource consumption of your cluster. Of special interest are the 
figures indicating the amount of CPU and Memory Requests at the bottom of the output.

The next example demonstrates what happens in case the CPU request is too high in order to be managed by your cluster.

First, cleanup  with  

```yaml
kubectl delete deployment termination-demo
kubectl delete configmaps app-env
```

Next, adapt the `cpu` in the yaml below to be slightly higher than the remaining cpu resources in your cluster and deploy 
this manifest. In this example `600m` (milli CPUs) are requested in a Kubernetes system with a single 2 Core worker 
node which results in an error message. 

```yaml
apiVersion: apps/v1beta2 
kind: Deployment
metadata:
  name: termination-demo
  labels:
     app: termination-demo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: termination-demo
  template:
    metadata:
      labels:
        app: termination-demo
    spec:
      containers:
      - name: termination-demo-container
        image: debian
        command: ["/bin/sh"]
        args: ["-c", "sleep 10 && echo Sleep expired > /dev/termination-log"]
        resources:
          requests:
            cpu: "600m" 
```

The command `kubectl get pods` lists the pod `termination-demo-xxx` in the state `Pending`. More details on why this happens
could be found by using the command `kubectl describe pod termination-demo-xxx`:

```bash
$ kubectl describe po termination-demo-fdb7bb7d9-mzvfw
Name:           termination-demo-fdb7bb7d9-mzvfw
Namespace:      default
...
Containers:
  termination-demo-container:
    Image:      debian
    Port:       <none>
    Host Port:  <none>
    Command:
      /bin/sh
    Args:
      -c
      sleep 10 && echo Sleep expired > /dev/termination-log
    Requests:
      cpu:        6
    Environment:  <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-t549m (ro)
Conditions:
  Type           Status
  PodScheduled   False
Events:
  Type     Reason            Age               From               Message
  ----     ------            ----              ----               -------
  Warning  FailedScheduling  9s (x7 over 40s)  default-scheduler  0/2 nodes are available: 2 Insufficient cpu.
```


More details in 
-   [Managing Compute Resources for Containters](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/)
-   [Resource Quality of Service in Kubernetes](https://github.com/kubernetes/community/blob/master/contributors/design-proposals/node/resource-qos.md)


Remark:   
-   This example works similarly when specifying a too high request for memory
-   In case you configured an autoscaler range when creating your Kubernetes cluster another worker node will be started automatically if you didn't reach the maximum number of worker nodes
-   If your app is running out of memory (the memory settings are too small), you typically find `OOMKilled` (Out Of Memory) message in the `Events` section fo the `kubectl describe pod ...` output


## Why was the container image not updated?

You applied a fix in your app, created a new container image and pushed it into your container repository. After 
redeploying your Kubernetes manifests you expected to get the updated app, but still the same bug is in the new 
deployment present.

This behavior is related to how Kubernetes decides whether to pull a new docker image or to use the cached one. 

In case you didn't change the image tag, the default image policy _IfNotPresent_ tells Kubernetes to use the cached 
image (see [Images](https://kubernetes.io/docs/concepts/containers/images/)). 

As a best practice you should not use the tag `latest` and change the image tag whenever you changed anything in your 
image (see [Configuration Best Practices](https://kubernetes.io/docs/concepts/configuration/overview/#container-images)).

Find more details in [FAQ Container Image not updating](/howto/imagePullPolicy)

      

## Links
-   [Application Introspection and Debugging](https://kubernetes.io/docs/tasks/debug-application-cluster/debug-application-introspection/)
-   [Debug Pods and Replication Controllers](https://kubernetes.io/docs/tasks/debug-application-cluster/debug-pod-replication-controller/)
-   [Logging Architecture](https://kubernetes.io/docs/concepts/cluster-administration/logging/)
-   [Configure Default Memory Requests and Limits for a Namespace](https://kubernetes.io/docs/tasks/administer-cluster/memory-default-namespace/)
-   [Managing Compute Resources for Containters](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/)
-   [Resource Quality of Service in Kubernetes](https://github.com/kubernetes/community/blob/master/contributors/design-proposals/node/resource-qos.md)
-   [Interactive Tutorial Troubleshooting with Kubectl](https://kubernetes.io/docs/tutorials/kubernetes-basics/explore-intro/)
-   [Images](https://kubernetes.io/docs/concepts/containers/images/)
-   [Kubernetes Best Practises](https://kubernetes.io/docs/concepts/configuration/overview/#container-images)
