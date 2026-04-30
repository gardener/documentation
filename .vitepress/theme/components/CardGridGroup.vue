<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const container = ref<HTMLElement | null>(null)

function equalizeCardHeights() {
  if (!container.value) return
  const cards = container.value.querySelectorAll<HTMLElement>('.card')
  cards.forEach(c => c.style.minHeight = '')
  const maxHeight = Math.max(...Array.from(cards).map(c => c.offsetHeight))
  cards.forEach(c => c.style.minHeight = `${maxHeight}px`)
}

onMounted(() => {
  equalizeCardHeights()
  window.addEventListener('resize', equalizeCardHeights)
})

onUnmounted(() => {
  window.removeEventListener('resize', equalizeCardHeights)
})
</script>

<template>
  <div ref="container">
    <slot />
  </div>
</template>
