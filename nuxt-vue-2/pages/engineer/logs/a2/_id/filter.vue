<template>
  <FilterPage
    :filters-fetch-fn="getFilters"
    :back-link-fn="getLinkToChartPageWithOptions"
    @submit="goToChartPageWithFilters"
  />
</template>

<script>
import FilterPage from '~/components/FilterPage.vue'
import { ContinuousLogsA2Service } from '~/logic/modules/continuous-logs-a2/continuous-logs-a2.service'
import { stringifyArrayIfNotEmpty } from '~/logic/utils/strings'

export default {
  components: {
    FilterPage
  },

  head() {
    return {
      title: this.$t('filter-continuous-log-a2-id', { id: this.itemId })
    }
  },

  computed: {
    itemId() {
      return this.$route.params.id
    }
  },

  methods: {
    getFilters() {
      return ContinuousLogsA2Service.getFilters(this.itemId)
    },

    getLinkToChartPageWithOptions(options) {
      return {
        path: `/logs/a2/${this.itemId}`,
        query: { options: stringifyArrayIfNotEmpty(options) }
      }
    },

    goToChartPageWithFilters(options) {
      this.$router.push(this.getLinkToChartPageWithOptions(options))
    }
  }
}
</script>
