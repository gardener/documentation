// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import YouTubeVideo from './components/YouTubeVideo.vue'
import VPFooter from './components/VPFooter.vue'
import TaxonomyIndex from './components/TaxonomyIndex.vue'
import HomeHeroCertificationLogos from './components/HomeHeroCertificationLogos.vue'
import './style.css'


export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(TaxonomyIndex),
      'home-hero-actions-after': () => h(HomeHeroCertificationLogos),
      'layout-bottom': () => h(VPFooter),
    })
  },
  enhanceApp({ app }) {
    app.component('YouTubeVideo', YouTubeVideo)
  },
} satisfies Theme
