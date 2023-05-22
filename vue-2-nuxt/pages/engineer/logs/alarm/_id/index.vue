<template>
  <ChartPage
    :msm="alarm.msm"
    :item-id="alarm.id"
    item-type="alarm"
    :back-link-text="$t('back-to-alarm-logs')"
    :chart-data-fetch-fn="getAlarmChartData"
    :chart-options-fn="getAlarmChartOptions"
  >
    <template #after-serial>
      <div class="ml-80 flex items-center">
        <AlarmPathBadge :alarm-path="alarm.alarm_path" />
        <AlarmMetaDescription class="ml-16" :alarm="alarm" />
      </div>
    </template>
  </ChartPage>
</template>

<script>
import { last } from 'lodash-es'

import AlarmMetaDescription from '~/components/AlarmMetaDescription.vue'
import AlarmPathBadge from '~/components/AlarmPathBadge.vue'
import ChartPage from '~/components/ChartPage.vue'
import { AlarmsService } from '~/logic/modules/alarms/alarms.service'

export default {
  components: {
    ChartPage,
    AlarmPathBadge,
    AlarmMetaDescription
  },

  async asyncData({ route: { params } }) {
    const alarm = await AlarmsService.getAlarm(params.id)

    return {
      alarm
    }
  },

  head() {
    return {
      title: this.$t('alarm-log-id', { id: this.alarm.id })
    }
  },

  methods: {
    getAlarmChartData({ variables, itemId }) {
      return AlarmsService.getChartData({
        alarmId: itemId,
        variables
      })
    },

    getAlarmChartOptions(context) {
      const alarmHappenedAt = this.alarm.timestamp * 1000

      return {
        annotations: {
          xaxis: [
            {
              x: alarmHappenedAt,
              strokeDashArray: 0,
              opacity: 1,
              fillColor: 'rgba(255, 76, 74, 0.5)',
              borderColor: 'rgba(255, 76, 74, 0.5)'
            },
            {
              x: alarmHappenedAt,
              x2: last(context.timestamps),
              strokeDashArray: 0,
              opacity: 1,
              fillColor: 'rgba(255, 76, 74, 0.06)',
              borderColor: 'rgba(255, 76, 74, 0.06)'
            }
          ]
        }
      }
    }
  }
}
</script>
