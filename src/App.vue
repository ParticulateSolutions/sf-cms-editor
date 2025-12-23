<script setup lang="ts">
import { ref } from 'vue'
import CMSContentArea from './components/CMSContentArea.vue'
import CMSComponentPalette from './components/CMSComponentPalette.vue'
import CMSMetadataPanel from './components/CMSMetadataPanel.vue'
import { useCMSStore } from './stores/cms'

const cmsStore = useCMSStore()

// Mock fetchCMSComponents for demo
cmsStore.cmsComponents = [
  { id: '1', name: 'Text Block', type: 'text', icon: 'fa-solid fa-align-left' },
  { id: '2', name: 'Image Block', type: 'image', icon: 'fa-solid fa-image' },
  { id: '3', name: 'Text + Image', type: 'text-image', icon: 'fa-solid fa-columns' },
  { id: '4', name: 'Projects', type: 'projects', icon: 'fa-solid fa-list' }
]

const activeTab = ref<'editor' | 'metadata'>('editor')
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
            <CMSComponentPalette />
          </div>
        </aside>

        <section class="col-lg-9 col-md-8">
          <div class="bg-white rounded p-3 shadow d-flex flex-column h-100">
            <h2 class="mb-3 fs-5">Page Content</h2>
            <CMSContentArea />
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
