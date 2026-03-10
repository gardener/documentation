<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'

const { page, frontmatter } = useData()
const logosRef = ref<HTMLElement | null>(null)

const show = computed(
  () =>
    frontmatter.value.layout === 'home' &&
    page.value.relativePath === 'index.md',
)

const updateContainerRightAlignment = () => {
  const el = logosRef.value
  if (!el) {
    return
  }

  const setShift = (x: number, y: number = 0) => {
    el.style.setProperty('--home-hero-badges-shift-x', `${Math.round(x)}px`)
    el.style.setProperty('--home-hero-badges-shift-y', `${Math.round(y)}px`)
  }

  // Mobile layout: place badges at the top-right of the "Certified and Compliant" card.
  if (window.innerWidth <= 640) {
    const certifiedCard = document.querySelector<HTMLElement>(
      '.VPHome .VPHomeFeatures .items .item:nth-child(3)',
    )

    if (!certifiedCard) {
      setShift(0, 0)
      return
    }

    el.style.setProperty('--home-hero-badges-shift-x', '0px')
    el.style.setProperty('--home-hero-badges-shift-y', '0px')

    const badgesRect = el.getBoundingClientRect()
    const cardRect = certifiedCard.getBoundingClientRect()

    const targetRight = cardRect.right - 10
    // Place badges in the card's top-right area (not above the card).
    const targetTop = cardRect.top - Math.round(badgesRect.height * 0.35)

    setShift(targetRight - badgesRect.right, targetTop - badgesRect.top)
    return
  }

  // Tablet layout: keep default centered flow behavior from CSS.
  if (window.innerWidth <= 960) {
    setShift(0, 0)
    return
  }

  const heroContainer = el
    .closest('.VPHero')
    ?.querySelector<HTMLElement>('.container')

  if (!heroContainer) {
    setShift(0, 0)
    return
  }

  // Measure unshifted position first, then align to the main content container's right edge.
  setShift(0, 0)
  const rect = el.getBoundingClientRect()
  const containerRect = heroContainer.getBoundingClientRect()
  const rightInset = 8
  const shiftX = Math.max(0, containerRect.right - rect.right - rightInset)
  setShift(shiftX, 0)
}

onMounted(() => {
  nextTick(updateContainerRightAlignment)
  window.addEventListener('resize', updateContainerRightAlignment)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateContainerRightAlignment)
})

watch(show, (visible) => {
  if (visible) {
    nextTick(updateContainerRightAlignment)
  }
})
</script>

<template>
  <div
    v-if="show"
    ref="logosRef"
    class="home-hero-certification-logos"
    aria-label="Kubernetes certification logos"
  >
    <span class="home-hero-certification-logo-stack">
      <img
        src="/kubernets-certification/color.png"
        alt="Kubernetes Conformance"
        class="home-hero-certification-logo home-hero-certification-logo--light"
      />
      <img
        src="/kubernets-certification/white.png"
        alt="Kubernetes Conformance"
        class="home-hero-certification-logo home-hero-certification-logo--dark"
      />
    </span>
    <span class="home-hero-certification-logo-stack">
      <img
        src="/kubernets-certification/ai-color.png"
        alt="Kubernetes AI Conformance"
        class="home-hero-certification-logo home-hero-certification-logo--light"
      />
      <img
        src="/kubernets-certification/ai-white.png"
        alt="Kubernetes AI Conformance"
        class="home-hero-certification-logo home-hero-certification-logo--dark"
      />
    </span>
  </div>
</template>
