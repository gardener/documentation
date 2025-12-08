---
title: Project Steering
weight: 20
---

## Project Steering

This page contains proposals and supporting documents for the Gardener [Product Steering](./product) and [Technical Steering](./technical) meetings.
These meetings are essential governance bodies in the Gardener project:

- **Product Steering**: Focuses on prioritization, vision, roadmap alignment, and cross-cutting concerns.
- **Technical Steering**: Focuses on architecture, technical direction, and design decisions.

Each proposal in this repository aims to provide sufficient context, motivation, and a concrete ask or decision request to facilitate informed and effective discussion during the respective steering meeting.

### 🧑‍💼 Product Steering

Product Steering provides strategic direction for major product increments. Product ideas can be submitted to the Product Steering Committee as proposals. The proposer must provide a brief document outlining the idea. Ideally, if applicable, a prototype should be included to demonstrate feasibility, but no full implementation or design document is expected (or desired) at this stage.

So, Gardener's Product Steering discusses topics at an early stage, before substantial efforts begin. It focuses on the 'Whether'/'Why' question. In contrast, [Gardener's Technical Steering](./technical) discusses topics at a later stage, when a design document has been crafted. It focuses on the 'How' question, meaning the go/no-go decision has already been made in the Product Steering. A topic which has passed the Product Steering is typically a natural fit for a Technical Steering once the design process reaches a sufficient technical depth.

The committee will schedule a Product Steering meeting, where the proposer presents the proposal. Committee members, interested contributors, and affected sponsors will challenge and discuss the idea. This meeting will be recorded.

Following this, a private go/no-go decision meeting with the affected sponsors will take place. This second meeting will not be recorded, but the outcome will be documented and shared here.

#### Why Do We Need It?

We aim to align sponsored development capacity with Gardener's strategic vision and priorities. Investments should deliver value either to Gardener's users and operators or to the project and its overall reach.

#### Who is on The Product Steering Committee?

The committee is elected by the project's active contributing sponsors and consists of a small number of members (at least three). Currently, the committee members are:
- [Johannes Scheerer](https://github.com/scheererj) ([Email](mailto:johannes.scheerer@sap.com) and [Slack](https://gardener-cloud.slack.com/team/U048D8K0N65))
- [Rafael Franzke](https://github.com/rfranzke) ([Email](mailto:rafael.franzke@sap.com) and [Slack](https://gardener-cloud.slack.com/team/UAQT84PK7))
- [Tim Ebert](https://github.com/timebertt) ([Email](mailto:tim.ebert@stackit.cloud) and [Slack](https://gardener-cloud.slack.com/team/U03VASPK6TC))
- [Vedran Lerenc](https://github.com/vlerenc) ([Email](mailto:vedran.lerenc@sap.com) and [Slack](https://gardener-cloud.slack.com/team/UAQ7R439P))

#### Key Considerations for Topics

A topic qualifies for Product Steering if it:
- Requires **significant development effort** (≥ 6 or more person-months of work, calculated as full-time effort), OR
- Has **relevant cross-team impact**, i.e., directly affects multiple teams (e.g., at least two distinct teams such as development, operations, or support) by altering workflows, system stability (like landscape integrity), or operational processes in a way that demands measurable adaptation or coordination, OR
- **Impacts Gardener's users or ecosystem significantly**, e.g., through changes to core functionality or interfaces, or **significantly expands the project’s reach** (e.g., enabling a new major use case or market), OR
- Introduces **high technical or operational risk** - such as potential downtimes, data loss, or security vulnerabilities - that require formal evaluation and mitigation planning beyond routine testing.

### 🧑‍💻 Technical Steering

Technical Steering provides architectural and technical direction for major product increments. Technical documents can be submitted to the Technical Steering Committee for discussion. This document should outline the proposed solution, with a particular focus on APIs and interfaces, while also covering other relevant aspects, but no full implementation is expected (or desired) at this stage.

So, Gardener's Technical Steering discusses topics at a later stage, when a design document has been crafted. It focuses on the 'How' question, meaning the go/no-go decision has already been made. In contrast, [Gardener's Product Steering](./product) discusses topics at an early stage, before substantial efforts begin. It focuses on the 'Whether'/'Why' question.

The committee will schedule a Technical Steering meeting where the proposer presents the document. Committee members and interested contributors will challenge and discuss the idea. This meeting will be recorded.

A decision on how to proceed with the document, including any recommended improvements, will be made within the same meeting. The decision and any required changes will be documented and shared here.

#### Why Do We Need It?

Technical Steering ensures that major technical changes align with Gardener's architectural principles and long-term sustainability. It prevents fragmentation and promotes consistency in the project's evolution. The process helps ensure that major technical investments deliver value to both Gardener's users and maintainers.

#### Who is on The Technical Steering Committee?

The committee is elected by the project's active code owners and contributors and consists of a small number of members (at least three). Currently, the committee members are:
- [Johannes Scheerer](https://github.com/scheererj) ([Email](mailto:johannes.scheerer@sap.com) and [Slack](https://gardener-cloud.slack.com/team/U048D8K0N65))
- [Rafael Franzke](https://github.com/rfranzke) ([Email](mailto:rafael.franzke@sap.com) and [Slack](https://gardener-cloud.slack.com/team/UAQT84PK7))
- [Tim Ebert](https://github.com/timebertt) ([Email](mailto:tim.ebert@stackit.cloud) and [Slack](https://gardener-cloud.slack.com/team/U03VASPK6TC))
- [Vedran Lerenc](https://github.com/vlerenc) ([Email](mailto:vedran.lerenc@sap.com) and [Slack](https://gardener-cloud.slack.com/team/UAQ7R439P))

#### Key Considerations for Topics

A topic qualifies for Technical Steering if it:
- Requires **significant development effort** (≥ 6 or more person-months of work, calculated as full-time effort), OR
- Has **relevant cross-team impact**, i.e., directly affects multiple teams (e.g., at least two distinct teams such as development, operations, or support) by altering workflows, system stability (like landscape integrity), or operational processes in a way that demands measurable adaptation or coordination, OR
- **Impacts Gardener's users or ecosystem significantly**, e.g., through changes to core functionality or interfaces, or **significantly expands the project’s reach** (e.g., enabling a new major use case or market), OR
- Introduces **high technical or operational risk** - such as potential downtimes, data loss, or security vulnerabilities - that require formal evaluation and mitigation planning beyond routine testing.

### 🧭 How to Propose a Topic

If you'd like to bring a topic to either steering meeting, follow these steps:

1. **Choose the relevant committee**: Product or Technical.
2. **Copy the template** from [here](https://github.com/gardener/documentation/blob/master/website/community/steering/assets/_template.md) into **a new file** (e.g., `2025-07-my-awesome-idea.md`) in the respective directory: [Product Steering](https://github.com/gardener/documentation/tree/master/website/community/steering/product) or [Technical Steering](https://github.com/gardener/documentation/tree/master/website/community/steering/technical).
3. **Add your proposal as content** in that file.
4. (Optional) Add diagrams, slides, or other supporting materials in the respective `assets/<filename>/` subfolder.
5. [**Open a Pull Request**](https://github.com/gardener/documentation/compare) to submit your proposal for review and scheduling.

> 💡 Keep your proposal concise (2–5 pages). The goal is to clearly motivate your idea and define what decision or feedback you need.

#### 📝 Proposal Template Outline

Each proposal should include the following sections (see the [template](https://github.com/gardener/documentation/blob/master/website/community/steering/assets/_template.md) for details):

- Motivation
- Proposal
- Impact and Alternatives
- Decision Request
- (Optional) Appendix with supporting content

#### 📆 What Happens After Opening a PR?

Once your PR is open:

- A **member of the relevant steering committee** will reach out to:
  - Coordinate with you to **schedule a presentation date** at an upcoming meeting.
  - Merge your pull request which will automatically **publishing the topic** on the public meeting agenda (e.g., [here](./product) or [here](./technical)).
  - **Inform the team** about the new proposal via our [`#gardener`](https://gardener-cloud.slack.com/archives/C045DSWJZB9) Slack channel.

You'll then present the proposal in the meeting for discussion and decision-making.

### 🗣️ Participation

- Those who wish to **actively challenge or discuss** the proposal can **request an invitation** from any committee member.
- Others are encouraged to **watch the recording** instead of attending live.

### 📑 Meeting Process

- Attendees are expected to have **read the proposal in advance and come prepared**.
- Product Steering:
  - The meeting will be **scheduled for 1h** and is split into **10-20-30** minute blocks:
    - The proposer has up to **10 minutes** time to reiterate the **key aspects of and motivation for the proposal, including the ask for decision**, e.g., "I need a decision whether we shall develop product feature X. Here is why I think this is important for Gardener: ...".
    - Attendees then have up to **20 minutes** time to **ask clarifying questions**.
    - The last **30 minutes** are reserved to **provide feedback, possibly challenge the document, and generally for an active discussion**.
- Technical Steering:
  - The meeting will be **scheduled for 1h** and is split into **10-20-20-10** minute blocks:
    - The proposer has up to **10 minutes** time to reiterate the **key aspects of and motivation for the technical document, including the ask for decision**, e.g., "I need a decision how to implement product feature X. Here is why I think this is the right approach for Gardener: ...".
    - Attendees then have up to **20 minutes** time to **ask clarifying questions**.
    - The next **20 minutes** are reserved to **provide feedback, possibly challenge the document, and generally for an active discussion**.
    - The last **10 minutes** are reserved to **take a decision**.
- The session is **recorded and shared** with the community for transparency.

### 👨‍⚖️ Decision Process

- Product Steering:
  - A **private meeting** with sponsors follows to make a **go/no-go decision**.
  - The final decision is **documented on this community page**.
- Technical Steering:
  - A **go/no-go decision** is made **during the meeting**, along with recommended improvements if needed.
  - The final decision and any necessary changes are **documented on this community page**.

### 🗒️ Where Are Decisions and Meeting Minutes Published?

A link to the **recording**, the final **decisions** and (optionally) **meeting minutes** will be tracked directly in the top of the proposal documents.
