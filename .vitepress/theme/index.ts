// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import YouTubeVideo from './components/YouTubeVideo.vue'
import VPFooter from './components/VPFooter.vue'
import TaxonomyIndex from './components/TaxonomyIndex.vue'
import './style.css'

// Extend Window interface to include plausible
declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, any> }) => void;
  }
}

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(TaxonomyIndex),
      'layout-bottom': () => h(VPFooter),
    })
  },
  enhanceApp({ app }) {
    app.component('YouTubeVideo', YouTubeVideo)
  },
} satisfies Theme
