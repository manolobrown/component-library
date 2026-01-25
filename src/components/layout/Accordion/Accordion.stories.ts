import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Accordion from './Accordion.vue'
import AccordionItem from './AccordionItem.vue'

const meta: Meta<typeof Accordion> = {
  title: 'Layout/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Whether one or multiple items can be open',
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether items can be collapsed (single mode only)',
    },
  },
  args: {
    type: 'single',
    collapsible: true,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Accordion, AccordionItem },
    setup() {
      const openItem = ref('')
      return { args, openItem }
    },
    template: `
      <Accordion v-bind="args" v-model="openItem" class="max-w-lg">
        <AccordionItem value="item-1" title="Is it accessible?">
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionItem>
        <AccordionItem value="item-2" title="Is it styled?">
          Yes. It comes with default styles that match the other components.
        </AccordionItem>
        <AccordionItem value="item-3" title="Is it animated?">
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionItem>
      </Accordion>
    `,
  }),
}

export const Multiple: Story = {
  render: () => ({
    components: { Accordion, AccordionItem },
    setup() {
      const openItems = ref<string[]>([])
      return { openItems }
    },
    template: `
      <Accordion v-model="openItems" type="multiple" class="max-w-lg">
        <AccordionItem value="features" title="Features">
          <ul class="list-disc list-inside space-y-1">
            <li>TypeScript support</li>
            <li>Accessible components</li>
            <li>Customizable styling</li>
          </ul>
        </AccordionItem>
        <AccordionItem value="installation" title="Installation">
          Run <code class="bg-neutral-100 px-1 py-0.5 rounded">pnpm add component-library</code> to install.
        </AccordionItem>
        <AccordionItem value="usage" title="Usage">
          Import components from the library and use them in your Vue app.
        </AccordionItem>
      </Accordion>
    `,
  }),
}

export const NonCollapsible: Story = {
  render: () => ({
    components: { Accordion, AccordionItem },
    setup() {
      const openItem = ref('item-1')
      return { openItem }
    },
    template: `
      <Accordion v-model="openItem" :collapsible="false" class="max-w-lg">
        <AccordionItem value="item-1" title="First Item">
          This accordion always has one item open.
        </AccordionItem>
        <AccordionItem value="item-2" title="Second Item">
          Clicking another item will switch to it.
        </AccordionItem>
        <AccordionItem value="item-3" title="Third Item">
          You cannot close all items.
        </AccordionItem>
      </Accordion>
    `,
  }),
}

export const WithDisabledItem: Story = {
  render: () => ({
    components: { Accordion, AccordionItem },
    setup() {
      const openItem = ref('')
      return { openItem }
    },
    template: `
      <Accordion v-model="openItem" class="max-w-lg">
        <AccordionItem value="item-1" title="Available">
          This item can be opened.
        </AccordionItem>
        <AccordionItem value="item-2" title="Coming Soon" disabled>
          This content is not available yet.
        </AccordionItem>
        <AccordionItem value="item-3" title="Also Available">
          This item can also be opened.
        </AccordionItem>
      </Accordion>
    `,
  }),
}
