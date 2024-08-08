<template>
  <div class="pl-32">
    <form @submit.prevent="save">
      <div class="flex flex-col space-y-30">
        <InputDefault
          v-model="contactPerson"
          placeholder="xx xx"
          size="md"
          hide-label
          style="width: 100%"
          :max-length="MAX_PERSON_NAME_LENGTH"
          :input-classes="inputClasses"
          :invalid="$v.contactPerson.$anyError"
        />

        <InputDefault
          v-model="email"
          placeholder="xx"
          type="email"
          size="md"
          style="width: 295px"
          hide-label
          :input-classes="inputClasses"
          :invalid="$v.email.$anyError"
        />
        <InputDefault
          v-model="phone"
          label="xx"
          placeholder="xx"
          type="tel"
          size="md"
          mask="+7 (###) ### ## ##"
          style="width: 295px"
          hide-label
          :input-classes="inputClasses"
          :invalid="$v.phone.$anyError"
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
        <span v-if="$v.email.$anyError">
          xx xx xx xx.
          <br />
        </span>
        <span v-if="$v.phone.$anyError">
          xx xx xx xx.
          <br />
        </span>
      </p>

      <Button class="mt-40" outline :disabled="loading">xx</Button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { email, maxLength, required } from 'vuelidate/lib/validators'

import NotificationCircledSVG from '~/assets/svg/notification-circled.svg'
import Button from '~/components/Button.vue'
import InputDefault from '~/components/InputDefault.vue'
import LabeledInfo from '~/components/LabeledInfo.vue'
import Link from '~/components/Link.vue'
import { MAX_PERSON_NAME_LENGTH, Users } from '~/logic/modules/users'
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
    contactPerson: {
      maxLength: maxLength(MAX_PERSON_NAME_LENGTH)
    },
    email: { required, email },
    phone: {
      phoneNumber: (value: string) =>
        /\+7 \(\d{3}\) \d{3} \d{2} \d{2}/.test(value)
    }
  }
})
export default class LegalSettingsDetailsTab extends mixins(
  HandleServerResponseMixin,
  ShowToastMessageMixin
) {
  MAX_PERSON_NAME_LENGTH = MAX_PERSON_NAME_LENGTH

  loading = false
  contactPerson = ''
  email = ''
  phone = ''

  get userInfo() {
    return this.$accessor.auth.user
  }

  get inputClasses() {
    return {
      'pt-7': false,
      'pt-0': true,
      'pb-15': true,
      'text-paragraph': true
    }
  }

  get preparedPhone() {
    return this.phone.replaceAll(/[ ()]/g, '')
  }

  mounted() {
    this.initForm()
  }

  initForm() {
    this.phone = this.userInfo.phone.replace('+7', '')
    this.email = this.userInfo.email
    this.contactPerson = this.userInfo.contact_person
  }

  async save() {
    if (this.checkErrors()) {
      return
    }

    try {
      this.loading = true
      const response = await Users.updateContactData({
        contactPerson: this.contactPerson,
        email: this.email,
        phone: this.preparedPhone
      })

      if (response.success) {
        await this.$auth.fetchUser()
        this.showToastMessage('xx xx xx xx.')
      } else {
        this.handleServerError(response.error as any)
      }
    } finally {
      this.loading = false
    }
  }

  checkErrors() {
    this.resetServerValidationMessage()
    this.$v.$touch()
    return this.$v.$anyError
  }
}
</script>
