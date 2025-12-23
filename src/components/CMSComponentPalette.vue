<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useGettext } from 'vue3-gettext'
import { useSortable } from '@vueuse/integrations/useSortable'
import Panel from 'primevue/panel'
import { storeToRefs } from 'pinia'
import { useCMSStore } from '@/stores/cms'

const { $gettext } = useGettext()

const cmsStore = useCMSStore()
const { fetchCMSComponents } = useCMSStore()
const { cmsComponents } = storeToRefs(cmsStore)
fetchCMSComponents()

const paletteRef = useTemplateRef('paletteRef')

useSortable(paletteRef, cmsComponents, {
  group: {
    name: 'palette',
    pull: 'clone',
    put: false,
  },
  sort: false,
})

defineExpose({ paletteRef })
</script>

<template>
  <Panel :header="$gettext('Verfügbare Elemente')" class="h-100">
    <div ref="paletteRef" class="cms-component-palette">
      <div
        v-for="component in cmsComponents"
        :key="component.id"
        class="cms-component"
      >
        <div class="component-name-container">
          <i :class="component.icon" class="component-icon" />
          <span>{{ component.name }}</span>
        </div>
        <i class="fa-sharp fa-solid fa-grip-dots" />
      </div>
    </div>
  </Panel>
</template>

<style scoped lang="scss">
.cms-component-palette {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.cms-component {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--bs-border-color);
  border-radius: var(--bs-border-radius-sm);
  overflow: hidden;
  padding-right: 0.5rem;
  cursor: grab;

  &:hover {
    background-color: var(--bs-light);
  }
}

.component-name-container {
  display: flex;
  align-items: center;
  height: 36px;
  gap: 0.5rem;

  .component-icon {
    width: 36px;
    background-color: #1c085d;
    color: white;
    height: 100%;
    align-content: center;
  }
}
</style>
