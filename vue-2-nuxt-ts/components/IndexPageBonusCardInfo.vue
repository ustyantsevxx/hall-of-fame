<template>
  <div>
    <h1 class="text-h1">Условия бонусной карты</h1>

    <p class="mt-26 text-subtitle">
      Если у вас возник вопрос по условиям вашей карты, обратитесь в службу
      поддержки.
    </p>

    <h2 class="mt-51 text-h2">Топливо</h2>

    <Table
      class="mt-16"
      :fields="fuelLimitsFields"
      :items="limits.fuel_type_limits"
    />

    <h2 class="mt-51 text-h2">Товары и услуги</h2>

    <Table
      class="mt-36"
      :fields="goodAndServicesLimitsFields"
      :items="limits.product_group_limits"
    />

    <div class="mt-30" style="width: 660px">
      <p class="text-description text-gray">
        Указан минимальный бонусный коэффициент. Он может быть выше в
        зависимости от настроек вашей карты или по условиям акций.
      </p>

      <p class="mt-20 text-description text-gray">
        Администрация оставляет за собой право изменять условия или исключать
        некоторые товары/услуги из скидочно-бонусной системы.
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
export default class IndexPageBonusCardInfo extends Vue {
  @Prop({ type: Object, required: true }) limits!: BonusCardLimit

  get fuelLimitsFields() {
    return [
      {
        key: 'fuel_name',
        title: 'Марка',
        formatter: item => item.fuel_type?.name
      },
      {
        key: 'bonus_coefficient',
        title: 'Бонусный коэффициент, %',
        formatter: (item: BonusCardFuelLimit) =>
          item.bonus_coefficient?.toFixed(1)
      },
      {
        key: 'day_limit',
        title: 'Суточный лимит, Л'
      },
      {
        key: 'end_at',
        title: 'Срок окончания действия',
        formatter: item => (item.end_at ? this.formatDate(item.end_at) : null)
      }
    ]
  }

  get goodAndServicesLimitsFields() {
    return [
      {
        key: 'product_name',
        title: 'Группа',
        formatter: (item: IBonusCardProductLimit) => item.product_group?.name
      },
      {
        key: 'bonus_coefficient',
        title: 'Бонусный коэффициент, %',
        formatter: (item: IBonusCardProductLimit) =>
          item.bonus_coefficient?.toFixed(1)
      }
    ]
  }

  formatDate(timestamp: number) {
    return xDayjs.unix(timestamp).format('DD.MM.YYYY')
  }
}
</script>
