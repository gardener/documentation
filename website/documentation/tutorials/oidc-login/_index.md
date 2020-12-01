---
title:  Authenticating with an Identity Provider
description: "Authenticating with an Identity Provider using OpenID Connect"
type: docs
level: advanced
index: 40
category: Security
scope: operator
publishdate: 2020-12-01
---

Use an identity provider to authenticate users to access shoot clusters.

## Prerequisites

Please read the following background material on [Authenticating](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#openid-connect-tokens).

## Overview

Kubernetes on its own does not provide any user management. In other words, users are not managed through Kubernetes resources. Whenever you refer to a human user it is sufficient to use a unique ID, for example, an email addresss. Nevertheless, Gardener project owners may want to use an identity provider to authenticate user access for shoot clusters. This can be done in the following way:

1. [Configure an Identity Provider](#configure-an-identity-provider) using **OpenID Connect** (OIDC).
2. [Configure a local kubectl oidc-login](#configure-a-local-kubectl-oidc-login) to enable `oidc-login`.
3. [Configure the shoot cluster](#configure-the-shoot-cluster) to share details of the OIDC compliant identity provider with the Kubernetes API Server. 
4. [Authorize an authenticated user](#authorize-an-authenticated-user) using role-based access control (RBAC).

> Gardener allows administrators to modify aspects of the control plane setup. This gives administrators full control of how the control plane should be parameterized. While this offers a lot of flexibility, administrators need to ensure that they do not configure a control plane that goes beyond the service level agreements of the responsible operaters team.  

## Configure an Identity Provider

Create a tenant in an OIDC compatible Identity Provider. For simplicity, we use [Auth0](auth0.com), which has a free plan.

1. In your tenant, set up a native client application that will use the authentication:

   ![application](./application.png)

2. Configure the client to have a callback url of `http://localhost:8000`. This callback connects to your local `kubectl oidc-login` plugin:

   ![application](./callback.png)

3. Note down the following parameters:

    * Domain or Issuer url. It [must](https://openid.net/specs/openid-connect-core-1_0.html#Terminology) be an `https`-secured endpoint (In case of Auth0, notice the trailing `/` at the end).
    * Client ID
    * Client Secret

4. Verify that `https://<Issuer>/.well-known/openid-configuration` is reachable.

5. Create some users (or connect to a user store):

   ![application](./user.png)

   Notice that the users must have a *verified* email address. In doubt, just override that setting manually.

## Configure a local kubectl oidc-login

1. Install the `kubectl` plugin [oidc-login](https://github.com/int128/kubelogin). We highly recommend the [krew](https://github.com/kubernetes-sigs/krew) install tool, which also makes other plugins easily available.

    ```
    $ kubectl krew install oidc-login
    Updated the local copy of plugin index.
    Installing plugin: oidc-login
    CAVEATS:
    \
    |  You need to setup the OIDC provider, Kubernetes API server, role binding and kubeconfig.
    |  See https://github.com/int128/kubelogin for more.
    /
    Installed plugin: oidc-login
    ```

2. Prepare a `kubeconfig` for later use:
   
    ```
    $ cp ~/.kube/config ~/.kube/config-oidc
    ``` 

3. Modify the configuration as follows:
   
    ```yaml
    apiVersion: v1
    kind: Config

    ...

    contexts:
    - context:
        cluster: shoot--project--mycluster
        user: my-oidc
      name: shoot--project--mycluster

    ...

    users:
    - name: my-oidc
      user:
        auth-provider:
          config:
            client-id: <Client ID>
            client-secret: <Client Secret>
            idp-issuer-url: "https://<Issuer>/"
            extra-scopes: email,offline_access,profile
          name: oidc
    ``` 

4. Ensure that the modified context is the active context `current-context: shoot--project--mycluster`.

## Configure the shoot cluster

Modify the shoot cluster YAML as follows:

```yaml
kind: Shoot
apiVersion: garden.sapcloud.io/v1beta1
metadata:
  name: mycluster
  namespace: garden-project
...
spec:
  kubernetes:
    kubeAPIServer:
      oidcConfig:
        clientID: <Client ID>
        issuerURL: "https://<Issuer>/"
        usernameClaim: email
```

This change of the `Shoot` manifest triggers a reconciliation. Once the reconciliation is finished, your OIDC configuration is applied. It does *not* invalidate other certificate based authentication methods. Wait for Gardener to reconcile the change. It can take up to 5 minutes.


## Authorize an authenticated user

For simplicity, we authorize a single user with the all encompassing cluster role `cluster-admin`:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: cluster-admin-test
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- apiGroup: rbac.authorization.k8s.io
  kind: User
  name: test@test.com
```

As administrator, apply the above cluster role binding for `test@test.com`.

## Verify the Result

1. Activate the prepared `kubeconfig-oidc` and perform a login:
   
    ```
    $ export KUBECONFIG=~/.kube/config-oidc
    $ kubectl oidc-login
    Open http://localhost:8000 for authentication
    ```

    The plugin opens a browser for an interctive authentication session, and in parallel serves a local webserver for the configured callback.

    ![login](./login.png)

2. Enter your login credentials. If you successfully verified your user the console will display the validity of your returned token:
  
    ```
    You got a valid token until 2019-08-14 06:26:49 +0200 CEST
    ```

3. Inspect the `kubeconfig-oidc`. You will find two additional parameters:
   
    ```yaml
    ...
    users:
    - name: my-oidc
      user:
        auth-provider:
          config:
            client-id: <Client ID>
            client-secret: <Client Secret>
            idp-issuer-url: "https://<Issuer>/"
            extra-scopes: email,offline_access,profile
            id-token: eyJ0eX ... 4In0.QQKS ... TTTw
            refresh-token: LFt ... 0Skj
          name: oidc
    ```

    The plugin persisted the `id-token` and `refresh-token` in your configuration file. 

4. Verify that your user actually has the `cluster-admin` role:
   
    ```
    $ kubectl get po --all-namespaces
    NAMESPACE     NAME                                       READY   STATUS    RESTARTS   AGE
    kube-system   blackbox-exporter-954dd954b-tk9vl          1/1     Running   0          7d5h
    kube-system   calico-kube-controllers-5f4b46ffb5-ggb7z   1/1     Running   0          7d5h
    ...

    $ kubectl who-can create clusterrolebinding
    No subjects found with permissions to create clusterrolebinding assigned through RoleBindings

    CLUSTERROLEBINDING                                    SUBJECT                             TYPE            SA-NAMESPACE
    cluster-admin                                         system:masters                      Group
    cluster-admin-test                                    test@test.com                       User
    ...
    ```

Congratulations, you have just configured your cluster to authenticate against an Identity Provider using OpenID Connect!
