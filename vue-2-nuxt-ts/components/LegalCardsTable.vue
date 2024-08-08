<template>
  <Table
    :fields="tableFields"
    :items="tableItems"
    class="w-full legal-cards-table"
    hide-body-border-row
    use-strict-column-width
    head-row-class="border-b border-gray-100"
    table-class="w-full"
  >
    <template #body-row="{ item, index }">
      <template v-if="item.card_limits && item.card_limits.length > 0">
        <LegalCardsTableRow
          v-for="(cardLimit, cardLimitIndex) in item.card_limits"
          :key="`${index}-${cardLimitIndex}`"
          :item="{ card: item, limit: cardLimit }"
          :editing-mode="editingItem === item"
          :class="{
            'border-t border-gray-100': index !== 0 && cardLimitIndex === 0
          }"
          @start-editing="setEditingItem"
          @stop-editing="setEditingItem(null)"
        />
      </template>
      <template v-else>
        <LegalCardsTableRow
          :item="{ card: item, limit: null }"
          :editing-mode="editingItem === item"
          class="border-t border-gray-100"
          @start-editing="setEditingItem"
          @stop-editing="setEditingItem(null)"
        />
      </template>

      <LegalCardsTableEditingRow
        v-if="editingItem === item"
        :card="item"
        :card-limit-types="cardLimitTypes"
        :card-limit-fuel-types="cardLimitFuelTypes"
        @update-cards="updateCards"
      />
    </template>
  </Table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import EyeSVG from '~/assets/svg/eye.svg'
import StrokeEyeSVG from '~/assets/svg/eye-stroke.svg'
import Button from '~/components/Button.vue'
import LegalCardsTableEditingRow from '~/components/LegalCardsTableEditingRow.vue'
import LegalCardsTableRow from '~/components/LegalCardsTableRow.vue'
import LegalCardsTableTd from '~/components/LegalCardsTableTd.vue'
import LegalCardTableText from '~/components/LegalCardTableText.vue'
import Table, { XTableField } from '~/components/Table.vue'
import {
  BonusCard,
  BonusCardLimitFuelType,
  BonusCardLimitType,
  BonusCardsModule
} from '~/logic/modules/bonus-cards'

@Component({
  components: {
    LegalCardsTableEditingRow,
    LegalCardsTableRow,
    LegalCardsTableTd,
    LegalCardTableText,
    Button,
    Table,
    EyeSVG,
    StrokeEyeSVG
  }
})
export default class LegalCardsTable extends Vue {
  @Prop({ type: Array, required: true })
  cards!: BonusCard[]

  @Prop({ type: Array, required: true })
  cardLimitTypes!: BonusCardLimitType[]

  @Prop({ type: Array, required: true })
  cardLimitFuelTypes!: BonusCardLimitFuelType[]

  editingItem: BonusCard | null = null

  get cardsAreRuble() {
    // for now: an user always has cards of one type (liter or ruble)
    return (
      this.cards[0]?.type?.id &&
      BonusCardsModule.isRubleCard(this.cards[0]?.type?.id)
    )
  }

  get tableFields(): XTableField[] {
    return [
      // {
      //   key: 'selectItem',
      //   title: '',
      //   width: 45
      // },
      {
        key: 'card',
        title: 'xx',
        width: 225
      },
      {
        key: 'status',
        title: 'xx',
        width: 130
      },
      {
        key: 'marks',
        title: 'xx xx',
        width: 130
      },
      {
        key: 'limitType',
        title: 'xx xx',
        width: 120
      },
      {
        key: 'limit',
        title: 'xx',
        thClass: 'text-right',
        width: 95
      },
      ...(this.cardsAreRuble
        ? [
            {
              key: 'rest_limit_rubles',
              title: 'xx xx xx',
              thClass: 'text-right whitespace-nowrap',
              width: 140
            },
            {
              key: 'balance',
              title: 'xx',
              thClass: 'text-right whitespace-nowrap',
              width: 105
            }
          ]
        : [
            {
              key: 'balance',
              title: 'xx xx xx',
              thClass: 'text-right whitespace-nowrap',
              width: 140
            }
          ]),
      ...(this.__cardEditingEnabled
        ? [
            {
              key: 'actions',
              title: '',
              width: 75
            }
          ]
        : [])
    ]
  }

  get __cardEditingEnabled() {
    return !this.cardsAreRuble || this.$accessor.featureFlags.rubleCardsEditing
  }

  get tableItems() {
    return this.cards
  }

  setEditingItem(card: BonusCard | null) {
    this.editingItem = card
  }

  updateCards(cards: BonusCard[]) {
    this.$emit('update-cards', cards)
  }
}
</script>
