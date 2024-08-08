<template>
  <div>
    <Table :fields="tableFields" :items="tableItems">
      <template #cell(cardAndTime)="{ value: cardAndTime }">
        <span>{{ cardAndTime.card }}</span>
        <br />
        <span class="text-gray">{{ cardAndTime.time }}</span>
      </template>

      <template #cell(totalPaid)="{ value: totalPaid }">
        <span v-if="totalPaid.discount">{{ totalPaid.discount }}</span>
        <span>{{ totalPaid.value }}</span>
        <br />
        <span v-if="totalPaid.discountValue" class="text-gray">
          {{ totalPaid.discountValue }}
        </span>
      </template>

      <template #cell(bonusAdded)="{ value: bonusAdded }">
        <span>{{ bonusAdded.value }}</span>
        <br />
        <span class="text-gray">
          {{ bonusAdded.coefficient }}
        </span>
      </template>
    </Table>

    <div class="flex justify-center mt-30">
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :page-range="5"
        prev-text=""
        next-text=""
        container-class="flex"
        active-class="x-page--active"
        page-link-class="pt-11 px-19 rounded-10 text-blue block pb-12 transition-colors duration-150 ease-in-out border border-transparent outline-none"
        @input="requestPageChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import Paginate from 'vuejs-paginate'

import Table, { XTableField } from '~/components/Table.vue'
import {
  BONUS_CARD_TYPE_NAMES,
  BONUS_CARD_TYPES
} from '~/logic/modules/bonus-cards'
import {
  Transaction,
  TRANSACTION_TYPES,
  Transactions,
  TransactionsIndexResponse
} from '~/logic/modules/transactions'
import { LONG_HYPHEN, valueOrLongHyphen } from '~/logic/utils'
import { xDayjs } from '~/logic/utils/datetime'

@Component({
  components: {
    Table,
    Paginate
  }
})
export default class HistoryPageTransactions extends Vue {
  @Prop({ type: Object, required: true })
  transactions!: TransactionsIndexResponse

  page = 1

  get pageCount() {
    return this.transactions.meta?.last_page ?? 0
  }

  get tableFields(): XTableField[] {
    return [
      {
        key: 'cardAndTime',
        title: 'xx xx xx',
        width: 180
      },
      {
        key: 'operation',
        title: 'xx',
        width: 280
      },
      {
        key: 'fuel',
        title: 'xx xx',
        width: 90
      },
      {
        key: 'amount',
        title: 'xx',
        class: 'text-right',
        width: 60
      },
      {
        key: 'price',
        title: 'xx, ₽/xx',
        class: 'text-right',
        width: 70
      },
      {
        key: 'totalPaid',
        title: 'xx, ₽',
        class: 'text-right',
        width: 130
      },
      {
        key: 'bonusAdded',
        title: 'xx xx, ₽',
        class: 'text-right',
        width: 90
      },
      {
        key: 'bonusRemoved',
        title: 'xx xx, ₽',
        class: 'text-right',
        width: 90
      }
    ]
  }

  get tableItems() {
    return this.transactions.data?.map(t => {
      const isDiscount = t.bonus_card?.type?.id === BONUS_CARD_TYPES.DISCOUNT
      const isFuelRefill = t.type?.id === TRANSACTION_TYPES.FUEL_REFILL

      return {
        cardAndTime: {
          card: this.formatCard(t),
          time: this.formatTransactionDate(t.created_at ?? 0)
        },
        operation: this.getOperationName(t),
        fuel: valueOrLongHyphen(t.fuel_type?.name),
        amount: isFuelRefill ? t.amount : LONG_HYPHEN,
        price: t.price,
        totalPaid: {
          value: t.total_price,
          discount: isDiscount ? `(${t.discount?.value}%)` : undefined,
          discountValue: isDiscount
            ? `xx = ${t.discount?.price}`
            : undefined
        },
        bonusAdded: {
          value: valueOrLongHyphen(t.bonus?.credit || null),
          coefficient:
            !isDiscount && t.bonus?.coefficient
              ? `+${t.bonus?.coefficient}%`
              : ''
        },
        bonusRemoved: valueOrLongHyphen(
          t.bonus?.debit ? `-${t.bonus.debit}` : null
        )
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
    return xDayjs.unix(timestamp).format('DD.MM.YYYY HH:MM')
  }

  formatCard(transaction: Transaction) {
    const typeName = transaction.bonus_card?.type?.id
      ? BONUS_CARD_TYPE_NAMES[transaction.bonus_card?.type?.id]
      : ''

    return `${typeName} №${transaction.bonus_card?.number ?? ''}`
  }

  getOperationName(transaction: Transaction) {
    return valueOrLongHyphen(Transactions.getOperationName(transaction))
  }
}
</script>

<style>
.x-page--active a {
  @apply text-black border-gray-100 !important;
}
</style>
