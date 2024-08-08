<template>
  <ModalBase
    ref="modal"
    close-button
    focus-trap
    width="410px"
    reset
    @before-open="initForm"
    @closed="reset"
  >
    <p class="text-blue">xx xx</p>

    <form @submit.prevent="save">
      <InputSelect
        v-model.number="mode"
        title="xx xx"
        class="mt-17 mb-24"
        size="md"
        style="width: 128px"
        :selected-option-classes="{ 'text-gray-500': true }"
        :options="modeOptions"
      />

      <div v-if="fuelTypeListVisible" :key="mode" class="space-y-10">
        <div
          v-for="(cardLimit, cardLimitIndex) in cardLimitsByMode"
          :key="cardLimitIndex"
          class="flex items-center h-30"
        >
          <div v-if="cardLimit.fuel_type">
            <InputCheckbox
              v-if="mode !== MODES.EDIT"
              v-model="selectedItems"
              :true-value="cardLimit"
            >
              <span
                :title="cardLimit.fuel_type.name"
                class="block overflow-hidden text-description overflow-ellipsis whitespace-nowrap"
                :class="{ 'w-100': itemSelected(cardLimit) }"
              >
                {{ cardLimit.fuel_type.name }}
              </span>
            </InputCheckbox>

            <span
              v-else
              :title="cardLimit.fuel_type.name"
              class="block overflow-hidden text-description overflow-ellipsis whitespace-nowrap w-[120px]"
            >
              {{ cardLimit.fuel_type.name }}
            </span>
          </div>

          <InputCardLimit
            v-if="
              !cardIsOfRubleType &&
              ((mode === MODES.ADD && itemSelected(cardLimit)) ||
                mode === MODES.EDIT)
            "
            class="ml-auto"
            :limit-types="cardLimitTypes"
            :limit-type-id.sync="cardLimit.type.id"
            :limit.sync="cardLimit.limit"
            :value-input-visible="
              ifLimitTypeRequiresLimitValue(cardLimit.type.id)
            "
            :suffix="limitSuffix"
          />
        </div>
      </div>

      <div v-else-if="cardIsOfRubleType && mode === MODES.EDIT">
        <InputCardLimit
          :limit-types="cardLimitTypes"
          :limit-type-id.sync="mainLimitTypeId"
          :limit.sync="mainLimit"
          :value-input-visible="ifLimitTypeRequiresLimitValue(mainLimitTypeId)"
          :suffix="limitSuffix"
        />
      </div>

      <span v-else>
        {{ emptyMessage }}
      </span>

      <p v-if="errorMessage" class="block mt-20 text-description text-red">
        <span>
          {{ errorMessage }}
        </span>
      </p>

      <Button
        gradient
        size="sm"
        type="submit"
        class="mt-60"
        :disabled="
          mainCardLimitSubmitDisabled ||
          loading ||
          (mode !== MODES.EDIT && selectedItems.length === 0) ||
          cardLimitsByMode.length === 0
        "
      >
        <span class="flex items-center space-x-5">
          <span>xx</span>
        </span>
      </Button>
    </form>
  </ModalBase>
</template>

<script lang="ts">
import { cloneDeep } from 'lodash-es'
import { Component, mixins, Prop, Watch } from 'nuxt-property-decorator'

import Button from '~/components/Button.vue'
import InputCardLimit from '~/components/InputCardLimit.vue'
import InputCheckbox from '~/components/InputCheckbox.vue'
import InputDefault from '~/components/InputDefault.vue'
import InputSelect from '~/components/InputSelect.vue'
import ModalBase from '~/components/ModalBase.vue'
import { BonusCardLimitsModule } from '~/logic/modules/bonus-card-limits'
import { BonusCardLimitsStoreLimitParam } from '~/logic/modules/bonus-card-limits/bonus-card-limits.types'
import {
  BonusCard,
  BonusCardLegalLimit,
  BonusCardLimitFuelType,
  BonusCardLimitType,
  BonusCardsModule
} from '~/logic/modules/bonus-cards'
import { isDefined } from '~/logic/utils'
import { HandleServerResponseMixin } from '~/mixins/handle-server-response-mixin'

enum MODES {
  ADD,
  EDIT,
  DELETE
}

const modesInfo = {
  [MODES.ADD]: {
    emptyMessage: 'xx xx xx xx xx'
  },
  [MODES.EDIT]: {
    emptyMessage: 'xx xx xx xx xx'
  },
  [MODES.DELETE]: {
    emptyMessage: 'xx xx xx xx xx'
  }
}

@Component({
  components: {
    InputCheckbox,
    InputSelect,
    ModalBase,
    Button,
    InputDefault,
    InputCardLimit
  }
})
export default class ModalCardLimitsEdit extends mixins(
  HandleServerResponseMixin
) {
  @Prop({ type: Object, required: true })
  card!: BonusCard

  @Prop({ type: Array, required: true })
  cardLimitFuelTypes!: BonusCardLimitFuelType[]

  @Prop({ type: Array, required: true }) cardLimitTypes!: BonusCardLimitType[]

  get modalRef(): ModalBase {
    return this.$refs.modal as ModalBase
  }

  MODES = MODES

  loading = false

  mode = MODES.ADD
  selectedItems: BonusCardLegalLimit[] = []
  cardLimitsAbleToBeAdded: BonusCardLegalLimit[] = []
  cardLimitsToEditOrRemove: BonusCardLegalLimit[] = []

  mainLimit: number = 0
  mainLimitTypeId: number = 0

  get modeOptions() {
    return [
      { value: this.MODES.ADD, label: 'xx' },
      { value: this.MODES.EDIT, label: 'xx' },
      { value: this.MODES.DELETE, label: 'xx' }
    ]
  }

  get fuelTypeListVisible() {
    return (
      (this.cardIsOfRubleType && this.mode !== MODES.EDIT) ||
      (!this.cardIsOfRubleType && this.cardLimitsByMode.length > 0)
    )
  }

  get cardIsOfRubleType() {
    return BonusCardsModule.isRubleCard(this.card.type?.id as number)
  }

  get limitTypeOptions() {
    return this.cardLimitTypes.map(l => ({
      label: l.name_translate,
      value: l.id
    }))
  }

  get cardLimitsByMode() {
    return this.mode === this.MODES.ADD
      ? this.cardLimitsAbleToBeAdded
      : this.cardLimitsToEditOrRemove
  }

  get limitSuffix() {
    return this.card?.type?.id
      ? BonusCardsModule.getBonusCardCurrencySignByType(this.card.type.id)
      : ''
  }

  get emptyMessage() {
    return modesInfo[this.mode].emptyMessage ?? ''
  }

  get mainCardLimitSubmitDisabled() {
    return (
      BonusCardsModule.ifLimitTypeRequiresLimitValue(this.mainLimitTypeId) &&
      this.mainLimit === 0
    )
  }

  ifLimitTypeRequiresLimitValue(cardLimitTypeId?: number) {
    return (
      isDefined(cardLimitTypeId) &&
      BonusCardsModule.ifLimitTypeRequiresLimitValue(cardLimitTypeId as number)
    )
  }

  @Watch('mode')
  onModeChanged() {
    this.resetServerValidationMessage()
    this.selectedItems = []
    this.setMainCardLimitDataToEdit()
  }

  initForm() {
    const existedLimitFuelTypes =
      this.card.card_limits?.map(l => l.fuel_type?.id) || []
    const availableFuelTypes = this.cardLimitFuelTypes.filter(
      ft => !existedLimitFuelTypes.includes(ft.id)
    )

    this.setMainCardLimitDataToEdit()

    this.cardLimitsToEditOrRemove = cloneDeep(this.card?.card_limits || [])
    this.cardLimitsAbleToBeAdded = availableFuelTypes.map((f, index) => ({
      id: index,
      balance: null,
      limit: 0,
      fuel_type: f,
      type: {
        id: this.cardLimitTypes?.[0]?.id
      }
    }))
  }

  setMainCardLimitDataToEdit() {
    if (this.cardIsOfRubleType) {
      this.mainLimit = this.card?.card_limits?.[0]?.limit ?? 0
      this.mainLimitTypeId = this.card?.card_limits?.[0]?.type.id ?? 0
    }
  }

  itemSelected(item: BonusCardLegalLimit) {
    return this.selectedItems.includes(item)
  }

  async save() {
    try {
      this.loading = true
      if (this.card.id) {
        let updateCardsResponse: any
        if (this.mode === MODES.ADD) {
          updateCardsResponse = await this.addLimits()
        } else if (this.mode === MODES.EDIT && !this.cardIsOfRubleType) {
          updateCardsResponse = await this.updateLimits()
        } else if (this.mode === MODES.EDIT && this.cardIsOfRubleType) {
          updateCardsResponse = await this.updateRubleCardLimit()
        } else {
          updateCardsResponse = await this.removeLimits()
        }

        if (updateCardsResponse.success) {
          this.$emit('save', updateCardsResponse.data)
          this.hide()
        } else {
          this.handleServerError(updateCardsResponse.error as any)
        }
      }
    } finally {
      this.loading = false
    }
  }

  getCardLimitsRequestBody(bonusCardLimits: BonusCardLegalLimit[]) {
    const limits: BonusCardLimitsStoreLimitParam[] = bonusCardLimits
      .filter(item => item.fuel_type?.id && isDefined(item.type.id))
      .map(item => ({
        fuel_type_id: Number(item.fuel_type?.id),
        limit_type_id: Number(item.type.id),
        limit:
          this.ifLimitTypeRequiresLimitValue(item.type.id as number) &&
          item.limit
            ? item.limit
            : 0
      }))

    return {
      bonus_card_ids: [Number(this.card.id)],
      limits
    }
  }

  addLimits() {
    return BonusCardLimitsModule.saveLimits(
      this.getCardLimitsRequestBody(this.selectedItems)
    )
  }

  updateLimits() {
    return BonusCardLimitsModule.saveLimits(
      this.getCardLimitsRequestBody(this.cardLimitsToEditOrRemove)
    )
  }

  updateRubleCardLimit() {
    return BonusCardsModule.updateRubleCardLimit({
      bonus_card_ids: [Number(this.card.id)],
      limit_rubles: this.ifLimitTypeRequiresLimitValue(this.mainLimitTypeId)
        ? this.mainLimit
        : 0,
      limit_type_id: this.mainLimitTypeId
    })
  }

  removeLimits() {
    const selectedItemsId = this.selectedItems
      .filter(item => !!item.fuel_type?.id)
      .map(item => Number(item.fuel_type?.id))

    return BonusCardLimitsModule.deleteCardsLimit({
      bonus_card_ids: [Number(this.card.id)],
      fuel_type_ids: selectedItemsId
    })
  }

  reset() {
    this.mode = this.MODES.ADD
    this.selectedItems = []
    this.serverValidationMessage = null
  }

  show() {
    this.modalRef.show()
  }

  hide() {
    this.modalRef.hide()
  }
}
</script>
