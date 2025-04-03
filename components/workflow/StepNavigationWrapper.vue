<script setup lang="ts">
import StepNavigation from '@/components/workflow/StepNavigation.vue'

const props = defineProps<{
  backDisabled?: boolean
  nextDisabled?: boolean
  nextLabel?: string
  showGenerateExample?: boolean
  onGenerateExample?: () => void
}>()
</script>

<template>
  <StepNavigation
    :back-disabled="backDisabled"
    :next-disabled="nextDisabled"
    :next-label="nextLabel"
    :show-generate-example="showGenerateExample"
    :on-generate-example="onGenerateExample"
  />
</template>
