---
title: Automated deployment
description: "Automated deployment via kubectl"
type: tutorial-page
level: advanced
index: 500
category: CI/CD
scope: app-developer
---

## Introduction
With kubectl you can easily deploy an image from your local environment.

However, what if you want to use a automated deployment script on a CI server (e.g. Jenkins), but don't want to store 
the KUBECONFIG on that server?

You can use kubectl and connect to the API-server of your cluster.

## Prerequisites
1. Create a service account user

  ```
  kubectl create serviceaccount deploy-user -n default
  ```

2. Bind a role to the new created serviceuser
>!!! warning !!! "In this example the preconfigured role \"edit\" and the namespace \"default\" is being used, please adjust the role to a more strict scope! see https://kubernetes.io/docs/admin/authorization/rbac/"<

   ```
   kubectl create rolebinding deploy-default-role --clusterrole=edit --serviceaccount=default:deploy-user --namespace=default
```

3. Get the url of your API-server

   ```
    APISERVER=$(kubectl config view | grep server | cut -f 2- -d ":" | tr -d " ")
   ```


4. get the SERVICEACCOUNT
   ```
   SERVICEACCOUNT=$(kubectl get serviceaccount deploy-user -n default -o json | jq -r .secrets[0].name)
   ```

5. Generate a TOKEN for the serviceaccount
  ```
  TOKEN=$(kubectl get secret -n default $SERVICEACCOUNT  -o json | jq -r .data.token | base64 -D)
  ```

## Usage
You can deploy your app without having the KUBECONFIG set locally, you just need to pass the environment variables (e.g. store them in the Jenkins credentials store)
  ```
  kubectl --server=${APIServer} --token=${TOKEN} --insecure-skip-tls-verify=true apply --filename myapp.yaml
  ```
