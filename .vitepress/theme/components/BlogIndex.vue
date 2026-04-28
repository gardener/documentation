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

import { computed, onMounted, onUnmounted, ref } from 'vue'
import { data as posts } from '../../data/blog.data'
import { withBase } from 'vitepress'
import { canonicalizeTag } from '../../shared/blogMetadata'

interface VisibleAuthor {
  key: string
  name: string
  avatar?: string
}

function parseMultiValueFromUrl(paramName: string): string[] {
  if (typeof window === 'undefined') {
    return []
  }

  const params = new URLSearchParams(window.location.search)
  return params
    .getAll(paramName)
    .flatMap(value => value.split(','))
    .map(value => value.trim())
    .filter(Boolean)
}

function parseSelectedTagsFromUrl(): string[] {
  const rawValues = [
    ...parseMultiValueFromUrl('tag'),
    ...parseMultiValueFromUrl('tags')
  ]

  const selected: string[] = []

  for (const value of rawValues) {
    const normalized = canonicalizeTag(value)
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

function normalizeFilterValue(value: string): string {
  return value.trim().toLowerCase()
}

function normalizeYear(value: string): string {
  const trimmed = value.trim()
  return /^\d{4}$/.test(trimmed) ? trimmed : ''
}

function parseSelectedAuthorsFromUrl(): string[] {
  const selected: string[] = []

  for (const raw of parseMultiValueFromUrl('author')) {
    const normalized = normalizeFilterValue(raw)
    if (!normalized || selected.indexOf(normalized) !== -1) {
      continue
    }

    selected.push(normalized)
  }

  return selected
}

function parseSelectedYearsFromUrl(): string[] {
  const selected: string[] = []

  for (const raw of parseMultiValueFromUrl('year')) {
    const normalized = normalizeYear(raw)
    if (!normalized || selected.indexOf(normalized) !== -1) {
      continue
    }

    selected.push(normalized)
  }

  return selected
}

const selectedTags = ref<string[]>([])
const selectedAuthors = ref<string[]>([])
const selectedYears = ref<string[]>([])
const tagQuery = ref('')

function applySelectedFiltersFromUrl(): void {
  selectedTags.value = parseSelectedTagsFromUrl()
  selectedAuthors.value = parseSelectedAuthorsFromUrl()
  selectedYears.value = parseSelectedYearsFromUrl()
}

onMounted(() => {
  applySelectedFiltersFromUrl()
  window.addEventListener('popstate', applySelectedFiltersFromUrl)
})

onUnmounted(() => {
  window.removeEventListener('popstate', applySelectedFiltersFromUrl)
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

function toVisibleAuthor(author: { login?: string, name: string, avatar?: string }): VisibleAuthor {
  const keySource = author.login || author.name
  return {
    key: normalizeFilterValue(keySource),
    name: author.name,
    avatar: author.avatar
  }
}

function extractPostYear(postDate: { time: number, string: string }): string {
  if (postDate.time) {
    return String(new Date(postDate.time).getUTCFullYear())
  }

  const match = postDate.string.match(/\b(\d{4})\b/)
  return match ? match[1] : ''
}

const postsWithVisibleTags = computed(() => {
  return posts
    .filter(post => post.title !== 'Overview')
    .map(post => ({
      ...post,
      visibleTags: visibleTags(post.tags),
      visibleAuthors: post.authors.map(toVisibleAuthor),
      year: extractPostYear(post.date)
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
const normalizedSelectedAuthors = computed(() => selectedAuthors.value.map(author => normalizeFilterValue(author)))

const filteredPosts = computed(() => {
  return postsWithVisibleTags.value.filter(post => {
    const matchesSelectedTags =
      !normalizedSelectedTags.value.length ||
      normalizedSelectedTags.value.every(selectedTag =>
        post.visibleTags.some(tag => tag.toLowerCase() === selectedTag)
      )
    const matchesTagQuery = !normalizedTagQuery.value || post.visibleTags.some(tag => tag.toLowerCase().indexOf(normalizedTagQuery.value) !== -1)
    const matchesSelectedAuthors =
      !normalizedSelectedAuthors.value.length ||
      normalizedSelectedAuthors.value.every(selectedAuthor =>
        post.visibleAuthors.some(author => author.key === selectedAuthor)
      )
    const matchesSelectedYears =
      !selectedYears.value.length ||
      (post.year && selectedYears.value.indexOf(post.year) !== -1)

    return matchesSelectedTags && matchesTagQuery && matchesSelectedAuthors && matchesSelectedYears
  })
})

function syncSelectedFiltersToUrl(): void {
  if (typeof window === 'undefined') {
    return
  }

  const url = new URL(window.location.href)
  url.searchParams.delete('tag')
  url.searchParams.delete('tags')
  url.searchParams.delete('author')
  url.searchParams.delete('year')

  for (const tag of selectedTags.value) {
    url.searchParams.append('tag', tag)
  }

  for (const author of selectedAuthors.value) {
    url.searchParams.append('author', author)
  }

  for (const year of selectedYears.value) {
    url.searchParams.append('year', year)
  }

  window.history.replaceState({}, '', url)
}

function isTagActive(tag: string): boolean {
  const lowerTag = tag.toLowerCase()
  if (normalizedSelectedTags.value.indexOf(lowerTag) !== -1) return true
  if (normalizedTagQuery.value && lowerTag.indexOf(normalizedTagQuery.value) !== -1) return true
  return false
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
  syncSelectedFiltersToUrl()
}

function onTagInputChange(): void {
  const query = tagQuery.value.trim()
  if (!query) return

  const matchedTag = allVisibleTags.value.find(tag => tag.toLowerCase() === query.toLowerCase())
  if (matchedTag) {
    toggleTag(matchedTag)
  }
}

function isAuthorActive(author: VisibleAuthor): boolean {
  return normalizedSelectedAuthors.value.indexOf(author.key) !== -1
}

function toggleAuthor(author: VisibleAuthor): void {
  const existingIndex = selectedAuthors.value.findIndex(selected => normalizeFilterValue(selected) === author.key)

  if (existingIndex !== -1) {
    selectedAuthors.value.splice(existingIndex, 1)
  } else {
    selectedAuthors.value.push(author.key)
  }

  syncSelectedFiltersToUrl()
}

function isYearActive(year: string): boolean {
  return selectedYears.value.indexOf(year) !== -1
}

function toggleYear(year: string): void {
  if (!year) {
    return
  }

  const existingIndex = selectedYears.value.indexOf(year)
  if (existingIndex !== -1) {
    selectedYears.value.splice(existingIndex, 1)
  } else {
    selectedYears.value.push(year)
  }

  syncSelectedFiltersToUrl()
}

const selectedFiltersSummary = computed(() => {
  const parts: string[] = []

  if (selectedTags.value.length) {
    parts.push(`tagged "${selectedTags.value.join(', ')}"`)
  }

  if (selectedAuthors.value.length) {
    parts.push(`by selected author(s)`)
  }

  if (selectedYears.value.length) {
    parts.push(`from year(s) "${selectedYears.value.join(', ')}"`)
  }

  if (tagQuery.value) {
    parts.push(`matching "${tagQuery.value}"`)
  }

  if (!parts.length) {
    return ''
  }

  return `Showing posts ${parts.join(' and ')}.`
})

function clearFilters(): void {
  selectedTags.value = []
  selectedAuthors.value = []
  selectedYears.value = []
  tagQuery.value = ''
  syncSelectedFiltersToUrl()
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
        @change="onTagInputChange"
      />
      <button
        v-if="tagQuery || selectedTags.length || selectedAuthors.length || selectedYears.length"
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
    <p v-if="selectedFiltersSummary" class="filter-summary">{{ selectedFiltersSummary }}</p>
  </section>

  <p v-if="!filteredPosts.length" class="no-results">No posts found for the selected filters.</p>

  <ul v-else class="blog-list">
    <li class="blog-entry" v-for="post of filteredPosts" :key="post.url">
      <article class="blog-card">
        <a class="card-link" :href="withBase(post.url)" :aria-label="`Open post: ${post.title}`" />
        <ul class="tag-list" v-if="post.year || post.visibleTags.length" aria-label="Post tags">
          <li v-if="post.year" :key="`${post.url}-year-${post.year}`">
            <button
              type="button"
              class="tag tag-button year-button"
              :class="{ 'tag-active': isYearActive(post.year) }"
              :aria-pressed="isYearActive(post.year)"
              @click="toggleYear(post.year)"
            >
              {{ post.year }}
            </button>
          </li>
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

        <div class="post-date-row" v-if="post.date.string && post.date.string !== 'Undated'">
          <p class="post-date">{{ post.date.string }}</p>
        </div>
        <h2 class="title">{{ post.title }}</h2>

        <p class="preview" v-if="post.preview">{{ post.preview }}</p>
        <div class="post-footer">

          <div class="authors" :class="{ 'authors-multiple': post.visibleAuthors.length > 1 }" v-if="post.visibleAuthors.length" aria-label="Post authors">
            <span class="authors-label">By</span>
            <ul class="author-list" :class="{ 'author-list-multiple': post.visibleAuthors.length > 1 }">
              <li
                v-for="author of post.visibleAuthors"
                :key="`${post.url}-author-${author.key}`"
                class="author-item"
              >
                <button
                  type="button"
                  class="author-filter"
                  :class="{ 'author-active': isAuthorActive(author) }"
                  :aria-pressed="isAuthorActive(author)"
                  @click="toggleAuthor(author)"
                >
                  <img
                    v-if="author.avatar"
                    class="author-avatar"
                    :src="author.avatar"
                    :alt="`${author.name} avatar`"
                    loading="lazy"
                  />
                  <span class="author-name">{{ author.name }}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
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
  width: 100%;
  max-width: 100%;
}

.blog-entry {
  margin: 0;
  width: 100%;
  max-width: 100%;
  min-width: 0;
}

.blog-card {
  position: relative;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
  padding: 1.2rem 1.2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.card-link {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  z-index: 1;
}

.card-link:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}

.blog-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.post-date {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.2;
}

.post-date-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
}

.title {
  border: none;
  margin: 0;
  padding: 0;
  font-size: 1.35rem;
  line-height: 1.25;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.preview {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.55;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.post-footer {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 0.8rem;
  row-gap: 0.45rem;
  min-height: 2.2rem;
}

.authors {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  min-height: 2.2rem;
  overflow: visible;
  flex: 1 1 18rem;
  min-width: 0;
}

.authors-multiple {
  flex-wrap: wrap;
}

.authors-label {
  font-weight: 600;
  line-height: 1;
  flex: 0 0 auto;
}

.author-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem;
  min-height: 2.2rem;
  flex: 1 1 auto;
  min-width: 0;
  overflow: visible;
}

.author-list-multiple {
  flex-wrap: wrap;
  align-items: center;
  overflow: visible;
}

.author-list-multiple .author-item {
  flex: 0 0 auto;
  justify-content: flex-start;
}

.author-list-multiple .author-name {
  display: inline-flex;
  align-items: center;
  font-size: 0.84rem;
  font-weight: 500;
  line-height: 1;
  color: var(--vp-c-text-1);
  font-family: inherit;
}

.author-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 2.2rem;
  min-height: 2.2rem;
  box-sizing: border-box;
  margin: 0;
  white-space: nowrap;
}

.author-list > li.author-item,
.author-list > li.author-item + li.author-item {
  margin: 0 !important;
}

.author-avatar {
  width: 1.85rem;
  height: 1.85rem;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.author-name {
  display: inline-flex;
  align-items: center;
  font-size: 0.84rem;
  font-weight: 500;
  line-height: 1;
  color: var(--vp-c-text-1);
  font-family: inherit;
}

.author-filter {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  height: 100%;
  color: var(--vp-c-text-1);
  box-sizing: border-box;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  padding: 0.2rem 0.6rem 0.2rem 0.2rem;
  font-family: inherit;
  position: relative;
  z-index: 2;
}

.author-filter {
  text-decoration: none;
  cursor: pointer;
}

.author-filter::after {
  content: '';
  position: absolute;
  inset: -0.18rem;
}

.author-filter:hover .author-name,
.author-filter:focus-visible .author-name {
  text-decoration: none;
}

.author-filter:hover,
.author-filter:focus-visible,
.author-active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
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
  padding: 0.2rem 0.58rem;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.2;
  vertical-align: middle;
  transition: background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease;
}

.tag-button {
  cursor: pointer;
  position: relative;
  z-index: 2;
}

.tag-button::after {
  content: '';
  position: absolute;
  inset: -0.18rem;
}

.year-button {
  padding: 0.16rem 0.48rem;
}

.tag-button:hover,
.tag-button:focus-visible {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}

.tag-active {
  background: var(--vp-c-brand-1);
  color: #fff;
}

@media (max-width: 640px) {
  .blog-list,
  .blog-entry,
  .blog-card {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  .blog-card {
    padding: 1rem 0.95rem 0.9rem;
    overflow: hidden;
  }

  .title {
    font-size: 1.2rem;
  }

  .tag-filters {
    padding: 0.8rem;
  }

  .post-footer {
    align-items: flex-start;
  }

  .authors {
    flex: 1 1 100%;
    max-width: 100%;
  }

  .author-list {
    max-width: 100%;
  }
}
</style>
