<template>
  <ProviderDateTimeFormat v-slot="{ formatDate, formatTime }">
    <InfiniteScrollWrapper @bottom-reached="$emit('bottom-reached')">
      <AppTable
        :fields="fields"
        :items="alarms"
        :loading="loading"
        sort-by="timestamp"
        sort-desc
        :empty-text="$t('no-alarms')"
        row-class="cursor-pointer"
        :row-class-fn="
          alarm => ({
            'opacity-60': ifAlarmClosedOrArchived(alarm)
          })
        "
        @row-click="alarm => $router.push(`/logs/alarm/${alarm.id}`)"
      >
        <template #head(nameSerialPathDateTimestamp)>
          <p>{{ `${$t('name')}/${$t('serial-number-2')}/` }}</p>
          <p>
            {{ `${$t('alarm-path-0')}/${$t('date-3')}/${$t('timestamp-2')}` }}
          </p>
        </template>

        <template
          #cell(nameSerialPathDateTimestamp)="{ item: alarm, definedOrHyphen }"
        >
          <p>{{ definedOrHyphen(alarm.msm.name) }}</p>
          <p class="mt-4">{{ definedOrHyphen(alarm.msm.serial) }}</p>
          <AlarmPathBadge class="mt-4 -ml-6" :alarm-path="alarm.alarm_path" />
          <p class="mt-4">
            {{ formatDate(alarm.timestamp) }}/{{ formatTime(alarm.timestamp) }}
          </p>
        </template>

        <template #cell(categoryMessage)="{ item: alarm }">
          <AlarmMetaDescription :alarm="alarm" />
        </template>
      </AppTable>
    </InfiniteScrollWrapper>
  </ProviderDateTimeFormat>
</template>

<script>
import AlarmMetaDescription from '~/components/AlarmMetaDescription.vue'
import AlarmPathBadge from '~/components/AlarmPathBadge.vue'
import AppTable from '~/components/AppTable.vue'
import InfiniteScrollWrapper from '~/components/InfiniteScrollWrapper.vue'
import ProviderDateTimeFormat from '~/components/ProviderDateTimeFormat.vue'
import { AlarmsService } from '~/logic/modules/alarms/alarms.service'

export default {
  components: {
    InfiniteScrollWrapper,
    AppTable,
    AlarmPathBadge,
    AlarmMetaDescription,
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
          key: 'nameSerialPathDateTimestamp',
          width: 230
        },
        {
          key: 'categoryMessage',
          title: `${this.$t('category-0')}/${this.$t('message-0')}`,
          width: 200
        }
      ]
    }
  },

  methods: {
    ifAlarmClosedOrArchived(alarm) {
      return AlarmsService.ifAlarmClosedOrArchived(alarm)
    }
  }
}
</script>
