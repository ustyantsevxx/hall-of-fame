<template>
  <FilterPage
    :filters-fetch-fn="getFilters"
    :back-link-fn="() => '/logs/a1'"
    :submit-button-text="$t('export')"
    :no-empty-submit="!treeDisabled"
    :tree-disabled="treeDisabled"
    :submit-disabled="!params.date || !params.duration"
    @submit="exportCSV"
  >
    <template #toolbar>
      <ContinuousLogA1Toolbar
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

import ContinuousLogA1Toolbar from '~/components/ContinuousLogA1Toolbar.vue'
import FilterPage from '~/components/FilterPage.vue'
import { MOMENTARY_DURATION_VALUE } from '~/logic/modules/_shared/continuous-logs/continuous-logs.constants'
import { ContinuousLogsA1Service } from '~/logic/modules/continuous-logs-a1/continuous-logs-a1.service'
import { getChartRequestBody } from '~/logic/utils/charts'

export default {
  components: {
    FilterPage,
    ContinuousLogA1Toolbar
  },

  async asyncData({ route: { params } }) {
    const log = await ContinuousLogsA1Service.getLog(params.id)
    const {
      initialDate,
      initialDurationOption,
      initialTimeOption
    } = await ContinuousLogsA1Service.getChartDataToolbarData(log, true)

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
      title: this.$t('export-continuous-log-a1-id', [this.log.id])
    }
  },

  computed: {
    treeDisabled() {
      return this.params.duration === MOMENTARY_DURATION_VALUE
    }
  },

  methods: {
    getFilters() {
      return ContinuousLogsA1Service.getFilters(this.log.id)
    },

    exportCSV(options) {
      ContinuousLogsA1Service.exportCSV(this.log.id, {
        variables: getChartRequestBody(options),
        date: this.params.date,
        duration: this.params.duration
      })
    }
  }
}
</script>
