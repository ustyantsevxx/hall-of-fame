<template>
  <div>
    <h1 class="text-h1">xx xx xx</h1>

    <p class="mt-26 text-subtitle">
      xx xx xx xx xx xx xx xx xx, xx xx xx
      xx.
    </p>

    <h2 class="mt-51 text-h2">xx</h2>

    <Table
      class="mt-16"
      :fields="fuelLimitsFields"
      :items="limits.fuel_type_limits"
    />

    <h2 class="mt-51 text-h2">xx xx xx</h2>

    <Table
      class="mt-36"
      :fields="goodAndServicesLimitsFields"
      :items="limits.product_group_limits"
    />

    <div class="mt-30" style="width: 660px">
      <p class="text-description text-gray">
        xx xx xx xx. xx xx xx xx xx xx xx
        xx xx xx xx xx xx xx.
      </p>

      <p class="mt-20 text-description text-gray">
        xx xx xx xx xx xx xx xx xx
        xx xx/xx xx xx-xx xx.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import Table from '~/components/Table.vue'
import {
  BonusCardFuelLimit,
  BonusCardLimit,
  IBonusCardProductLimit
} from '~/logic/modules/bonus-cards'
import { xDayjs } from '~/logic/utils/datetime'

@Component({
  components: {
    Table
  }
})
export default class IndexPageDiscountCardInfo extends Vue {
  @Prop({ type: Object, required: true }) limits!: BonusCardLimit

  get fuelLimitsFields() {
    return [
      {
        key: 'fuel_name',
        title: 'xx',
        formatter: item => item.fuel_type?.name
      },
      {
        key: 'discount',
        title: 'xx, %',
        formatter: (item: BonusCardFuelLimit) => item.discount?.toFixed(1)
      },
      {
        key: 'day_limit',
        title: 'xx xx, xx',
        classList: 'w-75'
      },
      {
        key: 'limit',
        title: 'xx xx, xx',
        classList: 'w-65'
      },
      {
        key: 'pay_type',
        title: 'xx xx'
      },
      {
        key: 'end_at',
        title: 'xx xx xx',
        formatter: item => (item.end_at ? this.formatDate(item.end_at) : null),
        style: { display: 'inline-block', width: '120px' }
      }
    ]
  }

  get goodAndServicesLimitsFields() {
    return [
      {
        key: 'product_name',
        title: 'xx',
        formatter: (item: IBonusCardProductLimit) => item.product_group?.name
      },
      {
        key: 'discount',
        title: 'xx xx, %',
        formatter: (item: IBonusCardProductLimit) => item.discount?.toFixed(1)
      },

      {
        key: 'end_at',
        title: 'xx xx xx',
        formatter: item => (item.end_at ? this.formatDate(item.end_at) : null)
      }
    ]
  }

  formatDate(timestamp: number) {
    return xDayjs.unix(timestamp).format('DD.MM.YYYY')
  }
}
</script>
