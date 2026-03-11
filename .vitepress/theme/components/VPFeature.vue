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

Copied and adapted from -> https://github.com/vuejs/vitepress/blob/2342269486e82b9b3f692976892f77b0792268ee/src/client/theme-default/components/VPFeature.vue
*/

import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import type { DefaultTheme } from 'vitepress/theme'
import VPImage from 'vitepress/dist/client/theme-default/components/VPImage.vue'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'

interface FeatureBadge {
  src: string
  darkSrc?: string
  alt: string
  href?: string
  rel?: string
  target?: string
}

const glowX = ref(0)
const glowY = ref(0)
const showGlow = ref(false)
const featureRef = ref<HTMLElement | null>(null)
const { isDark } = useData()

const props = defineProps<{
  icon?: DefaultTheme.FeatureIcon
  title: string
  details?: string
  link?: string
  linkText?: string
  rel?: string
  target?: string
  badges?: FeatureBadge[]
  badgePlacement?: 'inline' | 'top-right'
}>()

function isExternalHref(href: string): boolean {
  return /^(https?:)?\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')
}

function resolveBadgeHref(href?: string): string | undefined {
  if (!href) return undefined
  if (href.startsWith('#') || isExternalHref(href)) {
    return href
  }
  return withBase(href)
}

const resolvedBadges = computed(() =>
  (props.badges ?? []).map((badge) => {
    const resolvedHref = resolveBadgeHref(badge.href)
    const isExternal = resolvedHref ? isExternalHref(resolvedHref) : false
    return {
      ...badge,
      resolvedSrc: withBase(isDark.value && badge.darkSrc ? badge.darkSrc : badge.src),
      resolvedHref,
      resolvedTarget: badge.target ?? (isExternal ? '_blank' : undefined),
      resolvedRel: badge.rel ?? (isExternal ? 'noopener noreferrer' : undefined),
    }
  }),
)

function handleMouseMove(e: MouseEvent) {
  const rect = featureRef.value?.getBoundingClientRect()
  if (!rect) return
  glowX.value = e.clientX - rect.left
  glowY.value = e.clientY - rect.top
}
function handleMouseEnter() {
  showGlow.value = true
}
function handleMouseLeave() {
  showGlow.value = false
}
</script>

<template>
  <VPLink
    class="VPFeature"
    :href="link"
    :rel
    :target
    :no-icon="true"
    :tag="link ? 'a' : 'div'"
  >
    <article
      class="box"
      ref="featureRef"
      @mousemove="handleMouseMove"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div
        v-if="resolvedBadges.length && props.badgePlacement === 'top-right'"
        class="feature-badges feature-badges--top-right"
      >
        <component
          v-for="badge in resolvedBadges"
          :is="badge.resolvedHref ? 'a' : 'span'"
          :key="badge.alt"
          :href="badge.resolvedHref"
          :target="badge.resolvedTarget"
          :rel="badge.resolvedRel"
          @click.stop
          class="feature-badge-item"
          :class="{
            'feature-badge-item--link': !!badge.resolvedHref,
          }"
        >
          <img
            :src="badge.resolvedSrc"
            :alt="badge.alt"
            class="feature-badge-image"
          />
        </component>
      </div>
      <div class="box-surface">
        <div
          v-if="resolvedBadges.length && props.badgePlacement !== 'top-right'"
          class="feature-badges feature-badges--inline"
        >
          <component
            v-for="badge in resolvedBadges"
            :is="badge.resolvedHref ? 'a' : 'span'"
            :key="badge.alt"
            :href="badge.resolvedHref"
            :target="badge.resolvedTarget"
            :rel="badge.resolvedRel"
            @click.stop
            class="feature-badge-item"
            :class="{
              'feature-badge-item--link': !!badge.resolvedHref,
            }"
          >
            <img
              :src="badge.resolvedSrc"
              :alt="badge.alt"
              class="feature-badge-image"
            />
          </component>
        </div>
      <div
        v-if="showGlow"
        class="mouse-glow"
        :style="{
          left: glowX + 'px',
          top: glowY + 'px',
        }"
      ></div>
      <div v-if="typeof icon === 'object' && icon.wrap" class="icon">
        <VPImage
          :image="icon"
          :alt="icon.alt"
          :height="icon.height || 48"
          :width="icon.width || 48"
        />
      </div>
      <VPImage
        v-else-if="typeof icon === 'object'"
        :image="icon"
        :alt="icon.alt"
        :height="icon.height || 48"
        :width="icon.width || 48"
      />
      <div v-else-if="icon" class="icon" v-html="icon"></div>
      <h2 class="title" v-html="title"></h2>
      <p v-if="details" class="details" v-html="details"></p>

      <div v-if="linkText" class="link-text">
        <p class="link-text-value">
          {{ linkText }} <span class="vpi-arrow-right link-text-icon" />
        </p>
      </div>
      </div>
    </article>
  </VPLink>
</template>

<style scoped>
.VPFeature {
  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  transition: border-color 0.25s, background-color 0.25s;
}

.mouse-glow {
  position: absolute;
  pointer-events: none;
  width: 420px;
  height: 420px;
  border-radius: 12px; /* Match the feature box border radius */
  /* Use the same gradient as the hero image, but more intense and diffused */
  background: radial-gradient(circle, rgba(8,114,84,0.45) 0%, rgba(193,219,194,0.25) 60%, transparent 100%);
  filter: blur(48px);
  transform: translate(-50%, -50%);
  z-index: 1;
  opacity: 0.95;
  transition: opacity 0.2s;
  /* Contain the glow within the box */
  pointer-events: none;
}

.box {
  --feature-badge-inset: 12px;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: inherit;
}

.box-surface {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 24px;
  height: 100%;
  overflow: hidden;
  border-radius: inherit;
  isolation: isolate;
}

.box-surface > *:not(.mouse-glow) {
  position: relative;
  z-index: 2;
}

.box-surface > :deep(.VPImage) {
  margin-bottom: 20px;
}

.feature-badges {
  display: flex;
  gap: 6px;
  align-items: center;
  z-index: 3;
}

.feature-badges--inline {
  margin-bottom: 12px;
}

.feature-badges--top-right{
  position: absolute;
  top: var(--feature-badge-inset);
  right: var(--feature-badge-inset);
  z-index: 4;
  pointer-events: auto;
}

.feature-badge-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  position: relative;
  text-decoration: none;
}

.feature-badge-image {
  display: block;
  width: auto;
  height: 64px;
  max-width: none;
}

.feature-badge-item--link {
  cursor: pointer;
  transition: transform 0.18s ease, filter 0.2s ease;
}

.feature-badge-item--link:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

@media (hover: hover) and (pointer: fine) {
  .feature-badge-item--link:hover {
    transform: translateY(-1px) scale(1.02);
  }

  .feature-badge-item--link:hover .feature-badge-image {
    filter: brightness(1.06);
  }
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 6px;
  background-color: var(--vp-c-default-soft);
  width: 48px;
  height: 48px;
  font-size: 24px;
  transition: background-color 0.25s;
}

.title {
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
}

.details {
  flex-grow: 1;
  padding-top: 8px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.link-text {
  padding-top: 8px;
}

.link-text-value {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
}

.link-text-icon {
  margin-left: 6px;
}

@media (max-width: 640px) {
  .mouse-glow {
    display: none;
  }

  .box {
    --feature-badge-inset: 8px;
  }

  .box-surface {
    padding: 14px;
  }

  .feature-badge-image {
    height: 46px;
  }

  .box-surface > :deep(.VPImage) {
    margin-bottom: 10px;
  }

  .icon {
    margin-bottom: 10px;
    width: 36px;
    height: 36px;
  }

  .title {
    line-height: 20px;
    font-size: 14px;
  }

  .details {
    padding-top: 6px;
    line-height: 18px;
    font-size: 12px;
  }
}
</style>
