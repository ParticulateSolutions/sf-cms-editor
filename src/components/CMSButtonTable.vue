<script setup lang="ts">
import { useSafeI18n } from '@/i18n'
import type { DataTableCellEditCompleteEvent } from 'primevue'
import Button from 'primevue/button'

const { t } = useSafeI18n()

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
        :label="t('buttonTable.addButton')"
        @click="addButton"
      />
    </div>
    <DataTable
      :value="buttons"
      edit-mode="cell"
      show-gridlines
      @cell-edit-complete="onCellEditComplete"
    >
      <Column key="icon" field="icon" :header="t('buttonTable.icon')">
        <template #body="{ data }">
          <i v-if="data.icon" :class="data.icon" />
          <span v-else>{{ t('general.dash') }}</span>
        </template>
        <template #editor="slotProps">
          <InputText v-model="slotProps.data[slotProps.field]" class="w-100" />
        </template>
      </Column>
      <Column key="text" field="text" :header="t('buttonTable.buttonText')">
        <template #body="{ data }">
          <span>{{ data.text || '-' }}</span>
        </template>
        <template #editor="slotProps">
          <InputText v-model="slotProps.data[slotProps.field]" class="w-100" />
        </template>
      </Column>
      <Column key="url" field="url" :header="t('buttonTable.url')">
        <template #body="{ data }">
          <span>{{ data.url || '-' }}</span>
        </template>
        <template #editor="slotProps">
          <InputText v-model="slotProps.data[slotProps.field]" class="w-100" />
        </template>
      </Column>
      <Column key="type" field="type" :header="t('buttonTable.buttonType')">
        <template #body="{ data }">
          <span>{{ data.type || '-' }}</span>
        </template>
        <template #editor="slotProps">
          <InputText v-model="slotProps.data[slotProps.field]" class="w-100" />
        </template>
      </Column>
      <Column key="ariaLabel" field="ariaLabel" :header="t('buttonTable.ariaLabel')">
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
