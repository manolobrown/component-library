import { ref } from 'vue'

let idCounter = 0

/**
 * Generates a unique ID for accessibility purposes.
 * Useful for associating labels with form elements.
 */
export function useId(prefix = 'cl'): string {
  const id = ref(`${prefix}-${++idCounter}`)
  return id.value
}
