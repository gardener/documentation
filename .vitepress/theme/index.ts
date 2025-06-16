// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import CustomeLayout from "./custome-layout.vue";
export default {
  extends: DefaultTheme,
  Layout: CustomeLayout,
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme
