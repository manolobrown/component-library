<script setup lang="ts">
import { inject, computed } from 'vue'
import { cn } from '@/utils/cn'

export interface AccordionItemProps {
  value: string
  title: string
  disabled?: boolean
}

const props = withDefaults(defineProps<AccordionItemProps>(), {
  disabled: false,
})

const accordion = inject<{
  accordionId: string
  isOpen: (id: string) => boolean
  toggleItem: (id: string) => void
}>('accordion')

const isOpen = computed(() => accordion?.isOpen(props.value) ?? false)
const itemId = computed(() => `${accordion?.accordionId}-${props.value}`)

function handleToggle() {
  if (!props.disabled) {
    accordion?.toggleItem(props.value)
  }
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handleToggle()
  }
}
</script>

<template>
  <div>
    <button
      type="button"
      :id="`${itemId}-trigger`"
      :aria-expanded="isOpen"
      :aria-controls="`${itemId}-content`"
      :disabled="disabled"
      :class="cn(
        'flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium transition-colors',
        disabled
          ? 'cursor-not-allowed text-neutral-400'
          : 'text-neutral-900 hover:bg-neutral-50',
      )"
      @click="handleToggle"
      @keydown="handleKeyDown"
    >
      <span>{{ title }}</span>
      <svg
        class="h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <Transition
      enter-active-class="transition-all duration-200 ease-out overflow-hidden"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-screen opacity-100"
      leave-active-class="transition-all duration-200 ease-in overflow-hidden"
      leave-from-class="max-h-screen opacity-100"
      leave-to-class="max-h-0 opacity-0"
    >
      <div
        v-show="isOpen"
        :id="`${itemId}-content`"
        role="region"
        :aria-labelledby="`${itemId}-trigger`"
        class="px-4 pb-4 text-sm text-neutral-600"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>
