<template>
  <div class="pl-32" style="width: 600px">
    <form @submit.prevent="save">
      <div class="grid grid-cols-3 gap-30">
        <InputDefault
          v-model="oldPassword"
          label="xx xx"
          placeholder="xx"
          name="old-password"
          type="password"
          size="md"
          hide-label
          :input-classes="inputClasses"
          :invalid="$v.oldPassword.$anyError"
        />
        <InputDefault
          v-model="newPassword"
          label="xx xx"
          placeholder="xx"
          name="new-password"
          autocomplete="new-password"
          type="password"
          size="md"
          hide-label
          :input-classes="inputClasses"
          :invalid="$v.newPassword.$anyError"
        />
        <InputDefault
          v-model="newPasswordConfirmation"
          label="xx xx"
          placeholder="xx"
          name="confirm-password"
          autocomplete="new-password"
          type="password"
          size="md"
          hide-label
          :input-classes="inputClasses"
          :invalid="$v.newPasswordConfirmation.$anyError"
        />
      </div>

      <p
        v-if="$v.$anyError || errorMessage"
        class="block mt-20 text-description text-red"
      >
        <span v-if="errorMessage">
          {{ errorMessage }}
          <br />
        </span>
        <span v-if="$v.oldPassword.$anyError">
          xx xx xx xx
          <br />
        </span>
        <span v-if="$v.newPassword.$anyError">
          <template v-if="!$v.newPassword.notSameAsOld">
            xx xx, xx xx xx.
          </template>
          <template v-else>xx xx xx xx</template>
          <br />
        </span>
        <span v-if="!$v.newPasswordConfirmation.sameAsNewPassword">
          xx xx xx.
        </span>
      </p>

      <Button class="mt-40" outline :disabled="loading">xx xx</Button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { not, required, sameAs } from 'vuelidate/lib/validators'

import NotificationCircledSVG from '~/assets/svg/notification-circled.svg'
import Button from '~/components/Button.vue'
import InputDefault from '~/components/InputDefault.vue'
import LabeledInfo from '~/components/LabeledInfo.vue'
import Link from '~/components/Link.vue'
import { Users } from '~/logic/modules/users'
import { password } from '~/logic/utils/validation'
import { HandleServerResponseMixin } from '~/mixins/handle-server-response-mixin'
import { ShowToastMessageMixin } from '~/mixins/show-toast-message-mixin'

@Component({
  components: {
    Button,
    InputDefault,
    Link,
    LabeledInfo,
    NotificationCircledSVG
  },

  layout: 'legal-settings',

  validations: {
    oldPassword: { required },
    newPassword: {
      required,
      password,
      notSameAsOld: not(sameAs('oldPassword'))
    },
    newPasswordConfirmation: {
      sameAsNewPassword: sameAs('newPassword')
    }
  }
})
export default class LegalSettingsDetailsTab extends mixins(
  HandleServerResponseMixin,
  ShowToastMessageMixin
) {
  loading = false

  oldPassword = ''
  newPassword = ''
  newPasswordConfirmation = ''

  get inputClasses() {
    return {
      'pt-7': false,
      'pt-0': true,
      'pb-15': true,
      'text-paragraph': true
    }
  }

  async save() {
    if (this.checkErrors()) {
      return
    }

    try {
      this.loading = true
      const response = await Users.updatePassword({
        passwordOld: this.oldPassword,
        passwordNew: this.newPassword,
        passwordNewConfirmation: this.newPasswordConfirmation
      })

      if (response.success) {
        await this.$auth.fetchUser()
        this.showToastMessage('xx xx xx.')
        this.resetForm()
      } else {
        this.handleServerError(response.error as any)
      }
    } finally {
      this.loading = false
    }
  }

  resetForm() {
    this.loading = false
    this.oldPassword = ''
    this.newPassword = ''
    this.newPasswordConfirmation = ''
    this.resetServerValidationMessage()
    this.$v.$reset()
  }

  checkErrors() {
    this.resetServerValidationMessage()
    this.$v.$touch()
    return this.$v.$anyError
  }
}
</script>
