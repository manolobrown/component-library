<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const isDisabled = computed(() => props.disabled || props.loading)

const baseStyles =
  'inline-flex items-center justify-center font-medium transition-colors duration-200 focus-ring rounded-md cursor-pointer'

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
  secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:bg-neutral-300',
  outline:
    'bg-transparent border border-neutral-300 text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100',
  ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200',
  destructive: 'bg-error-600 text-white hover:bg-error-700 active:bg-error-800',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 py-1.5 text-sm gap-1.5',
  md: 'h-10 px-4 py-2 text-sm gap-2',
  lg: 'h-12 px-6 py-2.5 text-base gap-2.5',
}

const disabledStyles = 'opacity-50 cursor-not-allowed pointer-events-none'

const buttonClasses = computed(() =>
  cn(
    baseStyles,
    variantStyles[props.variant],
    sizeStyles[props.size],
    isDisabled.value && disabledStyles,
  ),
)

function handleClick(event: MouseEvent) {
  if (!isDisabled.value) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="isDisabled"
    :aria-disabled="isDisabled"
    :aria-busy="loading"
    @click="handleClick"
  >
    <svg
      v-if="loading"
      class="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <slot />
  </button>
</template>
