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
import { useSidebar } from 'vitepress/theme';
import { withBase, useData } from "vitepress";
import euSupportImg from '../assets/eu-support.png'
import neonephosLogo from '../assets/neonephos_logo.svg'
import neonephosLogoDark from '../assets/neonephos_logo_dark.svg'

const { hasSidebar } = useSidebar()
const { isDark, title, theme } = useData()
const projectName = title || '<YOUR PROJECT NAME>'

</script>

<template>
  <footer class="VPFooter" :class="{ 'has-sidebar': hasSidebar }">
    <div class="container">
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
          <div class="copyright">
            <p>
              <strong>
                Copyright © Linux Foundation Europe.
              </strong>
            </p>
            {{ projectName }} is a project of NeoNephos Foundation.
            For applicable policies including privacy policy, terms of use and trademark usage guidelines, please see <a href="https://linuxfoundation.eu">https://linuxfoundation.eu</a>.
            Linux is a registered trademark of Linus Torvalds.
          </div>
        </div>

      </div>
      
      <!-- Neonephos Logo Section -->
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

      <div class="footer-legal-links">
        <a href="/about/terms-of-use">Terms of Use</a>
        <span class="footer-legal-sep">|</span>
        <a href="/about/privacy">Privacy Statement</a>
        <span class="footer-legal-sep">|</span>
        <a href="/about/legal-disclosure">Legal Disclosure</a>
      </div>
      <!-- Netlify Badge Section -->
      <div v-if="theme.isNetlify" class="neonephos-logos">
        <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer" class="neonephos-link">
          <img v-if="!isDark" src="https://www.netlify.com/assets/badges/netlify-badge-light.svg" alt="Deploys by Netlify" class="netlify-logo" />
          <img v-else src="https://www.netlify.com/assets/badges/netlify-badge-dark.svg" alt="Deploys by Netlify" class="netlify-logo" />
        </a>
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

.VPFooter.has-sidebar {
  display: none;
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

.container {
  margin: 0 auto;
  max-width: var(--vp-layout-max-width);
  text-align: center;
}

.message,
.copyright {
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

/* Main Footer Container */
.footer {
  border-top: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
  padding: 32px 24px;
  margin-top: 64px;
}

.container {
  max-width: 1152px;
  margin: 0 auto;
}

/* Columns for navigation links */
.footer-columns {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 48px;
}

.footer-column {
  flex-grow: 1;
  min-width: 160px;
}

.footer-column h5 {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column li {
  margin-bottom: 6px;
}

.footer-column a {
  font-size: 14px;
  color: var(--vp-c-text-2);
  transition: color 0.25s;
}

.footer-column a:hover {
  color: var(--vp-c-brand-1);
}

/* Funding Notice Section */
.funding-notice {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
  padding: 0 0 24px 0;
}

.funding-image img {
  max-width: 300px;
  height: auto;
  display: block;
}

.funding-text {
  flex: 1;
  min-width: 280px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  text-align: left;
}

.funding-text p {
  margin: 0;
}

/* Final Copyright Line */
.copyright {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;
  text-align: left;
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-top: 24px;
  line-height: 1.6;
}

.footer-legal-links {
  margin-top: 8px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.footer-legal-links a {
  color: var(--vp-c-text-2);
  text-decoration: underline;
  margin: 0 4px;
  transition: color 0.2s;
}

.footer-legal-links a:hover {
  color: var(--vp-c-brand-1);
}

.footer-legal-sep {
  margin: 0 4px;
  color: var(--vp-c-divider);
}

/* Neonephos Logo Section */
.neonephos-logos {
  margin: 24px 0;
  text-align: center;
}

.neonephos-logo {
  max-height: 60px;
  height: auto;
  display: block;
  margin: 0 auto;
}

.neonephos-link {
  display: inline-block;
}

.netlify-logo {
  display: block;
  margin: 0 auto;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .footer-columns {
    justify-content: flex-start;
  }
  
  .neonephos-logo {
    max-height: 50px;
  }
}
</style>
