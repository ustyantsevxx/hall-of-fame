<template>
  <TableView
    :title="$t('alarm-logs-0')"
    :params.sync="params"
    :fetch-fn="getAlarms"
    @filtered="resetTableScroll"
    @update:params="handleUpdateParams"
  >
    <template
      #toolbar="{ debounceApplyParam, debounceApplyTimeRange, applyParam }"
    >
      <div class="flex items-center space-x-12">
        <CheckboxShowArchived
          :value="params.show_archived"
          class="mr-12"
          :cache-key="$options.SHOW_ARCHIVED_CACHE_KEY"
          @input="value => applyParam({ show_archived: value })"
        />

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
          :placeholder="$t('filter-by-date-1')"
          style="width: 220px"
        />

        <AppTimeRangePicker
          v-model="timeRange"
          :placeholder="$t('filter-by-time-period-0')"
          style="width: 220px"
          :disabled="!date"
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
      #table="{
        items,
        fetchNextPage,
        applySort,
        updateItem,
        deleteItem,
        loading
      }"
    >
      <AlarmsTable
        ref="table"
        :loading="loading"
        :alarms="items"
        @bottom-reached="fetchNextPage"
        @sort-changed="applySort"
        @update="
          updatedAlarm =>
            handleUpdateAlarm(updatedAlarm, { updateItem, deleteItem })
        "
      />
    </template>
  </TableView>
</template>

<script>
import { xor } from 'lodash-es'

import AlarmsTable from '~/components/AlarmsTable.vue'
import AppDatepicker from '~/components/AppDatepicker.vue'
import AppSelect from '~/components/AppSelect.vue'
import AppTimeRangePicker from '~/components/AppTimeRangePicker.vue'
import AppTransition from '~/components/AppTransition.vue'
import ButtonTag from '~/components/ButtonTag.vue'
import CheckboxShowArchived from '~/components/CheckboxShowArchived.vue'
import TableView from '~/components/TableView.vue'
import { ALARM_STATUSES } from '~/logic/modules/alarms/alarms.constants'
import { AlarmsService } from '~/logic/modules/alarms/alarms.service'

export default {
  SHOW_ARCHIVED_CACHE_KEY: 'alarms-show-archived',

  components: {
    AppDatepicker,
    AppTimeRangePicker,
    AlarmsTable,
    TableView,
    CheckboxShowArchived,
    AppTransition,
    AppSelect,
    ButtonTag
  },

  data() {
    const showArchivedSavedState = this.$cookies.get(
      this.$options.SHOW_ARCHIVED_CACHE_KEY
    )

    return {
      date: '',
      timeRange: null,
      selectedMsmSerials: [],

      params: {
        q: '',
        show_archived: showArchivedSavedState ?? true,
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
      title: this.$t('alarm-logs-1')
    }
  },

  computed: {
    msmList() {
      return this.$store.state.serverCache.msmList
    }
  },

  watch: {
    date(value) {
      if (!value) {
        this.timeRange = null
        this.params.from = null
        this.params.to = null
      }
    }
  },

  async created() {
    if (!this.msmList) {
      await this.$store.dispatch('serverCache/fetchMsmList')
    }
  },

  methods: {
    getAlarms(...params) {
      return AlarmsService.getAlarms(...params)
    },

    resetTableScroll() {
      this.$refs.table.out_scrollToTop()
    },

    handleUpdateAlarm(updatedAlarm, { updateItem, deleteItem }) {
      if (
        updatedAlarm.status === ALARM_STATUSES.ARCHIVED &&
        !this.params.show_archived
      ) {
        deleteItem(updatedAlarm.id)
      } else {
        updateItem(updatedAlarm.id, updatedAlarm)
      }
    },

    toggleMsm(serial) {
      this.selectedMsmSerials = xor(this.selectedMsmSerials, [serial])
    },

    handleMsmToggle(serial, debounceApplyParam) {
      this.selectedMsmSerials = xor(this.selectedMsmSerials, [serial])
      debounceApplyParam({ msm_serials: this.selectedMsmSerials })
    },

    handleUpdateParams() {
      this.selectedMsmSerials = this.params.msm_serials ?? []
    }
  }
}
</script>
