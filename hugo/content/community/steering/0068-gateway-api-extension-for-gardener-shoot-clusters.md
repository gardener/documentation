---
github_repo: 'https://github.com/gardener/documentation'
github_subdir: hugo/content/community/steering
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/community/steering/0068-gateway-api-extension-for-gardener-shoot-clusters.md
  to: 0068-gateway-api-extension-for-gardener-shoot-clusters.md
title: 'GEP-0068: Gateway API Extension for Gardener Shoot Clusters'
prev: false
next: false
local: true
---

# GEP-0068: Gateway API Extension for Gardener Shoot Clusters

- 📌 **GEP Tracking Issue:** https://github.com/gardener/enhancements/issues/68
- 📖 **GEP Link:** https://github.com/gardener/enhancements/pull/69
- ✍🏻 **Author(s):** [@DockToFuture](https://github.com/DockToFuture) (Sebastian Stauch)
- 🗓️ **Presentations:** 2026-07-23, 10:00 - 11:00 Europe/Berlin
- 🎥 **Recording:** https://youtu.be/6_97bb_C8gI
- 👨‍⚖️ **Decisions:**
  - Agreed that migration tooling should not be included in `gardenctl`; it should instead be shipped as a separate binary from the extension repository.
  - Agreed to remove the `spec` wrapper section from the provider config API, as no other provider config APIs use it.
  - Agreed to remove replica and resource configuration fields from the provider config, relying on VPA/HPA autoscaling instead, with the option to revisit if specific use cases arise.
  - Agreed that the Envoy control plane should remain running inside the shoot cluster rather than the seed, due to xDS callback requirements, network cost implications, and blast radius concerns.
  - Agreed that disabling the `manageCRDs` field must not delete existing CRDs from the cluster; this behavior should be explicitly documented.
  - Agreed that the extension should always bundle the Gateway API CRDs with the Envoy Gateway implementation and not support a CRDs-only mode; a separate extension or the shoot static manifests feature should be used for CRD-only scenarios.
  - Agreed that the restriction of the extension to shoots with purpose `evaluation` should be made configurable by operators.
  - Agreed that service mesh support should be documented as a possible future enhancement but is out of scope for the first iteration.
  - Agreed that the extension name should not include "shoot" in order to remain cluster-type agnostic and support potential future garden/seed extensions.
  - No final decision reached on the naming of the experimental Gateway API channel field (`experimentalFeatures` vs. a `channel` field); TSC recommends using `channel`.
- 💬 **Key Discussion Points:**
  - Tim raised that migration tooling belonging to an extension should not be added to `gardenctl`, as it sets a precedent for other extensions and complicates release lifecycle alignment.
  - Tim proposed removing the `spec` section from the provider config API to align with existing provider config conventions.
  - The naming of the field enabling the Gateway API experimental channel was debated, with Tim suggesting a `channel` field for clarity to users familiar with Gateway API, while Sebastian preferred the current `experimentalFeatures` naming.
  - Vladimir raised that service mesh support (which has graduated to the Gateway API stable channel) is not in scope for the first version but should be considered in the extension's future design.
  - The placement of extension-deployed components was discussed, with a preference for using the `kube-system` namespace to avoid collisions with user namespaces and to meet user expectations for Gardener-managed workloads.
  - Vladimir requested an architectural diagram in the GEP clearly showing which components are deployed in the garden cluster, seed, and shoot.
  - The length and structure of the GEP was discussed; participants suggested moving the detailed implementation comparison to a separate appendix file while retaining a brief rationale for choosing Envoy Gateway in the main document.
  - The future enhancement section on exposing curated Envoy proxy template fields was flagged as unclear and in need of rewriting, particularly around validation of provider-specific configurations.
- ➡️ **Next Steps:**
  - **Sebastian**: Remove migration tooling references from `gardenctl` and describe a separate binary approach in the GEP.
  - **Sebastian**: Remove the `spec` wrapper from the provider config API example.
  - **Sebastian**: Remove replica and resource configuration fields from the provider config API.
  - **Sebastian**: Add documentation explaining why the Envoy control plane runs in the shoot rather than the seed.
  - **Sebastian**: Document that disabling `manageCRDs` will not delete existing CRDs from the cluster.
  - **Sebastian**: Make the `evaluation`-purpose restriction configurable in the extension admission webhook.
  - **Sebastian**: Add service mesh support as an explicitly documented future enhancement in the GEP.
  - **Sebastian**: Add an architectural diagram showing all components deployed per cluster type (garden, seed, shoot).
  - **Sebastian**: Move or condense the implementation comparison into a separate appendix file; keep only a brief rationale in the main GEP.
  - **Sebastian**: Rewrite the future enhancement section on exposing curated Envoy proxy template fields to clarify intent and validation approach.
  - **Sebastian**: Remove "shoot" from the extension name to keep it cluster-type agnostic.
  - **Sebastian**: Resolve remaining open PR comments, then circulate the updated document for a final review round before merging.
