import { ref, watch, onUnmounted, type Ref } from 'vue'

const FOCUSABLE_ELEMENTS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

/**
 * Traps focus within a container element.
 * Used for modals, dialogs, and drawers.
 */
export function useFocusTrap(containerRef: Ref<HTMLElement | null>, isActive: Ref<boolean>) {
  const previousActiveElement = ref<HTMLElement | null>(null)

  function getFocusableElements(): HTMLElement[] {
    if (!containerRef.value) return []
    return Array.from(containerRef.value.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS))
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Tab' || !isActive.value) return

    const focusableElements = getFocusableElements()
    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }
  }

  function activate() {
    previousActiveElement.value = document.activeElement as HTMLElement
    document.addEventListener('keydown', handleKeyDown)

    // Focus the first focusable element
    const focusableElements = getFocusableElements()
    if (focusableElements.length > 0) {
      focusableElements[0].focus()
    }
  }

  function deactivate() {
    document.removeEventListener('keydown', handleKeyDown)

    // Restore focus to the previously focused element
    if (previousActiveElement.value) {
      previousActiveElement.value.focus()
    }
  }

  watch(isActive, (active) => {
    if (active) {
      // Use nextTick to ensure the container is rendered
      setTimeout(activate, 0)
    } else {
      deactivate()
    }
  })

  onUnmounted(() => {
    deactivate()
  })

  return {
    activate,
    deactivate,
  }
}
