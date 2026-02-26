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
    // Handle 404 detection for both initial loads and SPA navigation
    if (typeof window !== 'undefined') {
      let lastTrackedPath = '';
      
      // Function to check and track 404 pages with deduplication
      const check404 = (path?: string) => {
        setTimeout(() => {
          if (document.querySelector('.NotFound')) {
            const currentPath = path || document.location.pathname;
            
            // Prevent duplicate tracking for the same path
            if (currentPath !== lastTrackedPath) {
              lastTrackedPath = currentPath;
              if (typeof window?.plausible === 'function') {
                window.plausible('404', { props: { path: currentPath } });
                console.log('executed 404 for:', currentPath);
              }
            }
          } else {
            // Reset tracking when not on 404 page
            lastTrackedPath = '';
          }
        }, 100); // Small delay to ensure DOM is updated
      };
      
      // Initial page load check
      document.addEventListener('DOMContentLoaded', () => check404());
      
      // SPA navigation - handle route changes
      router.onAfterRouteChanged = (to) => {
        check404(to);
      };
    }
  },
} satisfies Theme
