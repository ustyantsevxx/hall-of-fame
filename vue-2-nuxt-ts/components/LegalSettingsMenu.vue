<template>
  <div class="flex flex-col space-y-10">
    <NuxtLink
      v-for="menuItem in menuList"
      :key="menuItem.url"
      :to="menuItem.url"
      class="hover:text-red transition-colors active:text-red/80"
      active-class="!text-blue hover:!text-blue cursor-default"
    >
      {{ menuItem.label }}
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import Link from '~/components/Link.vue'

export type SettingMenuItemType = {
  url: string
  label: string
}

export const menuDictionary = {
  details: {
    url: 'details',
    label: 'xx xx xx'
  },
  password: {
    url: 'password',
    label: 'xx xx'
  },
  contactPerson: {
    url: 'contact-person',
    label: 'xx xx'
  },
  notifications: {
    url: 'notifications',
    label: 'xx'
  }
}
@Component({
  components: {
    Link
  }
})
export default class LegalSettingsMenu extends Vue {
  menuList: SettingMenuItemType[] = [
    menuDictionary.notifications,
    menuDictionary.password,
    // TODO xx xx
    // menuDictionary.contactPerson,
    menuDictionary.details
  ]
}
</script>
