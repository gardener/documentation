---
title: Big things come in small packages
type: Blog
---

Microservices tend to use smaller runtimes but you can **use what you have** today - and this can be 
a **problem in kubernetes**.



Switching your architecture to microservices instead of a single monolith has many advantages, both in the 
way you write software and the way it is used throughout its lifecycle. In this post, my attempt is to 
cover one problem which does not get as much attention and discussion - **technology stack size**.

## General purpose technology stack
{{% blog_img "logo" "blog-service-common-stack.png" %}}

There is a tendency to be more generalized in development and to apply this pattern to all services. One feels 
that a homogeneous image of the technology stack is good if it is the same for all services.

One forgets, however, that a large percentage of the integrated infrastructure is not used by all services in 
the same way, and is therefore only a burden. Thus, resources are wasted and the entire application becomes 
expensive in operation and scales very badly.

## Light technology stack
Due to the lightweight nature of your service, you can run more containers on a physical server and virtual 
machines. The result is higher resource utilization.

{{% blog_img "logo" "blog-service-service-stack.png" %}}


Additional, microservices are developed and deployed as containers independently of one another. This means that a development 
team can be developing, optimizing and deploying a certain microservice without impacting other subsystems.
 
