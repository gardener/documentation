---
title: Hackathons
weight: 30
---

Project Gardener is an essential component of [ApeiroRA](https://apeirora.eu), part of the European IPCEI-CIS [initiative](https://www.bmwk.de/Redaktion/EN/Artikel/Industry/ipcei-cis.html).
The community building in open-source is actively encouraged by the EU Commission with the [Open source software strategy](https://commission.europa.eu/about-european-commission/departments-and-executive-agencies/digital-services/open-source-software-strategy_en).

This repository is meant to collect information, input, output, etc. related to Gardener Hackathons.
If you feel like you can contribute something, you are encouraged to file a PR.

## 📅 Events

| Date                    | Location                                                                        | Organizer | Wrap Up                 |
|:------------------------|:--------------------------------------------------------------------------------|:----------|:------------------------|
| 04.05.2026 – 08.05.2026 | [Schlosshof Freizeitheim, Schelklingen](https://www.schlosshof-info.de/)        | x-cellent | [Summary](./2026-05.md) |
| 08.12.2025 – 12.12.2025 | [SAP Center Walldorf](https://maps.app.goo.gl/L3Yv7jooK9kfsaxb9)                | SAP       | [Summary](./2025-12.md) |
| 24.11.2025 – 28.11.2025 | [Schlosshof Freizeitheim, Schelklingen](https://www.schlosshof-info.de/)        | x-cellent | [Summary](./2025-11.md) |
| 21.07.2025 – 25.07.2025 | [SAP Center Sofia](https://maps.app.goo.gl/SPdvQ4F2p7Qqfx4p9)                   | SAP       | [Summary](./2025-07.md) |
| 02.06.2025 – 06.06.2025 | [Schlosshof Freizeitheim, Schelklingen](https://www.schlosshof-info.de/)        | x-cellent | [Summary](./2025-06.md) |
| 02.12.2024 – 06.12.2024 | [Schlosshof Freizeitheim, Schelklingen](https://www.schlosshof-info.de/)        | x-cellent | [Summary](./2024-12.md) |
| 13.05.2024 – 17.05.2024 | [Schlosshof Freizeitheim, Schelklingen](https://www.schlosshof-info.de/)        | x-cellent | [Summary](./2024-05.md) |
| 06.11.2023 – 10.11.2023 | [Schlosshof Freizeitheim, Schelklingen](https://www.schlosshof-info.de/)        | x-cellent | [Summary](./2023-11.md) |
| 22.05.2023 – 26.05.2023 | [Open Sky House, Leverkusen](https://www.openskyhouse.org/)                     | STACKIT   | [Summary](./2023-05.md) |
| 26.09.2022 – 30.09.2022 | [Württemberger Haus, Hirschegg, Österreich](https://www.wuerttembergerhaus.de/) | SAP       | [Summary](./2022-09.md) |
| 02.11.2021 – 05.11.2021 | [Mesnerhof C, Steinberg am Rofan, Österreich](https://www.mesnerhof-c.at/)      | x-cellent | [Summary](./2021-11.md) |

A subsequent Hackathon is proposed to be held in autumn 2026, but concrete dates are not decided yet.

## 🔍 What to Expect

The Gardener Community Hackathon is a week-long event held twice a year (spring and late autumn) where we team up with Gardener community members. As you can see [above](#📅-events), it usually takes place in *Schelklingen, Germany*, and focuses on collaborative work on Gardener-related topics. A few weeks beforehand, we hold a planning meeting where everyone can pitch ideas and vote on the topics they're interested in tackling. Initial teams are formed based on these topics, aiming to mix participants from different companies for diversity. That said, teams can change, and you can switch topics dynamically during the week as desired – there are no hard rules or enforcements.

You can check out past topics in the summary documents stored inside this repository – it's a broad mix, and pretty much anything Gardener-related is welcome! The week starts around 12 PM on Monday and wraps up around 10 AM on Friday. During the Hackathon, we have regular demo sessions to showcase team progress, and topics are briefly presented in a review meeting the following week.

On-site, breakfast is provided daily, lunch comes via catering, and we cook dinner together (participation optional). One evening, we go out for dinner. For fun, there's table soccer, table tennis, pool, and a huge outdoor area. Some folks go running in the mornings before breakfast. Internet access is via Starlink, and we usually organize car pools to get to the location.

### Which topics are in scope?

In general, all topics in the ecosystem of Gardener are in scope.
This includes, but is not limited to, anything directly part of [gardener/gardener](https://github.com/gardener/gardener), extensions, infrastructure providers, documentation, testing, performance evaluations, and anything else that you can think of that is related to Gardener!

Once the planning for a hackathon event kicks off, topic proposals are collected in the [hackathon repository](https://github.com/gardener/hackathon) as issues.
These issues are discussed and presented to each other in a topic collection meeting in the round of the participants.
After the topic collection, a voting process takes place where each participant can vote for the topics they are interested in.
Based on the voting results, initial teams are formed around the most popular topics, ensuring a mix of participants from different companies to foster diversity and collaboration.
However, it's important to note that these teams are not fixed, and participants have the flexibility to switch topics dynamically during the week as they see fit, allowing for a fluid and collaborative environment.

Long story short: Any topic that the hackathon participants agree on is in scope.

## 🤝 How to Participate

There is a Slack channel called [`#hack-the-garden`](https://gardener-cloud.slack.com/archives/C0531FVMZFU) in [Gardener's Slack workspace](https://join.slack.com/t/gardener-cloud/shared_invite/zt-33c9daems-3oOorhnqOSnldZPWqGmIBw). Feel free to join and reach out! The community is always happy to welcome new faces to the event.

### Technical Prerequisites

Gardener hackathons are a great opportunity for meeting new people in the community and collaborating on interesting topics from various parts of the codebase.
Nonetheless, please be aware that you need to have a certain level of technical knowledge to be able to contribute effectively and make the event worthwhile for you as well!

**Recommendations:**
* Solid experience in programming. Ideally, you already have hands-on experience with [Go](https://go.dev/) and you're familiar with developing Kubernetes controllers using [controller-runtime](https://github.com/kubernetes-sigs/controller-runtime).
* Familiarity with [Kubernetes](https://kubernetes.io/) concepts and architecture, as well as experience working with Kubernetes APIs and resources.
* An understanding of Gardener's architecture and components, as well as its codebase and development practices.
* Prepare the [local setup for Gardener](https://github.com/gardener/gardener/blob/master/docs/deployment/getting_started_locally.md) development. All required dependencies need to be downloaded before the event and your device should be capable of running Gardener locally.
* Experience with cloud providers and their APIs, as Gardener supports multiple infrastructure providers (hyperscalers, OpenStack, bare metal, you name it).

> [!TIP]
> The recommendations listed above are not an exhaustive list nor a strict requirement for participation.
> They are meant to give you an idea of the technical background that can be helpful for contributing effectively during the hackathon.

### Organization Prerequisites

Due to logistics and available space at the event location there is a limit of 30 participants per event.
Make sure to follow ongoing planning activities in the [`#hack-the-garden`](https://gardener-cloud.slack.com/archives/C0531FVMZFU) Slack channel and register yourself in time!

Historically the cost per person for the week has been around 500-600 €, which includes accommodation, food, and drinks.
The exact cost can vary based on the location and the number of participants, but we always strive to keep it affordable for everyone.
Please clarify these costs before registering for the event!

## 🤖 AI Guidance

Usage of Generative AI tools at the hackathons is generally allowed, but it should be done in a responsible and conscious manner.
Participants can use AI tools to assist with coding, debugging, and problem-solving, but they should not rely solely on AI for their work.
At the end of the day, the hackathon is meant to be a collaborative event, between **humans**, where participants learn from each other and work together to solve problems.

If you need further guidance feel free to consider the following documents as well.
The points that they describe follow the same principles that the Gardener project follows:
* [Kubernetes AI Guidance](https://www.kubernetes.dev/docs/guide/pull-requests/#ai-guidance)
* [Usage of Generative AI Tools at metal-stack.io](https://metal-stack.io/community/contribution-guideline/#usage-of-generative-ai-tools)
