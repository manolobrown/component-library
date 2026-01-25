<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { cn } from '@/utils/cn'
import { useId } from '@/composables/useId'
import { useFocusTrap } from '@/composables/useFocusTrap'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ModalProps {
  modelValue?: boolean
  title?: string
  description?: string
  size?: ModalSize
  closable?: boolean
  closeOnOverlay?: boolean
  closeOnEscape?: boolean
}

const props = withDefaults(defineProps<ModalProps>(), {
  modelValue: false,
  title: '',
  description: '',
  size: 'md',
  closable: true,
  closeOnOverlay: true,
  closeOnEscape: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const modalId = useId('modal')
const modalRef = ref<HTMLElement | null>(null)
const isOpen = ref(props.modelValue)

const sizeStyles: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full mx-4',
}

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
useFocusTrap(modalRef, isOpen)

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
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <!-- Overlay -->
        <div
          class="fixed inset-0 bg-black/50"
          aria-hidden="true"
          @click="handleOverlayClick"
        />

        <!-- Modal -->
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="modelValue"
            ref="modalRef"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="title ? `${modalId}-title` : undefined"
            :aria-describedby="description ? `${modalId}-description` : undefined"
            :class="cn(
              'relative z-10 w-full rounded-lg bg-white shadow-xl',
              sizeStyles[size],
            )"
          >
            <!-- Header -->
            <div
              v-if="title || closable"
              class="flex items-start justify-between border-b border-neutral-200 px-6 py-4"
            >
              <div>
                <h2
                  v-if="title"
                  :id="`${modalId}-title`"
                  class="text-lg font-semibold text-neutral-900"
                >
                  {{ title }}
                </h2>
                <p
                  v-if="description"
                  :id="`${modalId}-description`"
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
            <div class="px-6 py-4">
              <slot />
            </div>

            <!-- Footer -->
            <div
              v-if="$slots.footer"
              class="border-t border-neutral-200 px-6 py-4"
            >
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
