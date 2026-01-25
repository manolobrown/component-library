<script setup lang="ts">
import { provide, ref, computed, onMounted } from 'vue'
import { cn } from '@/utils/cn'
import { useId } from '@/composables/useId'

export type TabsVariant = 'default' | 'pills' | 'underline'

export interface TabItem {
  value: string
  label: string
  disabled?: boolean
}

export interface TabsProps {
  modelValue?: string
  items: TabItem[]
  variant?: TabsVariant
}

const props = withDefaults(defineProps<TabsProps>(), {
  modelValue: '',
  variant: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const tabsId = useId('tabs')
const tabRefs = ref<(HTMLButtonElement | null)[]>([])

const activeTab = computed(() => props.modelValue || props.items[0]?.value || '')

const variantStyles: Record<TabsVariant, { list: string; tab: string; activeTab: string }> = {
  default: {
    list: 'border-b border-neutral-200',
    tab: 'border-b-2 border-transparent px-4 py-2 -mb-px text-neutral-600 hover:text-neutral-900 hover:border-neutral-300',
    activeTab: 'border-primary-500 text-primary-600',
  },
  pills: {
    list: 'gap-2 p-1 bg-neutral-100 rounded-lg',
    tab: 'px-4 py-2 rounded-md text-neutral-600 hover:text-neutral-900',
    activeTab: 'bg-white shadow-sm text-neutral-900',
  },
  underline: {
    list: '',
    tab: 'border-b-2 border-transparent px-4 py-2 text-neutral-600 hover:text-neutral-900',
    activeTab: 'border-primary-500 text-primary-600',
  },
}

function selectTab(value: string) {
  emit('update:modelValue', value)
}

function handleKeyDown(event: KeyboardEvent, index: number) {
  const enabledItems = props.items.filter((item) => !item.disabled)
  const currentEnabledIndex = enabledItems.findIndex((item) => item.value === props.items[index].value)

  let newIndex = -1

  switch (event.key) {
    case 'ArrowRight':
      event.preventDefault()
      newIndex = (currentEnabledIndex + 1) % enabledItems.length
      break
    case 'ArrowLeft':
      event.preventDefault()
      newIndex = (currentEnabledIndex - 1 + enabledItems.length) % enabledItems.length
      break
    case 'Home':
      event.preventDefault()
      newIndex = 0
      break
    case 'End':
      event.preventDefault()
      newIndex = enabledItems.length - 1
      break
  }

  if (newIndex >= 0) {
    const newItem = enabledItems[newIndex]
    const originalIndex = props.items.findIndex((item) => item.value === newItem.value)
    tabRefs.value[originalIndex]?.focus()
    selectTab(newItem.value)
  }
}

provide('tabs', {
  tabsId,
  activeTab,
})

onMounted(() => {
  if (!props.modelValue && props.items.length > 0) {
    emit('update:modelValue', props.items[0].value)
  }
})
</script>

<template>
  <div>
    <div
      role="tablist"
      :class="cn('flex', variantStyles[variant].list)"
    >
      <button
        v-for="(item, index) in items"
        :key="item.value"
        :ref="(el) => (tabRefs[index] = el as HTMLButtonElement)"
        type="button"
        role="tab"
        :id="`${tabsId}-tab-${item.value}`"
        :aria-selected="activeTab === item.value"
        :aria-controls="`${tabsId}-panel-${item.value}`"
        :tabindex="activeTab === item.value ? 0 : -1"
        :disabled="item.disabled"
        :class="cn(
          'text-sm font-medium transition-colors focus-ring',
          variantStyles[variant].tab,
          activeTab === item.value && variantStyles[variant].activeTab,
          item.disabled && 'opacity-50 cursor-not-allowed',
        )"
        @click="!item.disabled && selectTab(item.value)"
        @keydown="handleKeyDown($event, index)"
      >
        {{ item.label }}
      </button>
    </div>
    <div class="mt-4">
      <slot />
    </div>
  </div>
</template>
