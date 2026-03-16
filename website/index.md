---
layout: home

title: Gardener
titleTemplate: false

hero:
  name: Gardener
  text: A Managed Kubernetes Service Done Right
  tagline: Deliver fully-managed clusters at scale everywhere with your own Gardener installation
  actions:
    - theme: brand
      text: Try a Demo
      link: https://demo.gardener.cloud/login?redirectPath=/terminal
    - theme: alt
      text: Learn More with Podrick
      link: /docs/getting-started/podrick-and-the-infinite-garden.md
  image:
    src: /gardener-logo.svg
    alt: Gardener

features:
  - icon: 
      src: /highlights/cloud-agnostic.svg
    title: Same Kubernetes, Any Cloud
    details: Provision clusters with identical configuration and options on any infrastructure. Day-1 & 2 operations remain the same.
    link: /docs/getting-started/architecture
  - icon:
      src: /highlights/extensible.svg
    title: Robust Scalability
    details: Operate thousands of clusters without sacrificing performance, resilience, or cost efficiency.
    link: /docs/guides/administer-shoots/scalability
  - icon:
      src: /highlights/certified.svg
    title: Security and Compliance
    details: Check your clusters against enterprise-grade security standards. CNCF 100% Kubernetes & AI conformance.
    link: /docs/security-and-compliance/kubernetes-hardening    
    badgePlacement: top-right
    badges:
      - src: /kubernets-certification/color.png
        darkSrc: /kubernets-certification/white.png
        href: https://github.com/cncf/k8s-conformance
        alt: Kubernetes Conformance
      - src: /kubernets-certification/ai-color.png
        darkSrc: /kubernets-certification/ai-white.png
        href: /blog/2025/11/11-12-gardener-ai-conformance
        alt: Kubernetes AI Conformance
  - icon:
      src: /highlights/ubiqutious.svg
    title: Fleet Management
    details: Apply the same guardrails to all your clusters. Control available Kubernetes and operating system versions, and their lifecycle.
    link: /docs/guides/administer-shoots/maintain-shoot
  - icon:
      src: /highlights/autonomous.svg
    title: Batteries Included
    details: Benefit from self-healing and auto-scaling capabilities across the stack. Manage the lifecycle of your clusters with the click of a button or a `kubectl apply`.
    link: /docs/getting-started/lifecycle/
  - icon:
      src: /highlights/gardener.svg
    title: Community-Grown Innovation
    details: Gardener is built in the open and neutrally governed under the NeoNephos Foundation. 
    link: /community/
---

<script setup>
import ThemedTeamMembers from '@components/ThemedTeamMembers.vue'

const members = [
  { 
    name: 'Alibaba Cloud',
    logo: '/lp/platforms/alibaba-cloud.svg'
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
    name: 'Google Cloud Platform',
    logo: '/lp/platforms/google-cloud-platform.svg',
  },
  { 
    name: 'Metal-Stack',
    logo: '/lp/platforms/metalstack.svg'
  },
  { 
    name: 'OpenStack',
    logo: '/lp/platforms/openstack.svg'
  },
  { 
    name: 'SAP Data Center',
    logo: '/lp/platforms/sap.svg'
  },
  { 
    name: 'Iron Core',
    logo: '/lp/platforms/iron_core.svg'
  },
]
</script>

## Everywhere You Want It
**The compute resources you need, wherever you want them**

<ThemedTeamMembers size="small" :members />
