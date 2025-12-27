<script setup lang="ts">
import { ref, watch, useTemplateRef, computed } from 'vue'
import { useGettext } from 'vue3-gettext'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import z from 'zod'
import type { ContentBlockPosition, ContentBlockTheme, ISelectOption, ContentBlockFormValues, ContentBlockButton, ContentBlockSettings, GenericContentBlock } from '@/types/cms'
import type { FormInstance, FormSubmitEvent } from '@primevue/forms'
import CMSButtonTable from './CMSButtonTable.vue'

const { $gettext } = useGettext()

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
  { label: $gettext('Text links, Bild rechts'), value: 'text-left' },
  { label: $gettext('Bild links, Text rechts'), value: 'image-left' },
  { label: $gettext('Text oben, Bild unten'), value: 'text-top' },
  { label: $gettext('Bild oben, Text unten'), value: 'image-top' },
]

const themeOptions: ISelectOption<ContentBlockTheme>[] = [
  { label: $gettext('Heller Hintergrund mit dunkler Schrift'), value: 'light' },
  { label: $gettext('Dunkler Hintergrund mit heller Schrift'), value: 'dark' },
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

    <Form
      v-slot="$form"
      ref="formRef"
      :resolver="resolver"
      :initial-values="initialValues"
      class="d-flex flex-column gap-4 m-3"
      @submit="onSubmit"
    >
      <div class="row">
        <div class="col-lg-4 col-12">
          <label for="overtitle">{{ $gettext('Vortitel') }}</label>
        </div>
        <div class="col-lg-8 col-12">
          <div class="d-flex">
            <div class="overtitle-input-container">
              <InputText name="overtitle" class="w-100" />
              <Message v-if="$form.overtitle?.invalid" severity="error" size="small" variant="simple">
                {{ $form.overtitle.error.message }}
              </Message>
            </div>

            <div class="in-page-nav-container d-flex">
              <ToggleSwitch name="showInPageNav" />
              <label for="showInPageNav" class="ms-2">{{ $gettext('Im Seitenmenü listen') }}</label>
              <Message v-if="$form.showInPageNav?.invalid" severity="error" size="small" variant="simple">
                {{ $form.showInPageNav.error.message }}
              </Message>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-12">
          <label for="title">{{ $gettext('Überschrift 1') }}</label>
        </div>
        <div class="col-lg-8 col-12">
          <InputText name="title" class="w-100" />
          <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">
            {{ $form.title.error.message }}
          </Message>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-12">
          <label for="text">{{ $gettext('Text') }}</label>
        </div>
        <div class="col-lg-8 col-12">
          <Textarea name="text" class="w-100" rows="5" />
          <Message v-if="$form.text?.invalid" severity="error" size="small" variant="simple">
            {{ $form.text.error.message }}
          </Message>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-12">
          <label for="image">{{ $gettext('Bild') }}</label>
        </div>
        <div class="col-lg-8 col-12">
          <InputText name="image" class="w-100" />
          <Message v-if="$form.image?.invalid" severity="error" size="small" variant="simple">
            {{ $form.image.error.message }}
          </Message>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-12">
          <label for="positioning">{{ $gettext('Anordnung') }}</label>
        </div>
        <div class="col-lg-8 col-12">
          <Select
            name="positioning"
            option-label="label"
            option-value="value"
            class="w-100"
            :options="positionOptions"
          />
          <Message v-if="$form.positioning?.invalid" severity="error" size="small" variant="simple">
            {{ $form.positioning.error.message }}
          </Message>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-12">
          <label for="buttons">{{ $gettext('Buttons') }}</label>
        </div>
        <div class="col-lg-8 col-12">
          <CMSButtonTable v-model="buttons" />
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-12">
          <label for="theme">{{ $gettext('Farbe') }}</label>
        </div>
        <div class="col-lg-8 col-12">
          <Select
            name="theme"
            option-label="label"
            option-value="value"
            class="w-100"
            :options="themeOptions"
          />
          <Message v-if="$form.theme?.invalid" severity="error" size="small" variant="simple">
            {{ $form.theme.error.message }}
          </Message>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-12">
          <label for="cssClasses">{{ $gettext('Ergänzende CSS-Klassen') }}</label>
        </div>
        <div class="col-lg-8 col-12">
          <InputText name="cssClasses" class="w-100" />
          <Message v-if="$form.cssClasses?.invalid" severity="error" size="small" variant="simple">
            {{ $form.cssClasses.error.message }}
          </Message>
        </div>
      </div>

      <div class="row">
        <div class="col-12 d-flex justify-content-end">
          <Button
            type="submit"
            :label="$gettext('Speichern')"
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
