<!--
MIT License

Copyright (c) 2019-present, Yuxi (Evan) You

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
-->

<!--
Copied and adapted from: https://github.com/vuejs/vitepress/blob/cec0014ccb438b48a5dc396925a08cfa41656a80/src/client/theme-default/components/VPNavBarMenuLink.vue
-->
<script lang="ts" setup>
import { Theme, useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'

defineProps<{
  //@ts-ignore
  item: DefaultTheme.NavItemWithLink
}>()

const { page } = useData()

// Function to handle localStorage clearing when navbar link is clicked
const handleNavClick = () => {
  try {
    // Check if the lastClickedMenuItem exists in localStorage
    if (localStorage.getItem('lastClickedMenuItem')) {
      // Remove the lastClickedMenuItem from localStorage
      localStorage.removeItem('lastClickedMenuItem')
      
      // Dispatch a custom event to notify other components
      window.dispatchEvent(new CustomEvent('navMenuItemClicked', { 
        detail: { cleared: true }
      }))
      
      console.log('Cleared lastClickedMenuItem from localStorage')
    }
  } catch (error) {
    console.error('Failed to clear menu item from localStorage:', error)
  }
}

// Implementation of isActive function from VitePress shared.js
const isActive = (currentPath: string, matchPath: string, strict = false) => {
  if (strict) {
    // If using strict matching, use regex test
    return new RegExp(matchPath).test(currentPath)
  } else {
    // For normal link matching, normalize paths for comparison
    const normalizedCurrentPath = currentPath.endsWith('/')
      ? currentPath
      : currentPath + '/'
    
    const normalizedMatchPath = matchPath.endsWith('/')
      ? matchPath
      : matchPath + '/'
      
    // Active when paths match at the beginning
    return normalizedCurrentPath.startsWith(normalizedMatchPath)
  }
}
</script>

<template>
  <VPLink
    :class="{
      VPNavBarMenuLink: true,
      active: isActive(
        page.relativePath,
        item.activeMatch || item.link,
        !!item.activeMatch
      )
    }"
    :href="item.link"
    :target="item.target"
    :rel="item.rel"
    :no-icon="item.noIcon"
    tabindex="0"
    @click="handleNavClick"
  >
    <span v-html="item.text"></span>
  </VPLink>
</template>

<style scoped>
.VPNavBarMenuLink {
  display: flex;
  align-items: center;
  padding: 0 12px;
  line-height: var(--vp-nav-height);
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.VPNavBarMenuLink.active {
  color: var(--vp-c-brand-1);
}

.VPNavBarMenuLink:hover {
  color: var(--vp-c-brand-1);
}
</style>