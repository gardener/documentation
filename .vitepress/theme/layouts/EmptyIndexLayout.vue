<template>
  <Layout>
    <template #doc-before>
      <div v-if="isEmptyIndexPage" class="vp-doc">
        <!-- Directory taxonomy display -->
        <div class="directory-index">
          <h1>{{ frontmatter.title || 'Directory Contents' }}</h1>
          
          <ul v-if="currentDirItems.length > 0">
            <li v-for="item in currentDirItems" :key="getConsistentLink(item.link)">
              <a @click="taxonomyItemClicked(getConsistentLink(item.link))" :href="getRelativePath(getConsistentLink(item.link))">{{ item.text }}</a>
            </li>
          </ul>
          
          <p v-else>No pages found in this directory.</p>
        </div>
      </div>
    </template>
    <template #layout-bottom>
      <VPFooter/>
    </template>
  </Layout>
</template>

<script setup>
import {useData, useRouter, withBase} from 'vitepress'
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { data as sidebars } from '@data/sidebar.data'
import VPFooter from '../components/VPFooter.vue'

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

// Get the current URL reactively
console.log(`page.value.relativePath: ${page.value.relativePath}`)
console.log(`page.value.filePath: ${page.value.filePath}`)
const currentUrl = computed(() => page.value.relativePath || page.value.filePath)

// Function to get the relative part of a link compared to the current URL
const getRelativePath = (targetLink) => {
  if (!targetLink) return ''

  // Normalize links by removing leading slashes and ensuring consistency
  const normalizeLink = (link) => {
    let normalized = link.replace(/\/index\.md$/, '/').replace(/\.md$/, '')
    return normalized.startsWith('/') ? normalized.slice(1) : normalized
  }

  const current = normalizeLink(currentUrl.value)
  const target = normalizeLink(targetLink)

  // Split paths into segments
  const currentSegments = current.split('/').filter(Boolean)
  const targetSegments = target.split('/').filter(Boolean)

  // Find common base path
  let commonLength = 0
  while (
    commonLength < currentSegments.length &&
    commonLength < targetSegments.length &&
    currentSegments[commonLength] === targetSegments[commonLength]
  ) {
    commonLength++
  }

  // Calculate relative path
  const upLevels = currentSegments.length - commonLength
  const downPath = targetSegments.slice(commonLength)

  // Build relative path
  if (upLevels === 0 && downPath.length === 0) {
    return './'
  }

  const upSegments = Array(upLevels).fill('..')
  const relativePath = [...upSegments, ...downPath].join('/')

  return relativePath || './'
}

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
  if(typeof window === 'undefined') return
  lastClickedMenuItem.value = window.localStorage.getItem('lastClickedMenuItem') || 'all'
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
  if(typeof window === 'undefined') return
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
  if(typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('taxonomyItemClicked', {
    detail: { value: link }
  }))
}

/**
 * Normalizes and ensures consistent link formatting for navigation and sidebar items.
 * 
 * Purpose:
 * - Converts relative sidebar links to absolute paths under /docs
 * - Normalizes index.md file references to directory paths
 * - Preserves absolute paths for non-docs content (home, blog, community, etc.)
 * 
 * Used in two contexts:
 * 1. Sidebar rendering: Converts relative links like 'gardener/concepts/index.md' to '/docs/gardener/concepts/'
 * 2. Router navigation: Processes router paths while respecting absolute non-docs routes
 * 
 * @param {string} link - The link to normalize (can be relative or absolute)
 * @returns {string} The normalized link
 * 
 * Examples:
 * - 'gardener/concepts/index.md' ’ '/docs/gardener/concepts/'
 * - 'gardener/concepts/' ’ '/docs/gardener/concepts/'
 * - '/docs/gardener/concepts/' ’ '/docs/gardener/concepts/' (unchanged)
 * - '/' ’ '/' (home page, unchanged)
 * - '/blog' ’ '/blog' (other top-level routes, unchanged)
 */
const getConsistentLink = (link) => {
  // Step 1: Normalize index.md references to directory paths
  // Why: VitePress uses clean URLs, so '/path/index.md' should be '/path/'
  const consistentLink = link?.replace(/\/index\.md$/, '/')

  // Step 2: Prepend /docs to relative links (sidebar items from config)
  // Why: Sidebar items are defined as relative paths like 'gardener/concepts/'
  //      but need to resolve to absolute paths '/docs/gardener/concepts/'
  // Condition: Only apply to links that are:
  //   - Not already under /docs (avoid double-prefixing)
  //   - Not absolute paths starting with / (respect other top-level routes like /, /blog, /community)
  if (consistentLink && !consistentLink.startsWith('/docs') && !consistentLink.startsWith('/')) {
    return '/docs/' + consistentLink
  }

  // Step 3: Return the link as-is if it's already absolute or properly prefixed
  return consistentLink
}



</script>
