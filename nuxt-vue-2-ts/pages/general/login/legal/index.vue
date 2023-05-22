<template>
  <main class="container">
    <div class="flex justify-between mt-40">
      <h1 class="self-center text-h1">Авторизация</h1>
      <Link headless :href="MAIN_WEBSITE_LINK" title="XXX Основной сайт">
        <LogoSVG />
      </Link>
    </div>

    <p class="mb-25 text-subtitle" style="width: 730px">
      Для авторизации укажите ИНН организации и предоставленный вам пароль
    </p>

    <form style="width: 540px" @submit.prevent="submit">
      <InputDefault
        v-model="idNumber"
        label="ИНН"
        placeholder="ИНН"
        class="mb-21"
        hide-label
        :mask="innMask"
        :max-length="INN_LENGTH"
        :invalid="$v.idNumber.$anyError"
        @input="resetServerValidationMessage"
      />

      <InputPassword
        v-model="password"
        label="Пароль"
        placeholder="Пароль"
        class="mb-21"
        hide-label
        :invalid="$v.password.$anyError"
        @input="resetServerValidationMessage"
      />

      <Button link type="button" @click.prevent="showRestorePasswordModal">
        <span
          class="text-description text-black hover:text-red transition-colors"
        >
          Забыли пароль?
        </span>
      </Button>

      <div class="flex items-center mt-43">
        <Button
          :disabled="loading || $v.$anyError"
          gradient
          type="submit"
          class="mr-30"
        >
          Войти
        </Button>

        <p
          v-if="errorMessage || $v.$anyError"
          class="block text-description text-red"
        >
          <span v-if="errorMessage">
            {{ errorMessage }}
            <br />
          </span>
          <span v-if="$v.idNumber.$anyError">
            Неверный формат ИНН.
            <br />
          </span>
          <span v-if="$v.password.$anyError">Неверный формат пароля.</span>
        </p>
      </div>
    </form>

    <RestorePasswordModal ref="restorePasswordModal" />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import * as ufo from 'ufo'
import { required } from 'vuelidate/lib/validators'

import LogoSVG from '~/assets/svg/login/logo.svg'
import Button from '~/components/Button.vue'
import InputDefault from '~/components/InputDefault.vue'
import InputPassword from '~/components/InputPassword.vue'
import Link from '~/components/Link.vue'
import RestorePasswordModal from '~/components/RestorePasswordModal.vue'
import { MAIN_WEBSITE_LINK } from '~/logic/constants'
import { INDIVIDUAL_INN_LENGTH } from '~/logic/modules/users'
import { inn } from '~/logic/utils/validation'
import { STRATEGIES } from '~/plugins/nuxt-auth'

@Component({
  components: {
    RestorePasswordModal,
    Button,
    InputPassword,
    InputDefault,
    Link,
    LogoSVG
  },

  head: {
    title: 'Авторизация'
  },

  auth: 'guest',
  layout: 'footer-only',

  validations: {
    idNumber: {
      required,
      inn
    },
    password: { required }
  },

  mounted() {
    globalThis.ufo = ufo
  }
})
export default class LoginLegalIndexPage extends Vue {
  MAIN_WEBSITE_LINK = MAIN_WEBSITE_LINK
  INN_LENGTH = INDIVIDUAL_INN_LENGTH

  serverValidationMessage: string | null = null
  loading = false
  idNumber = ''
  password = ''

  get errorMessage() {
    if (this.serverValidationMessage) {
      return this.serverValidationMessage
    }
    return null
  }

  get restorePasswordModal(): RestorePasswordModal {
    return this.$refs.restorePasswordModal as RestorePasswordModal
  }

  get innMask() {
    return '#'.repeat(this.INN_LENGTH)
  }

  async mounted() {
    await this.$nextTick()
    this.$v.$reset()
  }

  checkErrors() {
    this.resetServerValidationMessage()
    this.$v.$touch()
    return this.$v.$anyError
  }

  resetServerValidationMessage() {
    this.serverValidationMessage &&= null
  }

  showRestorePasswordModal() {
    this.restorePasswordModal.show()
  }

  async submit() {
    if (this.checkErrors()) {
      return
    }

    const authRedirectDefaultState = this.$auth.options.redirect
    // @ts-ignore
    this.$auth.options.redirect = false

    try {
      this.loading = true
      await this.$auth.loginWith(STRATEGIES.LEGAL, {
        data: {
          inn: this.idNumber,
          password: this.password
        }
      })

      if (this.$auth.loggedIn) {
        await this.$accessor.fetchUserData()
        window.location.reload()
      }
    } catch (error) {
      this.serverValidationMessage =
        error.response.status !== 500
          ? error.response.data[0].description
          : 'Произошла ошибка. Обратитесь в службу поддержки'
    } finally {
      this.loading = false
      this.$auth.options.redirect = authRedirectDefaultState
    }
  }
}
</script>
