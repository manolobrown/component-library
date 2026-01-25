<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

export type CardPadding = 'none' | 'sm' | 'md' | 'lg'
export type CardShadow = 'none' | 'sm' | 'md' | 'lg'
export type CardRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl'

export interface CardProps {
  padding?: CardPadding
  shadow?: CardShadow
  rounded?: CardRounded
  hoverable?: boolean
  bordered?: boolean
}

const props = withDefaults(defineProps<CardProps>(), {
  padding: 'md',
  shadow: 'sm',
  rounded: 'lg',
  hoverable: false,
  bordered: true,
})

const paddingStyles: Record<CardPadding, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
}

const shadowStyles: Record<CardShadow, string> = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
}

const roundedStyles: Record<CardRounded, string> = {
  none: '',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
}

const cardClasses = computed(() =>
  cn(
    'bg-white',
    paddingStyles[props.padding],
    shadowStyles[props.shadow],
    roundedStyles[props.rounded],
    props.bordered && 'border border-neutral-200',
    props.hoverable && 'transition-shadow duration-200 hover:shadow-md cursor-pointer',
  ),
)
</script>

<template>
  <div :class="cardClasses">
    <slot name="header" />
    <slot />
    <slot name="footer" />
  </div>
</template>
