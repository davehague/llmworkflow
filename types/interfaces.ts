export type ProjectType = 'greenfield' | 'legacy'
export type CodeReviewType = 'review' | 'issues' | 'tests'

export interface WorkflowState {
  currentStep: number
  projectType: ProjectType | null
  projectIdea: string
  useTDD: boolean
  specification: string
  plan: string
  todoList: string
  prompts: string[]
  isLoading: boolean
  
  // Legacy project specific fields
  codeContext: string
  selectedTaskType: CodeReviewType | null
  generatedTasks: string[]
  repositoryPath: string
}

export interface StepInfo {
  number: number
  name: string
  status: 'completed' | 'current' | 'upcoming'
}

export interface RepositoryTask {
  title: string
  description: string
  type: CodeReviewType
}
