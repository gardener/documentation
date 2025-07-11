<template>
  <component :is="currentLayout" />
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import BlogLayout from './BlogLayout.vue'
import EmptyIndexLayout from './EmptyIndexLayout.vue'

const { page } = useData()
const { Layout: DefaultLayout } = DefaultTheme

const currentLayout = computed(() => {
  const path = page.value.relativePath
  console.log(path)
  // Check if the route contains 'blog'
  if (path.includes('blog/')) {
    return BlogLayout
  }
  
  // Check if it's an empty index page (existing logic)
  if (path.endsWith('index.md') || path.endsWith('_index.md')) {
    return EmptyIndexLayout
  }
  
  // Default layout for all other routes
  return DefaultLayout
})
</script>
