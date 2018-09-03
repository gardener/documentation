---
title: Create a kubernetes cluster in AWS with Gardener
description: "How to create a Kubernetes Cluster with Gardener in AWS"
type: tutorial-page
level: beginner
index: 30
category: Getting Started
reviewer:
status:
last_reviewed:
scope: app-developer
---

## Introduction
Creating a Kubernetes cluster in an AWS Account is easy and the Gardener UI should be self-explanatory/.

# Gardener
## Create a new Project in Gardener

[Create new Project](https://dashboard.garden.canary.k8s.ondemand.com/login)

<img src="new_gardener_project.jpg">


## Copy policy from the Gardener

<img src="gardener_copy_policy.jpg">

# AWS

## Create new policy
[Create new policy](https://console.aws.amazon.com/iam/home?#/policies)

<img src="create_policy.jpg">

<img src="review_policy.jpg">

## Create a new technical user
[Create a new technical user](https://console.aws.amazon.com/iam/home?#/users$new?step=details)

<img src="adduser.jpg">

<img src="attachpolicy.jpg">

<img src="finishuser.jpg">
save the keys of the user, you will need them later on


<img src="savekeys.jpg">

# Gardener
## Add AWS Secret
<img src="add_AWS_Secret.jpg">

<img src="secret_stored.jpg">

## Create a new Cluster
[Create a new cluster](https://dashboard.garden.canary.k8s.ondemand.com)

<img src="new_cluster.jpg">

<img src="create_cluster2.jpg">

<img src="create_cluster3.jpg">

<img src="create_cluster4.jpg">

<img src="create_cluster5.jpg">


## Copy kubeconfig
<img src="copy_kubeconfig.jpg">
