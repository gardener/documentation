---
title: Gardener
remote: https://github.com/gardener/gardener.git
url: /components/gardener/
type: docs
---
# [Gardener](https://gardener.cloud)

![Gardener Logo](https://raw.githubusercontent.com/gardener/gardener/master/logo/gardener-large.png?raw=true)

[![CI Build status](https://concourse.ci.gardener.cloud/api/v1/teams/gardener/pipelines/gardener-master/jobs/master-head-update-job/badge)](https://concourse.ci.gardener.cloud/teams/gardener/pipelines/gardener-master/jobs/master-head-update-job)
[![Slack channel #gardener](https://img.shields.io/badge/slack-gardener-brightgreen.svg?logo=slack)](https://kubernetes.slack.com/messages/gardener)
[![Go Report Card](https://goreportcard.com/badge/github.com/gardener/gardener)](https://goreportcard.com/report/github.com/gardener/gardener)
[![GoDoc](https://godoc.org/github.com/gardener/gardener?status.svg)](https://godoc.org/github.com/gardener/gardener)
[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/1822/badge)](https://bestpractices.coreinfrastructure.org/projects/1822)

Gardener implements the automated management and operation of [Kubernetes](https://kubernetes.io/) clusters as a service and provides a fully validated extensibility framework that can be adjusted to any programmatic cloud or infrastructure provider.

Gardener's main principle is to **leverage Kubernetes concepts for all of its tasks**.

In essence, Gardener is an [extension API server](https://kubernetes.io/docs/tasks/access-kubernetes-api/setup-extension-api-server/) that comes along with a bundle of custom controllers. It introduces new API objects in an existing Kubernetes cluster (which is called **garden** cluster) in order to use them for the management of end-user Kubernetes clusters (which are called **shoot** clusters). These shoot clusters are described via [declarative cluster specifications](https://github.com/gardener/gardener/blob/master/example/90-shoot.yaml) which are observed by the controllers. They will bring up the clusters, reconcile their state, perform automated updates and make sure they are always up and running.

To accomplish these tasks reliably and to offer a high quality of service, Gardener controls the main components of a Kubernetes cluster (etcd, API server, controller manager, scheduler). These so-called *control plane* components are hosted in Kubernetes clusters themselves (which are called **seed** clusters). This is the main difference compared to many other OSS cluster provisioning tools: The shoot clusters do not have dedicated master VMs. Instead, the control plane is deployed as a native Kubernetes workload into the seeds (the architecture is commonly referred to as kubeception or inception design). This does not only effectively reduce the total cost of ownership but also allows easier implementations for "day-2 operations" (like cluster updates or robustness) by relying on all the mature Kubernetes features and capabilities.

Gardener reuses the identical Kubernetes design to span a scalable multi-cloud and multi-cluster landscape. Such familiarity with known concepts has proven to quickly ease the initial learning curve and accelerate developer productivity:
* Kubernetes API Server = Gardener API Server
* Kubernetes Controller Manager = Gardener Controller Manager
* Kubernetes Scheduler = Gardener Scheduler
* Kubelet = Gardenlet
* Node = Seed cluster
* Pod = Shoot cluster

Please find more information regarding the concepts and a detailed description of the architecture in our [Gardener Wiki]({{< ref "//documentation/concepts/architecture/_index.md" >}}) and our blog posts on kubernetes.io: [Gardener - the Kubernetes Botanist (17.5.2018)](https://kubernetes.io/blog/2018/05/17/gardener/) and [Gardener Project Update (2.12.2019)](https://kubernetes.io/blog/2019/12/02/gardener-project-update/).

----

## K8s Conformance Test Coverage

Conformance test results of latest stable Gardener release, transparently visible at the CNCF test grid:

| Provider/K8s | v1.18 | v1.17 | v1.16 | v1.15 | v1.14 |  v1.13 |  v1.12 |  v1.11 |  v1.10 |
| ----------- | ----------- | ----------- | ----------- | -----------| ----------- |----------- |----------- |----------- |----------- |
| **AWS** | [![Gardener v1.18 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.18%20AWS/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.18%20AWS) | [![Gardener v1.17 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.17%20AWS/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.17%20AWS) | [![Gardener v1.16 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.16%20AWS/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.16%20AWS) | [![Gardener v1.15 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.15%20AWS/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.15%20AWS) | [![Gardener v1.14 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.14%20AWS/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.14%20AWS) | [![Gardener v1.13 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.13%20AWS/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.13%20AWS) | [![Gardener v1.12 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.12%20AWS/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.12%20AWS) | [![Gardener v1.11 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.11%20AWS/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.11%20AWS) | [![Gardener v1.10 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.10%20AWS/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.10%20AWS) |
| **Azure** | [![Gardener v1.18 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.18%20Azure/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.18%20Azure) | [![Gardener v1.17 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.17%20Azure/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.17%20Azure) | [![Gardener v1.16 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.16%20Azure/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.16%20Azure) | [![Gardener v1.15 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.15%20Azure/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.15%20Azure) | [1] | [1] | [1] | [1] | [1] |
| **GCP** | [![Gardener v1.18 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.18%20GCE/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.18%20GCE) | [![Gardener v1.17 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.17%20GCE/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.17%20GCE) | [![Gardener v1.16 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.16%20GCE/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.16%20GCE) | [![Gardener v1.15 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.15%20GCE/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.15%20GCE) | [![Gardener v1.14 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.14%20GCE/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.14%20GCE) | [![Gardener v1.13 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.13%20GCE/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.13%20GCE) | [![Gardener v1.12 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.12%20GCE/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.12%20GCE) | [![Gardener v1.11 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.11%20GCE/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.11%20GCE) | [![Gardener v1.10 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.10%20GCE/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.10%20GCE) |
| **OpenStack** | [![Gardener v1.18 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.18%20OpenStack/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.18%20OpenStack) | [![Gardener v1.17 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.17%20OpenStack/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.17%20OpenStack) | [![Gardener v1.16 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.16%20OpenStack/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.16%20OpenStack) | [![Gardener v1.15 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.15%20OpenStack/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.15%20OpenStack) | [1] | [1] | [1] | [1] | [1] |
| **Alicloud** | [![Gardener v1.18 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.18%20Alibaba%20Cloud/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.18%20Alibaba%20Cloud) | [![Gardener v1.17 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.17%20Alibaba%20Cloud/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.17%20Alibaba%20Cloud) | [![Gardener v1.16 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.16%20Alibaba%20Cloud/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.16%20Alibaba%20Cloud) | [![Gardener v1.15 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.15%20Alibaba%20Cloud/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.15%20Alibaba%20Cloud) | [![Gardener v1.14 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.14%20Alibaba%20Cloud/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.14%20Alibaba%20Cloud) | [![Gardener v1.13 Conformance Tests](https://testgrid.k8s.io/q/summary/conformance-gardener/Gardener,%20v1.13%20Alibaba%20Cloud/tests_status?style=svg)](https://testgrid.k8s.io/conformance-gardener#Gardener,%20v1.13%20Alibaba%20Cloud) | N/A | N/A | N/A
| **Packet** | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |

[1] Version is technically supported but no longer actively tested. Regressions will go unnoticed.

Besides the conformance tests, over 400 additional e2e tests are executed on a daily basis. Get an overview of the test results at [testgrid](https://testgrid.k8s.io/gardener-all).

## Start using or developing the Gardener locally

See our documentation in the `/docs` repository, please [find the index here](https://raw.githubusercontent.com/gardener/gardener/master/docs/README.md).

## Setting up your own Gardener landscape in the Cloud

The quickest way to test drive Gardener is to install it virtually onto an existing Kubernetes cluster, just like you would install any other Kubernetes-ready application. Launch your automatic installer [here](https://gardener.cloud/installer/)

We also have a [Gardener Helm Chart](https://github.com/gardener/gardener/tree/master/charts/gardener). Alternatively you can use our [garden setup](https://github.com/gardener/garden-setup) project to create a fully configured Gardener landscape which also includes our [Gardener Dashboard](https://github.com/gardener/dashboard).

## Feedback and Support

Feedback and contributions are always welcome!

All channels for getting in touch or learning about our project are listed under the [community]({{< ref "//documentation/contribute/10_code/10-contribution_guide/_index.md" >}}#community) section. We are cordially inviting interested parties to join our [weekly meetings]({{< ref "//documentation/contribute/10_code/10-contribution_guide/_index.md" >}}#weekly-meeting).

Please report bugs or suggestions about our Kubernetes clusters as such or the Gardener itself as [GitHub issues](https://github.com/gardener/gardener/issues) or join our [Slack channel #gardener](https://kubernetes.slack.com/messages/gardener) (please invite yourself to the Kubernetes workspace [here](http://slack.k8s.io)).

## Learn More!

Please find further resources about our project here:

* [Our landing page gardener.cloud](https://gardener.cloud/)
* ["Gardener Project Update" blog on kubernetes.io](https://kubernetes.io/blog/2019/12/02/gardener-project-update/).
* ["Gardener, the Kubernetes Botanist" blog on kubernetes.io](https://kubernetes.io/blog/2018/05/17/gardener/)
* [SAP news article about "Project Gardener"](https://news.sap.com/2018/11/hasso-plattner-founders-award-finalist-profile-project-gardener/)
* [Introduction movie: "Gardener - Planting the Seeds of Success in the Cloud"](https://www.sap-tv.com/video/40962/gardener-planting-the-seeds-of-success-in-the-cloud)
* ["Thinking Cloud Native" talk at EclipseCon 2018](https://www.youtube.com/watch?v=bfw22WPg99A)
* [Blog - "Showcase of Gardener at OSCON 2018"](https://blogs.sap.com/2018/07/26/showcase-of-gardener-at-oscon/)
