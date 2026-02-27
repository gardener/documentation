// https://vitepress.dev/guide/custom-theme
import { Theme, useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import YouTubeVideo from './components/YouTubeVideo.vue'
import VPFooter from './components/VPFooter.vue'
import EmptyIndexLayout from './layouts/EmptyIndexLayout.vue'
import './style.css'

// Extend Window interface to include plausible
declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, any> }) => void;
  }
}

export default {
  extends: DefaultTheme,
  Layout: EmptyIndexLayout,
  enhanceApp({ app, router, siteData }) {
    app.component('YouTubeVideo', YouTubeVideo)
    app.component('VPFooter', VPFooter)
  },
} satisfies Theme
