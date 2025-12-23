<script setup lang="ts">
import { ref } from 'vue'
import { useGettext } from 'vue3-gettext'
import { Dialog } from 'primevue'
import Button from 'primevue/button'

const { $gettext } = useGettext()

const visible = defineModel<boolean>('visible')

const projectTypeOptions = [
  { label: $gettext('Spendenprojekte'), value: 'donation' },
  { label: $gettext('Votingprojekte'), value: 'voting' },
]

const viewOptions = [
  { label: $gettext('Listenansicht'), value: 'list' },
  { label: $gettext('Kartenansicht'), value: 'map' },
]

const sortOptions = [
  { label: $gettext('A-Z'), value: 'az' },
  { label: $gettext('Z-A'), value: 'za' },
  { label: $gettext('Neuste'), value: 'newest' },
  { label: $gettext('Älteste'), value: 'oldest' },
  { label: $gettext('Zufällig'), value: 'random' },
]

const formData = ref({
  projectType: 'donation',
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
  startView: 'list',
  initialSort: 'az',
  initialVisibleProjects: 12,
})

function onSave() {
  console.log('Saving:', formData.value)
  visible.value = false
}
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    :closable="false"
    class="w-75 rounded-4"
  >
    <template #header>
      <div class="d-flex justify-content-end w-100">
        <Button
          icon="fa-solid fa-xmark"
          text
          rounded
          @click="visible = false"
        />
      </div>
    </template>

    <div class="d-flex flex-column gap-4 m-3">
      <div class="row">
        <div class="col-lg-4 col-12">
          <label for="projectType">{{ $gettext('Art der Projekte') }}</label>
        </div>
        <div class="col-lg-8 col-12">
          <Select
            id="projectType"
            v-model="formData.projectType"
            option-label="label"
            option-value="value"
            class="w-100"
            :options="projectTypeOptions"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-12">
          <label for="overtitle">{{ $gettext('Vortitel') }}</label>
        </div>
        <div class="col-lg-8 col-12">
          <div class="d-flex">
            <div class="overtitle-input-container">
              <InputText id="overtitle" v-model="formData.overtitle" class="w-100" />
            </div>
            <div class="in-page-nav-container d-flex">
              <ToggleSwitch id="showInPageNavToggle" v-model="formData.showInPageNav" />
              <label for="showInPageNavToggle" class="ms-2">{{ $gettext('In Seitenmenü listen') }}</label>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-12">
          <label for="title">{{ $gettext('Überschrift 1') }}</label>
        </div>
        <div class="col-lg-8 col-12">
          <InputText v-model="formData.title" class="w-100" />
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-12">
          <label>{{ $gettext('Konfiguration') }}</label>
        </div>
        <div class="col-lg-8 col-12">
          <div class="d-flex align-items-center">
            <ToggleSwitch v-model="formData.useStandardConfig" />
            <label class="ms-2">{{ $gettext('Standardkonfiguration verwenden') }}</label>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-12">
          <label>{{ $gettext('Projektauswahl und Verhalten') }}</label>
        </div>
        <div class="col-lg-8 col-12">
          <div class="d-flex flex-column gap-3">
            <div class="d-flex align-items-center">
              <ToggleSwitch v-model="formData.includePublicProjects" :disabled="formData.useStandardConfig" />
              <label class="ms-2">{{ $gettext('Öffentliche Projekte inkludieren') }}</label>
            </div>
            <div class="d-flex align-items-center">
              <ToggleSwitch v-model="formData.includeArchivedProjects" :disabled="formData.useStandardConfig" />
              <label class="ms-2">{{ $gettext('Archivierte Projekte inkludieren') }}</label>
            </div>
            <div class="d-flex align-items-center">
              <ToggleSwitch v-model="formData.redirectToDedicatedPages" :disabled="formData.useStandardConfig" />
              <label class="ms-2">{{ $gettext('Weiterleitung auf dedizierte Projektseiten aktivieren') }}</label>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-12">
          <label>{{ $gettext('Sichtbare Filterung') }}</label>
        </div>
        <div class="col-lg-8 col-12">
          <div class="d-flex flex-column gap-3">
            <div class="d-flex align-items-center">
              <ToggleSwitch v-model="formData.showSearch" :disabled="formData.useStandardConfig" />
              <label class="ms-2">{{ $gettext('Suche anzeigen') }}</label>
            </div>
            <div class="d-flex align-items-center">
              <ToggleSwitch v-model="formData.showCategoryFilter" :disabled="formData.useStandardConfig" />
              <label class="ms-2">{{ $gettext('Kategoriefilter anzeigen') }}</label>
            </div>
            <div class="d-flex align-items-center">
              <ToggleSwitch v-model="formData.showStatusFilter" :disabled="formData.useStandardConfig" />
              <label class="ms-2">{{ $gettext('Statusfilter anzeigen') }}</label>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-12">
          <label>{{ $gettext('Unsichtbare Filterung') }}</label>
        </div>
        <div class="col-lg-8 col-12">
          <div class="d-flex align-items-center">
            <ToggleSwitch v-model="formData.initialFilterEndedProjects" :disabled="formData.useStandardConfig" />
            <label class="ms-2">{{ $gettext('Beendete Projekte initial herausfiltern') }}</label>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-12">
          <label for="advancedFilterRules">{{ $gettext('Erweiterte Filterregeln') }}</label>
        </div>
        <div class="col-lg-8 col-12">
          <Textarea
            v-model="formData.advancedFilterRules"
            class="w-100"
            rows="5"
            :disabled="formData.useStandardConfig"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-12">
          <label for="startView">{{ $gettext('Startansicht') }}</label>
        </div>
        <div class="col-lg-8 col-12">
          <Select
            v-model="formData.startView"
            option-label="label"
            option-value="value"
            class="w-100"
            :options="viewOptions"
            :disabled="formData.useStandardConfig"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-12">
          <label for="initialSort">{{ $gettext('Initiale Listensortierung') }}</label>
        </div>
        <div class="col-lg-8 col-12">
          <Select
            v-model="formData.initialSort"
            option-label="label"
            option-value="value"
            class="w-100"
            :options="sortOptions"
            :disabled="formData.useStandardConfig"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-12">
          <label for="initialVisibleProjects">{{ $gettext('Anzahl initial sichtbarer Projekte') }}</label>
        </div>
        <div class="col-lg-8 col-12">
          <InputNumber
            v-model="formData.initialVisibleProjects"
            class="w-100"
            :disabled="formData.useStandardConfig"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-12 d-flex justify-content-end">
          <Button
            :label="$gettext('Speichern')"
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
