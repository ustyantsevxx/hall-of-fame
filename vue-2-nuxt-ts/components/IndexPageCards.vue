<template>
  <div>
    <section class="relative h-full">
      <Transition name="fade" mode="in-out">
        <Component
          :is="cardComponentByType.card"
          v-if="cardComponentByType"
          class="absolute inset-0"
          :card="selectedCard"
          @prev="selectPreviousCard"
          @next="selectNextCard"
          @show-info="showDrawer"
        />
      </Transition>
    </section>

    <IndexPageCardInfoDrawer :visible="infoDrawerVisible" @close="closeDrawer">
      <Component
        :is="cardComponentByType.info"
        v-if="cardComponentByType && infoDrawerVisible"
        :limits="limits"
      />
    </IndexPageCardInfoDrawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import IndexPageBonusCard from '~/components/IndexPageBonusCard.vue'
import IndexPageCardInfoDrawer from '~/components/IndexPageCardInfoDrawer.vue'
import {
  BONUS_CARD_TYPES,
  BonusCard,
  BonusCardLimit,
  BonusCardsModule
} from '~/logic/modules/bonus-cards'
import { lastItem } from '~/logic/utils/arrays'

const cardComponents = {
  [BONUS_CARD_TYPES.BONUS]: {
    // not lazy loaded to prevent transition flashing for bonus card
    // on page refresh, as bonus card rather exist than not
    card: IndexPageBonusCard,
    info: () => import('~/components/IndexPageBonusCardInfo.vue')
  },
  [BONUS_CARD_TYPES.DISCOUNT]: {
    card: () => import('~/components/IndexPageDiscountCard.vue'),
    info: () => import('~/components/IndexPageDiscountCardInfo.vue')
  }
}

@Component({
  components: {
    IndexPageCardInfoDrawer
  }
})
export default class IndexPageCards extends Vue {
  selectedCard: BonusCard | null = null
  infoDrawerVisible = false
  limits: BonusCardLimit | null | undefined = null

  created() {
    this.selectedCard = this.bonusCards[0]
  }

  get bonusCards(): BonusCard[] {
    return this.$accessor.bonusCards
  }

  get selectedCardIndex() {
    return this.bonusCards.findIndex(card => card.id === this.selectedCard?.id)
  }

  get cardComponentByType() {
    return this.selectedCard?.type?.id !== undefined
      ? cardComponents[this.selectedCard.type?.id]
      : undefined
  }

  selectPreviousCard() {
    this.selectedCard =
      this.selectedCardIndex === 0
        ? lastItem(this.bonusCards)
        : this.bonusCards[this.selectedCardIndex - 1]
  }

  selectNextCard() {
    this.selectedCard =
      this.selectedCardIndex === this.bonusCards.length - 1
        ? this.bonusCards[0]
        : this.bonusCards[this.selectedCardIndex + 1]
  }

  async showDrawer() {
    await this.fetchLimits()
    this.infoDrawerVisible = true
    document.body.style.overflowY = 'hidden'
  }

  async fetchLimits() {
    if (
      this.selectedCard?.id &&
      this.limits?.bonus_card?.id !== this.selectedCard?.id
    ) {
      this.limits = await BonusCardsModule.getBonusCardLimits(
        this.selectedCard?.id
      )
    }
  }

  closeDrawer() {
    this.infoDrawerVisible = false
    document.body.style.overflowY = 'unset'
  }
}
</script>
