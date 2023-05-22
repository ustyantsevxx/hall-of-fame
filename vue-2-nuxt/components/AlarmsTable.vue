<template>
  <ProviderDateTimeFormat v-slot="{ formatDate, formatTime }">
    <InfiniteScrollWrapper
      ref="scrollWrapper"
      @bottom-reached="$emit('bottom-reached')"
    >
      <AppTable
        :fields="fields"
        :items="alarms"
        sort-by="timestamp"
        sort-desc
        :loading="loading"
        :empty-text="$t('alarms-not-found')"
        :row-class-fn="
          alarm => ({ 'text-white/60': ifAlarmClosedOrArchived(alarm) })
        "
        @sort-changed="e => $emit('sort-changed', e)"
      >
        <template #head(customerAndProject)>
          <p>{{ $t('customer-0') }}/</p>
          <p>{{ $t('project-0') }}</p>
        </template>

        <template #head(batteryNameAndSerialNumberAndAlarmPath)>
          <p>{{ $t('battery-name-0') }} / {{ $t('serial-number-1') }}/</p>
          <p>{{ $t('alarm-path') }}</p>
        </template>

        <template #head(dateAndTime)>
          <p>{{ $t('date-1') }}/</p>
          <p>{{ $t('time') }}</p>
        </template>

        <template
          #cell(batteryNameAndSerialNumberAndAlarmPath)="{
            definedOrHyphen,
            item
          }"
        >
          <p
            class="truncate pl-6"
            :title="`${item.msm.name} / ${item.msm.serial}`"
          >
            {{ definedOrHyphen(item.msm.name) }} /
            {{ definedOrHyphen(item.msm.serial) }}
          </p>
          <AlarmPathBadge class="mt-4" :alarm-path="item.alarm_path" />
        </template>

        <template #cell(customerAndProject)="{ definedOrHyphen, item }">
          <p class="truncate">
            {{ definedOrHyphen(formatCustomerName(item.msm.project.customer)) }}
          </p>
          <p class="mt-4 truncate text-white/60">
            {{ definedOrHyphen(item.msm.project.name) }}
          </p>
        </template>

        <template #cell(dateAndTime)="{ item }">
          <p>{{ formatDate(item.timestamp) }}</p>
          <p class="mt-6 text-white/60">{{ formatTime(item.timestamp) }}</p>
        </template>

        <template #cell(categoryAndMessage)="{ item }">
          <AlarmMetaDescription :alarm="item" />
        </template>

        <template #cell(status)="{ item }">
          <div
            class="w-max rounded-30 border border-white/10 px-8 py-4 text-main"
          >
            {{ getFormattedStatus(item) }}
          </div>
        </template>

        <template #cell(actions)="{ item }">
          <AlarmsTableActionsCell
            :alarm="item"
            @update="updatedAlarm => $emit('update', updatedAlarm)"
          />
        </template>
      </AppTable>
    </InfiniteScrollWrapper>
  </ProviderDateTimeFormat>
</template>

<script>
import AlarmMetaDescription from '~/components/AlarmMetaDescription.vue'
import AlarmPathBadge from '~/components/AlarmPathBadge.vue'
import AlarmsTableActionsCell from '~/components/AlarmsTableActionsCell.vue'
import AppTable from '~/components/AppTable.vue'
import InfiniteScrollWrapper from '~/components/InfiniteScrollWrapper.vue'
import ProviderDateTimeFormat from '~/components/ProviderDateTimeFormat.vue'
import {
  ALARM_STATUS_KEYS,
  ALARM_STATUSES
} from '~/logic/modules/alarms/alarms.constants'
import { CustomersService } from '~/logic/modules/customers/customers.service'

export default {
  components: {
    InfiniteScrollWrapper,
    AppTable,
    AlarmPathBadge,
    AlarmMetaDescription,
    AlarmsTableActionsCell,
    ProviderDateTimeFormat
  },

  props: {
    alarms: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false }
  },

  computed: {
    fields() {
      return [
        {
          key: 'batteryNameAndSerialNumberAndAlarmPath',
          tdClass: '!p-0 !pl-24',
          width: 330
        },
        {
          key: 'customerAndProject',
          width: 200
        },
        {
          key: 'categoryAndMessage',
          title: `${this.$t('category')}/${this.$t('message')}`,
          width: 320
        },
        {
          key: 'dateAndTime',
          sortable: true,
          sortKey: 'timestamp',
          width: 160
        },
        {
          key: 'status',
          title: this.$t('log-status'),
          rightAligned: true,
          width: 160
        },
        {
          key: 'actions'
        }
      ]
    }
  },

  methods: {
    out_scrollToTop() {
      this.$refs.scrollWrapper.out_scrollToTop()
    },

    getFormattedStatus(alarm) {
      return ALARM_STATUSES[alarm.status]?.display ?? '—'
    },

    ifAlarmClosedOrArchived(alarm) {
      return [ALARM_STATUS_KEYS.CLOSED, ALARM_STATUS_KEYS.ARCHIVED].includes(
        alarm.status
      )
    },

    formatCustomerName(customer) {
      return CustomersService.formatCustomerName(customer)
    }
  }
}
</script>
