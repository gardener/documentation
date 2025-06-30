// https://vitepress.dev/guide/custom-theme
import { Theme, useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import YouTubeVideo from './components/YouTubeVideo.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.component('YouTubeVideo', YouTubeVideo)
  },
} satisfies Theme