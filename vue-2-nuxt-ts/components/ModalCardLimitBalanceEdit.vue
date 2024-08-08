<template>
  <ModalBase
    ref="modal"
    close-button
    focus-trap
    width="400px"
    reset
    @closed="reset"
  >
    <p class="text-blue">xx xx</p>

    <form v-if="card" @submit.prevent="save">
      <InputSelect
        v-model.number="mode"
        title="xx xx"
        class="mt-17 mb-24"
        size="md"
        style="width: 128px"
        :selected-option-classes="{
          'text-gray-500': true
        }"
        :options="modeOptions"
      />

      <div class="space-y-15 mt-27px">
        <template v-if="isLiterCard">
          <div
            v-for="(limit, balanceIndex) in _cardLimitsBalances"
            :key="balanceIndex"
            class="flex justify-between items-center h-25"
          >
            <span v-if="limit.fuel_type" class="text-description">
              {{ limit.fuel_type.name }}
            </span>

            <div class="flex items-center ml-15 space-x-8">
              <InputDefault
                v-model="limit.balance"
                label="xx xx xx"
                size="sm"
                style="width: 62px"
                rounded
                hide-label
                type="number"
                :step="0.01"
                :min="0"
                :input-classes="{
                  'text-center': true
                }"
              />

              <span class="text-description text-gray-500">xx</span>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="flex justify-between items-center h-25">
            <span class="text-description">xx xx</span>

            <div class="flex items-center ml-15 space-x-8">
              <InputDefault
                :value="inputValue"
                size="sm"
                style="width: 62px"
                rounded
                hide-label
                type="number"
                :step="0.01"
                :min="0"
                :input-classes="{
                  'text-center': true
                }"
                @change="v => (inputValue = v)"
              />

              <span class="text-description text-gray-500">&#8381;</span>
            </div>
          </div>
        </template>
      </div>

      <p
        v-if="displayedErrorMessage"
        class="block mt-20 text-description text-red"
      >
        {{ displayedErrorMessage }}
      </p>

      <div class="flex mt-30">
        <dl>
          <dd class="mb-3 text-description">
            {{ formattedCardBalance }} &#8381;
          </dd>
          <dt class="text-description text-gray-500">xx xx</dt>
        </dl>

        <dl class="ml-36">
          <dd class="mb-3 text-description">
            {{ formattedAvailableFunds }} &#8381;
          </dd>
          <dt class="text-description text-gray-500">xx xx</dt>
        </dl>
      </div>

      <Button
        gradient
        size="sm"
        type="submit"
        class="mt-30"
        :disabled="loading || !!displayedErrorMessage"
      >
        xx
      </Button>
    </form>
  </ModalBase>
</template>

<script lang="ts">
import { Component, mixins, Prop, Watch } from 'nuxt-property-decorator'

import Button from '~/components/Button.vue'
import InputCheckbox from '~/components/InputCheckbox.vue'
import InputDefault from '~/components/InputDefault.vue'
import InputSelect from '~/components/InputSelect.vue'
import ModalBase from '~/components/ModalBase.vue'
import { BonusCardLimitsModule } from '~/logic/modules/bonus-card-limits'
import { BonusCardLimitsUpdateBalanceRequestParam } from '~/logic/modules/bonus-card-limits/bonus-card-limits.types'
import {
  BonusCard,
  BonusCardLegalLimit,
  BonusCardsModule
} from '~/logic/modules/bonus-cards'
import { prettify } from '~/logic/utils/numbers'
import { HandleServerResponseMixin } from '~/mixins/handle-server-response-mixin'

const MODES = {
  WRITE_ON: 1,
  WRITE_OFF: 2
}

@Component({
  components: {
    InputCheckbox,
    InputSelect,
    ModalBase,
    Button,
    InputDefault
  }
})
export default class ModalCardLimitBalanceEdit extends mixins(
  HandleServerResponseMixin
) {
  @Prop({ type: Object, required: true })
  card!: BonusCard

  MODES = MODES
  mode = MODES.WRITE_ON

  loading = false

  _cardLimitsBalances: BonusCardLegalLimit[] = []
  inputValue = 0

  get modalRef(): ModalBase {
    return this.$refs.modal as ModalBase
  }

  get displayedErrorMessage() {
    return this.errorMessage ?? this.validationMessage
  }

  get modeOptions() {
    return [
      {
        value: this.MODES.WRITE_ON,
        label: 'xx'
      },
      {
        value: this.MODES.WRITE_OFF,
        label: 'xx'
      }
    ]
  }

  get validationMessage() {
    if (
      this.mode === this.MODES.WRITE_ON &&
      this.inputValue > this.userAvailableFunds
    ) {
      return 'xx xx xx xx xx'
    } else if (
      this.mode === this.MODES.WRITE_OFF &&
      this.inputValue > this.card.balance
    ) {
      return 'xx xx xx xx xx'
    }
  }

  get isLiterCard() {
    return this.card.type?.id
      ? BonusCardsModule.isLiterCard(this.card.type.id)
      : false
  }

  get userAvailableFunds() {
    return +this.$accessor?.auth.user.balance_unallocated
  }

  get formattedCardBalance() {
    return prettify(this.card.balance)
  }

  get formattedAvailableFunds() {
    return prettify(this.userAvailableFunds)
  }

  @Watch('card', {
    immediate: true
  })
  onEditingCardChange(value: BonusCard) {
    this._cardLimitsBalances =
      value.card_limits?.map(l => ({
        ...l,
        balance: 0
      })) || []
  }

  async save() {
    try {
      this.loading = true
      if (this.card.id) {
        const updateCardResponse = this.isLiterCard
          ? await this.updateLiterCardBalance()
          : await this.updateRubleCardBalance()

        if (updateCardResponse?.success) {
          this.$emit('save', updateCardResponse.data)
          this.hide()
        } else {
          this.handleServerError(updateCardResponse?.error as any)
        }
      }
    } finally {
      this.loading = false
    }
  }

  async updateRubleCardBalance() {
    if (this.card.id) {
      const response = await BonusCardsModule.updateBonusCardsBalance({
        bonus_card_ids: [this.card.id],
        amount: Number(this.inputValue),
        is_top_up: this.mode === MODES.WRITE_ON
      })

      if (response.success && response?.data?.user) {
        this.$auth.setUser(response.data.user)
      }

      return {
        success: response.success,
        data: response?.data?.bonus_cards || [],
        error: response.error
      }
    }
  }

  async updateLiterCardBalance() {
    if (this.card.id) {
      const balances: BonusCardLimitsUpdateBalanceRequestParam[] =
        this._cardLimitsBalances
          .map(l => ({
            fuel_type_id: l.fuel_type?.id || -1,
            amount: l.balance || 0,
            is_top_up: this.mode === MODES.WRITE_ON
          }))
          .filter(b => b.amount > 0)

      return await BonusCardLimitsModule.updateLimitsBalances({
        bonus_card_ids: [this.card.id],
        balances
      })
    }
  }

  reset() {
    this.mode = this.MODES.WRITE_ON
    this.inputValue = 0
    this.resetServerValidationMessage()
  }

  show() {
    this.modalRef.show()
  }

  hide() {
    this.modalRef.hide()
  }
}
</script>
