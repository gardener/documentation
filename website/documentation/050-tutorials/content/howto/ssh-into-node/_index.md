---
title: Connecting to a worker node using SSH
description: "Connecting to a worker node using SSH"
type: tutorial-page
level: advanced
index: 10
reviewer: Tieyan Fu
status: Reviewed
last_reviewed: 29.05.2018
category: Debugging
scope: app-developer
---

## Term clarification
We are talking about connection via SSH to a **node**, and not open a shell in an existing **pod** or rather **container**.  
For ways how to connect via SSH into **container** please check [official kubernetes tutorial](https://kubernetes.io/docs/tasks/debug-application-cluster/get-shell-running-container/)

## Why
When we hear this question, we respond with another question: "Why would you need to?". The background of this question 
is that all VMs are ephemeral (cattle, no pets). Any machine can be terminated any time. When updating a cluster, this 
will even happen to all machines (one by one). Anyway, sometimes curiosity is the driving factor and in this case, 
that's a good thing.


## How
create a new file `privileged-pod.yaml` with the content:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: privileged-pod
  namespace: default
spec:
  containers:
  - name: busybox
    image: busybox
    resources:
      limits:
        cpu: 200m
        memory: 100Mi
      requests:
        cpu: 100m
        memory: 50Mi
    stdin: true
    securityContext:
      privileged: true
    volumeMounts:
    - name: host-root-volume
      mountPath: /host
      readOnly: true
  volumes:
  - name: host-root-volume
    hostPath:
      path: /
  hostNetwork: true
  hostPID: true
  restartPolicy: Never
```

```bash
kubectl create -f privileged-pod.yaml
```

Now you can look around in the pod:

```bash
kubectl exec -ti privileged-pod sh
ps aux
ip a
ls -la /host
```

Run as root using the node's filesystem instead of the filesystem in the container running on the node:

```bash
chroot /host/
```

Then you can run commands such as `docker ps`

Don't forget to delete your pod afterwards:

```bash
kubectl delete pod privileged-pod
```
