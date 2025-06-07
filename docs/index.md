---
layout: home

hero:
  name: Gardener
  text: A Managed Kubernetes Service Done even better 🎉
  tagline: Deliver fully-managed clusters at scale everywhere with your own Gardener installation
  actions:
    - theme: brand
      text: Demo?
      link: https://demo.gardener.cloud/login?redirectPath=/terminal
    - theme: alt
      text: Documentation
      link: /documentation/getting-started
    - theme: alt
      text: API Reference
      link: /guide/what-is-vitepress
  image:
    src: /gardener-logo-large.svg
    alt: Gardener

features:
  - icon: 
      src: highlights/cloud-agnostic.svg
    title: Homogeneous
    details: Identical Day-1 & 2 operations on any supported infrastructure
  - icon:
      src: highlights/gardener.svg
    title: Open Source Grown
    details: Powered by the open source Gardener project, developed in the public, pioneered by SAP
  - icon:
      src: highlights/extensible.svg
    title: Ultra Scalable
    details: Fleet management of thousands of clusters with low TCO by design
  - icon:
      src: highlights/certified.svg
    title: Certified and Compliant
    details: Enterprise-grade security certifications, CNCF 100% Kubernetes compliant
  - icon:
      src: highlights/ubiqutious.svg
    title: Ubiquitous
    details: The same experience in Amazon, Azure, Google, Alicloud
  - icon:
      src: highlights/autonomous.svg
    title: Autonomous
    details: Self-healing, auto-scaling, and if you choose, auto-updating operating system and Kubernetes
---

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  { avatar: '/lp/platforms/alibaba-cloud.svg', name: 'Alibaba Cloud', },
  { avatar: '/lp/platforms/aws.svg', name: 'Amazon Web Services', },
  { avatar: '/lp/platforms/microsoft-azure.svg', name: 'Microsoft Azure', },
  { avatar: '/lp/platforms/google-cloud-platform.svg', name: 'Google Cloud Platform', },
  { avatar: '/lp/platforms/metalstack.svg', name: 'Metal-Stack', },
  { avatar: '/lp/platforms/openstack.svg', name: 'OpenStack', },
  { avatar: '/lp/platforms/equinix-metal.svg', name: 'Equinix Metal', },
  { avatar: '/lp/platforms/sap.svg', name: 'SAP Data Center', },
  { avatar: '/lp/platforms/iron_core.svg', name: 'Iron Core', },
]
</script>

## Everywhere You Want It
**The compute resources you need, wherever you want them**

<VPTeamMembers size="small" :members />

