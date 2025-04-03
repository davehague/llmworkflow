
<script setup lang="ts">
import { useWorkflowStore } from '@/stores/workflow'
import StepNavigationWrapper from '@/components/workflow/StepNavigationWrapper.vue'

const workflowStore = useWorkflowStore()
</script>

<template>
  <UCard class="mb-6">
    <h3 class="font-semibold mb-2">Step 1: Describe Your Project Idea</h3>
    <p class="text-gray-600 mb-8">
      Write a brief description of your project idea. This will be used to generate detailed questions.
    </p>

    <UTextarea v-model="workflowStore.projectIdea"
      placeholder="For example: I want to build a personal finance tracker that helps users categorize expenses, set budgets, and visualize spending patterns."
      class="mb-6 w-full" :rows="18" />

    <div class="mb-6 flex items-center">
      <USwitch v-model="workflowStore.useTDD" />
      <label class="ml-2">Use Test-Driven Development (TDD) approach</label>
    </div>
  </UCard>

  <UCard class="mb-6">
    <h3 class="font-semibold mb-2">Step 2: [Optional] Save idea to file</h3>
    <p class="text-sm text-gray-600 mb-2">Save the idea to
    <code class="font-bold inline text-green-800">idea.txt</code> in your project</p>
  </UCard>

  <StepNavigationWrapper :next-disabled="!workflowStore.projectIdea.trim()" />
</template>
