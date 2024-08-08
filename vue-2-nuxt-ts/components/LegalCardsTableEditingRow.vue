<template>
  <tr class="align-top">
    <!-- <LegalCardsTableTd /> -->

    <LegalCardsTableTd classes="py-12 pr-20">
      <Button
        type="button"
        title="xx xx xx"
        class="text-description"
        link
        @click="editCardParams"
      >
        xx
      </Button>

      <ModalCardParamsEdit
        ref="editCardParamsModal"
        :card="card"
        @save="updateCards"
      />
    </LegalCardsTableTd>

    <LegalCardsTableTd classes="py-12 pr-20">
      <Button
        type="button"
        title="xx xx xx"
        class="text-description"
        link
        @click="editCardStatus"
      >
        xx
      </Button>

      <ModalCardStatusEdit
        ref="editCardStatusModal"
        :card="card"
        @save="updateCards"
      />
    </LegalCardsTableTd>

    <LegalCardsTableTd colspan="2" classes="py-12 pr-20">
      <Button
        type="button"
        title="xx/xx xx xx"
        class="text-description"
        link
        @click="editCardMarks"
      >
        xx
      </Button>

      <EditCardMarksModal
        ref="editCardMarksModal"
        :card="card"
        :card-limit-fuel-types="cardLimitFuelTypes"
        :card-limit-types="cardLimitTypes"
        @save="updateCards"
      />
    </LegalCardsTableTd>

    <LegalCardsTableTd
      :colspan="cardIsOfLiterType ? 2 : 3"
      classes="py-12 pr-20"
    >
      <div v-if="!cardIsOfLiterType" class="flex justify-end">
        <Button
          type="button"
          title="xx/xx xx"
          class="text-description"
          link
          @click="editCardLimitBalances"
        >
          xx
        </Button>

        <ModalCardLimitBalanceEdit
          ref="editCardLimitBalanceModal"
          :card="card"
          @save="updateCards"
        />
      </div>
    </LegalCardsTableTd>
  </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import Button from '~/components/Button.vue'
import LegalCardsTableTd from '~/components/LegalCardsTableTd.vue'
import ModalCardLimitBalanceEdit from '~/components/ModalCardLimitBalanceEdit.vue'
import EditCardMarksModal from '~/components/ModalCardLimitsEdit.vue'
import ModalCardParamsEdit from '~/components/ModalCardParamsEdit.vue'
import ModalCardStatusEdit from '~/components/ModalCardStatusEdit.vue'
import {
  BonusCard,
  BonusCardLimitFuelType,
  BonusCardLimitType,
  BonusCardsModule
} from '~/logic/modules/bonus-cards'

@Component({
  components: {
    ModalCardLimitBalanceEdit,
    EditCardMarksModal,
    ModalCardStatusEdit,
    ModalCardParamsEdit,
    LegalCardsTableTd,
    Button
  }
})
export default class LegalCardsTableEditingRow extends Vue {
  @Prop({ type: Object, required: true })
  card!: BonusCard

  @Prop({ type: Array, required: true })
  cardLimitTypes!: BonusCardLimitType[]

  @Prop({ type: Array, required: true })
  cardLimitFuelTypes!: BonusCardLimitFuelType[]

  get editCardParamsModalRef(): ModalCardParamsEdit {
    return this.$refs.editCardParamsModal as ModalCardParamsEdit
  }

  get editCardStatusModalRef(): ModalCardStatusEdit {
    return this.$refs.editCardStatusModal as ModalCardStatusEdit
  }

  get editCardMarksModalRef(): EditCardMarksModal {
    return this.$refs.editCardMarksModal as EditCardMarksModal
  }

  get editCardLimitBalanceModalRef(): ModalCardLimitBalanceEdit {
    return this.$refs.editCardLimitBalanceModal as ModalCardLimitBalanceEdit
  }

  get cardIsOfLiterType() {
    return (
      this.card.type?.id && BonusCardsModule.isLiterCard(this.card.type?.id)
    )
  }

  editCardParams() {
    this.editCardParamsModalRef.show()
  }

  editCardStatus() {
    this.editCardStatusModalRef.show()
  }

  editCardMarks() {
    this.editCardMarksModalRef.show()
  }

  editCardLimitBalances() {
    this.editCardLimitBalanceModalRef.show()
  }

  updateCards(cards: BonusCard[]) {
    this.$emit('update-cards', cards)
  }
}
</script>

<style scoped>
.legal-cards-table td {
  padding-right: 20px !important;
}
</style>
