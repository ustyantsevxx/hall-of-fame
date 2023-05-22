<template>
  <header>
    <LayoutHeaderWithMenuInfo />
    <LayoutHeaderWithMenuNav />
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import LayoutHeaderWithMenuInfo from '~/components/LayoutHeaderWithMenuInfo.vue'
import LayoutHeaderWithMenuNav from '~/components/LayoutHeaderWithMenuNav.vue'

@Component({
  components: {
    LayoutHeaderWithMenuInfo,
    LayoutHeaderWithMenuNav
  }
})
export default class LayoutHeaderWithMenu extends Vue {}
</script>
