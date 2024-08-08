<template>
  <div class="pl-32" style="width: 660px">
    <p class="flex items-center mb-15">
      <span class="text-description text-gray-500">xx xx:</span>
      <span class="ml-5 text-subtitle">
        {{ agreementNumber }}
      </span>
    </p>

    <div class="flex flex-col space-y-24">
      <LabeledInfo :value="organizationName" label="xx xx" />

      <LabeledInfo :value="userInfo.legal_address" label="xx xx" />

      <LabeledInfo :value="userInfo.postal_address" label="xx xx" />

      <div class="grid grid-cols-2 gap-37">
        <LabeledInfo :value="userInfo.inn" label="xx" />
        <LabeledInfo :value="userInfo.kpp" label="xx" />
      </div>

      <LabeledInfo :value="userInfo.rs" label="xx xx" />

      <LabeledInfo :value="userInfo.ks" label="xx xx" />

      <div class="grid grid-cols-2 gap-37">
        <LabeledInfo :value="userInfo.bik" label="xx" />
      </div>
    </div>

    <div
      class="flex items-center py-33 px-48 mt-38 space-x-15 rounded-10 border border-gray-100"
    >
      <NotificationCircledSVG class="w-25 h-25 text-blue" />

      <p>
        xx xx xx xx xx xx
        <Link to="/support">xx xx</Link>
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
