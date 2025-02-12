---
title: Community
url: /community
---

# Gardener Review Meetings

## What Are the Gardener Review Meetings?

The Gardener Review Meeting is a recurring meeting where we review the latest developments in the Gardener ecosystem. We discuss recent releases, highlight key changes, and showcase live demos of new features and improvements.

This meeting is open to everyone interested in Gardener, from contributors and maintainers to users and community members. We focus on updates relevant to the open-source community while avoiding company-specific details.

## How to Participate

- **Join the Meeting:** Meetings are usually held bi-weekly, typically in the week after a new Gardener version is released. If there are many topics, additional meetings may be scheduled.
- **Present a Topic:** If you would like to showcase a feature, bug fix, or any other relevant topic, reach out to us! Each topic should ideally include a short live demo and last 5-10 minutes.
- **Setup for Demos:** Use a [local](https://gardener.cloud/docs/gardener/deployment/getting_started_locally/#developing-gardener) or [remote](https://gardener.cloud/docs/gardener/deployment/getting_started_locally/#remote-local-setup) setup for your demonstrations if applicable.

📅 **Meeting Invitations:** If you are not already on the invite list and would like to join, message us in our [#gardener](https://kubernetes.slack.com/messages/gardener) Slack channel in the Kubernetes workspace, or get in touch with [@rfranzke (Rafael Franzke)](mailto:rafael.franzke@sap.com).

## Recordings & Public Access

{{% alert color="info" %}}
From 2025 onwards, all meetings are recorded and uploaded publicly to the [Gardener YouTube channel](https://www.youtube.com/@GardenerProject).
{{% /alert %}}

If you do not consent to being recorded, please do not enable your microphone or camera, or do not join the meetings.

## Review Meetings in 2025

Below, you’ll find the agendas of past meetings along with links to their recordings. Check back regularly for updates and upcoming topics!

### 2025/02/12 - [v1.111](https://github.com/gardener/gardener/releases/tag/v1.111.0) Release

[📽️ Recording](https://youtu.be/JJHELb0wJyg)

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@marc1404](https://github.com/marc1404) | `5m` | ⚙️ Default Machine Image Version | [#10954](https://github.com/gardener/gardener/pull/10954) |
| [@timuthy](https://github.com/timuthy) | `10m` | 👨🏻‍🌾 Gardener Operator Manages `Extension` Resources | [#11192](https://github.com/gardener/gardener/pull/11192), [#11001](https://github.com/gardener/gardener/pull/11001) |
| [@dimityrmirchev](https://github.com/dimityrmirchev) | `5m` | 🚫 `Secret`/`ConfigMap` Tampering Protection | [#11108](https://github.com/gardener/gardener/pull/11108) |
| [@oliver-goetz](https://github.com/oliver-goetz) | `5m` | 🗑️ Improved Deletion Logic In `gardener-node-agent` | [#11015](https://github.com/gardener/gardener/pull/11015) |

#### No Demo, But Still Worth Celebrating 🎉

- ✨ [USER] Expired versions from the `NamespacedCloudProfile` are always dropped, except for already applied versions. [#10910](https://github.com/gardener/gardener/pull/10910)
- ✨ [OPERATOR] Now `vali` contains the managed control plane logs from the early stages of `Shoot` reconcile. [#11082](https://github.com/gardener/gardener/pull/11082)
- 🐛 [OPERATOR] An issue was fixed in `gardener-operator` that prevented configuring OIDC for `gardener-dashboard` while using Structured Authentication. [#11080](https://github.com/gardener/gardener/pull/11080)

## Review Meetings in 2024

<details>
  <summary>Click here to expand the archived overview of the Review Meetings in 2024!</summary>

  TODO
</details>

## Review Meetings in 2023

<details>
  <summary>Click here to expand the archived overview of the Review Meetings in 2023!</summary>

  TODO
</details>

## Community Calls (2022 and before)

<details>
  <summary>Click here to expand the archived overview of the Community Calls in 2022 and before!</summary>

  | Topic | Speaker | Date and Time | Link |
  | ----- | ------- | ------------- | ------- |
  |**Get more computing power in Gardener by overcoming Kubelet limitations with CRI-resource-manager** |[Pawel Palucki](https://github.com/ppalucki), [Alexander D. Kanevskiy](https://github.com/kad)|October 20, 2022|[Recording](https://www.youtube.com/watch?v=5a_A3furzlg) <br> [Summary](../blog/2022/10.20-Gardener-Community-Meeting-October-2.md)|
  |**Cilium / Isovalent Presentation**|[Raymond de Jong](https://github.com/raymonddejong)|October 6, 2022|[Recording](https://www.youtube.com/watch?v=46nCdVA-rsc) <br> [Summary](../blog/2022/10.06-Gardener-Community-Meeting-October.md)|
  |**Gardener Extension Development - From scratch to the gardener-extension-shoot-flux**|[Jens Schneider](https://github.com/jensac), Lothar Gesslein|June 9, 2022|[Recording](https://www.youtube.com/watch?v=nG2FRYL05mc&ab_channel=GardenerProject) <br> [Summary](../blog/2022/06.17-Gardener-Community-Meeting-June.md)|
  |**Deploying and Developing Gardener Locally (Without Any External Infrastructure!)**|[Tim Ebert](https://github.com/timebertt), [Rafael Franzke](https://github.com/rfranzke)|March 17, 2022|[Recording](https://www.youtube.com/watch?v=nV_JI8YWwY4&ab_channel=GardenerProject) <br> [Summary](../blog/2022/03.23-Gardener-Community-Meeting-March.md)|
  |**Gardenctl-v2**|[Holger Koser](https://github.com/holgerkoser), [Lukas Gross](https://github.com/grolu), [Peter Sutter](https://github.com/petersutter)|February 17, 2022|[Recording](https://www.youtube.com/watch?v=U1VvyQiE3Jg) <br> [Summary](../blog/2022/02.17-Gardener-Community-Meeting-February.md)|
</details>
