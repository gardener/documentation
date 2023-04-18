---
title: Specifying a Disruption Budget for Kubernetes Controllers
level: beginner
index: 10
category: Getting Started
scope: app-developer
featured: true
publishdate: 2022-06-21
---

## Introduction of Disruptions
We need to understand that some kind of voluntary disruptions can happen to pods.
For example, they can be caused by cluster administrators who want to perform automated cluster actions, like upgrading and autoscaling clusters.
Typical application owner actions include:
  - deleting the deployment or other controller that manages the pod
  - updating a deployment's pod template causing a restart
  - directly deleting a pod (e.g., by accident)

## Setup Pod Disruption Budgets

Kubernetes offers a feature called PodDisruptionBudget (PDB) for each application.
A PDB limits the number of pods of a replicated application that are down simultaneously from voluntary disruptions.

The most common use case is when you want to protect an application specified by one of the built-in Kubernetes controllers:
  - Deployment
  - ReplicationController
  - ReplicaSet
  - StatefulSet

A PodDisruptionBudget has three fields:

  - A label selector `.spec.selector` to specify the set of pods to which it applies.
  - `.spec.minAvailable` which is a description of the number of pods from that set that must still be available after the eviction, even in the absence of the evicted pod. minAvailable can be either an absolute number or a percentage.
  - `.spec.maxUnavailable` which is a description of the number of pods from that set that can be unavailable after the eviction. It can be either an absolute number or a percentage.

## Cluster Upgrade or Node Deletion Failed due to PDB Violation:
Misconfiguration of the PDB could block the cluster upgrade or node deletion processes. There are two main cases that can cause a misconfiguration.

### Case 1: The replica of Kubernetes controllers is 1
  - Only 1 replica is running: there is no `replicaCount` setup  or `replicaCount` for the Kubernetes controllers is set to 1
  - PDB configuration
    ```
      spec:
        minAvailable: 1
     ```
  - To fix this PDB misconfiguration, you need to change the value of `replicaCount` for the Kubernetes controllers to a number greater than 1

### Case 2: HPA configuration violates PDB

In Kubernetes, a HorizontalPodAutoscaler automatically updates a workload resource (such as a Deployment or StatefulSet), with the aim of automatically scaling the workload to match demand.
The HorizontalPodAutoscaler manages the replicas field of the Kubernetes controllers.
  - There is no `replicaCount` setup or `replicaCount` for the Kubernetes controllers is set to 1
  - PDB configuration
      ```
        spec:
          minAvailable: 1
      ```
  - HPA configuration
      ```
        spec:
          minReplicas: 1
      ```
  - To fix this PDB misconfiguration, you need to change the value of HPA `minReplicas` to be greater than 1

## Related Links
- [Specifying a Disruption Budget for Your Application](https://kubernetes.io/docs/tasks/run-application/configure-pdb/)
- [Horizontal Pod Autoscaling](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)