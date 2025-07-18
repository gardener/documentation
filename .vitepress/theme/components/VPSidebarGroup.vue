<script setup lang="ts">
/*
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

Copied and adapted from -> https://github.com/vuejs/vitepress/blob/2342269486e82b9b3f692976892f77b0792268ee/src/client/theme-default/components/VPSidebarGroup.vue
*/

import { useData, useRoute } from 'vitepress'
import type { DefaultTheme } from 'vitepress/theme'
import { onBeforeUnmount, onMounted, ref, computed, watchEffect } from 'vue'
import VPSidebarItem from 'vitepress/dist/client/theme-default/components/VPSidebarItem.vue'
import { data as sidebars } from '@data/sidebar.data'


// Define the props for the component
const props = defineProps<{
  items: DefaultTheme.SidebarItem[]
}>()

// Transition handling
const disableTransition = ref(true)

// Sidebar data for different user types
type UserType = 'developer' | 'user' | 'operator' | 'all';
type SidebarDataType = {
  [key in UserType]?: DefaultTheme.SidebarItem[]
};

const sidebarData: SidebarDataType = {
  developer: sidebars.developersSidebar,
  user: sidebars.usersSidebar,
  operator: sidebars.operatorsSidebar,
  all: sidebars.all
}

//TODo dirty fix for persona filtered sidebar, on community sidebar this works out of the box,
// Function to recursively process sidebar items and ensure links start with '/docs'
const processItems = (items: DefaultTheme.SidebarItem[]): DefaultTheme.SidebarItem[] => {
  return items.map(item => {
    const processedItem = { ...item }
    
    // Check and fix the link field
    if (processedItem.link && !processedItem.link.startsWith('/docs')) {
      processedItem.link = '/docs' + (processedItem.link.startsWith('/') ? processedItem.link : '/' + processedItem.link)
    }
    
    // Recursively process nested items
    if (processedItem.items) {
      processedItem.items = processItems(processedItem.items)
    }
    
    return processedItem
  })
}

// User type from localStorage (defaults to original items if not set)
const userType = ref<string>('')
const {path} = useRoute()
const displayedItems = computed(() => {
  // Check for recognized userType that should override default sidebar
  if (path.includes('/docs/')){
    if (userType.value && (userType.value === 'developer' || userType.value === 'user' || userType.value === 'operator' || userType.value === 'all')) {
      const sidebarForUserType = sidebarData[userType.value as UserType]
      const docsSection = sidebarForUserType
      console.log('userType.value:', userType.value)
      console.log('docsSection: ',docsSection)
      const personaItems = docsSection?.items
      console.log('personaItems', personaItems)

      if (personaItems) {
        // Process the persona items to ensure all links start with '/docs'
        const processedPersonaItems = processItems(personaItems)
        return processedPersonaItems
      }
    }
  }
  return props.items
})

// Function to clear the user type and reset to default view
const clearUserType = () => {
  userType.value = ''
  localStorage.removeItem('lastClickedMenuItem')
  
  // Dispatch event to notify other components
  window.dispatchEvent(new CustomEvent('menuItemClicked', { 
    detail: { value: '' }
  }))
}



// Debug flag - set to true to see more console logs
const DEBUG = true

// Storage event handler for updates from other tabs/windows
const handleStorageChange = (event: StorageEvent) => {
  if (event.key === 'lastClickedMenuItem') {
    userType.value = event.newValue || ''
  }
}

// Custom event handler for updates within the same tab
const handleMenuItemClicked = (event: CustomEvent) => {
  userType.value = event.detail.value
}

let timer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  // Set initial transition timer
  timer = setTimeout(() => {
    timer = null
    disableTransition.value = false
  }, 300)
  
  // Get initial value from localStorage
  try {
    userType.value = localStorage.getItem('lastClickedMenuItem') || 'all'
  } catch (e) {
    console.error('Failed to read from localStorage:', e)
  }
  
  // Listen for storage changes from other tabs
  window.addEventListener('storage', handleStorageChange)
  
  // Listen for custom events within the same tab
  window.addEventListener('menuItemClicked', handleMenuItemClicked as EventListener)
})

onBeforeUnmount(() => {
  if (timer != null) {
    clearTimeout(timer)
    timer = null
  }
  
  // Remove all event listeners
  window.removeEventListener('storage', handleStorageChange)
  window.removeEventListener('menuItemClicked', handleMenuItemClicked as EventListener)
})
</script>

<template>
  <div class="sidebar-container">
    <div v-if="userType && (userType === 'developer' || userType === 'user' || userType === 'operator')" class="group">
      <!-- User Type Indicator when custom sidebar is used -->
      <div class="user-type-indicator">
        <span>Persona: {{ userType }}</span>
        <button type="button" class="clear-button" @click="clearUserType" title="Reset to default view">
          &times;
        </button>
      </div>
    </div>
    <div
      v-for="item in displayedItems"
      :key="item.text"
      class="group"
      :class="{ 'no-transition': disableTransition }"
    >
      <VPSidebarItem :item="item" :depth="0" />
    </div>
  </div>
</template>

<style scoped>
.no-transition :deep(.caret-icon) {
  transition: none;
}

.group + .group {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 10px;
}

.user-type-indicator {
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
  text-transform: capitalize;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.clear-button {
  background: transparent;
  border: none;
  color: var(--vp-c-text-3);
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  border-radius: 4px;
  width: 32px;
  height: 32px;
  margin-right: -7px;
}

.clear-button:hover {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-gray-soft);
}

@media (min-width: 960px) {
  .group {
    padding-top: 10px;
    width: calc(var(--vp-sidebar-width) - 64px);
  }
}

/* Unused in this file, but used in the generated sidebar. */
.VPSidebarItem.level-0 {
  padding-bottom: 10px;
}
</style>