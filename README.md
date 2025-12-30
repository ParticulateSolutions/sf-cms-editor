# @particulatesolutions/cms-editor

**⚠️ Internal Package:** This package contains CMS editor components for the Socialfunders platform. While publicly available on npm, it's not designed for external use and requires Socialfunders backend infrastructure.

## Installation

```bash
npm install @particulatesolutions/cms-editor
```

## Internationalization (i18n)

This library includes `vue-i18n` and provides default translations in German and English. You must set up vue-i18n in your application for the components to display translated text.

### Setting up i18n

1. **Import and set up vue-i18n** with the library's default translations:

```typescript
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { defaultTranslations } from '@particulatesolutions/cms-editor'

const i18n = createI18n({
  legacy: false,
  locale: 'de', // or 'en'
  fallbackLocale: 'de',
  messages: {
    de: {
      ...defaultTranslations.de,
      // Add your other German translations here
    },
    en: {
      ...defaultTranslations.en,
      // Add your other English translations here
    }
  }
})

app.use(i18n)
```

2. **Switching languages** dynamically:

```typescript
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

// Switch to English
locale.value = 'en'

// Switch to German
locale.value = 'de'
```

### Overriding Translations

You can override any library translation by providing your own values:

```typescript
const i18n = createI18n({
  locale: 'en',
  messages: {
    en: {
      ...defaultTranslations.en,
      // Override specific library translations
      general: {
        save: 'Save Changes', // Override 'Save' with 'Save Changes'
        unnamed: 'Untitled Item' // Override 'Unnamed' with 'Untitled Item'
      },
      // Override other sections as needed
      contentBlockEdit: {
        title: 'Main Heading'
      }
    }
  }
})
```

### Available Translation Keys

The library provides translations in German (`de`) and English (`en`) organized into the following sections:

- **general**: Common labels (save, unnamed, dash)
- **componentPalette**: Component palette labels
- **contentBlock**: Content block labels
- **contentBlockEdit**: Content block editing form labels
- **buttonTable**: Button table labels
- **metadataPanel**: SEO metadata form labels
- **projectExplore**: Project explore dialog labels

Refer to the `defaultTranslations` export for the complete list of available keys and their values.

## Usage

```typescript
import {
  CMSContentArea,
  CMSComponentPalette,
  CMSMetadataPanel,
  type ContentBlock,
  type ComponentType
} from '@particulatesolutions/cms-editor'
```

### Example

```vue
<script setup lang="ts">
import { ref } from 'vue'
import {
  CMSContentArea,
  CMSComponentPalette,
  type ContentBlock,
  type ComponentType
} from '@particulatesolutions/cms-editor'

// Define your component types (typically loaded from API)
const componentTypes = ref<ComponentType[]>([
  { id: '1', name: 'Text Block', type: 'text', icon: 'fa-align-left' },
  { id: '2', name: 'Image Block', type: 'image', icon: 'fa-image' },
  { id: '3', name: 'Projects', type: 'projects', icon: 'fa-list' },
])

// Define your content blocks
const contentBlocks = ref<ContentBlock[]>([
  {
    id: 'block-1',
    name: 'Welcome Section',
    componentType: 'text',
    order: 0,
    settings: {
      title: 'Welcome',
      text: 'This is a sample block',
      positioning: 'image-left',
      theme: 'light',
    },
  },
])

// Handle events emitted by components
function handleAddBlock(block: ContentBlock, index: number) {
  contentBlocks.value.splice(index, 0, block)
}

function handleRemoveBlock(blockId: string) {
  const index = contentBlocks.value.findIndex(b => b.id === blockId)
  if (index !== -1) {
    contentBlocks.value.splice(index, 1)
  }
}

function handleReorder(fromIndex: number, toIndex: number) {
  const [removed] = contentBlocks.value.splice(fromIndex, 1)
  contentBlocks.value.splice(toIndex, 0, removed)
}

function handleSaveBlock(blockId: string, formData: any) {
  const block = contentBlocks.value.find(b => b.id === blockId)
  if (block) {
    Object.assign(block.settings, formData)
  }
}
</script>

<template>
  <div class="cms-editor">
    <aside>
      <CMSComponentPalette :components="componentTypes" />
    </aside>
    <main>
      <CMSContentArea
        :blocks="contentBlocks"
        :components="componentTypes"
        @add:block="handleAddBlock"
        @remove:block="handleRemoveBlock"
        @reorder="handleReorder"
        @save:block="handleSaveBlock"
      />
    </main>
  </div>
</template>
```

### Component Architecture

The library follows a **props/events** pattern:
- Components accept data via **props**
- Components communicate changes via **emitted events**
- Parent application handles all state management and data persistence
- No internal state management library required

This design provides maximum flexibility and allows the parent application to integrate with any backend or state management solution.

### TypeScript Types

The library exports comprehensive TypeScript types for type-safe development:

- **ContentBlock** - Base interface for all content blocks (union type)
- **GenericContentBlock** - Standard content blocks with ContentBlockSettings
- **ProjectContentBlock** - Project listing blocks with ProjectSettings
- **ContentBlockSettings** - Settings for generic blocks (title, text, imageUrl, positioning, theme, buttons, etc.)
- **ProjectSettings** - Settings for project listing blocks (filters, sorting, display options)
- **ContentBlockFormValues** - Form data structure for editing generic blocks
- **ContentBlockButton** - Button configuration with icon, text, URL, type, and ariaLabel
- **ComponentType** - Available component types with id, name, type, and icon
- **ContentBlockPosition** - 'text-left' | 'image-left' | 'text-top' | 'image-top'
- **ContentBlockTheme** - 'light' | 'dark'

## Components

### CMSButtonTable
Manage buttons within content blocks with drag-and-drop reordering.

**Props:**
- `buttons: ContentBlockButton[]` - Array of button objects

**Emits:**
- `update:buttons` - When buttons are modified

### CMSComponentPalette
Drag-and-drop palette displaying available block types that can be dragged to the content area.

**Props:**
- `components: ComponentType[]` - Array of available component types

### CMSContentArea
Main canvas for composing pages. Handles drag-and-drop from the palette and reordering of existing blocks.

**Props:**
- `blocks: ContentBlock[]` - Array of content blocks
- `components: ComponentType[]` - Array of available component types
- `visible?: boolean` - Controls visibility of edit dialogs

**Emits:**
- `add:block(block: ContentBlock, index: number)` - When a block is added from palette
- `remove:block(blockId: string)` - When a block is removed
- `after:toggle-visibility(blockId: string, visibilityBefore: boolean, visibilityAfter: boolean)` - When block visibility is toggled
- `reorder(fromIndex: number, toIndex: number)` - When blocks are reordered
- `save:block(blockId: string, formData: ContentBlockFormValues)` - When block settings are saved
- `save:project-settings(blockId: string, settings: ProjectSettings)` - When project block settings are saved

### CMSContentBlock
Individual block renderer with edit, remove, and visibility toggle controls.

**Props:**
- `block: ContentBlock` - The content block to render
- `blockTypeName: string` - Display name of the block type

**Emits:**
- `edit` - When edit button is clicked
- `remove` - When remove button is clicked
- `toggle-visibility` - When visibility toggle is clicked

### CMSContentBlockEditDialog
Dialog for editing generic content block settings.

**Props:**
- `content-block: ContentBlock` - The block being edited
- `visible: boolean` - Controls dialog visibility

**Emits:**
- `update:visible` - When dialog visibility changes
- `save:block(blockId: string, formData: ContentBlockFormValues)` - When form is submitted

### CMSMetadataPanel
SEO metadata form for managing title, description, and Open Graph tags.

**Props:**
- `modelValue: any` - Current metadata object

**Emits:**
- `update:modelValue` - When metadata is updated

### CMSProjectExploreDialog
Dialog for configuring project listing blocks with filters, sorting, and display options.

**Props:**
- `content-block: ContentBlock` - The project block being edited
- `visible: boolean` - Controls dialog visibility

**Emits:**
- `update:visible` - When dialog visibility changes
- `save:project-settings(blockId: string, settings: ProjectSettings)` - When settings are saved

## Requirements

### Peer Dependencies
- Vue 3.5+
- PrimeVue 4.5+
- @primevue/themes 4.5+
- @primevue/forms 4.5+
- @primeuix/themes 2.0+
- @primeuix/styled (latest)
- @vueuse/integrations 14.0+
- zod 4.2+
- sortablejs 1.15+

### Bundled Dependencies
- vue-i18n 11.0+
- tailwindcss 4.1+ (self-contained, no setup required)
- @tailwindcss/vite 4.1+
- tailwindcss-primeui 0.6+

### Styling

This library uses **Tailwind CSS v4** for utility classes and styling. The compiled CSS bundle (`dist/index.css`) is **fully self-contained** and includes all necessary Tailwind utilities used by the components.

**Parent applications do NOT need to:**
- Install Tailwind CSS
- Configure Tailwind
- Include Tailwind in their build process

**Simply import the library's CSS:**
```typescript
import '@particulatesolutions/cms-editor/style.css'
```

The generated CSS is minimal (~2KB gzipped) and includes only the Tailwind utilities actually used by the components, plus component-specific styles.

## Development

This package includes a demo app for testing and developing components visually.

```bash
# Install dependencies
npm install

# Run demo app with hot reload (http://localhost:5173)
npm run dev

# Build library for distribution
npm run build

# Watch build mode (for local development with file: protocol)
npm run build:watch

# Run unit tests
npm run test:unit

# Type checking
npm run type-check

# Lint code
npm run lint
```

**Demo vs Library Build:**
- `npm run dev` - Runs the demo app (App.vue) with all components showcased
- `npm run build` - Builds only the library (from src/index.ts) to dist/
- Demo files (App.vue, main.ts) are never included in the published package
- The library has no internal state management (Pinia) - parent app manages state

## License

MIT
