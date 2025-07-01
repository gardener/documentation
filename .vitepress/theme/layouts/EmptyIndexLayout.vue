<template>
  <Layout>
    <template #doc-before>
      <div v-if="isEmptyIndexPage" class="vp-doc">
        <!-- Directory taxonomy display -->
        <div class="directory-index">
          <h1>{{ frontmatter.title || 'Directory Contents' }}</h1>
          
          <ul v-if="currentDirItems.length > 0">
            <li v-for="item in currentDirItems" :key="item.link">
              <a :href="item.link.replace(/\/index\.md$/, '/')">{{ item.text }}</a>
            </li>
          </ul>
          
          <p v-else>No pages found in this directory.</p>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script setup>
import { useData } from 'vitepress'
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { data as sidebars } from '@data/sidebar.data'
import _ from 'lodash-es'


//todo extract together with .vitepress/theme/components/VPSidebarGroup.vue
const sidebarData = {
  developer: sidebars.developersSidebar,
  user: sidebars.usersSidebar,
  operator: sidebars.operatorsSidebar
}

const { Layout } = DefaultTheme
const { page, frontmatter, site, theme } = useData()


const isEmptyIndexPage = ref(false)
const lastClickedMenuItem = ref(null)
const currentDirItems = ref([])

// Check if this is an empty index page
const checkIfEmpty = () => {
  // Check if it's an index file
  const isIndexFile = page.value.relativePath.endsWith('index.md') || 
                     page.value.relativePath.endsWith('_index.md')
  
  if (!isIndexFile) {
    isEmptyIndexPage.value = false
    return isEmptyIndexPage.value
  }
  
  // Use frontmatter flag set by post-processing (much more reliable than DOM inspection)
  const isEmpty = frontmatter.value.isEmpty === true
  isEmptyIndexPage.value = isEmpty
  return isEmpty
}

// Function to find sidebar items based on the current path and persona
const findSidebarItemsByPath = (relativePath, sidebarItems) => {

  // Pop to remove the file entry from the path
  const dirSteps = relativePath.split('/')
  // Remove docs prefix
  dirSteps.shift()
  console.log('Directory steps:', dirSteps)

  let selectedSidebarItems = sidebarItems
  let previousSteps = ''
  
  for (const dirStep of dirSteps) {
    console.log('Current sidebar items:', selectedSidebarItems)
    
    for (const item of selectedSidebarItems) {
      const itemLink = item?.link?.replace(previousSteps, '')

      if (itemLink?.startsWith(dirStep + '/')) {
        previousSteps += dirStep + '/'
        console.log('Previous steps:', previousSteps)
        
        selectedSidebarItems = item.items || []
        break // Exit the inner loop once we find the matching item
      }
    }
  }
  
  return selectedSidebarItems
}

// Extract the logic to update content based on current page and persona
const updateContent = () => {
  lastClickedMenuItem.value = localStorage.getItem('lastClickedMenuItem')
  const isEmpty = checkIfEmpty()
  console.log('isEmpty:', isEmpty)
  const prefixDir = page.value.relativePath.split('/').shift()
  const prefix = `/${prefixDir}/`
  console.log('Prefix: ', prefix)
  console.log('Page changed: ', page.value.relativePath)
  if(lastClickedMenuItem.value){
    if(page.value.relativePath === 'docs/_index.md') {
      // Special case for root docs page
        console.log('Detected root docs page:', sidebarData)
      isEmptyIndexPage.value = true
      currentDirItems.value = sidebarData[lastClickedMenuItem.value]?.[prefix]?.items
      return
    }
  if (isEmpty) {
    console.log('Page is considered empty: ', page.value.relativePath)
      console.log('Persona: ', lastClickedMenuItem.value)
      const personaSidebar = sidebarData[lastClickedMenuItem.value][prefix]
      currentDirItems.value = findSidebarItemsByPath(page.value.relativePath, personaSidebar.items)
      return
    }
  }
//Handle non persona pages
  if (isEmpty) {
    if(page.value.relativePath === 'docs/_index.md') {
      // Special case for root docs page
      console.log('Detected root docs page:', sidebarData)
      isEmptyIndexPage.value = true
      currentDirItems.value = sidebarData[prefix]?.items
      return
    }
    const sidebar = theme.value.sidebar
    console.log('Non-persona-Sidebar:', sidebar)
    console.log(sidebar[`${prefix}`]?.items)
    currentDirItems.value = findSidebarItemsByPath(page.value.relativePath, sidebar[`${prefix}`]?.items)
    return
  }
  currentDirItems.value = []
}

// Watch for page changes (SPA navigation)
watch(
  () => page.value.relativePath,
  updateContent,
  { immediate: true }
)

//// Also watch for frontmatter changes
//watch(
//  () => frontmatter.value,
//  () => {
//    checkIfEmpty()
//  }
//)

onMounted(() => {
  checkIfEmpty()
  
  // Listen for persona menu clicks
  window.addEventListener('menuItemClicked', updateContent)
  window.addEventListener('navMenuItemClicked', updateContent)
  
  // Initialize lastClickedMenuItem from localStorage
  //const storedValue = localStorage.getItem('lastClickedMenuItem')
  //lastClickedMenuItem.value = storedValue ? JSON.parse(storedValue) : null
})
</script>
