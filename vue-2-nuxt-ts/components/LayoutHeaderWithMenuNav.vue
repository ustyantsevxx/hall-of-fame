<template>
  <nav>
    <ul class="container flex justify-between border-t border-gray-100">
      <li v-for="menuItem in menuItems" :key="menuItem.to">
        <NuxtLink
          :to="menuItem.to"
          :exact="menuItem.exact"
          active-class="bg-light-blue-200 text-blue hover:!text-blue cursor-default"
          class="block py-22 px-28 hover:text-red rounded-b-10 transition-colors active:text-red/80"
        >
          {{ menuItem.displayName }}
        </NuxtLink>
      </li>

      <li>
        <Button link class="group block py-22 px-28" @click="logout">
          <span
            class="text-transparent group-hover:text-red bg-clip-text bg-gradient transition-colors"
          >
            Выйти
          </span>
        </Button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import LogoSVG from '~/assets/svg/header/logo.svg'
import Button from '~/components/Button.vue'
import Link from '~/components/Link.vue'

@Component({
  components: {
    Button,
    Link,
    LogoSVG
  }
})
export default class LayoutHeaderWithMenuNav extends Vue {
  menuItems = [
    {
      to: '/',
      displayName: 'Транзакции',
      exact: true
    },
    {
      to: '/cards',
      displayName: 'Карты'
    },
    {
      to: '/funds',
      displayName: 'Средства'
    },
    {
      to: '/articles',
      displayName: 'Новости'
    },
    {
      to: '/help',
      displayName: 'Справка'
    },
    {
      to: '/support',
      displayName: 'Служба поддержки'
    },
    {
      to: '/settings',
      displayName: 'Настройки'
    }
  ]

  async logout() {
    const authRedirectDefaultState = this.$auth.options.redirect
    // @ts-ignore
    this.$auth.options.redirect = false

    await this.$auth.logout()
    await this.$router.push('/login')

    this.$auth.options.redirect = authRedirectDefaultState
  }
}
</script>
