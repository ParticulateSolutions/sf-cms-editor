<script setup lang="ts">
import { ref, watch, useTemplateRef, computed } from 'vue'
import { useSafeI18n } from '@/i18n'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import z from 'zod'
import type { ContentBlockPosition, ContentBlockTheme, ISelectOption, ContentBlockFormValues, ContentBlockButton, ContentBlockSettings, GenericContentBlock } from '@/types/cms'
import type { FormInstance, FormSubmitEvent } from '@primevue/forms'
import CMSButtonTable from './CMSButtonTable.vue'

const { t } = useSafeI18n()

const visible = defineModel<boolean>('visible')
const props = defineProps<{
  contentBlock: GenericContentBlock | null
}>()

const emit = defineEmits<{
  'save:block': [blockId: string, formData: ContentBlockFormValues]
}>()

const formRef = useTemplateRef<FormInstance>('formRef')

const formSchema = z.object({
  overtitle: z.string().optional(),
  title: z.string(),
  text: z.string().optional(),
  imageUrl: z.string().optional(),
  positioning: z.string(),
  theme: z.string(),
  cssClasses: z.string().optional(),
  showInPageNavigation: z.boolean(),
})
const resolver = zodResolver(formSchema)

const buttons = ref<ContentBlockButton[]>([{
  icon: '',
  text: '',
  url: '',
  type: 'primary',
  ariaLabel: '',
}])

const positionOptions: ISelectOption<ContentBlockPosition>[] = [
  { label: t('contentBlockEdit.positionTextLeft'), value: 'text-left' },
  { label: t('contentBlockEdit.positionImageLeft'), value: 'image-left' },
  { label: t('contentBlockEdit.positionTextTop'), value: 'text-top' },
  { label: t('contentBlockEdit.positionImageTop'), value: 'image-top' },
]

const themeOptions: ISelectOption<ContentBlockTheme>[] = [
  { label: t('contentBlockEdit.themeLight'), value: 'light' },
  { label: t('contentBlockEdit.themeDark'), value: 'dark' },
]

const initialValues = computed<ContentBlockSettings>(() => ({
  overtitle: props.contentBlock?.settings.overtitle || '',
  title: props.contentBlock?.settings.title || '',
  text: props.contentBlock?.settings.text || '',
  imageUrl: props.contentBlock?.settings.imageUrl || '',
  positioning: props.contentBlock?.settings.positioning || 'text-left',
  theme: props.contentBlock?.settings.theme || 'light',
  cssClasses: props.contentBlock?.settings.cssClasses || '',
  showInPageNavigation: props.contentBlock?.settings.showInPageNavigation || false,
}))

watch(() => props.contentBlock, () => {
  formRef.value?.reset()
}, { immediate: true })

function onSubmit (event: FormSubmitEvent) {
  if (!props.contentBlock) return
  
  const formData = event.values as ContentBlockFormValues
  emit('save:block', props.contentBlock.id, {
    ...formData,
    buttons: buttons.value,
  })
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

    <Form
      v-slot="$form"
      ref="formRef"
      :resolver="resolver"
      :initial-values="initialValues"
      class="flex flex-col gap-4 m-3"
      @submit="onSubmit"
    >
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div class="lg:col-span-4 col-span-12">
          <label for="overtitle">{{ t('contentBlockEdit.overtitle') }}</label>
        </div>
        <div class="lg:col-span-8 col-span-12">
          <div class="flex">
            <div class="overtitle-input-container">
              <InputText name="overtitle" class="w-full" />
              <Message v-if="$form.overtitle?.invalid" severity="error" size="small" variant="simple">
                {{ $form.overtitle.error.message }}
              </Message>
            </div>

            <div class="in-page-nav-container flex">
              <ToggleSwitch name="showInPageNav" />
              <label for="showInPageNav" class="ms-2">{{ t('contentBlockEdit.showInPageNav') }}</label>
              <Message v-if="$form.showInPageNav?.invalid" severity="error" size="small" variant="simple">
                {{ $form.showInPageNav.error.message }}
              </Message>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div class="lg:col-span-4 col-span-12">
          <label for="title">{{ t('contentBlockEdit.title') }}</label>
        </div>
        <div class="lg:col-span-8 col-span-12">
          <InputText name="title" class="w-full" />
          <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">
            {{ $form.title.error.message }}
          </Message>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div class="lg:col-span-4 col-span-12">
          <label for="text">{{ t('contentBlockEdit.text') }}</label>
        </div>
        <div class="lg:col-span-8 col-span-12">
          <Textarea name="text" class="w-full" rows="5" />
          <Message v-if="$form.text?.invalid" severity="error" size="small" variant="simple">
            {{ $form.text.error.message }}
          </Message>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div class="lg:col-span-4 col-span-12">
          <label for="image">{{ t('contentBlockEdit.image') }}</label>
        </div>
        <div class="lg:col-span-8 col-span-12">
          <InputText name="image" class="w-full" />
          <Message v-if="$form.image?.invalid" severity="error" size="small" variant="simple">
            {{ $form.image.error.message }}
          </Message>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div class="lg:col-span-4 col-span-12">
          <label for="positioning">{{ t('contentBlockEdit.positioning') }}</label>
        </div>
        <div class="lg:col-span-8 col-span-12">
          <Select
            name="positioning"
            option-label="label"
            option-value="value"
            class="w-full"
            :options="positionOptions"
          />
          <Message v-if="$form.positioning?.invalid" severity="error" size="small" variant="simple">
            {{ $form.positioning.error.message }}
          </Message>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div class="lg:col-span-4 col-span-12">
          <label for="buttons">{{ t('contentBlockEdit.buttons') }}</label>
        </div>
        <div class="lg:col-span-8 col-span-12">
          <CMSButtonTable v-model="buttons" />
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div class="lg:col-span-4 col-span-12">
          <label for="theme">{{ t('contentBlockEdit.color') }}</label>
        </div>
        <div class="lg:col-span-8 col-span-12">
          <Select
            name="theme"
            option-label="label"
            option-value="value"
            class="w-full"
            :options="themeOptions"
          />
          <Message v-if="$form.theme?.invalid" severity="error" size="small" variant="simple">
            {{ $form.theme.error.message }}
          </Message>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div class="lg:col-span-4 col-span-12">
          <label for="cssClasses">{{ t('contentBlockEdit.cssClasses') }}</label>
        </div>
        <div class="lg:col-span-8 col-span-12">
          <InputText name="cssClasses" class="w-full" />
          <Message v-if="$form.cssClasses?.invalid" severity="error" size="small" variant="simple">
            {{ $form.cssClasses.error.message }}
          </Message>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div class="col-span-12 flex justify-end">
          <Button
            type="submit"
            :label="t('general.save')"
          />
        </div>
      </div>
    </Form>
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
