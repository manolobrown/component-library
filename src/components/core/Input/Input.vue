<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'
import { useId } from '@/composables/useId'

export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps {
  modelValue?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  error?: boolean
  errorMessage?: string
  label?: string
  size?: InputSize
}

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  readonly: false,
  error: false,
  errorMessage: '',
  label: '',
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const inputId = useId('input')

const baseStyles =
  'w-full rounded-md border bg-white text-neutral-900 placeholder:text-neutral-400 transition-colors duration-200 focus-ring'

const sizeStyles: Record<InputSize, string> = {
  sm: 'h-8 px-2.5 py-1.5 text-sm',
  md: 'h-10 px-3 py-2 text-sm',
  lg: 'h-12 px-4 py-2.5 text-base',
}

const stateStyles = computed(() => {
  if (props.disabled) {
    return 'border-neutral-200 bg-neutral-50 text-neutral-400 cursor-not-allowed'
  }
  if (props.error) {
    return 'border-error-500 focus:border-error-500 focus:ring-error-500'
  }
  return 'border-neutral-300 hover:border-neutral-400 focus:border-primary-500'
})

const inputClasses = computed(() => cn(baseStyles, sizeStyles[props.size], stateStyles.value))

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label
      v-if="label"
      :for="inputId"
      class="text-sm font-medium text-neutral-700"
    >
      {{ label }}
    </label>
    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :class="inputClasses"
      :aria-invalid="error"
      :aria-describedby="error && errorMessage ? `${inputId}-error` : undefined"
      @input="handleInput"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    />
    <p
      v-if="error && errorMessage"
      :id="`${inputId}-error`"
      class="text-sm text-error-600"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
