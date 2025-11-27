---
exclude: true
prev: false
next: false
---

# Gardener Node Agent

This track finally implemented what was on the list of ideas since the first hackathon in 2021. The goal was to get rid of two important components which are responsible to bootstrap a machine into a worker node, the `cloud-config-downloader` and the `cloud-config-executor`, both written in `bash` which is even templated. The sheer complexity of these two scripts, combined with scalability and performance issues urges their removal.

## Basic Design

The basic idea how we wanted to remove the cloud-config-downloader is like this:

- write a very small bash script called `gardener-node-init`, which is carried with the cloud-init data, and then has the sole purpose of downloading and starting a kubernetes controller `gardener-node-agent` responsible for the logic to make the machine a worker node.
- the kubernetes controller on the machine called `gardener-node-agent` will then watch for kubernetes resources and depending of the object and the changes there, will reconcile the worker.

## Architecture

![Design](design.drawio.svg)

TODO: description

## Gains

With the new Architecture we gain a lot, let's describe the most important gains here.

### Developer Productivity

Because we all develop in go day by day, writing business logic in `bash` is difficult, hard to maintain, almost impossible to test. Getting rid of almost all `bash` scripts which are currently in use for this very important part of the cluster creation process will enhance the speed of adding new features and removing bugs.

### Speed

Until now, the `cloud-config-downloader` runs in a loop every 60sec to check if something changed on the shoot which requires modifications on the worker node. This produces a lot of unneeded traffic on the api-server and wastes time, it will sometimes take up to 60sec until a desired modification is started on the worker node.
By using the controller-runtime we can watch for the `node`, the`OSC` in the `secret`, and the shoot-access-token in the `secret`. If any of these object changed, and only then, the required action will take effect immediately.
This will speed up operations and will reduce the load on the api-server of the shoot dramatically.

## Scalability

Actually the `cloud-config-downloader` add a random wait time before restarting the `kubelet` in case the `kubelet` was updated or a configuration change was made to it. This is required to reduce the load on the API server and the traffic on the internet uplink. It also reduces the overall downtime of the services in the cluster because every `kubelet` restart takes a node for several seconds into `NotReady` state which eventually interrupts service availability.

~~~
TODO: The `gardener-node-agent` could do this in a much intelligent way because it watches the `node` object. The gardenlet could add some annotation which tells the `gardener-node-agent` to wait for the kubelet in a coordinated manner. The coordination could be in chunks of nodes and wait for them to finish and then start with the next chunk. Also a equal time spread is possible.
~~~

Decision was made to keep the existing jitter mechanism which calculates the kubelet-download-and-restart-delay-seconds on the controller itself.

### Correctness

The configuration of the `cloud-config-downloader` is actually done by placing a file for every configuration item on the disk on the worker node. This was done because parsing the content of a single file and using this as a value in `bash` reduces to something like `VALUE=$(cat /the/path/to/the/file)`. Simple but lacks validation, type safety and whatnot.
With the `gardener-node-agent` we introduce a new API which is then stored in the `gardener-node-agent` `secret` and stored on disc in a single yaml file for comparison with the previous known state. This brings all benefits of type safe configuration.
Because actual and previous configuration are compared, removed files and units are also removed and stopped on the worker if removed from the `OSC`.

### Availability

Previously the `cloud-config-downloader` simply restarted the `systemd-units` on every change to the `OSC`, regardless which of the services changed. The `gardener-node-agent` first checks which systemd-unit was changed, and will only restart these. This will remove unneeded `kubelet` restarts.

## Pull Requests

In order to bring this work as fast as possible and as smooth as possible into `master` of gardener, we need to split the work into smaller pieces which are easy to review and gradually introduce the new feature.

We propose the following sets of pull requests:

- [ ] [Make Decoder aware of plaintext encoding](https://github.com/gardener/gardener/pull/7993) this was found missing during the implementation of the gardener-node-agent.
- [ ] Introduce `gardener-node-agent` and `gardener-node-init` with the required API, push container image with binary inside to registry, do not enable their execution (@majst01, @vknabel first gingko tests)
- [ ] Put the compiled `OSC` into the secret which is downloaded by the worker bootstrap process, no consumer yet (@Gerrit91)
- [ ] Enable downloading of the `gardener-node-init` behind a feature-gate, check os extensions if they manipulate cloud-config-downloader
      If they do some manipulation regarding cloud-config-downloader, try to remove these or enable gardener-node-init instead
      sample: https://github.com/gardener/gardener-extension-os-gardenlinux/pull/41
- [ ] Disable cloud-config-downloader, cloud-config-executor
- [ ] Remove cloud-config-downloader, cloud-config-executor

Next Steps:

- [ ] Create a umbrella issue with this content (@majst01)
- [ ] Write documentation PR
- [ ] Figure out how difficult it would be to add an extra build job to publish gardener-node-agent and potentially kubelet as OCI Image, organize a short meeting with @Christian Cwienk, @rfranzke
- [ ] Future Task: Implement configuration immutability by adding a suffix to the config file and reference of the config file in the systemd-unit, e.g. kubelet, as long as gardener-node-agent is beta restart kubelet on every OSC changes
- [ ] Review usage of configuration file read/write in every controller and document reasoning
- [ ] Silent all TODOs


## Contributors

- Tim Ebert
- Valenting Knabel
- Gerrit Schwerthelm
- Robin Schneider
- Maximilian Geberl
- Stefan Majer
