import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Textarea from './Textarea.vue'

const meta: Meta<typeof Textarea> = {
  title: 'Core/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'The textarea value (v-model)',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    rows: {
      control: 'number',
      description: 'Number of visible rows',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character length',
    },
    showCount: {
      control: 'boolean',
      description: 'Show character count',
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'Resize behavior',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the textarea is read-only',
    },
    error: {
      control: 'boolean',
      description: 'Whether the textarea has an error',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
  },
  args: {
    modelValue: '',
    placeholder: 'Enter text...',
    label: '',
    rows: 3,
    showCount: false,
    resize: 'vertical',
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
    components: { Textarea },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<Textarea v-bind="args" v-model="value" />',
  }),
}

export const WithLabel: Story = {
  render: () => ({
    components: { Textarea },
    setup() {
      const value = ref('')
      return { value }
    },
    template: '<Textarea v-model="value" label="Description" placeholder="Enter a description..." />',
  }),
}

export const WithCharacterCount: Story = {
  render: () => ({
    components: { Textarea },
    setup() {
      const value = ref('')
      return { value }
    },
    template: '<Textarea v-model="value" label="Bio" placeholder="Tell us about yourself..." :max-length="200" show-count />',
  }),
}

export const States: Story = {
  render: () => ({
    components: { Textarea },
    setup() {
      const values = ref({
        default: '',
        disabled: 'This textarea is disabled',
        readonly: 'This textarea is read-only',
        error: '',
      })
      return { values }
    },
    template: `
      <div class="flex flex-col gap-4 max-w-md">
        <Textarea v-model="values.default" label="Default" placeholder="Enter text..." />
        <Textarea v-model="values.disabled" label="Disabled" disabled />
        <Textarea v-model="values.readonly" label="Read-only" readonly />
        <Textarea v-model="values.error" label="Error" error error-message="This field is required" placeholder="Enter text..." />
      </div>
    `,
  }),
}

export const ResizeOptions: Story = {
  render: () => ({
    components: { Textarea },
    setup() {
      const values = ref({ none: '', vertical: '', horizontal: '', both: '' })
      return { values }
    },
    template: `
      <div class="flex flex-col gap-4 max-w-md">
        <Textarea v-model="values.none" label="No Resize" resize="none" placeholder="Cannot resize..." />
        <Textarea v-model="values.vertical" label="Vertical Resize" resize="vertical" placeholder="Resize vertically..." />
        <Textarea v-model="values.horizontal" label="Horizontal Resize" resize="horizontal" placeholder="Resize horizontally..." />
        <Textarea v-model="values.both" label="Both" resize="both" placeholder="Resize any direction..." />
      </div>
    `,
  }),
}
