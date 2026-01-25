import { onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Detects clicks outside of a target element.
 * Useful for closing dropdowns, modals, etc.
 */
export function useClickOutside(
  targetRef: Ref<HTMLElement | null>,
  callback: () => void,
  options: { enabled?: Ref<boolean> } = {},
) {
  const { enabled } = options

  function handleClickOutside(event: MouseEvent) {
    if (enabled && !enabled.value) return
    if (!targetRef.value) return

    const target = event.target as Node
    if (!targetRef.value.contains(target)) {
      callback()
    }
  }

  onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside)
  })
}
