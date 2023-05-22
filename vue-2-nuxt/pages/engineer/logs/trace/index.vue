<template>
  <TableView
    :title="$t('trace-logs-0')"
    :params.sync="params"
    :fetch-fn="getTraceRequests"
    @filtered="resetTableScroll"
  >
    <template #toolbar="{ debounceApplyParam, applyParam }">
      <CheckboxShowArchived
        :value="params.show_archived"
        :cache-key="$options.SHOW_ARCHIVED_CACHE_KEY"
        @input="value => applyParam({ show_archived: value })"
      />

      <InputSearch
        :value="params.q"
        focus-on-slash
        class="ml-28"
        :placeholder="$t('search-for-logs')"
        style="width: 360px"
        @input="value => debounceApplyParam({ q: value })"
        @clear="applyParam({ q: '' })"
      />

      <TraceRequestCreatePageLink class="ml-28" />
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
      <TraceRequestsTable
        ref="table"
        :loading="loading"
        :trace-requests="items"
        @bottom-reached="fetchNextPage"
        @sort-changed="applySort"
        @update-request="
          updatedRequest =>
            handleUpdateRequest(updatedRequest, { updateItem, deleteItem })
        "
        @delete-request="id => deleteItem(id)"
      />
    </template>
  </TableView>
</template>

<script>
import CheckboxShowArchived from '~/components/CheckboxShowArchived.vue'
import InputSearch from '~/components/InputSearch.vue'
import TableView from '~/components/TableView.vue'
import TraceRequestCreatePageLink from '~/components/TraceRequestCreatePageLink.vue'
import TraceRequestsTable from '~/components/TraceRequestsTable.vue'
import { TRACE_REQUESTS_STATUSES } from '~/logic/modules/trace-requests/trace-requests.constants'
import { TraceRequestsService } from '~/logic/modules/trace-requests/trace-requests.service'

export default {
  SHOW_ARCHIVED_CACHE_KEY: 'trace-requests-show-archived',

  components: {
    TableView,
    TraceRequestsTable,
    TraceRequestCreatePageLink,
    CheckboxShowArchived,
    InputSearch
  },

  data() {
    const showArchivedSavedState = this.$cookies.get(
      this.$options.SHOW_ARCHIVED_CACHE_KEY
    )

    return {
      params: {
        q: '',
        order_by: 'from',
        order_direction: 'desc',
        show_archived: showArchivedSavedState ?? true
      }
    }
  },

  head() {
    return {
      title: this.$t('trace-logs-1')
    }
  },

  methods: {
    getTraceRequests(...params) {
      return TraceRequestsService.getRequests(...params)
    },

    resetTableScroll() {
      this.$refs.table.out_scrollToTop()
    },

    handleUpdateRequest(updatedRequest, { updateItem, deleteItem }) {
      if (updatedRequest.status === TRACE_REQUESTS_STATUSES.COMPLETED) {
        this.$store.dispatch('fetchCompletedTraceRequestsCount')
      }

      if (
        updatedRequest.status === TRACE_REQUESTS_STATUSES.ARCHIVED &&
        !this.params.show_archived
      ) {
        deleteItem(updatedRequest.id)
      } else {
        updateItem(updatedRequest.id, updatedRequest)
      }
    }
  }
}
</script>
