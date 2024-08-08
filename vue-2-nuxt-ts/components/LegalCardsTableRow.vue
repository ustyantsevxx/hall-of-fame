<template>
  <tr>
    <!-- <LegalCardsTableTd /> -->

    <LegalCardsTableTd
      v-if="limitIsFirstByIndex"
      :rowspan="rowSpanByLimitCount"
      classes="py-10 pr-20"
    >
      <LegalCardTableInfo
        v-if="item.card.number && item.card.type"
        :number="+item.card.number"
        :name="item.card.owner"
        :type="item.card.type"
        :pin="item.card.pin"
      />
    </LegalCardsTableTd>

    <LegalCardsTableTd
      v-if="limitIsFirstByIndex"
      :rowspan="rowSpanByLimitCount"
    >
      <div class="inline-flex flex-col justify-center space-y-3 w-full h-full">
        <span class="text-description text-black">{{ cardStatus.name }}</span>
        <span
          v-if="statusCommentVisible"
          class="overflow-hidden text-gray-500 overflow-ellipsis whitespace-nowrap"
          style="max-width: 170px"
          :title="cardStatus.comment"
        >
          {{ cardStatus.comment }}
        </span>
      </div>
    </LegalCardsTableTd>

    <LegalCardsTableTd>
      <div class="inline-flex items-center w-full h-full">
        <LegalCardTableText :text="cardLimit.fuelName" />
      </div>
    </LegalCardsTableTd>

    <LegalCardsTableTd
      v-if="!cardIsOfRubleType || limitIsFirstByIndex"
      :rowspan="rowspanByCardType"
    >
      <div class="inline-flex items-center w-full h-full">
        <LegalCardTableText :text="cardLimit.name" />
      </div>
    </LegalCardsTableTd>

    <LegalCardsTableTd
      v-if="!cardIsOfRubleType || limitIsFirstByIndex"
      :rowspan="rowspanByCardType"
    >
      <div class="inline-flex justify-end items-center w-full h-full">
        <LegalCardTableText
          :text="
            item.limit && limitValuesVisible
              ? formatValue(item.limit.limit)
              : undefined
          "
          :suffix="unitSignByLimitType"
          class="justify-end"
        />
      </div>
    </LegalCardsTableTd>

    <LegalCardsTableTd
      v-if="!cardIsOfRubleType || limitIsFirstByIndex"
      :rowspan="rowspanByCardType"
    >
      <div class="inline-flex justify-end items-center w-full h-full">
        <LegalCardTableText
          :text="
            limitValuesVisible ? formatValue(byCardType.restLimit) : undefined
          "
          :suffix="unitSignByLimitType"
          class="justify-end"
        />
      </div>
    </LegalCardsTableTd>

    <LegalCardsTableTd
      v-if="cardIsOfRubleType && limitIsFirstByIndex"
      :rowspan="rowSpanByLimitCount"
    >
      <div class="inline-flex justify-end items-center w-full h-full">
        <LegalCardTableText
          :text="
            !cardIsOfCashlessType ? formatValue(byCardType.balance) : undefined
          "
          :suffix="unitSignByLimitType"
          class="justify-end"
        />
      </div>
    </LegalCardsTableTd>

    <LegalCardsTableTd
      v-if="
        (!cardIsOfRubleType || $accessor.featureFlags.rubleCardsEditing) &&
        limitIsFirstByIndex
      "
      classes="legal-table-actions-cell"
      :rowspan="rowSpanByLimitCount"
    >
      <div class="flex justify-end items-center h-full min-w-[73px]">
        <button
          v-if="!editingMode"
          type="button"
          title="xx"
          class="flex justify-center items-center w-30 h-30 hover:text-black transition-colors active:text-black/70 text-black/50"
          @click="requestStartEditing"
        >
          <EditSVG />
        </button>
        <Button
          v-else
          type="button"
          title="xx xx"
          blue
          @click="requestStopEditing"
        >
          xx
        </Button>
      </div>
    </LegalCardsTableTd>
  </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import EditSVG from '~/assets/svg/edit.svg'
import Button from '~/components/Button.vue'
import LegalCardsTableTd from '~/components/LegalCardsTableTd.vue'
import LegalCardTableInfo from '~/components/LegalCardTableInfo.vue'
import LegalCardTableText from '~/components/LegalCardTableText.vue'
import {
  BonusCard,
  BonusCardLegalLimit,
  BonusCardsModule
} from '~/logic/modules/bonus-cards'
import { isDefined } from '~/logic/utils'
import { prettify } from '~/logic/utils/numbers'

@Component({
  components: {
    LegalCardsTableTd,
    LegalCardTableText,
    LegalCardTableInfo,
    Button,
    EditSVG
  }
})
export default class LegalCardsTableRow extends Vue {
  @Prop({ type: Object, required: true }) item!: {
    card: BonusCard
    limit: BonusCardLegalLimit | null
  }

  @Prop({ type: Boolean, default: false }) editingMode!: boolean

  get limitIsFirstByIndex() {
    return (
      this.cardLimitCount === 0 ||
      this.item.limit === this.item.card?.card_limits?.[0]
    )
  }

  get cardIsOfCashlessType() {
    return this.cardTypeId
      ? BonusCardsModule.ifCardCashless(this.cardTypeId)
      : false
  }

  get cardTypeId() {
    return this.item.card.type?.id
  }

  get cardIsOfRubleType() {
    return this.cardTypeId
      ? BonusCardsModule.isRubleCard(this.cardTypeId)
      : false
  }

  get cardLimitCount() {
    return this.item.card?.card_limits?.length ?? 0
  }

  get rowSpanByLimitCount() {
    return this.cardLimitCount > 0 ? this.cardLimitCount : 1
  }

  get rowspanByCardType() {
    return this.cardIsOfRubleType ? this.rowSpanByLimitCount : 1
  }

  get cardStatus() {
    return {
      id: this.item.card?.status?.id,
      name: this.item.card?.status?.name_translate,
      comment: this.item.card?.status?.comment
    }
  }

  get cardLimit() {
    return {
      name: this.item?.limit?.type.name_translate,
      fuelName: this.item?.limit?.fuel_type?.name,
      balance: this.item?.limit?.balance,
      typeId: this.item.limit?.type.id
    }
  }

  get byCardType() {
    const cardLimitBalance =
      this.cardLimitCount > 0 && isDefined(this.cardLimit.balance)
        ? Number(this.cardLimit.balance)
        : undefined
    const cardBalance = +this.item?.card?.balance

    return { balance: cardBalance, restLimit: cardLimitBalance }
  }

  get unitSignByLimitType() {
    return this.cardTypeId
      ? BonusCardsModule.getBonusCardCurrencySignByType(this.cardTypeId)
      : ''
  }

  get statusCommentVisible() {
    return (
      this.cardStatus.comment &&
      BonusCardsModule.checkIfCardStatusCommentOutputRequired(
        this.cardStatus.id
      )
    )
  }

  get limitValuesVisible() {
    return this.cardLimit.typeId
      ? BonusCardsModule.ifLimitTypeRequiresLimitValue(this.cardLimit.typeId)
      : false
  }

  formatValue(value?: number | null) {
    return isDefined(value) ? prettify(value as number) : undefined
  }

  requestStartEditing() {
    this.$emit('start-editing', this.item.card)
  }

  requestStopEditing() {
    this.$emit('stop-editing', this.item.card)
  }
}
</script>

<style scoped>
.legal-table-actions-cell {
  padding-right: 0 !important;
}
</style>
