import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Select from './Select.vue'

const meta: Meta<typeof Select> = {
  title: 'Core/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'The selected value (v-model)',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the select',
    },
    searchable: {
      control: 'boolean',
      description: 'Whether the select is searchable',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
    error: {
      control: 'boolean',
      description: 'Whether the select has an error',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
  },
  args: {
    modelValue: '',
    placeholder: 'Select an option',
    label: '',
    size: 'md',
    searchable: false,
    disabled: false,
    error: false,
    errorMessage: '',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Select },
    setup() {
      const selected = ref(args.modelValue)
      return { args, selected }
    },
    template: '<div class="w-64"><Select v-bind="args" v-model="selected" /></div>',
  }),
}

export const WithLabel: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const selected = ref('')
      const options = [
        { value: 'us', label: 'United States' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'ca', label: 'Canada' },
        { value: 'au', label: 'Australia' },
      ]
      return { selected, options }
    },
    template: '<div class="w-64"><Select v-model="selected" :options="options" label="Country" placeholder="Select a country" /></div>',
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const values = ref({ sm: '', md: '', lg: '' })
      const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ]
      return { values, options }
    },
    template: `
      <div class="flex flex-col gap-4 w-64">
        <Select v-model="values.sm" :options="options" size="sm" label="Small" />
        <Select v-model="values.md" :options="options" size="md" label="Medium" />
        <Select v-model="values.lg" :options="options" size="lg" label="Large" />
      </div>
    `,
  }),
}

export const Searchable: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const selected = ref('')
      const options = [
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'angular', label: 'Angular' },
        { value: 'svelte', label: 'Svelte' },
        { value: 'solid', label: 'SolidJS' },
        { value: 'qwik', label: 'Qwik' },
      ]
      return { selected, options }
    },
    template: '<div class="w-64"><Select v-model="selected" :options="options" label="Framework" searchable placeholder="Search frameworks..." /></div>',
  }),
}

export const WithDisabledOptions: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const selected = ref('')
      const options = [
        { value: 'free', label: 'Free Plan' },
        { value: 'pro', label: 'Pro Plan' },
        { value: 'enterprise', label: 'Enterprise Plan', disabled: true },
      ]
      return { selected, options }
    },
    template: '<div class="w-64"><Select v-model="selected" :options="options" label="Plan" /></div>',
  }),
}

export const States: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const values = ref({ default: '', disabled: 'option1', error: '' })
      const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ]
      return { values, options }
    },
    template: `
      <div class="flex flex-col gap-4 w-64">
        <Select v-model="values.default" :options="options" label="Default" />
        <Select v-model="values.disabled" :options="options" label="Disabled" disabled />
        <Select v-model="values.error" :options="options" label="Error" error error-message="Please select an option" />
      </div>
    `,
  }),
}
