<template>
  <TableView
    :title="$t('trace-logs-2')"
    :params.sync="params"
    :fetch-fn="getTraceRequests"
  >
    <template #toolbar>
      <TraceRequestCreatePageLink />
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
        class="overflow-x-hidden"
        hide-status-sort
        :loading="loading"
        :trace-requests="items"
        @bottom-reached="fetchNextPage"
        @sort-changed="applySort"
        @update-request="
          updatedRequest =>
            handleUpdateRequest(updatedRequest, { updateItem, deleteItem })
        "
        @delete-request="
          updatedRequest =>
            handleUpdateRequest(updatedRequest, { updateItem, deleteItem })
        "
      />
    </template>
  </TableView>
</template>

<script>
import TableView from '~/components/TableView.vue'
import TraceRequestCreatePageLink from '~/components/TraceRequestCreatePageLink.vue'
import TraceRequestsTable from '~/components/TraceRequestsTable.vue'
import { TRACE_REQUESTS_STATUSES } from '~/logic/modules/trace-requests/trace-requests.constants'
import { TraceRequestsService } from '~/logic/modules/trace-requests/trace-requests.service'

export default {
  components: {
    TableView,
    TraceRequestCreatePageLink,
    TraceRequestsTable
  },

  data() {
    return {
      params: {
        order_by: 'from',
        order_direction: 'desc',
        status: 'completed'
      }
    }
  },

  methods: {
    getTraceRequests(...params) {
      return TraceRequestsService.getRequests(...params)
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
