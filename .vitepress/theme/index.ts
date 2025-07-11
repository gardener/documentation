// https://vitepress.dev/guide/custom-theme
import { Theme, useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import YouTubeVideo from './components/YouTubeVideo.vue'
import VPNavbarMenuGroupWrapper from './components/VPNavbarMenuGroupWrapper.vue';
import EmptyIndexLayout from './layouts/EmptyIndexLayout.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: EmptyIndexLayout,
  enhanceApp({ app, router, siteData }) {
    app.component('YouTubeVideo', YouTubeVideo);
    app.component('VPNavbarMenuGroupWrapper', VPNavbarMenuGroupWrapper);
  },
} satisfies Theme