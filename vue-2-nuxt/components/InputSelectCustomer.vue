<template>
  <div>
    <AppFormGroup
      :label-class="{ 'text-white/40': disabled }"
      :label="$t('customer-123')"
      :no-bottom-message="noBottomMessage"
    >
      <template #default="{ id }">
        <AppSelect
          :id="id"
          :disabled="disabled"
          :value="value"
          :invalid="invalid"
          :options="customers"
          :loading="loading"
          track-by="id"
          :label-formatter="formatCustomerName"
          :no-options-text="$t('no-customers')"
          :placeholder="$t('select-customer-23')"
          @input="customerId => $emit('input', customerId)"
        />
      </template>

      <template v-if="!addHidden" #after-label>
        <ButtonBlueText class="h-max text-main" @click="addCustomer">
          + {{ $t('add-new-customer') }}
        </ButtonBlueText>
      </template>
    </AppFormGroup>

    <ModalCustomer v-if="!addHidden" ref="ModalCustomer" />
  </div>
</template>

<script>
import AppFormGroup from '~/components/AppFormGroup.vue'
import AppSelect from '~/components/AppSelect.vue'
import ButtonBlueText from '~/components/ButtonBlueText.vue'
import ModalCustomer from '~/components/ModalCustomer.vue'
import { CustomersService } from '~/logic/modules/customers/customers.service'

export default {
  components: {
    AppFormGroup,
    ButtonBlueText,
    ModalCustomer,
    AppSelect
  },

  props: {
    value: { type: Number, default: null },
    invalid: { type: Boolean, default: false },
    addHidden: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    noBottomMessage: { type: Boolean, default: false }
  },

  data() {
    return {
      customers: [],
      loading: false
    }
  },

  async created() {
    if (!this.disabled) {
      await this.fetchCustomers()
    }
  },

  methods: {
    formatCustomerName({ surname, name }) {
      return CustomersService.formatCustomerName({ surname, name })
    },

    async fetchCustomers() {
      this.loading = true
      try {
        this.customers = await CustomersService.getAllCustomers()
      } finally {
        this.loading = false
      }
    },

    async addCustomer() {
      const newCustomerId = await this.$refs.ModalCustomer.open()

      if (newCustomerId) {
        await this.fetchCustomers()
        const newCustomerOption = this.customers.find(
          customer => customer.id === newCustomerId
        )
        if (newCustomerOption) {
          this.$emit('input', newCustomerOption)
        }
      }
    }
  }
}
</script>
