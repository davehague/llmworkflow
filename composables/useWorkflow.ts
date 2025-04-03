import { useWorkflowStore } from "@/stores/workflow";
import { storeToRefs } from "pinia";

export const useWorkflow = () => {
  const workflowStore = useWorkflowStore();
  const {
    currentStep,
    projectType,
    projectIdea,
    useTDD,
    specification,
    plan,
    prompts,
    isLoading,
  } = storeToRefs(workflowStore);

  return {
    // State
    currentStep,
    projectType,
    projectIdea,
    useTDD,
    specification,
    plan,
    prompts,
    isLoading,

    // Actions
    setProjectType: workflowStore.setProjectType,
    setProjectIdea: workflowStore.setProjectIdea,
    setTDD: workflowStore.setTDD,
    setSpecification: workflowStore.setSpecification,
    setPlan: workflowStore.setPlan,
    setPrompts: workflowStore.setPrompts,
    advanceStep: workflowStore.advanceStep,
    goToStep: workflowStore.goToStep,
    reset: workflowStore.reset,
    generatePrompts: workflowStore.generatePrompts,

    // Getters
    getSteps: computed(() => workflowStore.getSteps),
    canAdvance: computed(() => workflowStore.canAdvance),
  };
};
