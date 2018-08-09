---
title: Dockerfile pitfalls
description: "Common Dockerfile pitfalls"
type: tutorial-page
level: beginner
index: 50
reviewer: Tieyan Fu
status: Reviewed
last_reviewed: 22.06.2018
category: Fails
scope: app-developer
---


## Using :latest
Many Dockerfiles use the FROM package:latest pattern at the top of their Dockerfiles to pull the latest 
image from a Docker registry. 

`Bad Dockerfile`

```bash 
FROM alpine

.
.
.

```

While simple, using the latest tag for an image means that your build 
can suddenly break if that image gets updated. This can lead to problems where everything builds fine 
locally (because your local cache thinks it is the latest) while a build server may fail, because some 
Pipelines makes a clean pull on every build. Additionally, troubleshooting can prove to be 
difficult, since the maintainer of the Dockerfile didn't actually make any changes.

To prevent this, just make sure you use a specific tag of an image (example: alpine:3.3 or hashtag `tomcat@sha256:c34ce3c1fcc0c7431e1392cc3abd0dfe2192ffea1898d5250f199d3ac8d8720f`). This will ensure
your Dockerfile remains immutable.

`Good Dockerfile`

```bash
FROM alpine:3.7

.
.
.

```
   
   
    
## Running apt/apk/yum update
Running apt-get install is one of those things virtually every Debian-based Dockerfile will have. This is due to 
satiate some external package requirements in order to run your code. But, using apt-get as an example, comes with 
its fair share of gotchas.

**apt-get upgrade**

This will update all your packages to their latests versions, which can be bad because it prevents your Dockerfile 
from creating consistent, immutable builds.

**apt-get update in a different line than running your apt-get install command.**


Running apt-get update as a single line entry will get cached by the build and won't actually run every 
time you need to run apt-get install. Instead, make sure you run apt-get update in the same line with all 
the packages to ensure all are updated correctly.


## Build small container images
Building small container image will enable fast pod startup time, quick restart of pod in case of failure or rolling update.
Typically image based on the popular [Alpine Linux project](http://alpinelinux.org/) is much smaller than most distribution based images (~5MB),
and results in much slimmer images in general.  For most popular languages and products, there are usually an official Alpine Linux image, e.g. [golang](https://hub.docker.com/_/golang/), [nodejs](https://hub.docker.com/_/node/) and [postgres](https://hub.docker.com/_/postgres/).

```shell
$  docker images
REPOSITORY                                                      TAG                     IMAGE ID            CREATED             SIZE
postgres                                                        9.6.9-alpine            6583932564f8        13 days ago         39.26 MB
postgres                                                        9.6                     d92dad241eff        13 days ago         235.4 MB
postgres                                                        10.4-alpine             93797b0f31f4        13 days ago         39.56 MB
```

In addition, for compiled languages such as Go or C++ which does not requires build time tooling  during runtime, it is recommended to avoid build time tooling in the final images.  With Docker's support for [multi-stages builds](https://docs.docker.com/engine/userguide/eng-image/multistage-build/)
this can be easily achieved with minimal effort.  Such an example can be found [here](https://docs.docker.com/develop/develop-images/multistage-build/#name-your-build-stages).  Google's [distroless](https://github.com/GoogleContainerTools/distroless) image is also a good base image.