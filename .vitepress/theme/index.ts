// https://vitepress.dev/guide/custom-theme
import { Theme, useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import YouTubeVideo from './components/YouTubeVideo.vue'
import VPNavbarMenuGroupWrapper from './components/VPNavbarMenuGroupWrapper.vue';
import DynamicLayout from './layouts/DynamicLayout.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: DynamicLayout,
  enhanceApp({ app, router, siteData }) {
    app.component('YouTubeVideo', YouTubeVideo);
    app.component('VPNavbarMenuGroupWrapper', VPNavbarMenuGroupWrapper);
  },
} satisfies Theme
