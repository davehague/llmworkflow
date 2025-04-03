<script setup lang="ts">
import { useWorkflowStore } from '@/stores/workflow'
import { useClipboard } from '@/composables/useClipboard'
import StepNavigationWrapper from '@/components/workflow/StepNavigationWrapper.vue'

const workflowStore = useWorkflowStore()
const { copiedStates, copyToClipboard } = useClipboard()

const todoPrompt = computed(() =>
  `Based on the blueprint and plan I've shared, can you make a \`todo.md\` that I can use as a checklist? Be thorough.`
)
</script>

<template>
  <h2 class="text-2xl font-bold mb-4 text-center">Generate Todo Checklist</h2>
  <p class="text-center text-gray-600 mb-4">
    Create a task checklist to track your progress during implementation.
  </p>

  <UCard class="mb-6">
    <h3 class="font-semibold mb-2">Step 1: Todo Prompt</h3>
    <p class="text-sm text-gray-600 mb-2">Send this to generate a detailed TODO list:</p>

    <UTextarea readonly class="text-sm font-mono bg-gray-50 w-full" :rows="8" :model-value="todoPrompt" />
    <UButton size="sm" color="gray" variant="ghost" class="mt-2" @click="copyToClipboard(todoPrompt, 'todo')">
      <UIcon :name="copiedStates.todo ? 'i-heroicons-check' : 'i-heroicons-clipboard'" class="mr-1 h-4 w-4" />
      {{ copiedStates.todo ? 'Copied!' : 'Copy to clipboard' }}
    </UButton>
  </UCard>

  <UCard class="mb-6">
    <h3 class="font-semibold mb-2">Step 2: Save TODO to project</h3>
    <p class="text-sm text-gray-600 mb-2">Save this result to
    <code class="font-bold inline text-green-800">todo.md</code> in your project</p>
  </UCard>

  <StepNavigationWrapper />
</template>
