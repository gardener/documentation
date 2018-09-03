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
The example shows how to run a postgres database on Kubernetes and how to dynamically provision and mount the storage 
volumes needed by the database

## Run postgres database
Define the following Kubernetes resources in a yaml file

- PersistentVolumeClaim (PVC)
- Deployment

#### PersistentVolumeClaim

```yaml
apiVersion: v1
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

This defines a PVC using storage class `default`.  Storage classes abstract from the underlying storage provider as well 
as other parameters, like disk-type (e.g.; solid-state vs standard disks).

The default storage class has annotation **{"storageclass.kubernetes.io/is-default-class":"true"}**.

```bash

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

A Persistent Volume is automatically created when it is dynamically provisioned. In following example, the PVC is defined 
as "postgresdb-pvc", and a corresponding PV "pvc-06c81c30-72ea-11e8-ada2-aa3b2329c8bb" is created and associated with pvc automatically.

```bash
$ kubectl create -f .\postgres_deployment.yaml
persistentvolumeclaim "postgresdb-pvc" created

$ kubectl get pv
NAME                                       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS    CLAIM                    STORAGECLASS   REASON    AGE
pvc-06c81c30-72ea-11e8-ada2-aa3b2329c8bb   9Gi        RWO            Delete           Bound     default/postgresdb-pvc   default                  3s

$ kubectl get pvc
NAME             STATUS    VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
postgresdb-pvc   Bound     pvc-06c81c30-72ea-11e8-ada2-aa3b2329c8bb   9Gi        RWO            default        8s
```

Notice that the **RECLAIM POLICY** is **Delete** (default value), which is one of the two reclaim policies, the other
one is **Retain**. (A third policy **Recycle** has been deprecated).  In case of **Delete**, the PV is deleted automatically 
when the PVC is removed, and the data on the PVC will also be lost.

On the other hand, PV with **Retain** policy will not be deleted when the PVC is removed, and moved to **Release** status, so 
that data can be recovered by Administrators later.

You can use the `kubectl patch` command to change the reclaim policy as described here [here](https://kubernetes.io/docs/tasks/administer-cluster/change-pv-reclaim-policy/)
or use `kubectl edit pv <pv-name>` to edit online as below:

```bash
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

Once a PVC is created, you can use it in your container via `volumes.persistentVolumeClaim.claimName`.   In below 
example, pvc **postgresdb-pvc** is mounted as readable and writable, and in `volumeMounts` two paths in the container are mounted to subfolders in the volume.

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

To check the mount points in the container:

```bash
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


#### Deleting a PersistentVolumeClaim

In case of "Delete" policy, deleting a PVC will also delete its associated PV.  If "Retain" is the reclaim policy, the 
PV will change status from **Bound** to **Released** when PVC is deleted.

```bash
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