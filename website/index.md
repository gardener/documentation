---
layout: home

hero:
  name: Gardener
  text: A Managed Kubernetes Service Done Right
  tagline: Deliver fully-managed clusters at scale everywhere with your own Gardener installation
  actions:
    - theme: brand
      text: Demo?
      link: https://demo.gardener.cloud/login?redirectPath=/terminal
    - theme: alt
      text: Adopters
      link: /adopter/_index.md
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
import { VPTeamMembers } from 'vitepress/theme' 

import {withBase} from "vitepress"; 

const members = [
  { avatar: `${withBase('/lp/platforms/aws.svg')}`, name: 'Amazon Web Services', },
  { avatar: `${withBase('/lp/platforms/microsoft-azure.svg')}`, name: 'Microsoft Azure', },
  { avatar: `${withBase('/lp/platforms/google-cloud-platform.svg')}`, name: 'Google Cloud Platform', },
  { avatar: `${withBase('/lp/platforms/metalstack.svg')}`, name: 'Metal-Stack', },
  { avatar: `${withBase('/lp/platforms/openstack.svg')}`, name: 'OpenStack', },
  { avatar: `${withBase('/lp/platforms/equinix-metal.svg')}`, name: 'Equinix Metal', },
  { avatar: `${withBase('/lp/platforms/sap.svg')}`, name: 'SAP Data Center', },
  { avatar: `${withBase('/lp/platforms/iron_core.svg')}`, name: 'Iron Core', },
]
</script>

## Everywhere You Want It
**The compute resources you need, wherever you want them**

<VPTeamMembers size="small" :members />