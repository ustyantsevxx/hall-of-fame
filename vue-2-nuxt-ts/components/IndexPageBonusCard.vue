<template>
  <IndexPageCardTemplate
    class="bg-blue bonus-card"
    @prev="$emit('prev')"
    @next="$emit('next')"
    @show-info="$emit('show-info')"
  >
    <template #card-type>Бонусная карта</template>
    <template #card-number>№{{ card.number }}</template>
    <template #status>{{ cardStatus }}</template>
    <template #value>{{ value }}</template>
    <template #value-unit>{{ bonusUnitsFormatted }}</template>
    <template #value-unit-hint>1 балл = 1 рубль</template>
  </IndexPageCardTemplate>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import plural from 'plural-ru'

import IndexPageCardTemplate from '~/components/IndexPageCardTemplate.vue'
import {
  BONUS_CARD_BONUS_STATUS_NAMES,
  BonusCard
} from '~/logic/modules/bonus-cards'

@Component({
  components: {
    IndexPageCardTemplate
  }
})
export default class IndexPageBonusCard extends Vue {
  @Prop({ type: Object, required: true }) card!: BonusCard

  get bonusUnitsFormatted() {
    return plural(this.card.bonus?.value ?? 0, 'балл', 'балла', 'баллов')
  }

  get cardStatus() {
    return this.card.bonus?.status?.id !== undefined
      ? BONUS_CARD_BONUS_STATUS_NAMES[this.card.bonus.status.id]
      : null
  }

  get value() {
    return this.card.bonus?.value?.toString() ?? '0'
  }
}
</script>

<style>
.bonus-card {
  background: url('~/assets/svg/index/bonus-card-background.svg?inline') right
    no-repeat;
  background-size: contain;
}
</style>
