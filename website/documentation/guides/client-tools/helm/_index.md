---
title: Use a Helm Chart to Deploy an Application or Service
level: intermediate
category: Helm
scope: app-developer
---

## Overview

Basically, [Helm Charts](https://helm.sh/docs/topics/charts/) can be installed as described e.g. in the Helm 
[QuickStart Guide](https://helm.sh/docs/intro/quickstart/). However, our clusters come with 
[RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) enabled by default, hence Helm must be installed as follows:

## Create a Service Account
 
Create a service account via the following command:


```sh
cat <<EOF | kubectl create -f -
apiVersion: v1
kind: ServiceAccount
metadata:
 name: helm
 namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
 name: helm
roleRef:
 apiGroup: rbac.authorization.k8s.io
 kind: ClusterRole
 name: cluster-admin
subjects:
 - kind: ServiceAccount
   name: helm
   namespace: kube-system
EOF
```

## Initialize Helm 

Initialise Helm via ```helm init --service-account helm```. You can now use `helm`.

## In Case of Failure

In case you have already executed `helm init`, but without the above service account, you will get the following error:

`Error: User "system:serviceaccount:kube-system:default" cannot list configmaps in the namespace "kube-system". (get configmaps)` 
(e.g. when you run `helm list`). You will now need to delete the Tiller deployment (Helm backend 
implicitly deployed to the Kubernetes cluster when you call `helm init`) as well as the local Helm files (usually 
 `$HELM_HOME` is set to `~/.helm`):

```sh
kubectl delete deployment tiller-deploy --namespace=kube-system
kubectl delete service tiller-deploy --namespace=kube-system 
rm -rf ~/.helm/
```

Now follow the instructions above. For more details see this [Kubernetes Helm issue #2687](https://github.com/kubernetes/helm/issues/2687).