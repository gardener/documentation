---
title: Create a kubernetes cluster on GCP with Gardener
type: docs
level: beginner
category: Getting Started
scope: app-developer
aliases: ["/050-tutorials/content/howto/gardener_gcp"]
---

## Introduction
Creating a Kubernetes cluster in the GCP Account is easy and the Gardener UI should be self-explanatory.

# Gardener
## Create a new Project in Gardener

[Create new Project](https://dashboard.garden.canary.k8s.ondemand.com/login)

<img src="new_gardener_project.jpg">


## Check which roles are required by the Gardener
<img src="gardenergcpsecret1.jpg">

<img src="gardenergcpsecret2.jpg">

# GCP

## Create a new serviceaccount and assign roles
[Create a new serviceaccount](https://console.cloud.google.com/iam-admin/serviceaccounts)

<img src="gcpcreateserviceaccount0.jpg">

<img src="gcpcreateserviceaccount1.jpg">

## Create key for the serviceaccount

<img src="gcpcreatekey.jpg">

## Download the key of the serviceaccount as json
<img src="gcpdownloadkey.jpg">

save the keys of the user, you will need it later on

## Enable the Google compute API
[Enable the Google compute API](https://console.developers.google.com/apis/library/compute.googleapis.com)
<img src="gcpcomputeengineapi.jpg">


## Enable the Google IAM API
[Enable the Google IAM API](https://console.developers.google.com/apis/api/iam.googleapis.com/overview)
<img src="gcpiamapi.jpg">

# Gardener
## Add GCP Secret
<img src="gardeneraddgcpsecret.jpg">


## Create a new Cluster
[Create a new cluster](https://dashboard.garden.canary.k8s.ondemand.com)

<img src="new_cluster.jpg">

<img src="gcpcreatecluster1.jpg">

<img src="gcpcreatecluster2.jpg">

<img src="create_cluster4.jpg">

<img src="gcpcreatecluster2.jpg">


## Copy kubeconfig
<img src="copy_kubeconfig.jpg">
