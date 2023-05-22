<template>
  <LayoutSection
    class="flex h-60 items-center justify-between px-16 sm:h-80 sm:px-0 sm:pl-28 sm:pr-26"
  >
    <h1 class="text-h1-sm sm:text-h1">
      {{ battery.serial }}
    </h1>

    <div v-if="!readOnly" class="flex space-x-12">
      <TraceRequestCreatePageLink :for-msm-id="battery.id" />
      <AppButton
        :disabled="!latestA1LogLink"
        :to="latestA1LogLink"
        :title="
          !latestA1LogLink ? $t('no-continuous-logs-a1-for-this-battery') : ''
        "
      >
        {{ $t('continuous-log-a1') }}
      </AppButton>
      <AppButton :to="alarmLogsLinkByMsmSerial">
        {{ $t('alarm-logs-2') }}
      </AppButton>
    </div>
  </LayoutSection>
</template>

<script>
import AppButton from '~/components/AppButton.vue'
import LayoutSection from '~/components/LayoutSection.vue'
import TraceRequestCreatePageLink from '~/components/TraceRequestCreatePageLink.vue'

export default {
  components: {
    TraceRequestCreatePageLink,
    AppButton,
    LayoutSection
  },

  props: {
    battery: { type: Object, required: true },
    readOnly: { type: Boolean, default: false }
  },

  computed: {
    alarmLogsLinkByMsmSerial() {
      return {
        path: '/logs/alarm',
        query: {
          msm_serials: [this.battery.serial]
        }
      }
    },

    latestA1LogLink() {
      return this.battery.last_a1_msm_status_id
        ? `/logs/a1/${this.battery.last_a1_msm_status_id}`
        : null
    }
  }
}
</script>
