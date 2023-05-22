<template>
  <div class="code-form">
    <div class="mt-32">
      <form @submit.prevent="submit">
        <div class="flex items-center">
          <CodeInput
            ref="code-input"
            class="code-input"
            :class="{
              'code-input--bordered': !errorMessage,
              'code-input--error': !!errorMessage
            }"
            :fields="4"
            @change="handleCodeInput"
          />

          <Button
            link
            type="button"
            class="-mt-4 ml-30"
            :disabled="timeLeft !== 0"
            @click="sendCodeAgain"
          >
            Отправить код еще раз
            <template v-if="timeLeft !== 0">({{ formattedTimeLeft }})</template>
          </Button>
        </div>

        <p
          v-if="errorMessage"
          class="block mt-24 mb-43 text-description text-red"
        >
          {{ errorMessage }}
        </p>

        <div class="flex items-center mt-40">
          <Button
            gradient
            :disabled="code.length !== 4"
            type="submit"
            class="mr-30"
          >
            Войти в личный кабинет
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import CodeInput from 'vue-verification-code-input'

import Button from '~/components/Button.vue'
import { AuthModule } from '~/logic/modules/auth'
import { secondsToTimeString } from '~/logic/utils/datetime'
import { STRATEGIES } from '~/plugins/nuxt-auth'

let _countDownInterval: any

@Component({
  components: {
    Button,
    CodeInput
  }
})
export default class LoginPageCodeForm extends Vue {
  @Prop({ type: String, required: true }) phone!: string

  code = ''
  timeLeft = 0
  serverValidationMessage: string | null = null

  mounted() {
    this.startTimer()
  }

  beforeDestroy() {
    if (_countDownInterval) {
      this.stopTimer()
    }
  }

  get formattedTimeLeft() {
    return secondsToTimeString(this.timeLeft)
  }

  get errorMessage() {
    if (this.serverValidationMessage) {
      return this.serverValidationMessage
    }
    return null
  }

  @Watch('timeLeft')
  onTimeLeftChanged(value: number) {
    if (value === 0) {
      this.stopTimer()
    }
  }

  startTimer() {
    this.timeLeft = AuthModule.codeResendTime
    _countDownInterval = setInterval(() => {
      this.timeLeft--
    }, 1000)
  }

  stopTimer() {
    clearInterval(_countDownInterval)
  }

  handleCodeInput(code: string) {
    this.serverValidationMessage &&= null
    this.code = code
  }

  async sendCodeAgain() {
    if (this.timeLeft !== 0) {
      return
    }

    const sendCodeResponse = await AuthModule.sendAuthCode(this.phone)
    if (sendCodeResponse.success) {
      this.startTimer()
    } else {
      this.serverValidationMessage = sendCodeResponse.error ?? null
    }
  }

  resetCode() {
    this.code = ''
    ;(this.$refs['code-input'] as any).values = ['', '', '', '']
  }

  async submit() {
    const authRedirectDefaultState = this.$auth.options.redirect
    // @ts-ignore
    this.$auth.options.redirect = false

    try {
      await this.$auth.loginWith(STRATEGIES.LOCAL, {
        data: {
          phone: this.phone,
          code: this.code
        }
      })

      if (this.$auth.loggedIn) {
        await this.$accessor.fetchUserData()
        window.location.reload()
      }
    } catch (error: any) {
      this.serverValidationMessage =
        error.response.status !== 500
          ? error.response.data[0].description
          : 'Сообщение не было отправлено. Обратитесь в службу поддержки'
      this.resetCode()
      this.$auth.options.redirect = authRedirectDefaultState
    }
  }
}
</script>

<style>
.code-input {
  width: max-content !important;
}

.code-input--error div input {
  border: 1px solid #be5353 !important;
}

.code-input--error div input:focus {
  border-color: #be5353 !important;
}

.code-input--bordered div input {
  border: 1px solid #0000001a !important;
}

.code-input--bordered div input:focus {
  border-color: #5390be !important;
}

.code-input div {
  @apply space-x-30;
  width: max-content;
  display: flex;
}

.code-input div input {
  width: 65px !important;
  height: 70px !important;
  text-align: center;
  font-family: Inter, sans-serif !important;
  border-radius: 10px !important;
  padding-bottom: 5px;
  caret-color: #000000 !important;
  transition: border-color 50ms ease-in-out;
}
</style>
