---
title: Manually adding node to an existing cluster
description: "Manually adding node to an existing cluster"
type: tutorial-page
level: advanced
index: 10
reviewer: Gaurav Gupta
status: 
last_reviewed: 
category: Operation
scope: app-developer
---

## Term clarification
Here we will look at steps on how to add a node to an existing cluster without the support of Gardener. Such a node will not be managed by Gardener, and if it goes down for any reason, Gardener will not be responsible to replace it.

## How
1. Create a new instance in the same VPC/network as other machines in the cluster. You should be able to ssh into the machine. So save its private key, and assign public IP to it. If adding public IP is not preferred, then ssh into any other machine in the cluster, and then ssh into the new machine using its private key.

   To ssh into machine which is alreay in the cluster, use steps defined [here](https://github.wdf.sap.corp/pages/kubernetes/gardener/015-tutorials/content/howto/ssh-into-node/ "ssh-into-node").

   Also, while creating the new machine, attach same IAM role to it as that attached to existing machines in the cluster. This is required by kubelet in the new machine to get its information from the cloud provider.

1. In the new machine, create file `/var/lib/kubelet/kubeconfig-bootstrap` with below content:

```yaml
apiVersion: v1
kind: Config
current-context: kubelet-bootstrap@default
clusters:
- cluster:
    certificate-authority-data: $CA_CRT
    server: $SERVER
  name: default
contexts:
- context:
    cluster: default
    user: kubelet-bootstrap
  name: kubelet-bootstrap@default
users:
- name: kubelet-bootstrap
  user:
    as-user-extra: {}
    token: $TOKEN
```

3. ssh into an existing node, and run below commands to get values of $CA_CRT and $SERVER to be replaced in above file:
- $SERVER
```bash
 /opt/bin/hyperkube kubectl --kubeconfig /var/lib/kubelet/kubeconfig-real config view -o go-template='{{index .clusters 0 "cluster" "server"}}' --raw
 ```
- $CA_CRT
```bash
/opt/bin/hyperkube kubectl --kubeconfig /var/lib/kubelet/kubeconfig-real config view -o go-template='{{index .clusters 0 "cluster" "certificate-authority-data"}}' --raw
```

4. $TOKEN\
  A bootstrap token needs to be constructed which can be used by kubelet in the new machine to add itself to the cluster. To do this, find the latest secret with the name format `bootstrap-token-*` in the `kube-system` namespace in the cluster. Eg. `bootstrap-token-abcdef`.\
  Run below commands to get the token:
   ```bash
    tokenid=$(kubectl get secret bootstrap-token-abcdef -n kube-system -o go-template='{{index .data "token-id"}}' | base64 --decode)

    tokensecret=$(kubectl get secret bootstrap-token-abcdef -n kube-system -o go-template='{{index .data "token-secret"}}' | base64 --decode)

    echo $tokenid.$tokensecret
   ```
   The value of $TOKEN will be `tokenid.tokensecret`. Replace $TOKEN in above file with this value.

5. Copy contents of `/var/lib/kubelet/config/kubelet` and `/var/lib/kubelet/ca.crt` and `/etc/systemd/system/kubelet.service` from old node to new node

6. Run below command in the new node:
```bash
systemctl enable kubelet && systemctl start kubelet
```

The new node should be added to existing cluster within couple of minutes.
