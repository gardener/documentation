<script lang="ts" setup>
import VPMenuLinkOriginal from 'vitepress/dist/client/theme-default/components/VPMenuLink.vue'

const props = defineProps<{
  item: any
}>()

// Function to map item text to user type based on keywords
const determineUserType = (text: string): string => {
  // Convert to lowercase for case-insensitive matching
  const lowerText = text.toLowerCase()

  if (lowerText.includes('developer')) {
    return 'developer'
  } else if (lowerText.includes('user')) {
    return 'user'
  } else if (lowerText.includes('operator')) {
    return 'operator'
  } else if (lowerText.includes('all')) {
    return 'all'
  }
  
  return ''
}

// Function to store menu item text in localStorage and emit custom event
const handleClick = () => {
  if (props.item && props.item.text) {
    try {
      const itemText = props.item.text
      // Map the clicked text to a specific user type
      const userType = determineUserType(itemText)

      // Store the mapped user type in localStorage
      localStorage.setItem('lastClickedMenuItem', userType)

      // Dispatch a custom event that can be listened to within the same tab
      window.dispatchEvent(new CustomEvent('menuItemClicked', {
        detail: { value: userType }
      }))
    } catch (error) {
      console.error('Failed to store menu item text in localStorage:', error)
    }
  }
}
</script>

<template>
  <div class="custom-menu-link-wrapper" @click="handleClick">
    <VPMenuLinkOriginal :item="item" />
  </div>
</template>

<style scoped>
.custom-menu-link-wrapper {
  display: contents; /* Makes this div effectively invisible in the layout */
}
</style>