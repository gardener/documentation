<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute, withBase } from 'vitepress'

interface Author {
  name: string
  avatar?: string
}

const { frontmatter } = useData()
const route = useRoute()

const isBlogPost = computed(() => {
  const path = route.path || ''
  if (!path.startsWith('/blog/')) {
    return false
  }

  if (path === '/blog/' || path === '/blog/index.html') {
    return false
  }

  if (/^\/blog\/\d{4}\/?$/.test(path)) {
    return false
  }

  if (/^\/blog\/\d{4}\/\d{2}\/?$/.test(path)) {
    return false
  }

  return true
})

const dateText = computed(() => {
  const raw = frontmatter.value.publishdate || frontmatter.value.date || frontmatter.value.newsSubtitle
  return formatDate(raw)
})

const authors = computed(() => normalizeAuthors(frontmatter.value.authors))
const tags = computed(() => normalizeTags(frontmatter.value.tags))
const hasVisibleMetadata = computed(() =>
  Boolean(dateText.value || authors.value.length || tags.value.length)
)

function formatDate(raw: unknown): string | undefined {
  if (!raw) {
    return undefined
  }

  if (raw instanceof Date && !Number.isNaN(raw.getTime())) {
    return toDisplayDate(raw)
  }

  if (typeof raw !== 'string') {
    return undefined
  }

  const trimmed = raw.trim()
  if (!trimmed) {
    return undefined
  }

  const isoDateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed)
  if (isoDateOnly) {
    const [, year, month, day] = isoDateOnly
    return toDisplayDate(new Date(Date.UTC(Number(year), Number(month) - 1, Number(day))))
  }

  const parsed = new Date(trimmed)
  if (!Number.isNaN(parsed.getTime())) {
    return toDisplayDate(parsed)
  }

  return trimmed
}

function toDisplayDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  })
}

function normalizeAuthors(raw: unknown): Author[] {
  if (!Array.isArray(raw)) {
    return []
  }

  const unique: Author[] = []
  const seen = new Set<string>()

  for (const value of raw) {
    const author = normalizeAuthor(value)
    if (!author) {
      continue
    }

    const key = author.name.toLowerCase()
    if (seen.has(key)) {
      continue
    }

    seen.add(key)
    unique.push(author)
  }

  return unique
}

function normalizeAuthor(value: unknown): Author | undefined {
  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) {
      return undefined
    }

    const login = getGitHubLogin(trimmed)
    const name = trimmed.startsWith('@')
      ? trimmed.slice(1)
      : login ?? trimmed

    return {
      name,
      avatar: toGitHubAvatar(login)
    }
  }

  if (!value || typeof value !== 'object') {
    return undefined
  }

  const rawAuthor = value as {
    name?: unknown
    avatar?: unknown
    image?: unknown
    login?: unknown
    github?: unknown
    url?: unknown
  }

  const explicitName = typeof rawAuthor.name === 'string' ? rawAuthor.name.trim() : ''
  const login = getGitHubLogin(rawAuthor.login)
    ?? getGitHubLogin(rawAuthor.github)
    ?? getGitHubLogin(rawAuthor.url)

  const name = explicitName || login || ''
  if (!name) {
    return undefined
  }

  const explicitAvatar =
    typeof rawAuthor.avatar === 'string' && rawAuthor.avatar.trim()
      ? rawAuthor.avatar.trim()
      : (typeof rawAuthor.image === 'string' ? rawAuthor.image.trim() : undefined)

  return {
    name,
    avatar: explicitAvatar || toGitHubAvatar(login)
  }
}

function getGitHubLogin(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined
  }

  const trimmed = value.trim()
  if (!trimmed) {
    return undefined
  }

  const withoutPrefix = trimmed.startsWith('@') ? trimmed.slice(1) : trimmed

  if (isGitHubLogin(withoutPrefix)) {
    return withoutPrefix
  }

  const match = withoutPrefix.match(/github\.com\/([A-Za-z0-9-]+)/i)
  if (match && isGitHubLogin(match[1])) {
    return match[1]
  }

  return undefined
}

function isGitHubLogin(value: string): boolean {
  return /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/.test(value)
}

function toGitHubAvatar(login: string | undefined): string | undefined {
  if (!login) {
    return undefined
  }

  return `https://avatars.githubusercontent.com/${login}`
}

function normalizeTags(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return uniqueNonEmpty(raw)
  }

  if (typeof raw === 'string') {
    return uniqueNonEmpty(raw.split(','))
  }

  return []
}

function uniqueNonEmpty(values: unknown[]): string[] {
  const unique: string[] = []

  for (const value of values) {
    if (typeof value !== 'string') {
      continue
    }

    const normalized = value.trim()
    if (!normalized || unique.some(tag => tag.toLowerCase() === normalized.toLowerCase())) {
      continue
    }

    unique.push(normalized)
  }

  return unique
}

function getTagHref(tag: string): string {
  return withBase(`/blog/?tag=${encodeURIComponent(tag)}`)
}
</script>

<template>
  <div
    v-if="isBlogPost && hasVisibleMetadata"
    class="blog-post-meta"
    aria-label="Blog post metadata"
  >
    <div class="meta-primary">
      <span v-if="dateText" class="meta-date">{{ dateText }}</span>

      <div v-if="authors.length" class="meta-authors">
        <span class="meta-by">By</span>
        <ul class="author-list">
          <li v-for="author in authors" :key="author.name" class="author-item">
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
    </div>

    <ul v-if="tags.length" class="meta-tags" aria-label="Blog post tags">
      <li v-for="tag in tags" :key="tag">
        <a class="meta-tag" :href="getTagHref(tag)">{{ tag }}</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.blog-post-meta {
  margin: 0.35rem 0 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.55rem;
  text-align: left;
}

.meta-primary {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  justify-content: flex-start;
}

.meta-date {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 0.18rem 0.6rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  font-size: 0.82rem;
}

.meta-authors {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.meta-by {
  color: var(--vp-c-text-2);
  font-size: 0.86rem;
  font-weight: 600;
}

.author-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.45rem;
  flex-wrap: wrap;
}

.author-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
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
  font-size: 0.84rem;
  color: var(--vp-c-text-2);
}

.meta-tags {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.meta-tag {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 999px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 0.76rem;
  font-weight: 600;
  line-height: 1.2;
  text-decoration: none;
  padding: 0.18rem 0.55rem;
}

.meta-tag:hover {
  text-decoration: underline;
}
</style>
