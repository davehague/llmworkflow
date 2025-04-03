
<script setup lang="ts">
import { useWorkflowStore } from '@/stores/workflow'
import StepProgress from '@/components/workflow/StepProgress.vue'
import StepNavigationWrapper from '@/components/workflow/StepNavigationWrapper.vue'
import RepositoryContext from '@/components/legacy/RepositoryContext.vue'
import TaskTypeSelection from '@/components/legacy/TaskTypeSelection.vue'
import GeneratedTasks from '@/components/legacy/GeneratedTasks.vue'

// Greenfield workflow components
import ProjectTypeSelection from '@/components/greenfield/ProjectTypeSelection.vue'
import ProjectIdea from '@/components/greenfield/ProjectIdea.vue'
import Specification from '@/components/greenfield/Specification.vue'
import Blueprint from '@/components/greenfield/Blueprint.vue'
import TodoGenerator from '@/components/greenfield/TodoGenerator.vue'
import PromptBreakdown from '@/components/greenfield/PromptBreakdown.vue'

const workflowStore = useWorkflowStore()
const currentStep = computed(() => workflowStore.getCurrentStep)
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <StepProgress />

    <UCard class="mb-8">
      <!-- Project Type Selection (Step 1) - Both workflows -->
      <template v-if="currentStep === 1">
        <ProjectTypeSelection />
      </template>

      <!-- GREENFIELD WORKFLOW -->
      <template v-else-if="workflowStore.isGreenfieldFlow">
        <!-- Project Idea (Step 2) -->
        <template v-if="currentStep === 2">
          <ProjectIdea />
        </template>

        <!-- Specification (Step 3) -->
        <template v-else-if="currentStep === 3">
          <Specification />
        </template>

        <!-- Plan (Step 4) -->
        <template v-else-if="currentStep === 4">
          <Blueprint />
        </template>

        <!-- Todo (Step 5) -->
        <template v-else-if="currentStep === 5">
          <TodoGenerator />
        </template>

        <!-- Prompts (Step 6) -->
        <template v-else-if="currentStep === 6">
          <PromptBreakdown />
        </template>
      </template>

      <!-- LEGACY/EXISTING PROJECT WORKFLOW -->
      <template v-else-if="workflowStore.isLegacyFlow">
        <!-- Repository Context (Step 2) -->
        <template v-if="currentStep === 2">
          <h2 class="text-2xl font-bold mb-4 text-center">Repository Context</h2>
          <p class="text-center text-gray-600 mb-6">
            For legacy projects, we need to gather context from your existing codebase first.
            This context will be used to analyze your code and generate tasks.
          </p>

          <RepositoryContext />
          
          <StepNavigationWrapper :next-disabled="!workflowStore.codeContext.trim()" />
        </template>

        <!-- Task Type Selection (Step 3) -->
        <template v-else-if="currentStep === 3">
          <h2 class="text-2xl font-bold mb-4 text-center">Select Task Type</h2>
          <p class="text-center text-gray-600 mb-6">
            Choose the type of analysis you want to perform on your codebase.
          </p>

          <TaskTypeSelection />
          
          <StepNavigationWrapper :next-disabled="!workflowStore.selectedTaskType" />
        </template>

        <!-- Generated Tasks (Step 4) -->
        <template v-else-if="currentStep === 4">
          <h2 class="text-2xl font-bold mb-4 text-center">Generated Tasks</h2>
          <p class="text-center text-gray-600 mb-6">
            Here are the tasks generated from analyzing your codebase.
          </p>

          <GeneratedTasks />

          <div class="flex justify-between mt-8">
            <UButton variant="ghost" color="gray" @click="workflowStore.goToStep(3)">
              <UIcon name="i-heroicons-arrow-left" class="mr-1 h-4 w-4" />
              Back
            </UButton>

            <UButton color="purple" @click="workflowStore.reset">
              <UIcon name="i-heroicons-arrow-path" class="mr-1 h-4 w-4" />
              Start Over
            </UButton>
          </div>
        </template>
      </template>
    </UCard>
  </div>
</template>
