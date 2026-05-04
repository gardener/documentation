<template>
  <div class="card-grid-group">
    <slot />
  </div>
</template>

<style scoped>
.card-grid-group :deep(.card) {
  height: 100%;
}
</style>
