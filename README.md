# @socialfunders/cms-editor

**⚠️ Internal Package:** This package contains CMS editor components for the Socialfunders platform. While publicly available on npm, it's not designed for external use and requires Socialfunders backend infrastructure.

## Installation

```bash
npm install @socialfunders/cms-editor
```

## Usage

```typescript
import {
  CMSContentArea,
  CMSComponentPalette,
  CMSMetadataPanel,
  useCMSStore,
  type ContentBlock
} from '@socialfunders/cms-editor'
```

### Example

```vue
<script setup lang="ts">
import { CMSContentArea, CMSComponentPalette, useCMSStore } from '@socialfunders/cms-editor'

const cmsStore = useCMSStore()

// Load available component types
await cmsStore.fetchCMSComponents()
</script>

<template>
  <div class="cms-editor">
    <aside>
      <CMSComponentPalette />
    </aside>
    <main>
      <CMSContentArea />
    </main>
  </div>
</template>
```

## Components

- **CMSButtonTable** - Manage buttons within content blocks
- **CMSComponentPalette** - Drag-and-drop palette of available block types
- **CMSContentArea** - Main canvas for composing pages
- **CMSContentBlock** - Individual block renderer
- **CMSContentBlockEditDialog** - Edit block content/settings
- **CMSMetadataPanel** - SEO metadata form (title, description, OG)
- **CMSProjectExploreDialog** - Project listing block configuration

## Requirements

- Vue 3.5+
- Pinia 3.0+
- PrimeVue 4.5+
- vue3-gettext 4.0+
- @vueuse/integrations 14.0+
- zod 4.2+
- sortablejs 1.15+

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
```

**Demo vs Library Build:**
- `npm run dev` - Runs the demo app (App.vue) with all components showcased
- `npm run build` - Builds only the library (from src/index.ts) to dist/
- Demo files (App.vue, main.ts, router) are never included in the published package

## License

MIT
