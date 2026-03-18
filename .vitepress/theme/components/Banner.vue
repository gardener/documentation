<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import banner from '../assets/banner.png'
import bannerMobile from '../assets/banner-mobile.png'

const BANNER_EXPIRY = new Date('2026-03-27T00:00:00')
const BANNER_LINK = 'https://neonephos.org/events/2026_03_23_KubeCon_Europe'

const route = useRoute()
const isLandingPage = computed(() => route.path === '/')
const isExpired = computed(() => new Date() >= BANNER_EXPIRY)
const isVisible = computed(() => isLandingPage.value && !isExpired.value)
</script>

<template>
  <div v-if="isVisible" class="banner-shell">
    <a :href="BANNER_LINK" target="_blank" rel="noopener noreferrer" class="banner-link">
      <picture>
        <source :srcset="bannerMobile" media="(max-width: 768px)" />
        <img
          class="hero-image"
          :src="banner"
          alt="Join NeoNephos at KubeCon CloudNativeCon Europe 2026 in Amsterdam, Booth 993, March 23-26"
        />
      </picture>
    </a>
  </div>
</template>

<style scoped>
.banner-shell {
  position: relative;
  width: min(1152px, calc(100% - 64px));
  margin: -32px auto 16px;
  z-index: 24;
}

.banner-link {
  display: block;
  text-decoration: none;
}

.hero-image {
  display: block;
  width: 100%;
  max-height: 180px;
  object-fit: contain;
  object-position: left center;
  border-radius: 12px;
}

@media (min-width: 769px) {
  .banner-shell {
    margin-top: -48px;
    margin-bottom: 16px;
  }
}

@media (max-width: 960px) {
  .banner-shell {
    width: calc(100% - 32px);
  }
}

@media (max-width: 768px) {
  .hero-image {
    max-height: none;
    object-fit: cover;
  }
}
</style>
