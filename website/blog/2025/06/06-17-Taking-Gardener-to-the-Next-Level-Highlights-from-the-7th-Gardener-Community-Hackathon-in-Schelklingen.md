---
title: "Taking Gardener to the Next Level: Highlights from the 7th Gardener Community Hackathon in Schelklingen"
linkTitle: "Taking Gardener to the Next Level: Highlights from the 7th Gardener Community Hackathon in Schelklingen"
newsSubtitle: June 17, 2025
publishdate: 2025-06-17
authors:
- avatar: https://avatars.githubusercontent.com/marc1404
  email: marc.vornetran@sap.com
  login: marc1404
  name: Marc Vornetran
aliases: ["/blog/2025/06/06-17-taking-gardener-to-the-next-level-highlights-from-the-7th-gardener-community-hackathon-in-schelklingen"]
---

# Taking Gardener to the Next Level: Highlights from the 7th Gardener Community Hackathon in Schelklingen

The latest "Hack The Garden" event, held in June 2025 at [Schlosshof in Schelklingen](https://schlosshof-info.de/), brought together members of the Gardener community for an intensive week of collaboration, coding, and problem-solving.
The hackathon focused on a wide array of topics aimed at enhancing Gardener's capabilities, modernizing its stack, and improving user experience.
You can find a [full summary of all topics on GitHub](https://github.com/gardener-community/hackathon/blob/main/2025-06_Schelklingen/README.md) and watch the [wrap-up presentations on YouTube](https://youtu.be/TCLXovw43HA).

![Group picture of the 7th Hack the Garden event in Schelklingen](./images/group-picture.png)

Here's a look at some of the key achievements and ongoing efforts:

## 🚀 Modernizing Core Infrastructure and Networking

A significant focus was on upgrading and refining Gardener's foundational components.

One major undertaking was the **replacement of [OpenVPN](https://openvpn.net/) with [Wireguard](https://www.wireguard.com/)** ([watch presentation](https://youtu.be/TCLXovw43HA?t=104s)).
The goal is to modernize the VPN stack for communication between control and data planes, leveraging Wireguard's reputed performance and simplicity.
OpenVPN, while established, presents challenges like TCP-in-TCP. The team developed a Proof of Concept (POC) for a Wireguard-based VPN connection for a single shoot in a local setup, utilizing a reverse proxy like [mwgp](https://github.com/apernet/mwgp) to manage connections without needing a load balancer per control plane.
A [document describing the approach](https://github.com/axel7born/vpn2/blob/wireguard/docs/wireguard.md) is available.
Next steps involve thorough testing of resilience and throughput, aggregating secrets for MWGP configuration, and exploring ways to update MWGP configuration without restarts.
Code contributions can be found in forks of [gardener](https://github.com/axel7born/gardener/tree/wireguard), [vpn2](https://github.com/axel7born/vpn2/tree/wireguard), and [mwgp](https://github.com/majst01/mwgp).

Another critical area is **overcoming the 450 `Node` limit on Azure** ([watch presentation](https://youtu.be/TCLXovw43HA?t=3076s)).
Current Azure networking for Gardener relies on route tables, which have size limitations.
The team analyzed the hurdles and discussed a potential solution involving a combination of route tables and virtual networks.
Progress here depends on an upcoming Azure preview feature.

The hackathon also saw progress on **cluster-internal L7 Load-Balancing for `kube-apiserver`s**.
Building on previous work for external endpoints, this initiative aims to provide L7 load-balancing for internal traffic from components like `gardener-resource-manager`.
Achievements include an implementation leveraging generic token kubeconfig and a dedicated ClusterIP service for Istio ingress gateway pods.
The [PR #12260](https://github.com/gardener/gardener/pull/12260) is awaiting review to merge this improvement, addressing [issue #8810](https://github.com/gardener/gardener/issues/8810).

## 🔭 Enhancing Observability and Operations

Improving how users monitor and manage Gardener clusters was another key theme.

A significant step towards Gardener's [Observability 2.0 initiative](https://github.com/gardener/gardener/blob/master/docs/proposals/34-observability2.0-opentelemtry-operator-and-collectors.md) was made with the **OpenTelemetry Transport for `Shoot` Metrics** ([watch presentation](https://youtu.be/TCLXovw43HA?t=808s)).
The current method of collecting shoot metrics via the Kubernetes API server `/proxy` endpoint lacks fine-tuning capabilities.
The hackathon proved the viability of collecting and filtering shoot metrics via OpenTelemetry collector instances on shoots, transporting them to Prometheus OTLP ingestion endpoints on seeds. This allows for more flexible and modern metrics collection.

For deeper network insights, the **Cluster Network Observability** project ([watch presentation](https://youtu.be/TCLXovw43HA?t=1342s)) enhanced the [Retina tool](https://github.com/microsoft/retina) by Microsoft.
The team successfully added labeling for source and destination availability zones to Retina's traffic metrics ([see issue #1654](https://github.com/microsoft/retina/issues/1654) and [PR #1657](https://github.com/microsoft/retina/pull/1657)).
This will help identify cross-AZ traffic, potentially reducing costs and latency.

To support lightweight deployments, efforts were made to **make `gardener-operator` Single-Node Ready** ([watch presentation](https://youtu.be/TCLXovw43HA?t=511s)).
This involved making several components, including Prometheus deployments, configurable to reduce resource overhead in single-node or bare-metal scenarios.
Relevant PRs include those for [gardener-extension-provider-gcp #1052](https://github.com/gardener/gardener-extension-provider-gcp/pull/1052), [gardener-extension-provider-openstack #1042](https://github.com/gardener/gardener-extension-provider-openstack/pull/1042), [fluent-operator #1616](https://github.com/fluent/fluent-operator/pull/1616), and [gardener #12248](https://github.com/gardener/gardener/pull/12248), along with fixes in forked Cortex and Vali repositories.

Streamlining node management was the focus of the **Worker Group Node Roll-out** project ([watch presentation](https://youtu.be/TCLXovw43HA?t=3806s)).
A PoC was created (see [rrhubenov/gardener branch](https://github.com/rrhubenov/gardener/tree/worker-pool-rollout)) allowing users to trigger a node roll-out for specific worker groups via a shoot annotation (`gardener.cloud/operation=rollout-workers=<pool-names>`), which is particularly useful for scenarios like dual-stack migration.

Proactive workload management is the aim of the **Instance Scheduled Events Watcher** ([watch presentation](https://youtu.be/TCLXovw43HA?t=4010s)).
This initiative seeks to create an agent that monitors cloud provider VM events (like reboots or retirements) and exposes them as node events or dashboard warnings.
A [PR #9170 for cloud-provider-azure](https://github.com/kubernetes-sigs/cloud-provider-azure/pull/9170) was raised to enable this for Azure, allowing users to take timely action.

## 🛡️ Bolstering Security and Resource Management

Security and efficient resource handling remain paramount.

The **Signing of `ManagedResource` Secrets** project ([watch presentation](https://youtu.be/TCLXovw43HA?t=1556s)) addressed a potential privilege escalation vector.
A PoC demonstrated that signing `ManagedResource` secrets with a key known only to the Gardener Resource Manager (GRM) is feasible, allowing GRM to verify secret integrity.
This work is captured in [gardener PR #12247](https://github.com/gardener/gardener/pull/12247).

Simplifying operations was the goal of **Migrating Control Plane Reconciliation of Provider Extensions to `ManagedResource`s** ([watch presentation](https://youtu.be/TCLXovw43HA?t=1785s)). Instead of using the chart applier, this change wraps control-plane components in `ManagedResource`s, improving scalability and automation (e.g., scaling components imperatively).
[Gardener PR #12251](https://github.com/gardener/gardener/pull/12251) was created for this, with a stretch goal related to [issue #12250](https://github.com/gardener/gardener/issues/12250) explored in a [compare branch](https://github.com/gardener/gardener/compare/master...metal-stack:gardener:controlplane-objects-provider-interface).

A quick win, marked as a 🏎️ fast-track item, was to **Expose EgressCIDRs in the shoot-info `ConfigMap`** ([watch presentation](https://youtu.be/TCLXovw43HA?t=2961s)).
This makes egress CIDRs available to workloads within the shoot cluster, useful for controllers like [Crossplane](https://www.crossplane.io/).
This was implemented and merged during the hackathon via [gardener PR #12252](https://github.com/gardener/gardener/pull/12252).

## ✨ Improving User and Developer Experience

Enhancing the usability of Gardener tools is always a priority.

The **Dashboard Usability Improvements** project ([watch presentation](https://youtu.be/TCLXovw43HA?t=2052s)) tackled several areas based on [dashboard issue #2469](https://github.com/gardener/dashboard/issues/2469). Achievements include:
*   Allowing custom display names for projects via annotations ([dashboard PR #2470](https://github.com/gardener/dashboard/pull/2470)).
*   Configurable default values for Shoot creation, like AutoScaler min/max replicas ([dashboard PR #2476](https://github.com/gardener/dashboard/pull/2476)).
*   The ability to hide certain UI elements, such as Control Plane HA options ([dashboard PR #2478](https://github.com/gardener/dashboard/pull/2478)).

The **Documentation Revamp** ([watch presentation](https://youtu.be/TCLXovw43HA?t=2551s)) aimed to improve the structure and discoverability of Gardener's documentation.
Metadata for pages was enhanced ([documentation PR #652](https://github.com/gardener/documentation/pull/652)), the glossary was expanded ([documentation PR #653](https://github.com/gardener/documentation/pull/653)), and a PoC for using VitePress as a more modern documentation generator was created.

## 🔄 Advancing Versioning and Deployment Strategies

Flexibility in managing Gardener versions and deployments was also explored.

The topic of **Multiple Parallel Versions in a Gardener Landscape** (formerly Canary Deployments) ([watch presentation](https://youtu.be/TCLXovw43HA?t=3482s)) investigated ways to overcome tight versioning constraints.
It was discovered that the current implementation already allows rolling out different extension versions across different seeds using controller registration seat selectors.
Further discussion is needed on some caveats, particularly around the `primary` field in `ControllerRegistration` resources.

Progress was also made on **GEP-32 – Version Classification Lifecycles** (🏎️ fast-track).
This initiative, started in a previous hackathon, aims to automate version lifecycle management.
The previous PR ([metal-stack/gardener #9](https://github.com/metal-stack/gardener/pull/9)) was rebased and broken into smaller, more reviewable PRs.

## 🌱 Conclusion

The Hack The Garden event in Schelklingen was a testament to the community's dedication and collaborative spirit.
Numerous projects saw significant progress, from PoCs for major architectural changes to practical improvements in daily operations and user experience.
Many of these efforts are now moving into further development, testing, and review, promising exciting enhancements for the Gardener ecosystem.

Stay tuned for more updates as these projects mature and become integrated into Gardener!

The next hackathon takes place in early December 2025.
If you'd like to join, head over to the [Gardener Slack](https://join.slack.com/t/gardener-cloud/shared_invite/zt-33c9daems-3oOorhnqOSnldZPWqGmIBw).
Happy to meet you there! ✌️
