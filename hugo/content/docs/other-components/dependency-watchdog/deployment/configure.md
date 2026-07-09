---
github_repo: 'https://github.com/gardener/dependency-watchdog'
github_subdir: docs/deployment
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/other-components/dependency-watchdog/deployment/configure.md
  to: configure.md
title: Configure
prev: false
next: false
managed: true
---

# Configure Dependency Watchdog Components

## Prober

Dependency watchdog prober command takes command-line-flags which are meant to fine-tune the prober. In addition a `ConfigMap` is also mounted to the container which provides tuning knobs for the all probes that the prober starts.

### Command line arguments

Prober can be configured via the following flags:

| Flag Name | Type | Required | Default Value | Description |
| --- | --- | --- | --- | --- |
| kube-api-burst | int | No | 10 | Burst to use while talking with kubernetes API server. The number must be >= 0. If it is 0 then a default value of 10 will be used |
| kube-api-qps | float | No | 5.0 | Maximum QPS (queries per second) allowed when talking with kubernetes API server. The number must be >= 0. If it is 0 then a default value of 5.0 will be used |
| concurrent-reconciles | int | No | 1 | Maximum number of concurrent reconciles |
| config-file | string | Yes | NA | Path of the config file containing the configuration to be used for all probes |
| metrics-bind-addr | string | No | ":9643" | The TCP address that the controller should bind to for serving prometheus metrics |
| health-bind-addr | string | No | ":9644" | The TCP address that the controller should bind to for serving health probes |
| enable-leader-election | bool | No | false | In case prober deployment has more than 1 replica for high availability, then it will be setup in a active-passive mode. Out of many replicas one will become the leader and the rest will be passive followers waiting to acquire leadership in case the leader dies. |
| leader-election-namespace | string | No | "garden" | Namespace in which leader election resource will be created. It should be the same namespace where DWD pods are deployed |
| leader-elect-lease-duration | time.Duration | No | 15s | The duration that non-leader candidates will wait after observing a leadership renewal until attempting to acquire leadership of a led but unrenewed leader slot. This is effectively the maximum duration that a leader can be stopped before it is replaced by another candidate. This is only applicable if leader election is enabled. |
| leader-elect-renew-deadline | time.Duration | No | 10s | The interval between attempts by the acting master to renew a leadership slot before it stops leading. This must be less than or equal to the lease duration. This is only applicable if leader election is enabled. |
| leader-elect-retry-period | time.Duration | No | 2s | The duration the clients should wait between attempting acquisition and renewal of a leadership. This is only applicable if leader election is enabled. |

You can view an example kubernetes prober [deployment](https://github.com/gardener/dependency-watchdog/blob/master/example/03-dwd-prober-deployment.yaml) YAML to see how these command line args are configured.

### Prober Configuration

A probe configuration is mounted as `ConfigMap` to the container. The path to the config file is configured via `config-file` command line argument as mentioned above. Prober will start one probe per Shoot control plane hosted within the Seed cluster. Each such probe will run asynchronously and will periodically connect to the Kube ApiServer of the Shoot. Configuration below will influence each such probe.

You can view an example YAML configuration provided as `data` in a `ConfigMap` [here](https://github.com/gardener/dependency-watchdog/blob/master/example/01-dwd-prober-configmap.yaml).

| Name | Type | Required | Default Value | Description |
| --- | --- | --- | --- | --- |
| kubeConfigSecretName | string | Yes | NA | Name of the kubernetes Secret which has the encoded KubeConfig required to connect to the Shoot control plane Kube ApiServer via an internal domain. This typically uses the local cluster DNS. |
| probeInterval | metav1.Duration | No | 10s | Interval with which each probe will run. |
| initialDelay | metav1.Duration | No | 30s | Initial delay for the probe to become active. Only applicable when the probe is created for the first time. |
| probeTimeout | metav1.Duration | No | 30s | In each run of the probe it will attempt to connect to the Shoot Kube ApiServer. probeTimeout defines the timeout after which a single run of the probe will fail. |
| backoffJitterFactor | float64 | No | 0.2 | Jitter with which a probe is run. |
| dependentResourceInfos | []prober.DependentResourceInfo | Yes | NA | Detailed below. |
| kcmNodeMonitorGraceDuration | metav1.Duration | Yes | NA | It is the node-monitor-grace-period set in the kcm flags. Used to determine whether a node lease can be considered expired. |
| nodeLeaseFailureFraction | float64 | No | 0.6 | is used to determine the maximum number of leases that can be expired for a lease probe to succeed. |

### DependentResourceInfo

If a lease probe fails, then it scales down the dependent resources defined by this property. Similarly, if the lease probe is now successful, then it scales up the dependent resources defined by this property.

Each dependent resource info has the following properties:

| Name | Type | Required | Default Value | Description |
| --- | --- | --- | --- | --- |
| ref | autoscalingv1.CrossVersionObjectReference | Yes | NA | It is a collection of ApiVersion, Kind and Name for a kubernetes resource thus serving as an identifier. |
| optional | bool | Yes | NA | It is possible that a dependent resource is optional for a Shoot control plane. This property enables a probe to determine the correct behavior in case it is unable to find the resource identified via `ref`. |
| scaleUp | prober.ScaleInfo | No |  | Captures the configuration to scale up this resource. Detailed below. |
| scaleDown | prober.ScaleInfo | No |  | Captures the configuration to scale down this resource. Detailed below. |

> NOTE: Since each dependent resource is a target for scale up/down, therefore it is mandatory that the resource reference points a kubernetes resource which has a `scale` subresource.

### ScaleInfo

How to scale a `DependentResourceInfo` is captured in `ScaleInfo`. It has the following properties:

| Name | Type | Required | Default Value | Description |
| --- | --- | --- | --- | --- |
| level | int | Yes | NA | Detailed below. |
| initialDelay | metav1.Duration | No | 0s (No initial delay) | Once a decision is taken to scale a resource then via this property a delay can be induced before triggering the scale of the dependent resource. |
| timeout | metav1.Duration | No | 30s | Defines the timeout for the scale operation to finish for a dependent resource. |

**Determining target replicas**

Prober cannot assume any target replicas during a scale-up operation for the following reasons:

1. Kubernetes resources could be set to provide highly availability and the number of replicas could wary from one shoot control plane to the other. In gardener the number of replicas of pods in shoot namespace are controlled by the [shoot control plane configuration](/docs/guides/high-availability/control-plane/).
1. If Horizontal Pod Autoscaler has been configured for a kubernetes dependent resource then it could potentially change the `spec.replicas` for a deployment/statefulset.

Given the above constraint lets look at how prober determines the target replicas during scale-down or scale-up operations.

1. `Scale-Up`: Primary responsibility of a probe while performing a scale-up is to restore the replicas of a kubernetes dependent resource prior to scale-down. In order to do that it updates the following for each dependent resource that requires a scale-up:
   1. `spec.replicas`: Checks if `dependency-watchdog.gardener.cloud/replicas` is set. If it is, then it will take the value stored against this key as the target replicas. To be a valid value it should always be greater than 0.
   1. If `dependency-watchdog.gardener.cloud/replicas` annotation is not present then it falls back to the hard coded default value for scale-up which is set to 1.
   1. Removes the annotation `dependency-watchdog.gardener.cloud/replicas` if it exists.

1. `Scale-Down`: To scale down a dependent kubernetes resource it does the following:
   1. Adds an annotation `dependency-watchdog.gardener.cloud/replicas` and sets its value to the current value of `spec.replicas`.
   1. Updates `spec.replicas` to 0.

**Level**

Each dependent resource that should be scaled up or down is associated to a level. Levels are ordered and processed in ascending order (starting with 0 assigning it the highest priority). Consider the following configuration:

```yaml
dependentResourceInfos:
  - ref: 
      kind: "Deployment"
      name: "kube-controller-manager"
      apiVersion: "apps/v1"
    scaleUp: 
      level: 1 
    scaleDown: 
      level: 0 
  - ref:
      kind: "Deployment"
      name: "machine-controller-manager"
      apiVersion: "apps/v1"
    scaleUp:
      level: 1
    scaleDown:
      level: 1
  - ref:
      kind: "Deployment"
      name: "cluster-autoscaler"
      apiVersion: "apps/v1"
    scaleUp:
      level: 0
    scaleDown:
      level: 2
```
Let us order the dependent resources by their respective levels for both scale-up and scale-down. We get the following order:

*Scale Up Operation*

Order of scale up will be:
1. cluster-autoscaler
1. kube-controller-manager and machine-controller-manager will be scaled up concurrently after cluster-autoscaler has been scaled up.

*Scale Down Operation*

Order of scale down will be:
1. kube-controller-manager
1. machine-controller-manager after (1) has been scaled down.
1. cluster-autoscaler after (2) has been scaled down.

### Disable/Ignore Scaling
A probe can be configured to ignore scaling of configured dependent kubernetes resources.
To do that one must set `dependency-watchdog.gardener.cloud/ignore-scaling` annotation to `true` on the scalable resource for which scaling should be ignored.

## Weeder

Dependency watchdog weeder command also (just like the prober command) takes command-line-flags which are meant to fine-tune the weeder. In addition a `ConfigMap` is also mounted to the container which helps in defining the dependency of pods on endpoints.

### Command Line Arguments

Weeder can be configured with the same flags as that for prober described under [command-line-arguments](#command-line-arguments) section
You can find an example weeder [deployment](https://github.com/gardener/dependency-watchdog/blob/master/example/04-dwd-weeder-deployment.yaml) YAML to see how these command line args are configured.

### Weeder Configuration

Weeder configuration is mounted as `ConfigMap` to the container. The path to the config file is configured via `config-file` command line argument as mentioned above. Weeder will start one go routine per podSelector per endpoint on an endpoint event as described in [weeder internal concepts](/docs/other-components/dependency-watchdog/concepts/weeder/#internals).

You can view the example YAML configuration provided as `data` in a `ConfigMap` [here](https://github.com/gardener/dependency-watchdog/blob/master/example/02-dwd-weeder-configmap.yaml).

| Name | Type | Required | Default Value | Description |
| --- | --- | --- | --- | --- |
| watchDuration | *metav1.Duration | No | 5m0s | The time duration for which watch is kept on dependent pods to see if anyone turns to `CrashLoopBackoff` |
| servicesAndDependantSelectors | map[string]DependantSelectors | Yes | NA | Endpoint name and its corresponding dependent pods. More info below. |

### DependantSelectors

If the service recovers from downtime, then weeder starts to watch for CrashLoopBackOff pods. These pods are identified by info stored in this property.

| Name | Type | Required | Default Value | Description |
| --- | --- | --- | --- | --- |
| podSelectors | []*metav1.LabelSelector | Yes | NA | This is a list of [Label selector](https://pkg.go.dev/k8s.io/apimachinery/pkg/apis/meta/v1@v0.24.3#LabelSelector) |
