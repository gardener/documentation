---
title: Container Image Not Updating
description: "Updating images in your cluster during development"
level: intermediate
category: Fails
scope: app-developer
---

## Introduction
A container image should use a fixed tag or the SHA of the image. It should not use the tags **latest**, **head**, **canary**, or other tags that are designed to be *floating*.

## Problem
If you have encountered this issue, you have probably done something along the lines of:

 - Deploy anything using an image tag (e.g. `cp-enablement/awesomeapp:1.0`)
 - Fix a bug in awesomeapp
 - Build a new image and push it with the **same tag** (`cp-enablement/awesomeapp:1.0`)
 - Update the deployment
 - Realize that the bug is still present
 - Repeat steps 3-5 without any improvement

The problem relates to how Kubernetes decides whether to do a *docker pull* when starting a container.
Since we tagged our image as *:1.0*, the default pull policy is **IfNotPresent**. The Kubelet already has a local 
copy of `cp-enablement/awesomeapp:1.0`, so it doesn't attempt to do a docker pull. When the new Pods come up, 
they're still using the old broken Docker image.

There are a couple of ways to resolve this, with the recommended one being to **use unique tags**.

## Solution

In order to fix the problem, you can use the following bash script that runs anytime the deployment is updated to create a new tag
and push it to the registry.


```sh
#!/usr/bin/env bash

# Set the docker image name and the corresponding repository
# Ensure that you change them in the deployment.yml as well.
# You must be logged in with docker login.
#
# CHANGE THIS TO YOUR Docker.io SETTINGS
#
PROJECT=awesomeapp
REPOSITORY=cp-enablement

# causes the shell to exit if any subcommand or pipeline returns a non-zero status.
#
set -e

# set debug mode
#
set -x

# build my nodeJS app
#
npm run build

# get the latest version ID from the Docker.io registry and increment them
#
VERSION=$(curl https://registry.hub.docker.com/v1/repositories/$REPOSITORY/$PROJECT/tags  | sed -e 's/[][]//g' -e 's/"//g' -e 's/ //g' | tr '}' '\n'  | awk -F: '{print $3}' | grep v| tail -n 1)
VERSION=${VERSION:1}
((VERSION++))
VERSION="v$VERSION"


# build the new docker image
#
echo '>>> Building new image'

echo '>>> Push new image'
docker push $REPOSITORY/$PROJECT:$VERSION
```