<script lang="ts" setup>
import VPMenuLinkOriginal from 'vitepress/dist/client/theme-default/components/VPMenuLink.vue'

const props = defineProps<{
  item: any
}>()

// Function to map item text to user type based on keywords
const determineUserType = (text: string): string => {
  // Convert to lowercase for case-insensitive matching
  const lowerText = text.toLowerCase()
  
  // Check for explicit "all" indicator
  if (lowerText.includes('all')) {
    return 'all'
  }
  
  if (lowerText.includes('developer') || lowerText.includes('api') || lowerText.includes('code')) {
    return 'developer'
  } else if (lowerText.includes('user') || lowerText.includes('guide')) {
    return 'user'
  } else if (lowerText.includes('operator') || lowerText.includes('admin') || lowerText.includes('system')) {
    return 'operator'
  }
  
  // For demo purposes, cycle through available types for any other text
  // You can remove this in production and return empty string
  if (lowerText.length % 4 === 0) return 'developer'
  if (lowerText.length % 4 === 1) return 'user'
  if (lowerText.length % 4 === 2) return 'operator'
  if (lowerText.length % 4 === 3) return 'all'
  
  return ''
}

// Function to store menu item text in localStorage and emit custom event
const handleClick = () => {
  if (props.item && props.item.text) {
    try {
      const itemText = props.item.text
      // Map the clicked text to a specific user type
      const userType = determineUserType(itemText)
      
      if (userType) {
        // Store the mapped user type in localStorage
        localStorage.setItem('lastClickedMenuItem', userType)
        
        // Dispatch a custom event that can be listened to within the same tab
        window.dispatchEvent(new CustomEvent('menuItemClicked', { 
          detail: { value: userType }
        }))
      } else {
        // If no mapping, just store the original text
        localStorage.setItem('lastClickedMenuItem', itemText)
        window.dispatchEvent(new CustomEvent('menuItemClicked', { 
          detail: { value: itemText }
        }))
      }
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