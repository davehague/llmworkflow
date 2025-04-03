import { defineStore } from "pinia";
import {
  type WorkflowState,
  type ProjectType,
  type StepInfo,
  type CodeReviewType,
} from "@/types/interfaces";
import { llmService } from "@/services/llmService";

export const useWorkflowStore = defineStore("workflow", () => {
  const state = reactive<WorkflowState>({
    currentStep: 1,
    projectType: null,
    projectIdea: "",
    useTDD: false,
    specification: "",
    plan: "",
    todoList: "",
    prompts: [],
    isLoading: false,

    // Legacy project specific fields
    codeContext: "",
    selectedTaskType: null,
    generatedTasks: [],
    repositoryPath: "",
  });

  // Actions
  const setProjectType = (type: ProjectType) => {
    state.projectType = type;
    advanceStep();
  };

  const setProjectIdea = (idea: string) => {
    state.projectIdea = idea;
    advanceStep();
  };

  const setTDD = (useTDD: boolean) => {
    state.useTDD = useTDD;
  };

  const setSpecification = (spec: string) => {
    state.specification = spec;
    advanceStep();
  };

  const setPlan = (plan: string) => {
    state.plan = plan;
    advanceStep();
  };

  const setTodoList = (todoList: string) => {
    state.todoList = todoList;
    advanceStep();
  };

  const setPrompts = (prompts: string[]) => {
    state.prompts = prompts;
    advanceStep();
  };

  // Legacy project specific actions
  const setRepositoryPath = (path: string) => {
    state.repositoryPath = path;
  };

  const setCodeContext = (context: string) => {
    state.codeContext = context;
    advanceStep();
  };

  const setSelectedTaskType = (type: CodeReviewType) => {
    state.selectedTaskType = type;
    advanceStep();
  };

  const setGeneratedTasks = (tasks: string[]) => {
    state.generatedTasks = tasks;
    advanceStep();
  };

  const advanceStep = () => {
    if (state.currentStep < getMaxSteps.value) {
      state.currentStep++;
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= getMaxSteps.value) {
      state.currentStep = step;
    }
  };

  const reset = () => {
    state.currentStep = 1;
    state.projectType = null;
    state.projectIdea = "";
    state.useTDD = false;
    state.specification = "";
    state.plan = "";
    state.todoList = "";
    state.prompts = [];
    state.isLoading = false;
    state.codeContext = "";
    state.selectedTaskType = null;
    state.generatedTasks = [];
    state.repositoryPath = "";
  };

  const generatePrompts = async () => {
    if (!state.plan) return;

    state.isLoading = true;

    try {
      state.prompts = await llmService.generatePrompts(
        state.plan,
        state.useTDD
      );
    } catch (error) {
      console.error("Error generating prompts:", error);
    } finally {
      state.isLoading = false;
    }
  };

  // Legacy workflow actions
  const generateCodeContext = async () => {
    if (!state.repositoryPath) return;

    state.isLoading = true;

    try {
      state.codeContext = await llmService.generateCodeContext(
        state.repositoryPath
      );
    } catch (error) {
      console.error("Error generating code context:", error);
    } finally {
      state.isLoading = false;
    }
  };

  const generateTasks = async () => {
    if (!state.codeContext || !state.selectedTaskType) return;

    state.isLoading = true;

    try {
      state.generatedTasks = await llmService.generateTasks(
        state.codeContext,
        state.selectedTaskType
      );
    } catch (error) {
      console.error("Error generating tasks:", error);
    } finally {
      state.isLoading = false;
    }
  };

  // Getters
  const getSteps = computed(() => {
    let steps: StepInfo[] = [];

    if (state.projectType === "greenfield") {
      steps = [
        { number: 1, name: "Project Type", status: "upcoming" },
        { number: 2, name: "Project Idea", status: "upcoming" },
        { number: 3, name: "Specification", status: "upcoming" },
        { number: 4, name: "Plan", status: "upcoming" },
        { number: 5, name: "TODO", status: "upcoming" },
        { number: 6, name: "Prompts", status: "upcoming" },
      ];
    } else if (state.projectType === "legacy") {
      steps = [
        { number: 1, name: "Project Type", status: "upcoming" },
        { number: 2, name: "Repository Context", status: "upcoming" },
        { number: 3, name: "Task Type", status: "upcoming" },
        { number: 4, name: "Generated Tasks", status: "upcoming" },
      ];
    } else {
      steps = [{ number: 1, name: "Project Type", status: "upcoming" }];
    }

    // Update step status based on current step
    return steps.map((step) => {
      if (step.number < state.currentStep) {
        return { ...step, status: "completed" as const };
      } else if (step.number === state.currentStep) {
        return { ...step, status: "current" as const };
      }
      return step;
    });
  });

  const getCurrentStep = computed(() => state.currentStep);

  const getMaxSteps = computed(() => {
    if (state.projectType === "greenfield") {
      return 6;
    } else if (state.projectType === "legacy") {
      return 4;
    }
    return 1;
  });

  const canAdvance = computed(() => {
    if (state.projectType === "greenfield") {
      switch (state.currentStep) {
        case 1:
          return !!state.projectType;
        case 2:
          return !!state.projectIdea;
        case 3:
          return !!state.specification;
        case 4:
          return !!state.plan;
        case 5:
          return true; // Always allow proceeding from Todo step
        default:
          return false;
      }
    } else if (state.projectType === "legacy") {
      switch (state.currentStep) {
        case 1:
          return !!state.projectType;
        case 2:
          return !!state.codeContext;
        case 3:
          return !!state.selectedTaskType;
        default:
          return false;
      }
    }
    return false;
  });

  const isGreenfieldFlow = computed(() => state.projectType === "greenfield");
  const isLegacyFlow = computed(() => state.projectType === "legacy");

  return {
    // State properties
    ...toRefs(state),

    // Actions
    setProjectType,
    setProjectIdea,
    setTDD,
    setSpecification,
    setPlan,
    setTodoList,
    setPrompts,
    setRepositoryPath,
    setCodeContext,
    setSelectedTaskType,
    setGeneratedTasks,
    advanceStep,
    goToStep,
    reset,

    // Generator actions
    generatePrompts,
    generateCodeContext,
    generateTasks,

    // Getters
    getSteps,
    getCurrentStep,
    getMaxSteps,
    canAdvance,
    isGreenfieldFlow,
    isLegacyFlow,
  };
});
