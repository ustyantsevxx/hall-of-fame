<template>
  <header class="pt-20 pb-19 border-b border-gray-100">
    <div class="container flex justify-between items-end">
      <div class="flex items-end">
        <Link headless to="/" class="pb-5" title="На главную">
          <LogoSVG />
        </Link>
        <Link
          headless
          to="/"
          class="ml-10 text-description text-gray"
          title="На главную"
        >
          <span>Личный кабинет</span>
        </Link>
      </div>

      <div class="flex items-start">
        <div class="flex mr-80 space-x-20">
          <Link headless :href="APP_LINKS.GOOGLE_PLAY" class="flex space-x-6">
            <GooglePlaySVG />
            <span class="text-transparent bg-clip-text bg-gradient">
              Google Play
            </span>
          </Link>

          <Link headless :href="APP_LINKS.APP_STORE" class="flex space-x-6">
            <AppStoreSVG />
            <span class="text-transparent bg-clip-text bg-gradient">
              AppStore
            </span>
          </Link>
        </div>

        <div class="mr-60">
          <Link headless self :href="supportPhoneLink" class="block">
            {{ SUPPORT_PHONE.DISPLAYED }}
          </Link>

          <Link link to="/support" class="mt-3 text-description">
            Служба поддержки
          </Link>
        </div>

        <div v-if="userLoggedIn">
          <Link v-if="fullName" headless to="/profile">
            {{ fullName }}
          </Link>

          <Button link class="block mt-3 text-description" @click="logout">
            Выйти из профиля
          </Button>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import AppStoreSVG from '~/assets/svg/header/app-store.svg'
import GooglePlaySVG from '~/assets/svg/header/google-play.svg'
import LogoSVG from '~/assets/svg/header/logo.svg'
import Button from '~/components/Button.vue'
import Link from '~/components/Link.vue'
import { APP_LINKS, SUPPORT_PHONE } from '~/logic/constants'

@Component({
  components: {
    Button,
    Link,
    LogoSVG,
    GooglePlaySVG,
    AppStoreSVG
  }
})
export default class LayoutHeader extends Vue {
  SUPPORT_PHONE = SUPPORT_PHONE
  APP_LINKS = APP_LINKS

  get fullName() {
    return this.$accessor?.fullName ?? ''
  }

  get supportPhoneLink() {
    return `tel:${SUPPORT_PHONE.PHONE}`
  }

  get userLoggedIn() {
    return this.$accessor.auth.loggedIn
  }

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
