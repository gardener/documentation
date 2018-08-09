---
title: Access my service from outside Kubernetes cluster
description: "Is there an ingress deployed and how is it configured"
type: tutorial-page
level: beginner
index: 150
reviewer: Tieyan Fu
status: Reviewed
last_reviewed: 07.06.2018
category: Services
scope: app-developer
---

## TL;DR
To expose your application / service for access from outside the cluster, following options exist:
- Kubernetes Service of type `LoadBalancer`
- Kubernetes Service of type 'NodePort' + Ingress



This tutorial discusses how to enable access to your application from outside Kubernetes cluster (sometimes called 
North-South traffic).   For internal communication amongst pods and services (sometimes called East-West traffic) there 
are many literatures, [here](https://cloudnativelabs.github.io/post/2017-04-18-kubernetes-networking/) is one brief example.

## Service Types
A Service in Kubernetes is an abstraction which defines a logical set of Pods and a policy by which to access them.  
Services can be exposed in different ways by specifying a **type** in the service spec,
and different types determine accessibility from inside and outside of cluster.
- ClusterIP
- NodePort
- LoadBalancer

Type `ExternalName` is a special case of service and not discussed here.


### Type ClusterIP
A service of type `ClusterIP` exposes service on an internal IP in the cluster, which makes the service **only reachable** 
from within the cluster.  This is the default value if no type is specified.

```yaml
apiVersion: apps/v1beta2
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  selector:
    matchLabels:
      app: nginx-app
  replicas: 1
  template:
    metadata:
      labels:
        app: nginx-app
    spec:
      containers:
      - name: nginx
        image: nginx:1.13.12
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: nginx-app
  name: nginx-svc
  namespace: default
spec:
  type: ClusterIP  # use ClusterIP as type here
  ports:
    - port: 80
  selector:
    app: nginx-app
```


Execute following commands to create deployement and service

```shell
kubectl create -f <Your yaml file name>
```

Checking the service status
```shell
$ kubectl get svc nginx-svc
NAME        TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE
nginx-svc   ClusterIP   100.66.125.61   <none>        80/TCP    45m
```

As shown above, the service is assigned with a cluster ip address and port 80 as defined in yaml file.    You can test 
the service as below:

```shell

# list all existing pods in cluster
$ kubectl get po
NAME                                           READY     STATUS        RESTARTS   AGE
docker-nodejs-app-76b77494-vwv4d               1/1       Running       0          11d
nginx-deployment-74d949bf69-nvdzs              1/1       Running       0          1h
privileged-pod                                 1/1       Running       0          11d

# test service from within the cluster on the same pod
$ kubectl exec -it nginx-deployment-74d949bf69-nvdzs  curl 100.66.125.61:80
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   612  100   612    0     0  1006k      0 --:--:-- --:--:-- --:--:--  597k
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>
...
```

>  <i class="fa fa-gittip" aria-hidden="true"></i> Tip
> - The service is also accessible from any container (even on different pod) within the same cluster, e.g. `kubectl -it exec <another POD_NAME> curl <YourServiceClusterIP:YourPort>`.
>   You need to make sure command `curl` is installed in the container.
> - You can also find out the dns name of the ClusterIP by command `kubectl exec -it <POD_NAME> nslookup <ClusterIP>`, 
then replace the IP address with the resolved name in your test.
> The resolved name typically looks like `nginx-svc.default.svc.cluster.local` where `nginx-svc` is the name of your 
service defined in yaml.



### Type NodePort
Following previous example, just replace the type with `NodePort`

```yaml
...
 spec:
   type: NodePort
   ports:
     - port: 80
...
```

A service of type `NodePort` is **a ClusterIP service with an additional capability: it is reachable at the IP address 
of the node as well as at the assigned cluster IP on the services network.**
The way this is accomplished is pretty straightforward: when Kubernetes creates a NodePort service kube-proxy allocates
a port in the range 30000–32767 and opens this port on every node (thus the name “NodePort”).
Connections to this port are forwarded to the service’s cluster IP. If we create the service above and run 
`kubectl get svc <your-service>`, we can see the NodePort that has been allocated for it.

Notice in following example, in addition to port 80, port **32521** has been opened as well on node, in contrast to 
the output of "ClusterIP" case where only port 80 is opened.

```shell
$ kubectl get svc nginx-svc
NAME        TYPE       CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
nginx-svc   NodePort   100.70.105.182   <none>        80:32521/TCP   16m
```

Therefore you can access the service *from within the cluster* with two options:

- Access via ClusterIP:port

```shell
#via ClusterIP
kubectl exec -it nginx-deployment-74d949bf69-7n6bs curl 100.70.105.182:80

#via internal name of ClusterIP
kubectl exec -it nginx-deployment-74d949bf69-7n6bs curl nginx-svc.default.svc.cluster.local:80
```

- Access via NodeIP:NodePort

```shell

# First find out the Node IP address
$ kubectl describe node
Name:               ip-10-250-20-203.eu-central-1.compute.internal
Roles:              node
Addresses:
  InternalIP:   10.250.20.203
  InternalDNS:  ip-10-250-20-203.eu-central-1.compute.internal
  Hostname:     ip-10-250-20-203.eu-central-1.compute.internal
...


#via NodeIP:NodePort
kubectl exec -it nginx-deployment-74d949bf69-7n6bs curl 10.250.20.203:32521

#via internal name of NodeIP
kubectl exec -it nginx-deployment-74d949bf69-7n6bs curl ip-10-250-20-203.eu-central-1.compute.internal:32521
```



### Type LoadBalancer

`LoadBalancer` type is the simplest approach, which is created by specifying type as `LoadBalancer`.

```yaml
apiVersion: apps/v1beta2
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  selector:
    matchLabels:
      app: nginx-app
  replicas: 1
  template:
    metadata:
      labels:
        app: nginx-app
    spec:
      containers:
      - name: nginx
        image: nginx:1.13.12
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: nginx-app
  name: nginx-svc
  namespace: default
spec:
  type: LoadBalancer  # use LoadBalancer as type here
  ports:
    - port: 80
  selector:
    app: nginx-app
```

Once the service is created, it contains an external-ip as following:

```shell
$ kubectl get services -l app=nginx-app -o wide
NAME        TYPE           CLUSTER-IP       EXTERNAL-IP                                                                  PORT(S)        AGE       SELECTOR
nginx-svc   LoadBalancer   100.67.182.148   a54a62300696611e88ba00af02406931-1787163476.eu-central-1.elb.amazonaws.com   80:31196/TCP   9m        app=nginx-app
```

A service of type LoadBalancer **has all the capabilities of a NodePort service plus the ability to build out a complete 
ingress path**.  Hence the service can be accessible from outside the cluster without additional components(e.g. Ingress).
To test the External-IP from outside cluster, try following (note that curl command is triggered locally):

```shell

$ curl http://a54a62300696611e88ba00af02406931-1787163476.eu-central-1.elb.amazonaws.com

StatusCode        : 200
StatusDescription : OK
Content           : <!DOCTYPE html>
                    <html>
                    <head>
                    <title>Welcome to nginx!</title>
                    <style>
                        body {
                            width: 35em;
                            margin: 0 auto;
                            font-family: Tahoma, Verdana, Arial, sans-serif;
                        }
                    </style>
                    <...
RawContent        : HTTP/1.1 200 OK
...
```

Obviously the service can also be accessed from within the cluster.  You can tests the same way as described in section `NodePort`.


## LoadBalancer vs. Ingress

As presented in previous section,  only `LoadBalancer` type of service can enable access from outside the cluster. 
However this approach has its own limitation.
You cannot configure load balancer to terminate HTTPS traffic, virtual hosts or path-based routing.   In Kubernetes 1.2 
a separate resource called [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/#alternatives) is 
introduced.

### Why an Ingress

LoadBalancer services are all about extending a single service to support external clients. By contrast an Ingress is a 
separate resource that configures a load balancer much more flexibly.
The Ingress API supports TLS termination, virtual hosts, and path-based routing. It can easily set up a load balancer to
 handle multiple backend services.  In addition, there is also difference
in how the traffic routing is realized . In the case of the LoadBalancer service, the traffic that enters through the 
external load balancer is forwarded to the kube-proxy that in turn forwards
the traffic to the selected pods. In contrast, the Ingress load balancer forwards the traffic straight to the selected 
pods which is more efficient.

Every service of the "LoadBalancer" type will be charged by the cloud provider for at least 40$/month. Ten Services ends 
up in 400$/month just for the load balancing.
 

### How to use the ingress?
In the cluster, a nginx-ingress controller has been deployed for you as an LB service and also registered the DNS
record. Depending on how your cluster is defined, the DNS registration is performed under following conventions:

- **k8s-hana.ondemand.com**

`<gardener_cluster_name>.<gardener_project_name>.shoot.canary.k8s-hana.ondemand.com`.


Both `<gardener_cluster_name>` and `<gardener_project_name>` are defined in Gardener which can be determined on Gardener dashboard.


This results in the following default DNS endpoints:
* `api.<cluster_domain>` Kubernetes API
* `*.ingress.<cluster_domain>` Internal nginx ingress

### Example: Configure an Ingress resource with Service type: NodePort

With the configuration below you can reach your service **nginx-svc** with:
 
 **http://test.ingress.&lt;GARDENER-CLUSTER-NAME&gt;.&lt;GARDENER-PROJECT-NAME&gt;.shoot.canary.k8s-hana.ondemand.com**


```yaml
apiVersion: apps/v1beta2
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  selector:
    matchLabels:
      app: nginx-app
  replicas: 1
  template:
    metadata:
      labels:
        app: nginx-app
    spec:
      containers:
      - name: nginx
        image: nginx:1.13.12
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: nginx-app
  name: nginx-svc
  namespace: default
spec:
  type: NodePort
  ports:
    - port: 80
  selector:
    app: nginx-app

---
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: nginxsvc-ingress
spec:
  rules:
  - host: nginxsvc.ingress.eecluster.cpet.shoot.canary.k8s-hana.ondemand.com
    http:
      paths:
      - backend:
          serviceName: nginx-svc
          servicePort: 80
```

You can show the created ingress entry and test it.
```shell
$ kubectl get ing
NAME                    HOSTS                                                               ADDRESS         PORTS     AGE
nginxsvc-ingress        nginxsvc.ingress.eecluster.cpet.shoot.canary.k8s-hana.ondemand.com  10.250.20.203   80        29s

$ curl nginxsvc.ingress.eecluster.cpet.shoot.canary.k8s-hana.ondemand.com

StatusCode        : 200
StatusDescription : OK
Content           : <!DOCTYPE html>
                    <html>
                    <head>
                    <title>Welcome to nginx!</title>
                    <style>
                        body {
                            width: 35em;
                            margin: 0 auto;
                            font-family: Tahoma, Verdana, Arial, sans-serif;
...
```


## Reference:
- [Concepts: Kubernetes Service](https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types)
- [Concepts: Connecting Applications with Services](https://kubernetes.io/docs/concepts/services-networking/connect-applications-service/#exposing-the-service)
- [Tutorial: Using a Service to Expose Your App](https://kubernetes.io/docs/tutorials/kubernetes-basics/expose/expose-intro/)
- [Tutorial: Using Source IP](https://kubernetes.io/docs/tutorials/services/source-ip)
- [Kubernetes Networking](https://medium.com/google-cloud/understanding-kubernetes-networking-pods-7117dd28727)
- [Accessing Kubernetes Pods from Outside of the Cluster](http://alesnosek.com/blog/2017/02/14/accessing-kubernetes-pods-from-outside-of-the-cluster/)

