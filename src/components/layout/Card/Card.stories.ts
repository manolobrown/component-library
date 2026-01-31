import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Card from './Card.vue'

const meta: Meta<typeof Card> = {
  title: 'Layout/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Card padding',
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Shadow intensity',
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Border radius',
    },
    hoverable: {
      control: 'boolean',
      description: 'Whether the card has hover effects',
    },
    bordered: {
      control: 'boolean',
      description: 'Whether the card has a border',
    },
  },
  args: {
    padding: 'md',
    shadow: 'sm',
    rounded: 'lg',
    hoverable: false,
    bordered: true,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Card },
    setup() {
      return { args }
    },
    template: `
      <Card v-bind="args" class="max-w-sm">
        <h3 class="text-lg font-semibold text-neutral-900">Card Title</h3>
        <p class="mt-2 text-neutral-600">This is some card content. You can put any content here.</p>
      </Card>
    `,
  }),
}

export const WithHeaderAndFooter: Story = {
  render: () => ({
    components: { Card },
    template: `
      <Card class="max-w-sm" padding="none">
        <template #header>
          <div class="border-b border-neutral-200 px-4 py-3">
            <h3 class="font-semibold text-neutral-900">Card Header</h3>
          </div>
        </template>
        <div class="p-4">
          <p class="text-neutral-600">Card body content goes here.</p>
        </div>
        <template #footer>
          <div class="border-t border-neutral-200 px-4 py-3 bg-neutral-50 rounded-b-lg">
            <button class="text-sm text-primary-600 hover:text-primary-700">Learn more</button>
          </div>
        </template>
      </Card>
    `,
  }),
}

export const Hoverable: Story = {
  render: () => ({
    components: { Card },
    template: `
      <div class="flex gap-4">
        <Card hoverable class="w-64">
          <h3 class="font-semibold text-neutral-900">Hoverable Card</h3>
          <p class="mt-2 text-sm text-neutral-600">Hover over this card to see the effect.</p>
        </Card>
        <Card hoverable class="w-64">
          <h3 class="font-semibold text-neutral-900">Another Card</h3>
          <p class="mt-2 text-sm text-neutral-600">Cards with hover states are clickable.</p>
        </Card>
      </div>
    `,
  }),
}

export const Shadows: Story = {
  render: () => ({
    components: { Card },
    template: `
      <div class="flex gap-4">
        <Card shadow="none" class="w-48">
          <p class="text-sm text-neutral-600">No shadow</p>
        </Card>
        <Card shadow="sm" class="w-48">
          <p class="text-sm text-neutral-600">Small shadow</p>
        </Card>
        <Card shadow="md" class="w-48">
          <p class="text-sm text-neutral-600">Medium shadow</p>
        </Card>
        <Card shadow="lg" class="w-48">
          <p class="text-sm text-neutral-600">Large shadow</p>
        </Card>
      </div>
    `,
  }),
}

export const BorderRadius: Story = {
  render: () => ({
    components: { Card },
    template: `
      <div class="flex gap-4">
        <Card rounded="none" class="w-40">
          <p class="text-sm text-neutral-600">No radius</p>
        </Card>
        <Card rounded="sm" class="w-40">
          <p class="text-sm text-neutral-600">Small</p>
        </Card>
        <Card rounded="md" class="w-40">
          <p class="text-sm text-neutral-600">Medium</p>
        </Card>
        <Card rounded="lg" class="w-40">
          <p class="text-sm text-neutral-600">Large</p>
        </Card>
        <Card rounded="xl" class="w-40">
          <p class="text-sm text-neutral-600">Extra large</p>
        </Card>
      </div>
    `,
  }),
}
