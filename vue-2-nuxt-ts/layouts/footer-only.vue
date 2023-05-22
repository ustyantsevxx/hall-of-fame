<template>
  <div class="flex flex-col h-screen">
    <Nuxt class="flex-grow flex-shrink-0" />
    <FooterOnlyLayoutFooter class="flex-shrink-0 py-45" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import FooterOnlyLayoutFooter from '~/components/FooterOnlyLayoutFooter.vue'

@Component({
  components: {
    FooterOnlyLayoutFooter
  }
})
export default class FooterOnlyLayout extends Vue {}
</script>
