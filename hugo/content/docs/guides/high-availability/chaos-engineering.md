---
aliases:
  - /readmore/shoot-high-availability-chaos-engineering
category: High Availability
github_repo: 'https://github.com/gardener/chaos-engineering'
github_subdir: docs/tutorials
level: advanced
params:
  github_branch: main
path_base_for_github_subdir:
  from: content/docs/guides/high-availability/chaos-engineering.md
  to: getting_started.md
publishdate: '2023-03-17'
scope: app-developer
title: Chaos Engineering
prev: false
next: false
managed: true
---

# Chaos Engineering

<!-- BEGIN of section that must be kept in sync with sibling tutorial -->
## Overview

Gardener provides [`chaostoolkit`](https://chaostoolkit.org) modules to simulate *compute* and *network* outages for various cloud providers such as [AWS](https://github.com/gardener/chaos-engineering/tree/main/docs/aws), [Azure](https://github.com/gardener/chaos-engineering/tree/main/docs/azure), [GCP](https://github.com/gardener/chaos-engineering/tree/main/docs/gcp), [OpenStack/Converged Cloud](https://github.com/gardener/chaos-engineering/tree/main/docs/openstack), and [VMware vSphere](https://github.com/gardener/chaos-engineering/tree/main/docs/vsphere), as well as *pod disruptions* for [any Kubernetes cluster](https://github.com/gardener/chaos-engineering/tree/main/docs/k8s).

The API, parameterization, and implementation is as homogeneous as possible across the different cloud providers, so that you have only minimal effort. As a Gardener user, you benefit from an [additional `garden` module](https://github.com/gardener/chaos-engineering/tree/main/docs/garden) that leverages the generic modules, but exposes their functionality in the most simple, homogeneous, and secure way (no need to specify cloud provider credentials, cluster credentials, or filters explicitly; retrieves credentials and stores them in memory only).

## Installation

The name of the package is `chaosgarden` and it was developed and tested with Python 3.9+. It's being published to [PyPI](https://pypi.org/project/chaosgarden), so that you can comfortably install it via Python's package installer [pip](https://pip.pypa.io/en/stable) (you may want to [create a virtual environment](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/#creating-a-virtual-environment) before installing it):

```sh
pip install chaosgarden
```

ℹ️ If you want to use the [VMware vSphere module](https://github.com/gardener/chaos-engineering/tree/main/docs/vsphere), please note the remarks in [`requirements.txt`](https://github.com/gardener/chaos-engineering/blob/main/requirements.txt) for `vSphere`. Those are not contained in the published PyPI package.

The package can be used directly from Python scripts and supports this usage scenario with additional convenience that helps launch actions and probes in background (more on actions and probes later), so that you can compose also complex scenarios with ease.
<!-- END of section that must be kept in sync with sibling tutorial -->

If this technology is new to you, you will probably prefer the [`chaostoolkit`](https://chaostoolkit.org) [CLI](https://chaostoolkit.org/reference/usage/cli) in combination with [experiment files](https://chaostoolkit.org/reference/api/experiment), so we need to [install the CLI](https://chaostoolkit.org/reference/usage/install/#install-the-cli) next:

```sh
pip install chaostoolkit
```

Please verify that it was installed properly by running:

```sh
chaos --help
```

<!-- BEGIN of section that must be kept in sync with sibling tutorial -->
## Usage

ℹ️ We assume you are using Gardener and run Gardener-managed shoot clusters. You can also use the generic cloud provider and Kubernetes `chaosgarden` modules, but configuration and secrets will then differ. Please see the [module docs](https://github.com/gardener/chaos-engineering/tree/main/docs) for details.
<!-- END of section that must be kept in sync with sibling tutorial -->

### A Simple Experiment

The most important command is the [`run`](https://chaostoolkit.org/reference/usage/run) command, but before we can use it, we need to compile an experiment file first. Let's start with a simple one, invoking only a read-only 📖 action from `chaosgarden` that lists cloud provider machines and networks (depends on cloud provider) for the "first" zone of one of your shoot clusters.

Let's assume, your project is called `my-project` and your shoot is called `my-shoot`, then we need to create the following experiment:

```json
{
    "title": "assess-filters-impact",
    "description": "assess-filters-impact",
    "method": [
        {
            "type": "action",
            "name": "assess-filters-impact",
            "provider": {
                "type": "python",
                "module": "chaosgarden.garden.actions",
                "func": "assess_cloud_provider_filters_impact",
                "arguments": {
                    "zone": 0
                }
            }
        }
    ],
    "configuration": {
        "garden_project": "my-project",
        "garden_shoot": "my-shoot"
    }
}
```

<!-- BEGIN of section that must be kept in sync with sibling tutorial -->
We are not yet there and need one more thing to do before we can run it: We need to "target" the Gardener landscape resp. Gardener API server where you have created your shoot cluster (not to be confused with your shoot cluster API server). If you do not know what this is or how to download the Gardener API server `kubeconfig`, please follow [these instructions](/docs/dashboard/project-operations/#prerequisites). You can either download your *personal* credentials or *project* credentials (see [creation of a `serviceaccount`](/docs/dashboard/automated-resource-management/#prerequisites)) to interact with Gardener. For now (fastest and most convenient way, but generally not recommended), let's use your *personal* credentials, but if you later plan to automate your experiments, please use proper *project* credentials (a `serviceaccount` is not bound to your person, but to the project, and can be restricted using [RBAC roles and role bindings](https://kubernetes.io/docs/reference/access-authn-authz/rbac), which is why we recommend this for production).

To download your *personal* credentials, open the Gardener Dashboard and click on your avatar in the upper right corner of the page. Click "My Account", then look for the "Access" pane, then "Kubeconfig", then press the "Download" button and save the `kubeconfig` to disk. Run the following command next:

```sh
export KUBECONFIG=path/to/kubeconfig
```
<!-- END of section that must be kept in sync with sibling tutorial -->

We are now set and you can run your first experiment:

```sh
chaos run path/to/experiment
```

You should see output like this (depends on cloud provider):

```txt
[INFO] Validating the experiment's syntax
[INFO] Installing signal handlers to terminate all active background threads on involuntary signals (note that SIGKILL cannot be handled).
[INFO] Experiment looks valid
[INFO] Running experiment: assess-filters-impact
[INFO] Steady-state strategy: default
[INFO] Rollbacks strategy: default
[INFO] No steady state hypothesis defined. That's ok, just exploring.
[INFO] Playing your experiment's method now...
[INFO] Action: assess-filters-impact
[INFO] Validating client credentials and listing probably impacted instances and/or networks with the given arguments zone='world-1a' and filters={'instances': [{'Name': 'tag-key', 'Values': ['kubernetes.io/cluster/shoot--my-project--my-shoot']}], 'vpcs': [{'Name': 'tag-key', 'Values': ['kubernetes.io/cluster/shoot--my-project--my-shoot']}]}:
[INFO] 1 instance(s) would be impacted:
[INFO] - i-aabbccddeeff0000
[INFO] 1 VPC(s) would be impacted:
[INFO] - vpc-aabbccddeeff0000
[INFO] Let's rollback...
[INFO] No declared rollbacks, let's move on.
[INFO] Experiment ended with status: completed
```

🎉 Congratulations! You successfully ran your first `chaosgarden` experiment.

### A Destructive Experiment

Now let's break 🪓 your cluster. Be advised that this experiment will be destructive in the sense that we will temporarily network-partition all nodes in one availability zone (machine termination or restart is available with `chaosgarden` as well). That means, these nodes and their pods won't be able to "talk" to other nodes, pods, and services. Also, the API server will become unreachable for them and the API server will report them as unreachable (confusingly shown as `NotReady` when you run `kubectl get nodes` and `Unknown` in the status `Ready` condition when you run `kubectl get nodes --output yaml`).

Being unreachable will trigger service endpoint and load balancer de-registration (when the node's grace period lapses) as well as eventually pod eviction and machine replacement (which will continue to fail under test). We won't run the experiment long enough for all of these effects to materialize, but the longer you run it, the more will happen, up to temporarily giving up/going into "back-off" for the affected worker pool in that zone. You will also see that the Kubernetes cluster autoscaler will try to create a new machine almost immediately, if pods are pending for the affected zone (which will initially fail under test, but may succeed later, which again depends on the runtime of the experiment and whether or not the cluster autoscaler goes into "back-off" or not).

But for now, all of this doesn't matter as we want to start "small". You can later read up more on the various settings and effects in our [best practices guide on high availability](/docs/guides/high-availability/best-practices/).

Please create a new experiment file, this time with this content:

```json
{
    "title": "run-network-failure-simulation",
    "description": "run-network-failure-simulation",
    "method": [
        {
            "type": "action",
            "name": "run-network-failure-simulation",
            "provider": {
                "type": "python",
                "module": "chaosgarden.garden.actions",
                "func": "run_cloud_provider_network_failure_simulation",
                "arguments": {
                    "mode": "total",
                    "zone": 0,
                    "duration": 60
                }
            }
        }
    ],
    "rollbacks": [
        {
            "type": "action",
            "name": "rollback-network-failure-simulation",
            "provider": {
                "type": "python",
                "module": "chaosgarden.garden.actions",
                "func": "rollback_cloud_provider_network_failure_simulation",
                "arguments": {
                    "mode": "total",
                    "zone": 0
                }
            }
        }
    ],
    "configuration": {
        "garden_project": {
            "type": "env",
            "key": "GARDEN_PROJECT"
        },
        "garden_shoot": {
            "type": "env",
            "key": "GARDEN_SHOOT"
        }
    }
}
```

ℹ️ There is an even more destructive action that terminates or alternatively restarts machines in a given zone 🔥 (immediately or delayed with some randomness/chaos for maximum inconvenience for the nodes and pods). You can find links to all these examples at the end of this tutorial.

This experiment is very similar, but this time we will break 🪓 your cluster - for `60s`. If that's too short to even see a node or pod transition from `Ready` to `NotReady` (actually `Unknown`), then increase the `duration`. Depending on the workload that your cluster runs, you may already see effects of the network partitioning, because it is effective immediately. It's just that Kubernetes cannot know immediately and rather assumes that something is failing only **after** the node's grace period lapses, but the actual workload is impacted immediately.

Most notably, this experiment also has a [`rollbacks`](https://chaostoolkit.org/reference/concepts/#rollbacks) section, which is invoked even if you abort the experiment or it fails unexpectedly, but only if you run the CLI with the option `--rollback-strategy always` which we will do soon. Any `chaosgarden` action that can undo its activity, will do that implicitly when the `duration` lapses, but it is a best practice to always configure a `rollbacks` section in case something unexpected happens. Should you be in panic and just want to run the `rollbacks` section, you can remove all other actions and the CLI will execute the `rollbacks` section immediately.

One other thing is different in the second experiment as well. We now read the name of the project and the shoot from the environment, i.e. a [`configuration`](https://chaostoolkit.org/reference/api/experiment/#configuration) section can automatically expand [environment variables](https://chaostoolkit.org/reference/api/experiment/#environment-configurations). Also useful to know (not shown here), `chaostoolkit` supports [variable substitution](https://chaostoolkit.org/reference/api/experiment/#variable-substitution) too, so that you have to define variables only once. Please note that you can also add a [`secrets`](https://chaostoolkit.org/reference/api/experiment/#secrets) section that can also automatically expand [environment variables](https://chaostoolkit.org/reference/api/experiment/#environment-secrets). For instance, instead of targeting the Gardener API server via `$KUBECONFIG`, which is supported by our `chaosgarden` package natively, you can also explicitly refer to it in a `secrets` section (for brevity reasons not shown here either).

Let's now run your second experiment (please watch your nodes and pods in parallel, e.g. by running `watch kubectl get nodes,pods --output wide` in another terminal):

```sh
export GARDEN_PROJECT=my-project
export GARDEN_SHOOT=my-shoot
chaos run --rollback-strategy always path/to/experiment
```

The output of the `run` command will be similar to the one above, but longer. It will mention either machines or networks that were network-partitioned (depends on cloud provider), but should revert everything back to normal.

Normally, you would not only run [actions](https://chaostoolkit.org/reference/concepts/#actions) in the `method` section, but also [probes](https://chaostoolkit.org/reference/concepts/#probes) as part of a [steady state hypothesis](https://chaostoolkit.org/reference/concepts/#steady-state-hypothesis). Such steady state hypothesis probes are run before and after the actions to validate that the "system" was in a healthy state before and gets back to a healthy state after the actions ran, hence show that the "system" is in a steady state when not under test. Eventually, you will write your own probes that don't even have to be part of a steady state hypothesis. We at Gardener run multi-zone (multiple zones at once) and rolling-zone (strike each zone once) outages with continuous custom probes all within the `method` section to validate our KPIs continuously under test (e.g. how long do the individual fail-overs take/how long is the actual outage). The most complex scenarios are even run via Python scripts as all actions and probes can also be invoked directly (which is what the CLI does).

<!-- BEGIN of section that must be kept in sync with sibling tutorial -->
## High Availability

Developing highly available workload that can tolerate a zone outage is no trivial task. You can find more information on how to achieve this goal in our [best practices guide on high availability](/docs/guides/high-availability/best-practices/).

Thank you for your interest in Gardener chaos engineering and making your workload more resilient.

## Further Reading

Here some links for further reading:

- **Examples**: [Experiments](https://github.com/gardener/chaos-engineering/tree/main/docs/tutorials/experiments), [Scripts](https://github.com/gardener/chaos-engineering/tree/main/docs/tutorials/scripts)
- **Gardener Chaos Engineering**: [GitHub](https://github.com/gardener/chaos-engineering), [PyPI](https://pypi.org/project/chaosgarden), [Module Docs for Gardener Users](https://github.com/gardener/chaos-engineering/tree/main/docs/garden)
- **Chaos Toolkit Core**: [Home Page](https://chaostoolkit.org), [Installation](https://chaostoolkit.org/reference/usage/install), [Concepts](https://chaostoolkit.org/reference/concepts), [GitHub](https://github.com/chaostoolkit/chaostoolkit)
<!-- END of section that must be kept in sync with sibling tutorial -->
