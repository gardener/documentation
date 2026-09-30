<!--
Page feedback widget: two buttons (helpful / not helpful) that fire a Plausible
custom event tagged with the page path and a boolean. No free-text input.

Rendered in the aside via the `aside-outline-before` slot, below PageActions.
-->

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useData } from 'vitepress'

const { page, frontmatter, theme } = useData()
const voted = ref(false)

// The aside slot stays mounted across client-side navigation, so reset the
// vote state on every page change or the widget would show "thanks" site-wide
// after the first vote.
watch(() => page.value.relativePath, () => { voted.value = false })

// Mirror PageActions' visibility so feedback only shows where "Edit this page" does.
const visible = computed(() => !!theme.value.pageActions && frontmatter.value.editLink !== false)

async function vote(helpful: boolean) {
  if (voted.value) return
  voted.value = true
  // Import lazily so this component never pulls the tracker into SSR.
  const { track } = await import('@plausible-analytics/tracker')
  track('Feedback', {
    props: { path: page.value.relativePath, helpful: String(helpful) },
    interactive: false,
  })
}
</script>

<template>
  <div v-if="visible" class="page-feedback">
    <template v-if="!voted">
      <span class="page-feedback-label">Was this page helpful?</span>
      <div class="page-feedback-actions">
        <button class="page-feedback-btn" @click="vote(true)">
          <span aria-hidden="true">🌳</span> Yes
        </button>
        <button class="page-feedback-btn" @click="vote(false)">
          <span aria-hidden="true">🪾</span> No
        </button>
      </div>
    </template>
    <span v-else class="page-feedback-thanks">Thanks for your feedback! 🌳</span>
  </div>
</template>

<style scoped>
.page-feedback {
  display: flex;
  flex-direction: column;
  gap: 8px;
  /* PageActions sits above with margin-bottom:16px; pull up so the gap to
     "Report an issue" matches the 2px line-gap between the PageActions links. */
  margin-top: -14px;
  margin-bottom: 16px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.page-feedback-actions {
  display: flex;
  gap: 8px;
}

.page-feedback-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  line-height: 1;
  background: none;
  border: 0;
  cursor: pointer;
  padding: 0 6px 0 0;
  color: var(--vp-c-text-1);
  transition: color 0.15s;
}

.page-feedback-btn span {
  font-size: 18px;
}

.page-feedback-btn:hover {
  color: var(--vp-c-brand-1);
}

.page-feedback-thanks {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
</style>
