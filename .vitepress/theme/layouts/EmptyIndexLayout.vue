<template>
  <Layout>
    <template #doc-before>
      <div v-if="isEmptyIndexPage" class="vp-doc">
        <!-- Directory taxonomy display -->
        <div class="directory-index">
          <h1>{{ frontmatter.title || 'Directory Contents' }}</h1>
          
          <ul v-if="currentDirItems.length > 0">
            <li v-for="item in currentDirItems" :key="getConsistentLink(item.link)">
              <a @click="taxonomyItemClicked(getConsistentLink(item.link))" :href="getConsistentLink(item.link)">{{ item.text }}</a>
            </li>
          </ul>
          
          <p v-else>No pages found in this directory.</p>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script setup>
import { useData, useRouter } from 'vitepress'
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { data as sidebars } from '@data/sidebar.data'
import _ from 'lodash-es'

const router = useRouter()
router.onBeforePageLoad = (to, from) => {
  console.log('onBeforePageLoad called with:', to, from)
  updateContent(getConsistentLink(to.path))
}

//todo extract together with .vitepress/theme/components/VPSidebarGroup.vue
const sidebarData = {
  developer: sidebars.developersSidebar,
  user: sidebars.usersSidebar,
  operator: sidebars.operatorsSidebar,
  all: sidebars.all
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
  console.log('findSidebarItemsByPath called with:', relativePath, sidebarItems)
  // Pop to remove the file entry from the path
  const dirSteps = relativePath.split('/')
  // Remove docs prefix from iteration
  dirSteps.shift()

  let selectedSidebarItems = sidebarItems
  let previousSteps = 'docs/'
  
  for (const dirStep of dirSteps) {

    for (const item of selectedSidebarItems) {
      let itemLink = item?.link?.replace(previousSteps, '')
      
      if (itemLink.startsWith('/')) {
        itemLink = itemLink.slice(1);
      }
      
      if (itemLink?.startsWith(dirStep + '/')) {
        previousSteps += dirStep + '/'

        selectedSidebarItems = item.items || []
        break // Exit the inner loop once we find the matching item
      }
    }
  }

  for (const item of selectedSidebarItems) {
    // Check and fix the link field
    if (item?.link && !item?.link.startsWith('/docs')) {
      item.link = '/docs' + (item.link.startsWith('/') ? item.link : '/' + item.link)
    }
  }
  
  console.log('Selected sidebar items:', selectedSidebarItems)
  return selectedSidebarItems
}

// Extract the logic to update content based on current page and persona
const updateContent = async (route = page.value.relativePath) => {
  lastClickedMenuItem.value = localStorage.getItem('lastClickedMenuItem') || 'all'
  const isEmpty = checkIfEmpty()
  console.log('route: ', route)
  const prefixDir = route.split('/').shift()
  console.log(page.value.relativePath)
  const prefix = `/${prefixDir}/`
  if(lastClickedMenuItem.value){
    if(route === 'docs/_index.md') {
      // Special case for root docs page
      isEmptyIndexPage.value = true
      currentDirItems.value = sidebarData[lastClickedMenuItem.value]?.items
      return
    }
  if (isEmpty) {
      const personaSidebar = sidebarData[lastClickedMenuItem.value]
      currentDirItems.value = findSidebarItemsByPath(route, personaSidebar.items)
      console.log('should have been updated !!!')
      return
    }
  }
  currentDirItems.value = []
}

// Watch for page changes (SPA navigation)
watch(
  () => page.value.relativePath, //Works only on new tab
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
  window.addEventListener('menuItemClicked', () => updateContent())
  window.addEventListener('navMenuItemClicked',() => updateContent())
  window.addEventListener('taxonomyItemClicked', async (event) => {
    currentDirItems.value = []
    await updateContent(event.detail.value)
  })

  // Initialize lastClickedMenuItem from localStorage
  //const storedValue = localStorage.getItem('lastClickedMenuItem')
  //lastClickedMenuItem.value = storedValue ? JSON.parse(storedValue) : null
})

const taxonomyItemClicked = (link) => {
  console.log('TaxonomyItemClicked')
  window.dispatchEvent(new CustomEvent('taxonomyItemClicked', {
    detail: { value: link }
  }))
}

const getConsistentLink = (link) => {

  const consistentLink = link?.replace(/\/index\.md$/, '/')

  // Ensure the link is consistent with the current persona
  if (consistentLink && !consistentLink.startsWith('/docs')) {
    return '/docs' + (consistentLink.startsWith('/') ? consistentLink : '/' + consistentLink)
  }
  return consistentLink
}

</script>
