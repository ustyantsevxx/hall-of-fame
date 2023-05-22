<template>
  <main class="container">
    <div class="flex justify-between mt-40">
      <h1 class="self-center text-h1">Авторизация</h1>
      <Link headless :href="MAIN_WEBSITE_LINK" title="XXX Основной сайт">
        <LogoSVG />
      </Link>
    </div>

    <template v-if="!phoneSubmitted">
      <p class="text-subtitle" style="width: 730px">
        Для авторизации укажите номер телефона, на который вы регистрировали
        бонусную карту
      </p>
      <PhoneForm @code-sent="submitPhone" />
    </template>

    <template v-else>
      <p class="text-subtitle" style="width: 730px">
        На указанный номер {{ formattedPhone }} мы отправили четырехзначный
        СМС-код, введите его здесь:
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
    title: 'Авторизация'
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
