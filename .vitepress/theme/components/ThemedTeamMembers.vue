<template>
  <VPTeamMembers :size="size" :members="themedMembers" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
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

const { isDark } = useData()

const themedMembers = computed(() => {
  return props.members.map(member => ({
    ...member,
    avatar: withBase(isDark.value ? (member.darkLogo || member.logo) : member.logo)
  }))
})
</script>
