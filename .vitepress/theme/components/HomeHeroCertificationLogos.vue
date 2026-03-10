<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { page, frontmatter } = useData()

const show = computed(
  () =>
    frontmatter.value.layout === 'home' &&
    page.value.relativePath === 'index.md',
)
</script>

<template>
  <div
    v-if="show"
    class="home-hero-certification-logos"
    aria-label="Kubernetes certification logos"
  >
    <img
      src="/kubernets-certification/ai-white.png"
      alt="Kubernetes AI Conformance"
      class="home-hero-certification-logo"
    />
    <img
      src="/kubernets-certification/white.png"
      alt="Kubernetes Conformance"
      class="home-hero-certification-logo"
    />
  </div>
</template>
