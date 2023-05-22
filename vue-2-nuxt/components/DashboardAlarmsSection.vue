<template>
  <TableView :title="$t('latest-alarms')" :fetch-fn="getAlarms">
    <template #toolbar>
      <AppButton size="sm" to="/logs/alarm">{{ $t('show-all') }}</AppButton>
    </template>

    <template #table="{ items, fetchNextPage, loading }">
      <DashboardAlarmsTable
        class="overflow-x-hidden"
        :alarms="items"
        :loading="loading"
        @bottom-reached="fetchNextPage"
      />
    </template>
  </TableView>
</template>

<script>
import AppButton from '~/components/AppButton.vue'
import DashboardAlarmsTable from '~/components/DashboardAlarmsTable.vue'
import TableView from '~/components/TableView.vue'
import { AlarmsService } from '~/logic/modules/alarms/alarms.service'

export default {
  components: {
    AppButton,
    DashboardAlarmsTable,
    TableView
  },

  methods: {
    getAlarms(...params) {
      return AlarmsService.getAlarms(...params)
    }
  }
}
</script>
