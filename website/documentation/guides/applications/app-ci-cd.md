---
title: Kubernetes Application CI/CD using Structured Authentication
description: "How to redeploy your application on push to GitHub using OpenID Connect (OIDC) and Structured Authentication in Gardener"
level: intermediate
category: Getting Started
scope: app-developer
---

This document explains how to set up CI/CD for an application running on Gardener, leveraging [Structured Authentication](https://kubernetes.io/blog/2024/04/25/structured-authentication-moves-to-beta/) in Kubernetes.

The main goal is to automatically update container images whenever you push to the `main` branch of your repository.
This will restart the running containers and keep the app on par with the `main`-branch automatically.
An implementation of *Continuous Delivery* with modern technology and without the need to configure secrets in GitHub Actions.

While this guide assumes your app is hosted on GitHub and uses GitHub-hosted runners for GitHub Actions, the approach can be adapted for other code forges and CI/CD systems with some modifications.

It was originally written for the [Garden Linux Vulnerability Database](https://github.com/gardenlinux/glvd), which is open-source.
If you're interested, you can [explore the workflows on GitHub](https://github.com/search?q=org%3Agardenlinux+kubectl+%22set+image%22&type=code).

## Requirements

Before proceeding, make sure you have the following in place:

### A Working Gardener `Shoot` Cluster

This is the Kubernetes cluster where your application components (such as databases and backends) will run.
As an application developer, you will receive a kubeconfig file from Gardener to access this cluster.

### Access to the *Garden Cluster*

You will also need access to the *Garden Cluster*, which manages your `Shoot` clusters.

Get the `kubeconfig` from the "My Accounts" page in the Gardener Dashboard to access the Garden Cluster.  
This is another YAML file, distinct from the `Shoot` cluster-specific file.

1. **Set your shell to use the Garden cluster kubeconfig:**
  ```bash
  export KUBECONFIG=/path/to/kubeconfig-garden-somename.yaml
  ```

2. **List your `Shoot` clusters:**
  ```bash
  kubectl get shoot
  ```

3. **Save your `Shoot` cluster name for later use:**
  ```bash
  MY_SHOOT_NAME=$(kubectl get shoot -o jsonpath='{.items[0].metadata.name}')
  echo $MY_SHOOT_NAME
  ```
  > If you have multiple shoot clusters, check which one you want and adjust the index accordingly.

You can now proceed with the next steps using the correct context.

### Knowing your `Project`'s *Namespace*

Your Gardener `Shoot` cluster resides in a `Project`.  
The Kubernetes namespace you'll need is composed of `garden-$YOUR_PROJECT_NAME`.

To retrieve your `Project` namespace, run:

```bash
MY_PROJECT_NAMESPACE=$(kubectl get shoot $MY_SHOOT_NAME -o jsonpath='{.metadata.namespace}')
echo $MY_PROJECT_NAMESPACE
```

This will store the correct namespace in the `MY_PROJECT_NAMESPACE` variable for use in later steps.

## Configure Structured Authentication in the *Garden Cluster*

To enable structured authentication, create a `ConfigMap` in the *Garden Cluster*. Use the following example as a template:

`01_cm.yaml`:
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: name-of-configmap-containing-authentication-config # CHANGE THIS TO A SUITABLE NAME
  namespace: garden-my-project # CHANGE THIS TO THE VALUE OF $MY_PROJECT_NAMESPACE
data:
  config.yaml: |
    apiVersion: apiserver.config.k8s.io/v1beta1
    kind: AuthenticationConfiguration
    jwt:
    - issuer:
        url: https://token.actions.githubusercontent.com
        audiences:
        - changeme # CHANGE THIS DEPENDING ON YOUR NEEDS
        audienceMatchPolicy: MatchAny
      claimMappings:
        username:
          # This expression can be changed, this will influence the YOUR_NAME variable in the *Role Binding* below
          expression: "'github.com:' + claims.repository_owner_id + ':' + claims.repository_id + ':' + claims.sub"
      claimValidationRules:
      - expression: 'claims.repository_owner_id == "1234567"' # Replace with the id for your org, can look up using the github api like in this example: gh api orgs/myorg --jq .id
        message: "the repository owner should be the correct GitHub organization"
      - expression: 'claims.exp - claims.iat <= 7200'
        message: "total token lifetime must not exceed 2 hours"
```

If you want to restrict authentication to a single repository, you can also add a similar validation rule for the `repository_id` claim.

Apply the resource with the `kubeconfig` set to the *Garden Cluster*:

```bash
kubectl apply -f 01_cm.yaml
```

Next, you'll need to configure this `ConfigMap` to be used for Structured Authentication by your `Shoot` cluster, which you can do using this patch command:

```bash
kubectl patch shoot $MY_SHOOT_NAME \
  --type merge \
  --namespace $MY_PROJECT_NAMESPACE \
  -p '{"spec":{"kubernetes":{"kubeAPIServer":{"structuredAuthentication":{"configMapName":"name-of-configmap-containing-authentication-config"}}}}}'
```

After applying this patch, Gardener will begin reconciling your `Shoot` cluster.  
This process may take a few minutes to complete.
You can monitor the progress by checking the current status:

```bash
kubectl get shoot $MY_SHOOT_NAME --watch
```

## Configure Role-Based Access Control RBAC in the `Shoot` Cluster

Switch your `kubectl` to use the `kubeconfig` specific to your `Shoot` cluster:

```bash
export KUBECONFIG=/path/to/kubeconfig-gardenlogin--YOUR_PROJECT--$MY_SHOOT_NAME.yaml
```

For each GitHub repository, create a dedicated `Role` and `RoleBinding` in your `Shoot` cluster that grant only the minimum permissions required for your CI/CD workflow.
For example, if your workflow only needs to update a deployment's container image, restrict access to just that resource:

`02_role.yaml`:
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: your-namespace
  name: repo-specific-deployment-updater
rules:
- apiGroups: ["apps"]
  resources: ["deployments"]
  verbs: ["get", "list", "patch", "update"]
```

`03_rb.yaml`:
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: repo-specific-deployment-updater-binding
  namespace: your-namespace
subjects:
- kind: User
  name: YOUR_NAME # Replace with the mapped username for this repo, based on the template provided above
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: repo-specific-deployment-updater
  apiGroup: rbac.authorization.k8s.io
```

The *name* you'll need to configure here depends on your GitHub organization and repositories, as was defined above in the `ConfigMap`.
For example, it might look something like this:

`"github.com:123456789:123456789:your-org/your-app:ref:refs/heads/main"`

```bash
kubectl apply -f 02_role.yaml
kubectl apply -f 03_rb.yaml
```

## Configure GitHub Actions

With your cluster now configured, it's time to set up your GitHub Actions workflow to automatically deploy your application whenever you push to the `main` branch.

To securely access your cluster from GitHub Actions, use the [kubernetes-auth action](https://github.com/gardener/cc-utils/blob/b7e4d874f30171964c5262a0bc20d644f4bcedba/.github/actions/kubernetes-auth/action.yaml#L9-L34), maintained by the Gardener CI/CD team.

Below is an example workflow you can tailor to your environment.
Adjust the parameters as needed to match your cluster and deployment setup:

```yaml
name: CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]
  workflow_dispatch:

permissions:
  id-token: write
  contents: read

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      # Build your container image
      # The sha sum of this newly built image is used below to update the image

      - name: Authenticate to cluster
        id: kube_auth
        uses: gardener/cc-utils/.github/actions/kubernetes-auth@b7e4d874f30171964c5262a0bc20d644f4bcedba
        with:
          server: https://api.YOUR_SHOOT_CLUSTER.YOUR_PROJECT.shoot.example.com
          server-ca-discovery-url: https://discovery.ingress.garden.example.com/projects/YOUR_PROJECT/shoots/YOUR_SHOOT_UID/cluster-ca
          audience: changeme # CHANGE THIS DEPENDING ON YOUR NEEDS, SAME AS ABOVE IN THE CONFIG MAP

      - name: Deploy the new image
        env:
          KUBECONFIG: kubeconfig.yaml
        run: kubectl --namespace your-namespace set image deploy/your-deployment some-container=your-container-image:newly-built-image-sha

```

The discovery server URL may vary depending on your Gardener landscape configuration.

For help with `server-ca-discovery-url`, see: [Retrieve the CA of a shoot cluster via Gardener Discovery Server](https://github.com/gardener/gardener-discovery-server/blob/main/docs/api.md#retrieve-the-ca-of-a-shoot-cluster).

To obtain your `Shoot` cluster's UID, simply run:

```bash
kubectl get shoot NAME -o jsonpath='{.metadata.uid}'
```

Once everything is configured, you can trigger the workflow, and the `kubectl` command should execute successfully, updating your application as intended.

## References

- [Gardener Structured Authentication](https://github.com/gardener/gardener/blob/master/docs/usage/shoot/shoot_access.md)
- [GitHub Actions Defining Trust using job_workflow_ref](https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-with-reusable-workflows#defining-the-trust-conditions)
- [kubernetes-auth github action](https://github.com/gardener/cc-utils/blob/b7e4d874f30171964c5262a0bc20d644f4bcedba/.github/actions/kubernetes-auth/action.yaml#L9-L34)
