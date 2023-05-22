<template>
  <div class="pl-32" style="width: 660px">
    <p class="flex items-center mb-15">
      <span class="text-description text-gray-500">Номер договора:</span>
      <span class="ml-5 text-subtitle">
        {{ agreementNumber }}
      </span>
    </p>

    <div class="flex flex-col space-y-24">
      <LabeledInfo :value="organizationName" label="Название организации" />

      <LabeledInfo :value="userInfo.legal_address" label="Юридический адрес" />

      <LabeledInfo :value="userInfo.postal_address" label="Почтовый адрес" />

      <div class="grid grid-cols-2 gap-37">
        <LabeledInfo :value="userInfo.inn" label="ИНН" />
        <LabeledInfo :value="userInfo.kpp" label="КПП" />
      </div>

      <LabeledInfo :value="userInfo.rs" label="Расчетный счет" />

      <LabeledInfo :value="userInfo.ks" label="Корреспондентский счет" />

      <div class="grid grid-cols-2 gap-37">
        <LabeledInfo :value="userInfo.bik" label="БИК" />
      </div>
    </div>

    <div
      class="flex items-center py-33 px-48 mt-38 space-x-15 rounded-10 border border-gray-100"
    >
      <NotificationCircledSVG class="w-25 h-25 text-blue" />

      <p>
        Об изменениях в реквизитах сообщите в
        <Link to="/support">службу поддержки</Link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import NotificationCircledSVG from '~/assets/svg/notification-circled.svg'
import LabeledInfo from '~/components/LabeledInfo.vue'
import Link from '~/components/Link.vue'
import { Users } from '~/logic/modules/users'

@Component({
  components: {
    Link,
    LabeledInfo,
    NotificationCircledSVG
  },

  layout: 'legal-settings'
})
export default class LegalSettingsDetailsTab extends Vue {
  get userInfo() {
    return this.$accessor.auth.user
  }

  get agreementNumber() {
    return (
      Users.getContractName({
        contractNumber: this.userInfo.contract_number,
        startDate: +this.userInfo.contract_start_at
      }) || '—'
    )
  }

  get organizationName() {
    return this.$accessor.fullName
  }
}
</script>
