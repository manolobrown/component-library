<script setup lang="ts">
import { inject, computed, type ComputedRef } from 'vue'

export interface TabPanelProps {
  value: string
}

const props = defineProps<TabPanelProps>()

const tabs = inject<{
  tabsId: string
  activeTab: ComputedRef<string>
}>('tabs')

const isActive = computed(() => tabs?.activeTab.value === props.value)
</script>

<template>
  <div
    v-show="isActive"
    role="tabpanel"
    :id="`${tabs?.tabsId}-panel-${value}`"
    :aria-labelledby="`${tabs?.tabsId}-tab-${value}`"
    :tabindex="isActive ? 0 : -1"
  >
    <slot />
  </div>
</template>
