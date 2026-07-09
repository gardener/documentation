---
features:
  - badgePlacement: top-right
    badges:
      - alt: Kubernetes Conformance
        darkSrc: /kubernets-certification/white.webp
        href: 'https://testgrid.k8s.io/conformance-gardener'
        src: /kubernets-certification/color.webp
      - alt: Kubernetes AI Conformance
        darkSrc: /kubernets-certification/ai-white.webp
        href: /blog/2025/11/11-12-gardener-ai-conformance
        src: /kubernets-certification/ai-color.webp
    details: >-
      Provision clusters with identical configuration and options on any
      infrastructure. 100% CNCF Kubernetes & AI conformance.
    icon:
      src: /highlights/cloud-agnostic.svg
    link: /docs/getting-started/architecture
    title: 'Same Kubernetes, Any Cloud'
  - details: >-
      Run thousands of clusters without sacrificing performance, resilience, or
      cost efficiency.</br> Day-1 & 2 operations remain the same across
      infrastructures.
    icon:
      src: /highlights/extensible.svg
    link: /docs/guides/administer-shoots/scalability
    title: Robust Scalability
  - details: Check your clusters against enterprise-grade security standards.
    icon:
      src: /highlights/certified.svg
    link: /docs/security-and-compliance/kubernetes-hardening
    title: Security and Compliance
  - details: >-
      Apply the same guardrails to all your clusters. Control available
      Kubernetes and operating system versions, and their lifecycle.
    icon:
      src: /highlights/ubiqutious.svg
    link: /docs/guides/administer-shoots/maintain-shoot
    title: Fleet Management
  - details: >-
      Benefit from self-healing and auto-scaling capabilities across the stack.
      Manage the lifecycle of your clusters with the click of a button or a
      <code>kubectl apply</code>.
    icon:
      src: /highlights/autonomous.svg
    link: /docs/getting-started/lifecycle/
    title: Batteries Included
  - details: >-
      Gardener is built in the open and neutrally governed under the NeoNephos
      Foundation.
    icon:
      src: /highlights/gardener.svg
    link: /community/
    title: Community-Grown Innovation
github_repo: 'https://github.com/gardener/documentation'
github_subdir: hugo/content
hero:
  actions:
    - link: /docs/getting-started/podrick-and-the-infinite-garden.md
      text: Learn More with Podrick
      theme: brand
  image:
    alt: Gardener
    src: /gardener-logo.svg
  name: Gardener
  tagline: >-
    Deliver fully-managed clusters at scale everywhere with your own Gardener
    installation
  text: A Managed Kubernetes Service Done Right
layout: home
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/index.md
  to: index.md
title: Gardener
titleTemplate: false
prev: false
next: false
local: true
---

<script setup>
import ThemedTeamMembers from '@components/ThemedTeamMembers.vue'

const members = [
  {
    name: 'OpenStack',
    logo: '/lp/platforms/openstack.svg'
  },
  {
    name: 'metal-stack',
    logo: '/lp/platforms/metalstack.svg'
  },
  {
    name: 'IronCore',
    logo: '/lp/platforms/iron_core.svg'
  },
  {
    name: 'STACKIT',
    logo: '/lp/platforms/stackit.svg',
    darkLogo: '/lp/platforms/stackit-dark.svg'
  },
  {
    name: 'Amazon Web Services',
    logo: '/lp/platforms/aws.svg',
    darkLogo: '/lp/platforms/aws-dark.svg'
  },
  {
    name: 'Microsoft Azure',
    logo: '/lp/platforms/microsoft-azure.svg'
  },
  {
    name: 'Google Cloud',
    logo: '/lp/platforms/google-cloud-platform.svg',
  },
  {
    name: 'Alibaba Cloud',
    logo: '/lp/platforms/alibaba-cloud.svg'
  },
]
</script>

## Everywhere You Want It

**The compute resources you need, wherever you want them**

<ThemedTeamMembers size="small" :members />
