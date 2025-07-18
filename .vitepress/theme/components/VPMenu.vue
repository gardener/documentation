<script lang="ts" setup>
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

Copied and adapted from -> https://github.com/vuejs/vitepress/blob/cec0014ccb438b48a5dc396925a08cfa41656a80/src/client/theme-default/components/VPMenu.vue
*/
import VPMenuGroup from 'vitepress/dist/client/theme-default/components/VPMenuGroup.vue'
import CustomVPMenuLink from './CustomVPMenuLink.vue'

defineProps<{
  items?: any[]
}>()
</script>

<template>
  <div class="VPMenu">
    <div v-if="items" class="items">
      <template v-for="item in items" :key="JSON.stringify(item)">
        <CustomVPMenuLink
          v-if="'link' in item" 
          :item="item" 
        />
        <component
            v-else-if="'component' in item"
            :is="item.component"
            v-bind="item.props"
        />
        <VPMenuGroup v-else :text="item.text" :items="item.items" />
      </template>
    </div>

    <slot />
  </div>
</template>

<style scoped>
.VPMenu {
  border-radius: 12px;
  padding: 12px;
  min-width: 128px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-3);
  transition: background-color 0.5s;
  max-height: calc(100vh - var(--vp-nav-height));
  overflow-y: auto;
}

.VPMenu :deep(.group) {
  margin: 0 -12px;
  padding: 0 12px 12px;
}

.VPMenu :deep(.group + .group) {
  border-top: 1px solid var(--vp-c-divider);
  padding: 11px 12px 12px;
}

.VPMenu :deep(.group:last-child) {
  padding-bottom: 0;
}

.VPMenu :deep(.group + .item) {
  border-top: 1px solid var(--vp-c-divider);
  padding: 11px 16px 0;
}

.VPMenu :deep(.item) {
  padding: 0 16px;
  white-space: nowrap;
}

.VPMenu :deep(.label) {
  flex-grow: 1;
  line-height: 28px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: color 0.5s;
}

.VPMenu :deep(.action) {
  padding-left: 24px;
}
</style>