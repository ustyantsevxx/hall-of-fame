<template>
  <div class="flex items-center">
    <SVGIcon24Foled v-if="item.customer.is_archived" class="mr-8 shrink-0" />

    <p class="truncate" :title="formattedCustomerName">
      {{ formattedCustomerName }}
    </p>

    <CustomersTableCustomerCellExpandButton
      v-if="item.projectCount > 1 || item.meta.totalBatteryCount > 1"
      class="shrink-0"
      :item="item"
      :formatted-customer-name="formattedCustomerName"
      @toggle-expand="$emit('toggle-expand')"
    />

    <TableActionsPopover
      left-side
      button-class="w-16 h-16 ml-8 !rounded-4 !p-0"
      button-icon="SVGIcon16KebabVertical"
      :actions="actions"
      :callback-data="item"
    />

    <ModalConfirm
      ref="ModalConfirm"
      :title="$t('confirm-delete-0')"
      :subtitle="$t('you-really-want-to-delete-this-customer')"
      :confirm-text="$t('delete-customer')"
    />

    <ModalProject ref="ModalProject" :customer-id="item.customer.id" />
  </div>
</template>

<script>
import CustomersTableCustomerCellExpandButton from '~/components/CustomersTableCustomerCellExpandButton.vue'
import ModalConfirm from '~/components/ModalConfirm.vue'
import ModalProject from '~/components/ModalProject.vue'
import TableActionsPopover, {
  TABLE_ACTION_TYPES
} from '~/components/TableActionsPopover.vue'
import { CustomersService } from '~/logic/modules/customers/customers.service'

export default {
  components: {
    CustomersTableCustomerCellExpandButton,
    TableActionsPopover,
    ModalConfirm,
    ModalProject
  },

  props: {
    item: { type: Object, required: true }
  },

  computed: {
    formattedCustomerName() {
      return CustomersService.formatCustomerName(this.item.customer)
    },

    actions() {
      return [
        !this.item.customer.is_archived
          ? [
              {
                type: TABLE_ACTION_TYPES.BUTTON,
                text: 'Edit customer',
                icon: 'SVGIcon24Edit',
                callback: item => {
                  this.$router.push(`/customers/${item.customer.id}`)
                }
              },

              {
                type: TABLE_ACTION_TYPES.BUTTON,
                text: 'Add new project',
                icon: 'SVGIcon24Add',
                callback: async () => {
                  const created = await this.$refs.ModalProject.open()
                  if (created) {
                    this.$emit('create-project')
                  }
                }
              },
              {
                type: TABLE_ACTION_TYPES.BUTTON,
                text: 'Archive',
                icon: 'SVGIcon24Archive',
                callback: async item => {
                  const { success } = await CustomersService.archiveCustomer(
                    item.customer.id
                  )
                  if (success) {
                    this.emitUpdateCustomer({ is_archived: true })
                  }
                }
              }
            ]
          : {
              type: TABLE_ACTION_TYPES.BUTTON,
              text: 'Unarchive',
              icon: 'SVGIcon24Archive',
              callback: async item => {
                const { success } = await CustomersService.unarchiveCustomer(
                  item.customer.id
                )
                if (success) {
                  this.emitUpdateCustomer({ is_archived: false })
                }
              }
            },
        {
          type: TABLE_ACTION_TYPES.BUTTON,
          text: 'Delete',
          icon: 'SVGIcon24Delete',
          callback: async item => {
            const confirmed = await this.$refs.ModalConfirm.open()
            if (confirmed) {
              const { success } = await CustomersService.deleteCustomer(
                item.customer.id
              )
              if (success) {
                this.$emit('delete-customer', item.customer.id)
              }
            }
          }
        }
      ].flat()
    }
  },

  methods: {
    emitUpdateCustomer(partialCustomerData) {
      this.$emit('update-customer', {
        id: this.item.customer.id,
        data: partialCustomerData
      })
    }
  }
}
</script>
