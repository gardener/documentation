---
title: Integrity and Immutability
description: "Ensure that you always get the right image"
level: intermediate
category: Docker Registry
scope: app-developer
---

## Introduction
When transferring data among networked systems, **trust is a central concern**. In particular, when communicating over an untrusted medium such as the internet, it is critical to ensure the **integrity and immutability** of all the data a system operates on. Especially if you use Docker Engine to push and pull images (data) to a **public registry**. 

This immutability offers you a guarantee that any and all containers that you instantiate will be absolutely identical at inception. Surprise surprise, deterministic operations. 

## A Lesson in Deterministic Ops
Docker Tags are about as reliable and disposable as this guy down here.

![docker-labels](./images/howto-content-trust.svg)


Seems simple enough. You have probably already deployed hundreds of YAML's or started endless counts of Docker containers.

```bash
docker run --name mynginx1 -P -d nginx:1.13.9
```

or

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: rss-site
spec:
  replicas: 1
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: front-end
          image: nginx:1.13.9
          ports:
            - containerPort: 80
```

**But Tags are mutable and humans are prone to error. Not a good combination.** Here, we’ll dig into why the use of tags can 
be dangerous and how to deploy your containers across a pipeline and across environments with **determinism in mind**.

Let's say that you want to ensure that whether it’s today or 5 years from now, that specific deployment uses the very same image that 
you have defined. Any updates or newer versions of an image should be executed as a new deployment. **The solution: digest**

A digest takes the place of the tag when pulling an image. For example, to pull the above image by digest, run the following command:

```bash 
docker run --name mynginx1 -P -d nginx@sha256:4771d09578c7c6a65299e110b3ee1c0a2592f5ea2618d23e4ffe7a4cab1ce5de
```

You can now make sure that the same image is always loaded at every deployment. It doesn't matter if the TAG of the image has been changed or not. **This solves the problem of repeatability.**

## Content Trust
However, there’s an additionally hidden danger. It is possible for an attacker to replace a server image with another
one infected with malware. 

![docker-content-trust](./images/howto-content-trust-replace.svg)

[Docker Content trust](https://docs.docker.com/engine/security/trust/content_trust/) gives you the ability to verify both the integrity and the publisher of all the data received from a registry over any channel.

Prior to version 1.8, Docker didn’t have a way to verify the authenticity of a server image. But in v1.8, a new feature 
called **Docker Content Trust** was introduced to automatically sign and verify the signature of a publisher.

So, as soon as a server image is downloaded, it is cross-checked with the signature of the publisher to see if someone tampered with it in any way. **This solves the problem of trust.**

In addition, you should scan all images for known vulnerabilities.