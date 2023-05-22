<template>
  <DefaultLayout wrapper-class="overflow-hidden">
    <TableView
      ref="TableView"
      :title="$t('customers-0')"
      :params.sync="params"
      transitions-disabled
      :fetch-fn="getPaginatedCustomers"
    >
      <template #after-title>
        <AppButton class="ml-24" size="sm" variant="dark" @click="addCustomer">
          + {{ $t('add-new') }}
        </AppButton>
        <ModalCustomer ref="ModalCustomer" />
      </template>

      <template #toolbar="{ debounceApplyParam, applyParam }">
        <CheckboxShowArchived
          :value="params.show_archived"
          class="mr-24"
          :cache-key="$options.SHOW_ARCHIVED_CACHE_KEY"
          @input="value => applyParam({ show_archived: value })"
        />

        <InputSearch
          :value="params.q"
          focus-on-slash
          style="width: 360px"
          @input="value => debounceApplyParam({ q: value })"
          @clear="applyParam({ q: '' })"
        />
      </template>

      <template #table="{ items, fetchNextPage, loading, reset }">
        <CustomersTable
          ref="CustomersTable"
          :loading="loading"
          :items="items"
          @bottom-reached="fetchNextPage"
          @updated="handleTableUpdated(reset)"
        />
      </template>
    </TableView>
  </DefaultLayout>
</template>

<script>
import AppButton from '~/components/AppButton.vue'
import CheckboxShowArchived from '~/components/CheckboxShowArchived.vue'
import CustomersTable from '~/components/CustomersTable.vue'
import DefaultLayout from '~/components/DefaultLayout.vue'
import InputSearch from '~/components/InputSearch.vue'
import ModalCustomer from '~/components/ModalCustomer.vue'
import TableView from '~/components/TableView.vue'
import { CustomersService } from '~/logic/modules/customers/customers.service'

export default {
  SHOW_ARCHIVED_CACHE_KEY: 'customers-show-archived',

  components: {
    TableView,
    CustomersTable,
    ModalCustomer,
    AppButton,
    CheckboxShowArchived,
    InputSearch,
    DefaultLayout
  },

  data() {
    const showArchivedSavedState = this.$cookies.get(
      this.$options.SHOW_ARCHIVED_CACHE_KEY
    )

    return {
      params: {
        q: '',
        show_archived: showArchivedSavedState ?? true
      }
    }
  },

  head() {
    return {
      title: this.$t('customers-1')
    }
  },

  methods: {
    getPaginatedCustomers(...params) {
      return CustomersService.getPaginatedCustomers(...params)
    },

    async addCustomer() {
      const created = await this.$refs.ModalCustomer.open()

      if (created) {
        this.$refs.TableView.out_fetch()
      }
    },

    async handleTableUpdated(reset) {
      await reset()
      this.$refs.CustomersTable.out_scrollToTop()
    }
  }
}
</script>
