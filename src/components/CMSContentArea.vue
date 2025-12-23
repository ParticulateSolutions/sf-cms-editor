<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { useGettext } from 'vue3-gettext'
import { useSortable } from '@vueuse/integrations/useSortable'
import type { ContentBlock } from '@/types/cms'
import Panel from 'primevue/panel'
import CMSContentBlock from './CMSContentBlock.vue'
import CMSContentBlockEditDialog from './CMSContentBlockEditDialog.vue'
import { storeToRefs } from 'pinia'
import { useCMSStore } from '@/stores/cms'
import CMSProjectExploreDialog from './CMSProjectExploreDialog.vue'

const { $gettext } = useGettext()
const cmsStore = useCMSStore()
const { removeBlock, cmsComponents } = cmsStore
const { contentBlocks } = storeToRefs(cmsStore)
contentBlocks.value = [
  {
    id: 'header-block',
    componentType: 'text',
    order: 0,
    fixed: true,
    settings: { name: 'Header Text', title: 'Header', buttons: [], theme: 'light', visible: true },
  },
  {
    id: 'footer-block',
    componentType: 'text',
    order: 1,
    fixed: true,
    settings: { name: 'Footer Text', title: 'Footer', buttons: [], theme: 'light', visible: true },
  },
]

const contentAreaRef = useTemplateRef('contentAreaRef')
let blockIdCounter = 0

useSortable(contentAreaRef, contentBlocks, {
  animation: 150,
  group: {
    name: 'content',
    pull: false,
    put: ['palette', 'content'], // Accept from palette AND other content areas
  },
  filter: '.fixed',
  onAdd: (evt) => {
    if (evt.from !== evt.to) {
      const newIndex = evt.newIndex ?? 0
      const component = cmsComponents[evt.oldIndex ?? 0]
      if (component == null) {
        return
      }

      const newBlock: ContentBlock = {
        id: `block-${blockIdCounter++}`,
        componentType: component.type,
        order: newIndex,
        settings: {
          name: component.name,
          positioning: 'image-left',
          buttons: [],
          theme: 'light',
        },
      }
      contentBlocks.value.splice(newIndex, 0, newBlock)
      if (evt.item.parentNode) {
        evt.item.parentNode.removeChild(evt.item)
      }
    }
  },
})

function getBlockTypeName(block: ContentBlock): string {
  const component = cmsComponents.find((comp) => comp.type === block.componentType)
  return component ? component.name : $gettext('Unbekannter Blocktyp')
}

defineExpose({ contentAreaRef })

const dialogVisible = ref(false)
const selectedBlock = ref<ContentBlock | null>(null)

function handleEdit(block: ContentBlock) {
  selectedBlock.value = block
  dialogVisible.value = true
}

</script>

<template>
  <Panel class="h-100">
    <div
      ref="contentAreaRef"
      class="content-blocks"
      :class="{ 'empty': contentBlocks.length === 0 }"
    >
      <CMSContentBlock
        v-for="block in contentBlocks"
        :key="block.id"
        :block="block"
        :block-type-name="getBlockTypeName(block)"
        @edit="handleEdit(block)"
        @remove="removeBlock"
        @toggle-visibility="block.settings.visible = !block.settings.visible"
      />
    </div>
  </Panel>

  <CMSContentBlockEditDialog
    v-if="selectedBlock && selectedBlock.componentType !== 'projects'"
    v-model:visible="dialogVisible"
    :content-block="selectedBlock"
  />

  <CMSProjectExploreDialog
    v-else-if="selectedBlock && selectedBlock.componentType === 'projects'"
    v-model:visible="dialogVisible"
    :content-block="selectedBlock"
  />
</template>

<style scoped lang="scss">
.content-blocks {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 200px;

  &.empty {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--bs-secondary);
    font-style: italic;
  }
}
</style>
