<template>
  <ChartPage
    :msm="traceRequest.msm"
    :item-id="traceRequest.id"
    item-type="trace"
    :back-link-text="$t('back-to-trace-logs')"
    :chart-data-fetch-fn="getTraceLogChartData"
  />
</template>

<script>
import ChartPage from '~/components/ChartPage.vue'
import { TraceRequestsService } from '~/logic/modules/trace-requests/trace-requests.service'

export default {
  components: {
    ChartPage
  },

  async asyncData({ route: { params } }) {
    const traceRequest = await TraceRequestsService.getRequest(params.id)

    return {
      traceRequest
    }
  },

  head() {
    return {
      title: this.$t('trace-log-id', {
        id: this.traceRequest.id
      })
    }
  },

  methods: {
    getTraceLogChartData({ variables, itemId }) {
      return TraceRequestsService.getChartData({
        requestId: itemId,
        variables
      })
    }
  }
}
</script>
