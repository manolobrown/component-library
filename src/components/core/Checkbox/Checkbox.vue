<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'
import { useId } from '@/composables/useId'

export interface CheckboxProps {
  modelValue?: boolean
  indeterminate?: boolean
  disabled?: boolean
  label?: string
  description?: string
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false,
  indeterminate: false,
  disabled: false,
  label: '',
  description: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

const checkboxId = useId('checkbox')

const checkboxClasses = computed(() =>
  cn(
    'h-4 w-4 shrink-0 rounded border appearance-none cursor-pointer transition-colors duration-200',
    'checked:bg-primary-600 checked:border-primary-600',
    'indeterminate:bg-primary-600 indeterminate:border-primary-600',
    'focus-ring',
    props.disabled
      ? 'border-neutral-200 bg-neutral-50 cursor-not-allowed'
      : 'border-neutral-300 hover:border-neutral-400',
  ),
)

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
  emit('change', target.checked)
}
</script>

<template>
  <div class="flex items-start gap-3">
    <div class="relative flex h-5 items-center">
      <input
        :id="checkboxId"
        type="checkbox"
        :checked="modelValue"
        :indeterminate="indeterminate"
        :disabled="disabled"
        :class="checkboxClasses"
        :aria-checked="indeterminate ? 'mixed' : modelValue"
        :aria-describedby="description ? `${checkboxId}-description` : undefined"
        @change="handleChange"
      />
      <!-- Checkmark icon -->
      <svg
        v-if="modelValue && !indeterminate"
        class="pointer-events-none absolute left-0 h-4 w-4 text-white"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
          clip-rule="evenodd"
        />
      </svg>
      <!-- Indeterminate icon -->
      <svg
        v-if="indeterminate"
        class="pointer-events-none absolute left-0 h-4 w-4 text-white"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M4 8a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 4 8Z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <div v-if="label || description" class="flex flex-col">
      <label
        v-if="label"
        :for="checkboxId"
        :class="cn(
          'text-sm font-medium cursor-pointer',
          disabled ? 'text-neutral-400' : 'text-neutral-700',
        )"
      >
        {{ label }}
      </label>
      <p
        v-if="description"
        :id="`${checkboxId}-description`"
        :class="cn('text-sm', disabled ? 'text-neutral-300' : 'text-neutral-500')"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>
