---
title: Kubernetes is available in Docker for Mac 17.12 CE
type: Blog
---
<table style="border:0">
<tr>
    <td>
        {{% blog_img "logo" "blog-kubernetes-enable.png" %}}
    </td>
    <td valign="top">
        <div>
        <b>Kubernetes is only available in Docker for Mac 17.12 CE and higher</b> on the Edge channel. Kubernetes 
        support is not included in Docker for Mac Stable releases. To find out more about Stable and Edge channels 
        and how to switch between them, see 
        <a href="https://docs.docker.com/docker-for-mac/#general">general configuration</a>.
        </div>
    </td>
</tr>  
</table>
Docker for Mac 17.12 CE (and higher) Edge includes a standalone Kubernetes server that runs on your Mac, 
so that you can test deploying your Docker workloads on Kubernetes.

The Kubernetes client command, kubectl, is included and configured to connect to the local Kubernetes server. 
If you have kubectl already installed and pointing to some other environment, such as minikube or a GKE cluster, 
be sure to change context so that kubectl is pointing to docker-for-desktop:

...see more on [Docker.com](https://docs.docker.com/docker-for-mac/#kubernetes)

I recommend to [setup your shell]({{ site.baseurl }}/doc/2017/01/16/howto-bash_kubeconfig.html) to see which KUBECONFIG is active.