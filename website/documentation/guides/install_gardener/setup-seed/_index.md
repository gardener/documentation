---
title: Setting up a Seed Cluster
description: "How to configure a Kubernetes cluster as a Gardener seed"
level: advanced
category: Setup Gardener
scope: operator
---

# The Seed Cluster

The [landscape-setup-template](https://github.com/gardener/landscape-setup-template) is meant to provide an as-simple-as-possible Gardener installation. Therefore it just registers the cluster where the Gardener is deployed on as a seed cluster. While this is easy, it might be insecure. Clusters created with Kubify don't have network policies, for example. See [Hardening the Gardener Community Setup](https://github.com/gardener/documentation/website/documentation/guides/install_gardener/secure-setup/_index.md) for more information. 

To have network policies on the seed cluster and avoid having the seed on the same cluster as the Gardener, the easiest option is probably to simply create a shoot and then register that shoot as seed. This way you can also leverage other advantages of shooted clusters for your seed, e.g. autoscaling.

## Setting up the Shoot

The first step is to create a shoot cluster. Unfortunately, the Gardener dashboard currently does not allow to change the CIDRs for the created shoot clusters, and your shoots won't work if they have overlapping CIDR ranges with their corresponding seed cluster. So either your seed cluster is deployed with different CIDRs - not using the dashboard, but `kubectl apply` and a yaml file - or all of your shoots on that seed need to be created this way. In order to be able to use the dashboard for the shoots, it makes sense to create the seed with different CIDRs. 

So, create yourself a shoot with modified CIDRs. You can find templates for the shoot manifest [here](https://github.com/gardener/gardener/tree/master/example). You could, for example, change the CIDRs to this:

```yaml
      ...
      networks:
        internal:
        - 10.254.112.0/22
        nodes: 10.254.0.0/19
        pods: 10.255.0.0/17
        public:
        - 10.254.96.0/22
        services: 10.255.128.0/17
        vpc:
          cidr: 10.254.0.0/16
        workers:
        - 10.254.0.0/19
      ...
```

Also make sure that your new seed cluster has enough resources for the expected number of shoots.


## Registering the Shoot as Seed

The seed itself is a Kubernetes resource that can be deployed via a yaml file, but it has some dependencies. You can find templated versions of these files in the [seed-config component](https://github.com/gardener/landscape-setup/tree/0.5.0/components/seed-config) of the landscape-setup-template project. If you have set up your Gardener using this project, there should also be rendered versions of these files in the `state/seed-config/` directory of your landscape folder (they are probably easier to work with). Examples for all these files can also be found in the aforementioned example folder in the Gardener repo. 

### 1. Seed Namespace 

First, you should create a namespace for your new seed and everything that belongs to it. This is not necessary, but it will keep your cluster organized. For this example, the namespace will be called `seed-test`.

### 2. Cloud Provider Secret

The Gardener needs to create resources on the seed and thus needs a kubeconfig for it. It is provided with the cloud provider secret (below is an example for AWS).

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: test-seed-secret
  namespace: seed-test
  labels:
    cloudprofile.garden.sapcloud.io/name: aws 
type: Opaque
data:
  accessKeyID: <base64-encoded AWS access key>
  secretAccessKey: <base64-encoded AWS secret key>
  kubeconfig: <base64-encoded kubeconfig>
```

Deploy the secret into your seed namespace. Apart from the kubeconfig, also infrastructure credentials are required. They will only be used for the etcd backup, so in case for AWS, S3 privileges should be sufficient. 

### 3. Secretbinding for Cloud Provider Secret

Create a secretbinding for your cloud provider secret:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: SecretBinding
metadata:
  name: test-seed-secret
  namespace: seed-test
  labels:
    cloudprofile.garden.sapcloud.io/name: aws
secretRef:
  name: test-seed-secret
# namespace: only required if in different namespace than referenced secret
quotas: []
```

You can give it the same name as the referenced secret. 

### 4. Cloudprofile 

The cloudprofile contains the information which shoots can be created with this seed. You could create a new cloudprofile, but you can also just reference the existing cloudprofile if you don't want to change anything. 

### 5. Seed

Now the seed resource can be created. Choose a name, reference cloudprofile and secretbinding, fill in your ingress domain, and set the CIDRs to the same values as in the underlying shoot cluster. 

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Seed
metadata:
  name: aws-secure
spec:
  provider:
    type: aws
    region: eu-west-1
  secretRef:
    name: test-seed-secret
    namespace: seed-test
  dns:
    ingressDomain: ingress.<your cluster domain>
  networks:
    nodes: 10.254.0.0/19
    pods: 10.255.0.0/17
    services: 10.255.128.0/17
```

### 6. Hide Original Seed

In the dashboard, it is not possible to select the seed for a shoot (it is possible when deploying the shoot using a yaml file, however). Since both seeds probably reference the same cloudprofile, the Gardener will try to distribute the shoots equally among both seeds. 

To solve this problem, edit the original seed and set its `spec.visible` field to `false`. This will prevent the Gardener from choosing this seed, so now all shoots created via the dashboard should have their control plane on the new, more secure seed.