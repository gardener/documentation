---
title: Feature Flags in Kubernetes Applications
description: Implementing feature flags in Kubernetes applicaiton with labels and annotations
type: docs
layout: single-page
remote: https://github.com/gardener-samples/kube-featureflag.git
level: beginner
category: DevOp
scope: app-developer
aliases: ["/readmore/featureflag", "/050-tutorials/content/app/featureflag"]
---
# Feature Flags in Kubernetes Applications

Feature flags are used to change the behavior of a program at runtime without forcing a 
restart. 

Although they are essential in a native cloud environment, they cannot be implemented 
without significant effort on some platforms. **Kubernetes has made this trivial.** Here 
we will **implement them through labels and annotations**, but you can also implement 
them by connecting directly to the Kubernetes API Server.

![teaser](https://raw.githubusercontent.com/gardener-samples/kube-featureflag/master/images/teaser.gif?raw=true)

In Kubernetes, labels are part of the identity of a resource and can be used through 
selectors. Annotations are similar, but do not participate in the identity of a resource and 
cannot be used to select resources. Nevertheless, they can still be used as feature flags 
to enable/disable application logic. 

## Possible Use Cases

 - turn on/off a specific instance
 - turn on/off profiling of a specific instance
 - change the logging level, to capture detailed logs during a specific event
 - change caching strategy at runtime
 - change timeouts in production
 - toggle on/off some special verification


## How does this work
We’ll use the Kubernetes [downwardAPI](https://kubernetes.io/docs/tasks/inject-data-application/downward-api-volume-expose-pod-information/#the-downward-api) ) to expose labels and annotations directly to our application. We’ll 
end up with two files (`labels` and `annotations`) in `/etc/podinfo`. First we add the downward api to spec.volumes. 
Note that it is possible to adding both labels and annotations into the same volume. 

## How to update/toggle the feature
After the deployment of the demo application is done you can easily switch a feature in the application on or off. 
This is done very easily with `kubectl` by changing an annotation in the Pods.

### Deploy demo app/pod

``` 
kubectl apply -f ./yaml/deployment.yaml
```

### Show the log

``` 
kubectl logs featureflag-example -f
```


### Use business feature 2

```` 
kubectl annotate --overwrite pod featureflag-example  businessFeature=implementation2
````

### Use business feature 1

```` 
kubectl annotate --overwrite pod featureflag-example  businessFeature=implementation1
````

## Conclusion
As you can see in the log of the Pod the application switches very fast between the implementations. Everything 
was controlled by annotations on the deployment or Pod. On the whole a very simple and maintainable solution to 
configure parts of the application without restarting the whole application.


## Wrangling labels and annotations from the shell.

```bash 
# Add a label
$ kubectl label pod my-pod-name a-label=foo

# Show labels
$ kubectl get pods --show-labels

# If you only want to show specific labels, use -L=<label1>,<label2>

# Update a label
$ kubectl label pod my-pod-name a-label=bar --override

# Delete a label .Remember the "-" at the end of the line. Required to remove a label
$ kubectl label pod my-pod-name a-label-

# Add an annotation
$ kubectl annotatate pod my-pod-name an-annotation=foo

# Show annotations
$ kubectl describe pod my-pod-name

# Update an annotation
$ kubectl annotation pod my-pod-name an-annotation=foo --override

# Delete an annotation. Remember the "-" at the end of the line. Required to remove a annotation
$ kubectl annotation pod my-pod-name an-annotation-

```
