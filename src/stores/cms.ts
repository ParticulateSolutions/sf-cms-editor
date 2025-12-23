import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ComponentType, ContentBlock } from '@/types/cms'

export const useCMSStore = defineStore('cms', () => {
  const cmsComponents = ref<ComponentType[]>([])
  const contentBlocks = ref<ContentBlock[]>([])

  async function fetchCMSComponents() {
    cmsComponents.value = [
      { id: 'text-1', name: 'Text Block', type: 'text', icon: 'fa-regular fa-text' },
      { id: 'image-and-text', name: 'Bild + Text', type: 'image_text', icon: 'fa-regular fa-image' },
      { id: 'video', name: 'Video', type: 'video', icon: 'fa-brands fa-youtube' },
      { id: 'html', name: 'HTML', type: 'html', icon: 'fa-brands fa-html5' },
      { id: 'projects', name: 'Projekte', type: 'projects', icon: 'fa-solid fa-diagram-project' },
      { id: 'hero', name: 'Hero-Bereich', type: 'hero', icon: 'fa-regular fa-star' },
    ]
  }

  function removeBlock(blockId: string) {
    contentBlocks.value = contentBlocks.value.filter((block) => block.id !== blockId)
  }

  return {
    cmsComponents,
    fetchCMSComponents,
    contentBlocks,
    removeBlock,
  }
})
