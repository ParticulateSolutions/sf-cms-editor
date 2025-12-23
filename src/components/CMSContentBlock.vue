<script setup lang="ts">
import { useGettext } from 'vue3-gettext'
import type { ContentBlock } from '@/types/cms'
import Button from 'primevue/button'

const { $gettext } = useGettext()

interface Props {
  block: ContentBlock
  blockTypeName: string
}
defineProps<Props>()

const emit = defineEmits<{
  remove: [blockId: string]
  edit: [blockId: string]
  toggleVisibility: [blockId: string]
}>()
</script>

<template>
  <div
    class="cms-component-block"
    :class="{ 'fixed': block.fixed }"
  >
    <div class="component-block-left">
      <i :class="{ 'fa-solid fa-bars': !block.fixed }" />
      <span>{{ block.settings.title || $gettext('Unbenannt') }}</span>
    </div>
    <div class="component-block-right">
      <span>{{ blockTypeName }}</span>
      <div class="actions">
        <Button
          v-if="!block.fixed"
          class="btn-minimal"
          :icon="'fa-regular fa-pen fs-5'"
          size="small"
          text
          @click="emit('edit', block.id)"
        />
        <Button
          v-if="!block.fixed"
          class="btn-minimal btn-sm"
          :icon="'fa-regular fa-trash-can fs-5'"
          size="small"
          text
          @click="emit('remove', block.id)"
        />
        <Button
          v-if="block.fixed"
          class="btn-minimal"
          size="small"
          text
          :icon="`fa-regular ${block.settings.visible ? 'fa-eye' : 'fa-eye-slash'} fs-5`"
          @click="emit('toggleVisibility', block.id)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cms-component-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--bs-border-color);
  border-radius: var(--bs-border-radius-sm);
  overflow: hidden;
  padding: 0.5rem 1rem;
  cursor: grab;

  i, .p-button-icon {
    font-size: 1.5rem;
    color: #1c085d;
  }

  .component-block-left {
    display: flex;
    align-items: center;

    i {
      width: 40px;
      text-align: left;
    }
  }

  .component-block-right {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .actions {
      width: 100px;
      display: flex;
      justify-content: right;
      gap: 0.25rem;
    }
  }
}
</style>
