// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import CustomeLayout from "./custome-layout.vue";
import LandingPage from './components/LandingPage.vue'
import GardenerArchitectureDiagram from './components/GardenerArchitectureDiagram.vue'

export default {
  extends: DefaultTheme,
  Layout: CustomeLayout,
  enhanceApp({ app, router, siteData }) {
    // Register components globally
    app.component('LandingPage', LandingPage)
    app.component('GardenerArchitectureDiagram', GardenerArchitectureDiagram)
  }
} satisfies Theme
