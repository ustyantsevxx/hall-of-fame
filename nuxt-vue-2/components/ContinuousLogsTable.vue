<template>
  <ProviderDateTimeFormat v-slot="{ formatDate, formatTime }">
    <InfiniteScrollWrapper
      ref="scrollWrapper"
      @bottom-reached="$emit('bottom-reached')"
    >
      <AppTable
        :fields="fields"
        :items="logs"
        sort-by="timestamp"
        sort-desc
        :loading="loading"
        :empty-text="$t('logs-not-found')"
        @sort-changed="e => $emit('sort-changed', e)"
      >
        <template #head(batteryNameAndSerialNumber)>
          <p>{{ $t('battery-name') }}/</p>
          <p>{{ $t('serial-number') }}</p>
        </template>

        <template #head(customerAndProject)="{ sort, sortedBy, sortedAsc }">
          <ButtonTableHeadSort
            icon="SVGIcon16Customer"
            :sorted-by="sortedBy"
            sort-key="user"
            :sorted-asc="sortedAsc"
            :text="`${$t('customer-1')}/`"
            @sort="sort"
          />

          <ButtonTableHeadSort
            class="mt-1"
            icon="SVGIcon16Project"
            :sorted-by="sortedBy"
            sort-key="project"
            :sorted-asc="sortedAsc"
            :text="$t('project-1')"
            @sort="sort"
          />
        </template>

        <template #head(dateAndTimestamp)>
          <p>{{ $t('date') }}/</p>
          <p>{{ $t('timestamp') }}</p>
        </template>

        <template #cell(batteryNameAndSerialNumber)="{ definedOrHyphen, item }">
          <p>{{ definedOrHyphen(item.name) }}</p>
          <p class="mt-6 text-white/60">
            {{ definedOrHyphen(item.serial) }}
          </p>
        </template>

        <template #cell(customerAndProject)="{ definedOrHyphen, item }">
          <p class="truncate">
            {{ definedOrHyphen(formatCustomerName(item.project.customer)) }}
          </p>
          <p class="mt-6 text-white/60">
            {{ definedOrHyphen(item.project.name) }}
          </p>
        </template>

        <template #cell(dateAndTimestamp)="{ item }">
          <p>{{ formatDate(item.timestamp) }}</p>
          <p class="mt-6 text-white/60">{{ formatTime(item.timestamp) }}</p>
        </template>

        <template #cell(actions)="{ item }">
          <div class="flex items-center justify-end pr-32">
            <AppButton
              size="sm"
              variant="transparent"
              class="!py-7 !pt-6 !pb-5 !pr-8"
              :to="`${logViewPageLinkFn(item)}/export`"
            >
              <span class="flex items-center space-x-8">
                <span>{{ $t('save-csv') }}</span>
                <SVGIcon24Download2 />
              </span>
            </AppButton>

            <AppButton size="sm" class="ml-8" :to="logViewPageLinkFn(item)">
              {{ $t('open-log') }}
            </AppButton>
          </div>
        </template>
      </AppTable>
    </InfiniteScrollWrapper>
  </ProviderDateTimeFormat>
</template>

<script>
import AppButton from '~/components/AppButton.vue'
import AppTable from '~/components/AppTable.vue'
import ButtonTableHeadSort from '~/components/ButtonTableHeadSort.vue'
import InfiniteScrollWrapper from '~/components/InfiniteScrollWrapper.vue'
import ProviderDateTimeFormat from '~/components/ProviderDateTimeFormat.vue'
import { CustomersService } from '~/logic/modules/customers/customers.service'

export default {
  components: {
    InfiniteScrollWrapper,
    AppTable,
    AppButton,
    ProviderDateTimeFormat,
    ButtonTableHeadSort
  },

  props: {
    logs: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false },
    logViewPageLinkFn: { type: Function, required: true }
  },

  computed: {
    fields() {
      return [
        {
          key: 'batteryNameAndSerialNumber',
          width: 400
        },
        {
          key: 'customerAndProject',
          width: 350
        },
        {
          key: 'dateAndTimestamp',
          sortKey: 'timestamp',
          sortable: true,
          width: 350
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

    formatCustomerName(customer) {
      return CustomersService.formatCustomerName(customer)
    }
  }
}
</script>
