export default defineAppConfig({
  ui: {
    // Configure theme colors
    colors: {
      primary: 'purple'
    },
    
    // Configure component styles
    textarea: {
      base: 'w-full',
      wrapper: 'relative w-full',
      container: {
        base: 'relative w-full'
      }
    },
    
    button: {
      default: {
        color: 'purple',
        variant: 'solid'
      },
      color: {
        purple: {
          solid: 'bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-600 dark:hover:bg-purple-700 dark:text-white'
        }
      }
    },
    
    // Configure default icons for UI components
    icons: {
      // Default icons used by Nuxt UI components
      check: 'i-heroicons-check',
      chevronDown: 'i-heroicons-chevron-down',
      chevronRight: 'i-heroicons-chevron-right',
      chevronLeft: 'i-heroicons-chevron-left',
      chevronUp: 'i-heroicons-chevron-up',
      spinner: 'i-heroicons-arrow-path',
      sparkles: 'i-heroicons-sparkles',
      close: 'i-heroicons-x-mark'
    }
  }
})
