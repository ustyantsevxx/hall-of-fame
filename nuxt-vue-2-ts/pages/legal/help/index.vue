<template>
  <main class="container">
    <PageHeader>
      <template #title>Справка</template>

      <template #subtitle>
        Скоро в этом разделе вы сможете скачать сертификаты топлива и другую
        полезную информацию.
      </template>
    </PageHeader>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import PageHeader from '~/components/PageHeader.vue'

@Component({
  components: { PageHeader },
  head: {
    title: 'Справка'
  },

  layout: 'legal'
})
export default class LegalHelpPage extends Vue {}
</script>
