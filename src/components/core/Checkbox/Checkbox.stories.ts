import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Checkbox from './Checkbox.vue'

const meta: Meta<typeof Checkbox> = {
  title: 'Core/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'The checked state (v-model)',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in an indeterminate state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    description: {
      control: 'text',
      description: 'Description text',
    },
  },
  args: {
    modelValue: false,
    indeterminate: false,
    disabled: false,
    label: '',
    description: '',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(args.modelValue)
      return { args, checked }
    },
    template: '<Checkbox v-bind="args" v-model="checked" />',
  }),
}

export const WithLabel: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false)
      return { checked }
    },
    template: '<Checkbox v-model="checked" label="Accept terms and conditions" />',
  }),
}

export const WithDescription: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false)
      return { checked }
    },
    template: '<Checkbox v-model="checked" label="Marketing emails" description="Receive emails about new products and features" />',
  }),
}

export const States: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const values = ref({
        unchecked: false,
        checked: true,
        indeterminate: false,
        disabled: false,
        disabledChecked: true,
      })
      return { values }
    },
    template: `
      <div class="flex flex-col gap-4">
        <Checkbox v-model="values.unchecked" label="Unchecked" />
        <Checkbox v-model="values.checked" label="Checked" />
        <Checkbox v-model="values.indeterminate" indeterminate label="Indeterminate" />
        <Checkbox v-model="values.disabled" disabled label="Disabled (unchecked)" />
        <Checkbox v-model="values.disabledChecked" disabled label="Disabled (checked)" />
      </div>
    `,
  }),
}

export const CheckboxGroup: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const options = ref({
        option1: false,
        option2: true,
        option3: false,
      })
      return { options }
    },
    template: `
      <div class="flex flex-col gap-3">
        <p class="text-sm font-medium text-neutral-700">Select options</p>
        <Checkbox v-model="options.option1" label="Option 1" description="First option description" />
        <Checkbox v-model="options.option2" label="Option 2" description="Second option description" />
        <Checkbox v-model="options.option3" label="Option 3" description="Third option description" />
      </div>
    `,
  }),
}
