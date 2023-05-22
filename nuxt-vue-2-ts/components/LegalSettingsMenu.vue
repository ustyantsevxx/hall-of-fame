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
    label: 'Договор и реквизиты'
  },
  password: {
    url: 'password',
    label: 'Смена пароля'
  },
  contactPerson: {
    url: 'contact-person',
    label: 'Контактное лицо'
  },
  notifications: {
    url: 'notifications',
    label: 'Уведомления'
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
    // TODO вернуть обратно
    // menuDictionary.contactPerson,
    menuDictionary.details
  ]
}
</script>
