<template>
  <ChartPage
    :msm="log"
    :item-id="log.id"
    item-type="a2"
    :back-link-text="$t('back-to-continuous-logs-a2')"
    :chart-data-fetch-fn="getA2ChartData"
    :extremes-fetch-fn="getExtremes"
    :params.sync="params"
  >
    <template #toolbar>
      <ContinuousLogA2Toolbar v-model="params" :log="log" />
    </template>
  </ChartPage>
</template>

<script>
import dayjs from 'dayjs'

import ChartPage from '~/components/ChartPage.vue'
import ContinuousLogA2Toolbar from '~/components/ContinuousLogA2Toolbar.vue'
import { ContinuousLogsA2Service } from '~/logic/modules/continuous-logs-a2/continuous-logs-a2.service'

export default {
  components: {
    ChartPage,
    ContinuousLogA2Toolbar
  },

  async asyncData({ route: { params } }) {
    const log = await ContinuousLogsA2Service.getLog(params.id)
    const {
      initialDate,
      initialDurationOption
    } = ContinuousLogsA2Service.getChartDataToolbarData(log)

    return {
      log,
      params: {
        date: dayjs(initialDate).unix(),
        duration: initialDurationOption.value
      }
    }
  },

  head() {
    return {
      title: this.$t('continuous-logs-a2-id', {
        id: this.log.id
      })
    }
  },

  methods: {
    getA2ChartData({ variables, params, itemId }) {
      return ContinuousLogsA2Service.getChartData({
        logId: itemId,
        variables,
        params
      })
    },

    getExtremes({ variables, params, itemId }) {
      return ContinuousLogsA2Service.getExtremes({
        logId: itemId,
        variables,
        params
      })
    }
  }
}
</script>
