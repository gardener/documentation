// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import YouTubeVideo from './components/YouTubeVideo.vue'
import VPFooter from './components/VPFooter.vue'
import TaxonomyIndex from './components/TaxonomyIndex.vue'
import Banner from './components/Banner.vue'
import BlogPostMeta from './components/BlogPostMeta.vue'
import PageActions from './components/PageActions.vue'
import PageFeedback from './components/PageFeedback.vue'
import VPFeatures from './components/VPFeatures.vue'
import CardGrid from './components/CardGrid.vue'
import { initAnalytics } from './utils/analytics'
import './style.css'


export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(TaxonomyIndex),
      'aside-top': () => h(BlogPostMeta),
      'aside-outline-before': () => [h(PageActions), h(PageFeedback)],
      'home-features-before': () => h(Banner),
      'layout-bottom': () => h(VPFooter),
    })
  },
  enhanceApp({ app, router }) {
    app.component('YouTubeVideo', YouTubeVideo)
    app.component('VPFeatures', VPFeatures)
    app.component('CardGrid', CardGrid)

    // Plausible is browser-only; guard against SSR build (enhanceApp also runs in Node)
    if (!import.meta.env.SSR) {
      initAnalytics(router)
    }
  },
} satisfies Theme

