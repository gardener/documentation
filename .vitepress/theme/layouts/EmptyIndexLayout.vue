<template>
  <Layout>
    <template #doc-before>
      <div v-if="isEmptyIndexPage" class="vp-doc">
        <!-- Directory taxonomy display -->
        <div class="directory-index">
          <h1>{{ frontmatter.title || 'Directory Contents' }}</h1>
          
          <ul v-if="currentDirItems.length > 0">
            <li v-for="item in currentDirItems" :key="item.link">
              <a :href="item.link">{{ item.text }}</a>
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
const { page, frontmatter, site } = useData()


const isEmptyIndexPage = ref(false)
const lastClickedMenuItem = ref(null)
const currentDirItems = ref([])

// Check if this is an empty index page
const checkIfEmpty = async () => {
 // Check if it's an index file
  const isIndexFile = page.value.relativePath.endsWith('index.md') || 
                     page.value.relativePath.endsWith('_index.md')
  
  if (!isIndexFile) {
    isEmptyIndexPage.value = false
    return isEmptyIndexPage.value
  }
  
  // Wait for DOM to be updated without our content
  await nextTick()
  
  // Check if the .vp-doc div is empty or has minimal content
  const vpDocElement = document.querySelector('.vp-doc')
  if (vpDocElement) {
    const textContent = vpDocElement.textContent?.trim() || ''
    const isEmpty = textContent.length < 50
    isEmptyIndexPage.value = isEmpty
    return isEmpty
  } 
}

// Watch for page changes (SPA navigation)
watch(
  () => page.value.relativePath,
  async () => {
    const isEmpty = await checkIfEmpty()
    if (isEmpty) {
      console.log('Page is considered empty: ', page.value.relativePath)
      lastClickedMenuItem.value = localStorage.getItem('lastClickedMenuItem')
      if( lastClickedMenuItem.value) {
        console.log('Persona: ', lastClickedMenuItem.value)
        const personaSidebar = sidebarData[lastClickedMenuItem.value]['/docs/']

        //Pop to remove the file entry from the path
        const dirSteps = page.value.relativePath.split('/')
        //Remove docs prefix
        dirSteps.shift()
        console.log(dirSteps)

        let selectedSidebarItems = personaSidebar.items
        let previousSteps = ''
        for (const dirStep of dirSteps) {
          console.log('currentDirItems: ', selectedSidebarItems)
          for (const item of selectedSidebarItems){
            const itemLink = item?.link?.replace(previousSteps, '')

            if (itemLink?.startsWith(dirStep+'/')) {
              previousSteps += dirStep+'/'
              console.log('previousSteps: ', previousSteps)

              selectedSidebarItems = item.items || []
            }
          }
        }
        currentDirItems.value = selectedSidebarItems
        return
      }
// todo handle non persona cases
    }
    currentDirItems.value = []

  },
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
  // Initialize lastClickedMenuItem from localStorage
  //const storedValue = localStorage.getItem('lastClickedMenuItem')
  //lastClickedMenuItem.value = storedValue ? JSON.parse(storedValue) : null
})
</script>
