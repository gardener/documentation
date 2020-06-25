---
title: Configuration and Usage
remote: https://github.com/gardener/gardener/blob/master/docs/usage/configuration.md
type: docs
---
# Gardener Configuration and Usage

Gardener automates the full lifecycle of Kubernetes clusters as a service.
Additionally, it has several extension points allowing external controllers to plug-in to the lifecycle.
As a consequence, there are several configuration options for the various custom resources that are partially required.

This document describes the

1. [configuration and usage of Gardener as operator/administrator](#configuration-and-usage-of-gardener-as-operatoradministrator).
2. [configuration and usage of Gardener as end-user/stakeholder/customer](#configuration-and-usage-of-gardener-as-end-userstakeholdercustomer).

## Configuration and Usage of Gardener as Operator/Administrator

When we use the terms "operator/administrator" we refer to both the people deploying and operating Gardener.
Gardener consists out of four components:

1. `gardener-apiserver`, a Kubernetes-native API extension that serves custom resources in the Kubernetes-style (like `Seed`s and `Shoot`s), and a component that contains multiple admission plugins.
1. `gardener-controller-manager`, a component consisting out of multiple controllers that implement reconciliation and deletion flows for some of the custom resources (e.g., it contains the logic for maintaining `Shoot`s, reconciling `Plant`s, etc.).
1. `gardener-scheduler`, a component that assigns newly created `Shoot` clusters to appropriate `Seed` clusters.
1. `gardenlet`, a component running in seed clusters and consisting out of multiple controllers that implement reconciliation and deletion flows for some of the custom resources (e.g., it contains the logic for reconciliation and deletion of `Shoot`s).

Each of these components have various configuration options.
The `gardener-apiserver` uses the standard API server library maintained by the Kubernetes community, and as such it mainly supports command line flags.
The two other components are using so-called componentconfig files that describe their configuration in a Kubernetes-style versioned object.

### Configuration file for Gardener controller manager

The Gardener controller manager does only support one command line flag which should be a path to a valid controller-manager configuration file.
Please take a look at [this](https://raw.githubusercontent.com/gardener/gardener/master/docs/usage/../../example/20-componentconfig-gardener-controller-manager.yaml) example configuration.

### Configuration file for Gardener scheduler

The Gardener scheduler also only supports one command line flag which should be a path to a valid scheduler configuration file.
Please take a look at [this](https://raw.githubusercontent.com/gardener/gardener/master/docs/usage/../../example/20-componentconfig-gardener-scheduler.yaml) example configuration.
Information about the concepts of the Gardener scheduler can be found [here](https://raw.githubusercontent.com/gardener/gardener/master/docs/usage/../concepts/scheduler.md)

### Configuration file for Gardenlet

The Gardenlet also only supports one command line flag which should be a path to a valid gardenlet configuration file.
Please take a look at [this](https://raw.githubusercontent.com/gardener/gardener/master/docs/usage/../../example/20-componentconfig-gardenlet.yaml) example configuration.
Information about the concepts of the Gardenlet can be found [here](https://raw.githubusercontent.com/gardener/gardener/master/docs/usage/../concepts/gardenlet.md)

### System configuration

After successful deployment of the four components you need to setup the system.
Let's first focus on some "static" configuration.
When the `gardenlet` starts it scans the `garden` namespace of the garden cluster for `Secret`s that have influence on its reconciliation loops, mainly the `Shoot` reconciliation:

* **Internal domain secret**, contains the DNS provider credentials (having appropriate privileges) which will be used to create/delete so-called "internal" DNS records for the Shoot clusters, please see [this](https://raw.githubusercontent.com/gardener/gardener/master/docs/usage/../../example/10-secret-internal-domain.yaml) for an example.
  * This secret is used in order to establish a stable endpoint for shoot clusters which is used internally by all control plane components.
  * The DNS records are normal DNS records but called "internal" in our scenario because only the kubeconfigs for the control plane components use this endpoint when talking to the shoot clusters.
  * It is forbidden to change the internal domain secret if there are existing shoot clusters.

* **Default domain secrets** (optional), contain the DNS provider credentials (having appropriate privileges) which will be used to create/delete DNS records for a default domain for shoots (e.g., `example.com`), please see [this](https://raw.githubusercontent.com/gardener/gardener/master/docs/usage/../../example/10-secret-default-domain.yaml) for an example.
  * Not every end-user/stakeholder/customer has its own domain, however, Gardener needs to create a DNS record for every shoot cluster.
  * As landscape operator you might want to define a default domain owned and controlled by you that is used for all shoot clusters that don't specify their own domain.

:warning: Please note that the mentioned domain secrets are only needed if you have at least one seed cluster that is not tainted with `seed.gardener.cloud/disable-dns`.
Seeds with this taint don't create any DNS records for shoots scheduled on it, hence, if you only have such seeds, you don't need to create the domain secrets.

* **Alerting secrets** (optional), contain the alerting configuration and credentials for the [AlertManager](https://prometheus.io/docs/alerting/alertmanager/) to send email alerts. It is also possible to configure the monitoring stack to send alerts to an AlertManager not deployed by Gardener to handle alerting. Please see [this](https://raw.githubusercontent.com/gardener/gardener/master/docs/usage/../../example/10-secret-alerting.yaml) for an example.
  * If email alerting is configured:
    * An AlertManager is deployed into each seed cluster that handles the alerting for all shoots on the seed cluster.
    * Gardener will inject the SMTP credentials into the configuration of the AlertManager.
    * The AlertManager will send emails to the configured email address in case any alerts are firing.
  * If an external AlertManager is configured:
    * Each shoot has a [Prometheus](https://prometheus.io/docs/introduction/overview/) responsible for monitoring components and sending out alerts. The alerts will be sent to a URL configured in the alerting secret.
    * This external AlertManager is not managed by Gardener and can be configured however the operator sees fit.
    * Supported authentication types are no authentication, basic, or mutual TLS.

* **OpenVPN Diffie-Hellmann Key secret** (optional), contains the self-generated Diffie-Hellmann key used by OpenVPN in your landscape, please see [this](https://raw.githubusercontent.com/gardener/gardener/master/docs/usage/../../example/10-secret-openvpn-diffie-hellman.yaml) for an example.
  * If you don't specify a custom key then a default key is used, but for productive landscapes it's recommend to create a landscape-specific key and define it.

* **Global monitoring secrets** (optional), contains basic authentication credentials for the Prometheus aggregating metrics for all clusters.
  * These secrets are synced to each seed cluster and used to gain access to the aggregate monitoring components.

Apart from this "static" configuration there are several custom resources extending the Kubernetes API and used by Gardener.
As an operator/administrator you have to configure some of them to make the system work.

### Configuration and Usage of Gardener as End-User/Stakeholder/Customer

As an end-user/stakeholder/customer you are using a Gardener landscape that has been setup for you by another team.
You don't need to care about how Gardener itself has to be configured or how it has to be deployed.
Take a look at [this document](https://raw.githubusercontent.com/gardener/gardener/master/docs/usage/../concepts/apiserver.md) - it describes which resources are offered by Gardener.
You may want to have a more detailed look for `Project`s, `SecretBinding`s, `Shoot`s, `Plant`s, and `(Cluster)OpenIDConnectPreset`s.
