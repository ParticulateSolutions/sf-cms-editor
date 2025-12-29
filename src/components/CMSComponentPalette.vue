<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useSafeI18n } from '@/i18n'
import { useSortable } from '@vueuse/integrations/useSortable'
import Panel from 'primevue/panel'
import type { ComponentType } from '@/types/cms'

const { t } = useSafeI18n()

interface Props {
  components: ComponentType[]
}

const { components } = defineProps<Props>()

const paletteRef = useTemplateRef('paletteRef')

useSortable(paletteRef, components, {
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
  <Panel :header="t('componentPalette.availableElements')" class="h-100">
    <div ref="paletteRef" class="cms-component-palette">
      <div
        v-for="component in components"
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
