<template>
  <div>
    <Table :fields="tableFields" :items="tableItems" :loading="loading" />

    <div class="flex justify-center pt-31 mt-77 border-t border-gray-100">
      <Pagination
        v-model="page"
        :page-count="pageCount"
        @input="requestPageChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'

import Pagination from '~/components/Pagination.vue'
import Table, { XTableField } from '~/components/Table.vue'
import {
  Transaction,
  TRANSACTION_TYPES,
  TransactionsIndexResponse
} from '~/logic/modules/transactions'
import { isDefined, LONG_HYPHEN, valueOrLongHyphen } from '~/logic/utils'
import { xDayjs } from '~/logic/utils/datetime'
import { prettify } from '~/logic/utils/numbers'

@Component({
  components: {
    Table,
    Pagination
  }
})
export default class LegalTransactionsPageTable extends Vue {
  @Prop({ type: Boolean, default: false }) loading!: boolean
  @Prop({ type: Object, required: true })
  transactions!: TransactionsIndexResponse

  page = 1

  get pageCount() {
    return this.transactions.meta?.last_page ?? 0
  }

  get tableFields(): XTableField[] {
    return [
      {
        key: 'time',
        title: 'Дата',
        width: 120
      },
      {
        key: 'card',
        title: 'Карта',
        width: 64
      },
      {
        key: 'operation',
        title: 'AЗС',
        width: 355
      },
      {
        key: 'fuel',
        title: 'Тип топлива',
        width: 102
      },
      {
        key: 'amount',
        title: 'Объем, Л',
        class: 'text-right',
        width: 65
      },
      {
        key: 'weight',
        title: 'Масса, Кг',
        class: 'text-right',
        width: 75
      },
      {
        key: 'price',
        title: 'Цена, ₽',
        class: 'text-right',
        width: 70
      },
      {
        key: 'totalPaid',
        title: 'Сумма, ₽',
        class: 'text-right',
        width: 70
      }
    ]
  }

  get tableItems() {
    return this.transactions.data?.map(t => {
      const isFuelRefill = t.type?.id === TRANSACTION_TYPES.FUEL_REFILL

      return {
        card: this.formatCard(t),
        time: t.created_at
          ? this.formatTransactionDate(t.created_at)
          : LONG_HYPHEN,
        operation: this.getOperationName(t),
        fuel: valueOrLongHyphen(t.fuel_type?.name),
        amount: isFuelRefill && t.amount ? prettify(t.amount) : LONG_HYPHEN,
        weight: t.weight !== 0 ? prettify(t.weight) : LONG_HYPHEN,
        price: isDefined(t.price) ? prettify(t.price!) : LONG_HYPHEN,
        totalPaid: t?.total_price ? prettify(t?.total_price) : LONG_HYPHEN
      }
    })
  }

  @Watch('transactions')
  onTransactionsChanged() {
    this.page = this.transactions.meta?.current_page ?? 1
  }

  requestPageChange() {
    this.$emit('page-change', this.page)
  }

  formatTransactionDate(timestamp: number) {
    return xDayjs.utc(xDayjs.unix(timestamp)).format('DD.MM.YYYY HH:mm')
  }

  formatCard(transaction: Transaction) {
    return transaction.bonus_card?.number
  }

  getOperationName(transaction: Transaction) {
    return valueOrLongHyphen(
      `${transaction.station?.name} (${transaction.station?.address})`
    )
  }
}
</script>
