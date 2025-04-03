<script setup lang="ts">
import { useWorkflowStore } from '@/stores/workflow'

const props = defineProps<{
  backDisabled?: boolean
  nextDisabled?: boolean
  nextLabel?: string
  showGenerateExample?: boolean
  onGenerateExample?: () => void
}>()

const workflowStore = useWorkflowStore()
const currentStep = computed(() => workflowStore.getCurrentStep)
const canAdvance = computed(() => workflowStore.canAdvance)

const handleBack = () => {
  if (currentStep.value > 1 && !props.backDisabled) {
    workflowStore.goToStep(currentStep.value - 1)
  }
}

const handleNext = () => {
  if (canAdvance.value && !props.nextDisabled) {
    workflowStore.advanceStep()
  }
}
</script>

<template>
  <div class="flex justify-between mt-8">
    <UButton
      variant="ghost"
      color="gray"
      @click="handleBack"
      :disabled="backDisabled || currentStep === 1"
    >
      <UIcon name="i-heroicons-arrow-left" class="mr-1 h-4 w-4" />
      Back
    </UButton>
    
    <div class="flex space-x-3">
      <UButton
        v-if="showGenerateExample"
        variant="outline"
        color="purple"
        @click="onGenerateExample"
      >
        <UIcon name="i-heroicons-sparkles" class="mr-1 h-4 w-4" />
        Generate Example
      </UButton>
      
      <UButton
        variant="solid"
        class="bg-purple-600 hover:bg-purple-700 text-white"
        @click="handleNext"
        :disabled="nextDisabled || !canAdvance"
      >
        {{ nextLabel || 'Next Step' }}
        <UIcon name="i-heroicons-arrow-right" class="ml-1 h-4 w-4" />
      </UButton>
    </div>
  </div>
</template>
