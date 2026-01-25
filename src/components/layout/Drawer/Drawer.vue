<script setup lang="ts">
import { ref, watch, onUnmounted, computed } from 'vue'
import { cn } from '@/utils/cn'
import { useId } from '@/composables/useId'
import { useFocusTrap } from '@/composables/useFocusTrap'

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom'
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface DrawerProps {
  modelValue?: boolean
  title?: string
  description?: string
  side?: DrawerSide
  size?: DrawerSize
  closable?: boolean
  closeOnOverlay?: boolean
  closeOnEscape?: boolean
}

const props = withDefaults(defineProps<DrawerProps>(), {
  modelValue: false,
  title: '',
  description: '',
  side: 'right',
  size: 'md',
  closable: true,
  closeOnOverlay: true,
  closeOnEscape: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const drawerId = useId('drawer')
const drawerRef = ref<HTMLElement | null>(null)
const isOpen = ref(props.modelValue)

const sizeStyles: Record<DrawerSide, Record<DrawerSize, string>> = {
  left: {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96',
    xl: 'w-[32rem]',
    full: 'w-full',
  },
  right: {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96',
    xl: 'w-[32rem]',
    full: 'w-full',
  },
  top: {
    sm: 'h-48',
    md: 'h-64',
    lg: 'h-80',
    xl: 'h-96',
    full: 'h-full',
  },
  bottom: {
    sm: 'h-48',
    md: 'h-64',
    lg: 'h-80',
    xl: 'h-96',
    full: 'h-full',
  },
}

const positionStyles: Record<DrawerSide, string> = {
  left: 'left-0 top-0 h-full',
  right: 'right-0 top-0 h-full',
  top: 'top-0 left-0 w-full',
  bottom: 'bottom-0 left-0 w-full',
}

const transitionStyles = computed(() => {
  switch (props.side) {
    case 'left':
      return {
        enterFrom: '-translate-x-full',
        enterTo: 'translate-x-0',
        leaveFrom: 'translate-x-0',
        leaveTo: '-translate-x-full',
      }
    case 'right':
      return {
        enterFrom: 'translate-x-full',
        enterTo: 'translate-x-0',
        leaveFrom: 'translate-x-0',
        leaveTo: 'translate-x-full',
      }
    case 'top':
      return {
        enterFrom: '-translate-y-full',
        enterTo: 'translate-y-0',
        leaveFrom: 'translate-y-0',
        leaveTo: '-translate-y-full',
      }
    case 'bottom':
      return {
        enterFrom: 'translate-y-full',
        enterTo: 'translate-y-0',
        leaveFrom: 'translate-y-0',
        leaveTo: 'translate-y-full',
      }
  }
})

function close() {
  if (props.closable) {
    emit('update:modelValue', false)
    emit('close')
  }
}

function handleOverlayClick() {
  if (props.closeOnOverlay) {
    close()
  }
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.closeOnEscape) {
    close()
  }
}

// Focus trap
useFocusTrap(drawerRef, isOpen)

// Scroll lock
watch(
  () => props.modelValue,
  (open) => {
    isOpen.value = open
    if (open) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  },
)

onUnmounted(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50"
      >
        <!-- Overlay -->
        <div
          class="fixed inset-0 bg-black/50"
          aria-hidden="true"
          @click="handleOverlayClick"
        />

        <!-- Drawer -->
        <Transition
          enter-active-class="transition duration-300 ease-out transform"
          :enter-from-class="transitionStyles.enterFrom"
          :enter-to-class="transitionStyles.enterTo"
          leave-active-class="transition duration-200 ease-in transform"
          :leave-from-class="transitionStyles.leaveFrom"
          :leave-to-class="transitionStyles.leaveTo"
        >
          <div
            v-if="modelValue"
            ref="drawerRef"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="title ? `${drawerId}-title` : undefined"
            :aria-describedby="description ? `${drawerId}-description` : undefined"
            :class="cn(
              'fixed z-10 flex flex-col bg-white shadow-xl',
              positionStyles[side],
              sizeStyles[side][size],
            )"
          >
            <!-- Header -->
            <div
              v-if="title || closable"
              class="flex shrink-0 items-start justify-between border-b border-neutral-200 px-6 py-4"
            >
              <div>
                <h2
                  v-if="title"
                  :id="`${drawerId}-title`"
                  class="text-lg font-semibold text-neutral-900"
                >
                  {{ title }}
                </h2>
                <p
                  v-if="description"
                  :id="`${drawerId}-description`"
                  class="mt-1 text-sm text-neutral-500"
                >
                  {{ description }}
                </p>
              </div>
              <button
                v-if="closable"
                type="button"
                class="rounded-md p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-500 focus-ring"
                aria-label="Close"
                @click="close"
              >
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Content -->
            <div class="flex-1 overflow-y-auto px-6 py-4">
              <slot />
            </div>

            <!-- Footer -->
            <div
              v-if="$slots.footer"
              class="shrink-0 border-t border-neutral-200 px-6 py-4"
            >
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
