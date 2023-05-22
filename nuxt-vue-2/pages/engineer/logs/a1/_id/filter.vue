<template>
  <FilterPage
    :filters-fetch-fn="getFilters"
    :back-link-fn="getLinkToChartPageWithOptions"
    @submit="goToChartPageWithFilters"
  />
</template>

<script>
import FilterPage from '~/components/FilterPage.vue'
import { ContinuousLogsA1Service } from '~/logic/modules/continuous-logs-a1/continuous-logs-a1.service'
import { stringifyArrayIfNotEmpty } from '~/logic/utils/strings'

export default {
  components: {
    FilterPage
  },

  head() {
    return {
      title: this.$t('filter-continuous-log-a1-id', { id: this.itemId })
    }
  },

  computed: {
    itemId() {
      return this.$route.params.id
    }
  },

  methods: {
    getFilters() {
      return ContinuousLogsA1Service.getFilters(this.itemId)
    },

    getLinkToChartPageWithOptions(options) {
      return {
        path: `/logs/a1/${this.itemId}`,
        query: { options: stringifyArrayIfNotEmpty(options) }
      }
    },

    goToChartPageWithFilters(options) {
      this.$router.push(this.getLinkToChartPageWithOptions(options))
    }
  }
}
</script>
