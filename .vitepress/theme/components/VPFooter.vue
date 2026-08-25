<!--
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
-->

<!--
Copied and adapted from: https://github.com/vuejs/vitepress/blob/828000099843c982f4ce9456aa6eb8cfb649f55f/src/client/theme-default/components/VPFooter.vue
-->

<script setup lang="ts">
import { computed } from 'vue'
import { useSidebar } from 'vitepress/theme';
import { useData } from "vitepress";
import euSupportImg from '../assets/eu-support.png'
import neonephosLogo from '../assets/neonephos_logo.svg'
import neonephosLogoDark from '../assets/neonephos_logo_dark.svg'

const { hasSidebar } = useSidebar()
const { isDark, site } = useData()
// Site name, not the per-page title (which is "<Page> | <Site>" on inner pages).
const projectName = computed(() => site.value.title || '<YOUR PROJECT NAME>')

</script>

<template>
  <footer class="VPFooter" :class="{ 'has-sidebar': hasSidebar }">
    <div class="container">
      <!-- Row 1: Funding notice + NeoNephos logo -->
      <div class="footer-top">
        <div class="funding-notice">
          <div class="funding-image">
            <div class="funding-image-container">
              <div class="funding-image-bg"></div>
              <img :src="euSupportImg" alt="EU and German government funding logos" class="funding-image-src">
            </div>
          </div>
          <div class="funding-text">
            <p>
              <strong>Funded by the European Union – NextGenerationEU.</strong>
            </p>
            <p>
              The views and opinions expressed are solely those of the author(s) and do not necessarily reflect the views of the European Union or the European Commission. Neither the European Union nor the European Commission can be held responsible for them.
            </p>
          </div>
        </div>
        <div class="neonephos-logos">
          <a href="https://neonephos.org/" target="_blank" rel="noopener noreferrer" class="neonephos-link">
            <img
              v-if="!isDark"
              :src="neonephosLogo"
              alt="Neonephos Logo"
              class="neonephos-logo"
            >
            <img
              v-else
              :src="neonephosLogoDark"
              alt="Neonephos Logo"
              class="neonephos-logo"
            >
          </a>
        </div>
      </div>

      <!-- Row 2: Copyright + Powered by -->
      <div class="footer-bottom">
        <div class="copyright">
          <p>
            <strong>Copyright © The Linux Foundation Europe. All rights reserved.</strong>
            <a href="https://linuxfoundation.eu/en/policies" class="policies-link">View Policies</a>
          </p>
          <p>
            {{ projectName }} is a project of the NeoNephos Foundation.
          </p>
        </div>
        <div class="powered-by">
          <span class="powered-by-text">Building this site is powered by</span>
          <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">
            <img v-if="!isDark" src="https://www.netlify.com/assets/badges/netlify-badge-light.svg" alt="Deploys by Netlify" class="netlify-logo" />
            <img v-else src="https://www.netlify.com/assets/badges/netlify-badge-dark.svg" alt="Deploys by Netlify" class="netlify-logo" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.VPFooter {
  position: relative;
  z-index: var(--vp-z-index-footer);
  border-top: 1px solid var(--vp-c-gutter);
  padding: 32px 24px;
  background-color: var(--vp-c-bg);
}

.VPFooter :deep(a) {
  text-decoration-line: underline;
  text-underline-offset: 2px;
  transition: color 0.25s;
}

.VPFooter :deep(a:hover) {
  color: var(--vp-c-text-1);
}

@media (min-width: 768px) {
  .VPFooter {
    padding: 32px;
  }
}

/* On pages with a sidebar, offset the footer so it sits within the
   content column instead of running underneath the fixed sidebar. */
@media (min-width: 960px) {
  .VPFooter.has-sidebar {
    margin-left: var(--vp-sidebar-width);
  }
}

.container {
  max-width: 1152px;
  margin: 0 auto;
}

/* Row 1: Funding + NeoNephos logo */
.footer-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding-bottom: 24px;
}

.funding-notice {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
  min-width: 0;
}

.funding-image img {
  max-width: 200px;
  height: auto;
  display: block;
}

.funding-text {
  flex: 1;
  min-width: 0;
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  text-align: left;
}

.funding-text p {
  margin: 0;
}

.neonephos-logos {
  flex-shrink: 0;
}

.neonephos-logo {
  max-height: 50px;
  height: auto;
  display: block;
}

.neonephos-link {
  display: inline-block;
}

/* Row 2: Copyright + Powered by */
.footer-bottom {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 32px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;
}

.copyright {
  flex: 1;
  min-width: 0;
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  text-align: left;
}

.copyright p {
  margin: 0;
}

.copyright .policies-link {
  margin-left: 4px;
}

.powered-by {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.powered-by-text {
  font-size: 12px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.netlify-logo {
  display: block;
  height: 28px;
}

/* Responsive */
@media (max-width: 768px) {
  .footer-top {
    flex-direction: column;
    align-items: flex-start;
  }

  .funding-notice {
    flex-direction: column;
    align-items: flex-start;
  }

  .neonephos-logos {
    align-self: center;
  }

  .neonephos-logo {
    max-height: 40px;
  }

  .footer-bottom {
    flex-direction: column;
  }

  .powered-by {
    align-self: center;
  }
}
</style>
