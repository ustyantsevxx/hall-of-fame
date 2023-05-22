<template>
  <DefaultLayout>
    <CustomerViewPageHeadSection />

    <CustomerViewPageProfileSection
      class="mt-13"
      :customer="customer"
      @profile-updated="refetchCustomer"
    />

    <CustomerViewPageNotesSection
      class="mt-12 grow"
      :customer="customer"
      @notes-updated="refetchCustomer"
    />
  </DefaultLayout>
</template>

<script>
import CustomerViewPageHeadSection from '~/components/CustomerViewPageHeadSection.vue'
import CustomerViewPageNotesSection from '~/components/CustomerViewPageNotesSection.vue'
import CustomerViewPageProfileSection from '~/components/CustomerViewPageProfileSection.vue'
import DefaultLayout from '~/components/DefaultLayout.vue'
import { CustomersService } from '~/logic/modules/customers/customers.service'

export default {
  components: {
    CustomerViewPageProfileSection,
    CustomerViewPageNotesSection,
    CustomerViewPageHeadSection,
    DefaultLayout
  },

  async asyncData({ route: { params } }) {
    return {
      customer: await CustomersService.getCustomerById(params.id)
    }
  },

  head() {
    return {
      title: this.$t('customer-settings-0', [
        CustomersService.formatCustomerName(this.customer)
      ])
    }
  },

  methods: {
    async refetchCustomer() {
      this.customer = await CustomersService.getCustomerById(this.customer.id)
    }
  }
}
</script>
