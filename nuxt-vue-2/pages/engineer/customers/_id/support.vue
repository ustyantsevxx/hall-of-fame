<template>
  <DefaultLayout wrapper-class="overflow-hidden">
    <CustomerSupportPageHeadSection :customer="customer" />
    <CustomerSupportPageEditorSection
      :customer="customer"
      class="mt-13 overflow-hidden"
      @updated="refetchCustomer"
    />
  </DefaultLayout>
</template>

<script>
import CustomerSupportPageEditorSection from '~/components/CustomerSupportPageEditorSection.vue'
import CustomerSupportPageHeadSection from '~/components/CustomerSupportPageHeadSection.vue'
import DefaultLayout from '~/components/DefaultLayout.vue'
import { CustomersService } from '~/logic/modules/customers/customers.service'

export default {
  components: {
    CustomerSupportPageHeadSection,
    CustomerSupportPageEditorSection,
    DefaultLayout
  },

  async asyncData({ route: { params } }) {
    return {
      customer: await CustomersService.getCustomerById(params.id)
    }
  },

  head() {
    return {
      title: this.$t('0-support-manager-contacts', [
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
