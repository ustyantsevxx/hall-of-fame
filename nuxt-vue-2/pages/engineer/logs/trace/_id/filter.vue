<template>
  <FilterPage
    :filters-fetch-fn="getFilters"
    :back-link-fn="getLinkToChartPageWithOptions"
    @submit="goToChartPageWithFilters"
  />
</template>

<script>
import FilterPage from '~/components/FilterPage.vue'
import { TraceRequestsService } from '~/logic/modules/trace-requests/trace-requests.service'
import { stringifyArrayIfNotEmpty } from '~/logic/utils/strings'

export default {
  components: {
    FilterPage
  },

  head() {
    return {
      title: this.$t('filter-trace-log-id', { id: this.itemId })
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

    getLinkToChartPageWithOptions(options) {
      return {
        path: `/logs/trace/${this.itemId}`,
        query: { options: stringifyArrayIfNotEmpty(options) }
      }
    },

    goToChartPageWithFilters(options) {
      this.$router.push(this.getLinkToChartPageWithOptions(options))
    }
  }
}
</script>
