---
title: Dockerfile Pitfalls
description: "Common Dockerfile pitfalls"
level: beginner
reviewer: Tieyan Fu
last_reviewed: 22.06.2018
category: Fails
scope: app-developer
---


## Using the `latest` Tag for an Image
Many Dockerfiles use the `FROM package:latest` pattern at the top of their Dockerfiles to pull the latest image from a Docker registry. 

### Bad Dockerfile

```Dockerfile
FROM alpine
```

While simple, using the latest tag for an image means that your build can suddenly break if that image gets updated. This can lead to problems where everything builds fine locally (because your local cache thinks it is the latest), while a build server may fail, because some pipelines make a clean pull on every build. Additionally, troubleshooting can prove to be difficult, since the maintainer of the Dockerfile didn't actually make any changes.

### Good Dockerfile
A digest takes the place of the tag when pulling an image. This will ensure that your Dockerfile remains immutable.

```Dockerfile
FROM alpine@sha256:7043076348bf5040220df6ad703798fd8593a0918d06d3ce30c6c93be117e430
```

## Running apt/apk/yum update
Running `apt-get install` is one of those things virtually every Debian-based Dockerfile will have to do in order to satiate some external package requirements your code needs to run. However, using `apt-get` as an example, this comes with its own problems.

**apt-get upgrade**

This will update all your packages to their latests versions, which can be bad because it prevents your Dockerfile from creating consistent, immutable builds.

**apt-get update (in a different line than the one running your apt-get install command)**


Running `apt-get update` as a single line entry will get cached by the build and won't actually run every time you need to run `apt-get install`. Instead, make sure you run `apt-get update` in the same line with all the packages to ensure that all are updated correctly.


## Avoid Big Container Images
Building a small container image will reduce the time needed to start or restart pods. An image based on the popular [Alpine Linux project](http://alpinelinux.org/) is much smaller than most distribution based images (~5MB).  For most popular languages and products, there is usually an official Alpine Linux image, e.g. [golang](https://hub.docker.com/_/golang/), [nodejs](https://hub.docker.com/_/node/), and [postgres](https://hub.docker.com/_/postgres/).

```bash
$  docker images
REPOSITORY                                                      TAG                     IMAGE ID            CREATED             SIZE
postgres                                                        9.6.9-alpine            6583932564f8        13 days ago         39.26 MB
postgres                                                        9.6                     d92dad241eff        13 days ago         235.4 MB
postgres                                                        10.4-alpine             93797b0f31f4        13 days ago         39.56 MB
```

In addition, for compiled languages such as Go or C++ that do not require build time tooling during runtime, it is recommended to avoid build time tooling in the final images. With Docker's support for [multi-stages builds](https://docs.docker.com/engine/userguide/eng-image/multistage-build/), this can be easily achieved with minimal effort. Such an example can be found at [Multi-stage builds](https://docs.docker.com/develop/develop-images/multistage-build/#name-your-build-stages). 

Google's [distroless](https://github.com/GoogleContainerTools/distroless) image is also a good base image.