<template>
  <FilterPage
    :filters-fetch-fn="getFilters"
    :back-link-fn="() => '/logs/a2'"
    :submit-button-text="$t('export')"
    no-empty-submit
    :submit-disabled="!params.date || !params.duration"
    @submit="exportCSV"
  >
    <template #toolbar>
      <ContinuousLogA2Toolbar
        v-model="params"
        allow-null-values
        add-momentary
        class="ml-32"
        :log="log"
      />
    </template>
  </FilterPage>
</template>

<script>
import dayjs from 'dayjs'

import ContinuousLogA2Toolbar from '~/components/ContinuousLogA2Toolbar.vue'
import FilterPage from '~/components/FilterPage.vue'
import { ContinuousLogsA2Service } from '~/logic/modules/continuous-logs-a2/continuous-logs-a2.service'
import { getChartRequestBody } from '~/logic/utils/charts'

export default {
  components: {
    FilterPage,
    ContinuousLogA2Toolbar
  },

  async asyncData({ route: { params } }) {
    const log = await ContinuousLogsA2Service.getLog(params.id)
    const {
      initialDate,
      initialDurationOption,
      initialTimeOption
    } = ContinuousLogsA2Service.getChartDataToolbarData(log, true)

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
      title: this.$t('export-continuous-log-a2-id', [this.itemId])
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

    exportCSV(options) {
      ContinuousLogsA2Service.exportCSV(this.itemId, {
        variables: getChartRequestBody(options),
        date: this.params.date,
        duration: this.params.duration
      })
    }
  }
}
</script>
