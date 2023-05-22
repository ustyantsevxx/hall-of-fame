<template>
  <div class="pl-45">
    <form
      :class="{
        'pointer-events-none': formDisabled
      }"
      @submit.prevent="save"
    >
      <LegalSettingsNotificationsTable
        :items="notificationSettings"
        :disabled="formDisabled"
      >
        <template #first-column-header>
          <span>Уведомления</span>
          <InputSwitch
            :value="notificationEnabled"
            :width="51"
            :height="31"
            :disabled="notificationEnabledLoading"
            class="ml-70 pointer-events-auto"
            @input="saveNotificationEnabledState"
          />
        </template>
      </LegalSettingsNotificationsTable>

      <div :class="{ 'opacity-50': formDisabled }">
        <InputTextInputList
          v-model="phones"
          :input-props="phoneInputProps"
          :max-count="MAX_PHONE_COUNT"
          :disabled="formDisabled"
          :validation-list="$v.phones"
          button-title="Добавить номер телефона"
          class="mt-48"
        />

        <InputTextInputList
          v-model="emails"
          :input-props="emailInputProps"
          :max-count="MAX_EMAIL_COUNT"
          :disabled="formDisabled"
          :validation-list="$v.emails"
          button-title="Добавить email"
          class="mt-48"
        />

        <p
          v-if="$v.$anyError || errorMessage"
          class="block mt-20 text-description text-red"
        >
          <span v-if="errorMessage">
            {{ errorMessage }}
            <br />
          </span>

          <span v-if="$v.phones.$anyError">
            Указан некорректный номер телефона
            <br />
          </span>

          <span v-if="$v.emails.$anyError">
            Указан некорректный email
            <br />
          </span>
        </p>

        <Button class="mt-40" outline :disabled="loading || formDisabled">
          Сохранить
        </Button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, mixins, Watch } from 'nuxt-property-decorator'
import { email, required } from 'vuelidate/lib/validators'

import NotificationCircledSVG from '~/assets/svg/notification-circled.svg'
import PlusSVG from '~/assets/svg/plus.svg'
import Button from '~/components/Button.vue'
import InputCheckbox from '~/components/InputCheckbox.vue'
import InputDefault from '~/components/InputDefault.vue'
import InputSwitch from '~/components/InputSwitch.vue'
import InputTextInputList from '~/components/InputTextInputList.vue'
import LabeledInfo from '~/components/LabeledInfo.vue'
import LegalSettingsNotificationsTable from '~/components/LegalSettingsNotificationsTable.vue'
import Link from '~/components/Link.vue'
import {
  MAX_EMAIL_COUNT,
  MAX_PHONE_COUNT,
  NotificationSettings,
  PushNotificationSettingsModule
} from '~/logic/modules/push-notification-settings'
import { HandleServerResponseMixin } from '~/mixins/handle-server-response-mixin'
import { ShowToastMessageMixin } from '~/mixins/show-toast-message-mixin'

const preparePhones = (phones: string[]) => {
  return phones.map(p => p.replace('+7', ''))
}

@Component({
  components: {
    LegalSettingsNotificationsTable,
    InputSwitch,
    InputTextInputList,
    InputCheckbox,
    Button,
    InputDefault,
    Link,
    LabeledInfo,
    NotificationCircledSVG,
    PlusSVG
  },

  layout: 'legal-settings',

  validations: {
    phones: {
      $each: {
        phoneNumber: (value: string) =>
          /\+7 \(\d{3}\) \d{3} \d{2} \d{2}/.test(value)
      }
    },
    emails: {
      $each: {
        required,
        email
      }
    }
  }
})
export default class LegalSettingsNotificationsPage extends mixins(
  HandleServerResponseMixin,
  ShowToastMessageMixin
) {
  async asyncData() {
    const notificationsResponse =
      await PushNotificationSettingsModule.getPushNotificationSettings()

    const phones =
      notificationsResponse?.user_settings?.phones?.length > 0
        ? preparePhones(notificationsResponse?.user_settings?.phones)
        : ['']

    const emails =
      notificationsResponse?.user_settings?.emails?.length > 0
        ? notificationsResponse?.user_settings?.emails
        : ['']

    return {
      notificationEnabled:
        notificationsResponse?.user_settings?.notification_enabled || false,
      notificationSettings: notificationsResponse?.notification_settings || [],
      phones,
      emails
    }
  }

  MAX_PHONE_COUNT = MAX_PHONE_COUNT
  MAX_EMAIL_COUNT = MAX_EMAIL_COUNT

  serverValidationMessage: string | null = null
  loading = false
  notificationEnabledLoading = false

  notificationEnabled = false
  phones: string[] = []
  emails: string[] = []

  phoneInputProps = {
    label: 'Номер телефона',
    placeholder: '+7 (ХХХ) ХХХ ХХ ХХ',
    mask: '+7 (###) ### ## ##',
    style: 'width: 185px'
  }

  emailInputProps = {
    type: 'email',
    label: 'Email',
    placeholder: 'example@email.com',
    style: 'width: 185px'
  }

  notificationSettings: NotificationSettings[] = []

  get formDisabled() {
    return !this.notificationEnabled || this.notificationEnabledLoading
  }

  get preparedPhones() {
    return this.phones.map(p => p.replaceAll(/[ ()]/g, ''))
  }

  @Watch('phones', {
    deep: true
  })
  onPhonesChange() {
    this.resetValidation()
  }

  @Watch('emails', {
    deep: true
  })
  onEmailsChange() {
    this.resetValidation()
  }

  async saveNotificationEnabledState(enabledState: boolean) {
    this.resetValidation()
    this.notificationEnabledLoading = true

    const response =
      await PushNotificationSettingsModule.setPushNotificationEnabledState(
        enabledState
      )

    if (!response.success) {
      this.showToastMessage('Произошла ошибка.')
      this.notificationEnabled = !enabledState
    }

    this.notificationEnabled = enabledState
    this.notificationEnabledLoading = false
    this.showNotificationEnabledStateChanged()
  }

  showNotificationEnabledStateChanged() {
    const notificationMessage = this.notificationEnabled
      ? 'Уведомления включены'
      : 'Уведомления выключены'
    this.showToastMessage(notificationMessage)
  }

  async save() {
    if (this.checkErrors()) {
      return
    }

    try {
      this.loading = true

      const response =
        await PushNotificationSettingsModule.updatePushNotificationSettings({
          settings: this.notificationSettings.map(n => ({
            id: n.id,
            is_enabled: n.is_enabled,
            balance: n.balance ?? 0,
            send_to_email: n.send_to_email,
            send_to_phone: n.send_to_phone
          })),
          user_settings: {
            notification_enabled: this.notificationEnabled,
            notification_emails: this.emails,
            notification_phones: this.preparedPhones
          }
        })

      if (response.success) {
        this.showToastMessage('Настройки уведомлений успешно сохранены.')
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

  resetValidation() {
    this.$v.$reset()
  }
}
</script>
