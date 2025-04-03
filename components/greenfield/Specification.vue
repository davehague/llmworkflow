
<script setup lang="ts">
import { useWorkflowStore } from '@/stores/workflow'
import { useClipboard } from '@/composables/useClipboard'
import StepNavigationWrapper from '@/components/workflow/StepNavigationWrapper.vue'

const workflowStore = useWorkflowStore()
const { copiedStates, copyToClipboard } = useClipboard()

// Prompt text constants for copy functionality
const iterativeQuestioningPrompt = computed(() =>
  `Ask me one question at a time so we can develop a thorough, step-by-step spec for this idea. Each question should build on my previous answers, and our end goal is to have a detailed specification I can hand off to a developer. Let's do this iteratively and dig into every relevant detail. Remember, only one question at a time.\n\nHere's the idea:\n\n${workflowStore.projectIdea}`
)

const finalSpecPrompt =
  "Now that we've wrapped up the brainstorming process, can you compile our findings into a comprehensive, developer-ready specification? Include all relevant requirements, architecture choices, data handling details, error handling strategies, and a testing plan so a developer can immediately begin implementation."
</script>

<template>
  <h2 class="text-2xl font-bold mb-4 text-center">Generate Project Specification</h2>

  <UCard class="mb-6">
    <h3 class="font-semibold mb-2">Step 1: Iterative Questioning</h3>
    <p class="text-sm text-gray-600 mb-2">Prompt to send to LLM (Gemini 2.5 pro):</p>

    <UTextarea readonly class="text-sm font-mono bg-gray-50 w-full" :rows="12"
      :model-value="iterativeQuestioningPrompt" />
    <UButton size="sm" color="gray" variant="ghost" class="mt-2"
      @click="copyToClipboard(iterativeQuestioningPrompt, 'step1')">
      <UIcon :name="copiedStates.step1 ? 'i-heroicons-check' : 'i-heroicons-clipboard'" class="mr-1 h-4 w-4" />
      {{ copiedStates.step1 ? 'Copied!' : 'Copy to clipboard' }}
    </UButton>
  </UCard>

  <UCard class="mb-6">
    <h3 class="font-semibold mb-2">Step 2: Compile Final Specification</h3>
    <p class="text-sm text-gray-600 mb-2">At the end of the brainstorm (it will come to a natural conclusion),
      send this prompt:</p>

    <UTextarea readonly class="text-sm font-mono bg-gray-50 w-full" :rows="6" :model-value="finalSpecPrompt" />
    <UButton size="sm" color="gray" variant="ghost" class="mt-2"
      @click="copyToClipboard(finalSpecPrompt, 'step2')">
      <UIcon :name="copiedStates.step2 ? 'i-heroicons-check' : 'i-heroicons-clipboard'" class="mr-1 h-4 w-4" />
      {{ copiedStates.step2 ? 'Copied!' : 'Copy to clipboard' }}
    </UButton>
  </UCard>

  <UCard class="mb-6">
    <h3 class="font-semibold mb-2">Step 2: Save Spec to project</h3>
    <p class="text-sm text-gray-600 mb-2">Save this result to
    <code class="font-bold inline text-green-800">spec.md</code> in your project and paste it below</p>
  </UCard>

  <div class="mb-6">
    <h3 class="font-semibold mb-2">Project Specification</h3>
    <p class="text-sm text-gray-600 mb-4">
      Paste the spec from the LLM.
    </p>

    <UTextarea v-model="workflowStore.specification" class="font-mono w-full" :rows="8" placeholder="" />
  </div>

  <StepNavigationWrapper :next-disabled="!workflowStore.specification.trim()" />
</template>
