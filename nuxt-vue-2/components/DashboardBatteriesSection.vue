<template>
  <TableView
    :title="$t('all-batteries')"
    :params.sync="params"
    :fetch-fn="getMsms"
  >
    <template #toolbar="{ debounceApplyParam, applyParam }">
      <InputSearch
        :value="params.q"
        style="width: 360px"
        focus-on-slash
        :placeholder="$t('search-for-a-battery')"
        @input="value => debounceApplyParam({ q: value })"
        @clear="applyParam({ q: '' })"
      />
    </template>

    <template #table="{ items, loading, fetchNextPage, applySort }">
      <DashboardBatteriesTable
        class="overflow-x-hidden"
        :loading="loading"
        :items="items"
        @sort-changed="applySort"
        @bottom-reached="fetchNextPage"
      />
    </template>
  </TableView>
</template>

<script>
import DashboardBatteriesTable from '~/components/DashboardBatteriesTable.vue'
import InputSearch from '~/components/InputSearch.vue'
import TableView from '~/components/TableView.vue'
import { MsmsService } from '~/logic/modules/msms/msms.service'

export default {
  components: {
    TableView,
    DashboardBatteriesTable,
    InputSearch
  },

  data() {
    return {
      params: {
        q: ''
      }
    }
  },

  methods: {
    getMsms(...params) {
      return MsmsService.getPaginatedMsms(...params)
    }
  }
}
</script>
