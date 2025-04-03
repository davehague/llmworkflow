<script setup lang="ts">
import { useWorkflowStore } from '@/stores/workflow'

const workflowStore = useWorkflowStore()
const repositoryPath = ref(workflowStore.repositoryPath)

const updateRepositoryPath = () => {
  workflowStore.setRepositoryPath(repositoryPath.value)
}

const copyToClipboard = (text: string, buttonId: string) => {
  // Only attempt to use the clipboard API if we're in the browser
  if (process.client) {
    try {
      navigator.clipboard.writeText(text).catch(err => {
        console.error('Clipboard API failed: ', err)
      })
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }
}

const repomixCommand = computed(() => {
  if (!repositoryPath.value) return 'mise run LLM:clean_bundles # Make sure your path is configured'
  return `mise run LLM:clean_bundles # This will analyze ${repositoryPath.value}`
})

const isCopied = ref(false)
const handleCopy = (text: string) => {
  copyToClipboard(text, 'repomix')
  isCopied.value = true
  setTimeout(() => {
    isCopied.value = false
  }, 2000)
}
</script>

<template>
  <div>
    <h3 class="font-semibold mb-4">Repository Context Gathering</h3>
    <p class="text-sm text-gray-600 mb-4">
      In a real workflow, you would use repository tools like <code>repomix</code> to gather context from your codebase.
      This context would then be passed to an LLM to analyze your code and generate tasks.
    </p>
    
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">Repository Path</label>
      <UInput 
        v-model="repositoryPath" 
        placeholder="/path/to/your/repository" 
        @blur="updateRepositoryPath"
      />
      <span class="text-xs text-gray-500 mt-1 block">Enter the path to your repository on your local machine</span>
    </div>
    
    <UCard class="mb-6">
      <h4 class="font-semibold mb-2">Use Repomix to Generate Context</h4>
      <p class="text-sm text-gray-600 mb-2">
        In a terminal, run the following command to generate context from your repository:
      </p>
      
      <div class="bg-gray-50 p-3 rounded font-mono text-sm mb-2">
        {{ repomixCommand }}
      </div>
      
      <UButton
        size="sm"
        color="gray"
        variant="ghost"
        class="mt-2"
        @click="handleCopy(repomixCommand)"
      >
        <UIcon 
          :name="isCopied ? 'i-heroicons-check' : 'i-heroicons-clipboard'" 
          class="mr-1 h-4 w-4" 
        />
        {{ isCopied ? 'Copied!' : 'Copy to clipboard' }}
      </UButton>
    </UCard>
    
    <div class="mb-6">
      <h4 class="font-semibold mb-2">Repository Context</h4>
      <p class="text-sm text-gray-600 mb-4">
        In a real workflow, you would get this from running repomix or another repository analysis tool.
        For demonstration purposes, you can generate a sample repository context.
      </p>
      
      <UButton
        v-if="!workflowStore.codeContext"
        color="purple"
        @click="workflowStore.generateCodeContext"
        :loading="workflowStore.isLoading"
        class="mb-4"
      >
        <UIcon name="i-heroicons-sparkles" class="mr-2 h-4 w-4" />
        Generate Example Context
      </UButton>
      
      <UTextarea
        v-model="workflowStore.codeContext"
        class="font-mono w-full"
        :rows="10"
        placeholder="Your generated repository context will appear here."
      />
    </div>
  </div>
</template>
