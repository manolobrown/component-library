import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Drawer from './Drawer.vue'
import { Button } from '../../core/Button'

const meta: Meta<typeof Drawer> = {
  title: 'Layout/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'Whether the drawer is open (v-model)',
    },
    title: {
      control: 'text',
      description: 'Drawer title',
    },
    description: {
      control: 'text',
      description: 'Drawer description',
    },
    side: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Which side the drawer opens from',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Drawer size',
    },
    closable: {
      control: 'boolean',
      description: 'Whether the drawer can be closed',
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
    title: 'Drawer Title',
    description: '',
    side: 'right',
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
    components: { Drawer, Button },
    setup() {
      const isOpen = ref(false)
      return { args, isOpen }
    },
    template: `
      <div>
        <Button @click="isOpen = true">Open Drawer</Button>
        <Drawer v-bind="args" v-model="isOpen">
          <p class="text-neutral-600">This is the drawer content. You can put any content here.</p>
        </Drawer>
      </div>
    `,
  }),
}

export const Sides: Story = {
  render: () => ({
    components: { Drawer, Button },
    setup() {
      const drawers = ref({
        left: false,
        right: false,
        top: false,
        bottom: false,
      })
      return { drawers }
    },
    template: `
      <div class="flex gap-2">
        <Button @click="drawers.left = true">Left</Button>
        <Button @click="drawers.right = true">Right</Button>
        <Button @click="drawers.top = true">Top</Button>
        <Button @click="drawers.bottom = true">Bottom</Button>

        <Drawer v-model="drawers.left" title="Left Drawer" side="left">
          <p class="text-neutral-600">This drawer slides in from the left.</p>
        </Drawer>
        <Drawer v-model="drawers.right" title="Right Drawer" side="right">
          <p class="text-neutral-600">This drawer slides in from the right.</p>
        </Drawer>
        <Drawer v-model="drawers.top" title="Top Drawer" side="top">
          <p class="text-neutral-600">This drawer slides in from the top.</p>
        </Drawer>
        <Drawer v-model="drawers.bottom" title="Bottom Drawer" side="bottom">
          <p class="text-neutral-600">This drawer slides in from the bottom.</p>
        </Drawer>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { Drawer, Button },
    setup() {
      const drawers = ref({
        sm: false,
        md: false,
        lg: false,
        xl: false,
      })
      return { drawers }
    },
    template: `
      <div class="flex gap-2">
        <Button @click="drawers.sm = true">Small</Button>
        <Button @click="drawers.md = true">Medium</Button>
        <Button @click="drawers.lg = true">Large</Button>
        <Button @click="drawers.xl = true">XL</Button>

        <Drawer v-model="drawers.sm" title="Small Drawer" size="sm">
          <p class="text-neutral-600">This is a small drawer (256px).</p>
        </Drawer>
        <Drawer v-model="drawers.md" title="Medium Drawer" size="md">
          <p class="text-neutral-600">This is a medium drawer (320px).</p>
        </Drawer>
        <Drawer v-model="drawers.lg" title="Large Drawer" size="lg">
          <p class="text-neutral-600">This is a large drawer (384px).</p>
        </Drawer>
        <Drawer v-model="drawers.xl" title="Extra Large Drawer" size="xl">
          <p class="text-neutral-600">This is an extra large drawer (512px).</p>
        </Drawer>
      </div>
    `,
  }),
}

export const WithFooter: Story = {
  render: () => ({
    components: { Drawer, Button },
    setup() {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div>
        <Button @click="isOpen = true">Open Cart</Button>
        <Drawer v-model="isOpen" title="Shopping Cart" description="3 items in your cart">
          <div class="space-y-4">
            <div class="flex gap-4 border-b border-neutral-100 pb-4">
              <div class="h-16 w-16 rounded bg-neutral-200"></div>
              <div class="flex-1">
                <h4 class="font-medium text-neutral-900">Product Name</h4>
                <p class="text-sm text-neutral-500">Qty: 1</p>
                <p class="font-medium text-neutral-900">$29.99</p>
              </div>
            </div>
            <div class="flex gap-4 border-b border-neutral-100 pb-4">
              <div class="h-16 w-16 rounded bg-neutral-200"></div>
              <div class="flex-1">
                <h4 class="font-medium text-neutral-900">Another Product</h4>
                <p class="text-sm text-neutral-500">Qty: 2</p>
                <p class="font-medium text-neutral-900">$49.99</p>
              </div>
            </div>
          </div>
          <template #footer>
            <div class="space-y-4">
              <div class="flex justify-between text-lg font-medium">
                <span>Total</span>
                <span>$129.97</span>
              </div>
              <Button class="w-full" @click="isOpen = false">Checkout</Button>
            </div>
          </template>
        </Drawer>
      </div>
    `,
  }),
}

export const NavigationMenu: Story = {
  render: () => ({
    components: { Drawer, Button },
    setup() {
      const isOpen = ref(false)
      const menuItems = [
        { label: 'Home', href: '#' },
        { label: 'Products', href: '#' },
        { label: 'About', href: '#' },
        { label: 'Contact', href: '#' },
      ]
      return { isOpen, menuItems }
    },
    template: `
      <div>
        <Button @click="isOpen = true">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Menu
        </Button>
        <Drawer v-model="isOpen" title="Navigation" side="left">
          <nav class="space-y-1">
            <a
              v-for="item in menuItems"
              :key="item.label"
              :href="item.href"
              class="block rounded-md px-3 py-2 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
              @click="isOpen = false"
            >
              {{ item.label }}
            </a>
          </nav>
        </Drawer>
      </div>
    `,
  }),
}
