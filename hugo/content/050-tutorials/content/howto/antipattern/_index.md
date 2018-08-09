---
title: Kubernetes Antipattern
description: "Common Antipattern for Kubernetes and Docker"
type: tutorial-page
level: beginner
index: 5
reviewer: Tieyan Fu
status: In Review
last_reviewed: 12.06.2018
category: Getting Started
scope: app-developer
aliases: ["readmore/antipattern"]
---

![antipattern](howto-antipattern.png)

This HowTo will cover common kubernetes anti-patterns that we have seen over the past months.


## Running as root user.
Whenever possible, do not run containers as root users. One could be 
tempted to say that Kubernetes Pods and Node are well separated. The host and the container 
share the same kernel. If the container is compromised, a root user can damage the underlying 
node. 

Check out the very good presentation of Liz Rice at the KubeCon 2018
<iframe width="560" height="315" src="https://www.youtube.com/embed/ltrV-Qmh3oY" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Use `RUN groupadd -r anygroup && useradd -r -g anygroup myuser` to create a group
and a user in it. Use the `USER` command to switch to this user.  Note that you can also consider providing
[an explicit UID/GID](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#user) if required.  Following is an example:

```
ARG GF_UID="500"
ARG GF_GID="500"

# add group & user
RUN groupadd -r -g $GF_GID appgroup && \
   useradd appuser -r -u $GF_UID -g appgroup

USER appuser

```

## Data or logs in containers
Containers are ideal for stateless applications 
and should be transient. This means that no data or logs should be stored in the 
container, as they are lost when the container is closed. If absolutely necessary, 
you can use persistence volumes instead to persist them outside the containers. 
Using ELK stack could be another options for storing and processing log files.

## Using the IP addresses of the pod
Each pod is assigned an IP address. It is necessary 
for pods to communicate with each other to build an application, e.g. an application 
must communicate with a database. Existing pods are terminated and new pods are 
constantly started. If you rely on the IP address of the pod/container, the application 
configuration must be constantly updated. This makes the application fragile. Create 
services instead. These form a logical name that can be assigned independently of the 
growing and shrinking number of containers. Services are the basic concept for the load 
balancing within Kubernetes.

## More than one process in a container
A docker file provides a `CMD` and `ENTRYPOINT` to 
start the image. `CMD` is often used around a script that makes a configuration and then 
starts the container. Do not try to start multiple processes with this script. It is 
important to consider the separation of concerns when creating docker images. This makes 
managing your containers, collecting logs and updating each process all the more difficult. 
You can split the image into multiple containers and manage them independently - even in one pod. 
It should also be borne in mind that Kubernetes only monitors the process with PID=1. If more than 
one process is started within a container, then these no longer fall under the control of Kubernetes.


## Images from a running container
A new image can be created with the `docker commit` 
command. This is useful if changes have been made to the container and you want to persist 
them for later error analysis. However, the images created with it are not reproducible and 
completely worthless for a CI/CD environment. Furthermore, another developer cannot recognize 
which components the image contains. Instead, always make changes to the docker file, close 
existing containers and start a new container with the updated image.

## Passwords in Docker Image  💀
Do not save passwords in the Docker file. They are in plain 
text and are checked into a repository. That makes them completely vulnerable even if you are using
a private repository like the Artifactory. 
Always use [Secrets or ConfigMaps](https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure)
to set up your deployment environment or mount passwords as persistent volumes.

## Using the 'latest' tag
Starting an image with *tomcat* is tempting. If no tags are specified, a container is 
started with the tomcat:latest image.  This image may no longer be up to date and refers to an 
older version instead. Running a production application requires complete control of the environment 
with exact versions of the image.  Make sure you always use a tag or even better the **sha256 hash** 
of the image e.g. `tomcat@sha256:c34ce3c1fcc0c7431e1392cc3abd0dfe2192ffea1898d5250f199d3ac8d8720f`. 
Why use the sha256 hash? TAGs are volatile and can be overwritten by a developer at any time. In this case 
you don't have complete control over your image - which is bad.

## Different images per environment
Don't create different images for development, testing, staging 
and production environments. The image should be the **source of truth** and should only be created once 
and pushed to the repository. This image:tag should be used for different environments in the future. 


## Start order of pods
Applications often depend on containers being started in a certain order. 
For example, a database container must be up and running before an application can connect to it. The application 
should be resilient to such changes, as the db pod can be unreachable or restarted at any time. The 
application container should be able to handle such situations without terminating or crash itself immediately. A
good pattern here is to configure ["readiness probe"](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/) accordingly and tell Kubernetes that the app pod is not
operable at the moment. [InitContainers](https://github.wdf.sap.corp/pages/kubernetes/gardener/doc/2018/06/11/howto-orchestration-containers-startup.html) can be used to control the start sequence if dependency exist among multiple pods

## Additional anti-patterns and patterns...
In the community vast experience have been collected to improve stability and usability of Docker and Kubernetes.
Instead of copy & past the content, please refer to following links in recognition of respective work.
- [Kubernetes Production Patterns](https://github.com/gravitational/workshop/blob/master/k8sprod.md)