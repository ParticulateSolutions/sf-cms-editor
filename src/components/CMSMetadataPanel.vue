<script setup lang="ts">
import { ref } from 'vue'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useGettext } from 'vue3-gettext'
import { z } from 'zod'

const { $gettext } = useGettext()


const resolver = ref(zodResolver(
  z.object({
    metaTitle: z.string().max(60, $gettext('Der Meta-Titel darf maximal 60 Zeichen lang sein.')),
  }),
))
</script>

<template>
  <div class="cms-metadata-panel">
    <Form v-slot="$form" :resolver="resolver" class="d-flex flex-column gap-4">
      <div class="row">
        <div class="col-lg-4 col-12">
          <label for="meta-title">{{ $gettext('Meta-/SEO-Titel') }}</label>
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
          <label for="meta-description">{{ $gettext('Meta-/SEO-Beschreibung') }}</label>
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
          <label for="meta-description">{{ $gettext('Open Graph Image (OG-Bild)') }}</label>
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
          <label for="indexing-allowed">{{ $gettext('Indexierung erlauben') }}</label>
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
          <label for="tags">{{ $gettext('Tags') }}</label>
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
