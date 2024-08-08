<template>
  <main class="container">
    <div class="flex justify-between mt-40">
      <h1 class="self-center text-h1">xx</h1>
      <Link headless :href="MAIN_WEBSITE_LINK" title="XXX xx xx">
        <LogoSVG />
      </Link>
    </div>

    <template v-if="!phoneSubmitted">
      <p class="text-subtitle" style="width: 730px">
        xx xx xx xx xx, xx xx xx xx
        xx xx
      </p>
      <PhoneForm @code-sent="submitPhone" />
    </template>

    <template v-else>
      <p class="text-subtitle" style="width: 730px">
        xx xx xx {{ formattedPhone }} xx xx xx
        xx-xx, xx xx xx:
      </p>
      <CodeForm :phone="phone" />
    </template>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import LogoSVG from '~/assets/svg/login/logo.svg'
import Link from '~/components/Link.vue'
import LoginPageCodeForm from '~/components/LoginPageCodeForm.vue'
import LoginPagePhoneForm from '~/components/LoginPagePhoneForm.vue'
import { MAIN_WEBSITE_LINK } from '~/logic/constants'
import { formatPhone } from '~/logic/utils/phone'

@Component({
  components: {
    Link,
    PhoneForm: LoginPagePhoneForm,
    CodeForm: LoginPageCodeForm,
    LogoSVG
  },

  head: {
    title: 'xx'
  },

  auth: 'guest',
  layout: 'footer-only'
})
export default class LoginIndividualIndexPage extends Vue {
  MAIN_WEBSITE_LINK = MAIN_WEBSITE_LINK
  phone = ''
  phoneSubmitted = false

  get formattedPhone() {
    return formatPhone(this.phone)
  }

  submitPhone(phone: string) {
    this.phone = phone
    this.phoneSubmitted = true
  }
}
</script>
