---
aliases:
  - /docs/guides/security-and-compliance/partial-disa-k8s-stig-shoot/
description: >-
  How can I check whether my shoot cluster fulfills the DISA STIG security
  requirements?
github_repo: 'https://github.com/gardener/diki'
github_subdir: docs/usage
params:
  github_branch: main
path_base_for_github_subdir:
  from: content/docs/security-and-compliance/disa-k8s-stig-shoot.md
  to: disa-k8s-stig-shoot.md
title: Run DISA K8s STIGs Ruleset
weight: 20
prev: false
next: false
managed: true
---

# Run DISA K8s STIGs Ruleset

## Show DISA K8s STIG Compliance for a Gardener Shoot Cluster

### Introduction

This part covers the topic of showing compliance with the DISA K8s STIG for a Gardener shoot cluster. The guide features two providers - `managedk8s` and `garden`, both of which implement rules from the DISA K8s STIG ruleset.

The `managedk8s` provider assumes that the user running the ruleset does not have access to the environment (the seed in this particular case), in which the control plane components reside.

The `garden` provider is used for accessing the`Garden` cluster, in which the `Shoot` resource can be found.

> [!IMPORTANT]
> Since the two providers that we are going to use in this guide do not leverage access to the Shoot cluster controlplane,
> they only implement checks that concern configurations that cluster owners can change/modify by themselves.
> Compliance for configurations that cannot be influenced by cluster owners shall be ensured by the team that operates the concrete Gardener installation.

### Prerequisites

Make sure you have [diki installed](https://github.com/gardener/diki/blob/main/README.md#Installation) and have a running Gardener shoot cluster.

We will be using the sample [DISA K8s STIG for Shoots configuration file](https://github.com/gardener/diki/blob/main/example/guides/disa-k8s-stig-shoot.yaml) for this run.

> [!TIP]
> In order to complete its compliance checks, Diki requires permissions for certain Kubernetes resources.
> [A compiled list of RBAC-style rules is provided](https://github.com/gardener/diki/blob/main/example/rbac/managedk8s.yaml), which represents all required permissions for the ruleset run. You may use this list to create your own RBAC resources.

### Configuration

#### Configure the `managedk8s` provider

Set the following arguments:
- `providers[id=="managedk8s"].args.kubeconfigPath` pointing to a shoot admin kubeconfig.
- (optional) `providers[id=="managedk8s"].metadata.shootName` should be set to the name of the shoot cluster. The `metadata` field contains custom metadata from the user that will be present in the generated report.

```yaml
- id: managedk8s
  name: "Managed Kubernetes"
  metadata: # custom user metadata
    # shootName: <shoot-name>
    # foo: bar
  args:
    kubeconfigPath: <shoot-kubeconfig-path>  # path to shoot admin kubeconfig
```

In case you need instructions on how to generate such a kubeconfig, please read [Accessing Shoot Clusters](/docs/gardener/shoot/shoot_access/).

#### Configure the `garden` provider

Set the following arguments:
- `providers[id=="garden"].args.kubeconfigPath` pointing to the Garden cluster kubeconfig.
- `providers[id=="garden"].rulesets.args.projectNamespace` should be set to the namespace in which the shoot cluster is created.
- `providers[id=="garden"].rulesets.args.shootName` should be set to the name of the shoot cluster.

```yaml
- id: garden
  name: "Garden"
  metadata: # custom user metadata
    # foo: bar
  args:
    kubeconfigPath: <garden-kubeconfig-path>  # path to garden cluster kubeconfig
  rulesets:
  - id: security-hardened-shoot-cluster
    name: Security Hardened Shoot Cluster
    version: v0.2.1
    args:
      projectNamespace: garden-<project-name> # name of project namespace containing the shoot resource to be tested
      shootName: <shoot-name>                 # name of shoot resource to be tested
```

#### Additional configurations

Additional metadata such as the shoot's name can also be included in the `providers[id=="managedk8s|garden"].metadata` section. The metadata section can be used to add additional context to different diki runs.

The provided configuration contain the recommended rule options for running the both providers, but you can modify rule options parameters according to requirements. All available options can be found in:
- [managedk8s example configuration](https://github.com/gardener/diki/blob/main/example/config/managedk8s.yaml).
- [garden example configuration](https://github.com/gardener/diki/blob/main/example/config/garden.yaml).

### Running the DISA K8s STIGs Ruleset

To run diki against a Gardener shoot cluster, run the following command:

```bash
diki run \
    --config=./example/guides/disa-k8s-stig-shoot.yaml \
    --all \
    --output=disa-k8s-stigs-report.json
```

### Generating a Report

We can use the file generated in the previous step to create an html report by using the following command:

```bash
diki report generate \
    --output=disa-k8s-stigs-report.html \
    disa-k8s-stigs-report.json
```
