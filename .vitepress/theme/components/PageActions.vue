<!--
Custom component that renders page-level action links in the aside.
Configured via `pageActions` in config.mts:
  - `siteHostname` (string): used to build the full page URL passed to url functions
  - `links` (array): links to render, each with:
      - `text` (string): link label
      - `icon` (string): CSS class name (e.g. 'vpi-square-pen') or inline SVG string
      - `url` (string | function): static URL or function receiving
        { filePath, frontmatter, pageTitle, pageUrl }

Recommended slot: `aside-outline-before` (top of the right sidebar, above the TOC).
Register in .vitepress/theme/index.ts:
  'aside-outline-before': () => h(PageActions)
-->

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

interface LinkContext {
  filePath: string
  frontmatter: Record<string, unknown>
  pageTitle: string
  pageUrl: string
}

interface LinkConfig {
  text: string
  icon: string
  url: string | ((context: LinkContext) => string | undefined)
}

interface PageActionsConfig {
  siteHostname?: string
  links?: LinkConfig[]
}

interface ResolvedLink {
  text: string
  icon: string
  url: string
}

const { theme, page, frontmatter } = useData()

const links = computed<ResolvedLink[]>(() => {
  const config = theme.value.pageActions as PageActionsConfig | undefined
  if (!config || frontmatter.value.editLink === false) return []

  const siteHostname = config.siteHostname ?? ''
  const pageUrl = `${siteHostname}/${page.value.relativePath.replace(/\.md$/, '')}`
  const context: LinkContext = { filePath: page.value.filePath, frontmatter: frontmatter.value, pageTitle: page.value.title, pageUrl }

  return (config.links ?? [])
    .map((link) => ({
      text: link.text,
      icon: link.icon,
      url: typeof link.url === 'function' ? link.url(context) : link.url,
    }))
    .filter((link): link is ResolvedLink => !!link.url)
})
</script>

<template>
  <div v-if="links.length" class="edit-this-page">
    <a v-for="link in links" :key="link.text" :href="link.url" target="_blank" rel="noreferrer">
      <span v-if="!link.icon.includes('<')" :class="link.icon" aria-hidden="true" />
      <span v-else class="svg-icon" aria-hidden="true" v-html="link.icon" />
      {{ link.text }}
    </a>
  </div>
</template>

<style scoped>
.edit-this-page {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 16px;
}

.edit-this-page a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 0;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: color 0.25s;
}

.edit-this-page a:hover {
  color: var(--vp-c-brand-2);
}

.vpi-square-pen {
  width: 16px;
  height: 16px;
}

.svg-icon {
  display: inline-flex;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.svg-icon :deep(svg) {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
