<template>
  <div class="flex justify-end">
    <BadgeState class="w-max">{{ displayedStatus }}</BadgeState>
  </div>
</template>

<script>
import BadgeState from '~/components/BadgeState.vue'
import { MSM_STATUS_KEYS } from '~/logic/modules/msms/msms.constants'

export default {
  components: {
    BadgeState
  },

  props: {
    battery: { type: Object, required: true }
  },

  computed: {
    displayedStatus() {
      const localeStatusMap = {
        [MSM_STATUS_KEYS.ENABLED]: this.$t('enabled'),
        [MSM_STATUS_KEYS.CONNECTED]: this.$t('connected'),
        [MSM_STATUS_KEYS.STANDBY]: this.$t('standby')
      }

      return localeStatusMap[this.battery.msm_status] ?? '—'
    }
  }
}
</script>
