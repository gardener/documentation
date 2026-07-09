---
github_repo: 'https://github.com/gardener/etcd-druid'
github_subdir: docs/usage
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/other-components/etcd-druid/using-druid-client.md
  to: using-druid-client.md
persona: Users
title: Using Druid Client
prev: false
next: false
managed: true
---

# Using Druid Golang Client

Etcd Druid provides a generated typed Golang client which can be used to invoke CRUD operations on [Etcd](https://github.com/gardener/etcd-druid/blob/master/api/core/v1alpha1/etcd.go#L56) and [EtcdCopyBackupsTask](https://github.com/gardener/etcd-druid/blob/master/api/core/v1alpha1/etcdcopybackupstask.go#L20) custom resources.

A simple [example](https://github.com/gardener/etcd-druid/blob/master/examples/client) is provided to demonstrate how an [Etcd](https://github.com/gardener/etcd-druid/blob/master/api/core/v1alpha1/etcd.go#L56) resource can be created using [client](https://github.com/gardener/etcd-druid/blob/master/client) package.

To run the example ensure that you have the following setup:

* Follow the [Getting Started Guide](/docs/other-components/etcd-druid/deployment/getting-started-locally/getting-started-locally/) to set up a [KIND](https://kind.sigs.k8s.io/) cluster and deploy `etcd-druid` operator.
* Run the example:
  
  ```bash
  go run examples/client/main.go
  ```

You should see the following output:

```term
INFO Successfully created Etcd cluster Etcd=default/etcd-test
```

You can further list the resources that are created for an `Etcd` cluster.
See [this document](/docs/other-components/etcd-druid/concepts/etcd-cluster-components/) for information on all resources created for an `Etcd` cluster.
