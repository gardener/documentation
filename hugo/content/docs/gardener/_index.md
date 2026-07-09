---
description: >-
  The core component providing the extension API server of your Kubernetes
  cluster
github_repo: 'https://github.com/gardener/gardener'
github_subdir: docs
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/gardener/_index.md
  to: README.md
title: Gardener
weight: 30
prev: false
next: false
managed: true
---

# Documentation Index

## Overview

* [General Architecture](/docs/gardener/concepts/architecture/)
* [Gardener landing page `gardener.cloud`](https://gardener.cloud/)
* ["Gardener, the Kubernetes Botanist" blog on kubernetes.io](https://kubernetes.io/blog/2018/05/17/gardener/)
* ["Gardener Project Update" blog on kubernetes.io](https://kubernetes.io/blog/2019/12/02/gardener-project-update/)

## Concepts

* Components
  * [Gardener API server](/docs/gardener/concepts/apiserver/)
    * [In-Tree Admission Plugins](/docs/gardener/concepts/apiserver-admission-plugins/)
  * [Gardener Controller Manager](/docs/gardener/concepts/controller-manager/)
  * [Gardener Scheduler](/docs/gardener/concepts/scheduler/)
  * [Gardener Admission Controller](/docs/gardener/concepts/admission-controller/)
  * [Gardener Resource Manager](/docs/gardener/concepts/resource-manager/)
  * [Gardener Operator](/docs/gardener/concepts/operator/)
  * [Gardener Node Agent](/docs/gardener/concepts/node-agent/)
  * [Gardenlet](/docs/gardener/concepts/gardenlet/)
  * [Gardenadm](/docs/gardener/concepts/gardenadm/)
* [Backup Restore](/docs/gardener/concepts/backup-restore/)
* [etcd](/docs/gardener/concepts/etcd/)
* [Relation between Gardener API and Cluster API](/docs/gardener/concepts/cluster-api/)

## Usage

### Gardener

* [Gardener Info `ConfigMap`](/docs/gardener/configmap/)

### Project

* [Projects](/docs/gardener/project/projects/)
* [Service Account Manager](/docs/gardener/project/service-account-manager/)
* [`NamespacedCloudProfile`s](/docs/gardener/project/namespaced-cloud-profiles/)

### Shoot

* [Accessing Shoot Clusters](/docs/gardener/shoot/shoot_access/)
* [Hibernate a Cluster](/docs/gardener/shoot/shoot_hibernate/)
* [Shoot Info `ConfigMap`](/docs/gardener/shoot/shoot_info_configmap/)
* [Shoot Kubernetes Minor Version Upgrades](/docs/gardener/shoot/shoot_kubernetes_versions/)
* [Shoot Cluster Limits](/docs/gardener/shoot/shoot_limits/)
* [Shoot Maintenance](/docs/gardener/shoot/shoot_maintenance/)
* [Shoot Cluster Purposes](/docs/gardener/shoot/shoot_purposes/)
* [Shoot Scheduling Profiles](/docs/gardener/shoot/shoot_scheduling_profiles/)
* [Shoot Status](/docs/gardener/shoot/shoot_status/)
* [Supported CPU Architectures for Shoot Worker Nodes](/docs/gardener/shoot/shoot_supported_architectures/)
* [Workerless `Shoot`s](/docs/gardener/shoot/shoot_workerless/)
* [Shoot Workers Settings](/docs/gardener/shoot/shoot_workers_settings/)
* [Access Restrictions](/docs/gardener/shoot/access_restrictions/)
* [Workload Identity](/docs/gardener/shoot/shoot-workload-identity/)

### Shoot Operations

* [Shoot Credentials Rotation](/docs/gardener/shoot-operations/shoot_credentials_rotation/)
* [Trigger shoot operations](/docs/gardener/shoot-operations/shoot_operations/)
* [Shoot Updates and Upgrades](/docs/gardener/shoot-operations/shoot_updates/)
* [Shoot Kubernetes and Operating System Versioning](/docs/gardener/shoot-operations/shoot_versions/)
* [Supported Kubernetes versions](/docs/gardener/shoot-operations/supported_k8s_versions/)
* [Controlling the Kubernetes versions for specific worker pools](/docs/gardener/shoot-operations/worker_pool_k8s_versions/)
* [Migration from SecretBinding to CredentialsBinding](/docs/gardener/shoot-operations/secretbinding-to-credentialsbinding-migration/)
* [Manual Worker Pool Rollout](/docs/gardener/shoot-operations/worker_pool_manual_rollout/)

### High Availability

* [Shoot High-Availability Control Plane](/docs/guides/high-availability/control-plane/)
* [Shoot High-Availability Best Practices](/docs/guides/high-availability/best-practices/)

### Security

* [Default Seccomp Profile](/docs/gardener/security/default_seccomp_profile/)
* [ETCD Encryption Config](/docs/gardener/security/etcd_encryption_config/)
* [Admission Configuration for the `PodSecurity` Admission Plugin](/docs/gardener/security/pod-security/)
* [Audit a Kubernetes cluster](/docs/gardener/security/shoot_auditpolicy/)
* [Shoot `ServiceAccount` Configurations](/docs/gardener/security/shoot_serviceaccounts/)

### Networking

* [Custom `CoreDNS` configuration](/docs/gardener/networking/custom-dns-config/)
* [DNS Search Path Optimization](/docs/gardener/networking/dns-search-path-optimization/)
* [ExposureClasses](/docs/gardener/networking/exposureclasses/)
* [`NodeLocalDNS` feature](/docs/gardener/networking/node-local-dns/)
* [Shoot `KUBERNETES_SERVICE_HOST` Environment Variable Injection](/docs/gardener/networking/shoot_kubernetes_service_host_injection/)
* [Shoot Networking](/docs/gardener/networking/shoot_networking/)
* [Dual-Stack Network Migration](/docs/gardener/networking/dual-stack-networking-migration/)

### Autoscaling

* [DNS Autoscaling](/docs/gardener/autoscaling/dns-autoscaling/)
* [In-place Resource Updates](/docs/gardener/autoscaling/in-place-resource-updates/)
* [Shoot Auto-Scaling Configuration](/docs/gardener/autoscaling/shoot_autoscaling/)
* [Shoot Pod Auto-Scaling Best Practices](/docs/guides/applications/shoot-pod-autoscaling-best-practices/)

### Observability

* [Logging](/docs/gardener/logging/)

### Advanced

* [`containerd` Registry Configuration](/docs/gardener/advanced/containerd-registry-configuration/)
* [Endpoints and Ports of a Shoot Control-Plane](/docs/gardener/advanced/control-plane-endpoints-and-ports/)
* [(Custom) CSI components](/docs/gardener/advanced/csi_components/)
* [Custom `containerd` configuration](/docs/gardener/advanced/custom-containerd-config/)
* [Readiness of Shoot Worker Nodes](/docs/gardener/advanced/node-readiness/)
* [Cleanup of Shoot clusters in deletion](/docs/gardener/advanced/shoot_cleanup/)
* [Tolerations](/docs/gardener/advanced/tolerations/)

### Reference

* [Well-known labels and annotations](/docs/gardener/well-known-labels-annotations/)

## [API Reference](/docs/gardener/api-reference/)

* [`authentication.gardener.cloud` API Group](/docs/gardener/api-reference/authentication/)
* [`core.gardener.cloud/v1beta1` API Group](/docs/gardener/api-reference/core/)
* [`core.gardener.cloud/v1` API Group](/docs/gardener/api-reference/core-v1/)
* [`extensions.gardener.cloud` API Group](/docs/gardener/api-reference/extensions/)
* [`local.provider.extensions.gardener.cloud` API Group](/docs/gardener/api-reference/provider-local/)
* [`operations.gardener.cloud` API Group](/docs/gardener/api-reference/operations/)
* [`operator.gardener.cloud` API Group](/docs/gardener/api-reference/operator/)
* [`resources.gardener.cloud` API Group](/docs/gardener/api-reference/resources/)
* [`security.gardener.cloud` API Group](/docs/gardener/api-reference/security/)
* [`seedmanagement.gardener.cloud` API Group](/docs/gardener/api-reference/seedmanagement/)

## [CLI Reference](https://github.com/gardener/gardener/blob/master/docs/cli-reference/README.md)

* [`gardenadm`](https://github.com/gardener/gardener/blob/master/docs/cli-reference/gardenadm/gardenadm.md)

## Development

* [Getting started locally (using the local provider)](https://github.com/gardener/gardener/blob/master/docs/development/getting_started_locally.md)
* [Setting up a development environment (using a cloud provider)](/contribute/developer-starter-kit/local_setup/)
* [Testing (Unit, Integration, E2E Tests)](/contribute/developer-starter-kit/testing/)
* [Test Machinery Tests](/contribute/developer-starter-kit/testmachinery_tests/)
* [Dependency Management](/contribute/developer-starter-kit/dependencies/)
* [Kubernetes Clients in Gardener](/contribute/developer-starter-kit/kubernetes-clients/)
* [Validation Guidelines](/contribute/developer-starter-kit/validation-guidelines/)
* [Logging Guidelines in Gardener Components](/contribute/developer-starter-kit/logging-guidelines/)
* [Changing the API](/contribute/developer-starter-kit/changing-the-api/)
* [Secrets Management for Seed and Shoot Clusters](/contribute/gardener/secrets_management/)
* [IPv6 in Gardener Clusters](/contribute/gardener/ipv6/)
* [Releases, Features, Hotfixes](/contribute/gardener/process/)
* [Reversed Cluster VPN](/contribute/gardener/reversed-vpn-tunnel/)
* [Adding New Cloud Providers](/contribute/gardener/new-cloud-provider/)
* [Adding Support For A New Kubernetes Version](/contribute/gardener/new-kubernetes-version/)
* [Removing Support For a Kubernetes Version](/contribute/gardener/remove-support-for-kubernetes-version/)
* [Extending the Monitoring Stack](/contribute/gardener/monitoring-stack/)
* [Logging Stack](/contribute/gardener/logging-stack/)
* [How to create log parser for container into fluent-bit](/contribute/gardener/log_parsers/)
* [`PriorityClasses` in Gardener Clusters](/contribute/gardener/priority-classes/)
* [High Availability Of Deployed Components](/contribute/gardener/high-availability-of-components/)
* [Checklist For Adding New Components](/contribute/gardener/component-checklist/)
* [Defaulting Strategy and Developer Guideline](/contribute/developer-starter-kit/defaulting/)
* [Autoscaling Specifics for Components](/contribute/gardener/autoscaling-specifics-for-components/)
* [Shoot Advertised Addresses](/contribute/gardener/shoot-advertised-addresses/)

## Extensions

* [Extensibility overview](/docs/gardener/extensions/)
* [Extension registration](/docs/gardener/extensions/registration/)
* [`Cluster` resource](/docs/gardener/extensions/cluster/)
* Extension points
  * [General conventions](/docs/gardener/extensions/conventions/)
  * [Trigger for reconcile operations](/docs/gardener/extensions/reconcile-trigger/)
  * [Deploy resources into the shoot cluster](/docs/gardener/extensions/managedresources/)
  * [Shoot resource customization webhooks](/docs/gardener/extensions/shoot-webhooks/)
  * [Logging and monitoring for extensions](/docs/gardener/extensions/logging-and-monitoring/)
  * [Contributing to shoot health status conditions](/docs/gardener/extensions/shoot-health-status-conditions/)
    * [Health Check Library](/docs/gardener/extensions/healthcheck-library/)
  * [CA Rotation in Extensions](/docs/gardener/extensions/ca-rotation/)
  * Blob storage providers
    * [`BackupBucket` resource](/docs/gardener/extensions/resources/backupbucket/)
    * [`BackupEntry` resource](/docs/gardener/extensions/resources/backupentry/)
  * DNS providers
    * [`DNSRecord` resources](/docs/gardener/extensions/resources/dnsrecord/)
  * IaaS/Cloud providers
    * [Control plane customization webhooks](/docs/gardener/extensions/controlplane-webhooks/)
    * [`Bastion` resource](/docs/gardener/extensions/resources/bastion/)
    * [`ControlPlane` resource](/docs/gardener/extensions/resources/controlplane/)
    * [`Infrastructure` resource](/docs/gardener/extensions/resources/infrastructure/)
    * [`SelfHostedShootExposure` resource](/docs/gardener/extensions/resources/selfhostedshootexposure/)
    * [`Worker` resource](/docs/gardener/extensions/resources/worker/)
  * Network plugin providers
    * [`Network` resource](/docs/gardener/extensions/resources/network/)
  * Operating systems
    * [`OperatingSystemConfig` resource](/docs/gardener/extensions/resources/operatingsystemconfig/)
  * Container runtimes
    * [`ContainerRuntime` resource](/docs/gardener/extensions/resources/containerruntime/)
  * Generic (non-essential) extensions
    * [`Extension` resource](/docs/gardener/extensions/resources/extension/)
  * [Extension Admission](/docs/gardener/extensions/admission/)
  * [Heartbeat controller](/docs/gardener/extensions/heartbeat/)
* [Provider Local](/docs/gardener/extensions/provider-local/)
* [Access to the Garden Cluster](/docs/gardener/extensions/garden-api-access/)
* [Control plane migration](/docs/gardener/extensions/migration/)
* [Force Deletion](/docs/gardener/extensions/force-deletion/)
* [Extending project roles](/docs/gardener/extensions/project-roles/)
* [Referenced resources](/docs/gardener/extensions/referenced-resources/)
* [Validation Guidelines For Extensions](/docs/gardener/extensions/validation-guidelines-for-extensions/)
* [Static Manifest Propagation From Seed To Shoot](/docs/gardener/extensions/static-manifests/)

## Deployment

* [Getting started locally](/docs/gardener/deployment/getting_started_locally/)
* [Getting started locally with extensions](/docs/gardener/deployment/getting_started_locally_with_extensions/)
* [Getting started locally with Self-Hosted Shoot Clusters](/docs/gardener/deployment/getting_started_locally_with_gardenadm/)
* [Getting started remotely](/docs/gardener/deployment/getting_started_remotely/)
* [Setup Gardener on a Kubernetes cluster](/docs/gardener/deployment/setup_gardener/)
* [Version Skew Policy](/docs/gardener/deployment/version_skew_policy/)
* [Deploying Gardenlets](/docs/gardener/deployment/deploy_gardenlet/)
  * [Automatic Deployment of Gardenlets](/docs/gardener/deployment/deploy_gardenlet_automatically/)
  * [Deploy a Gardenlet Manually](/docs/gardener/deployment/deploy_gardenlet_manually/)
  * [Deploy a Gardenlet via Gardener Operator](/docs/gardener/deployment/deploy_gardenlet_via_operator/)
  * [Scoped API Access for Gardenlets](/docs/gardener/deployment/gardenlet_api_access/)
* [Overwrite image vector](/docs/gardener/deployment/image_vector/)
* [Migration from Gardener `v0` to `v1`](/docs/gardener/deployment/migration_v0_to_v1/)
* [Feature Gates in Gardener](/docs/gardener/deployment/feature_gates/)
* [Configuring the Logging stack](/docs/gardener/deployment/configuring_logging/)
* [SecretBinding Provider Controller](/docs/gardener/deployment/secret_binding_provider_controller/)

## Operations

* [Gardener configuration and usage](/docs/gardener/configuration/)
* [Gardener Upgrade Guide](/docs/gardener/upgrade-gardener/)
* [`CloudProfile` Capabilities](/docs/gardener/cloudprofile_capabilities/)
* [Control Plane Migration](/docs/gardener/control_plane_migration/)
* [Enabling In-place Resource Updates](/docs/gardener/enabling-in-place-resource-updates/)
* [Immutable Backup Buckets](/docs/gardener/immutable-backup-buckets/)
* [Istio](/docs/gardener/istio/)
* [Kube API server load balancing](/docs/gardener/kube_apiserver_loadbalancing/)
* [`ManagedSeed`s: Register Shoot as Seed](/docs/gardener/managed_seed/)
* [`NetworkPolicy`s In Garden, Seed, Shoot Clusters](/docs/gardener/network_policies/)
* [Seed Bootstrapping](/docs/gardener/seed_bootstrapping/)
* [Seed Settings](/docs/gardener/seed_settings/)
* [Topology-Aware Traffic Routing](/docs/gardener/topology_aware_routing/)
* [Trusted TLS certificate for shoot control planes](/docs/gardener/trusted-tls-for-control-planes/)
* [Trusted TLS certificate for garden runtime cluster](/docs/gardener/trusted-tls-for-garden-runtime/)
* [Overlapping Network Ranges between Seeds and Shoots](/docs/gardener/overlapping-network-ranges/)
* [Disaster Recovery: Restoring a Garden Cluster to a new Runtime Cluster](/docs/gardener/disaster_recovery_garden/)
* [Nginx Ingress Retirement and Migration Guide](/docs/gardener/nginx_ingress/)

## Monitoring

* [Alerting](/docs/gardener/monitoring/alerting/)
* [Connectivity](/docs/gardener/monitoring/connectivity/)
* [Profiling Gardener Components](/docs/gardener/monitoring/profiling/)
