---
title: Custom Seccomp Profile
level: advanced
category: Security
scope: operator
---

## Overview

[Seccomp](https://en.wikipedia.org/wiki/Seccomp) (secure computing mode) is a security facility in the Linux kernel for restricting the set of system calls applications can make.

Starting from Kubernetes v1.3.0, the Seccomp feature is in `Alpha`. To configure it on a `Pod`, the following annotations can be used:

- `seccomp.security.alpha.kubernetes.io/pod: <seccomp-profile>` where `<seccomp-profile>` is the seccomp profile to apply to all containers in a `Pod`.
- `container.seccomp.security.alpha.kubernetes.io/<container-name>: <seccomp-profile>` where `<seccomp-profile>` is the seccomp profile to apply to `<container-name>` in a `Pod`.

More details can be found in the `PodSecurityPolicy` [documentation](https://kubernetes.io/docs/concepts/policy/pod-security-policy/#seccomp).

## Installation of a Custom Profile

By default, kubelet loads custom Seccomp profiles from `/var/lib/kubelet/seccomp/`. There are two ways in which Seccomp profiles can be added to a `Node`:

- to be baked in the machine image
- to be added at runtime

This guide focuses on creating those profiles via a `DaemonSet`.

Create a file called `seccomp-profile.yaml` with the following content:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: seccomp-profile
  namespace: kube-system
data:
  my-profile.json: |
    {
      "defaultAction": "SCMP_ACT_ALLOW",
      "syscalls": [
        {
          "name": "chmod",
          "action": "SCMP_ACT_ERRNO"
        }
      ]
    }
```

{{% alert color="info"  title="Note" %}}
The policy above is a very simple one and not suitable for complex applications. The [default docker profile](https://github.com/moby/moby/blob/v17.05.0-ce/profiles/seccomp/default.json) can be used a reference. Feel free to modify it to your needs.
{{% /alert %}}

Apply the `ConfigMap` in your cluster:

```console
$ kubectl apply -f seccomp-profile.yaml
configmap/seccomp-profile created
```

The next steps is to create the `DaemonSet` Seccomp installer. It's going to copy the policy from above in `/var/lib/kubelet/seccomp/my-profile.json`.

Create a file called `seccomp-installer.yaml` with the following content:

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: seccomp
  namespace: kube-system
  labels:
    security: seccomp
spec:
  selector:
    matchLabels:
      security: seccomp
  template:
    metadata:
      labels:
        security: seccomp
    spec:
      initContainers:
      - name: installer
        image: alpine:3.10.0
        command: ["/bin/sh", "-c", "cp -r -L /seccomp/*.json /host/seccomp/"]
        volumeMounts:
        - name: profiles
          mountPath: /seccomp
        - name: hostseccomp
          mountPath: /host/seccomp
          readOnly: false
      containers:
      - name: pause
        image: k8s.gcr.io/pause:3.1
      terminationGracePeriodSeconds: 5
      volumes:
      - name: hostseccomp
        hostPath:
          path: /var/lib/kubelet/seccomp
      - name: profiles
        configMap:
          name: seccomp-profile
```

Create the installer and wait until it's ready on all `Nodes`:

```console
$ kubectl apply -f seccomp-installer.yaml
daemonset.apps/seccomp-installer created

$ kubectl -n kube-system get pods -l security=seccomp
NAME                      READY   STATUS    RESTARTS   AGE
seccomp-installer-wjbxq   1/1     Running   0          21s
```

## Create a Pod Using a Custom Seccomp Profile

Finally, we want to create a profile which uses our new Seccomp profile `my-profile.json`.

Create a file called `my-seccomp-pod.yaml` with the following content:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: seccomp-app
  namespace: default
  annotations:
    seccomp.security.alpha.kubernetes.io/pod: "localhost/my-profile.json"
    # you can specify seccomp profile per container. If you add another profile you can configure
    # it for a specific container - 'pause' in this case.
    # container.seccomp.security.alpha.kubernetes.io/pause: "localhost/some-other-profile.json"
spec:
  containers:
  - name: pause
    image: k8s.gcr.io/pause:3.1
```

Create the `Pod` and see that it's running:

```console
$ kubectl apply -f my-seccomp-pod.yaml
pod/seccomp-app created

$ kubectl get pod seccomp-app
NAME         READY   STATUS    RESTARTS   AGE
seccomp-app  1/1     Running   0          42s
```

## Throubleshooting

If an invalid or a non-existing profile is used, then the `Pod` will be stuck in `ContainerCreating` phase:

`broken-seccomp-pod.yaml`:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: broken-seccomp
  namespace: default
  annotations:
    seccomp.security.alpha.kubernetes.io/pod: "localhost/not-existing-profile.json"
spec:
  containers:
  - name: pause
    image: k8s.gcr.io/pause:3.1
```

```console
$ kubectl apply -f broken-seccomp-pod.yaml
pod/broken-seccomp created

$ kubectl get pod broken-seccomp
NAME            READY   STATUS              RESTARTS   AGE
broken-seccomp  1/1     ContainerCreating   0          2m

$ kubectl describe pod broken-seccomp
Name:               broken-seccomp
Namespace:          default
....
Events:
  Type     Reason                  Age               From                     Message
  ----     ------                  ----              ----                     -------
  Normal   Scheduled               18s               default-scheduler        Successfully assigned kube-system/broken-seccomp to docker-desktop
  Warning  FailedCreatePodSandBox  4s (x2 over 18s)  kubelet, docker-desktop  Failed create pod sandbox: rpc error: code = Unknown desc = failed to make sandbox docker config for pod "broken-seccomp": failed to generate sandbox security options
for sandbox "broken-seccomp": failed to generate seccomp security options for container: cannot load seccomp profile "/var/lib/kubelet/seccomp/not-existing-profile.json": open /var/lib/kubelet/seccomp/not-existing-profile.json: no such file or directory
```

## Related Links

- [Seccomp](https://en.wikipedia.org/wiki/Seccomp)
- [A Seccomp Overview](https://lwn.net/Articles/656307/)
- [Seccomp Security Profiles for Docker](https://docs.docker.com/engine/security/seccomp)
- [Using Seccomp to Limit the Kernel Attack Surface](https://man7.org/conf/lpc2015/limiting_kernel_attack_surface_with_seccomp-LPC_2015-Kerrisk.pdf)
