<template>
  <div class="mt-27" style="width: 540px">
    <form @submit.prevent="submit">
      <PhoneNumberInput v-model="maskedPhone" />

      <p
        v-if="errorMessage"
        class="block mt-25 mb-45 text-description text-red"
      >
        {{ errorMessage }}
      </p>

      <div class="flex items-center mt-40">
        <Button gradient :disabled="dirtyAndIncorrect" class="mr-30">
          xx xx
        </Button>
        <p class="flex-1 mt-4 text-gray" style="width: 280px">
          xx xx xx xx-xx xx xx
        </p>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import Button from '~/components/Button.vue'
import PhoneNumberInput from '~/components/PhoneNumberInput.vue'
import { AuthModule } from '~/logic/modules/auth'

@Component({
  components: {
    Button,
    PhoneNumberInput
  },

  validations: {
    maskedPhone: {
      phoneNumber: (value: string) =>
        /\+7\s\d{3}\s\d{3}-\d{2}-\d{2}/.test(value)
    }
  }
})
export default class LoginPagePhoneForm extends Vue {
  maskedPhone = ''
  serverValidationMessage: string | null = null

  get errorMessage() {
    if (this.dirtyAndIncorrect) {
      return 'xx xx xx xx'
    } else if (this.serverValidationMessage) {
      return this.serverValidationMessage
    }

    return null
  }

  get dirtyAndIncorrect() {
    return this.$v.maskedPhone.$dirty && this.$v.maskedPhone.$invalid
  }

  resetServerValidationMessage() {
    this.serverValidationMessage &&= null
  }

  checkErrors() {
    this.resetServerValidationMessage()
    this.$v.$touch()
    return this.$v.$anyError
  }

  getRawPhone() {
    return this.maskedPhone.replaceAll(/[\s-]/gi, '')
  }

  async submit() {
    if (this.checkErrors()) {
      return
    }

    const phone = this.getRawPhone()
    const sendCodeResponse = await AuthModule.sendAuthCode(phone)

    if (sendCodeResponse.success) {
      this.$emit('code-sent', phone)
    } else {
      this.serverValidationMessage = sendCodeResponse.error ?? null
    }
  }
}
</script>
