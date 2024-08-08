<template>
  <IndexPageCardTemplate
    class="discount-card"
    @prev="$emit('prev')"
    @next="$emit('next')"
    @show-info="$emit('show-info')"
  >
    <template #card-type>xx xx</template>
    <template #card-number>№{{ card.number }}</template>
    <template #value>{{ value }}</template>
    <template #value-unit>xx</template>
    <template #value-unit-hint>xx xx xx*</template>
  </IndexPageCardTemplate>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import IndexPageCardTemplate from '~/components/IndexPageCardTemplate.vue'
import { BonusCard } from '~/logic/modules/bonus-cards'

@Component({
  components: {
    IndexPageCardTemplate
  }
})
export default class IndexPageDiscountCard extends Vue {
  @Prop({ type: Object, required: true }) card!: BonusCard

  get value() {
    return `${this.card.discount?.value ?? 0}%`
  }
}
</script>

<style>
.discount-card {
  background: url('~/assets/svg/index/discount-card-background.svg?inline')
    right no-repeat;
  background-size: contain;
  @apply bg-purple;
}
</style>
