---
title: SSH into my worker nodes
description: "SSH into my worker nodes"
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
We are talking about SSH into a **node**, and not open a shell in an existing **pod** or rather **container**.  For ways to SSH into **conatiner** please check [official kubernetes tutorial](https://kubernetes.io/docs/tasks/debug-application-cluster/get-shell-running-container/)

## Why
When we hear this question, we return with another question: "Why would you need to?". The background of this question 
is that all VMs are ephemeral (cattle, no pets). Any machine can be terminated any time. When updating a cluster, this 
will even happen to all machines (one by one). Anyway, sometimes curiosity is the driving factor and in this case, 
that's a good thing.


## How

We plan to implement [bastion-on-demand/web-console](https://github.com/gardener/dashboard/issues/10) eventually, but 
it is not yet available. The next best alternative is to create a pod with elevated permissions by doing the following:

create a new file `privileged-pod.yaml` with the content below

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

```sh
kubectl create -f privileged-pod.yaml
```

Now you can look around in the pod:
```sh
kubectl exec -ti privileged-pod sh
ps aux
ip a
ls -la /host
```

Run as root using node's file system instead of container's:
```sh
chroot /host/
```
Then you can run commands such as `docker ps`

Don't forget to delete your pod afterwards:
```sh
kubectl delete pod privileged-pod
```
