
<script setup lang="ts">
import { useWorkflowStore } from '@/stores/workflow'
import { useClipboard } from '@/composables/useClipboard'
import StepNavigationWrapper from '@/components/workflow/StepNavigationWrapper.vue'

const workflowStore = useWorkflowStore()
const { copiedStates, copyToClipboard } = useClipboard()

const blueprintPrompt = computed(() => 
  `Draft a detailed, step-by-step blueprint for building this project. Then, once you have a solid plan, break it down into small, iterative chunks that build on each other. Look at these chunks and then go another round to break it into small steps. Review the results and make sure that the steps are small enough to be implemented safely ${workflowStore.useTDD ? 'with strong testing, ' : ''}but big enough to move the project forward. Iterate until you feel that the steps are right sized for this project.\n\nFrom here you should have the foundation to provide a series of prompts for a code-generation LLM that will implement each step ${workflowStore.useTDD ? 'in a test-driven manner. ' : '. '}Prioritize best practices${workflowStore.useTDD ? ', incremental progress, and early testing' : ' and incremental progress'}, ensuring no big jumps in complexity at any stage. Make sure that each prompt builds on the previous prompts, and ends with wiring things together. There should be no hanging or orphaned code that isn't integrated into a previous step.\n\nMake sure and separate each prompt section. Use markdown. Each prompt should be tagged as text using code tags. The goal is to output prompts, but context, etc is important as well.\n\n${workflowStore.specification}`
)
</script>

<template>
  <h2 class="text-2xl font-bold mb-4 text-center">Create Blueprint Plan</h2>
  <p class="text-center text-gray-600 mb-4">
    Taking your specification, let's create a detailed implementation plan with step-by-step tasks.
  </p>

  <UCard class="mb-6">
    <h3 class="font-semibold mb-2">Step 1: Blueprint Prompt</h3>
    <p class="text-sm text-gray-600 mb-2">Send this to a reasoning model:</p>

    <UTextarea readonly class="text-sm font-mono bg-gray-50 w-full" :rows="18" :model-value="blueprintPrompt" />
    <UButton size="sm" color="gray" variant="ghost" class="mt-2" @click="copyToClipboard(blueprintPrompt, 'blueprint')">
      <UIcon :name="copiedStates.blueprint ? 'i-heroicons-check' : 'i-heroicons-clipboard'" class="mr-1 h-4 w-4" />
      {{ copiedStates.blueprint ? 'Copied!' : 'Copy to clipboard' }}
    </UButton>
  </UCard>

  <UCard class="mb-6">
    <h3 class="font-semibold mb-2">Step 2: Save blueprint to project</h3>
    <p class="text-sm text-gray-600 mb-2">Save this result to
    <code class="font-bold inline text-green-800">blueprint.md</code> in your project and paste
    it below</p>
  </UCard>

  <div class="mb-6">
    <h3 class="font-semibold mb-2">Blueprint</h3>
    <p class="text-sm text-gray-600 mb-4">
      Paste the blueprint plan from the LLM in the box below.
    </p>
    <UTextarea v-model="workflowStore.plan" class="font-mono w-full" :rows="8"
      placeholder="Your generated implementation plan will appear here." />
  </div>

  <StepNavigationWrapper :next-disabled="!workflowStore.plan.trim()" />
</template>
