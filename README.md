# LLM Workflow

A Vue 3 + Nuxt 3 application that implements Harper Reed's LLM codegen workflow: Brainstorm, plan, and execute using LLM code generation, step by step.

## Description

This application guides you through a structured workflow for using LLMs to generate code:

1. **Project Type Selection**: Choose between a greenfield (new) project or working on an existing codebase
2. **Project Idea**: Describe your project idea in detail
3. **Specification Generation**: Use LLM prompts to create a detailed project specification
4. **Implementation Planning**: Break down the implementation into manageable steps
5. **Code Generation Prompts**: Generate prompts for code generation LLMs

## Technologies Used

- Vue 3 with Composition API and `<script setup>` syntax
- Nuxt 3
- TypeScript
- Pinia for state management
- Nuxt UI for components

## Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Workflow Based On

This project is based on Harper Reed's blog post: [My LLM codegen workflow atm](https://harper.blog/2024/03/11/my-llm-codegen-workflow-atm/)
