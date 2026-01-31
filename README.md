# Vue 3 Component Library

A modern, accessible component library built with Vue 3, TypeScript, and TailwindCSS v4.

## Features

- **Vue 3 + TypeScript** - Full type safety with exported type definitions
- **TailwindCSS v4** - Modern styling with custom design tokens
- **Accessible** - WAI-ARIA compliant with keyboard navigation
- **Storybook 10** - Interactive documentation with live examples
- **11 Components** - Core form elements and layout components

## Requirements

- Node.js 20+
- pnpm 9+

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/component-library.git
cd component-library

# Install dependencies
pnpm install
```

## Development

```bash
# Start Vite dev server (http://localhost:5173)
pnpm dev

# Start Storybook (http://localhost:6006)
pnpm storybook

# Type check
pnpm type-check

# Lint and fix
pnpm lint

# Format code
pnpm format

# Run tests
pnpm test

# Build for production
pnpm build

# Build Storybook static site
pnpm build-storybook
```

## Components

### Core Components

| Component    | Description                                                                                          |
| ------------ | ---------------------------------------------------------------------------------------------------- |
| **Button**   | Primary action element with 5 variants (primary, secondary, outline, ghost, destructive) and 3 sizes |
| **Input**    | Text input with label, placeholder, error states, and size options                                   |
| **Textarea** | Multi-line input with resize control and character count                                             |
| **Checkbox** | Binary selection with indeterminate state and description support                                    |
| **Radio**    | Single selection from options with horizontal/vertical layouts                                       |
| **Select**   | Dropdown selection with optional search functionality                                                |

### Layout Components

| Component     | Description                                                    |
| ------------- | -------------------------------------------------------------- |
| **Card**      | Container with configurable padding, shadow, and border radius |
| **Accordion** | Collapsible sections with single or multiple open items        |
| **Tabs**      | Tabbed navigation with 3 variants (default, pills, underline)  |
| **Modal**     | Dialog overlay with focus trap and scroll lock                 |
| **Drawer**    | Slide-in panel from any edge (left, right, top, bottom)        |

## Usage

### Importing Components

```vue
<script setup lang="ts">
import { Button, Input, Modal } from '@/components'
</script>
```

### Button

```vue
<template>
  <Button variant="primary" size="md" @click="handleClick"> Click me </Button>

  <Button variant="destructive" :loading="isLoading"> Delete </Button>
</template>
```

**Props:**

- `variant`: `'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'`
- `size`: `'sm' | 'md' | 'lg'`
- `disabled`: `boolean`
- `loading`: `boolean`
- `type`: `'button' | 'submit' | 'reset'`

### Input

```vue
<template>
  <Input
    v-model="email"
    label="Email"
    type="email"
    placeholder="you@example.com"
    :error="hasError"
    error-message="Please enter a valid email"
  />
</template>
```

**Props:**

- `modelValue`: `string`
- `type`: `'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'`
- `label`: `string`
- `placeholder`: `string`
- `size`: `'sm' | 'md' | 'lg'`
- `disabled`: `boolean`
- `readonly`: `boolean`
- `error`: `boolean`
- `errorMessage`: `string`

### Textarea

```vue
<template>
  <Textarea v-model="bio" label="Bio" :rows="4" :max-length="500" show-count resize="vertical" />
</template>
```

### Checkbox

```vue
<template>
  <Checkbox
    v-model="accepted"
    label="I accept the terms"
    description="By checking this, you agree to our terms of service"
  />
</template>
```

### Radio

```vue
<script setup lang="ts">
const selected = ref('option1')
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
]
</script>

<template>
  <Radio v-model="selected" :options="options" orientation="vertical" />
</template>
```

### Select

```vue
<script setup lang="ts">
const country = ref('')
const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
]
</script>

<template>
  <Select
    v-model="country"
    :options="countries"
    label="Country"
    placeholder="Select a country"
    searchable
  />
</template>
```

### Card

```vue
<template>
  <Card padding="lg" shadow="md" hoverable>
    <h3>Card Title</h3>
    <p>Card content goes here.</p>
  </Card>
</template>
```

### Accordion

```vue
<script setup lang="ts">
const openItem = ref('')
</script>

<template>
  <Accordion v-model="openItem" type="single">
    <AccordionItem value="item1" title="Section 1"> Content for section 1 </AccordionItem>
    <AccordionItem value="item2" title="Section 2"> Content for section 2 </AccordionItem>
  </Accordion>
</template>
```

### Tabs

```vue
<script setup lang="ts">
const activeTab = ref('account')
const tabs = [
  { value: 'account', label: 'Account' },
  { value: 'password', label: 'Password' },
  { value: 'notifications', label: 'Notifications' },
]
</script>

<template>
  <Tabs v-model="activeTab" :items="tabs" variant="default">
    <TabPanel value="account">Account settings content</TabPanel>
    <TabPanel value="password">Password settings content</TabPanel>
    <TabPanel value="notifications">Notification settings content</TabPanel>
  </Tabs>
</template>
```

### Modal

```vue
<script setup lang="ts">
const isOpen = ref(false)
</script>

<template>
  <Button @click="isOpen = true">Open Modal</Button>

  <Modal v-model="isOpen" title="Confirm Action" size="md">
    <p>Are you sure you want to proceed?</p>

    <template #footer>
      <div class="flex justify-end gap-3">
        <Button variant="secondary" @click="isOpen = false">Cancel</Button>
        <Button @click="isOpen = false">Confirm</Button>
      </div>
    </template>
  </Modal>
</template>
```

### Drawer

```vue
<script setup lang="ts">
const isOpen = ref(false)
</script>

<template>
  <Button @click="isOpen = true">Open Drawer</Button>

  <Drawer v-model="isOpen" title="Settings" side="right" size="md">
    <p>Drawer content here</p>

    <template #footer>
      <Button class="w-full" @click="isOpen = false">Save Changes</Button>
    </template>
  </Drawer>
</template>
```

## Design Tokens

The library uses TailwindCSS v4 with custom design tokens defined in `src/styles/main.css`:

### Colors

| Token                         | Usage                      |
| ----------------------------- | -------------------------- |
| `neutral-50` to `neutral-950` | Backgrounds, text, borders |
| `primary-500` / `primary-600` | Accent color (blue-indigo) |
| `success-500`                 | Success states             |
| `warning-500`                 | Warning states             |
| `error-500`                   | Error states               |

### Spacing & Radius

- Base spacing unit: 4px
- Border radius: `sm` (4px), `md` (6px), `lg` (8px), `xl` (12px)

### Typography

- Sans-serif: Inter
- Monospace: JetBrains Mono
- Scale: xs (12px) to 3xl (30px)

## Project Structure

```
src/
├── components/
│   ├── core/           # Form components
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Textarea/
│   │   ├── Checkbox/
│   │   ├── Radio/
│   │   └── Select/
│   ├── layout/         # Layout components
│   │   ├── Card/
│   │   ├── Accordion/
│   │   ├── Tabs/
│   │   ├── Modal/
│   │   └── Drawer/
│   └── index.ts        # Component exports
├── composables/        # Vue composables
│   ├── useId.ts
│   ├── useFocusTrap.ts
│   └── useClickOutside.ts
├── utils/
│   └── cn.ts           # Class name utility
├── styles/
│   └── main.css        # TailwindCSS theme
└── stories/            # Storybook docs
    ├── Introduction.mdx
    ├── Colors.mdx
    └── Typography.mdx
```

## Accessibility

All components are built with accessibility in mind:

- Proper ARIA attributes (`aria-expanded`, `aria-controls`, `aria-selected`, etc.)
- Keyboard navigation support (Arrow keys, Enter, Escape, Tab)
- Focus management with visible focus rings
- Screen reader friendly labels
- Color contrast compliance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
