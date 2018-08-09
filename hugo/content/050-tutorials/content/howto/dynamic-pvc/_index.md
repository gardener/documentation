---
title: Dynamic Volume Provisioning
description: "How to dynamically provision volume"
type: tutorial-page
level: beginner
index: 30
category: Getting Started
scope: app-developer
---

## Introduction

This tutorial is complementary to guide ["Running postgres on Kubernetes"]({{ site.baseurl }}/doc/2017/01/16/app-postgres.html) which covers an end to end scenario from "provisioning persistent volume (PV)" by administrator
to "consuming PV with Persistent Volume Claim(PVC)" by developer.   However, administrators bear the burden of making calls to their cloud or storage provider to create new storage volumes, and then create PersistentVolume objects to represent them in Kubernetes.

In this tutorial dynamic provision is presented through an example to eliminate the administrative task of pre-provisioning storage.  The examples runs postgres database on K8S, and dynamic provisioning is used to provide storage for two seperate mount volumes.

## Run postgres database

A yaml file defines following resources on K8S:

- PersistentVolumeClaim (PVC)
- Deployment

#### PersistentVolumeClaim

```yaml
apiVersion: v1                      # pvc for postgredb-pvc
kind: PersistentVolumeClaim
metadata:
  name: postgresdb-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 9Gi
  storageClassName: 'default'
```

In above definition a pvc is created which uses storage class 'default'.  Storage class are essentially blueprints that abstract away the underlying storage provider, as well as other parameters, like disk-type (e.g.; solid-state vs standard disks).

The default storage class has annotation **{"storageclass.kubernetes.io/is-default-class":"true"}**.

```shell

$ kubectl describe sc default
Name:            default
IsDefaultClass:  Yes
Annotations:     kubectl.kubernetes.io/last-applied-configuration={"apiVersion":"storage.k8s.io/v1beta1","kind":"StorageClass","metadata":{"annotations":{"storageclass.kubernetes.io/is-default-class":"true"},"labels":{"addonmanager.kubernetes.io/mode":"Exists"},"name":"default","namespace":""},"parameters":{"type":"gp2"},"provisioner":"kubernetes.io/aws-ebs"}
,storageclass.kubernetes.io/is-default-class=true
Provisioner:           kubernetes.io/aws-ebs
Parameters:            type=gp2
AllowVolumeExpansion:  <unset>
MountOptions:          <none>
ReclaimPolicy:         Delete
VolumeBindingMode:     Immediate
Events:                <none>

```

A Persistent Volume is automatically created when it is dynamically provisioned. In following example, the PVC is defined as "postgresdb-pvc", and a pv "pvc-06c81c30-72ea-11e8-ada2-aa3b2329c8bb" is created and associated with pvc automatically.

```shell
$ kubectl create -f .\postgres_deployment.yaml
persistentvolumeclaim "postgresdb-pvc" created

$ kubectl get pv
NAME                                       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS    CLAIM                    STORAGECLASS   REASON    AGE
pvc-06c81c30-72ea-11e8-ada2-aa3b2329c8bb   9Gi        RWO            Delete           Bound     default/postgresdb-pvc   default                  3s

$ kubectl get pvc
NAME             STATUS    VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
postgresdb-pvc   Bound     pvc-06c81c30-72ea-11e8-ada2-aa3b2329c8bb   9Gi        RWO            default        8s
```

Notice that the **RECLAIM POLICY** is **Delete** (default value), which is one of the two reclaim policies, the other one being **Retain**. (A third policy **Recycle** has been deprecated).  In case of **Delete**, PV is deleted automatically when PVC is removed, and the data on the PVC will also be lost.
On the other hand, PV with **Retain** policy will not be deleted if PVC is removed, and moved to **Release** status, so that data can be recovered by Administrators later.

To change the reclaim policy, you can use `kubectl patch` command as described [here](https://kubernetes.io/docs/tasks/administer-cluster/change-pv-reclaim-policy/)
or use `kubectl edit pv <pv-name>` to edit online as below:

```yaml
$ kubectl get pv
NAME                                       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS    CLAIM                    STORAGECLASS   REASON    AGE
pvc-06c81c30-72ea-11e8-ada2-aa3b2329c8bb   9Gi        RWO            Delete           Bound     default/postgresdb-pvc   default                  44m

# change the relcaim policy from "Delete" to "Retain"
$ kubectl edit pv pvc-06c81c30-72ea-11e8-ada2-aa3b2329c8bb
persistentvolume "pvc-06c81c30-72ea-11e8-ada2-aa3b2329c8bb" edited

# check the reclaim policy afterwards
$ kubectl get pv
NAME                                       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS    CLAIM                    STORAGECLASS   REASON    AGE
pvc-06c81c30-72ea-11e8-ada2-aa3b2329c8bb   9Gi        RWO            Retain           Bound     default/postgresdb-pvc   default                  45m
```


#### Deployment

Once PVC is created, you can use it in your container via `volumes.persistentVolumeClaim.claimName`.   In below example, pvc **postgresdb-pvc** is mounted as readable and writable, and in `volumeMounts` two different paths in container are mounted to two subfolders: "data" and "logs".

```yaml
apiVersion: "extensions/v1beta1"    # deployment
kind: Deployment
metadata:
  name: postgres
  namespace: default
  labels:
    app: postgres
  annotations:
    deployment.kubernetes.io/revision: "1"
spec:
  replicas: 1
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      name: postgres
      labels:
        app: postgres
    spec:
      containers:
        - name: postgres
          image: "cpettech.docker.repositories.sap.ondemand.com/jtrack_postgres:howto"
          env:
            - name: POSTGRES_USER
              value: postgres
            - name: POSTGRES_PASSWORD
              value: p5FVqfuJFrM42cVX9muQXxrC3r8S9yn0zqWnFR6xCoPqxqVQ
            - name: POSTGRES_INITDB_XLOGDIR
              value: "/var/log/postgresql/logs"
          ports:
            - containerPort: 5432
          volumeMounts:
            - mountPath: /var/lib/postgresql/data
              name: postgre-db
              subPath: data     # https://github.com/kubernetes/website/pull/2292.  Solve the issue of crashing initdb due to non-empty directory (i.e. lost+found)
            - mountPath: /var/log/postgresql/logs
              name: postgre-db
              subPath: logs
      volumes:
        - name: postgre-db
          persistentVolumeClaim:
            claimName: postgresdb-pvc
            readOnly: false
      imagePullSecrets:
      - name: cpettechregistry

```

To check the mount points from within the container:

```shell
$ kubectl get po
NAME                        READY     STATUS    RESTARTS   AGE
postgres-7f485fd768-c5jf9   1/1       Running   0          32m

$ kubectl exec -it postgres-7f485fd768-c5jf9 bash

root@postgres-7f485fd768-c5jf9:/# ls /var/lib/postgresql/data/
base    pg_clog       pg_dynshmem  pg_ident.conf  pg_multixact  pg_replslot  pg_snapshots  pg_stat_tmp  pg_tblspc    PG_VERSION  postgresql.auto.conf  postmaster.opts
global  pg_commit_ts  pg_hba.conf  pg_logical     pg_notify     pg_serial    pg_stat       pg_subtrans  pg_twophase  pg_xlog     postgresql.conf       postmaster.pid

root@postgres-7f485fd768-c5jf9:/# ls /var/log/postgresql/logs/
000000010000000000000001  archive_status

```


#### Deleting PersistentVolumeClaim

In case of "Delete" policy, deleting PVC will also delete its associated PV.  If "Retain" is the reclaim policy, the PV will change to status from **Bound** to **Released** when pvc is deleted.

```shell
# Check pvc and pv before deletion
$ kubectl get pvc
NAME             STATUS    VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
postgresdb-pvc   Bound     pvc-06c81c30-72ea-11e8-ada2-aa3b2329c8bb   9Gi        RWO            default        50m

$ kubectl get pv
NAME                                       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS    CLAIM                    STORAGECLASS   REASON    AGE
pvc-06c81c30-72ea-11e8-ada2-aa3b2329c8bb   9Gi        RWO            Retain           Bound     default/postgresdb-pvc   default                  50m

# delete pvc
$ kubectl delete pvc postgresdb-pvc
persistentvolumeclaim "postgresdb-pvc" deleted

# pv changed to status "Released"
$ kubectl get pv
NAME                                       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS     CLAIM                    STORAGECLASS   REASON    AGE
pvc-06c81c30-72ea-11e8-ada2-aa3b2329c8bb   9Gi        RWO            Retain           Released   default/postgresdb-pvc   default                  51m
```