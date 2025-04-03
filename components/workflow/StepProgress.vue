<script setup lang="ts">
import { type StepInfo } from '@/types/interfaces'
import { useWorkflowStore } from '@/stores/workflow'

const workflowStore = useWorkflowStore()
const steps = computed(() => workflowStore.getSteps)
const maxSteps = computed(() => steps.value.length)

const getStepClass = (status: StepInfo['status']) => {
  switch (status) {
    case 'completed':
      return 'bg-purple-600 text-white'
    case 'current':
      return 'bg-purple-600 text-white' // Changed to purple background with white text
    default:
      return 'bg-white text-gray-400 border border-gray-300'
  }
}
</script>

<template>
  <div class="flex items-center justify-between mb-12 relative">
    <!-- Steps -->
    <div class="flex justify-between items-center w-full">
      <div
        v-for="step in steps"
        :key="`step-${step.number}`"
        class="flex flex-col items-center z-10"
        :style="{
          width: `${100 / maxSteps}%`
        }"
      >
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200"
          :class="getStepClass(step.status)"
        >
          <UIcon
            v-if="step.status === 'completed'"
            name="i-heroicons-check"
            class="h-5 w-5"
          />
          <span v-else>{{ step.number }}</span>
        </div>
        
        <div class="mt-2 text-sm font-medium text-center" :class="{ 
          'text-purple-600': step.status === 'current',
          'text-gray-900': step.status === 'completed',
          'text-gray-400': step.status === 'upcoming'
        }">
          {{ step.name }}
        </div>
      </div>
    </div>
    
    <!-- Connector lines -->
    <div class="absolute top-5 left-0 right-0 flex justify-between w-full z-0 px-5">
      <div
        v-for="index in maxSteps - 1"
        :key="`connector-${index}`"
        class="h-0.5"
        :class="{ 
          'bg-purple-600': index < workflowStore.currentStep,
          'bg-gray-200': index >= workflowStore.currentStep
        }"
        :style="{
          width: `${100 / maxSteps}%`,
          position: 'absolute',
          left: `${(index - 0.5) * (100 / maxSteps)}%`,
        }"
      ></div>
    </div>
  </div>
</template>
