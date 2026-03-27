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

Copied and adapted from -> https://github.com/vuejs/vitepress/blob/2342269486e82b9b3f692976892f77b0792268ee/src/client/theme-default/components/VPSidebarItem.vue
*/

import type { DefaultTheme } from 'vitepress/theme'
import { useData } from 'vitepress'
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  watchEffect,
  watchPostEffect
} from 'vue'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'

const props = defineProps<{
  item: DefaultTheme.SidebarItem
  depth: number
}>()

const { page, hash } = useData()

const HASH_RE = /#.*$/
const HASH_OR_QUERY_RE = /[?#].*$/
const INDEX_OR_EXT_RE = /(?:(^|\/)index)?\.(?:md|html)$/
const inBrowser = typeof window !== 'undefined'

const collapsed = ref(false)

const collapsible = computed(() => {
  return props.item.collapsed != null
})

const isLink = computed(() => {
  return !!props.item.link
})

const isActiveLink = ref(false)

function normalizePath(path: string): string {
  return decodeURI(path)
    .replace(HASH_OR_QUERY_RE, '')
    .replace(INDEX_OR_EXT_RE, '$1')
}

function isActive(currentPath: string, matchPath?: string): boolean {
  if (matchPath === undefined) {
    return false
  }

  const normalizedCurrentPath = normalizePath(`/${currentPath}`)
  if (normalizePath(matchPath) !== normalizedCurrentPath) {
    return false
  }

  const hashMatch = matchPath.match(HASH_RE)
  if (hashMatch) {
    return (inBrowser ? location.hash : '') === hashMatch[0]
  }

  return true
}

function containsActiveLink(path: string, items: DefaultTheme.SidebarItem[] | DefaultTheme.SidebarItem): boolean {
  if (Array.isArray(items)) {
    return items.some((item) => containsActiveLink(path, item))
  }

  return isActive(path, items.link)
    ? true
    : items.items
      ? containsActiveLink(path, items.items)
      : false
}

const updateIsActiveLink = () => {
  isActiveLink.value = isActive(page.value.relativePath, props.item.link)
}

watch([page, () => props.item, hash], updateIsActiveLink)
onMounted(updateIsActiveLink)

const hasActiveLink = computed(() => {
  if (isActiveLink.value) {
    return true
  }

  return props.item.items
    ? containsActiveLink(page.value.relativePath, props.item.items)
    : false
})

const hasChildren = computed(() => {
  return !!(props.item.items && props.item.items.length)
})

watchEffect(() => {
  collapsed.value = !!(collapsible.value && props.item.collapsed)
})

watchPostEffect(() => {
  ;(isActiveLink.value || hasActiveLink.value) && (collapsed.value = false)
})

function toggle() {
  if (collapsible.value) {
    collapsed.value = !collapsed.value
  }
}

const sectionTag = computed(() => (hasChildren.value ? 'section' : `div`))

const linkTag = computed(() => (isLink.value ? 'a' : 'div'))

const textTag = computed(() => {
  return !hasChildren.value
    ? 'p'
    : props.depth + 2 === 7
      ? 'p'
      : `h${props.depth + 2}`
})

const itemRole = computed(() => (isLink.value ? undefined : 'button'))

const classes = computed(() => [
  [`level-${props.depth}`],
  { collapsible: collapsible.value },
  { collapsed: collapsed.value },
  { 'is-link': isLink.value },
  { 'is-active': isActiveLink.value },
  { 'has-active': hasActiveLink.value }
])

const SIDEBAR_LINK_CLICK_EVENT = 'gardener:sidebar-link-click' // Shared event for syncing collapse state across all sidebar items.

type SidebarLinkClickDetail = {
  link: string
}

function normalizeLink(link?: string): string {
  if (!link) return ''
  const [withoutHash] = link.split('#')
  const [withoutQuery] = withoutHash.split('?')
  const normalized = withoutQuery.replace(/\/+$/, '')
  return normalized || '/'
}

function itemContainsLink(item: DefaultTheme.SidebarItem, targetLink: string): boolean {
  // Returns true when this item (or any nested child) is on the clicked link path.
  const normalizedTarget = normalizeLink(targetLink)
  if (!normalizedTarget) return false

  if (normalizeLink(item.link) === normalizedTarget) {
    return true
  }

  return Array.isArray(item.items) && item.items.some((child) => itemContainsLink(child, targetLink))
}

function onSidebarLinkClick(event: Event): void {
  // Collapse this item unless it contains the clicked link in its subtree.
  const customEvent = event as CustomEvent<SidebarLinkClickDetail>
  const clickedLink = customEvent.detail?.link
  if (!clickedLink || !collapsible.value) return

  collapsed.value = !itemContainsLink(props.item, clickedLink)
}

function onItemInteraction(e: MouseEvent | Event) {
  if ('key' in e && e.key !== 'Enter') {
    return
  }
  !props.item.link && toggle()
}

function onCaretClick() {
  props.item.link && toggle()
}

function onLinkClick() {
  if (typeof window === 'undefined' || !props.item.link) return

  // Publish clicked link so sibling branches can auto-collapse.
  window.dispatchEvent(
    new CustomEvent<SidebarLinkClickDetail>(SIDEBAR_LINK_CLICK_EVENT, {
      detail: { link: props.item.link }
    })
  )
}

onMounted(() => {
  if (typeof window === 'undefined') return
  // Listen for link-click events dispatched from any sidebar item instance.
  window.addEventListener(SIDEBAR_LINK_CLICK_EVENT, onSidebarLinkClick as EventListener)
})

onBeforeUnmount(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener(SIDEBAR_LINK_CLICK_EVENT, onSidebarLinkClick as EventListener)
})
</script>

<template>
  <component :is="sectionTag" class="VPSidebarItem" :class="classes">
    <div
      v-if="item.text"
      class="item"
      :role="itemRole"
      v-on="
        item.items
          ? { click: onItemInteraction, keydown: onItemInteraction }
          : {}
      "
      :tabindex="item.items && 0"
    >
      <div class="indicator" />

      <VPLink
        v-if="item.link"
        class="link"
        :tag="linkTag"
        :href="item.link"
        :rel="item.rel"
        :target="item.target"
        @click="onLinkClick"
      >
        <component :is="textTag" class="text" v-html="item.text" />
      </VPLink>
      <component v-else :is="textTag" class="text" v-html="item.text" />

      <div
        v-if="item.collapsed != null && item.items && item.items.length"
        class="caret"
        role="button"
        aria-label="toggle section"
        @click="onCaretClick"
        @keydown.enter="onCaretClick"
        tabindex="0"
      >
        <span class="vpi-chevron-right caret-icon" />
      </div>
    </div>

    <div v-if="item.items && item.items.length" class="items">
      <template v-if="depth < 5">
        <VPSidebarItem
          v-for="i in item.items"
          :key="i.text"
          :item="i"
          :depth="depth + 1"
        />
      </template>
    </div>
  </component>
</template>

<style scoped>
.VPSidebarItem.level-0 {
  padding-bottom: 24px;
}

.VPSidebarItem.collapsed.level-0 {
  padding-bottom: 10px;
}

.item {
  position: relative;
  display: flex;
  width: 100%;
}

.VPSidebarItem.collapsible > .item {
  cursor: pointer;
}

.indicator {
  position: absolute;
  top: 6px;
  bottom: 6px;
  left: -17px;
  width: 2px;
  border-radius: 2px;
  transition: background-color 0.25s;
}

.VPSidebarItem.level-2.is-active > .item > .indicator,
.VPSidebarItem.level-3.is-active > .item > .indicator,
.VPSidebarItem.level-4.is-active > .item > .indicator,
.VPSidebarItem.level-5.is-active > .item > .indicator {
  background-color: var(--vp-c-brand-1);
}

.link {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.text {
  flex-grow: 1;
  padding: 4px 0;
  line-height: 24px;
  font-size: 14px;
  transition: color 0.25s;
}

.VPSidebarItem.level-0 .text {
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.VPSidebarItem.level-1 .text,
.VPSidebarItem.level-2 .text,
.VPSidebarItem.level-3 .text,
.VPSidebarItem.level-4 .text,
.VPSidebarItem.level-5 .text {
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.VPSidebarItem.level-0.is-link > .item > .link:hover .text,
.VPSidebarItem.level-1.is-link > .item > .link:hover .text,
.VPSidebarItem.level-2.is-link > .item > .link:hover .text,
.VPSidebarItem.level-3.is-link > .item > .link:hover .text,
.VPSidebarItem.level-4.is-link > .item > .link:hover .text,
.VPSidebarItem.level-5.is-link > .item > .link:hover .text {
  color: var(--vp-c-brand-1);
}

.VPSidebarItem.level-0.has-active > .item > .text,
.VPSidebarItem.level-1.has-active > .item > .text,
.VPSidebarItem.level-2.has-active > .item > .text,
.VPSidebarItem.level-3.has-active > .item > .text,
.VPSidebarItem.level-4.has-active > .item > .text,
.VPSidebarItem.level-5.has-active > .item > .text,
.VPSidebarItem.level-0.has-active > .item > .link > .text,
.VPSidebarItem.level-1.has-active > .item > .link > .text,
.VPSidebarItem.level-2.has-active > .item > .link > .text,
.VPSidebarItem.level-3.has-active > .item > .link > .text,
.VPSidebarItem.level-4.has-active > .item > .link > .text,
.VPSidebarItem.level-5.has-active > .item > .link > .text {
  color: var(--vp-c-text-1);
}

.VPSidebarItem.level-0.is-active > .item .link > .text,
.VPSidebarItem.level-1.is-active > .item .link > .text,
.VPSidebarItem.level-2.is-active > .item .link > .text,
.VPSidebarItem.level-3.is-active > .item .link > .text,
.VPSidebarItem.level-4.is-active > .item .link > .text,
.VPSidebarItem.level-5.is-active > .item .link > .text {
  color: var(--vp-c-brand-1);
}

.caret {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: -7px;
  width: 32px;
  height: 32px;
  color: var(--vp-c-text-3);
  cursor: pointer;
  transition: color 0.25s;
  flex-shrink: 0;
}

.item:hover .caret {
  color: var(--vp-c-text-2);
}

.item:hover .caret:hover {
  color: var(--vp-c-text-1);
}

.caret-icon {
  font-size: 18px;
  /*rtl:ignore*/
  transform: rotate(90deg);
  transition: transform 0.25s;
}

.VPSidebarItem.collapsed .caret-icon {
  transform: rotate(0)/*rtl:rotate(180deg)*/;
}

.VPSidebarItem.level-1 .items,
.VPSidebarItem.level-2 .items,
.VPSidebarItem.level-3 .items,
.VPSidebarItem.level-4 .items,
.VPSidebarItem.level-5 .items {
  border-left: 1px solid var(--vp-c-divider);
  padding-left: 16px;
}

.VPSidebarItem.collapsed .items {
  display: none;
}
</style>
