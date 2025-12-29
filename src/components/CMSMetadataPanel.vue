<script setup lang="ts">
import { ref } from 'vue'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useSafeI18n } from '@/i18n'
import { z } from 'zod'

const { t } = useSafeI18n()


const resolver = ref(zodResolver(
  z.object({
    metaTitle: z.string().max(60, t('metadataPanel.metaTitleMaxLength')),
  }),
))
</script>

<template>
  <div class="cms-metadata-panel">
    <Form v-slot="$form" :resolver="resolver" class="d-flex flex-column gap-4">
      <div class="row">
        <div class="col-lg-4 col-12">
          <label for="meta-title">{{ t('metadataPanel.metaTitle') }}</label>
        </div>
        <div class="col-lg-8 col-12">
          <InputText name="meta-title" class="w-100" />
          <Message v-if="$form.metaTitle?.invalid" severity="error" size="small" variant="simple">
            {{ $form.metaTitle.error.message }}
          </Message>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-12">
          <label for="meta-description">{{ t('metadataPanel.metaDescription') }}</label>
        </div>
        <div class="col-lg-8 col-12">
          <Textarea name="meta-description" class="w-100" :rows="4" />
          <Message v-if="$form.metaDescription?.invalid" severity="error" size="small" variant="simple">
            {{ $form.metaDescription.error.message }}
          </Message>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-12">
          <label for="meta-description">{{ t('metadataPanel.ogImage') }}</label>
        </div>
        <div class="col-lg-8 col-12">
          <InputText name="open-graph-image" class="w-100" />
          <Message v-if="$form.openGraphImage?.invalid" severity="error" size="small" variant="simple">
            {{ $form.openGraphImage.error.message }}
          </Message>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-12">
          <label for="indexing-allowed">{{ t('metadataPanel.indexingAllowed') }}</label>
        </div>
        <div class="col-lg-8 col-12">
          <ToggleSwitch name="indexing-allowed" />
          <Message v-if="$form.indexingAllowed?.invalid" severity="error" size="small" variant="simple">
            {{ $form.indexingAllowed.error.message }}
          </Message>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-12">
          <label for="tags">{{ t('metadataPanel.tags') }}</label>
        </div>
        <div class="col-lg-8 col-12">
          <InputText name="tags" class="w-100" />
          <Message v-if="$form.tags?.invalid" severity="error" size="small" variant="simple">
            {{ $form.tags.error.message }}
          </Message>
        </div>
      </div>
    </Form>
  </div>
</template>

<style scoped lang="scss">
.cms-metadata-panel {
  padding: 1rem;
}
</style>
