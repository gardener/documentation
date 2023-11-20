---
title: Fix Problematic Conversion Webhooks
level: advanced
category: Operation
scope: users
---

## Reasoning

**Custom Resource Definition (CRD)** is what you use to define a `Custom Resources`. This is a powerful way to extend Kubernetes capabilities beyond the default installation, adding any kind of API objects useful for your application.

The CustomResourceDefinition API provides a workflow for introducing and upgrading to new versions of a CustomResourceDefinition. In a scenario where a CRD adds support for a new version and switches its `spec.versions.storage` field to it (i.e., from `v1beta1` to `v1)`, existing objects are not migrated in etcd. For more information, see [Versions in CustomResourceDefinitions](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definition-versioning/#previous-storage-versions).

This creates a mismatch between the requested and stored version for all clients (kubectl, KCM, etc.). When the CRD also declares the usage of a conversion webhook, it gets called whenever a client requests information about a resource that still exists in the old version. If the CRD is created by the end-user, the webhook runs on the shoot side, whereas controllers / kapi-servers run separated, as part of the control-plane. For the webhook to be reachable a working VPN connection seed -> shoot is essential. In scenarios where the VPN connection is broken, **kube-controller-manager** eventually stops its garbage collection as that requires to list `v1.PartialObjectMetadata` for everything to build a dependency graph. Without kube-controller-manager Garbage Collector, managed resources get stuck during update/rollout.

## Breaking situations

When a user upgrades to `failureTolerance: node|zone`, that will cause the VPN **deployments** to be _replaced_ by **statefulsets**. However, as the VPN connection is broken upon teardown of the deployment, garbage collection will fail leading to a situation that is stuck until an operator manually tackles it.

Such a situation can be avoided, if the end-user has correctly configured CRDs containing conversion webhooks.

## Check problematic CRDs

In order to make sure there are no version problematic CRDs, please run the script below in your shoot. It will return the name of the CRDs in case they have one of the 2 problems:
- the returned version of the CR is different than what is maintained in the `status.storedVersions` field of the CRD.
- the `status.storedVersions` field of the CRD has more than 1 version defined.

```bash
#!/bin/bash

set -e -o pipefail

echo "Checking all CRDs in the cluster..."
for p in $(kubectl get crd | awk 'NR>1' | awk '{print $1}'); do
  strategy=$(kubectl get crd "$p" -o json | jq -r .spec.conversion.strategy)

  if [ "$strategy" == "Webhook" ]; then
     crd_name=$(kubectl get crd "$p" -o json | jq -r .metadata.name)

     number_of_stored_versions=$(kubectl get crd "$crd_name" -o json  | jq '.status.storedVersions | length')

      if [[ "$number_of_stored_versions" == 1 ]]; then
         returned_cr_version=$(kubectl get "$crd_name" -A -o json |  jq -r '.items[] | .apiVersion'  | sed 's:.*/::')
         if [ -z "$returned_cr_version" ]; then
           continue
         else
           variable=$(echo "$returned_cr_version" | xargs -n1 | sort -u | xargs)
           present_version=$(kubectl get crd "$crd_name" -o json  |  jq -cr '.status.storedVersions |.[]')
           if [[ $variable != "$present_version" ]]; then
             echo "ERROR: Stored version differs from the version that CRs are being returned. $crd_name with conversion webhook needs to be fixed"
           fi
         fi
      fi

      if [[ "$number_of_stored_versions" -gt 1 ]]; then
         returned_cr_version=$(kubectl get "$crd_name" -A -o json |  jq -r '.items[] | .apiVersion'  | sed 's:.*/::')
         if [ -z "$returned_cr_version" ]; then
           continue
         else
           echo "ERROR: Too many stored versions defined. $crd_name with conversion webhook needs to be fixed"
         fi
      fi
  fi
done
echo "Problematic CRDs are reported above."
```


# Resolve CRDs

Below we give the steps needed to be taken in order to fix the CRDs reported by the script above.

Inspect all your CRDs that have conversion webhooks in place. If you have more than 1 version defined in its `spec.status.storedVersions` field, then initiate migration as described in the K8S guide https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definition-versioning/#upgrade-existing-objects-to-a-new-stored-version , option2.

For convenience, we provided the necessary steps below.

{{% alert color="info" title="Note" %}}
Please test the following steps on a non-productive landscape, to make sure that the new CR version doesn’t break any of your existing workload.
{{% /alert %}}


1. Please check/set the old CR version has `storage:false` and set the new CR version to `storage:true`.

    For sake of example, let’s consider 2 versions `v1beta1` (old) and `v1` (new).

    Before:
    ```bash
    spec:
    versions:
    - name: v1beta1
    ......
    storage: true

    - name: v1
    ......
    storage: false
    ```

    After:
    ```bash
    spec:
    versions:
    - name: v1beta1
    ......
    storage: false

    - name: v1
    ......
    storage: true
    ```

2. Convert custom-resources to newest version.

    ```bash
    kubectl get <custom-resource-name> -A -ojson | k apply -f -
    ```


3. Patch the CRD to keep only the latest version under storedVersions.
    ```bash
    kubectl patch customresourcedefinitions <crd-name> --subresource='status' --type='merge' -p '{"status":{"storedVersions":["your-latest-cr-version"]}}'
    ```

