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
      text: Documentation
      link: /documentation/getting-started
    - theme: alt
      text: API Reference
      link: /guide/what-is-vitepress
  image:
    src: /gardener-logo-large.svg
    alt: Gardener
---

<LandingPage />

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
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

