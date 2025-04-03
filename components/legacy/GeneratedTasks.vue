<script setup lang="ts">
import { useWorkflowStore } from '@/stores/workflow'

const workflowStore = useWorkflowStore()

// States to track which button was recently clicked
const copiedStates = reactive(
  workflowStore.generatedTasks.reduce((acc, _, index) => {
    acc[index] = false
    return acc
  }, {} as Record<number, boolean>)
)

// Safe clipboard function with error handling and user feedback
const copyToClipboard = (text: string, index: number) => {
  // Only attempt to use the clipboard API if we're in the browser
  if (process.client) {
    try {
      navigator.clipboard.writeText(text)
        .then(() => {
          copiedStates[index] = true
          setTimeout(() => { copiedStates[index] = false }, 2000)
        })
        .catch(err => {
          console.error('Clipboard API failed: ', err)
        })
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }
}

const getTaskTypeLabel = computed(() => {
  switch (workflowStore.selectedTaskType) {
    case 'review': return 'Code Review Items'
    case 'issues': return 'GitHub Issues'
    case 'tests': return 'Missing Tests'
    default: return 'Generated Tasks'
  }
})

const getTaskIcon = computed(() => {
  switch (workflowStore.selectedTaskType) {
    case 'review': return 'i-heroicons-document-magnifying-glass'
    case 'issues': return 'i-heroicons-bug-ant'
    case 'tests': return 'i-heroicons-check-circle'
    default: return 'i-heroicons-clipboard-document-list'
  }
})
</script>

<template>
  <div>
    <h3 class="font-semibold mb-4">{{ getTaskTypeLabel }}</h3>
    <p class="text-sm text-gray-600 mb-4">
      In a real workflow, you would use an LLM to analyze your codebase and generate these tasks based on your selected task type.
      You can copy these tasks and use them in your development process.
    </p>
    
    <UButton
      v-if="workflowStore.generatedTasks.length === 0"
      color="purple"
      @click="workflowStore.generateTasks"
      :loading="workflowStore.isLoading"
      class="mb-4"
    >
      <UIcon name="i-heroicons-sparkles" class="mr-2 h-4 w-4" />
      Generate Example Tasks
    </UButton>
    
    <template v-if="workflowStore.generatedTasks.length > 0">
      <UCard
        v-for="(task, index) in workflowStore.generatedTasks"
        :key="`task-${index}`"
        class="mb-6"
      >
        <div class="flex items-start">
          <UIcon :name="getTaskIcon" class="h-5 w-5 mr-3 mt-1 text-purple-600 flex-shrink-0" />
          <div class="flex-grow">
            <div class="prose prose-sm max-w-none">
              <div v-html="task.replace(/\n/g, '<br>')"></div>
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-4">
          <UButton
            size="sm"
            color="gray"
            variant="ghost"
            @click="copyToClipboard(task, index)"
          >
            <UIcon 
              :name="copiedStates[index] ? 'i-heroicons-check' : 'i-heroicons-clipboard'" 
              class="mr-1 h-4 w-4" 
            />
            {{ copiedStates[index] ? 'Copied!' : 'Copy to clipboard' }}
          </UButton>
        </div>
      </UCard>
    </template>
    
    <UAlert
      v-if="workflowStore.generatedTasks.length > 0"
      type="success"
      title="Next Steps"
      class="mt-6"
    >
      <p class="text-sm">
        <strong>In a real workflow:</strong> You would use these generated tasks to guide your development. Each task can be:
      </p>
      <ul class="list-disc list-inside mt-2 text-sm">
        <li>Copied directly to GitHub issues</li>
        <li>Used as prompts for an LLM to generate implementation code</li>
        <li>Shared with your team for collaborative work</li>
      </ul>
    </UAlert>
  </div>
</template>
