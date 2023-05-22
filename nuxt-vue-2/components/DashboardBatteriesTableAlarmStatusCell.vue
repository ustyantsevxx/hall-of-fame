<template>
  <div class="flex justify-end">
    <AppPopover
      :disabled="!battery.alarm_status"
      :vendor-props="{
        trigger: 'hover',
        delay: { show: 300, hide: 150 },
        placement: 'top'
      }"
    >
      <template #toggle>
        <NuxtLink :to="alarmLogsByThisMsmLink" class="block">
          <BadgeStatus
            :status="battery.alarm_status"
            class="transition hover:brightness-110"
          />
        </NuxtLink>
      </template>

      <template #body>
        <p class="py-12 px-20 text-main">
          {{ $t('see-all-alarm-logs-on-msm') }}
        </p>
      </template>
    </AppPopover>
  </div>
</template>

<script>
import AppPopover from '~/components/AppPopover.vue'
import BadgeStatus from '~/components/BadgeStatus.vue'

export default {
  components: {
    AppPopover,
    BadgeStatus
  },

  props: {
    battery: { type: Object, required: true }
  },

  computed: {
    alarmLogsByThisMsmLink() {
      return {
        path: '/logs/alarm',
        query: {
          msm_serials: [this.battery?.msm?.serial]
        }
      }
    }
  }
}
</script>
