import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Modal from './Modal.vue'
import { Button } from '../../core/Button'

const meta: Meta<typeof Modal> = {
  title: 'Layout/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'Whether the modal is open (v-model)',
    },
    title: {
      control: 'text',
      description: 'Modal title',
    },
    description: {
      control: 'text',
      description: 'Modal description',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Modal size',
    },
    closable: {
      control: 'boolean',
      description: 'Whether the modal can be closed',
    },
    closeOnOverlay: {
      control: 'boolean',
      description: 'Close when clicking overlay',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close when pressing Escape',
    },
  },
  args: {
    title: 'Modal Title',
    description: '',
    size: 'md',
    closable: true,
    closeOnOverlay: true,
    closeOnEscape: true,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      const isOpen = ref(false)
      return { args, isOpen }
    },
    template: `
      <div>
        <Button @click="isOpen = true">Open Modal</Button>
        <Modal v-bind="args" v-model="isOpen">
          <p class="text-neutral-600">This is the modal content. You can put any content here.</p>
        </Modal>
      </div>
    `,
  }),
}

export const WithFooter: Story = {
  render: () => ({
    components: { Modal, Button },
    setup() {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div>
        <Button @click="isOpen = true">Open Modal</Button>
        <Modal v-model="isOpen" title="Confirm Action" description="This action cannot be undone.">
          <p class="text-neutral-600">Are you sure you want to proceed with this action?</p>
          <template #footer>
            <div class="flex justify-end gap-3">
              <Button variant="secondary" @click="isOpen = false">Cancel</Button>
              <Button variant="destructive" @click="isOpen = false">Delete</Button>
            </div>
          </template>
        </Modal>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { Modal, Button },
    setup() {
      const modals = ref({
        sm: false,
        md: false,
        lg: false,
        xl: false,
      })
      return { modals }
    },
    template: `
      <div class="flex gap-2">
        <Button @click="modals.sm = true">Small</Button>
        <Button @click="modals.md = true">Medium</Button>
        <Button @click="modals.lg = true">Large</Button>
        <Button @click="modals.xl = true">XL</Button>

        <Modal v-model="modals.sm" title="Small Modal" size="sm">
          <p class="text-neutral-600">This is a small modal.</p>
        </Modal>
        <Modal v-model="modals.md" title="Medium Modal" size="md">
          <p class="text-neutral-600">This is a medium modal (default).</p>
        </Modal>
        <Modal v-model="modals.lg" title="Large Modal" size="lg">
          <p class="text-neutral-600">This is a large modal.</p>
        </Modal>
        <Modal v-model="modals.xl" title="Extra Large Modal" size="xl">
          <p class="text-neutral-600">This is an extra large modal.</p>
        </Modal>
      </div>
    `,
  }),
}

export const NonClosable: Story = {
  render: () => ({
    components: { Modal, Button },
    setup() {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div>
        <Button @click="isOpen = true">Open Modal</Button>
        <Modal
          v-model="isOpen"
          title="Processing..."
          :closable="false"
          :close-on-overlay="false"
          :close-on-escape="false"
        >
          <div class="flex items-center gap-3">
            <svg class="h-5 w-5 animate-spin text-primary-600" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span class="text-neutral-600">Please wait while we process your request...</span>
          </div>
          <template #footer>
            <div class="flex justify-end">
              <Button variant="secondary" @click="isOpen = false">Force Close</Button>
            </div>
          </template>
        </Modal>
      </div>
    `,
  }),
}

export const WithForm: Story = {
  render: () => ({
    components: { Modal, Button },
    setup() {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div>
        <Button @click="isOpen = true">Edit Profile</Button>
        <Modal v-model="isOpen" title="Edit Profile" description="Make changes to your profile here.">
          <form class="space-y-4" @submit.prevent="isOpen = false">
            <div>
              <label class="block text-sm font-medium text-neutral-700">Name</label>
              <input type="text" class="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" value="John Doe" />
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-700">Email</label>
              <input type="email" class="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" value="john@example.com" />
            </div>
          </form>
          <template #footer>
            <div class="flex justify-end gap-3">
              <Button variant="secondary" @click="isOpen = false">Cancel</Button>
              <Button @click="isOpen = false">Save Changes</Button>
            </div>
          </template>
        </Modal>
      </div>
    `,
  }),
}
