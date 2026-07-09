---
description: Walkthroughs of common activities
github_repo: 'https://github.com/gardener/documentation'
github_subdir: hugo/content/docs/guides
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/guides/_index.md
  to: _index.md
persona: Developers
title: Guides
weight: 20
prev: false
next: false
local: true
---

# Guides

Step-by-step walkthroughs and best practices organized by topic:

- [**Set Up Client Tools**](/docs/guides/client-tools/): Essential tools and techniques for working with Kubernetes clusters, including kubeconfig management, bash tips, and command-line workflows.
- [**High Availability**](https://gardener.cloud/docs/guides/high-availability/): Design resilient clusters with highly available control planes, implement chaos engineering strategies, and follow best practices for production deployments.
- [**Administer Client (Shoot) Clusters**](/docs/guides/administer-shoots/): Learn how to create, maintain, and manage Gardener shoot clusters including backup/restore, GPU support, scalability, OIDC authentication, and VPC configurations.
- [**Networking**](https://gardener.cloud/docs/guides/networking/): Configure DNS records, manage TLS certificates with cert-manager, and set up IPv4/IPv6 dual-stack networking across cloud providers (AWS, GCP).
- [**Monitor and Troubleshoot**](/docs/guides/monitoring-and-troubleshooting/): Debug and resolve issues with pods, nodes, and cluster resources. Learn how to analyze failures, access logs, and troubleshoot common problems.
- [**Applications**](/docs/guides/applications/): Best practices for deploying and securing applications on Kubernetes, covering CI/CD, container security, network isolation, pod disruption budgets, and common pitfalls to avoid.
