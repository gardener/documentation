---
title: Product Steering
weight: 10
---

## Product Steering

### What is Gardener's Product Steering?
Product Steering provides strategic direction for major product increments. Product ideas can be submitted to the Product Steering Committee as proposals. The proposer must provide a brief document outlining the idea. Ideally, if applicable, a prototype should be included to demonstrate feasibility, but no full implementation or design document is expected (or desired) at this stage.

So, Gardener's Product Steering discusses topics at an early stage, before substantial efforts begin. It focuses on the 'Whether'/'Why' question. In contrast, [Gardener's Technical Steering](https://gardener.cloud/community/technical-steering) discusses topics at a later stage, when a design document has been crafted. It focuses on the 'How' question, meaning the go/no-go decision has already been made in the Product Steering. A topic which has passed the Product Steering is typically a natural fit for a Technical Steering once the design process reaches a sufficient technical depth.

The committee will schedule a Product Steering meeting, where the proposer presents the proposal. Committee members, interested contributors, and affected sponsors will challenge and discuss the idea. This meeting will be recorded.

Following this, a private go/no-go decision meeting with the affected sponsors will take place. This second meeting will not be recorded, but the outcome will be documented and shared here.

### Why Do We Need It?
We aim to align sponsored development capacity with Gardener's strategic vision and priorities. Investments should deliver value either to Gardener's users and operators or to the project and its overall reach.

### Who is on The Product Steering Committee?
The committee is elected by the project's active contributing sponsors and consists of a small number of members (at least three). Currently, the committee members are:
- [Johannes Scheerer](https://github.com/scheererj) ([Email](mailto:johannes.scheerer@sap.com) and [Slack](https://gardener-cloud.slack.com/archives/D08EXK51QJJ))
- [Rafael Franzke](https://github.com/rfranzke) ([Email](mailto:rafael.franzke@sap.com) and [Slack](https://gardener-cloud.slack.com/archives/DAQ7R4D6D))
- [Tim Ebert](https://github.com/timebertt) ([Email](mailto:tim.ebert@stackit.cloud) and [Slack](https://gardener-cloud.slack.com/archives/D0478U21E4U))
- [Vedran Lerenc](https://github.com/vlerenc) ([Email](mailto:vedran.lerenc@sap.com) and [Slack](https://gardener-cloud.slack.com/archives/DAQH1NTUL))

### How Does It Work?
#### 1. Proposal Submission
- A proposer drafts a **2-5 page product proposal** detailing the idea and shares a link to it (ideally through a pull request) with any member of the Product Steering Committee (see contact data above).
- The proposal will be linked on this community page, and a **meeting date** will be scheduled by the steering committee **1-4 weeks out** (at least one week for review and preparation but no more than four weeks to ensure timely decisions).
- This information will be also posted to our [`#gardener` Slack channel](https://gardener-cloud.slack.com/archives/C045DSWJZB9).

#### 2. Participation
- Those who wish to **actively challenge or discuss** the proposal can **request an invitation** from any committee member.
- Others are encouraged to **watch the recording** instead of attending live.

#### 3. Meeting Process
- The proposer presents the product proposal including a clear decision ask (if necessary), e.g., 'Should feature A be implemented?' or 'Should standard B be implemented in favor of standard C?'.
- The meeting will be **scheduled for 1h**. Presenting the proposal shall take no more than **30 minutes**.
- Attendees are expected to have **read the proposal in advance and come prepared**.
- Attendees **provide feedback, ask questions, and challenge the proposal**.
- The session is **recorded and shared** with the community for transparency.

#### 4. Decision Process
- A **private meeting** with sponsors follows to make a **go/no-go decision**.
- The final decision is **documented on this community page**.

### Key Considerations for Topics
A topic qualifies for Product Steering if it:
- Requires **significant development effort** (≥ 6 or more person-months of work, calculated as full-time effort), OR
- Has **relevant cross-team impact**, i.e., directly affects multiple teams (e.g., at least two distinct teams such as development, operations, or support) by altering workflows, system stability (like landscape integrity), or operational processes in a way that demands measurable adaptation or coordination, OR
- **Impacts Gardener's users or ecosystem significantly**, e.g., through changes to core functionality or interfaces, or **significantly expands the project’s reach** (e.g., enabling a new major use case or market), OR
- Introduces **high technical or operational risk** - such as potential downtimes, data loss, or security vulnerabilities - that require formal evaluation and mitigation planning beyond routine testing.

<hr/>

## Planned Topics

- **Cluster API Provider for Gardener** (no paper, no date yet)
- **Control Plane Live Migration** ([paper](https://github.com/gardener/gardener/issues/10686), no date yet)

<hr/>

## Decisions

- **Scaling Recommender (`cluster-autoscaler` Replacement)** ([paper](https://github.com/gardener/scaling-recommender/blob/main/docs/motivation.md), 2025-03-17 10:00 CET, [recording](https://youtu.be/u4-fWwKITuM))
  - <details closed><summary>Meeting Minutes</summary>
    
    - Madhav (and Tarun on CA inefficiencies) presented the recommender proposal.
    - Questions were raised about what issues could realistically be changed upstream (if the committers would approve) and what cannot be changed (fundamental issues).
    - One fundamental issue is that CA looks only at one node group at a time and therefore only considers filtering, never scoring (there is nothing to score since only nodes in one node group are analyzed). Consequently, all follow-up issues cannot be addressed either, like zone imbalance or sub-optimal recommendations.
    - The concern was raised that while the recommender is being developed, the community will progress and implement, e.g., resource reservations. However, feedback is not all positive/this proposal is critised to not solve the complex requirements for modern GPU workloads and pod-(gang-)scheduling. Also, because the suggested recommender will directly leverage the kube-scheduler, there will be reduced (sometimes no) need to duplicate this kind of logic in the recommender – for this feature or new upcoming features.
    - The concern was raised that virtualizing the API server and ETCD may require significant effort and whether we can contribute upstream changes to the kube-scheduler so that it returns recommendations instead. However, it seems unlikely to achieve that because it would complicate the kube-scheduler further (mixing in recommendations), make available the machine options to pick from (today, it only knows of/looks at existing nodes), and break the one-pod-at-a-time scheduling principle it follows today (CA and the recommender need to look at all pending pods to make a sensible recommendation). Furthermore, virtualizing the API server and ETCD is probably not much work (as seen in the PoC) because we need to implement “only” the kube-scheduler required API surface and hold the data in memory. CA went another way, but in the end, the data is held also there in memory.
    - The proposal was made to present the scaling recommender in SIG Auto-Scaling to get feedback on whether the proposal makes sense, independent of whether anyone but us wants to implement it.

    </details>
  - Go/No-Go meeting not yet scheduled
