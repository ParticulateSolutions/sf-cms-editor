<script setup lang="ts">
import { useGettext } from 'vue3-gettext'
import type { DataTableCellEditCompleteEvent } from 'primevue'
import Button from 'primevue/button'

const { $gettext } = useGettext()

type CMSButton = {
  icon: string
  text: string
  url: string
  type: string
  ariaLabel: string
}

const buttons = defineModel<CMSButton[]>({ required: true })

function onCellEditComplete(ev: DataTableCellEditCompleteEvent<CMSButton>) {
  const button = ev.data
  const field = ev.field as keyof CMSButton
  if (button && field in button) {
    button[field] = ev.newValue
  }
}

function addButton() {
  buttons.value.push({
    icon: '',
    text: '',
    url: '',
    type: '',
    ariaLabel: '',
  })
}
</script>

<template>
  <div>
    <div class="mb-2">
      <Button
        size="small"
        icon="fa-solid fa-plus"
        text
        :label="$gettext('Button hinzufügen')"
        @click="addButton"
      />
    </div>
    <DataTable
      :value="buttons"
      edit-mode="cell"
      show-gridlines
      @cell-edit-complete="onCellEditComplete"
    >
      <Column key="icon" field="icon" :header="$gettext('Icon')">
        <template #body="{ data }">
          <i v-if="data.icon" :class="data.icon" />
          <span v-else>{{ $gettext('-') }}</span>
        </template>
        <template #editor="slotProps">
          <InputText v-model="slotProps.data[slotProps.field]" class="w-100" />
        </template>
      </Column>
      <Column key="text" field="text" :header="$gettext('Buttontext')">
        <template #body="{ data }">
          <span>{{ data.text || '-' }}</span>
        </template>
        <template #editor="slotProps">
          <InputText v-model="slotProps.data[slotProps.field]" class="w-100" />
        </template>
      </Column>
      <Column key="url" field="url" :header="$gettext('URL')">
        <template #body="{ data }">
          <span>{{ data.url || '-' }}</span>
        </template>
        <template #editor="slotProps">
          <InputText v-model="slotProps.data[slotProps.field]" class="w-100" />
        </template>
      </Column>
      <Column key="type" field="type" :header="$gettext('Buttontyp')">
        <template #body="{ data }">
          <span>{{ data.type || '-' }}</span>
        </template>
        <template #editor="slotProps">
          <InputText v-model="slotProps.data[slotProps.field]" class="w-100" />
        </template>
      </Column>
      <Column key="ariaLabel" field="ariaLabel" :header="$gettext('Aria-Label')">
        <template #body="{ data }">
          <span>{{ data.ariaLabel || '-' }}</span>
        </template>
        <template #editor="slotProps">
          <InputText v-model="slotProps.data[slotProps.field]" class="w-100" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
