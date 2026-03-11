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

Copied and adapted from -> https://github.com/vitejs/vite/blob/9b98dcbf75546240e1609185828e18a77bac8c8d/docs/.vitepress/theme/components/YouTubeVideo.vue
*/

import { computed, onMounted, ref } from 'vue'
import { data as posts } from '../../data/blog.data'
import { withBase } from 'vitepress'
function parseSelectedTagsFromUrl(): string[] {
  if (typeof window === 'undefined') {
    return []
  }

  const params = new URLSearchParams(window.location.search)
  const rawValues = [
    ...params.getAll('tag'),
    ...params.getAll('tags').flatMap(value => value.split(','))
  ]

  const selected: string[] = []

  for (const value of rawValues) {
    const normalized = value.trim()
    if (!normalized) {
      continue
    }

    if (selected.some(tag => tag.toLowerCase() === normalized.toLowerCase())) {
      continue
    }

    selected.push(normalized)
  }

  return selected
}

const selectedTags = ref<string[]>([])
const tagQuery = ref('')

onMounted(() => {
  selectedTags.value = parseSelectedTagsFromUrl()
})

function compareTags(a: string, b: string): number {
  const normalizedA = a.toLowerCase()
  const normalizedB = b.toLowerCase()

  if (normalizedA === normalizedB) {
    return a.localeCompare(b)
  }

  return normalizedA.localeCompare(normalizedB)
}

function visibleTags(tags: string[]): string[] {
  return [...tags].sort(compareTags)
}

const postsWithVisibleTags = computed(() => {
  return posts
    .filter(post => post.title !== 'Overview')
    .map(post => ({
      ...post,
      visibleTags: visibleTags(post.tags)
    }))
})

const allVisibleTags = computed(() => {
  const tagsByNormalized = new Map<string, string>()

  for (const post of postsWithVisibleTags.value) {
    for (const tag of post.visibleTags) {
      const normalized = tag.toLowerCase()
      if (!tagsByNormalized.has(normalized)) {
        tagsByNormalized.set(normalized, tag)
      }
    }
  }

  return Array.from(tagsByNormalized.values()).sort(compareTags)
})

const normalizedTagQuery = computed(() => tagQuery.value.trim().toLowerCase())
const normalizedSelectedTags = computed(() => selectedTags.value.map(tag => tag.toLowerCase()))

const filteredPosts = computed(() => {
  return postsWithVisibleTags.value.filter(post => {
    const matchesSelectedTags =
      !normalizedSelectedTags.value.length ||
      normalizedSelectedTags.value.every(selectedTag =>
        post.visibleTags.some(tag => tag.toLowerCase() === selectedTag)
      )
    const matchesTagQuery = !normalizedTagQuery.value || post.visibleTags.some(tag => tag.toLowerCase().indexOf(normalizedTagQuery.value) !== -1)

    return matchesSelectedTags && matchesTagQuery
  })
})

function isTagActive(tag: string): boolean {
  return normalizedSelectedTags.value.indexOf(tag.toLowerCase()) !== -1
}

function toggleTag(tag: string): void {
  const existingIndex = selectedTags.value.findIndex(selected => selected.toLowerCase() === tag.toLowerCase())

  if (existingIndex !== -1) {
    selectedTags.value.splice(existingIndex, 1)
  } else {
    selectedTags.value.push(tag)
  }

  // Clicking tags manages the selected tag set explicitly.
  tagQuery.value = ''
}

function clearFilters(): void {
  selectedTags.value = []
  tagQuery.value = ''
}
</script>

<template>
  <section class="tag-filters" aria-label="Blog tag filters">
    <label class="filter-label" for="tag-filter-input">Filter posts by tag</label>
    <div class="filter-controls">
      <input
        id="tag-filter-input"
        v-model="tagQuery"
        class="filter-input"
        list="blog-tag-options"
        type="text"
        placeholder="Type a tag (for example: security)"
      />
      <button
        v-if="tagQuery || selectedTags.length"
        class="clear-filter"
        type="button"
        @click="clearFilters"
      >
        Clear
      </button>
      <datalist id="blog-tag-options">
        <option
          v-for="tag in allVisibleTags"
          :key="`tag-option-${tag}`"
          :value="tag"
        />
      </datalist>
    </div>
    <p v-if="selectedTags.length && tagQuery" class="filter-summary">Showing posts tagged "{{ selectedTags.join(', ') }}" and matching "{{ tagQuery }}".</p>
    <p v-else-if="selectedTags.length" class="filter-summary">Showing posts tagged "{{ selectedTags.join(', ') }}".</p>
    <p v-else-if="tagQuery" class="filter-summary">Showing posts matching "{{ tagQuery }}".</p>
  </section>

  <p v-if="!filteredPosts.length" class="no-results">No posts found for this tag filter.</p>

  <ul v-else class="blog-list">
    <li class="blog-entry" v-for="post of filteredPosts" :key="post.url">
      <article class="blog-card">
        <ul class="tag-list" v-if="post.visibleTags.length" aria-label="Post tags">
          <li v-for="tag of post.visibleTags" :key="`${post.url}-${tag}`">
            <button
              type="button"
              class="tag tag-button"
              :class="{ 'tag-active': isTagActive(tag) }"
              :aria-pressed="isTagActive(tag)"
              @click="toggleTag(tag)"
            >
              {{ tag }}
            </button>
          </li>
        </ul>

        <h2 class="title">
          <a :href="withBase(post.url)">{{ post.title }}</a>
        </h2>

        <p class="preview" v-if="post.preview">{{ post.preview }}</p>
        <div class="authors" v-if="post.authors.length" aria-label="Post authors">
          <span class="authors-label">By</span>
          <ul class="author-list">
            <li
              v-for="author of post.authors"
              :key="`${post.url}-author-${author.login || author.name}`"
              class="author-item"
            >
              <img
                v-if="author.avatar"
                class="author-avatar"
                :src="author.avatar"
                :alt="`${author.name} avatar`"
                loading="lazy"
              />
              <span class="author-name">{{ author.name }}</span>
            </li>
          </ul>
        </div>

        <a class="read-more" :href="withBase(post.url)">Read post</a>
      </article>
    </li>
  </ul>
</template>

<style scoped>
.tag-filters {
  margin: 1.2rem 0 0.8rem;
  padding: 0.9rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.filter-label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.55rem;
  color: var(--vp-c-text-1);
}

.filter-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  align-items: center;
}

.filter-input {
  flex: 1 1 280px;
  min-width: 220px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  padding: 0.45rem 0.65rem;
  font-size: 0.92rem;
}

.filter-input:focus {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 1px;
}

.clear-filter {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-radius: 8px;
  padding: 0.42rem 0.62rem;
  font-size: 0.86rem;
  cursor: pointer;
}

.clear-filter:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.filter-summary {
  margin: 0.55rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.88rem;
}

.no-results {
  margin: 1rem 0;
  color: var(--vp-c-text-2);
}

.blog-list {
  list-style-type: none;
  padding: 0;
  margin: 1.2rem 0 0;
  display: grid;
  gap: 1.25rem;
}

.blog-entry {
  margin: 0;
}

.blog-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
  padding: 1.2rem 1.2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.blog-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.title {
  border: none;
  margin: 0;
  padding: 0;
  font-size: 1.35rem;
  line-height: 1.25;
}

.title a {
  font-weight: 700;
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.title a:hover {
  color: var(--vp-c-brand-1);
}

.preview {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.55;
}

.authors {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.authors-label {
  font-weight: 600;
}

.author-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.author-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg);
  padding: 0.1rem 0.45rem 0.1rem 0.1rem;
}

.author-avatar {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.author-name {
  line-height: 1.1;
}

.read-more {
  width: fit-content;
  margin-top: 0.2rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.read-more:hover {
  text-decoration: underline;
}

.tag-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  align-items: center;
}

.tag-list li {
  display: flex;
  align-items: center;
  margin: 0;
}

.blog-card .tag-list li + li {
  margin-top: 0;
}

.tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 0.18rem 0.55rem;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.2;
  vertical-align: middle;
}

.tag-button {
  cursor: pointer;
}

.tag-active {
  background: var(--vp-c-brand-1);
  color: #fff;
}

@media (max-width: 640px) {
  .blog-card {
    padding: 1rem 0.95rem 0.9rem;
  }

  .title {
    font-size: 1.2rem;
  }

  .tag-filters {
    padding: 0.8rem;
  }
}
</style>










