<template>
  <BatteryViewPage :battery="battery" @updated="refetchBattery" />
</template>

<script>
import BatteryViewPage from '~/components/BatteryViewPage.vue'
import { MsmsService } from '~/logic/modules/msms/msms.service'

export default {
  components: {
    BatteryViewPage
  },

  async asyncData({ route }) {
    return {
      battery: await MsmsService.getMsmById(route.params.id)
    }
  },

  head() {
    return {
      title: this.$t('battery-name-quote', { name: this.battery.name })
    }
  },

  methods: {
    async refetchBattery() {
      this.battery = await MsmsService.getMsmById(this.battery.id)
    }
  }
}
</script>
