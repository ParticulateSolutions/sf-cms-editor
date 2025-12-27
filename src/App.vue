<script setup lang="ts">
import { ref } from 'vue'
import CMSContentArea from './components/CMSContentArea.vue'
import CMSComponentPalette from './components/CMSComponentPalette.vue'
import CMSMetadataPanel from './components/CMSMetadataPanel.vue'
import type { ContentBlock, ComponentType, ContentBlockFormValues, ProjectSettings } from './types/cms'

const activeTab = ref<'editor' | 'metadata'>('editor')

// Mock components for demo
const components: ComponentType[] = [
  { id: '1', name: 'Text Block', type: 'text', icon: 'fa-solid fa-align-left' },
  { id: '2', name: 'Image Block', type: 'image', icon: 'fa-solid fa-image' },
  { id: '3', name: 'Text + Image', type: 'text-image', icon: 'fa-solid fa-columns' },
  { id: '4', name: 'Projects', type: 'projects', icon: 'fa-solid fa-list' }
]

// Mock blocks for demo
const blocks = ref<ContentBlock[]>([
  {
    id: 'header-block',
    name: 'Header Text',
    componentType: 'text',
    order: 0,
    fixed: true,
    settings: { title: 'Header', buttons: [], theme: 'light', visible: true },
  },
  {
    id: 'footer-block',
    name: 'Footer Text',
    componentType: 'text',
    order:1,
    fixed: true,
    settings: { title: 'Footer', buttons: [], theme: 'light', visible: true },
  },
])

function handleAddBlock(block: ContentBlock, index: number) {
  blocks.value.splice(index, 0, block)
  // In a real app, you would call: await api.addBlock(block, index)
}

function handleRemoveBlock(blockId: string) {
  const blockIndex = blocks.value.findIndex(b => b.id === blockId)
  if (blockIndex !== -1) {
    blocks.value.splice(blockIndex, 1)
  }
  // In a real app, you would call: await api.removeBlock(blockId)
}

function handleToggleVisibility(blockId: string, visibilityBefore: boolean, visibilityAfter: boolean) {
  console.log(`Block ${blockId} visibility toggled: ${visibilityBefore} → ${visibilityAfter}`)
  // In a real app, you would call: await api.updateBlockVisibility(blockId, visibilityAfter)
}

function handleSaveBlock(blockId: string, formData: ContentBlockFormValues) {
  const block = blocks.value.find(b => b.id === blockId)
  if (block && block.componentType !== 'projects') {
    // Update settings for generic content blocks
    const currentVisible = 'visible' in block.settings ? block.settings.visible : true
    block.settings = {
      overtitle: formData.overtitle,
      title: formData.title,
      text: formData.text,
      imageUrl: formData.imageUrl,
      positioning: formData.positioning,
      theme: formData.theme,
      cssClasses: formData.cssClasses,
      showInPageNavigation: formData.showInPageNavigation,
      buttons: formData.buttons,
      visible: currentVisible,
    }
  }
  // In a real app, you would call: await api.updateBlock(blockId, formData)
}

function handleSaveProjectSettings(blockId: string, settings: ProjectSettings) {
  const block = blocks.value.find(b => b.id === blockId)
  if (block && block.componentType === 'projects') {
    // Update settings for project content blocks
    block.settings = settings
  }
  // In a real app, you would call: await api.updateProjectSettings(blockId, settings)
}

function handleReorder(fromIndex: number, toIndex: number) {
  console.log(`Reordered block from ${fromIndex} to ${toIndex}`)
}
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <header class="demo-header">
      <h1>@socialfunders/cms-editor Demo</h1>
      <p>Interactive preview of CMS editor components</p>
      <div class="tabs">
        <button
          :class="{ active: activeTab === 'editor' }"
          @click="activeTab = 'editor'"
        >
          Page Editor
        </button>
        <button
          :class="{ active: activeTab === 'metadata' }"
          @click="activeTab = 'metadata'"
        >
          Page Metadata
        </button>
      </div>
    </header>

    <main class="flex-grow-1 p-4 bg-light">
      <div v-if="activeTab === 'editor'" class="row g-4 h-100">
        <aside class="col-lg-3 col-md-4">
          <div class="bg-white rounded p-3 shadow d-flex flex-column h-100">
            <h2 class="mb-3 fs-5">Components</h2>
            <CMSComponentPalette :components="components" />
          </div>
        </aside>

        <section class="col-lg-9 col-md-8">
          <div class="bg-white rounded p-3 shadow d-flex flex-column h-100">
            <h2 class="mb-3 fs-5">Page Content</h2>
            <CMSContentArea
              :blocks="blocks"
              :components="components"
              @add:block="handleAddBlock"
              @remove:block="handleRemoveBlock"
              @after:toggle-visibility="handleToggleVisibility"
              @save:block="handleSaveBlock"
              @save:project-settings="handleSaveProjectSettings"
              @reorder="handleReorder"
            />
          </div>
        </section>
      </div>

      <div v-else class="mx-auto" style="max-width: 800px;">
        <div class="bg-white rounded p-4 shadow">
          <CMSMetadataPanel />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.demo-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.demo-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
}

.demo-header p {
  margin: 0 0 1.5rem 0;
  opacity: 0.9;
}

.tabs {
  display: flex;
  gap: 0.5rem;
}

.tabs button {
  background: rgba(255,255,255,0.2);
  color: white;
  border: 2px solid transparent;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.tabs button:hover {
  background: rgba(255,255,255,0.3);
}

.tabs button.active {
  background: white;
  color: #667eea;
  border-color: white;
}
</style>
