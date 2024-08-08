<template>
  <main class="container">
    <PageHeader>
      <template #title>xx</template>

      <template #subtitle>
        xx xx xx xx xx xx xx xx xx xx xx
        xx xx.
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
    title: 'xx'
  },

  layout: 'legal'
})
export default class LegalHelpPage extends Vue {}
</script>
