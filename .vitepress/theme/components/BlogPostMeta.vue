<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute, withBase } from 'vitepress'
import { normalizeAuthors, normalizeTags } from '../../shared/blogMetadata'


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

const authors = computed(() => normalizeAuthors(frontmatter.value.authors ?? frontmatter.value.author))
const tags = computed(() => normalizeTags(frontmatter.value.tags))
const hasVisibleMetadata = computed(() =>
  Boolean(dateText.value || authors.value.length || tags.value.length)
)

function formatDate(raw: unknown): string | undefined {
  if (!raw) {
    return undefined
  }

  if (raw instanceof Date && !Number.isNaN(raw.getTime())) {
    return toDisplayDate(new Date(Date.UTC(raw.getUTCFullYear(), raw.getUTCMonth(), raw.getUTCDate())))
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

  const isoDateTime = /^(\d{4})-(\d{2})-(\d{2})T/.exec(trimmed)
  if (isoDateTime) {
    const [, year, month, day] = isoDateTime
    return toDisplayDate(new Date(Date.UTC(Number(year), Number(month) - 1, Number(day))))
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

function getTagHref(tag: string): string {
  return withBase(`/blog/?tag=${encodeURIComponent(tag)}`)
}

function isAuthorLinkable(author: { login?: string, email?: string }): boolean {
  return Boolean(author.login)
}

function getAuthorGithubHref(login: string): string {
  return `https://github.com/${encodeURIComponent(login)}`
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

      <div v-if="authors.length" class="meta-authors" :class="{ 'meta-authors-multiple': authors.length > 1 }">
        <span class="meta-by">By</span>
        <ul class="author-list" :class="{ 'author-list-multiple': authors.length > 1 }">
          <li v-for="author in authors" :key="author.login || author.name" class="author-item">
            <a
                v-if="isAuthorLinkable(author)"
                class="author-link"
                :href="getAuthorGithubHref(author.login!)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  v-if="author.avatar"
                  class="author-avatar"
                  :src="author.avatar"
                  :alt="`${author.name} avatar`"
                  loading="lazy"
                />
                <span class="author-name">{{ author.name }}</span>
              </a>
              <span v-else class="author-static">
                <img
                  v-if="author.avatar"
                  class="author-avatar"
                  :src="author.avatar"
                  :alt="`${author.name} avatar`"
                  loading="lazy"
                />
                <span class="author-name">{{ author.name }}</span>
              </span>
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
  margin: 0 0 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.65rem;
  text-align: left;
  padding: 0.8rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.meta-primary {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  align-items: flex-start;
  justify-content: flex-start;
}

.meta-date {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.2;
}

.meta-authors {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.4rem;
  flex-wrap: nowrap;
  min-height: 2.2rem;
  overflow-x: auto;
}

.meta-authors-multiple {
  flex-wrap: nowrap;
}

.meta-by {
  color: var(--vp-c-text-2);
  font-size: 0.86rem;
  font-weight: 600;
  line-height: 1;
  flex: 0 0 auto;
}

.author-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.45rem;
  flex-wrap: nowrap;
  min-height: 2.2rem;
  min-width: 0;
  overflow-x: auto;
}

.author-list-multiple {
  flex-wrap: nowrap;
  align-items: center;
  overflow-x: auto;
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

.author-link,
.author-static {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  height: 100%;
  color: var(--vp-c-text-1);
  box-sizing: border-box;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  padding: 0.1rem 0.45rem 0.1rem 0.1rem;
  font-family: inherit;
}

.author-link {
  text-decoration: none;
}

.author-link:visited {
  color: var(--vp-c-text-1);
}

.author-link:hover .author-name {
  text-decoration: underline;
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

