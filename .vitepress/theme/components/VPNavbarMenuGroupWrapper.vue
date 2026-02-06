<template>
  <VPLink :href="link" @click="handleClick">
    <VPNavbarMenuGroup :item="{ text, activeMatch, items }" />
  </VPLink>
</template>

<script setup lang="ts">
import VPNavbarMenuGroup from 'vitepress/dist/client/theme-default/components/VPNavBarMenuGroup.vue'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import { useRouter } from 'vitepress'

const { text, link, activeMatch, items } = defineProps<{
  text: string,
  link: string,
  activeMatch: string,
  items: any[],
}>()

const router = useRouter()

/**
 * Handles click on the Documentation navbar wrapper.
 * 
 * Why this approach:
 * - Sets localStorage BEFORE navigation to prevent race conditions
 * - Prevents default link behavior to avoid double navigation
 * - Manually triggers navigation after state is set
 * - This ensures updateContent() in EmptyIndexLayout runs with correct state
 */
function handleClick(event: MouseEvent) {
  // Prevent default link navigation to avoid double navigation
  event.preventDefault()
  
  // Set localStorage before navigating (will be read by EmptyIndexLayout)
  localStorage.setItem('lastClickedMenuItem', 'all')
  
  // Manually navigate using router
  router.go(link)
  
  console.log('Navigation to', link, 'with lastClickedMenuItem set to: all')
}
</script>
