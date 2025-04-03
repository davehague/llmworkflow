<script setup lang="ts">
import { useWorkflowStore } from '@/stores/workflow'
import { useClipboard } from '@/composables/useClipboard'

const workflowStore = useWorkflowStore()
const { copiedStates, copyToClipboard } = useClipboard()

// Function to convert markdown to HTML
const markdownToHtml = (markdown: string) => {
  // This is a very simple markdown parser that handles basic formatting
  // For a production app, you would use a proper markdown parser like marked.js
  return markdown
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, content) => {
      const level = hashes.length;
      return `<h${level} class="font-bold mb-2">${content}</h${level}>`;
    })
    .replace(/^\s*[-*+]\s+(.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.+\n*<\/li>)+/g, '<ul class="list-disc pl-5 mb-4">$&</ul>')
}

// Function to parse the blueprint plan and extract code blocks
const parsedBlueprint = computed(() => {
  if (!workflowStore.plan) return {
    content: [],
    codeBlocks: []
  }

  // Split the content by code blocks
  const regex = /```(?:text|)\n([\s\S]*?)```/g
  const parts = []
  const codeBlocks = []
  
  let lastIndex = 0
  let match
  
  while ((match = regex.exec(workflowStore.plan)) !== null) {
    // Add text before the code block
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: workflowStore.plan.substring(lastIndex, match.index)
      })
    }
    
    // Add the code block
    const codeBlock = match[1]
    const blockIndex = codeBlocks.length
    parts.push({
      type: 'code',
      content: codeBlock,
      index: blockIndex
    })
    codeBlocks.push(codeBlock)
    
    lastIndex = match.index + match[0].length
  }
  
  // Add any remaining text
  if (lastIndex < workflowStore.plan.length) {
    parts.push({
      type: 'text',
      content: workflowStore.plan.substring(lastIndex)
    })
  }
  
  return {
    content: parts,
    codeBlocks
  }
})

const generatePrompts = () => {
  workflowStore.generatePrompts()
}
</script>

<template>
  <h2 class="text-2xl font-bold mb-4 text-center">Prompt Breakdown</h2>
  <p class="text-center text-gray-600 mb-6">
    Here's a breakdown of the prompts from your blueprint plan. You can copy each prompt to use with a
    code-generation LLM to implement your project step by step.
  </p>

  <div v-if="parsedBlueprint.content.length === 0" class="mb-6">
    <p class="text-sm text-gray-600 mt-8">
      Your blueprint doesn't contain any code blocks that can be used as prompts. Make sure to include code blocks using
      markdown syntax (``` ```) in your blueprint plan.
    </p>
  </div>

  <div v-else class="mb-6">
    <div v-for="(part, partIndex) in parsedBlueprint.content" :key="partIndex" class="mb-6">
      <!-- Regular text content -->
      <div v-if="part.type === 'text'" class="prose prose-sm max-w-none mb-4" v-html="markdownToHtml(part.content)"></div>
      
      <!-- Code block -->
      <UCard v-else-if="part.type === 'code'" class="mb-6">
        <h3 class="font-semibold mb-2">Prompt {{ part.index + 1 }}</h3>
        <div class="prose prose-sm max-w-none">
          <pre><code>{{ part.content }}</code></pre>
        </div>
        <UButton size="sm" color="gray" variant="ghost" class="mt-2"
          @click="copyToClipboard(part.content, `prompt-${part.index}`)">
          <UIcon :name="copiedStates.prompts[part.index] ? 'i-heroicons-check' : 'i-heroicons-clipboard'"
            class="mr-1 h-4 w-4" />
          {{ copiedStates.prompts[part.index] ? 'Copied!' : 'Copy to clipboard' }}
        </UButton>
      </UCard>
    </div>
  </div>

  <div v-if="parsedBlueprint.codeBlocks.length === 0" class="mb-6">
    <UButton v-if="workflowStore.prompts.length === 0" color="purple" @click="generatePrompts"
      :loading="workflowStore.isLoading" class="mb-4">
      <UIcon name="i-heroicons-sparkles" class="mr-2 h-4 w-4" />
      Generate Example Prompts
    </UButton>

    <template v-if="workflowStore.prompts.length > 0">
      <div v-for="(prompt, index) in workflowStore.prompts" :key="`prompt-${index}`" class="mb-6">
        <h3 class="font-semibold mb-2">Prompt {{ index + 1 }}</h3>
        <UCard>
          <div class="prose prose-sm max-w-none">
            <pre><code>{{ prompt.replace(/```/g, '') }}</code></pre>
          </div>
          <UButton size="sm" color="gray" variant="ghost" class="mt-2"
            @click="copyToClipboard(prompt.replace(/```/g, ''), `prompt-${index}`)">
            <UIcon :name="copiedStates.prompts[index] ? 'i-heroicons-check' : 'i-heroicons-clipboard'"
              class="mr-1 h-4 w-4" />
            {{ copiedStates.prompts[index] ? 'Copied!' : 'Copy to clipboard' }}
          </UButton>
        </UCard>
      </div>
    </template>
  </div>

  <div class="flex justify-between mt-8">
    <UButton variant="ghost" color="gray" @click="workflowStore.goToStep(5)">
      <UIcon name="i-heroicons-arrow-left" class="mr-1 h-4 w-4" />
      Back
    </UButton>

    <UButton color="purple" @click="workflowStore.reset">
      <UIcon name="i-heroicons-arrow-path" class="mr-1 h-4 w-4" />
      Start Over
    </UButton>
  </div>
</template>
