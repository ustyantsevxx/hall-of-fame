<template>
  <div class="pt-20 pb-21">
    <div class="container flex justify-between items-end">
      <div class="flex items-end">
        <Link headless to="/" class="pb-5" title="На главную">
          <LogoSVG />
        </Link>

        <div class="flex mb-3 ml-50 space-x-35">
          <div class="flex flex-col">
            <Link
              headless
              self
              :href="supportPhoneLink"
              class="block mb-3 text-description"
            >
              {{ SUPPORT_PHONE.DISPLAYED }}
            </Link>
            <span class="text-description text-gray-500">Служба поддержки</span>
          </div>

          <div v-if="balanceVisible" class="flex flex-col">
            <span class="mb-3 text-description">
              {{ formattedBalance }} &#8381;
            </span>
            <span class="text-description text-gray-500">Текущий остаток</span>
          </div>

          <div v-if="availableFundsVisible" class="flex flex-col">
            <span class="mb-3 text-description">
              {{ formattedAvailableFunds }} &#8381;
            </span>
            <span class="text-description text-gray-500">
              Свободные средства
            </span>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-end">
        <div
          :title="name"
          class="overflow-hidden mb-3 overflow-ellipsis whitespace-nowrap"
          style="max-width: 400px"
        >
          {{ name }}
        </div>
        <div class="text-description text-gray-500">ИНН {{ inn }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import AppStoreSVG from '~/assets/svg/header/app-store.svg'
import GooglePlaySVG from '~/assets/svg/header/google-play.svg'
import LogoSVG from '~/assets/svg/header/logo.svg'
import Button from '~/components/Button.vue'
import Link from '~/components/Link.vue'
import { SUPPORT_PHONE } from '~/logic/constants'
import { prettify } from '~/logic/utils/numbers'

@Component({
  components: {
    Button,
    Link,
    LogoSVG,
    GooglePlaySVG,
    AppStoreSVG
  }
})
export default class LayoutHeaderWithMenuInfo extends Vue {
  SUPPORT_PHONE = SUPPORT_PHONE

  get supportPhoneLink() {
    return `tel:${SUPPORT_PHONE.PHONE}`
  }

  get name() {
    return this.$accessor?.fullName ?? ''
  }

  get inn() {
    return this.$accessor?.auth.user.inn || '—'
  }

  get formattedBalance() {
    return prettify(+this.$accessor?.auth.user.balance)
  }

  get formattedAvailableFunds() {
    return prettify(+this.$accessor?.auth.user.balance_unallocated)
  }

  get balanceVisible() {
    return this.$accessor?.auth.user.balance_show
  }

  get availableFundsVisible() {
    return this.$accessor?.auth.user.balance_unallocated_show
  }
}
</script>
