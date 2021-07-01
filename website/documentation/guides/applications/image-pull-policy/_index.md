---
title: Container image not updating
description: "Updating Images in your cluster during development"
level: intermediate
category: Fails
scope: app-developer
---



## Preface
A container image should use a fixed tag or the content hash of the image. It should not use the tags **latest**, 
**head**, **canary**, or other tags that are designed to be *floating*.

## Problem
Many Kubernetes users have run into this problem.
The story goes something like this:

 - Deploy any image using an image tag (e.g. cp-enablement/awesomeapp:1.0)
 - Fix a bug in awesomeapp
 - Build a new image and push it with the **same tag** (cp-enablement/awesomeapp:1.0)
 - Update your deployment
 - Realize that the bug is still present
 - Rinse and repeat steps 3 to 5 until you recognize this doesn't work

The problem relates to how Kubernetes decides whether to do a *docker pull* when starting a container.
Since we tagged our image as *:1.0*, the default pull policy is **IfNotPresent**. The Kubelet already has a local 
copy of cp-enablement/awesomeapp:1.0, hence it doesn't attempt to do a docker pull. When the new Pods come up, 
they still use the old broken Docker image.

There are three ways to resolve this:

 - ~~Switch to using the tag :latest~~  (DO NOT DO THIS!)
 - Specify ImagePullPolicy: always (not recomended).
 - **Use unique tags (best practice)**

## Solution
In the quest to automate myself out of a job, I created a bash script that runs anytime to create a new tag
and push the build result to the registry.


```sh
#!/usr/bin/env bash

# Set the docker image name and the corresponding repository
# Ensure that you change them in the deployment.yml as well.
# You must be logged in with docker login…
#
# CHANGE THIS TO YOUR Docker.io SETTINGS
#
PROJECT=awesomeapp
REPOSITORY=cp-enablement

# exit if any subcommand or pipeline returns a non-zero status.
set -e

# set debug mode
#set -x

# build my nodeJS app
#
npm run build

# get latest version IDs from the Docker.io registry and increment them
#
VERSION=$(curl https://registry.hub.docker.com/v1/repositories/$REPOSITORY/$PROJECT/tags  | sed -e 's/[][]//g' -e 's/"//g' -e 's/ //g' | tr '}' '\n'  | awk -F: '{print $3}' | grep v| tail -n 1)
VERSION=${VERSION:1}
((VERSION++))
VERSION="v$VERSION"


# build a new docker image
#
echo '>>> Building new image'
# Due to a bug in Docker we need to analyse the log to find out if build passed (see https://github.com/dotcloud/docker/issues/1875)
docker build --no-cache=true -t $REPOSITORY/$PROJECT:$VERSION . | tee /tmp/docker_build_result.log
RESULT=$(cat /tmp/docker_build_result.log | tail -n 1)
if [[ "$RESULT" != *Successfully* ]];
then
  exit -1
fi


echo '>>> Push new image'
docker push $REPOSITORY/$PROJECT:$VERSION


```


