---
title: CI/CD
---

# CI/CD
As an execution environment for CI/CD workloads, we use [Concourse](https://concourse-ci.org).
We however abstract from the underlying "build executor" and instead offer a
`Pipeline Definition Contract`, through which components declare their build pipelines as
required.

![Overview](overview.png?raw=true)


In order to run continuous delivery workloads for all components contributing to the
[Gardener](https://github.com/gardener) project, we operate a central service.

Typical workloads encompass the execution of tests and builds of a variety of technologies,
as well as building and publishing container images, typically containing build results.

We are building our CI/CD offering around some principles:

* *container-native* - each workload is executed within a container environment. Components may customise used container images
* *automation* - pipelines are generated without manual interaction
* *self-service* - components customise their pipelines by changing their sources
* *standardisation*



**Learn more on our: [Build Pipeline Reference Manual](https://gardener.github.io/cc-utils/)**

