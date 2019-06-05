---
title: Anti Patterns
type: Blog
---

{{< blog_img "logo" "blog-antipattern.png" >}}


## Running as root user
Whenever possible, do not run containers as root users. One could be 
tempted to say that Kubernetes Pods and Node are well separated. The host and the container 
share the same kernel. If the container is compromised, a root user can damage the underlying 
node. Use `RUN groupadd -r anygroup && useradd -r -g anygroup myuser` to create a group 
and a user in it. Use the `USER` command to switch to this user. 
<iframe width="560" height="315" src="https://www.youtube.com/embed/ltrV-Qmh3oY" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
 
 
 
## Storing data or logs in containers
Containers are ideal for stateless applications 
and should be transient. This means that no data or logs should be stored in the 
container, as they are lost when the container is closed. If absolutely necessary, 
you can use persistence volumes instead to persist them outside the containers. 
However, an ELK stack is preferred for storing and processing log files. 

..read some more on [Common Kubernetes Antipattern](../readmore/antipattern).
