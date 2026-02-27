<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
const { frontmatter, page } = useData()

const children = computed(() => frontmatter.value.taxonomyChildren as Array<{ text: string; link: string }> | undefined)

const pageTitle = computed(() => {
  return frontmatter.value.title || page.value.title || ''
})
</script>

<template>
  <Layout>
    <template #doc-before>
      <div v-if="children?.length" class="taxonomy-index">
        <h1>{{ pageTitle }}</h1>
        <ul class="taxonomy-list">
          <li v-for="child in children" :key="child.link">
            <a :href="child.link">{{ child.text }}</a>
          </li>
        </ul>
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.taxonomy-index {
  margin-bottom: 1rem;
}

.taxonomy-index h1 {
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.25;
  margin-bottom: 1rem;
}

.taxonomy-list {
  list-style: disc;
  padding-left: 1.5rem;
}

.taxonomy-list li {
  margin: 0.4rem 0;
}

.taxonomy-list a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.2s;
}

.taxonomy-list a:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}
</style>