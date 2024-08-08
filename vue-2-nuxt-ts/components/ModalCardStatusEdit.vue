<template>
  <ModalBase
    ref="modal"
    close-button
    focus-trap
    width="382px"
    reset
    @before-open="initForm"
    @closed="reset"
  >
    <p class="text-blue">xx xx</p>

    <form @submit.prevent="save">
      <InputSelect
        v-model.number="cardStatusId"
        title="xx xx"
        class="mt-17"
        size="md"
        style="width: 128px"
        :selected-option-classes="{ 'text-gray-500': true }"
        :options="statusOptions"
      />

      <InputDefault
        v-if="cardStatusCommentInputVisible"
        v-model="cardStatusComment"
        :max-length="BONUS_CARD_STATUS_COMMENT_MAX_LENGTH"
        label="xx xx"
        placeholder="xx xx xx xx xx"
        size="md"
        class="mt-15"
        hide-label
      />

      <p v-if="errorMessage" class="block mt-20 text-description text-red">
        <span v-if="errorMessage">
          {{ errorMessage }}
          <br />
        </span>
      </p>

      <Button
        gradient
        size="sm"
        type="submit"
        class="mt-60"
        :disabled="loading"
      >
        xx
      </Button>
    </form>
  </ModalBase>
</template>

<script lang="ts">
import { Component, mixins, Prop } from 'nuxt-property-decorator'

import Button from '~/components/Button.vue'
import InputDefault from '~/components/InputDefault.vue'
import InputSelect from '~/components/InputSelect.vue'
import ModalBase from '~/components/ModalBase.vue'
import {
  BONUS_CARD_STATUS_COMMENT_MAX_LENGTH,
  BONUS_CARD_STATUS_NAMES,
  BONUS_CARD_STATUSES,
  BonusCard,
  BonusCardsModule,
  BonusCardStatusTypeOption
} from '~/logic/modules/bonus-cards'
import { HandleServerResponseMixin } from '~/mixins/handle-server-response-mixin'

@Component({
  components: {
    InputSelect,
    ModalBase,
    Button,
    InputDefault
  }
})
export default class ModalCardStatusEdit extends mixins(
  HandleServerResponseMixin
) {
  @Prop({ type: Object, required: true })
  card!: BonusCard

  BONUS_CARD_STATUS_COMMENT_MAX_LENGTH = BONUS_CARD_STATUS_COMMENT_MAX_LENGTH

  get modalRef(): ModalBase {
    return this.$refs.modal as ModalBase
  }

  loading = false

  cardStatusId = -1
  cardStatusComment = ''

  get cardStatuses(): BonusCardStatusTypeOption[] {
    return [
      {
        id: BONUS_CARD_STATUSES.ACTIVE,
        name: BONUS_CARD_STATUS_NAMES[BONUS_CARD_STATUSES.ACTIVE]
      },
      {
        id: BONUS_CARD_STATUSES.BLOCKED,
        name: BONUS_CARD_STATUS_NAMES[BONUS_CARD_STATUSES.BLOCKED]
      }
    ]
  }

  get cardStatusCommentInputVisible() {
    return this.cardStatusId === BONUS_CARD_STATUSES.BLOCKED
  }

  get statusOptions() {
    return this.cardStatuses.map(s => ({
      label: s.name,
      value: s.id
    }))
  }

  async save() {
    try {
      this.loading = true
      if (this.card.id) {
        const updateCardResponse =
          await BonusCardsModule.updateBonusCardsStatus({
            bonus_card_ids: [this.card.id],
            status_id: this.cardStatusId,
            status_comment:
              this.cardStatusCommentInputVisible && this.cardStatusComment
                ? this.cardStatusComment
                : undefined
          })

        if (updateCardResponse.success) {
          this.$emit('save', updateCardResponse.data)
          this.hide()
        } else {
          this.handleServerError(updateCardResponse.error as any)
        }
      }
    } finally {
      this.loading = false
    }
  }

  initForm() {
    this.cardStatusId = this.card.status?.id || -1
    this.cardStatusComment = this.card.status?.comment || ''
  }

  reset() {
    this.cardStatusId = -1
    this.cardStatusComment = ''
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
