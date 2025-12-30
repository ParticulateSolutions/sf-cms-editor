<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Dialog } from 'primevue'
import Button from 'primevue/button'
import type { ProjectSettings, ISelectOption, ContentBlock } from '@/types/cms'

const { t } = useI18n()

const visible = defineModel<boolean>('visible')

const props = defineProps<{
  contentBlock: ContentBlock | null
}>()

const emit = defineEmits<{
  'save:project-settings': [blockId: string, settings: ProjectSettings]
}>()

const projectTypeOptions: ISelectOption<'donation' | 'voting'>[] = [
  { label: t('projectExplore.donationProjects'), value: 'donation' },
  { label: t('projectExplore.votingProjects'), value: 'voting' },
]

const viewOptions: ISelectOption<'list' | 'map'>[] = [
  { label: t('projectExplore.listView'), value: 'list' },
  { label: t('projectExplore.mapView'), value: 'map' },
]

const sortOptions: ISelectOption<'az' | 'za' | 'newest' | 'oldest' | 'random'>[] = [
  { label: t('projectExplore.sortAZ'), value: 'az' },
  { label: t('projectExplore.sortZA'), value: 'za' },
  { label: t('projectExplore.sortNewest'), value: 'newest' },
  { label: t('projectExplore.sortOldest'), value: 'oldest' },
  { label: t('projectExplore.sortRandom'), value: 'random' },
]

const formData = computed(() => ({
  projectType: 'donation' as const,
  overtitle: '',
  title: '',
  showInPageNav: false,
  useStandardConfig: true,
  includePublicProjects: false,
  includeArchivedProjects: false,
  redirectToDedicatedPages: false,
  showSearch: false,
  showCategoryFilter: false,
  showStatusFilter: false,
  initialFilterEndedProjects: false,
  advancedFilterRules: '',
  startView: 'list' as const,
  initialSort: 'az' as const,
  initialVisibleProjects: 12,
}))

function onSave() {
  if (!props.contentBlock) return
  emit('save:project-settings', props.contentBlock.id, formData.value)
  visible.value = false
}
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    :closable="false"
    class="w-3/4 rounded-2xl"
  >
    <template #header>
      <div class="flex justify-end w-full">
        <Button
          icon="fa-solid fa-xmark"
          text
          rounded
          @click="visible = false"
        />
      </div>
    </template>

    <div class="flex flex-col gap-4 m-3">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div class="lg:col-span-4 col-span-12">
          <label for="projectType">{{ t('projectExplore.projectType') }}</label>
        </div>
        <div class="lg:col-span-8 col-span-12">
          <Select
            id="projectType"
            v-model="formData.projectType"
            option-label="label"
            option-value="value"
            class="w-full"
            :options="projectTypeOptions"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div class="lg:col-span-4 col-span-12">
          <label for="overtitle">{{ t('contentBlockEdit.overtitle') }}</label>
        </div>
        <div class="lg:col-span-8 col-span-12">
          <div class="flex">
            <div class="overtitle-input-container">
              <InputText id="overtitle" v-model="formData.overtitle" class="w-full" />
            </div>
            <div class="in-page-nav-container flex">
              <ToggleSwitch id="showInPageNavToggle" v-model="formData.showInPageNav" />
              <label for="showInPageNavToggle" class="ms-2">{{ t('projectExplore.showInPageNav') }}</label>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div class="lg:col-span-4 col-span-12">
          <label for="title">{{ t('contentBlockEdit.title') }}</label>
        </div>
        <div class="lg:col-span-8 col-span-12">
          <InputText v-model="formData.title" class="w-full" />
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div class="lg:col-span-4 col-span-12">
          <label>{{ t('projectExplore.configuration') }}</label>
        </div>
        <div class="lg:col-span-8 col-span-12">
          <div class="flex items-center">
            <ToggleSwitch v-model="formData.useStandardConfig" />
            <label class="ms-2">{{ t('projectExplore.useStandardConfig') }}</label>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div class="lg:col-span-4 col-span-12">
          <label>{{ t('projectExplore.projectSelection') }}</label>
        </div>
        <div class="lg:col-span-8 col-span-12">
          <div class="flex flex-col gap-3">
            <div class="flex items-center">
              <ToggleSwitch v-model="formData.includePublicProjects" :disabled="formData.useStandardConfig" />
              <label class="ms-2">{{ t('projectExplore.includePublicProjects') }}</label>
            </div>
            <div class="flex items-center">
              <ToggleSwitch v-model="formData.includeArchivedProjects" :disabled="formData.useStandardConfig" />
              <label class="ms-2">{{ t('projectExplore.includeArchivedProjects') }}</label>
            </div>
            <div class="flex items-center">
              <ToggleSwitch v-model="formData.redirectToDedicatedPages" :disabled="formData.useStandardConfig" />
              <label class="ms-2">{{ t('projectExplore.redirectToDedicatedPages') }}</label>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div class="lg:col-span-4 col-span-12">
          <label>{{ t('projectExplore.visibleFiltering') }}</label>
        </div>
        <div class="lg:col-span-8 col-span-12">
          <div class="flex flex-col gap-3">
            <div class="flex items-center">
              <ToggleSwitch v-model="formData.showSearch" :disabled="formData.useStandardConfig" />
              <label class="ms-2">{{ t('projectExplore.showSearch') }}</label>
            </div>
            <div class="flex items-center">
              <ToggleSwitch v-model="formData.showCategoryFilter" :disabled="formData.useStandardConfig" />
              <label class="ms-2">{{ t('projectExplore.showCategoryFilter') }}</label>
            </div>
            <div class="flex items-center">
              <ToggleSwitch v-model="formData.showStatusFilter" :disabled="formData.useStandardConfig" />
              <label class="ms-2">{{ t('projectExplore.showStatusFilter') }}</label>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div class="lg:col-span-4 col-span-12">
          <label>{{ t('projectExplore.invisibleFiltering') }}</label>
        </div>
        <div class="lg:col-span-8 col-span-12">
          <div class="flex items-center">
            <ToggleSwitch v-model="formData.initialFilterEndedProjects" :disabled="formData.useStandardConfig" />
            <label class="ms-2">{{ t('projectExplore.initialFilterEndedProjects') }}</label>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div class="lg:col-span-4 col-span-12">
          <label for="advancedFilterRules">{{ t('projectExplore.advancedFilterRules') }}</label>
        </div>
        <div class="lg:col-span-8 col-span-12">
          <Textarea
            v-model="formData.advancedFilterRules"
            class="w-full"
            rows="5"
            :disabled="formData.useStandardConfig"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div class="lg:col-span-4 col-span-12">
          <label for="startView">{{ t('projectExplore.startView') }}</label>
        </div>
        <div class="lg:col-span-8 col-span-12">
          <Select
            v-model="formData.startView"
            option-label="label"
            option-value="value"
            class="w-full"
            :options="viewOptions"
            :disabled="formData.useStandardConfig"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div class="lg:col-span-4 col-span-12">
          <label for="initialSort">{{ t('projectExplore.initialSort') }}</label>
        </div>
        <div class="lg:col-span-8 col-span-12">
          <Select
            v-model="formData.initialSort"
            option-label="label"
            option-value="value"
            class="w-full"
            :options="sortOptions"
            :disabled="formData.useStandardConfig"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div class="lg:col-span-4 col-span-12">
          <label for="initialVisibleProjects">{{ t('projectExplore.initialVisibleProjects') }}</label>
        </div>
        <div class="lg:col-span-8 col-span-12">
          <InputNumber
            v-model="formData.initialVisibleProjects"
            class="w-full"
            :disabled="formData.useStandardConfig"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div class="col-span-12 flex justify-end">
          <Button
            :label="t('general.save')"
            @click="onSave"
          />
        </div>
      </div>
    </div>
  </Dialog>
</template>

<style scoped lang="scss">
.in-page-nav-container {
  display: flex;
  align-items: center;
  white-space: nowrap;
  margin-left: 0.5rem;
}

.overtitle-input-container {
  flex: 1;
}
</style>
