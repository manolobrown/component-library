import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Input from './Input.vue'

const meta: Meta<typeof Input> = {
  title: 'Core/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'The input value (v-model)',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'The input type',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the input is read-only',
    },
    error: {
      control: 'boolean',
      description: 'Whether the input has an error',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
  },
  args: {
    modelValue: '',
    type: 'text',
    size: 'md',
    placeholder: 'Enter text...',
    label: '',
    disabled: false,
    readonly: false,
    error: false,
    errorMessage: '',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<Input v-bind="args" v-model="value" />',
  }),
}

export const WithLabel: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { value }
    },
    template: '<Input v-model="value" label="Email Address" placeholder="you@example.com" type="email" />',
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const values = ref({ sm: '', md: '', lg: '' })
      return { values }
    },
    template: `
      <div class="flex flex-col gap-4 max-w-sm">
        <Input v-model="values.sm" size="sm" placeholder="Small" label="Small" />
        <Input v-model="values.md" size="md" placeholder="Medium" label="Medium" />
        <Input v-model="values.lg" size="lg" placeholder="Large" label="Large" />
      </div>
    `,
  }),
}

export const States: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const values = ref({ default: '', disabled: 'Disabled value', readonly: 'Read-only value', error: '' })
      return { values }
    },
    template: `
      <div class="flex flex-col gap-4 max-w-sm">
        <Input v-model="values.default" label="Default" placeholder="Enter text..." />
        <Input v-model="values.disabled" label="Disabled" disabled />
        <Input v-model="values.readonly" label="Read-only" readonly />
        <Input v-model="values.error" label="Error" error error-message="This field is required" placeholder="Enter text..." />
      </div>
    `,
  }),
}

export const InputTypes: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const values = ref({ text: '', email: '', password: '', number: '', search: '' })
      return { values }
    },
    template: `
      <div class="flex flex-col gap-4 max-w-sm">
        <Input v-model="values.text" label="Text" type="text" placeholder="Enter text..." />
        <Input v-model="values.email" label="Email" type="email" placeholder="you@example.com" />
        <Input v-model="values.password" label="Password" type="password" placeholder="Enter password..." />
        <Input v-model="values.number" label="Number" type="number" placeholder="Enter number..." />
        <Input v-model="values.search" label="Search" type="search" placeholder="Search..." />
      </div>
    `,
  }),
}
