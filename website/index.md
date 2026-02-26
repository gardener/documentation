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
    title: Homogeneous
    details: Identical Day-1 & 2 operations on any supported infrastructure
  - icon:
      src: /highlights/gardener.svg
    title: Open Source Grown
    details: Powered by the open source Gardener project, developed in the public, pioneered by SAP
  - icon:
      src: /highlights/extensible.svg
    title: Ultra Scalable
    details: Fleet management of thousands of clusters with low TCO by design
  - icon:
      src: /highlights/certified.svg
    title: Certified and Compliant
    details: Enterprise-grade security certifications, CNCF 100% Kubernetes compliant
  - icon:
      src: /highlights/ubiqutious.svg
    title: Ubiquitous
    details: The same experience in Amazon, Azure, Google, Alicloud
  - icon:
      src: /highlights/autonomous.svg
    title: Autonomous
    details: Self-healing, auto-scaling, and if you choose, auto-updating operating system and Kubernetes
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
