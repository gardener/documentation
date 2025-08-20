---
title: Shoot deletion stuck due to unmanaged resources
description: "Shoot deletion stuck due to unmanaged resources"
level: intermediate
category: Debugging
scope: app-developer
---

### Introduction
In cloud environments, particularly when using Kubernetes and related infrastructure, users often encounter challenges with unmanaged resources. These are resources that remain active or are not automatically cleaned up when a shoot is deleted. Unmanaged resources can lead to increased costs, security risks, and operational inefficiencies. This guide provides an overview of how to identify, manage, and clean up unmanaged resources effectively.

#### Understanding Unmanaged Resources
Unmanaged resources are cloud resources that are not automatically deleted or managed by Gardener. These can include:
- **Load Balancers**: Often created by Kubernetes services, they may persist if not properly deleted.
- **Security Groups**: Used to control access to resources, they can remain if dependencies are not cleared.
- **Subnets and Network Interfaces**: Part of your network setup, these can be left behind if not explicitly deleted.
- **Persistent Volumes**: Storage resources that may not be deleted when a pod is terminated.

#### Identifying Unmanaged Resources
1. **Use Cloud Provider Tools**: Utilize the cloud provider's console or CLI to list resources. For example, AWS CLI commands like `aws ec2 describe-instances` or `aws elbv2 describe-load-balancers` can help identify active resources.
2. **Kubernetes Tools**: Use kubectl commands to list resources within your Kubernetes cluster. Commands like kubectl get services or kubectl get pv can help identify resources that may not be managed.
3. **Monitoring and Alerts**: Set up monitoring and alerts to notify you of resources that remain active beyond their expected lifecycle.

#### Examples of unmanaged resources blocking deletion

##### Case 1: Shoot stuck due to resources in kube-system
Your shoot reports message of type:
```
Could not clean all old resources: 1 error occurred: deletion of old resource "v1/Service/kube-system/addons-nginx-ingress-controller" is still pending
```

1. **Check Resource Status**: Use kubectl to check the status of the resource. You can do this by running:
   
```
kubectl get service addons-nginx-ingress-controller -n kube-system -o yaml
```
Look for any finalizers or conditions that might be preventing the deletion.

2. **Remove Finalizers**: If the resource has finalizers that are preventing its deletion, you can remove them manually. Edit the resource to remove the finalizers:
   
```
kubectl edit service addons-nginx-ingress-controller -n kube-system
```
Remove the finalizers section from the YAML and save the changes.

3. **Force Delete the Resource**: If the resource is still not deleting, you can forcefully delete it:
   
```
kubectl delete service addons-nginx-ingress-controller -n kube-system --grace-period=0 --force
```


4. **Check for Dependencies**: Ensure there are no other resources or dependencies that might be preventing the deletion. This could include other services, endpoints, or configurations that depend on the service.

5. **Retry Deletion**: After addressing any issues, retry the deletion process.

##### Case 2: Shoot stuck due to ConvergedCloud networks 

Your shoot reports message of type:

```
failed to "delete network": Expected HTTP response code [202 204] when accessing [DELETE https://network-3.eu-de-2.cloud.sap/v2.0/networks/387c61df-2f17-4e8b-a18d-7571078c78c2], but got 500 instead: {"NeutronError": {"type": "HTTPInternalServerError", "message": "Request Failed: internal server error while processing your request.", "detail": ""}}
```

1. **Retry the Operation**: Sometimes, transient issues can cause a 500 error. Wait a few minutes and try the deletion operation again.

2. **Check for Dependencies**: Ensure that there are no resources still attached to the network, such as instances, routers, or subnets. These dependencies can prevent the network from being deleted. Use the cloud provider's console or CLI to list and detach any dependent resources.

3. **Contact Cloud Provider Support**: Since this is an internal server error, it may require intervention from the cloud provider's support team. Provide them with the error message and any relevant details to help them diagnose the issue.

4. **Check for Known Issues**: Look for any announcements or known issues from the cloud provider that might be related to network operations in your region.

When dealing with network deletion problems in OpenStack, you can use various commands to debug and identify the issues. Here are some useful OpenStack CLI commands to help you troubleshoot network deletion problems:
### 1. List Networks
To see all networks and their details, use:
```
openstack network list
```
This command will show you all the networks in your OpenStack environment, including their IDs and statuses.

### 2. Show Network Details
To get detailed information about a specific network, use:
```
openstack network show <network-id>
```
Replace "< network-id > " with the ID of the network you are trying to delete. This will provide information about the network's configuration and any resources associated with it.

### 3. List Subnets
To check if there are any subnets associated with the network, use:
```
openstack subnet list --network <network-id>
```
This will list all subnets associated with the specified network.

### 4. Show Subnet Details
To get detailed information about a specific subnet, use:
```
openstack subnet show <subnet-id>
```

Replace `< subnet-id >` with the ID of the subnet you want to inspect.

### 5. List Ports
To find out if there are any ports still attached to the network, use:
```
openstack port list --network <network-id>
```
This command will list all ports associated with the network, which might prevent its deletion.

### 6. Show Port Details
To get detailed information about a specific port, use:
```
openstack port show <port-id>
```

Replace `< port-id >` with the ID of the port you want to inspect.

### 7. List Routers
To check if there are any routers connected to the network, use:
```
openstack router list
```
This will list all routers in your environment. You can then check if any are connected to the network in question.

### 8. Show Router Details
To get detailed information about a specific router, use:
```
openstack router show <router-id>
```
Replace `< router-id >` with the ID of the router you want to inspect.

### 9. Check for Floating IPs
To see if there are any floating IPs associated with the network, use:
```
openstack floating ip list
```
This will list all floating IPs, which might be associated with resources in the network.

### 10. Delete Resources
Once you've identified any resources that might be preventing the network deletion, use the appropriate openstack commands to delete them, such as:
```
openstack port delete <port-id>
openstack subnet delete <subnet-id>
openstack router delete <router-id>
```

##### Case 3: Shoot stuck due to AWS LoadBalancers

Your shoot reports message of type:

```
Error deleting Infrastructure: 2 errors occurred:\n\t* failed to \"Destroying Kubernetes load balancers and security groups\": failed to destroy load balancers and security groups: could not delete loadbalancer for arn arn:aws:elasticloadbalancing:eu-central-1:xxxxxxx:loadbalancer/net/some-load-balancer-name/d22d72f6f5563eff: operation error Elastic Load Balancing v2: DeleteLoadBalancer, https response error StatusCode: 400, RequestID: 9e0ad839-dc0d-4809-a6d6-1d8373ad8516, ResourceInUse: Load balancer 'arn:aws:elasticloadbalancing:eu-central-1:xxxxxxxxx:loadbalancer/net/some-load-balancer-name/d22d72f6f5563eff' cannot be deleted because it is currently associated with another service\n\t* failed to \"delete zones resources\": 2 errors occurred:\n\t* failed to \"delete subnet resource eu-central-1a-SubnetPublicUtility\": operation error EC2: DeleteSubnet, context deadline exceeded\n\t* failed to \"delete subnet resource eu-central-1b-SubnetPublicUtility\": operation error EC2: DeleteSubnet, context deadline exceeded\n\n\n\n"
```

### 1. Load Balancer Deletion Issue
- **Identify Associations**: The load balancer is associated with another service, which is preventing its deletion. Use the AWS Management Console or CLI to identify what services or resources are using the load balancer. This could include target groups, listeners, or other AWS services.
- **Detach or Delete Associations**: Once you identify the associations, detach or delete them. For example, if there are target groups or listeners associated with the load balancer, remove them.
- **Check for Dependencies**: Ensure that there are no other dependencies, such as DNS records or security groups, that might be linked to the load balancer.
- **Retry Deletion**: After removing all associations and dependencies, attempt to delete the load balancer again.

### 2. Subnet Deletion Timeout
- **Check for Resources in Subnets**: Ensure there are no resources like EC2 instances, NAT gateways, or network interfaces still using the subnets eu-central-1a-SubnetPublicUtility and eu-central-1b-SubnetPublicUtility. Use the AWS Console or CLI to list resources in these subnets.
- **Delete or Reassign Resources**: Delete or reassign any resources using the subnets. For example, terminate instances or detach network interfaces.


When encountering issues with deleting a load balancer in AWS, you can use the AWS CLI to debug and identify the problems. Here are some useful commands to help you troubleshoot load balancer deletion issues:
### 1. List Load Balancers
To see all load balancers and their details, use:
```
aws elbv2 describe-load-balancers
```

This command will list all load balancers in your AWS account, including their ARNs and statuses.

### 2. Describe a Specific Load Balancer
To get detailed information about a specific load balancer, use:
```
aws elbv2 describe-load-balancers --load-balancer-arns <load-balancer-arn>
```

Replace `< load-balancer-arn >` with the ARN of the load balancer you are trying to delete. This will provide information about the load balancer's configuration and any resources associated with it.

### 3. List Target Groups
To check if there are any target groups associated with the load balancer, use:
```
aws elbv2 describe-target-groups --load-balancer-arn <load-balancer-arn>
```

This will list all target groups associated with the specified load balancer.

### 4. Describe Target Group Details
To get detailed information about a specific target group, use:
```
aws elbv2 describe-target-groups --target-group-arns <target-group-arn>
```

Replace `< target-group-arn >` with the ARN of the target group you want to inspect.

### 5. List Listeners
To find out if there are any listeners still attached to the load balancer, use:
```
aws elbv2 describe-listeners --load-balancer-arn <load-balancer-arn>
```

This command will list all listeners associated with the load balancer, which might prevent its deletion.

### 6. Describe Listener Details
To get detailed information about a specific listener, use:
```
aws elbv2 describe-listeners --listener-arns <listener-arn>
```
Replace `< listener-arn >` with the ARN of the listener you want to inspect.

### 7. Check for Security Groups
To see if there are any security groups associated with the load balancer, use:
```
aws ec2 describe-security-groups --group-ids <security-group-id>
```
Ensure that the security groups are not being used by other resources.

### 8. Delete Resources
Once you've identified any resources that might be preventing the load balancer deletion, use the appropriate aws commands to delete them, such as:
```
aws elbv2 delete-listener --listener-arn <listener-arn>
aws elbv2 delete-target-group --target-group-arn <target-group-arn>
```
