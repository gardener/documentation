---
title:  Organizing Access Using kubeconfig Files
level: intermediate
category: Security
scope: app-developer
---

## Overview

The kubectl command-line tool uses `kubeconfig` files to find the information it needs to choose a cluster and 
communicate with the API server of a cluster.

## Problem
If you've become aware of a security breach that affects you, you may want to revoke or cycle credentials 
in case anything was leaked. However, this is not possible with the initial or master `kubeconfig` from your 
cluster.

![teaser](./images/teaser.svg)

## Pitfall

Never distribute the `kubeconfig`, which you can download directly within the Gardener dashboard, for a productive cluster.

![kubeconfig-dont](./images/kubeconfig-initial.png)


## Create a Custom kubeconfig File for Each User

Create a separate `kubeconfig` for each user. One of the big advantages of this approach is that you can revoke them and control 
the permissions better. A limitation to single namespaces is also possible here.

The script creates a new `ServiceAccount` with read privileges in the whole cluster (Secrets are excluded).
To run the script, [Deno](https://deno.land/), a secure TypeScript runtime, must be installed.


```TypeScript
#!/usr/bin/env -S deno run --allow-run

/*
* This script create Kubernetes ServiceAccount and other required resource and print KUBECONFIG to console.
* Depending on your requirements you might want change clusterRoleBindingTemplate() function
*
* In order to execute this script it's required to install Deno.js https://deno.land/ (TypeScript & JavaScript runtime).
* It's single executable binary for the major OSs from the original author of the Node.js
* example: deno run --allow-run kubeconfig-for-custom-user.ts d00001
* example: deno run --allow-run kubeconfig-for-custom-user.ts d00001 --delete
*
* known issue: shebang does works under the Linux but not for Windows Linux Subsystem
*/

const KUBECTL = "/usr/local/bin/kubectl" //or
// const KUBECTL = "C:\\Program Files\\Docker\\Docker\\resources\\bin\\kubectl.exe"

const serviceAccName = Deno.args[0]
const deleteIt = Deno.args[1]
if (serviceAccName == undefined || serviceAccName == "--delete" ) {
    console.log("please provide username as an argument, for example: deno run --allow-run kubeconfig-for-custom-user.ts USER_NAME [--delete]")
    Deno.exit(1)
}

if (deleteIt == "--delete") {
    exec([KUBECTL, "delete", "serviceaccount", serviceAccName])
    exec([KUBECTL, "delete", "secret", `${serviceAccName}-secret`])
    exec([KUBECTL, "delete", "clusterrolebinding", `view-${serviceAccName}-global`])
    Deno.exit(0)
}

await exec([KUBECTL, "create", "serviceaccount", serviceAccName, "-o", "json"])

await exec([KUBECTL, "create", "-o", "json", "-f", "-"], secretYamlTemplate())
let secret = await exec([KUBECTL, "get", "secret", `${serviceAccName}-secret`, "-o", "json"])
let caCRT = secret.data["ca.crt"];
let userToken = atob(secret.data["token"]); //decode base64

let kubeConfig = await exec([KUBECTL, "config", "view", "--minify", "-o", "json"]);
let clusterApi = kubeConfig.clusters[0].cluster.server
let clusterName = kubeConfig.clusters[0].name

await exec([KUBECTL, "create", "-o", "json", "-f", "-"], clusterRoleBindingTemplate())

console.log(kubeConfigTemplate(caCRT, userToken, clusterApi, clusterName, serviceAccName + "-" + clusterName))

async function exec(args: string[], stdInput?: string): Promise<Object> {
    console.log("# "+args.join(" "))
    let opt: Deno.RunOptions = {
        cmd: args,
        stdout: "piped",
        stderr: "piped",
        stdin: "piped",
    };

    const p = Deno.run(opt);

    if (stdInput != undefined) {
        await p.stdin.write(new TextEncoder().encode(stdInput));
        await p.stdin.close();
    }

    const status = await p.status()
    const output = await p.output()
    const stderrOutput = await p.stderrOutput()
    if (status.code === 0) {
        return JSON.parse(new TextDecoder().decode(output))
    } else {
        let error = new TextDecoder().decode(stderrOutput);
        return ""
    }
}

function clusterRoleBindingTemplate() {
    return `
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: view-${serviceAccName}-global
subjects:
- kind: ServiceAccount
  name: ${serviceAccName}
  namespace: default
roleRef:
  kind: ClusterRole
  name: view
  apiGroup: rbac.authorization.k8s.io    
`
}

function secretYamlTemplate() {
    return `
apiVersion: v1
kind: Secret
metadata:
  name: ${serviceAccName}-secret
  annotations:
    kubernetes.io/service-account.name: ${serviceAccName}
type: kubernetes.io/service-account-token`
}

function kubeConfigTemplate(certificateAuthority: string, token: string, clusterApi: string, clusterName: string, username: string) {
    return `
## KUBECONFIG generated on ${new Date()}
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: ${certificateAuthority}
    server: ${clusterApi}
  name: ${clusterName}
contexts:
- context:
    cluster: ${clusterName}
    user: ${username}
  name: ${clusterName}
current-context: ${clusterName}
kind: Config
preferences: {}
users:
- name: ${username}
  user:
    token: ${token}
`
}

```

If **edit** or **admin** rights are to be assigned, the `ClusterRoleBinding` must be adapted in the `roleRef` section 
with the roles listed below.

Furthermore, you can restrict this to a single namespace by not creating a `ClusterRoleBinding` but only a `RoleBinding`
within the desired namespace.

Default ClusterRole |	Default ClusterRoleBinding	| Description |
------------------- | ----------------------------- | --------------- |
cluster-admin	    | system:masters group	        | Allows super-user access to perform any action on any resource. When used in a ClusterRoleBinding, it gives full control over every resource in the cluster and in all namespaces. When used in a RoleBinding, it gives full control over every resource in the rolebinding's namespace, including the namespace itself. |
admin	            | None                          | Allows admin access, intended to be granted within a namespace using a RoleBinding. If used in a RoleBinding, allows read/write access to most resources in a namespace, including the ability to create roles and rolebindings within the namespace. It does not allow write access to resource quota or to the namespace itself. |
edit	            | None	                        | Allows read/write access to most objects in a namespace. It does not allow viewing or modifying roles or rolebindings. |
view	            | None                          | Allows read-only access to see most objects in a namespace. It does not allow viewing roles or rolebindings. It does not allow viewing secrets, since those are escalating. |