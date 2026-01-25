<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'
import { useId } from '@/composables/useId'

export interface RadioOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export interface RadioProps {
  modelValue?: string
  name?: string
  options: RadioOption[]
  disabled?: boolean
  orientation?: 'vertical' | 'horizontal'
}

const props = withDefaults(defineProps<RadioProps>(), {
  modelValue: '',
  name: '',
  disabled: false,
  orientation: 'vertical',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

const groupId = useId('radio')
const groupName = computed(() => props.name || groupId)

const radioClasses = cn(
  'h-4 w-4 shrink-0 rounded-full border appearance-none cursor-pointer transition-colors duration-200',
  'checked:border-primary-600 checked:bg-primary-600',
  'focus-ring',
)

function handleChange(value: string) {
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <div
    role="radiogroup"
    :class="cn(
      'flex gap-3',
      orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
    )"
  >
    <div
      v-for="option in options"
      :key="option.value"
      class="flex items-start gap-3"
    >
      <div class="relative flex h-5 items-center">
        <input
          :id="`${groupId}-${option.value}`"
          type="radio"
          :name="groupName"
          :value="option.value"
          :checked="modelValue === option.value"
          :disabled="disabled || option.disabled"
          :class="cn(
            radioClasses,
            (disabled || option.disabled)
              ? 'border-neutral-200 bg-neutral-50 cursor-not-allowed'
              : 'border-neutral-300 hover:border-neutral-400',
          )"
          @change="handleChange(option.value)"
        />
        <!-- Radio dot -->
        <div
          v-if="modelValue === option.value"
          class="pointer-events-none absolute left-1 h-2 w-2 rounded-full bg-white"
        />
      </div>
      <div class="flex flex-col">
        <label
          :for="`${groupId}-${option.value}`"
          :class="cn(
            'text-sm font-medium cursor-pointer',
            (disabled || option.disabled) ? 'text-neutral-400' : 'text-neutral-700',
          )"
        >
          {{ option.label }}
        </label>
        <p
          v-if="option.description"
          :class="cn(
            'text-sm',
            (disabled || option.disabled) ? 'text-neutral-300' : 'text-neutral-500',
          )"
        >
          {{ option.description }}
        </p>
      </div>
    </div>
  </div>
</template>
