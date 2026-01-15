---
title: "2025-03: Scaling Recommender"
---

- ✍🏻 **Author(s):** [@unmarshall](https://github.com/unmarshall) (Madhav Bhargava)
- 🗓️ **Presentation:** 2025-03-17, 10:00 - 11:00 CET
- 🎥 **Recording:** [click here](https://youtu.be/u4-fWwKITuM)
- <details closed><summary>📝 <b>Meeting Minutes</b></summary>

  - Madhav (and Tarun on CA inefficiencies) presented the recommender proposal.
  - Questions were raised about what issues could realistically be changed upstream (if the committers would approve) and what cannot be changed (fundamental issues).
  - One fundamental issue is that CA looks only at one node group at a time and therefore only considers filtering, never scoring (there is nothing to score since only nodes in one node group are analyzed). Consequently, all follow-up issues cannot be addressed either, like zone imbalance or sub-optimal recommendations.
  - The concern was raised that while the recommender is being developed, the community will progress and implement, e.g., resource reservations. However, feedback is not all positive/this proposal is critised to not solve the complex requirements for modern GPU workloads and pod-(gang-)scheduling. Also, because the suggested recommender will directly leverage the kube-scheduler, there will be reduced (sometimes no) need to duplicate this kind of logic in the recommender – for this feature or new upcoming features.
  - The concern was raised that virtualizing the API server and ETCD may require significant effort and whether we can contribute upstream changes to the kube-scheduler so that it returns recommendations instead. However, it seems unlikely to achieve that because it would complicate the kube-scheduler further (mixing in recommendations), make available the machine options to pick from (today, it only knows of/looks at existing nodes), and break the one-pod-at-a-time scheduling principle it follows today (CA and the recommender need to look at all pending pods to make a sensible recommendation). Furthermore, virtualizing the API server and ETCD is probably not much work (as seen in the PoC) because we need to implement “only” the kube-scheduler required API surface and hold the data in memory. CA went another way, but in the end, the data is held also there in memory.
  - The proposal was made to present the scaling recommender in SIG Auto-Scaling to get feedback on whether the proposal makes sense, independent of whether anyone but us wants to implement it.

  </details>
- 👨‍⚖️ **Decisions:**
  - Investment was approved, considering the many issues listed in the motivational document.
  - While going for the recommender instead of patching or rather only mitigating a few of the issues is considerable effort, it appears to be the better choice, so long as certain guardrails like having reasonable milestones to check investment vs. progress are put in place, e.g.:
    - MVP 5-6 months from now proving the core claims can/have been achieved, e.g., by passing clearly defined test cases/KPIs. The exact test cases/KPIs are a work in progress, but an example could be scheduling 10K pending pods within X seconds onto 50 3-zone worker pools using the planned API server/ETCD mock.
    - Starting the roll-out of a first ready version (>80% feature parity) 1y from now.
    - Latest by end of 2026, the new recommender is the default option in Gardener and has reached production at full scale.
  - Most participants would still prefer presenting the topic early to SIG Autoscaling to get early feedback, but everybody accepts the team decision to do that only after an MVP is ready/working.


## Paper

[Click here](https://github.com/gardener/scaling-recommender/blob/main/docs/motivation.md)
