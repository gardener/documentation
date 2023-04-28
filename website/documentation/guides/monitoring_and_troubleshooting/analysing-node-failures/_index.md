---
title: Analyzing Node Removal and Failures
description: "Utilize Gardener's Monitoring and Logging to analyze removal and failures of nodes"
level: intermediate
category: Debugging
scope: operator
---

## Overview
Sometimes operators want to find out why a certain node got removed. This guide helps to identify possible causes.
There are a few potential reasons why nodes can be removed:
- [broken node](#find-out-whether-the-node-was-unhealthy): a node becomes unhealthy and machine-controller-manager terminates it in an attempt to replace the unhealthy node with a new one
- [scale-down](#scale-down): cluster-autoscaler sees that a node is under-utilized and therefore scales down a worker pool
- [node rolling](#node-rolling): configuration changes to a worker pool (or cluster) require all nodes of one or all worker pools to be rolled and thus all nodes to be replaced. Some possible changes are: 
  - the K8s/OS version
  - changing machine types

Helpful information can be obtained by using the logging stack. See [Logging Stack](https://github.com/gardener/gardener/blob/master/docs/usage/logging.md) for how to utilize the logging information in Gardener.

## Find Out Whether the Node Was `unhealthy`
### Check the Node Events
A good first indication on what happened to a node can be obtained from the node's events. Events are scraped and ingested into the logging system, so they can be found in the explore tab of Grafana (make sure to select `loki` as datasource) with a query like `{job="event-logging"} | unpack | object="Node/<node-name>"` or find any event mentioning the node in question via a broader query like `{job="event-logging"}|="<node-name>"`.

A potential result might reveal
```
{"_entry":"Node ip-10-55-138-185.eu-central-1.compute.internal status is now: NodeNotReady","count":1,"firstTimestamp":"2023-04-05T12:02:08Z","lastTimestamp":"2023-04-05T12:02:08Z","namespace":"default","object":"Node/ip-10-55-138-185.eu-central-1.compute.internal","origin":"shoot","reason":"NodeNotReady","source":"node-controller","type":"Normal"}
```

### Check machine-controller-manager Logs
If a node was getting unhealthy, the last conditions can be found in the logs of the `machine-controller-manager` by using a query like `{pod_name=~"machine-controller-manager.*"}|="<node-name>"`.

**Caveat**: every `node` resource is backed by a corresponding `machine` resource managed by machine-controller-manager. Usually two corresponding `node` and `machine` resources have the same name with the exception of AWS. Here you first need to find with the above query the corresponding `machine` name, typically via a log like this
```
2023-04-05 12:02:08	{"log":"Conditions of Machine \"shoot--demo--cluster-pool-z1-6dffc-jh4z4\" with providerID \"aws:///eu-central-1/i-0a6ad1ca4c2e615dc\" and backing node \"ip-10-55-138-185.eu-central-1.compute.internal\" are changing","pid":"1","severity":"INFO","source":"machine_util.go:629"}
```
This reveals that `node` `ip-10-55-138-185.eu-central-1.compute.internal` is backed by `machine` `shoot--demo--cluster-pool-z1-6dffc-jh4z4`. On infrastructures other than AWS you can omit this step.

With the machine name at hand, now search for log entries with `{pod_name=~"machine-controller-manager.*"}|="<machine-name>"`.
In case the node had failing conditions, you'd find logs like this:
```
2023-04-05 12:02:08	{"log":"Machine shoot--demo--cluster-pool-z1-6dffc-jh4z4 is unhealthy - changing MachineState to Unknown. Node conditions: [{Type:ClusterNetworkProblem Status:False LastHeartbeatTime:2023-04-05 11:58:39 +0000 UTC LastTransitionTime:2023-03-23 11:59:29 +0000 UTC Reason:NoNetworkProblems Message:no cluster network problems} ... {Type:Ready Status:Unknown LastHeartbeatTime:2023-04-05 11:55:27 +0000 UTC LastTransitionTime:2023-04-05 12:02:07 +0000 UTC Reason:NodeStatusUnknown Message:Kubelet stopped posting node status.}]","pid":"1","severity":"WARN","source":"machine_util.go:637"}
```

In the example above, the reason for an unhealthy node was that `kubelet` failed to renew its heartbeat. Typical reasons would be either a broken VM (that couldn't execute `kubelet` anymore) or a broken network. Note that some VM terminations performed by the infrastructure provider are actually expected (e.g., [scheduled events on AWS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/monitoring-instances-status-check_sched.html))

In both cases, the infrastructure provider might be able to provide more information on particular VM or network failures.

Whatever the failure condition might have been, if a node gets unhealthy, it will be terminated by `machine-controller-manager` after the `machineHealthTimeout` has elapsed (this parameter can be configured in your [shoot spec](https://github.com/gardener/gardener/blob/v1.68.0/example/90-shoot.yaml#L132)).

### Check the Node Logs
For each `node` the kernel and `kubelet` logs, as well as a few others, are scraped and can be queried with this query `{nodename="<node-name>"}`
This might reveal OS specific issues or, in the absence of any logs (e.g., after the node went unhealthy), might indicate a network disruption or sudden VM termination. Note that some VM terminations performed by the infrastructure provider are actually expected (e.g., [scheduled events on AWS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/monitoring-instances-status-check_sched.html)).

Infrastructure providers might be able to provide more information on particular VM failures in such cases.

### Check the Network Problem Detector Dashboard
If your Gardener installation utilizes [gardener-extension-shoot-networking-problemdetector](https://github.com/gardener/gardener-extension-shoot-networking-problemdetector), you can check the dashboard named "Network Problem Detector" in Grafana for hints on network issues on the node of interest.

## Scale-Down 
In general, scale-downs are managed by the [cluster-autoscaler](https://github.com/gardener/autoscaler), its logs can be found with the query `{container_name="cluster-autoscaler"}`.
Attempts to remove a node can be found with the query `{container_name="cluster-autoscaler"}|="Scale-down: removing empty node"`

If a scale-down has caused disruptions in your workload, consider protecting your workload by adding `PodDisruptionBudgets` (see the [autoscaler FAQ](https://github.com/gardener/autoscaler/blob/master/cluster-autoscaler/FAQ.md#what-types-of-pods-can-prevent-ca-from-removing-a-node) for more options).

## Node Rolling
Node rolling can be caused by ,e.g.:
- change of the K8s minor version of the cluster or a worker pool
- change of the OS version of the cluster or a worker pool
- change of the disk size/type or machine size/type of a worker pool
- change of node labels

Changes like the above are done by altering the shoot specification and thus are recorded in the external auditlog system that is configured for the garden cluster.