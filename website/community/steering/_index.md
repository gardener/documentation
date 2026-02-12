---
title: Project Steering
weight: 20
---

## Project Steering

This page describes how **project-wide topics** in Gardener are proposed, discussed, and decided via **Gardener Enhancement Proposals (GEPs)** in the context of the Gardener [**Product Steering Committee (PSC)**](./product/) and [**Technical Steering Committee (TSC)**](./technical/).

GEPs are the canonical mechanism for proposals that meet the criteria for steering-level discussion. They live in the dedicated repository [`gardener/enhancements`](https://github.com/gardener/enhancements).

These meetings are essential governance bodies in the Gardener project:

- **Product Steering**: Focuses on prioritization, vision, roadmap alignment, and cross-cutting concerns.
- **Technical Steering**: Focuses on architecture, technical direction, and design decisions.

Each proposal discussed in a steering meeting is represented by a **Gardener Enhancement Proposal (GEP)**.
A GEP provides sufficient context, motivation, and a concrete ask or decision request to facilitate informed and effective discussion during the respective steering meeting.

### 🧑‍💼 Product Steering

Product Steering provides strategic direction for major product increments. Product ideas can be submitted to the Product Steering Committee as **Gardener Enhancement Proposals (GEPs)**. The proposer must provide a brief document outlining the idea. Ideally, if applicable, a prototype should be included to demonstrate feasibility, but no full implementation or design document is expected (or desired) at this stage.

So, Gardener's Product Steering discusses topics at an early stage, before substantial efforts begin. It focuses on the 'Whether'/'Why' question. In contrast, [Gardener's Technical Steering](./technical) discusses topics at a later stage, when a design document has been crafted. It focuses on the 'How' question, meaning the go/no-go decision has already been made in the Product Steering. A topic which has passed the Product Steering is typically a natural fit for a Technical Steering once the design process reaches a sufficient technical depth.

The committee will schedule a Product Steering meeting, where the proposer presents the GEP. Committee members, interested contributors, and affected sponsors will challenge and discuss the idea. This meeting will be recorded.

Following this, a private go/no-go decision meeting with the affected sponsors will take place. This second meeting will not be recorded, but the outcome will be documented in the GEP.

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

Technical Steering provides architectural and technical direction for major product increments. Technical documents can be submitted to the Technical Steering Committee as **Gardener Enhancement Proposals (GEPs)**. The document should outline the proposed solution, with a particular focus on APIs and interfaces, while also covering other relevant aspects, but no full implementation is expected (or desired) at this stage.

So, Gardener's Technical Steering discusses topics at a later stage, when a design document has been crafted. It focuses on the 'How' question, meaning the go/no-go decision has already been made. In contrast, [Gardener's Product Steering](./product) discusses topics at an early stage, before substantial efforts begin. It focuses on the 'Whether'/'Why' question.

The committee will schedule a Technical Steering meeting where the proposer presents the GEP. Committee members and interested contributors will challenge and discuss the idea. This meeting will be recorded.

A decision on how to proceed with the proposal, including any recommended improvements, will be made within the same meeting. The decision and any required changes will be documented in the GEP.

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

- Requires **significant development effort**, OR
- Has **relevant cross-team impact**, OR
- **Impacts Gardener's users or ecosystem significantly**, OR
- Introduces **high technical or operational risk**

### 🧭 [How to Propose a Topic](https://github.com/gardener/enhancements/blob/main/README.md#-how-to-propose-a-gardener-enhancement)

If you'd like to bring a topic to either steering meeting, follow these steps:

1. **Choose the relevant committee**: Product or Technical.
2. **Create a tracking issue to reserve a GEP number**: https://github.com/gardener/enhancements/issues/new?template=enhancement.md
3. **Create a proposal document** using the [official template](https://github.com/gardener/enhancements/tree/master/geps/NNNN-gep-template) in [`gardener/enhancements`](https://github.com/gardener/enhancements).
4. **Open a Pull Request** against the `gardener/enhancements` repository.
5. A member of the relevant steering committee will coordinate review and scheduling.

> 💡 Keep your proposal concise (2–5 pages). The goal is to clearly motivate your idea and define what decision or feedback you need.

#### 📆 What Happens After Opening a PR?

Once your PR is open:

- A **member of the relevant steering committee** will reach out and coordinate the next steps.
- The proposal is first **reviewed asynchronously** by the committee via the Pull Request:
  - Steering committee members review the document and leave questions or comments **directly in the PR review**.
  - The goal of this phase is to clarify open questions and address smaller issues before the meeting.
- Once feedback from a **majority of the committee** (typically 3 out of 4 members) has been provided, a steering meeting is scheduled.
  - A [PSC/TSC meeting](#-meeting-process) is usually scheduled **about two weeks later** to allow for review ping-pong and for incorporating feedback into the document.
- The meeting will be **announced** to the community via our [`#gardener`](https://gardener-cloud.slack.com/archives/C045DSWJZB9) Slack channel and in the public meeting agenda (e.g., [here](./product) or [here](./technical)).
- Based on the outcome of the meeting, the proposal in the GEP PR may need to be **adjusted, refined, or extended**. In this case, the PR remains open and meeting feedback is addressed asynchronously.
  Depending on the outcome, **an additional steering meeting may be scheduled**. Once all steering committee members are satisfied, the GEP PR is merged, which signals a clear **go for the next steps** (typically implementation work).

### 🗣️ Participation

- Those who wish to **actively challenge or discuss** the proposal can **request an invitation** from any committee member.
- Others are encouraged to **watch the recording** instead of attending live.

### 📑 Meeting Process

- Attendees are expected to have **read the proposal in advance and come prepared**.
- Product Steering:
  - The meeting will be **scheduled for 1h** and is split into **30-30** minute blocks:
    - Attendees then have up to **30 minutes** time to **ask clarifying questions**.
    - The last **30 minutes** are reserved to **provide feedback, possibly challenge the document, and generally for an active discussion**.
- Technical Steering:
  - The meeting will be **scheduled for 1h** and is split into **25-25-10** minute blocks:
    - Attendees then have up to **25 minutes** time to **ask clarifying questions**.
    - The next **25 minutes** are reserved to **provide feedback, possibly challenge the document, and generally for an active discussion**.
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
