<template>
  <ProviderDateTimeFormat v-slot="{ formatDateTime }">
    <InfiniteScrollWrapper @bottom-reached="$emit('bottom-reached')">
      <AppTable
        :fields="fields"
        :items="items"
        :loading="loading"
        sort-by="msm.name"
        sort-desc
        :empty-text="$t('no-batteries')"
        row-class="cursor-pointer"
        :row-class-fn="battery => ({ 'opacity-30': !battery.is_active })"
        :row-tooltip-fn="battery => getRowTooltip(battery, formatDateTime)"
        @sort-changed="sortConfig => $emit('sort-changed', sortConfig)"
        @row-click="battery => $router.push(`/batteries/${battery.msm.id}`)"
      >
        <template #head(temperatures)>
          <p>T min/max,</p>
          <p>&deg;C</p>
        </template>

        <template #head(msmStatus)>
          <p>MSM</p>
          <p>{{ $t('status') }}</p>
        </template>

        <template #head(alarmStatus)>
          <p>{{ $t('alarm') }}</p>
          <p>{{ $t('status-0') }}</p>
        </template>

        <template #cell(name)="{ definedOrHyphen, item }">
          <p class="truncate" :title="item.msm.name">
            {{ definedOrHyphen(item.msm.name) }}
          </p>
          <p class="mt-3 truncate text-white/60" :title="item.msm.serial">
            {{ definedOrHyphen(item.msm.serial) }}
          </p>
        </template>

        <template #cell(sscs)="{ item }">
          <DashboardBatteriesTableSscsCell :battery="item" />
        </template>

        <template #cell(msmStatus)="{ item }">
          <DashboardBatteriesTableMsmStatusCell :battery="item" />
        </template>

        <template #cell(alarmStatus)="{ item }">
          <DashboardBatteriesTableAlarmStatusCell :battery="item" />
        </template>
      </AppTable>
    </InfiniteScrollWrapper>
  </ProviderDateTimeFormat>
</template>

<script>
import AppTable from '~/components/AppTable.vue'
import DashboardBatteriesTableAlarmStatusCell from '~/components/DashboardBatteriesTableAlarmStatusCell.vue'
import DashboardBatteriesTableMsmStatusCell from '~/components/DashboardBatteriesTableMsmStatusCell.vue'
import DashboardBatteriesTableSscsCell from '~/components/DashboardBatteriesTableSscsCell.vue'
import InfiniteScrollWrapper from '~/components/InfiniteScrollWrapper.vue'
import ProviderDateTimeFormat from '~/components/ProviderDateTimeFormat.vue'

export default {
  components: {
    InfiniteScrollWrapper,
    AppTable,
    DashboardBatteriesTableSscsCell,
    DashboardBatteriesTableAlarmStatusCell,
    DashboardBatteriesTableMsmStatusCell,
    ProviderDateTimeFormat
  },

  props: {
    items: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false }
  },

  computed: {
    fields() {
      return [
        {
          key: 'name',
          title: this.$t('battery-name-1'),
          sortable: true,
          sortKey: 'msm.name',
          width: 100
        },
        {
          key: 'sscs',
          title: 'SSC1-10, SoC, %',
          width: 150,
          class: '!pl-8'
        },
        {
          key: 'average_bus_voltage',
          title: `${this.$t('voltage')}, V`,
          rightAligned: true,
          width: 60,
          formatter: ({ average_bus_voltage }) =>
            this.formatMinMaxValuesFromObject(average_bus_voltage)
        },
        {
          key: 'min_ssc_soc',
          title: 'SoC, %',
          rightAligned: true,
          width: 50
        },
        {
          key: 'temperatures',
          rightAligned: true,
          width: 60,
          formatter: ({ temperatures_extremum }) =>
            this.formatMinMaxValuesFromObject(temperatures_extremum)
        },
        {
          key: 'msmStatus',
          width: 80,
          rightAligned: true
        },
        {
          key: 'alarmStatus',
          width: 84,
          rightAligned: true,
          class: '!pr-28'
        }
      ]
    }
  },

  methods: {
    formatMinMaxValuesFromObject(obj) {
      return obj ? `${obj.min ?? '—'}/${obj.max ?? '—'}` : '—'
    },

    getRowTooltip(battery, formatDateTime) {
      if (battery.is_active) {
        return
      }

      const LAST_LOG_DATE_SLOT = '{{LAST_LOG_DATE_SLOT}}'

      let content = `
          <div class='text-center'>
            <p>${this.$t('msm-stopped-sending-logs')}</p>
            ${LAST_LOG_DATE_SLOT}
          </div>
        `

      if (battery.last_log_timestamp) {
        const lastLogTimeFormatted = formatDateTime(battery.last_log_timestamp)

        content = content.replace(
          LAST_LOG_DATE_SLOT,
          `<p class='mt-4 text-white/60'>
              ${this.$t('continuous-log-received')} – ${lastLogTimeFormatted}
               </p>`
        )
      } else {
        content = content.replace(LAST_LOG_DATE_SLOT, '')
      }

      return { html: true, content }
    }
  }
}
</script>
