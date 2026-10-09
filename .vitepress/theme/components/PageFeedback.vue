<!--
Page feedback widget: two buttons (helpful / not helpful) that fire a Plausible
custom event tagged with the page path and a boolean. No free-text input.

Rendered in the aside via the `aside-outline-before` slot, below PageActions.
Visual style: "boxed card" (soft-filled container, full-width split buttons)
so it reads as a distinct section instead of crowding the sidebar.
-->

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

const { page, frontmatter, theme } = useData()
const route = useRoute()
const voted = ref(false)

// The aside slot stays mounted across client-side navigation, so reset the
// vote state on every page change or the widget would show "thanks" site-wide
// after the first vote.
watch(() => page.value.relativePath, () => { voted.value = false })

// Mirror PageActions' visibility so feedback only shows where "Edit this page" does.
const visible = computed(() => !!theme.value.pageActions && frontmatter.value.editLink !== false)

// Detect a blog *article* (not the blog index or the year/month archive
// listings). Mirrors the detection in BlogPostMeta.vue so the wording stays
// consistent with where blog metadata is shown.
const isBlogPost = computed(() => {
  const path = route.path || ''
  if (!path.startsWith('/blog/')) return false
  if (path === '/blog/' || path === '/blog/index.html') return false
  if (/^\/blog\/\d{4}\/?$/.test(path)) return false
  if (/^\/blog\/\d{4}\/\d{2}\/?$/.test(path)) return false
  return true
})

// Blog articles read "article"; everything else reads "page".
const promptLabel = computed(() =>
  isBlogPost.value ? 'Was this article helpful for you?' : 'Was this page helpful?'
)

async function vote(helpful: boolean) {
  if (voted.value) return
  voted.value = true
  // Capture page identity before the async import: navigation during the
  // import would otherwise attribute the vote to the next page.
  const path = page.value.relativePath
  const url = window.location.href
  // Import lazily so this component never pulls the tracker into SSR.
  const { track } = await import('@plausible-analytics/tracker')
  track('Feedback', {
    url,
    props: { path, helpful: String(helpful) },
    interactive: false,
  })
}
</script>

<template>
  <div v-if="visible" class="page-feedback">
    <template v-if="!voted">
      <span class="page-feedback-label">{{ promptLabel }}</span>
      <div class="page-feedback-actions">
        <button class="page-feedback-btn" @click="vote(true)">
          <span aria-hidden="true">🌳</span> Yes
        </button>
        <button class="page-feedback-btn" @click="vote(false)">
          <span aria-hidden="true">🪾</span> No
        </button>
      </div>
    </template>
    <span v-else class="page-feedback-thanks">Thank you for your feedback!</span>
  </div>
</template>

<style scoped>
/* Boxed card: a soft-filled, bordered container that separates the feedback
   prompt from the "Edit this page" links above and the TOC below. */
.page-feedback {
  margin-top: 4px;
  margin-bottom: 16px;
  padding: 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.page-feedback-label {
  display: block;
  margin-bottom: 12px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.page-feedback-actions {
  display: flex;
  gap: 8px;
}

.page-feedback-btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 9px 10px;
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}

.page-feedback-btn span {
  font-size: 15px;
}

.page-feedback-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.page-feedback-thanks {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
</style>
