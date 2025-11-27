---
exclude: true
prev: false
next: false
---

# Would it make sense to have a rolling update of the gardener-node-agent?

The point of this discussion was to share an opinion on how we can improve on certain downsides of the currently implemented "update jitter" for applying the gardener-node-agent configuration.

## Summary

Downsides of the jitter-approach are:

- It can happen that kubelet restarts happen at the same time
  - Also the jitter periods do not seem to be distributed evenly (as shown by Github comment)
- Node is becoming `NotReady` on kubelet restart leading to a brief traffic interruption for this specific node (e.g. for metal-stack metallb withdraws the route announcements to this node)
- Restarting kubelets in parallel puts pressure on the API server
- When an update goes wrong there is no way to stop the update process such that theoretically a node meltdown can appear (e.g. when kubelet restart on a node leads to node freeze for whatever reason, then updates on the other nodes will be carried out anyway)

Together we decided the common problem that we want to tackle first is that updates can occur in parallel. For this some easier approaches as presented in the following section can be used as a source of inspiration.

A more complete solution that also stops updates can come into play once the gardener-node-agent is in place. First, we want to keep the complexity as low as possible.

Also we agreed that we should collect metrics of kubelet restarts / systemd unit restarts on the nodes as this allows us to make better judgement of our proposed solutions.

## Approaches

## Lease Solution (Serialized Updates instead of jitter)

The GNA acquires a lease resource and can then apply its configuration changes. This effectively leads serialized execution of the update.

- (+) Small implementation burden
- (-) Can not stop the rollout if something goes wrong

## Smarter Delay Algorithm

- (+) Not introducing anymore resources for GNA, only GNA has to implement an algorithm
- (-) Can not stop the rollout if something goes wrong

## Sophisticated Idea: Orchestrated update through gardener-node-agent-controller

- (+) Can stop the update process (protect against node meltdown scenarios)
- (+) Good observability
- (+) Set Health can contribute to overall shoot state
- (-) Complexity
- (-) Bigger architectural change
- (o) If an update is stopped, updates are not distributed anymore to other nodes as long as the original problem gets fixed
- (o) certain similarities to Kubernetes Sets and Pods

![Rough Sketch](rolling_update_proposal.drawio.svg)
