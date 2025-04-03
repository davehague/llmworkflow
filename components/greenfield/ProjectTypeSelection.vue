
<script setup lang="ts">
import { useWorkflowStore } from '@/stores/workflow'

const workflowStore = useWorkflowStore()
</script>

<template>
  <h2 class="text-2xl font-bold mb-4 text-center">Choose Your Project Type</h2>
  <p class="text-center text-gray-600 mb-8">Select the type of project you want to work on</p>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <UCard class="cursor-pointer hover:border-purple-500 transition-colors"
      :class="{ 'border-purple-500': workflowStore.projectType === 'greenfield' }"
      @click="workflowStore.setProjectType('greenfield')">
      <div class="flex items-center mb-2">
        <UIcon name="i-heroicons-document-text" class="h-6 w-6 mr-2 text-purple-600" />
        <h3 class="text-lg font-semibold">Greenfield Project</h3>
      </div>
      <p class="text-sm text-gray-600">Start a new project from scratch</p>
      <p class="mt-4 text-sm text-gray-500">
        For new ideas and projects where you're starting from zero. This workflow helps you
        brainstorm, plan, and execute a new project.
      </p>
    </UCard>

    <UCard class="border-gray-300 opacity-75"
      :class="{ 'border-gray-300': workflowStore.projectType === 'legacy' }">
      <div class="flex items-center mb-2">
        <UIcon name="i-heroicons-wrench-screwdriver" class="h-6 w-6 mr-2 text-gray-600" />
        <h3 class="text-lg font-semibold">Legacy/Existing Project</h3>
        <span class="ml-2 text-sm italic text-gray-500">Coming soon</span>
      </div>
      <p class="text-sm text-gray-600">Work on an existing codebase</p>
      <p class="mt-4 text-sm text-gray-500">
        For existing projects where you need to add features, fix bugs, or improve test coverage in
        an established codebase. Uses a different workflow focused on code analysis.
      </p>
    </UCard>
  </div>
</template>
