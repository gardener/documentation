<script setup lang="ts">
import VPNavbarMenuGroup from 'vitepress/dist/client/theme-default/components/VPNavBarMenuGroup.vue'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'

const { text, link, activeMatch, items } = defineProps<{
  text: string,
  link: string,
  activeMatch: string,
  items: any[],
}>()

function handleClick() {
  localStorage.setItem('lastClickedMenuItem', 'all')
  window.dispatchEvent(new CustomEvent('menuItemClicked', {
    detail: { value: 'all' }
  }));
}
</script>

<template>
  <VPLink :href="link" @click.self="handleClick">
    <VPNavbarMenuGroup :item="{ text, activeMatch, items }" />
  </VPLink>
</template>
