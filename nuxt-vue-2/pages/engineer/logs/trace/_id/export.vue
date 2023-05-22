<template>
  <FilterPage
    :filters-fetch-fn="getFilters"
    :back-link-fn="() => '/logs/trace'"
    :submit-button-text="$t('export')"
    no-empty-submit
    @submit="exportCSV"
  />
</template>

<script>
import FilterPage from '~/components/FilterPage.vue'
import { TraceRequestsService } from '~/logic/modules/trace-requests/trace-requests.service'
import { getChartRequestBody } from '~/logic/utils/charts'

export default {
  components: {
    FilterPage
  },

  head() {
    return {
      title: this.$t('export-trace-log-id', [this.itemId])
    }
  },

  computed: {
    itemId() {
      return this.$route.params.id
    }
  },

  methods: {
    getFilters() {
      return TraceRequestsService.getFilters(this.itemId)
    },

    exportCSV(options) {
      TraceRequestsService.exportCSV(this.itemId, getChartRequestBody(options))
    }
  }
}
</script>
