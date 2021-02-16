---
title: Anti Patterns
type: Blog
authors: 
- name: Andreas Herz
  email: andreas.herz@sap.com
  avatar: https://avatars1.githubusercontent.com/u/1155039?v=4
publishdate: 2018-06-11
archivedate: 2018-07-11
---

![](blog-antipattern.png)

## Running as root user
Whenever possible, do not run containers as root users. One could be 
tempted to say that Kubernetes Pods and Node are well separated. The host and the container 
share the same kernel. If the container is compromised, a root user can damage the underlying 
node. Use `RUN groupadd -r anygroup && useradd -r -g anygroup myuser` to create a group 
and a user in it. Use the `USER` command to switch to this user. 

 
## Storing data or logs in containers
Containers are ideal for stateless applications 
and should be transient. This means that no data or logs should be stored in the 
container, as they are lost when the container is closed. If absolutely necessary, 
you can use persistence volumes instead to persist them outside the containers. 
However, an ELK stack is preferred for storing and processing log files. 

..read some more on [Common Kubernetes Antipattern](https://github.com/gardener/documentation/blob/master/website/documentation/guides/applications/antipattern/_index.md).
