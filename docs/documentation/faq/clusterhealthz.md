---
title: How can you get the status of a shoot API server?
---

There are two ways to get the health information of a shoot API server.
 
- Try to reach the public endpoint of the shoot API server via 
`"https://api.<shoot-name>.<project-name>.shoot.<canary|office|live>.k8s-hana.ondemand.com/healthz"`

The endpoint is secured, therefore you need to authenticate via basic auth or client cert. Both are available in the admin kubeconfig of the shoot cluster. Note that with those credentials you have full (admin) access to the cluster, therefore it is highly recommended to create custom credentials with some RBAC rules and bindings which only allow access to the /healthz endpoint.

- Fetch the shoot resource of your cluster via the programmatic API of the Gardener and get the availability information from the status. 
You need a kubeconfig for the Garden cluster, which you can get via the Gardener dashboard. Then you could fetch your shoot resource and query for the availability information via:

```sh

kubectl get shoot <shoot-name> -o json | jq -r '.status.conditions[] | select(.type=="APIServerAvailable")'

```

The availability information in the second scenario is collected by the Gardener. If you want to collect the information independently from Gardener, you should choose the first scenario.

If you want to archive a simple pull monitor in the AvS for a shoot cluster, you also need to use the first scenario, because with it you have a stable endpoint for the API server which you can query.