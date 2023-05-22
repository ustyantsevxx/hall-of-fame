<template>
  <FilterPage
    :filters-fetch-fn="getFilters"
    :back-link-fn="() => '/logs/alarm'"
    :submit-button-text="$t('export')"
    no-empty-submit
    @submit="exportCSV"
  />
</template>

<script>
import FilterPage from '~/components/FilterPage.vue'
import { AlarmsService } from '~/logic/modules/alarms/alarms.service'
import { getChartRequestBody } from '~/logic/utils/charts'

export default {
  components: {
    FilterPage
  },

  head() {
    return {
      title: this.$t('export-alarm-log-id', [this.itemId])
    }
  },

  computed: {
    itemId() {
      return this.$route.params.id
    }
  },

  methods: {
    getFilters() {
      return AlarmsService.getFilters(this.itemId)
    },

    exportCSV(options) {
      AlarmsService.exportCSV(this.itemId, getChartRequestBody(options))
    }
  }
}
</script>
