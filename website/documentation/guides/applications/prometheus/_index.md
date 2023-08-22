---
title: Using Prometheus and Grafana to Monitor K8s
description: "How to deploy and configure Prometheus and Grafana to collect and monitor kubelet container metrics"
level: advanced
category: Monitoring
scope: app-developer
---

## Disclaimer
This post is meant to give a basic end-to-end description for deploying and using Prometheus and Grafana. Both 
applications offer a wide range of flexibility, which needs to be considered in case you have specific requirements. 
Such advanced details are not in the scope of this topic.

## Introduction

[Prometheus](https://prometheus.io/) is an open-source systems monitoring and alerting toolkit for recording numeric 
time series. It fits both machine-centric monitoring as well as monitoring of highly dynamic service-oriented 
architectures. In a world of microservices, its support for multi-dimensional data collection and querying is a
particular strength. 

Prometheus is the second hosted project to [graduate within CNCF](https://prometheus.io/blog/2018/08/09/prometheus-graduates-within-cncf/).

The following characteristics make Prometheus a good match for monitoring Kubernetes clusters:

-   Pull-based Monitoring   
Prometheus is a [pull-based](https://prometheus.io/blog/2016/07/23/pull-does-not-scale-or-does-it/) monitoring system, 
which means that the Prometheus server dynamically discovers and pulls metrics from your services running in Kubernetes. 

-   Labels
Prometheus and Kubernetes share the same label (key-value) concept that can be used to select objects in the system.  
Labels are used to identify time series and sets of label matchers can be used in the query language 
([PromQL](https://prometheus.io/docs/prometheus/latest/querying/basics/)) to select the time series to be aggregated.

-   Exporters  
There are many [exporters](https://prometheus.io/docs/instrumenting/exporters/) available, which enable integration of 
databases or even other monitoring systems not already providing a way to export metrics to Prometheus. 
One prominent exporter is the so called [node-exporter](https://github.com/prometheus/node_exporter), which allows to 
monitor hardware and OS related metrics of Unix systems.

-   Powerful Query Language   
The Prometheus query language [PromQL](https://prometheus.io/docs/prometheus/latest/querying/basics/) lets the user 
select and aggregate time series data in real time. Results can either be shown as a graph, viewed 
as tabular data in the Prometheus expression browser, or consumed by external systems via the [HTTP API](https://prometheus.io/docs/prometheus/latest/querying/api/).

Find query examples on [Prometheus Query Examples](https://github.com/infinityworks/prometheus-example-queries/blob/master/README.md).

One very popular open-source visualization tool not only for Prometheus is [Grafana](https://grafana.com). Grafana is a 
metric analytics and visualization suite. It is popular for visualizing time series data for infrastructure
and application analytics but many use it in other domains including industrial sensors, home automation, weather, and
process control. For more information, see the [Grafana Documentation](http://docs.grafana.org/).

Grafana accesses data via [Data Sources](https://grafana.com/docs/grafana/latest/basics/). The continuously growing 
list of supported backends includes Prometheus.

Dashboards are created by combining panels, e.g. [Graph](http://docs.grafana.org/reference/graph/) and [Dashlist](http://docs.grafana.org/reference/dashlist/). 


In this example, we describe an End-To-End scenario including the deployment of Prometheus and a basic monitoring 
configuration as the one provided for Kubernetes clusters created by Gardener. 


If you miss elements on the Prometheus web page when accessing it via its service URL `https://<your K8s FQN>/api/v1/namespaces/<your-prometheus-namespace>/services/prometheus-prometheus-server:80/proxy`, 
this is probably caused by a Prometheus issue - [#1583](https://github.com/prometheus/prometheus/issues/1583) 
To workaround this issue, setup a port forward `kubectl port-forward -n <your-prometheus-namespace> <prometheus-pod> 9090:9090` 
on your client and access the Prometheus UI from there with your locally installed web browser. This issue is not relevant 
in case you use the service type `LoadBalancer`.


## Preparation

The deployment of [Prometheus](https://github.com/kubernetes/charts/tree/master/stable/prometheus) and [Grafana](https://github.com/kubernetes/charts/tree/master/stable/grafana) is based on Helm charts.  
Make sure to implement the [Helm settings](https://github.com/gardener/documentation/blob/master/website/documentation/guides/client-tools/helm/_index.md) before deploying the Helm charts.

The Kubernetes clusters provided by [Gardener](https://github.com/gardener) use role based 
access control ([RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)). To authorize the Prometheus 
node-exporter to access hardware and OS relevant metrics of your cluster's worker nodes, specific artifacts need to be 
deployed.

Bind the Prometheus service account to the `garden.sapcloud.io:monitoring:prometheus` cluster role by running the command 
`kubectl apply -f crbinding.yaml`.

Content of `crbinding.yaml`   
```yaml
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: <your-prometheus-name>-server
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: garden.sapcloud.io:monitoring:prometheus
subjects:
- kind: ServiceAccount
  name: <your-prometheus-name>-server
  namespace: <your-prometheus-namespace>
```

## Deployment of Prometheus and Grafana
Only minor changes are needed to deploy [Prometheus](https://github.com/kubernetes/charts/tree/master/stable/prometheus) 
and [Grafana](https://github.com/kubernetes/charts/tree/master/stable/grafana) based on Helm charts.  


Copy the following configuration into a file called `values.yaml` and deploy Prometheus: 
`helm install <your-prometheus-name> --namespace <your-prometheus-namespace> stable/prometheus -f values.yaml`

Typically, Prometheus and Grafana are deployed into the same namespace. There is no technical reason behind this, so feel 
free to choose different namespaces. 

Content of `values.yaml` for Prometheus: 
```yaml
rbac:
  create: false # Already created in Preparation step
nodeExporter:
  enabled: false # The node-exporter is already deployed by default

server:
  global:
    scrape_interval: 30s
    scrape_timeout: 30s

serverFiles:
  prometheus.yml:
    rule_files:
      - /etc/config/rules
      - /etc/config/alerts      
    scrape_configs:
    - job_name: 'kube-kubelet'
      honor_labels: false
      scheme: https

      tls_config:
      # This is needed because the kubelets' certificates are not generated
      # for a specific pod IP
        insecure_skip_verify: true
      bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token

      kubernetes_sd_configs:
      - role: node
      relabel_configs:
      - target_label: __metrics_path__
        replacement: /metrics
      - source_labels: [__meta_kubernetes_node_address_InternalIP]
        target_label: instance
      - action: labelmap
        regex: __meta_kubernetes_node_label_(.+)

    - job_name: 'kube-kubelet-cadvisor'
      honor_labels: false
      scheme: https

      tls_config:
      # This is needed because the kubelets' certificates are not generated
      # for a specific pod IP
        insecure_skip_verify: true
      bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token

      kubernetes_sd_configs:
      - role: node
      relabel_configs:
      - target_label: __metrics_path__
        replacement: /metrics/cadvisor
      - source_labels: [__meta_kubernetes_node_address_InternalIP]
        target_label: instance
      - action: labelmap
        regex: __meta_kubernetes_node_label_(.+)

    # Example scrape config for probing services via the Blackbox Exporter.
    #
    # Relabelling allows to configure the actual service scrape endpoint using the following annotations:
    #
    # * `prometheus.io/probe`: Only probe services that have a value of `true`
    - job_name: 'kubernetes-services'
      metrics_path: /probe
      params:
        module: [http_2xx]
      kubernetes_sd_configs:
        - role: service
      relabel_configs:
        - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_probe]
          action: keep
          regex: true
        - source_labels: [__address__]
          target_label: __param_target
        - target_label: __address__
          replacement: blackbox
        - source_labels: [__param_target]
          target_label: instance
        - action: labelmap
          regex: __meta_kubernetes_service_label_(.+)
        - source_labels: [__meta_kubernetes_namespace]
          target_label: kubernetes_namespace
        - source_labels: [__meta_kubernetes_service_name]
          target_label: kubernetes_name
    # Example scrape config for pods
    #
    # Relabelling allows to configure the actual service scrape endpoint using the following annotations:
    #
    # * `prometheus.io/scrape`: Only scrape pods that have a value of `true`
    # * `prometheus.io/path`: If the metrics path is not `/metrics` override this.
    # * `prometheus.io/port`: Scrape the pod on the indicated port instead of the default of `9102`.
    - job_name: 'kubernetes-pods'
      kubernetes_sd_configs:
        - role: pod
      relabel_configs:
        - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
          action: keep
          regex: true
        - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
          action: replace
          target_label: __metrics_path__
          regex: (.+)
        - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
          action: replace
          regex: (.+):(?:\d+);(\d+)
          replacement: ${1}:${2}
          target_label: __address__
        - action: labelmap
          regex: __meta_kubernetes_pod_label_(.+)
        - source_labels: [__meta_kubernetes_namespace]
          action: replace
          target_label: kubernetes_namespace
        - source_labels: [__meta_kubernetes_pod_name]
          action: replace
          target_label: kubernetes_pod_name
    # Scrape config for service endpoints.
    #
    # The relabeling allows the actual service scrape endpoint to be configured
    # via the following annotations:
    #
    # * `prometheus.io/scrape`: Only scrape services that have a value of `true`
    # * `prometheus.io/scheme`: If the metrics endpoint is secured then you will need
    # to set this to `https` & most likely set the `tls_config` of the scrape config.
    # * `prometheus.io/path`: If the metrics path is not `/metrics` override this.
    # * `prometheus.io/port`: If the metrics are exposed on a different port to the
    # service then set this appropriately.
    - job_name: 'kubernetes-service-endpoints'
      kubernetes_sd_configs:
        - role: endpoints
      relabel_configs:
        - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scrape]
          action: keep
          regex: true
        - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scheme]
          action: replace
          target_label: __scheme__
          regex: (https?)
        - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_path]
          action: replace
          target_label: __metrics_path__
          regex: (.+)
        - source_labels: [__address__, __meta_kubernetes_service_annotation_prometheus_io_port]
          action: replace
          target_label: __address__
          regex: (.+)(?::\d+);(\d+)
          replacement: $1:$2
        - action: labelmap
          regex: __meta_kubernetes_service_label_(.+)
        - source_labels: [__meta_kubernetes_namespace]
          action: replace
          target_label: kubernetes_namespace
        - source_labels: [__meta_kubernetes_service_name]
          action: replace
          target_label: kubernetes_name # Add your additional configuration here...
```

Next, deploy Grafana. Since the deployment in this post is based on the Helm default values, the settings below are set 
explicitly in case the default changed.
Deploy Grafana via `helm install grafana --namespace <your-prometheus-namespace> stable/grafana -f values.yaml`. Here, the same namespace is chosen for Prometheus and for Grafana.

Content of `values.yaml` for Grafana: 
```yaml
server:
  ingress:
    enabled: false
  service:
    type: ClusterIP
```

Check the running state of the pods on the Kubernetes Dashboard or by running `kubectl get pods -n <your-prometheus-namespace>`. 
In case of errors, check the log files of the pod(s) in question. 

The text output of Helm after the deployment of Prometheus and Grafana contains very useful information, e.g. the user 
and password of the Grafana Admin user. The credentials are stored as secrets in the namespace `<your-prometheus-namespace>` 
and could be decoded via `kubectl get secret --namespace <my-grafana-namespace> grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo`.

## Basic Functional Tests
To access the web UI of both applications, use port forwarding of port 9090. 

Setup port forwarding for port 9090:

```bash
kubectl port-forward -n <your-prometheus-namespace> <your-prometheus-server-pod> 9090:9090
```

Open `http://localhost:9090` in your web browser. Select Graph from the top tab and enter the following expressing to show the overall CPU usage for a server (see [Prometheus Query Examples](https://github.com/infinityworks/prometheus-example-queries/blob/master/README.md)):

```
100 * (1 - avg by(instance)(irate(node_cpu{mode='idle'}[5m])))
```

This should show some data in a graph.

To show the same data in Grafana setup port forwarding for port 3000 for the 
Grafana pod and open the Grafana Web UI by opening `http://localhost:3000` in a browser. 
Enter the credentials of the admin user.


Next, you need to enter the server name of your Prometheus deployment. This name is shown directly after the 
installation via helm. 

Run
```bash
helm status <your-prometheus-name>
```
to find this name. Below, this server name is referenced by `<your-prometheus-server-name>`.

First, you need to add your Prometheus server as data source: 

1. Select _Dashboards &rightarrow; Data Sources_
2. Select _Add data source_
3. Enter
    _Name_: `<your-prometheus-datasource-name>`  
    _Type_: Prometheus  
    _URL_: `http://<your-prometheus-server-name>`  
    _Access_: `proxy`  
4. Select _Save & Test_

In case of failure, check the Prometheus URL in the Kubernetes Dashboard.

To add a Graph follow these steps:

1. In the left corner, select _Dashboards &rightarrow; New_ to create a new dashboard
2. Select _Graph_ to create a new graph
3. Next, select the _Panel Title &rightarrow; Edit_
4. Select your Prometheus Data Source in the drop down list
5. Enter the expression `100 * (1 - avg by(instance)(irate(node_cpu{mode='idle'}[5m])))` in the entry field A
6. Select the floppy disk symbol (Save) on top

Now you should have a very basic Prometheus and Grafana setup for your Kubernetes cluster. 

As a next step you can implement monitoring for your applications by implementing the [Prometheus client API](https://prometheus.io/docs/instrumenting/clientlibs/).



## Related Links
- [Prometheus](https://prometheus.io/) 
- [Prometheus Helm Chart](https://github.com/kubernetes/charts/tree/master/stable/prometheus) 
- [Prometheus and Kubernetes: A Perfect Match](https://www.weave.works/blog/prometheus-kubernetes-perfect-match/)
- [Grafana](https://grafana.com)
- [Grafana Helm Chart](https://github.com/kubernetes/charts/tree/master/stable/grafana)
