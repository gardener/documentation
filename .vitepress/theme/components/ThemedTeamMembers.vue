<template>
  <VPTeamMembers :size="size" :members="themedMembers" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { VPTeamMembers } from 'vitepress/theme'
import { withBase } from 'vitepress'

interface ThemedMember {
  name: string
  logo: string
  darkLogo?: string
  [key: string]: any
}

interface Props {
  members: ThemedMember[]
  size?: 'small' | 'medium'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium'
})

const themedMembers = computed(() => {
  return props.members.map(member => ({
    ...member,
    avatar: withBase(member.logo),
    darkAvatar: member.darkLogo ? withBase(member.darkLogo) : undefined
  }))
})
</script>

<style scoped>
@media (max-width: 640px) {
  :deep(.VPTeamMembers.small .container) {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 12px !important;
  }

  :deep(.VPTeamMembers.small .container .item) {
    min-width: 0;
  }

  :deep(.VPTeamMembersItem.small .profile) {
    padding: 18px 12px;
  }
}
</style>
