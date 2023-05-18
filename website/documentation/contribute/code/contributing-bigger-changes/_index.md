---
title: Contributing Bigger Changes
sidebar: true
menu: sln
weight: 60
---

## Contributing Bigger Changes

Here are the guidelines you should follow when contributing larger changes to Gardener:

* Avoid proposing a big change in one single PR. Instead, split your work into multiple stages which are independently mergeable and create one PR for each stage. For example, if introducing a new API resource and its controller, these stages could be:
  * API resource types, including defaults and generated code.
  * API resource validation.
  * API server storage.
  * Admission plugin(s), if any.
  * Controller(s), including changes to existing controllers. Split this phase further into different functional subsets if appropriate.
  
* If you realize later that changes to artifacts introduced in a previous stage are required, by all means make them and explain in the PR why they were needed.

* Consider splitting a big PR further into multiple commits to allow for more focused reviews. For example, you could add unit tests / documentation in separate commits from the rest of the code. If you have to adapt your PR to review feedback, prefer doing that also in a separate commit to make it easier for reviewers to check how their feedback has been addressed. 

* To make the review process more efficient and avoid too many long discussions in the PR itself, ask for a "main reviewer" to be assigned to your change, then work with this person to make sure he or she understands it in detail, and agree together on any improvements that may be needed. If you can't reach an agreement on certain topics, comment on the PR and invite other people to join the discussion.

* Even if you have a "main reviewer" assigned, you may still get feedback from other reviewers. In general, these "non-main reviewers" are advised to focus more on the design and overall approach rather than the implementation details. Make sure that you address any concerns on this level appropriately.