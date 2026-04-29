<script setup lang="ts">
defineProps<{
  cards: {
    title: string
    details: string
    link: string
  }[]
}>()
</script>

<template>
  <div class="card-grid">
    <a v-for="card in cards" :key="card.title" :href="card.link" class="card">
      <h3 class="card-title">{{ card.title }}</h3>
      <p class="card-details">{{ card.details }}</p>
    </a>
  </div>
</template>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-auto-rows: 1fr;
  gap: 16px;
  margin: 16px 0;
}

.card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px 24px;
  background-color: var(--vp-c-bg-soft);
  text-decoration: none;
  transition: border-color 0.25s, background-color 0.25s;
}

.card:hover {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-soft-up);
  text-decoration: none;
}

.card-title {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  line-height: 24px;
  border: none;
}

.card-details {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  line-height: 22px;
}
</style>
