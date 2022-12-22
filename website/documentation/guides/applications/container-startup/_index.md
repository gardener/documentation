---
title: Orchestration of Container Startup
description: "How to orchestrate a startup sequence of multiple containers"
level: beginner
category: Getting Started
scope: app-developer
---

## Disclaimer

If an application depends on other services deployed separately, do not rely on a certain start sequence of containers. Instead, 
ensure that the application can cope with unavailability of the services it depends on.

## Introduction
Kubernetes offers a feature called [InitContainers](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/) 
to perform some tasks during a pod's initialization.
In this tutorial, we demonstrate how to use `InitContainers` in order to orchestrate a starting sequence of multiple containers. 
The tutorial uses the example app [url-shortener](https://medium.com/@xcoulon/deploying-your-first-web-app-on-minikube-6e98d2884b3a), 
which consists of two components:

- postgresql database
- webapp which depends on the postgresql database and provides two endpoints: *create a short url from a given location* and *redirect from a given short URL to the corresponding target location*

This app represents the minimal example where an application relies on another service or database. In this example, 
if the application starts before the database is ready, the application will fail as shown below:

```bash
$ kubectl logs webapp-958cf5567-h247n
time="2018-06-12T11:02:42Z" level=info msg="Connecting to Postgres database using: host=`postgres:5432` dbname=`url_shortener_db` username=`user`\n"
time="2018-06-12T11:02:42Z" level=fatal msg="failed to start: failed to open connection to database: dial tcp: lookup postgres on 100.64.0.10:53: no such host\n"


$ kubectl get po -w
NAME                                READY     STATUS    RESTARTS   AGE
webapp-958cf5567-h247n   0/1       Pending   0         0s
webapp-958cf5567-h247n   0/1       Pending   0         0s
webapp-958cf5567-h247n   0/1       ContainerCreating   0         0s
webapp-958cf5567-h247n   0/1       ContainerCreating   0         1s
webapp-958cf5567-h247n   0/1       Error     0         2s
webapp-958cf5567-h247n   0/1       Error     1         3s
webapp-958cf5567-h247n   0/1       CrashLoopBackOff   1         4s
webapp-958cf5567-h247n   0/1       Error     2         18s
webapp-958cf5567-h247n   0/1       CrashLoopBackOff   2         29s
webapp-958cf5567-h247n   0/1       Error     3         43s
webapp-958cf5567-h247n   0/1       CrashLoopBackOff   3         56s

```

If the `restartPolicy` is set to `Always` (default) in the yaml file, the application will continue to restart the pod with an exponential back-off delay in case of failure.

## Using InitContaniner
To avoid such a situation, `InitContainers` can be defined, which are executed prior to the application container. If one 
of the `InitContainers` fails, the application container won't be triggered.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webapp
spec:
  selector:
    matchLabels:
      app: webapp
  template:
    metadata:
      labels:
        app: webapp
    spec:
      initContainers:  # check if DB is ready, and only continue when true
      - name: check-db-ready
        image: postgres:9.6.5
        command: ['sh', '-c',  'until pg_isready -h postgres -p 5432;  do echo waiting for database; sleep 2; done;']
      containers:
      - image: xcoulon/go-url-shortener:0.1.0
        name: go-url-shortener
        env:
        - name: POSTGRES_HOST
          value: postgres
        - name: POSTGRES_PORT
          value: "5432"
        - name: POSTGRES_DATABASE
          value: url_shortener_db
        - name: POSTGRES_USER
          value: user
        - name: POSTGRES_PASSWORD
          value: mysecretpassword
        ports:
        - containerPort: 8080
```

In the above example, the `InitContainers` use the docker image `postgres:9.6.5`, which is different from the application container.
This also brings the advantage of not having to include unnecessary tools (e.g. pg_isready) in the application container.

With introduction of `InitContainers`, in case the database is not available yet, the pod startup will look like similarly to:

```bash
$ kubectl get po -w
NAME                                READY     STATUS    RESTARTS   AGE
nginx-deployment-5cc79d6bfd-t9n8h   1/1       Running   0          5d
privileged-pod                      1/1       Running   0          4d
webapp-fdcb49cbc-4gs4n   0/1       Pending   0         0s
webapp-fdcb49cbc-4gs4n   0/1       Pending   0         0s
webapp-fdcb49cbc-4gs4n   0/1       Init:0/1   0         0s
webapp-fdcb49cbc-4gs4n   0/1       Init:0/1   0         1s


$ kubectl  logs webapp-fdcb49cbc-4gs4n
Error from server (BadRequest): container "go-url-shortener" in pod "webapp-fdcb49cbc-4gs4n" is waiting to start: PodInitializing
```