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

import type { DefaultTheme } from 'vitepress/theme'
import { onBeforeUnmount, onMounted, ref, computed, watchEffect } from 'vue'
import VPSidebarItem from 'vitepress/dist/client/theme-default/components/VPSidebarItem.vue'
import { data as sidebars } from '../../data/sidebar.data'


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
  operator: sidebars.operatorsSidebar
}

// User type from localStorage (defaults to original items if not set)
const userType = ref<string>('')
const displayedItems = computed(() => {
  // Check for recognized userType that should override default sidebar
  if (userType.value && (userType.value === 'developer' || userType.value === 'user' || userType.value === 'operator')) {
    return sidebarData[userType.value as UserType]['/docs/'].items || props.items
  }
  
  // "all" type or any other value - explicitly use default sidebar
  if (userType.value === 'all') {
    console.log('Using default sidebar (all content)')
  } else {
    console.log('Using default sidebar from config')
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
  if (event.detail && event.detail.value) {
    userType.value = event.detail.value
  }
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
    userType.value = localStorage.getItem('lastClickedMenuItem') || ''
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
    <!-- User Type Indicator when custom sidebar is used -->
    <div v-if="userType && (userType === 'developer' || userType === 'user' || userType === 'operator')" class="user-type-indicator">
      <span>Persona: {{ userType }}</span>
      <button class="clear-button" @click="clearUserType" title="Reset to default view">
        ×
      </button>
    </div>
    <!-- All content indicator -->
    <div v-else-if="userType === 'all'" class="user-type-indicator all-indicator">
      <span>All content</span>
      <button class="clear-button" @click="clearUserType" title="Reset view">
        ×
      </button>
    </div>
    <!-- Default sidebar indicator (can be removed in production) -->
    <div v-else-if="userType" class="user-type-indicator default-indicator">
      <span>{{ userType }} (using default sidebar)</span>
      <button class="clear-button" @click="clearUserType" title="Reset view">
        ×
      </button>
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
  padding: 0 12px 8px;
  border-bottom: 1px dashed var(--vp-c-divider);
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
  font-size: 16px;
  line-height: 1;
  padding: 2px 6px;
  border-radius: 4px;
}

.clear-button:hover {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-gray-soft);
}

.default-indicator {
  color: var(--vp-c-text-3);
  font-style: italic;
  border-bottom-style: dotted;
}

.all-indicator {
  color: var(--vp-c-text-1);
  font-weight: 600;
  border-bottom-style: solid;
  background-color: rgba(var(--vp-c-brand-rgb), 0.1);
  border-radius: 4px;
}

@media (min-width: 960px) {
  .group {
    padding-top: 10px;
    width: calc(var(--vp-sidebar-width) - 64px);
  }
}
</style>