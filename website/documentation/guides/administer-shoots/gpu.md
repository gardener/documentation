---
title: AI/ML Workloads on GPU Clusters
linkTitle: AI/ML Workloads on GPU Clusters
newsSubtitle: Setting up a GPU Enabled Cluster for AI/ML Workloads
description: Setting up a GPU Enabled Cluster for AI/ML Workloads
publishdate: 2025-10-26T00:00:00.000Z
level: intermediate
category: Setup
scope: app-developer
authors:
  - email: vedran.lerenc@sap.com
prev: false
next: false
---

# AI/ML Workloads on GPU Clusters

> [!NOTE]
> This guide focuses on NVIDIA accelerators, as Gardener provides first-class support for them, enabling a robust and conformant environment for GPU-powered applications.

## Introduction

Gardener has joined the [CNCF Kubernetes AI Conformance](https://github.com/cncf/ai-conformance) program. This certification validates that Gardener provides a standardized, reliable platform capable of handling the demanding requirements of modern AI and machine learning workloads, ensuring that your GPU-accelerated applications run on a proven and conformant infrastructure.

This guide walks you through provisioning GPU-enabled Kubernetes clusters with Gardener and configuring them for production AI/ML workloads.

## Prerequisites

Before you begin, ensure you have:

- Access to a Gardener project with appropriate permissions
- Requested GPU quota from your cloud provider (e.g., `g4dn` instances on AWS, `Standard_NC` series on Azure, or `n1-standard` with GPUs on GCP)
- `kubectl` and `helm` installed locally

> [!IMPORTANT]
> Due to high demand for GPU resources, availability may be limited in certain regions. Plan your cluster location accordingly and request quota in advance.

## Step 1: Provision a GPU-Enabled Cluster

To create a Gardener-managed Kubernetes cluster with GPU-enabled worker nodes, you need to configure the `provider.workers` section in your `shoot` manifest with a GPU-enabled machine type and a compatible operating system.

### Shoot Configuration Example

Here's an example `shoot` manifest that defines a worker pool with AWS `g4dn.xlarge` instances running Garden Linux:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
  name: my-cluster
  namespace: garden-my-project
spec:
  cloudProfileName: aws
  region: eu-central-1

  kubernetes:
    version: "1.33.0"

  provider:
    type: aws
    workers:
      - name: worker-gpu
        minimum: 1
        maximum: 3
        machine:
          type: g4dn.xlarge  # GPU-enabled machine type
          image:
            name: gardenlinux
            version: "1877.5.0"  # Use a supported Garden Linux version
          architecture: amd64
        zones:
          - eu-central-1a
  ...
```

Key configuration points:

- **Machine Type**: Select a GPU-enabled machine type from your cloud provider (check our `cloudprofiles` for available options)
- **Operating System**: Garden Linux is fully supported by the NVIDIA GPU Operator
- **Zones**: Ensure GPU instances are available in your selected zones

After applying this manifest, Gardener will provision your cluster with GPU-enabled worker nodes.

## Step 2: Install the NVIDIA GPU Operator

Once your cluster is running, the GPU hardware is not yet usable by Kubernetes workloads. You must install the **NVIDIA GPU Operator**, which automates the management of all necessary NVIDIA software components:

- NVIDIA drivers
- NVIDIA Container Toolkit
- Kubernetes device plugin for GPUs
- DCGM (Data Center GPU Manager) for monitoring
- GPU Feature Discovery

### Installation with Helm

The recommended installation method uses the NVIDIA Helm chart with Garden Linux-specific configuration:

1. **Add the NVIDIA Helm repository:**

   ```bash
   helm repo add nvidia https://helm.ngc.nvidia.com/nvidia
   helm repo update
   ```

2. **Install the operator with Garden Linux configuration:**

   ```bash
   helm upgrade --install --create-namespace -n gpu-operator gpu-operator nvidia/gpu-operator \
     --values https://raw.githubusercontent.com/gardenlinux/gardenlinux-nvidia-installer/refs/heads/main/helm/gpu-operator-values.yaml
   ```

### Verification

After installation completes, verify that GPU resources are available to Kubernetes:

```bash
# Check that GPU resources are visible
kubectl describe nodes | grep "nvidia.com/gpu"

# Verify GPU operator pods are running
kubectl get pods -n gpu-operator

# Check GPU capacity on nodes
kubectl get nodes -o jsonpath='{range .items[?(@.status.allocatable.nvidia\.com/gpu)]}{.metadata.name}: {.status.allocatable.nvidia\.com/gpu}{"\n"}{end}'
```

You should see `nvidia.com/gpu` listed in the `Capacity` and `Allocatable` resources of your GPU nodes.

## Step 3: Run a Test Workload

To confirm everything is working, deploy a simple pod that requests a GPU and runs `nvidia-smi`:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: gpu-test
spec:
  restartPolicy: Never
  containers:
  - name: cuda-container
    image: nvcr.io/nvidia/cuda:12.1.1-base-ubuntu22.04
    command: ["nvidia-smi"]
    resources:
      limits:
        nvidia.com/gpu: 1
```

Apply and check the logs:

```bash
kubectl apply -f gpu-test-pod.yaml
kubectl logs gpu-test
```

You should see the `nvidia-smi` output showing your GPU details.

## Advanced Topics

### Secure Accelerator Access

Gardener clusters ensure that GPU access is properly isolated. This provides critical security guarantees:

- **No Unauthorized Access**: Pods that do not explicitly request `nvidia.com/gpu` resources cannot see or access any GPU devices, even if scheduled on a GPU node
- **Workload Isolation**: A container that requests GPUs will only see and use the specific devices allocated to it, preventing interference with other workloads

This isolation is enforced by the NVIDIA device plugin and container runtime, ensuring secure multi-tenant GPU usage.

For detailed validation of these security properties, see the [Secure Accelerator Access example](https://github.com/gardener/gardener-ai-conformance/tree/main/v1.33/secure_accelerator_access) in our AI Conformance repository.

### Exposing GPU Metrics

The NVIDIA GPU Operator automatically deploys the **DCGM Exporter**, which exposes comprehensive GPU metrics in Prometheus format, including:

- GPU utilization
- Memory usage (used/free)
- Temperature
- Power consumption
- Clock speeds

#### Integrating with Your Monitoring Stack

The DCGM Exporter service is available at `nvidia-dcgm-exporter.gpu-operator.svc` on port `9400` and can be scraped by any Prometheus-compatible monitoring solution.

If you're using **Prometheus Operator**, you can create a `ServiceMonitor` to automatically configure scraping:

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: nvidia-dcgm-exporter
  namespace: gpu-operator
spec:
  selector:
    matchLabels:
      app: nvidia-dcgm-exporter
  endpoints:
  - port: metrics
    interval: 15s
```

For other monitoring solutions, configure them to scrape the endpoint directly:
- **Service**: `nvidia-dcgm-exporter.gpu-operator.svc:9400`
- **Metrics path**: `/metrics`
- **Format**: Prometheus exposition format

For a complete example, see the [Accelerator Metrics guide](https://github.com/gardener/gardener-ai-conformance/tree/main/v1.33/accelerator_metrics).

### Autoscaling GPU Workloads with HPA

You can use GPU metrics to autoscale your AI/ML workloads with a HorizontalPodAutoscaler (HPA), allowing you to scale applications based on actual GPU utilization rather than just CPU or memory.

HPA autoscaling with custom GPU metrics requires a complete metrics pipeline. Understanding this architecture is crucial:

```
DCGM Exporter → Prometheus → prometheus-adapter → custom.metrics.k8s.io API → HPA
```

The HPA controller (part of kube-controller-manager) can only query the Kubernetes API Server for metrics. The API Server itself doesn't collect or store metrics - it delegates to registered metrics APIs:
- **metrics.k8s.io** (resource metrics like CPU/memory, provided by metrics-server)
- **custom.metrics.k8s.io** (custom metrics, requires an adapter)
- **external.metrics.k8s.io** (external metrics, requires an adapter)

For GPU metrics to be available to HPA, you **must** deploy a solution that implements the `custom.metrics.k8s.io` API - it's a fundamental part of Kubernetes' metrics architecture.

**Common alternatives to prometheus-adapter:**
- [KEDA](https://keda.sh/) - Event-driven autoscaling with support for many metric sources
- Custom metrics adapter - Build your own adapter that reads directly from DCGM
- Cloud provider-specific adapters (AWS CloudWatch, Azure Monitor, GCP Monitoring)

However, **prometheus-adapter** is the most common and well-supported solution for custom metrics in Kubernetes.

The complete setup involves four main components:

1. **ServiceMonitor**: Configure Prometheus to scrape DCGM Exporter metrics (see ["Integrating with Your Monitoring Stack"](#integrating-with-your-monitoring-stack) above)

2. **PrometheusRule**: Create recording rules to aggregate raw DCGM metrics into stable, pod-level custom metrics:
   ```yaml
   apiVersion: monitoring.coreos.com/v1
   kind: PrometheusRule
   metadata:
     name: gpu-custom-metrics
     namespace: monitoring
   spec:
     groups:
     - name: gpu-metrics
       rules:
       - record: pod_gpu_utilization
         expr: label_replace(label_replace(DCGM_FI_DEV_GPU_UTIL, "pod", "$1", "exported_pod", "(.*)"), "namespace", "$1", "exported_namespace", "(.*)")
   ```

3. **Prometheus Adapter**: Deploy prometheus-adapter to expose Prometheus metrics via the `custom.metrics.k8s.io` API:
   ```bash
   helm install prometheus-adapter prometheus-community/prometheus-adapter \
     --namespace monitoring \
     --set prometheus.url=http://prometheus-server.monitoring.svc \
     --set rules.custom[0].seriesQuery='pod_gpu_utilization{pod!=""}' \
     --set rules.custom[0].name.as='pod_gpu_utilization' \
     --set rules.custom[0].metricsQuery='avg(<<.Series>>{<<.LabelMatchers>>}) by (<<.GroupBy>>)'
   ```

4. **HPA**: Configure an HPA to use the custom GPU metric for scaling decisions:
   ```yaml
   apiVersion: autoscaling/v2
   kind: HorizontalPodAutoscaler
   metadata:
     name: gpu-workload-hpa
     namespace: your-namespace
   spec:
     scaleTargetRef:
       apiVersion: apps/v1
       kind: Deployment
       name: gpu-workload
     minReplicas: 1
     maxReplicas: 2
     metrics:
     - type: Pods
       pods:
         metric:
           name: pod_gpu_utilization
         target:
           type: AverageValue
           averageValue: "10"  # Target 10% GPU utilization
   ```

For a complete, step-by-step guide with all necessary manifests, see the [Pod Autoscaling example](https://github.com/gardener/gardener-ai-conformance/tree/main/v1.33/pod_autoscaling).

### Dynamic Resource Allocation (DRA)

For more flexible and fine-grained GPU management beyond simple device counts, you can enable [**Dynamic Resource Allocation (DRA)**](https://kubernetes.io/docs/concepts/scheduling-eviction/dynamic-resource-allocation/). DRA enables advanced resource claims, flexible device filtering using common expression language (CEL), or sharing GPUs across workloads.

To enable DRA, activate the corresponding feature gates in your `shoot` manifest:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
spec:
  kubernetes:
    version: "1.33.0"
    kubeAPIServer:
      featureGates:
        DynamicResourceAllocation: true
      runtimeConfig:
        resource.k8s.io/v1beta1: true
    kubeControllerManager:
      featureGates:
        DynamicResourceAllocation: true
    kubeScheduler:
      featureGates:
        DynamicResourceAllocation: true
    kubelet:
      featureGates:
        DynamicResourceAllocation: true
```

> [!NOTE]
> In Kubernetes v1.33, DRA is available via the `v1beta1` API. The `v1` API will be available in Kubernetes v1.34 and later.

For more details, see the [DRA Support example](https://github.com/gardener/gardener-ai-conformance/tree/main/v1.33/dra_support).

### AI/ML Workload Controllers

For running distributed AI/ML applications, using a specialized workload controller is highly recommended. **KubeRay**, for example, simplifies the deployment and management of your AI/ML workload on Kubernetes, enabling distributed training and inference workloads.

Gardener provides a conformant environment to run such operators. The operator handles:

- Cluster lifecycle management
- Autoscaling of worker nodes
- Job scheduling and execution
- Service exposure

For a detailed example of installing and using KubeRay on a Gardener cluster, see the [GPU Workload Controller example](https://github.com/gardener/gardener-ai-conformance/tree/main/v1.33/robust_controller).

### Gang Scheduling

Distributed training jobs often require all of their pods (the "gang") to be scheduled simultaneously. This "all-or-nothing" behavior prevents deadlocks and wasted resources when some pods are scheduled but others cannot be due to resource constraints.

Kubernetes does not provide gang scheduling out-of-the-box, but it can be added with schedulers like [**Kueue**](https://kueue.sigs.k8s.io/), [**Grove**](https://github.com/ai-dynamo/grove), or similar solutions.

Gang scheduling is critical for:

- Multi-GPU training frameworks (PyTorch DDP, Horovod, DeepSpeed)
- Distributed training systems (TensorFlow, JAX, MPI)
- Efficient GPU utilization in multi-tenant environments

For a complete example of setting up Kueue for gang scheduling on a Gardener cluster, refer to the [Gang Scheduling example](https://github.com/gardener/gardener-ai-conformance/tree/main/v1.33/gang_scheduling).

### Advanced Inference with Gateway API

For production AI inference services, the Kubernetes **Gateway API** provides advanced traffic management capabilities beyond standard Ingress resources:

- **Weighted traffic splitting** for A/B testing and canary deployments
- **Header-based routing** (e.g., `X-Model-Version` for model version selection)
- **Gradual rollouts** between model versions
- **Cross-namespace routing** with ReferenceGrant for secure multi-tenant deployments

You need to install a Gateway controller (e.g., Traefik, Envoy Gateway, Istio) separately.

For a complete example, see the [AI Inference example](https://github.com/gardener/gardener-ai-conformance/tree/main/v1.33/ai_inference).

## Troubleshooting

### GPU Operator Installation Issues

**Driver pod fails to start:**

```bash
# Check driver pod logs
kubectl logs -n gpu-operator -l app=nvidia-driver-daemonset

# Verify Garden Linux values file was used
helm get values gpu-operator -n gpu-operator
```

**GPU resources not visible:**

```bash
# Check device plugin status
kubectl get pods -n gpu-operator -l app=nvidia-device-plugin-daemonset
kubectl logs -n gpu-operator -l app=nvidia-device-plugin-daemonset

# Verify driver completed successfully first
kubectl get pods -n gpu-operator | grep nvidia-driver
```

**Components stuck in Init state:**

This is normal behavior during driver installation. Components wait for the driver to be ready before starting. Driver installation can take 5-15 minutes depending on network speed and node resources.

```bash
# Monitor driver installation progress
kubectl logs -n gpu-operator -l app=nvidia-driver-daemonset -f
```

### Workload Issues

**Pod stuck in Pending state:**

```bash
# Check if GPU resources are available
kubectl describe node <gpu-node-name> | grep -A 5 "Allocated resources"

# Check pod events
kubectl describe pod <pod-name>
```

**GPU not accessible in container:**

Ensure your pod spec includes a GPU resource request:

```yaml
resources:
  limits:
    nvidia.com/gpu: 1
```

## Related Links

### Gardener AI Conformance

- [Gardener AI Conformance Repository](https://github.com/gardener/gardener-ai-conformance)
- [CNCF AI Conformance Working Group](https://github.com/cncf/ai-conformance)

### Examples and Guides

- [Secure Accelerator Access](https://github.com/gardener/gardener-ai-conformance/tree/main/v1.33/secure_accelerator_access)
- [Exposing GPU Metrics](https://github.com/gardener/gardener-ai-conformance/tree/main/v1.33/accelerator_metrics)
- [Cluster Autoscaling](https://github.com/gardener/gardener-ai-conformance/tree/main/v1.33/cluster_autoscaling)
- [Pod Autoscaling with GPU Metrics](https://github.com/gardener/gardener-ai-conformance/tree/main/v1.33/pod_autoscaling)
- [Dynamic Resource Allocation (DRA)](https://github.com/gardener/gardener-ai-conformance/tree/main/v1.33/dra_support)
- [GPU Workload Controller (KubeRay)](https://github.com/gardener/gardener-ai-conformance/tree/main/v1.33/robust_controller)
- [Gang Scheduling (Kueue)](https://github.com/gardener/gardener-ai-conformance/tree/main/v1.33/gang_scheduling)
- [AI Inference with Gateway API](https://github.com/gardener/gardener-ai-conformance/tree/main/v1.33/ai_inference)

### External Resources

- [NVIDIA GPU Operator Documentation](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/overview.html)
- [Garden Linux NVIDIA Installer](https://github.com/gardenlinux/gardenlinux-nvidia-installer)
