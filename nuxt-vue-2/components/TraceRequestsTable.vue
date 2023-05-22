<template>
  <ProviderDateTimeFormat v-slot="{ formatDate }">
    <InfiniteScrollWrapper
      ref="scrollWrapper"
      @bottom-reached="$emit('bottom-reached')"
    >
      <AppTable
        :fields="fields"
        :items="traceRequests"
        sort-by="from"
        :empty-text="$t('logs-not-found-1')"
        sort-desc
        :loading="loading"
        @sort-changed="sortConfig => $emit('sort-changed', sortConfig)"
      >
        <template #head(creatorAndCreateDate)="{ sort, sortedBy, sortedAsc }">
          <ButtonTableHeadSort
            icon="SVGIcon16Customer"
            :sorted-by="sortedBy"
            sort-key="creator.name"
            :sorted-asc="sortedAsc"
            :text="`${$t('creator')}/`"
            @sort="sort"
          />

          <ButtonTableHeadSort
            class="mt-1"
            icon="SVGIcon16Calendar"
            :sorted-by="sortedBy"
            sort-key="created_at"
            :sorted-asc="sortedAsc"
            :text="$t('create-date')"
            @sort="sort"
          />
        </template>

        <template #cell(nameAndSerialNumber)="{ item }">
          <p class="truncate" :title="item.name">
            {{ item.name }}
          </p>
          <p class="mt-6 truncate text-white/60" :title="item.msm.serial">
            {{ item.msm.serial }}
          </p>
        </template>

        <template #cell(creatorAndCreateDate)="{ item }">
          <p class="truncate" :title="item.creator.name">
            {{ item.creator.name }}
          </p>
          <p class="mt-6 text-white/60">{{ formatDate(item.created_at) }}</p>
        </template>

        <template #cell(values)="{ item }">
          <TraceRequestsTableValuesCell :trace-request="item" />
        </template>

        <template #cell(dateAndTimestamp)="{ item }">
          <p>{{ formatDate(item.from) }}</p>
          <p class="mt-6 text-white/60">
            {{ getTimespan(item.from, item.duration) }}
          </p>
        </template>

        <template #cell(status)="{ item }">
          <BadgeState class="w-max">
            {{ statusDisplayNames[item.status] }}
          </BadgeState>
        </template>

        <template #cell(actions)="{ item }">
          <TraceRequestsTableActionsCell
            :trace-request="item"
            @update-request="
              updatedRequest => $emit('update-request', updatedRequest)
            "
            @delete-request="id => $emit('delete-request', id)"
          />
        </template>
      </AppTable>
    </InfiniteScrollWrapper>
  </ProviderDateTimeFormat>
</template>

<script>
import dayjs from 'dayjs'

import AppTable from '~/components/AppTable.vue'
import BadgeState from '~/components/BadgeState.vue'
import ButtonTableHeadSort from '~/components/ButtonTableHeadSort.vue'
import InfiniteScrollWrapper from '~/components/InfiniteScrollWrapper.vue'
import ProviderDateTimeFormat from '~/components/ProviderDateTimeFormat.vue'
import TraceRequestsTableActionsCell from '~/components/TraceRequestsTableActionsCell.vue'
import TraceRequestsTableValuesCell from '~/components/TraceRequestsTableValuesCell.vue'
import { TRACE_REQUESTS_STATUSES } from '~/logic/modules/trace-requests/trace-requests.constants'

export default {
  components: {
    TraceRequestsTableValuesCell,
    TraceRequestsTableActionsCell,
    InfiniteScrollWrapper,
    AppTable,
    BadgeState,
    ProviderDateTimeFormat,
    ButtonTableHeadSort
  },

  props: {
    traceRequests: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false },
    hideStatusSort: { type: Boolean, default: false }
  },

  computed: {
    fields() {
      return [
        {
          key: 'nameAndSerialNumber',
          title: `${this.$t('name-2')}/${this.$t('serial-number-0')}`,
          width: 270
        },
        {
          key: 'creatorAndCreateDate',
          sortable: true,
          customSortHandler: true,
          width: 250
        },
        {
          key: 'values',
          title: this.$t('value-filters'),
          width: 211
        },
        {
          key: 'dateAndTimestamp',
          title: `${this.$t('date-0')}/${this.$t('timestamp-0')}`,
          sortable: true,
          sortKey: 'from',
          width: 244
        },
        {
          key: 'status',
          title: this.$t('request-status'),
          rightAligned: true,
          sortable: !this.hideStatusSort,
          sortKey: 'status',
          width: 150
        },
        {
          key: 'actions'
        }
      ]
    },

    statusDisplayNames() {
      return {
        [TRACE_REQUESTS_STATUSES.NEW]: this.$t('new'),
        [TRACE_REQUESTS_STATUSES.RECEIVED]: this.$t('received'),
        [TRACE_REQUESTS_STATUSES.ACCEPTED]: this.$t('accepted'),
        [TRACE_REQUESTS_STATUSES.PROCESSED]: this.$t('processed'),
        [TRACE_REQUESTS_STATUSES.VIEWED]: this.$t('viewed'),
        [TRACE_REQUESTS_STATUSES.COMPLETED]: this.$t('completed'),
        [TRACE_REQUESTS_STATUSES.ARCHIVED]: this.$t('archived'),
        [TRACE_REQUESTS_STATUSES.CANCELED]: this.$t('canceled'),
        [TRACE_REQUESTS_STATUSES.CANCEL_RECEIVED]: this.$t('cancel-received')
      }
    }
  },

  methods: {
    out_scrollToTop() {
      this.$refs.scrollWrapper.out_scrollToTop()
    },

    getTimespan(timestamp, durationInSeconds) {
      const from = dayjs.unix(timestamp).format('HH:mm')
      const to = dayjs
        .unix(timestamp)
        .add(durationInSeconds, 'seconds')
        .format('HH:mm')

      return `${from} — ${to}`
    }
  }
}
</script>
