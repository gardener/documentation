---
title: "Gardener Updates Its Kubernetes Version Support Policy for Better Security and Predictability"
linkTitle: "Gardener Updates Its Kubernetes Version Support Policy for Better Security and Predictability"
newsSubtitle: January 28, 2026
publishdate: 2026-01-28
authors:
- avatar: https://avatars.githubusercontent.com/marc1404
  login: marc1404
  name: Marc Vornetran
aliases: ["/blog/2026/01/28/gardener-updates-its-kubernetes-version-support-policy-for-better-security-and-predictability"]
---

Gardener has refined its policy for Kubernetes version support, striking a new balance between providing the latest features and ensuring a secure, predictable lifecycle for all users. The updated process introduces two key changes: a reduction in the number of concurrently supported minor versions and a guaranteed minimum support lifetime for each version.

### Improving Security by Reducing Retention

To enhance the overall security posture, Gardener will now support the four latest Kubernetes minor versions, a change from the previous policy of supporting five.

Older Kubernetes versions typically receive security patches for only about 14 months. By being more proactive in dropping unsupported versions, Gardener reduces the exposure to known vulnerabilities for all its users. This change simplifies security and vulnerability assessments and aligns with the Kubernetes community's own support window.

### Ensuring Predictability with a Minimum Lifetime

While reducing the number of supported versions improves security, predictability is crucial for operators planning their upgrade cycles. To address this, Gardener now guarantees a minimum support lifetime of 14 months for any given Kubernetes version.

This minimum period begins from the date a version is first supported in a `gardener/gardener` release. This policy provides a clear and reliable timeline, giving teams—especially those with longer, contractually-defined upgrade windows—ample time to plan and execute their cluster upgrades without being caught by surprise.

### A Clearer Support Overview

To make this new policy transparent and easy to track, the official Gardener documentation now includes a detailed support lifecycle table. This table clearly outlines which Kubernetes versions are currently supported, the Gardener release that introduced them, the date support was added, and the planned end-of-support date. This provides a single, management-friendly resource for planning future upgrades.

---
**Further Reading:**
*   [Recording on YouTube](https://youtu.be/2rOOsQWLO_w)
*   [GitHub Pull Request #13471](https://github.com/gardener/gardener/pull/13471)