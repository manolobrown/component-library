import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Radio from './Radio.vue'

const meta: Meta<typeof Radio> = {
  title: 'Core/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'The selected value (v-model)',
    },
    name: {
      control: 'text',
      description: 'The name attribute for the radio group',
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout orientation',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether all radio options are disabled',
    },
  },
  args: {
    modelValue: '',
    orientation: 'vertical',
    disabled: false,
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
    components: { Radio },
    setup() {
      const selected = ref(args.modelValue)
      return { args, selected }
    },
    template: '<Radio v-bind="args" v-model="selected" />',
  }),
}

export const WithDescriptions: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const selected = ref('startup')
      const options = [
        { value: 'startup', label: 'Startup', description: 'Best for small teams just getting started' },
        { value: 'business', label: 'Business', description: 'Best for growing businesses up to 100 employees' },
        { value: 'enterprise', label: 'Enterprise', description: 'Best for large organizations' },
      ]
      return { selected, options }
    },
    template: '<Radio v-model="selected" :options="options" />',
  }),
}

export const Horizontal: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const selected = ref('small')
      const options = [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' },
      ]
      return { selected, options }
    },
    template: '<Radio v-model="selected" :options="options" orientation="horizontal" />',
  }),
}

export const DisabledGroup: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const selected = ref('option1')
      const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ]
      return { selected, options }
    },
    template: '<Radio v-model="selected" :options="options" disabled />',
  }),
}

export const IndividualDisabled: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const selected = ref('available')
      const options = [
        { value: 'available', label: 'Available' },
        { value: 'busy', label: 'Busy' },
        { value: 'unavailable', label: 'Unavailable', disabled: true },
      ]
      return { selected, options }
    },
    template: '<Radio v-model="selected" :options="options" />',
  }),
}
