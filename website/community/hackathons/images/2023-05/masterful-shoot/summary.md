---
exclude: true
---

# An Evaluation of Masterful Shoots

## General concept

For a Gardener installation, the setup of an initial Kubernetes cluster is crucial, as Gardener runs on Kubernetes itself. Thus, it was decided to evaluate how we could potentially setup and maintain "initial clusters in Gardener style", aka. masterful shoots, for the hackathon in May 2023. The general idea was to create a Kubernetes control plane via static `Pod`s on machine in an existing `Shoot` cluster and migrate the control plane from its `Seed` cluster to the static control plane, i.e. the `Shoot` becomes its own `Seed`. For this purpose, the existing code in gardener/gardener was modified, so that not only the `Shoot`'s control plane on the `Seed` was built but also the static `Pod` manifests were written to a script (stored in a `ConfigMap`), which should create the static control plane when executed on the machine. In the final design, this script was expected to be executed during the bootstrap phase of machines with special taints which would allow for the specification of a worker group in a `Shoot` spec which would host the control plane of the `Shoot` itself. However, this design idea is still in conceptual phase and was not implemented during the hackathon. Also, the migration of the control plane components from the `Seed` cluster to the static `Pod`s is not implemented, as we faced several issues during evaluation.

## Control plane migration from `Seed` to static `Pod`s

Once the `kube-apiserver` and `etcd` are started as static `Pod`s, the `kube-controller-manager`and `kube-scheduler` need to be connected to the `kube-apiserver`. Consequently, a valid kubeconfig for the `kube-controller-manager` and `kube-scheduler` is required. However, the kubeconfig which is used on the `Seed` cluster for this purpose cannot simply be reused in the static `Pod` control plane, as it is based on a `ServiceAccount` which does not exist in the empty `etcd` which was deployed via the static `Pod`. Creating the exact same `ServiceAccount` is not straight-forward, since the corresponding `token` contains an uid for the `ServiceAccount` which cannot be set during creation. To circumvent this issue, we tried to backup the `etcd` in the `Seed` cluster and restore it in the static control plane. However, a full backup also brought all deployments etc. to the static control plane which were not functional for various reasons.
Consequently, we decided to fetch a kubeconfig for the static `kube-apiserver` with a user from the `system:masters` group and used it for the connectivity setup of the `kube-controller-manger` and `kube-scheduler`. Of course, this was the last resort hack in order to keep going in the evaluation phase.
With the running control plane components, we deployed `kube-proxy`, `calcio` and `coredns` into the empty control plane. The manifests for these deployments were obtained from the `ManagedResource` `Secrets` which were still available in the initial `Seed` cluster.
At this stage, it is possible to run workload on the `Shoot` cluster via interaction with the static `Pod` control plane.

## Outlook

Even though we put a lot of effort into the investigation of the control plane migration, we were not able to complete the task, as the `Shoot` with static `Pod` control plane will not really behave as a `Shoot` whose control plane is hosted on a `Seed`. The reasons are manifold. Most notably, we were not able to design a concept for making the `Shoot` its own `Seed`. Consequently, we cannot really show a proof of concept, as it is still unclear how the final conceptual design looks like. Therefore, any ideas regarding the general architecture are highly welcome 🙂.

## Resources

See [https://github.com/MartinWeindel/gardener/tree/initial-cluster-poc](The initial-cluster-poc branch on Martin Weindel's Gardener Fork) for the very early stage ideas of this work item.
