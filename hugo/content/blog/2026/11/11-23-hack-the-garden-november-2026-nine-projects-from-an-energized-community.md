---
title: "Hack The Garden, November 2026: Nine Projects From an Energized Community"
linkTitle: "Hack The Garden, November 2026: Nine Projects From an Energized Community"
newsSubtitle: November 23, 2026
publishdate: 2026-11-23
authors:
- avatar: https://avatars.githubusercontent.com/marc1404
  login: marc1404
  name: Marc Vornetran
tags:
- community-event
- hackathon
aliases: ["/blog/2026/11/23/hack-the-garden-november-2026-nine-projects-from-an-energized-community"]
---

Twice a year, the Gardener community downs its day-to-day tools and gathers for **Hack The Garden** — a few focused days where maintainers, adopters, and newcomers team up on ideas that are too exploratory, too cross-cutting, or simply too much fun to fit into the regular roadmap. The November 2026 edition was no exception, and on November 18 the teams reconvened for the wrap-up review meeting to show what they had built.

From shrinking a whole Gardener landscape to teaching clusters to swap their CNI without downtime, here is a tour through everything that was demoed — and why each project matters. You can watch the full session in the [recording](https://youtu.be/4uUhZaSlYdE).

## Make Gardener Small Again

Gardener is built to manage clusters at massive scale, but what does that cost you when you only run a handful of shoots? This project took a baseline landscape — a virtual garden with one managed seed and three shoots — and went hunting for waste: autoscaling settings that could be tuned for small environments without hurting large ones, and components that could be made optional when they are not strictly needed. The result is a set of concrete findings and improvement ideas for making Gardener leaner where it counts. ([recording](https://youtu.be/4uUhZaSlYdE?t=99))

## Compatibility Between Extensions and Gardener

As the extension ecosystem grows — especially with extensions maintained outside the core team — keeping track of which extension works with which Gardener version has become a manual, error-prone affair that leans on README files. This project prototyped a programmatic way for extensions to **declare their version compatibility** so Gardener can verify it at deploy time, backed by a draft GEP. It is a small change in principle with a big payoff in robustness for anyone running a diverse extension stack. ([recording](https://youtu.be/4uUhZaSlYdE?t=355))

## Make Core Gardener Resources Compatible with `kstatus`

`kstatus` is a widely adopted convention for answering a deceptively simple question: *is this resource fully reconciled yet?* Tools like `kubectl`, Helm, and Flux rely on it. Gardener resources already report `status.observedGeneration`, but they do not surface the `Ready`/`Reconciling`/`Stalled` conditions `kstatus` expects. This project set out to add them to the big reconciliation flows, which would let ecosystem tooling understand Gardener resources out of the box and make custom workarounds unnecessary. ([recording](https://youtu.be/4uUhZaSlYdE?t=930))

## Switching CNIs

The CNI is marked immutable in the shoot spec for good reason — swapping it carelessly risks cluster downtime. But sometimes you really do want to migrate, for example from Calico to Cilium. Building on an earlier proof of concept, this team explored a **downtime-free CNI switch** using native routing mode on both CNIs, a route controller from the cloud-controller-manager, and migration logic in Gardener. It is a genuinely hard networking problem, and the demo showed it is not out of reach. ([recording](https://youtu.be/4uUhZaSlYdE?t=1136))

## A Beginner's Guide to Gardener

Gardener has plenty of conceptual documentation, but far less that walks a newcomer through *actually getting started* on a specific platform. This project closed that gap with step-by-step, hands-on onboarding guides for deploying Gardener on IronCore, metal-stack, and STACKIT — the kind of documentation that turns a curious first-timer into a productive contributor and saves them from the struggles the rest of us remember all too well. ([recording](https://youtu.be/4uUhZaSlYdE?t=1790))

## [GEP-28] Bootstrap a Self-Hosted Shoot on Cloud Infrastructure

GEP-28 — self-hosted shoot clusters via `gardenadm` — has so far been exercised almost entirely in the local development setup. This project took the leap to **real cloud infrastructure**, spinning up a self-hosted shoot on an actual provider and ironing out the issues that only surface outside the comfort of a local cluster. It is an important reality check on the road to making self-hosted shoots production-ready. ([recording](https://youtu.be/4uUhZaSlYdE?t=2061))

## [GEP-28] Don't Require a Provider Extension for Unmanaged Infrastructure

Also under the GEP-28 umbrella, this project tackled a papercut in the unmanaged-infrastructure scenario: today you still need a provider extension even when there is no cloud provider to manage. The team explored letting `.spec.provider.type` be empty, removing the requirement for a provider extension when it serves no purpose — a meaningful simplification for anyone running Gardener on bare metal or otherwise unmanaged infrastructure. ([recording](https://youtu.be/4uUhZaSlYdE?t=2408))

## Native Routing in the Local Dev Setup

Gardener's local development setup uses overlay networking, which means a whole class of networking scenarios can only be tested against real shoot clusters. With a `cloud-controller-manager` now on the horizon, this project implemented a **route controller to enable native routing locally**, applying routes directly on the kind cluster's nodes. The payoff: developers can test things like switching between native routing and overlay networking right on their laptops. ([recording](https://youtu.be/4uUhZaSlYdE?t=2786))

## Introduce a Machine Maintenance Phase

When a node goes down for *planned* maintenance — a firmware update, a host reboot — the machine-controller-manager today treats it like a failure: health checks fire, the `MachineDeployment` goes unhealthy, and rollouts stall. This project introduced a dedicated `Maintenance` phase so MCM recognizes a `maintenance=true` label, keeps the deployment's `Available` condition green, reports maintenance machines separately rather than as failures, and refrains from blocking rolling and in-place updates. Planned downtime finally stops looking like an incident. ([recording](https://youtu.be/4uUhZaSlYdE?t=3476))

## Not Every Great Idea Ships as Code

Two topics were less about implementation and more about where the project is heading. The first was a discussion on **guidelines for AI usage in contributions** — as agentic tools proliferate, the community weighed whether Gardener should adopt clear rules at the repository or organization level, drawing on examples from Kubernetes, metal-stack, and others. The second explored **moving widely-used generic extensions into the `gardener` GitHub organization**, such as the ACL, shoot-flux, audit, and S3-backup extensions currently hosted elsewhere, to give shared community tooling a more central home.

## Thanks

Hack The Garden is, above all, a community effort — thank you to everyone who proposed a topic, joined a team, and demoed their work. If any of these projects sparked an idea, follow the links below and jump into the conversation.

## Sources

- [Hack The Garden November 2026 — Wrap-Up Recording](https://youtu.be/4uUhZaSlYdE)
- [Gardener Hackathon November 2026 overview](https://gardener.cloud/community/hackathons/2026-11/)
- [Gardener Review Meetings — 2026](https://gardener.cloud/community/review-meetings/2026-reviews/)
