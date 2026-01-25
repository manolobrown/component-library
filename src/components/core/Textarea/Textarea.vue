<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'
import { useId } from '@/composables/useId'

export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both'

export interface TextareaProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  error?: boolean
  errorMessage?: string
  label?: string
  rows?: number
  maxLength?: number
  showCount?: boolean
  resize?: TextareaResize
}

const props = withDefaults(defineProps<TextareaProps>(), {
  modelValue: '',
  placeholder: '',
  disabled: false,
  readonly: false,
  error: false,
  errorMessage: '',
  label: '',
  rows: 3,
  maxLength: undefined,
  showCount: false,
  resize: 'vertical',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const textareaId = useId('textarea')

const baseStyles =
  'w-full rounded-md border bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 transition-colors duration-200 focus-ring'

const resizeStyles: Record<TextareaResize, string> = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
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

const textareaClasses = computed(() =>
  cn(baseStyles, resizeStyles[props.resize], stateStyles.value),
)

const characterCount = computed(() => props.modelValue?.length || 0)

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label
      v-if="label"
      :for="textareaId"
      class="text-sm font-medium text-neutral-700"
    >
      {{ label }}
    </label>
    <textarea
      :id="textareaId"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :rows="rows"
      :maxlength="maxLength"
      :class="textareaClasses"
      :aria-invalid="error"
      :aria-describedby="error && errorMessage ? `${textareaId}-error` : undefined"
      @input="handleInput"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    />
    <div class="flex items-center justify-between">
      <p
        v-if="error && errorMessage"
        :id="`${textareaId}-error`"
        class="text-sm text-error-600"
      >
        {{ errorMessage }}
      </p>
      <span v-else />
      <span
        v-if="showCount"
        class="text-xs text-neutral-500"
      >
        {{ characterCount }}<template v-if="maxLength"> / {{ maxLength }}</template>
      </span>
    </div>
  </div>
</template>
