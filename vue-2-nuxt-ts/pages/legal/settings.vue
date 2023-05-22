<template>
  <div>
    <main class="container flex-grow flex-shrink-0">
      <div class="flex justify-between">
        <h1 class="text-h1">Настройки</h1>
      </div>

      <div class="grid grid-cols-12 mt-30">
        <div class="col-span-3">
          <LegalSettingsMenu />
        </div>

        <div class="col-span-9">
          <Nuxt />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'

import LegalSettingsMenu from '~/components/LegalSettingsMenu.vue'

@Component({
  components: {
    LegalSettingsMenu
  },

  layout: 'legal',

  middleware({ route, redirect }: Context) {
    if (route.path === '/settings' || route.path === '/settings/') {
      return redirect('/settings/notifications')
    }
  }
})
export default class LegalSettingsIndexPage extends Vue {}
</script>
