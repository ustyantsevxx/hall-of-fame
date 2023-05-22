<template>
  <NuxtLink
    v-if="item.expanded && item.battery"
    class="block"
    :to="alarmLogsLinkByMsmSerial"
    @click.native.stop
  >
    <BadgeStatus
      v-tooltip="$t('see-all-alarm-logs-on-msm-0')"
      class="transition hover:brightness-110"
      :status="item.battery.alarm_status"
    />
  </NuxtLink>

  <BadgeStatus
    v-else-if="!item.expanded && item.worstStatus"
    :status="item.worstStatus"
  />
</template>

<script>
import BadgeStatus from '~/components/BadgeStatus.vue'

export default {
  components: {
    BadgeStatus
  },

  props: {
    item: { type: Object, required: true }
  },

  computed: {
    alarmLogsLinkByMsmSerial() {
      return {
        path: '/logs/alarm',
        query: {
          msm_serials: [this.item.battery.serial]
        }
      }
    }
  }
}
</script>
