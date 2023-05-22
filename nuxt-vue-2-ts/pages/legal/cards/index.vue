<template>
  <main class="container">
    <h1 class="text-h1">Карты</h1>

    <div class="mt-25 mb-28">
      <section>
        <InputDefault
          v-model="searchString"
          :input-classes="{
            'pr-40': true
          }"
          label="Поиск"
          placeholder="Наименование или № карты"
          style="width: 350px"
        >
          <template #icon>
            <div class="flex justify-center items-center mt-3 mr-10 w-35 h-35">
              <SearchSVG />
            </div>
          </template>
        </InputDefault>
      </section>

      <div>
        <template v-if="cardsExist">
          <LegalCardsTable
            :cards="sortedCards"
            :card-limit-types="cardsLimitsTypes"
            :card-limit-fuel-types="fuelTypes"
            class="mt-45"
            @update-cards="updateCards"
          />
        </template>

        <p v-else class="mt-60 text-subtitle text-center text-gray">
          Список карт пуст
        </p>

        <p
          v-if="searchString && filteredCards.length === 0"
          class="mt-60 text-subtitle text-center text-gray"
        >
          Такие карты не найдены
        </p>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Fuse from 'fuse.js'
import { Component, Vue } from 'nuxt-property-decorator'

import SearchSVG from '~/assets/svg/search.svg'
import Button from '~/components/Button.vue'
import InputDefault from '~/components/InputDefault.vue'
import LegalCardsTable from '~/components/LegalCardsTable.vue'
import Pagination from '~/components/Pagination.vue'
import { BonusCardLimitsModule } from '~/logic/modules/bonus-card-limits'
import { BonusCardLimitsType } from '~/logic/modules/bonus-card-limits/bonus-card-limits.types'
import {
  BONUS_CARD_STATUSES,
  BonusCard,
  BonusCardsModule
} from '~/logic/modules/bonus-cards'
import { FuelTypesModule } from '~/logic/modules/fuel-types'
import { FuelType } from '~/logic/modules/fuel-types/fuel-types.types'

const bonusCardsPriorityByStatus = {
  [BONUS_CARD_STATUSES.ACTIVE]: 2,
  [BONUS_CARD_STATUSES.BLOCKED]: 1
}

@Component({
  components: {
    LegalCardsTable,
    InputDefault,
    Pagination,
    Button,
    SearchSVG
  },

  head: {
    title: 'Карты'
  },

  layout: 'legal'
})
export default class LegalCardsPage extends Vue {
  fuse = new Fuse<BonusCard>([], {
    keys: ['number', 'type.name_translate', 'owner'],
    threshold: 0.19
  })

  async asyncData() {
    const cards = (await BonusCardsModule.getBonusCards()) ?? []
    const fuelTypes = (await FuelTypesModule.getFuelTypes()) ?? []
    const cardsLimitsTypes =
      (await BonusCardLimitsModule.getLimitsTypes()) ?? []

    return {
      cards,
      fuelTypes,
      cardsLimitsTypes
    }
  }

  get filteredCards() {
    if (!this.searchString) {
      return this.cards
    }

    this.fuse.setCollection(this.cards)

    return this.fuse.search<BonusCard>(this.searchString).map(r => r.item)
  }

  get sortedCards() {
    return this.filteredCards.sort((c1, c2) => {
      const firstCardPriority = c1.status?.id
        ? bonusCardsPriorityByStatus[c1.status.id]
        : 0
      const secondCardPriority = c2.status?.id
        ? bonusCardsPriorityByStatus[c2.status.id]
        : 0

      const firstCardNumber = Number(c1.number) || 0
      const secondCardNumber = Number(c2.number) || 0

      return (
        secondCardPriority - firstCardPriority ||
        firstCardNumber - secondCardNumber
      )
    })
  }

  cards: BonusCard[] = []
  cardsLimitsTypes: BonusCardLimitsType[] = []
  fuelTypes: FuelType[] = []
  searchString = ''

  get cardsExist() {
    return (this.cards?.length ?? 0) > 0
  }

  updateCards(cards: BonusCard[]) {
    if (!cards) {
      return
    }

    for (const card of cards) {
      const cardToUpdateIndex = this.cards.findIndex(c => c.id === card.id)
      if (cardToUpdateIndex >= 0) {
        Object.assign(this.cards[cardToUpdateIndex], card)
      }
    }
  }
}
</script>
