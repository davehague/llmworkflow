<script setup lang="ts">
import { useWorkflowStore } from '@/stores/workflow'
import { type CodeReviewType } from '@/types/interfaces'

const workflowStore = useWorkflowStore()

const handleSelect = (type: CodeReviewType) => {
  workflowStore.setSelectedTaskType(type)
}
</script>

<template>
  <div>
    <h3 class="font-semibold mb-4">Select Task Type</h3>
    <p class="text-sm text-gray-600 mb-4">
      Choose the type of tasks you want to generate from your codebase. Each type focuses on a different aspect of code improvement.
    </p>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <UCard
        class="cursor-pointer hover:border-purple-500 transition-colors"
        :class="{ 'border-purple-500': workflowStore.selectedTaskType === 'review' }"
        @click="handleSelect('review')"
      >
        <div class="flex items-center mb-2">
          <UIcon name="i-heroicons-document-magnifying-glass" class="h-6 w-6 mr-2 text-purple-600" />
          <h3 class="text-lg font-semibold">Code Review</h3>
        </div>
        <p class="text-sm text-gray-600">Comprehensive code quality analysis</p>
        <p class="mt-4 text-sm text-gray-500">
          Get a detailed code review with suggestions for improving architecture, performance, and maintainability.
        </p>
      </UCard>
      
      <UCard
        class="cursor-pointer hover:border-purple-500 transition-colors"
        :class="{ 'border-purple-500': workflowStore.selectedTaskType === 'issues' }"
        @click="handleSelect('issues')"
      >
        <div class="flex items-center mb-2">
          <UIcon name="i-heroicons-bug-ant" class="h-6 w-6 mr-2 text-purple-600" />
          <h3 class="text-lg font-semibold">GitHub Issues</h3>
        </div>
        <p class="text-sm text-gray-600">Generate actionable issues</p>
        <p class="mt-4 text-sm text-gray-500">
          Create GitHub-ready issues for bugs, improvements, and feature requests based on code analysis.
        </p>
      </UCard>
      
      <UCard
        class="cursor-pointer hover:border-purple-500 transition-colors"
        :class="{ 'border-purple-500': workflowStore.selectedTaskType === 'tests' }"
        @click="handleSelect('tests')"
      >
        <div class="flex items-center mb-2">
          <UIcon name="i-heroicons-check-circle" class="h-6 w-6 mr-2 text-purple-600" />
          <h3 class="text-lg font-semibold">Missing Tests</h3>
        </div>
        <p class="text-sm text-gray-600">Identify testing gaps</p>
        <p class="mt-4 text-sm text-gray-500">
          Find areas of your codebase with missing test coverage and generate test templates.
        </p>
      </UCard>
    </div>
    
    <UAlert
      v-if="workflowStore.selectedTaskType"
      type="info"
      title="Selected Task Type"
      class="mb-4"
    >
      <p v-if="workflowStore.selectedTaskType === 'review'">
        You've selected <strong>Code Review</strong>. This will analyze your codebase for architecture, patterns, and code quality issues.
      </p>
      <p v-else-if="workflowStore.selectedTaskType === 'issues'">
        You've selected <strong>GitHub Issues</strong>. This will generate actionable tasks formatted for GitHub issues.
      </p>
      <p v-else-if="workflowStore.selectedTaskType === 'tests'">
        You've selected <strong>Missing Tests</strong>. This will identify areas lacking test coverage and generate test templates.
      </p>
    </UAlert>
  </div>
</template>
