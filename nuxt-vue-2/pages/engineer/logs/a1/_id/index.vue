<template>
  <ChartPage
    :msm="log"
    :item-id="log.id"
    item-type="a1"
    :back-link-text="$t('back-to-continuous-logs-a1')"
    :chart-data-fetch-fn="getA1ChartData"
    :extremes-fetch-fn="getExtremes"
    :params.sync="params"
  >
    <template #toolbar>
      <ContinuousLogA1Toolbar v-model="params" :log="log" />
    </template>
  </ChartPage>
</template>

<script>
import dayjs from 'dayjs'

import ChartPage from '~/components/ChartPage.vue'
import ContinuousLogA1Toolbar from '~/components/ContinuousLogA1Toolbar.vue'
import { ContinuousLogsA1Service } from '~/logic/modules/continuous-logs-a1/continuous-logs-a1.service'

export default {
  components: {
    ChartPage,
    ContinuousLogA1Toolbar
  },

  async asyncData({ route: { params } }) {
    const log = await ContinuousLogsA1Service.getLog(params.id)
    const {
      initialDate,
      initialDurationOption,
      initialTimeOption
    } = await ContinuousLogsA1Service.getChartDataToolbarData(log, false)

    return {
      log,
      params: {
        date: dayjs(initialDate)
          .add(initialTimeOption?.value ?? 0, 'seconds')
          .unix(),

        duration: initialDurationOption.value
      }
    }
  },

  head() {
    return {
      title: this.$t('continuous-logs-a1-id', {
        id: this.log.id
      })
    }
  },

  methods: {
    getA1ChartData({ variables, params, itemId }) {
      return ContinuousLogsA1Service.getChartData({
        logId: itemId,
        variables,
        params
      })
    },

    getExtremes({ variables, params, itemId }) {
      return ContinuousLogsA1Service.getExtremes({
        logId: itemId,
        variables,
        params
      })
    }
  }
}
</script>
