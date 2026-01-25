import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Tabs from './Tabs.vue'
import TabPanel from './TabPanel.vue'

const meta: Meta<typeof Tabs> = {
  title: 'Layout/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'pills', 'underline'],
      description: 'Visual style variant',
    },
  },
  args: {
    variant: 'default',
    items: [
      { value: 'account', label: 'Account' },
      { value: 'password', label: 'Password' },
      { value: 'notifications', label: 'Notifications' },
    ],
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Tabs, TabPanel },
    setup() {
      const activeTab = ref('account')
      return { args, activeTab }
    },
    template: `
      <Tabs v-bind="args" v-model="activeTab" class="max-w-lg">
        <TabPanel value="account">
          <div class="p-4 bg-neutral-50 rounded-lg">
            <h3 class="font-medium text-neutral-900">Account Settings</h3>
            <p class="mt-2 text-sm text-neutral-600">Manage your account settings and preferences.</p>
          </div>
        </TabPanel>
        <TabPanel value="password">
          <div class="p-4 bg-neutral-50 rounded-lg">
            <h3 class="font-medium text-neutral-900">Password</h3>
            <p class="mt-2 text-sm text-neutral-600">Change your password and security settings.</p>
          </div>
        </TabPanel>
        <TabPanel value="notifications">
          <div class="p-4 bg-neutral-50 rounded-lg">
            <h3 class="font-medium text-neutral-900">Notifications</h3>
            <p class="mt-2 text-sm text-neutral-600">Configure your notification preferences.</p>
          </div>
        </TabPanel>
      </Tabs>
    `,
  }),
}

export const Pills: Story = {
  render: () => ({
    components: { Tabs, TabPanel },
    setup() {
      const activeTab = ref('all')
      const items = [
        { value: 'all', label: 'All' },
        { value: 'active', label: 'Active' },
        { value: 'completed', label: 'Completed' },
      ]
      return { activeTab, items }
    },
    template: `
      <Tabs v-model="activeTab" :items="items" variant="pills" class="max-w-lg">
        <TabPanel value="all">
          <p class="text-sm text-neutral-600">Showing all items</p>
        </TabPanel>
        <TabPanel value="active">
          <p class="text-sm text-neutral-600">Showing active items only</p>
        </TabPanel>
        <TabPanel value="completed">
          <p class="text-sm text-neutral-600">Showing completed items only</p>
        </TabPanel>
      </Tabs>
    `,
  }),
}

export const Underline: Story = {
  render: () => ({
    components: { Tabs, TabPanel },
    setup() {
      const activeTab = ref('overview')
      const items = [
        { value: 'overview', label: 'Overview' },
        { value: 'analytics', label: 'Analytics' },
        { value: 'reports', label: 'Reports' },
        { value: 'settings', label: 'Settings' },
      ]
      return { activeTab, items }
    },
    template: `
      <Tabs v-model="activeTab" :items="items" variant="underline" class="max-w-lg">
        <TabPanel value="overview">
          <p class="text-sm text-neutral-600">Overview content</p>
        </TabPanel>
        <TabPanel value="analytics">
          <p class="text-sm text-neutral-600">Analytics content</p>
        </TabPanel>
        <TabPanel value="reports">
          <p class="text-sm text-neutral-600">Reports content</p>
        </TabPanel>
        <TabPanel value="settings">
          <p class="text-sm text-neutral-600">Settings content</p>
        </TabPanel>
      </Tabs>
    `,
  }),
}

export const WithDisabledTab: Story = {
  render: () => ({
    components: { Tabs, TabPanel },
    setup() {
      const activeTab = ref('general')
      const items = [
        { value: 'general', label: 'General' },
        { value: 'advanced', label: 'Advanced', disabled: true },
        { value: 'api', label: 'API' },
      ]
      return { activeTab, items }
    },
    template: `
      <Tabs v-model="activeTab" :items="items" class="max-w-lg">
        <TabPanel value="general">
          <p class="text-sm text-neutral-600">General settings</p>
        </TabPanel>
        <TabPanel value="advanced">
          <p class="text-sm text-neutral-600">Advanced settings (disabled)</p>
        </TabPanel>
        <TabPanel value="api">
          <p class="text-sm text-neutral-600">API settings</p>
        </TabPanel>
      </Tabs>
    `,
  }),
}
