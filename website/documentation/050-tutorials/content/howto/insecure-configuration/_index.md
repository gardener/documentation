---
title: Auditing Kubernetes for Secure Setup
description: "A few insecure configurations in Kubernetes"
type: tutorial-page
level: advanced
index: 5
category: Security
scope: operator
aliases: ["readmore/insecure"]
---

# Auditing Kubernetes for Secure Setup

{{% howto_img "" "./images/teaser.svg" %}}

## Introduction
In the last summer, the [Gardener team](https://github.com/gardener/gardener) worked on assessing the security of 
different Gardener managed Kubernetes installations. **The goal of this ongoing work is to increase the security of 
all Gardener stakeholders in the Open Source community.** Following the Gardener architecture, the control plane of a 
Gardener managed shoot cluster resides in the corresponding seed cluster. This is a 
[Control-Plane-as-a-Service](https://kubernetes.io/blog/2018/05/17/gardener/#kubernetes-control-plane) with 
a [network air gap](https://kubernetes.io/blog/2018/05/17/gardener/#network-air-gap).


Along the way we found different kinds of security issues, for example due to misconfiguration or missing isolation, 
as well as two problems with upstream Kubernetes which especially come into picture in the Control-Plane-as-a-Service 
architecture.

## Sharing the findings
From this experience, we’d like to share a few examples of security issues that could happen on a Kubernetes 
installation and how to fix them. 

Those examples cover the following scenarios:

1. Privilege escalation with insecure apiserver configuration wrt proxies
2. Explore the control plane network with malicious HTTP-redirects
3. Reading private AWS metadata via Grafana

## Scenario 1: Privilege escalation with insecure apiserver
In most configurations, different components connect directly to the `apiserver`, often using a `kubeconfig` with a client 
certificate. The `apiserver` is started with the flag:

```bash
/hyperkube apiserver --client-ca-file=/srv/kubernetes/ca/ca.crt ...
```

The apiserver will check whether the client certificate presented by kubectl, kubelet, scheduler or another component 
is really signed by the configured certificate authority for clients.
 

{{% howto_img "the apiserver has many clients of different kinds" "./images/image1.png" %}}

However, it is possible to configure the apiserver differently for use with an intermediate authenticating proxy. The 
proxy will authenticate the client with its own custom method and then issue HTTP requests to the apiserver with 
additional HTTP headers specifying the user name and group name. The apiserver should only accept those HTTP headers 
when the request comes from a legitimate proxy. To allow the apiserver to check this, it is given a client certificate 
authority on the command line and proxies must use a client certificate signed by that certificate authority. 


```bash
--requestheader-client-ca-file=/srv/kubernetes/ca/ca-proxy.crt
--requestheader-username-headers=X-Remote-User
--requestheader-group-headers=X-Remote-Group
```


{{% howto_img "the apiserver clients could reach the apiserver through an authenticating proxy" "./images/image2.png" %}}



So far, so good. But what happens if malicious user “Mallory” tries to connect directly to the apiserver and reuses 
the HTTP headers to pretend to be someone else?
  

{{% howto_img "what happens when a client bypasses the proxy, connecting directly to the apiserver?" "./images/image3.png" %}}


With a correct configuration, Mallory’s kubeconfig will have a certificate signed by the apiserver certificate authority 
but not signed by the proxy certificate authority. So the apiserver will not accept the extra HTTP header 
“X-Remote-Group: system:masters”.


The issue comes when the same certificate authority is used for both the apiserver and the proxy. Then, any Kubernetes 
client certificate can be used to take the role of different user or group as the apiserver will accept the user and 
group headers.


The tool “kubectl” does not normally add those HTTP headers but it’s pretty easy to generate the corresponding HTTP 
requests manually.


We worked on [improving the Kubernetes documentation](https://github.com/kubernetes/website/pull/10093) to make clearer 
that this configuration should be avoided.




## Scenario 2: Explore the control plane network with malicious HTTP-redirects
The apiserver is a central component of Kubernetes and many components initiate connections to it, including the Kubelet 
running on worker nodes. Most of the requests from those clients will end up updating Kubernetes objects (pods, services, 
deployments etc.) in the etcd database but the apiserver usually does not need to initiate TCP connections in the other 
direction.
  

{{% howto_img "the apiserver mostly receives incoming connections" "./images/image4.png" %}}


I say “usually” because there are exceptions. Some kubectl commands will trigger the apiserver to initiate a new 
connection to the Kubelet. “Kubectl exec” is one of those commands. In order to get the standard I/Os from the pod, 
the apiserver will start an HTTP connection to the Kubelet on the worker node where the pod is running. Depending on 
the container runtime used, it can be done in different ways, but one way to do it is for the Kubelet to reply with a 
HTTP-302 redirection to the [Container Runtime Interface (CRI)](https://github.com/kubernetes/community/blob/master/contributors/devel/container-runtime-interface.md). 
Basically, the Kubelet is telling the apiserver to get the streams from CRI itself directly instead of forwarding. The 
redirection from the Kubelet will only change the port and path from the URL; the IP address will not be changed because 
the Kubelet and the CRI component run on the same worker node.


  
{{% howto_img " but the apiserver also initiates some connections, e.g. to worker nodes" "./images/image5.png" %}}


It’s often quite easy for users of a Kubernetes cluster to get access to worker nodes and tamper with the Kubelet. They 
could be given explicit SSH access or they could be given a kubeconfig with enough privileges to create privileged pods 
or even just pods with “host” volumes.


In contrast, users–even those with “system:masters” or “root” rights–are often not given access to the control plane. 
On setups like for example GKE or Gardener, the control plane is running on separate nodes, with a different administrative
 access. It could be hosted on a different cloud provider account. So users are not free to explore the internal network 
 in the control plane.


What would happen if a user was tampering with the Kubelet to make it maliciously redirect “kubectl exec” requests to 
a different random endpoint? Most likely the given endpoint would not speak the streaming server protocol, so there would 
be an error. But the full HTTP payload from the endpoint is included in the error message printed by kubectl exec!


  
{{% howto_img "the apiserver is tricked to connecting to other components" "./images/image6.png" %}}


The impact of this issue depends on the specific setup. But in many configurations, we can find a metadata service 
(such as the [AWS metadata service](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html)) 
containing user data, configurations and credentials. The setup we explored had a different AWS account and a different 
[EC2 instance profile](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html) 
for the worker nodes and the control plane. This issue allowed users to get access to the AWS metadata service in the 
context of the control plane, which they should not have access to.


We have reported this issue to the [Kubernetes Security mailing list](https://kubernetes.io/docs/reference/issues-security/security/) 
and the public pull request that addresses the issue has been merged [PR#66516](https://github.com/kubernetes/kubernetes/pull/66516). 
It provides a way to enforce HTTP redirect validation (disabled by default).


But there are several other ways that users could trigger the apiserver to generate HTTP requests and get the reply
payload back, so it is advised to isolate apiserver and other components from the network as additional mitigations. 
Depending on where the apiserver is running, it could be with [Kubernetes Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/), 
[EC2 Security Groups](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-network-security.html) or just 
iptables directly. Following the [defense in depth principle](https://en.wikipedia.org/wiki/Defense_in_depth_(computing)), 
it is a good idea to apply the apiserver HTTP redirect validation when it is available and firewall rules together.


In Gardener, this has been fixed with Kubernetes network policies along with changes to ensure the apiserver does 
not need to contact the metadata service. You can see more details in the [announcements on the Gardener mailing list](https://groups.google.com/forum/#!forum/gardener). 
This is tracked in [CVE-2018-2475](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-2475).


*To be protected from this issue, stakeholders should:*

* *Use the latest version of Gardener*
* *Ensure the seed cluster’s container network supports network policies. Clusters that have been created with 
[Kubify](https://github.com/gardener/kubify) are not protected as Flannel is used there which doesn’t support network 
policies.*


## Scenario 3: Reading private AWS metadata via Grafana
For our tests, we had access to a Kubernetes setup where users are not only given access to the apiserver in the control 
plane, but also a Grafana instance that is used to gather data from their Kubernetes clusters via Prometheus. The control 
plane is managed and users don’t have access to the nodes that run it. They can only access the apiserver and Grafana 
via a load balancer. The internal network of the control plane is therefore hidden to users.

  
{{% howto_img "Prometheus and Grafana can be used to monitor worker nodes" "./images/image7.png" %}}


Unfortunately, that setup was not protecting the control plane network from nosy users. By configuring a new custom 
data source in Grafana, we could send HTTP requests to target the control plane network, for example the AWS metadata 
service. The reply payload is not displayed on the Grafana website but it is possible to access it from the debugging 
console of the Chrome browser.

  
{{% howto_img "Credentials can be retrieved from the debugging console of Chrome" "./images/image8.png" %}}

  
{{% howto_img "Adding a Grafana data source is a way to issue HTTP requests to arbitrary targets" "./images/image9.png" %}}

In that installation, users could get the “user-data” for the seed cluster from the metadata service and retrieve a 
kubeconfig for that Kubernetes cluster.


There are many possible mitigations: lockdown Grafana features to only what’s necessary in this setup, block all 
unnecessary outgoing traffic, move Grafana to a different network, lockdown unauthenticated endpoints.

## Conclusion
The three scenarios above show pitfalls with a Kubernetes setup. A lot of them were specific to the Kubernetes 
installation: different cloud providers or different configurations will show different weakness. Users are no longer 
given access to Grafana.