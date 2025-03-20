---
title: Technical Steering
weight: 20
---

## Technical Steering

### What is Gardener's Technical Steering?
Technical Steering provides architectural and technical direction for major product increments. Technical documents can be submitted to the Technical Steering Committee for discussion. This document should outline the proposed solution, with a particular focus on APIs and interfaces, while also covering other relevant aspects, but no full implementation is expected (or desired) at this stage.

So, Gardener's Technical Steering discusses topics at a later stage, when a design document has been crafted. It focuses on the 'How' question, meaning the go/no-go decision has already been made. In contrast, [Gardener's Product Steering](https://gardener.cloud/community/product-steering) discusses topics at an early stage, before substantial efforts begin. It focuses on the 'Whether'/'Why' question.

The committee will schedule a Technical Steering meeting where the proposer presents the document. Committee members and interested contributors will challenge and discuss the idea. This meeting will be recorded.

A decision on how to proceed with the document, including any recommended improvements, will be made within the same meeting. The decision and any required changes will be documented and shared here.

### Why Do We Need It?
Technical Steering ensures that major technical changes align with Gardener's architectural principles and long-term sustainability. It prevents fragmentation and promotes consistency in the project's evolution. The process helps ensure that major technical investments deliver value to both Gardener's users and maintainers.

### Who is on The Technical Steering Committee?
The committee is elected by the project's active committers and contributors and consists of a small number of members (at least three). Currently, the committee members are:
- [Johannes Scheerer](https://github.com/scheererj) ([Email](mailto:johannes.scheerer@sap.com) and [Slack](https://gardener-cloud.slack.com/archives/D08EXK51QJJ))
- [Rafael Franzke](https://github.com/rfranzke) ([Email](mailto:rafael.franzke@sap.com) and [Slack](https://gardener-cloud.slack.com/archives/DAQ7R4D6D))
- [Tim Ebert](https://github.com/timebertt) ([Email](mailto:tim.ebert@stackit.cloud) and [Slack](https://gardener-cloud.slack.com/archives/D0478U21E4U))
- [Vedran Lerenc](https://github.com/vlerenc) ([Email](mailto:vedran.lerenc@sap.com) and [Slack](https://gardener-cloud.slack.com/archives/DAQH1NTUL))

### How Does It Work?
#### 1. Document Submission
- A proposer drafts a **technical design document** (e.g. an enhancement proposal, etc.) outlining the proposed solution, with a particular focus on APIs and interfaces and shares a link to it (ideally through a pull request) with any member of the Technical Steering Committee (see contact data above).
- The document will be linked on this community page, and a **meeting date** will be scheduled by the steering committee **1-4 weeks out** (at least one week for review and preparation but no more than four weeks to ensure timely decisions).
- This information will be also posted to our [`#gardener` Slack channel](https://gardener-cloud.slack.com/archives/C045DSWJZB9).

#### 2. Participation
- Those who wish to **actively challenge or discuss** the document can **request an invitation** from any committee member.
- Others are encouraged to **watch the recording** instead of attending live.

#### 3. Meeting Process
- Attendees are expected to have **read the document in advance and come prepared**.
- The meeting will be **scheduled for 1h** and is split into **10-20-20-10** minute blocks:
  - The proposer has up to **10 minutes** time to reiterate the **key aspects of and motivation for the technical document including the ask for decision**, e.g., "I need a decision how to implement product feature X. Here is why I think this is the right approach for Gardener: ...".
  - Now attendees have up to **20 minutes** time to **ask clarifying questions**.
  - The next **20 minutes** are reserved to **provide feedback, possibly challenge the document, and generally for an active discussion**.
  - The last **10 minutes** are reserved to **take a decision**.
- The session is **recorded and shared** with the community for transparency.

#### 4. Decision Process
- A **go/no-go decision** is made **during the meeting**, along with recommended improvements if needed.
- The final decision and any necessary changes are **documented on this community page**.

### Key Considerations for Topics
A topic qualifies for Technical Steering if it:
- Requires **significant development effort** (≥ 6 or more person-months of work, calculated as full-time effort), OR
- Has **relevant cross-team impact**, i.e., directly affects multiple teams (e.g., at least two distinct teams such as development, operations, or support) by altering workflows, system stability (like landscape integrity), or operational processes in a way that demands measurable adaptation or coordination, OR
- **Impacts Gardener's users or ecosystem significantly**, e.g., through changes to core functionality or interfaces, or **significantly expands the project’s reach** (e.g., enabling a new major use case or market), OR
- Introduces **high technical or operational risk** - such as potential downtimes, data loss, or security vulnerabilities - that require formal evaluation and mitigation planning beyond routine testing.

<hr/>

## Planned Topics

- **Observability 2.0** ([paper](https://github.com/gardener/logging/blob/master/docs/observability-2.0/Observability%202.0.md), 2025-03-20 15:00-16:00 CET)
- **Persistent Volume Autoscaler** ([paper](https://github.com/gardener/gardener/pull/10690), [implementation](https://github.com/gardener/pvc-autoscaler), no date yet)
