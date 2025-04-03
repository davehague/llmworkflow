<template>
  <div class="min-h-screen bg-gray-50">
    <UContainer class="py-8">
      <h1 class="text-3xl font-bold text-center text-purple-600 mb-2">
        Project Prompt Pathfinder
      </h1>
      <p class="text-center text-gray-600 mb-8">
        ✨ Break down your project into manageable steps with AI assistance ✨
      </p>
      <p class="text-center text-gray-500 text-sm mb-8">
        Based on Harper Reed's LLM codegen workflow: Brainstorm, plan, and execute using LLM
        code generation, step by step.
      </p>
      
      <NuxtPage />
      
      <footer class="mt-12 text-center text-sm text-gray-500">
        Inspired by <a href="https://harper.blog/2024/03/11/my-llm-codegen-workflow-atm/" 
           target="_blank" class="text-purple-600 hover:underline">Harper Reed's Blog</a>
      </footer>
    </UContainer>
  </div>
</template>
