// Mock service for LLM API calls
import { type CodeReviewType } from "@/types/interfaces";

const simulateApiDelay = (): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1500);
  });
};

export const llmService = {
  // Greenfield workflow services

  generatePrompts: async (plan: string, useTDD: boolean): Promise<string[]> => {
    await simulateApiDelay();

    const tddPrefix = useTDD ? "Using test-driven development, " : "";

    return [
      `\`\`\`\n${tddPrefix}Prompt 1: Set up the project structure and initialize the repository with the necessary dependencies.\n\`\`\``,
      `\`\`\`\n${tddPrefix}Prompt 2: Implement the core data models and basic CRUD operations.\n\`\`\``,
      `\`\`\`\n${tddPrefix}Prompt 3: Create the user interface components for the main features.\n\`\`\``,
      `\`\`\`\n${tddPrefix}Prompt 4: Implement authentication and authorization functionality.\n\`\`\``,
      `\`\`\`\n${tddPrefix}Prompt 5: Add ${
        useTDD ? "additional" : ""
      } unit and integration tests for the implemented features.\n\`\`\``,
    ];
  },

  // Legacy workflow services
  generateCodeContext: async (repositoryPath: string): Promise<string> => {
    await simulateApiDelay();

    return (
      `# Repository Analysis: ${repositoryPath}\n\n` +
      "## Project Structure\n\n" +
      "```\n" +
      "/src\n" +
      "  /components\n" +
      "    /ui\n" +
      "      Button.vue\n" +
      "      Card.vue\n" +
      "    AppHeader.vue\n" +
      "    AppFooter.vue\n" +
      "  /pages\n" +
      "    Home.vue\n" +
      "    About.vue\n" +
      "  /stores\n" +
      "    user.ts\n" +
      "    products.ts\n" +
      "  /utils\n" +
      "    format.ts\n" +
      "    validation.ts\n" +
      "  main.ts\n" +
      "  App.vue\n" +
      "/tests\n" +
      "  /unit\n" +
      "    Button.spec.ts\n" +
      "  /e2e\n" +
      "    home.spec.ts\n" +
      "/public\n" +
      "  favicon.ico\n" +
      "  index.html\n" +
      "package.json\n" +
      "tsconfig.json\n" +
      "```\n\n" +
      "## Key Dependencies\n\n" +
      "- Vue 3.5.0\n" +
      "- TypeScript 5.0.2\n" +
      "- Pinia 2.1.0\n" +
      "- Vitest 0.34.0\n\n" +
      "## Main Components\n\n" +
      "- AppHeader: Top navigation bar\n" +
      "- Button: Reusable button component\n" +
      "- Card: Content container with styling\n\n" +
      "## State Management\n\n" +
      "- User store: Authentication and user profile\n" +
      "- Products store: Product catalog and cart\n\n" +
      "## Test Coverage\n\n" +
      "- Unit tests: 65% coverage\n" +
      "- E2E tests: Basic flows only"
    );
  },

  generateTasks: async (
    codeContext: string,
    taskType: CodeReviewType
  ): Promise<string[]> => {
    await simulateApiDelay();

    if (taskType === "review") {
      return [
        "## Code Review Issue 1: Component Structure\n\n" +
          "The `AppHeader.vue` component has grown too large and handles too many responsibilities. Consider breaking it down into smaller sub-components for better maintainability.\n\n" +
          "**Suggested Changes:**\n" +
          "- Create a `NavigationMenu.vue` component\n" +
          "- Extract the search functionality into a separate `SearchBar.vue` component\n" +
          "- Implement proper props and emit events for communication",

        "## Code Review Issue 2: TypeScript Typing\n\n" +
          "Several components are missing proper TypeScript interface definitions, particularly in the stores. This could lead to runtime errors and makes the codebase harder to maintain.\n\n" +
          "**Suggested Changes:**\n" +
          "- Define interfaces for all state objects in stores\n" +
          "- Add proper return types to all functions\n" +
          "- Consider using `defineProps<T>()` in Vue components",

        "## Code Review Issue 3: Error Handling\n\n" +
          "The application lacks consistent error handling, particularly in async operations. This could lead to poor user experience when network operations fail.\n\n" +
          "**Suggested Changes:**\n" +
          "- Implement a global error handling strategy\n" +
          "- Add try/catch blocks to async operations\n" +
          "- Display user-friendly error messages",
      ];
    } else if (taskType === "issues") {
      return [
        "## Issue: Missing Mobile Responsiveness\n\n" +
          "**Description:** The application UI isn't fully responsive on mobile devices. Multiple components break on small screens, particularly the navigation menu and product listings.\n\n" +
          "**Steps to Reproduce:**\n" +
          "1. Open the application on a mobile device or using browser developer tools\n" +
          "2. Navigate to the product listing page\n" +
          "3. Observe layout issues\n\n" +
          "**Acceptance Criteria:**\n" +
          "- All pages should be fully usable on mobile devices (320px+)\n" +
          "- Navigation should collapse into a hamburger menu on small screens\n" +
          "- Product listings should adjust their layout based on screen size",

        "## Issue: Performance Optimization Needed\n\n" +
          "**Description:** The product listing page has performance issues when loading large numbers of items. This causes noticeable lag when scrolling or filtering products.\n\n" +
          "**Steps to Reproduce:**\n" +
          "1. Navigate to the products page\n" +
          "2. Load 50+ products\n" +
          "3. Attempt to scroll or apply filters\n\n" +
          "**Acceptance Criteria:**\n" +
          "- Implement virtualized scrolling for large lists\n" +
          "- Add pagination or infinite scroll\n" +
          "- Optimize rendering with memo or other performance techniques",

        "## Issue: Authentication Token Expiration\n\n" +
          "**Description:** The application doesn't handle authentication token expiration properly. Users are not redirected to login when their session expires, leading to confusing API errors.\n\n" +
          "**Steps to Reproduce:**\n" +
          "1. Login to the application\n" +
          "2. Wait for token expiration (or manually expire token)\n" +
          "3. Attempt to access a protected route\n\n" +
          "**Acceptance Criteria:**\n" +
          "- Implement proper token refresh mechanism\n" +
          "- Add interceptors to detect authentication errors\n" +
          "- Redirect to login with a friendly message when session expires",
      ];
    } else if (taskType === "tests") {
      return [
        "## Missing Test: User Authentication Flow\n\n" +
          "**Description:** The authentication flow (login, logout, token refresh) lacks comprehensive test coverage. This is a critical path that needs thorough testing.\n\n" +
          "**Test Requirements:**\n" +
          "- Unit tests for the user store actions and mutations\n" +
          "- Integration tests for login form validation and submission\n" +
          "- E2E tests for the complete authentication flow including token refresh\n" +
          "- Tests for error states and edge cases (invalid credentials, network errors)\n\n" +
          "**Suggested Implementation:**\n" +
          "```typescript\n" +
          'describe("User Authentication", () => {\n' +
          '  it("should login successfully with valid credentials", async () => {\n' +
          "    // Test implementation\n" +
          "  });\n" +
          "  \n" +
          '  it("should display error with invalid credentials", async () => {\n' +
          "    // Test implementation\n" +
          "  });\n" +
          "});\n" +
          "```",

        "## Missing Test: Shopping Cart Functionality\n\n" +
          "**Description:** The shopping cart functionality lacks proper test coverage, particularly around adding/removing items and calculating totals.\n\n" +
          "**Test Requirements:**\n" +
          "- Unit tests for cart store mutations and getters\n" +
          "- Integration tests for the cart component interactions\n" +
          "- Tests for edge cases (adding same item multiple times, quantity limits, etc.)\n" +
          "- Tests for discount and promotion application\n\n" +
          "**Suggested Implementation:**\n" +
          "```typescript\n" +
          'describe("Shopping Cart", () => {\n' +
          '  it("should add item to cart", async () => {\n' +
          "    // Test implementation\n" +
          "  });\n" +
          "  \n" +
          '  it("should calculate correct totals with discounts", async () => {\n' +
          "    // Test implementation\n" +
          "  });\n" +
          "});\n" +
          "```",

        "## Missing Test: Form Validation\n\n" +
          "**Description:** The application forms lack comprehensive validation testing, which is essential for ensuring data integrity and user experience.\n\n" +
          "**Test Requirements:**\n" +
          "- Unit tests for validation utility functions\n" +
          "- Component tests for form validation behavior\n" +
          "- Tests for all validation rules (required fields, format validation, etc.)\n" +
          "- Tests for error message display and form submission handling\n\n" +
          "**Suggested Implementation:**\n" +
          "```typescript\n" +
          'describe("Form Validation", () => {\n' +
          '  it("should validate email format correctly", () => {\n' +
          "    // Test implementation\n" +
          "  });\n" +
          "  \n" +
          '  it("should prevent submission with validation errors", async () => {\n' +
          "    // Test implementation\n" +
          "  });\n" +
          "});\n" +
          "```",
      ];
    }

    return [];
  },
};
