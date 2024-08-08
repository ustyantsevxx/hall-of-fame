<template>
  <Table
    :fields="tableFields"
    :items="tableItems"
    :loading="loading"
    :meta-pagination="operations.meta"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import Table, { XTableField } from '~/components/Table.vue'
import { UserOperationsModule } from '~/logic/modules/user-operations'
import { UserOperation } from '~/logic/modules/user-operations/user-operations.types'
import { MetaPagination } from '~/logic/types/api-meta'
import { prettify } from '~/logic/utils/numbers'

@Component({
  components: {
    Table
  }
})
export default class LegalFundsPageOperationsTable extends Vue {
  @Prop({ type: Boolean, default: false }) loading!: boolean
  @Prop({ type: Object, required: true })
  operations!: { data: UserOperation[]; meta: MetaPagination }

  get tableFields(): XTableField[] {
    return [
      {
        key: 'paymentOrder',
        title: 'xx xx'
      },
      {
        key: 'totalPaid',
        title: 'xx, ₽',
        width: 105,
        class: 'text-right'
      }
    ]
  }

  get tableItems() {
    return (
      this.operations?.data?.map(o => {
        return {
          paymentOrder: UserOperationsModule.getOperationName(o),
          totalPaid: prettify(o.amount)
        }
      }) || []
    )
  }
}
</script>
