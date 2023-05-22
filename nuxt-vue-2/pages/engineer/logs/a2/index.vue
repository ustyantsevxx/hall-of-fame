<template>
  <ContinuousLogsTablePage
    :title="$t('continuous-logs-a2-0')"
    :fetch-fn="getContinuousLogsA2"
    :log-view-page-link-fn="log => `/logs/a2/${log.id}`"
  />
</template>

<script>
import ContinuousLogsTablePage from '~/components/ContinuousLogsTablePage.vue'
import { ContinuousLogsA2Service } from '~/logic/modules/continuous-logs-a2/continuous-logs-a2.service'

export default {
  components: {
    ContinuousLogsTablePage
  },

  head() {
    return {
      title: this.$t('continuous-logs-a2-1')
    }
  },

  methods: {
    getContinuousLogsA2(params) {
      return ContinuousLogsA2Service.getLogs(params)
    }
  }
}
</script>
