---
title: Kubernetes Antipatterns
description: "Common antipatterns for Kubernetes and Docker"
level: beginner
reviewer: Tieyan Fu
last_reviewed: 12.06.2018
category: Getting Started
scope: app-developer
---

![antipattern](./images/howto-antipattern.png)

This HowTo covers common Kubernetes antipatterns that we have seen over the past months.


## Running as Root User
Whenever possible, do not run containers as root user. One could be tempted to say that Kubernetes pods and nodes are well separated. Host and containers running on it share the same kernel. If a container is compromised, the root user in the container has full control over the 
underlying node.

Watch the very good presentation by Liz Rice at the KubeCon 2018
<iframe width="560" height="315" src="https://www.youtube.com/embed/ltrV-Qmh3oY" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Use `RUN groupadd -r anygroup && useradd -r -g anygroup myuser` to create a group and add a user to it. Use the `USER` command to switch to this user.  Note that you may also consider to provide [an explicit UID/GID](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#user) if required. 

For example:

```
ARG GF_UID="500"
ARG GF_GID="500"

# add group & user
RUN groupadd -r -g $GF_GID appgroup && \
   useradd appuser -r -u $GF_UID -g appgroup

USER appuser

```

## Store Data or Logs in Containers
Containers are ideal for stateless applications and should be transient. This means that no data or logs should be stored in the 
container, as they are lost when the container is closed. Use persistence volumes instead to persist data outside
of containers. Using an [ELK stack](https://www.elastic.co/de/what-is/elk-stack) is another good option for storing and processing logs.

## Using Pod IP Addresses
Each pod is assigned an IP address. It is necessary for pods to communicate with each other to build an application, e.g. an application 
must communicate with a database. Existing pods are terminated and new pods are constantly started. If you would rely on the IP address of a pod or container, you would need to update the application configuration constantly. This makes the application fragile. 

Create services instead. They provide a logical name that can be assigned independently of the varying number and IP addresses of containers. Services are the basic concept for load balancing within Kubernetes.

## More Than One Process in a Container
A docker file provides a `CMD` and `ENTRYPOINT` to start the image. `CMD` is often used around a script that makes a configuration and then 
starts the container. Do not try to start multiple processes with this script. It is important to consider the separation of concerns when creating docker images. Running multiple processes in a single pod makes managing your containers, collecting logs and updating each process more difficult. 

You can split the image into multiple containers and manage them independently - even in one pod. Bear in mind that Kubernetes only monitors the process with `PID=1`. If more than one process is started within a container, then these no longer fall under the control of Kubernetes.

## Creating Images in a Running Container
A new image can be created with the `docker commit` command. This is useful if changes have been made to the container and you want to persist them for later error analysis. However, images created like this are not reproducible and completely worthless for a CI/CD environment. Furthermore, another developer cannot recognize which components the image contains. Instead, always make changes to the docker file, close existing containers and start a new container with the updated image.

## Saving Passwords in a docker Image  💀
**Do not save passwords in a Docker file!** They are in plain text and are checked into a repository. That makes them completely vulnerable even if you are using a private repository like the Artifactory.

Always use [Secrets or ConfigMaps](https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure) to provision passwords or inject them by mounting a persistent volume.

## Using the 'latest' Tag
Starting an image with *tomcat* is tempting. If no tags are specified, a container is started with the `tomcat:latest` image.  This image may no longer be up to date and refer to an older version instead. Running a production application requires complete control of the environment with exact versions of the image. 

Make sure you always use a tag or even better the **sha256 hash** of the image e.g. `tomcat@sha256:c34ce3c1fcc0c7431e1392cc3abd0dfe2192ffea1898d5250f199d3ac8d8720f`. 

### Why Use the sha256 Hash? 
Tags are not immutable and can be overwritten by a developer at any time. In this case you don't have complete control over your image - which is bad.

## Different Images per Environment
Don't create different images for development, testing, staging and production environments. The image should be the **source of truth** and should only be created once and pushed to the repository. This `image:tag` should be used for different environments in the future. 

## Depend on Start Order of Pods
Applications often depend on containers being started in a certain order. For example, a database container must be up and running before an application can connect to it. The application should be resilient to such changes, as the db pod can be unreachable or restarted at any time. The application container should be able to handle such situations without terminating or crashing. 

## Additional Anti-Patterns and Patterns
In the community, vast experience has been collected to improve the stability and usability of Docker and Kubernetes.

Refer to [Kubernetes Production Patterns](https://github.com/gravitational/workshop/blob/master/k8sprod.md) for more information.