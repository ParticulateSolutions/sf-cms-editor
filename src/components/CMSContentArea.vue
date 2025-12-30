<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { useSafeI18n } from '@/i18n'
import { useSortable } from '@vueuse/integrations/useSortable'
import type { ContentBlock, ComponentType, ContentBlockFormValues, ProjectSettings } from '@/types/cms'
import Panel from 'primevue/panel'
import CMSContentBlock from './CMSContentBlock.vue'
import CMSContentBlockEditDialog from './CMSContentBlockEditDialog.vue'
import CMSProjectExploreDialog from './CMSProjectExploreDialog.vue'

const { t } = useSafeI18n()

interface Props {
  blocks: ContentBlock[]
  components: ComponentType[]
}

const { blocks, components } = defineProps<Props>()

const emit = defineEmits<{
  'remove:block': [blockId: string]
  'after:toggle-visibility': [blockId: string, visibilityBefore: boolean, visibilityAfter: boolean]
  'add:block': [block: ContentBlock, index: number]
  'reorder': [fromIndex: number, toIndex: number]
  'save:block': [blockId: string, formData: ContentBlockFormValues]
  'save:project-settings': [blockId: string, settings: ProjectSettings]
}>()

const contentAreaRef = useTemplateRef('contentAreaRef')
let blockIdCounter = 0

useSortable(contentAreaRef, blocks, {
  animation: 150,
  group: {
    name: 'content',
    pull: false,
    put: ['palette', 'content'],
  },
  filter: '.fixed-block',
  onAdd: (evt) => {
    if (evt.from !== evt.to) {
      const newIndex = evt.newIndex ?? 0
      const component = components[evt.oldIndex ?? 0]
      if (component == null) {
        return
      }

      const newBlock: ContentBlock = {
        id: `block-${blockIdCounter++}`,
        name: component.name,
        componentType: component.type,
        order: newIndex,
        settings: {
          positioning: 'image-left',
          buttons: [],
          theme: 'light',
        },
      }
      emit('add:block', newBlock, newIndex)
      if (evt.item.parentNode) {
        evt.item.parentNode.removeChild(evt.item)
      }
    }
  },
  onEnd: (evt) => {
    blocks.forEach((block, index) => {
      block.order = index
    })
    if (evt.oldIndex !== undefined && evt.newIndex !== undefined && evt.oldIndex !== evt.newIndex) {
      emit('reorder', evt.oldIndex, evt.newIndex)
    }
  },
})

function getBlockTypeName(block: ContentBlock): string {
  const component = components.find((comp) => comp.type === block.componentType)
  return component ? component.name : t('contentBlock.unknownBlockType')
}

defineExpose({ contentAreaRef })

const dialogVisible = defineModel<boolean>('visible')
const selectedBlock = ref<ContentBlock | null>(null)

function handleEdit(block: ContentBlock) {
  selectedBlock.value = block
  dialogVisible.value = true
}

function handleRemove(blockId: string) {
  emit('remove:block', blockId)
}

function handleToggleVisibility(block: ContentBlock) {
  if ('visible' in block.settings) {
    const visibilityBefore = block.settings.visible ?? true
    block.settings.visible = !visibilityBefore
    const visibilityAfter = block.settings.visible
    emit('after:toggle-visibility', block.id, visibilityBefore, visibilityAfter)
  }
}

</script>

<template>
  <Panel class="h-100">
    <div
      ref="contentAreaRef"
      class="content-blocks"
      :class="{ 'empty': blocks.length === 0 }"
    >
      <CMSContentBlock
        v-for="block in blocks"
        :key="block.id"
        :block="block"
        :block-type-name="getBlockTypeName(block)"
        @edit="handleEdit(block)"
        @remove="handleRemove(block.id)"
        @toggle-visibility="handleToggleVisibility(block)"
      />
    </div>
  </Panel>

  <CMSContentBlockEditDialog
    v-if="selectedBlock && selectedBlock.componentType !== 'projects'"
    v-model:visible="dialogVisible"
    :content-block="selectedBlock"
    @save:block="(blockId, formData) => $emit('save:block', blockId, formData)"
  />

  <CMSProjectExploreDialog
    v-else-if="selectedBlock && selectedBlock.componentType === 'projects'"
    v-model:visible="dialogVisible"
    :content-block="selectedBlock"
    @save:project-settings="(blockId, settings) => $emit('save:project-settings', blockId, settings)"
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
    color: #6c757d;
    font-style: italic;
  }
}
</style>
