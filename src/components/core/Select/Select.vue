<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { cn } from '@/utils/cn'
import { useId } from '@/composables/useId'
import { useClickOutside } from '@/composables/useClickOutside'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export type SelectSize = 'sm' | 'md' | 'lg'

export interface SelectProps {
  modelValue?: string
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  error?: boolean
  errorMessage?: string
  label?: string
  size?: SelectSize
  searchable?: boolean
}

const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: '',
  placeholder: 'Select an option',
  disabled: false,
  error: false,
  errorMessage: '',
  label: '',
  size: 'md',
  searchable: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

const selectId = useId('select')
const containerRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const searchQuery = ref('')
const highlightedIndex = ref(-1)

const selectedOption = computed(() =>
  props.options.find((opt) => opt.value === props.modelValue),
)

const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value) {
    return props.options
  }
  const query = searchQuery.value.toLowerCase()
  return props.options.filter((opt) => opt.label.toLowerCase().includes(query))
})

const sizeStyles: Record<SelectSize, string> = {
  sm: 'h-8 px-2.5 py-1.5 text-sm',
  md: 'h-10 px-3 py-2 text-sm',
  lg: 'h-12 px-4 py-2.5 text-base',
}

const buttonClasses = computed(() =>
  cn(
    'w-full flex items-center justify-between rounded-md border bg-white text-left transition-colors duration-200 focus-ring',
    sizeStyles[props.size],
    props.disabled
      ? 'border-neutral-200 bg-neutral-50 text-neutral-400 cursor-not-allowed'
      : props.error
        ? 'border-error-500'
        : 'border-neutral-300 hover:border-neutral-400',
  ),
)

function toggleOpen() {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    searchQuery.value = ''
    highlightedIndex.value = props.options.findIndex((opt) => opt.value === props.modelValue)
  }
}

function closeDropdown() {
  isOpen.value = false
  searchQuery.value = ''
}

function selectOption(option: SelectOption) {
  if (option.disabled) return
  emit('update:modelValue', option.value)
  emit('change', option.value)
  closeDropdown()
}

function handleKeyDown(event: KeyboardEvent) {
  if (!isOpen.value) {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
      event.preventDefault()
      toggleOpen()
    }
    return
  }

  const enabledOptions = filteredOptions.value.filter((opt) => !opt.disabled)

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      highlightedIndex.value = Math.min(
        highlightedIndex.value + 1,
        filteredOptions.value.length - 1,
      )
      break
    case 'ArrowUp':
      event.preventDefault()
      highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0)
      break
    case 'Enter':
      event.preventDefault()
      if (highlightedIndex.value >= 0 && highlightedIndex.value < filteredOptions.value.length) {
        selectOption(filteredOptions.value[highlightedIndex.value])
      }
      break
    case 'Escape':
      event.preventDefault()
      closeDropdown()
      break
  }
}

useClickOutside(containerRef, closeDropdown, { enabled: isOpen })

watch(searchQuery, () => {
  highlightedIndex.value = 0
})
</script>

<template>
  <div ref="containerRef" class="relative flex flex-col gap-1.5">
    <label
      v-if="label"
      :for="selectId"
      class="text-sm font-medium text-neutral-700"
    >
      {{ label }}
    </label>
    <button
      :id="selectId"
      type="button"
      role="combobox"
      :aria-expanded="isOpen"
      :aria-haspopup="true"
      :aria-disabled="disabled"
      :aria-invalid="error"
      :aria-describedby="error && errorMessage ? `${selectId}-error` : undefined"
      :class="buttonClasses"
      @click="toggleOpen"
      @keydown="handleKeyDown"
    >
      <span :class="selectedOption ? 'text-neutral-900' : 'text-neutral-400'">
        {{ selectedOption?.label || placeholder }}
      </span>
      <svg
        class="h-4 w-4 text-neutral-400 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        role="listbox"
        class="absolute top-full z-50 mt-1 w-full rounded-md border border-neutral-200 bg-white py-1 shadow-lg"
      >
        <div v-if="searchable" class="px-2 pb-2">
          <input
            v-model="searchQuery"
            type="text"
            class="w-full rounded border border-neutral-300 px-2 py-1.5 text-sm focus-ring"
            placeholder="Search..."
            @keydown="handleKeyDown"
          />
        </div>
        <div class="max-h-60 overflow-auto">
          <div
            v-for="(option, index) in filteredOptions"
            :key="option.value"
            role="option"
            :aria-selected="modelValue === option.value"
            :aria-disabled="option.disabled"
            :class="cn(
              'cursor-pointer px-3 py-2 text-sm transition-colors',
              modelValue === option.value && 'bg-primary-50 text-primary-900',
              highlightedIndex === index && modelValue !== option.value && 'bg-neutral-100',
              option.disabled && 'cursor-not-allowed text-neutral-400',
              !option.disabled && modelValue !== option.value && 'text-neutral-700 hover:bg-neutral-100',
            )"
            @click="selectOption(option)"
            @mouseenter="highlightedIndex = index"
          >
            <div class="flex items-center justify-between">
              {{ option.label }}
              <svg
                v-if="modelValue === option.value"
                class="h-4 w-4 text-primary-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div
            v-if="filteredOptions.length === 0"
            class="px-3 py-2 text-sm text-neutral-500"
          >
            No options found
          </div>
        </div>
      </div>
    </Transition>

    <p
      v-if="error && errorMessage"
      :id="`${selectId}-error`"
      class="text-sm text-error-600"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
