<template>
  <ContinuousLogsTablePage
    :title="$t('continuous-logs-a1-0')"
    :fetch-fn="getContinuousLogsA1"
    :log-view-page-link-fn="log => `/logs/a1/${log.id}`"
  />
</template>

<script>
import ContinuousLogsTablePage from '~/components/ContinuousLogsTablePage.vue'
import { ContinuousLogsA1Service } from '~/logic/modules/continuous-logs-a1/continuous-logs-a1.service'

export default {
  components: {
    ContinuousLogsTablePage
  },

  head() {
    return {
      title: this.$t('continuous-logs-a1-1')
    }
  },

  methods: {
    getContinuousLogsA1(params) {
      return ContinuousLogsA1Service.getLogs(params)
    }
  }
}
</script>
