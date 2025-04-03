
export const useClipboard = () => {
  // States to track which button was recently clicked
  const copiedStates = reactive({
    step1: false,
    step2: false,
    blueprint: false,
    todo: false,
    prompts: {} as Record<number, boolean>
  })

  // Safe clipboard function with error handling and user feedback
  const copyToClipboard = (text: string, buttonId: string) => {
    // Only attempt to use the clipboard API if we're in the browser
    if (process.client) {
      try {
        // Create a temporary textarea element
        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.style.position = 'fixed'  // Prevent scrolling to bottom
        document.body.appendChild(textarea)
        textarea.focus()
        textarea.select()

        // Try to use the modern clipboard API first
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text)
            .then(() => {
              // Set the copied state for this specific button
              if (buttonId === 'step1') {
                copiedStates.step1 = true
                setTimeout(() => { copiedStates.step1 = false }, 2000)
              } else if (buttonId === 'step2') {
                copiedStates.step2 = true
                setTimeout(() => { copiedStates.step2 = false }, 2000)
              } else if (buttonId === 'blueprint') {
                copiedStates.blueprint = true
                setTimeout(() => { copiedStates.blueprint = false }, 2000)
              } else if (buttonId === 'todo') {
                copiedStates.todo = true
                setTimeout(() => { copiedStates.todo = false }, 2000)
              } else if (buttonId.startsWith('prompt-')) {
                const index = parseInt(buttonId.split('-')[1])
                copiedStates.prompts[index] = true
                setTimeout(() => { copiedStates.prompts[index] = false }, 2000)
              }
            })
            .catch(err => {
              console.error('Clipboard API failed: ', err)
              // Fallback to execCommand
              document.execCommand('copy')
            })
        } else {
          // Fallback to document.execCommand for older browsers
          const success = document.execCommand('copy')
          if (success) {
            if (buttonId === 'step1') {
              copiedStates.step1 = true
              setTimeout(() => { copiedStates.step1 = false }, 2000)
            } else if (buttonId === 'step2') {
              copiedStates.step2 = true
              setTimeout(() => { copiedStates.step2 = false }, 2000)
            } else if (buttonId === 'blueprint') {
              copiedStates.blueprint = true
              setTimeout(() => { copiedStates.blueprint = false }, 2000)
            } else if (buttonId === 'todo') {
              copiedStates.todo = true
              setTimeout(() => { copiedStates.todo = false }, 2000)
            } else if (buttonId.startsWith('prompt-')) {
              const index = parseInt(buttonId.split('-')[1])
              copiedStates.prompts[index] = true
              setTimeout(() => { copiedStates.prompts[index] = false }, 2000)
            }
          }
        }

        // Clean up
        document.body.removeChild(textarea)
      } catch (err) {
        console.error('Failed to copy text: ', err)
      }
    }
  }

  return {
    copiedStates,
    copyToClipboard
  }
}
