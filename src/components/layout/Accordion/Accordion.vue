<script setup lang="ts">
import { provide, computed, readonly } from 'vue'
import { cn } from '@/utils/cn'
import { useId } from '@/composables/useId'

export type AccordionType = 'single' | 'multiple'

export interface AccordionProps {
  modelValue?: string | string[]
  type?: AccordionType
  collapsible?: boolean
}

const props = withDefaults(defineProps<AccordionProps>(), {
  modelValue: () => [],
  type: 'single',
  collapsible: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
}>()

const accordionId = useId('accordion')

const openItems = computed(() => {
  if (props.type === 'single') {
    return typeof props.modelValue === 'string' ? [props.modelValue] : []
  }
  return Array.isArray(props.modelValue) ? props.modelValue : []
})

function isOpen(itemId: string): boolean {
  return openItems.value.includes(itemId)
}

function toggleItem(itemId: string): void {
  if (props.type === 'single') {
    if (isOpen(itemId)) {
      if (props.collapsible) {
        emit('update:modelValue', '')
      }
    } else {
      emit('update:modelValue', itemId)
    }
  } else {
    const current = Array.isArray(props.modelValue) ? props.modelValue : []
    if (isOpen(itemId)) {
      emit('update:modelValue', current.filter((id) => id !== itemId))
    } else {
      emit('update:modelValue', [...current, itemId])
    }
  }
}

provide('accordion', {
  accordionId,
  isOpen,
  toggleItem,
})
</script>

<template>
  <div class="divide-y divide-neutral-200 rounded-lg border border-neutral-200">
    <slot />
  </div>
</template>
