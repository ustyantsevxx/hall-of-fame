<template>
  <TableView
    :params.sync="params"
    :title="title"
    :fetch-fn="fetchFn"
    @filtered="resetTableScroll"
  >
    <template #toolbar="{ debounceApplyParam, debounceApplyTimeRange }">
      <div class="flex items-center space-x-12">
        <AppSelect
          :label-formatter="msm => `${msm.name} / ${msm.serial}`"
          style="width: 360px"
          focus-on-slash
          :options="msmList || []"
          :placeholder="$t('filter-by-battery')"
          :selected-fn="
            msm => selectedMsmSerials.find(serial => msm.serial === serial)
          "
          arrow-hidden
          clear-search-on-blur
          no-clear-search-on-select
          no-close-on-select
          @input="msm => handleMsmToggle(msm.serial, debounceApplyParam)"
        />

        <AppDatepicker
          v-model="date"
          :placeholder="$t('filter-by-date-0')"
          style="width: 220px"
        />

        <AppTimeRangePicker
          v-model="timeRange"
          :placeholder="$t('filter-by-time-period')"
          style="width: 220px"
          :disabled="!date"
          :title="!date && $t('select-a-date-first')"
          @input="debounceApplyTimeRange(date, timeRange)"
        />
      </div>
    </template>

    <template
      v-if="selectedMsmSerials.length > 0"
      #second-toolbar="{ debounceApplyParam }"
    >
      <div class="pb-21">
        <div class="flex min-h-[21px] items-center">
          <p class="shrink-0 text-h2">Selected batteries:</p>
          <AppTransition
            tag="div"
            class="ml-12 flex flex-wrap items-end gap-8"
            group
          >
            <ButtonTag
              v-for="serial in selectedMsmSerials"
              :key="serial"
              @click="handleMsmToggle(serial, debounceApplyParam)"
            >
              {{ serial }}
            </ButtonTag>
          </AppTransition>
        </div>
      </div>
    </template>

    <template
      #table="{ items, hasNextPage, fetchNextPage, applySort, loading }"
    >
      <ContinuousLogsTable
        ref="table"
        :loading="loading"
        :logs="items"
        :no-export-button="noExportButton"
        :has-more-pages="hasNextPage"
        :log-view-page-link-fn="logViewPageLinkFn"
        @bottom-reached="fetchNextPage"
        @sort-changed="applySort"
      />
    </template>
  </TableView>
</template>

<script>
import { xor } from 'lodash-es'

import AppDatepicker from '~/components/AppDatepicker.vue'
import AppSelect from '~/components/AppSelect.vue'
import AppTimeRangePicker from '~/components/AppTimeRangePicker.vue'
import AppTransition from '~/components/AppTransition.vue'
import ButtonTag from '~/components/ButtonTag.vue'
import ContinuousLogsTable from '~/components/ContinuousLogsTable.vue'
import TableView from '~/components/TableView.vue'
import { ContinuousLogsA2Service } from '~/logic/modules/continuous-logs-a2/continuous-logs-a2.service'

export default {
  components: {
    TableView,
    ContinuousLogsTable,
    AppDatepicker,
    AppTimeRangePicker,
    AppSelect,
    ButtonTag,
    AppTransition
  },

  props: {
    title: { type: String, required: true },
    fetchFn: { type: Function, required: true },
    logViewPageLinkFn: { type: Function, required: true },
    noExportButton: { type: Boolean, default: false }
  },

  data() {
    return {
      date: null,
      timeRange: null,
      selectedMsmSerials: [],

      params: {
        q: '',
        from: null,
        to: null,
        order_by: 'timestamp',
        order_direction: 'desc',
        msm_serials: []
      }
    }
  },

  head() {
    return {
      title: this.title
    }
  },

  computed: {
    msmList() {
      return this.$store.state.serverCache.msmList
    }
  },

  async created() {
    if (!this.msmList) {
      await this.$store.dispatch('serverCache/fetchMsmList')
    }
  },

  methods: {
    getLogs(...params) {
      return ContinuousLogsA2Service.getLogs(...params)
    },

    resetTableScroll() {
      this.$refs.table.out_scrollToTop()
    },

    toggleMsm(serial) {
      this.selectedMsmSerials = xor(this.selectedMsmSerials, [serial])
    },

    handleMsmToggle(serial, debounceApplyParam) {
      this.selectedMsmSerials = xor(this.selectedMsmSerials, [serial])
      debounceApplyParam({ msm_serials: this.selectedMsmSerials })
    }
  }
}
</script>
