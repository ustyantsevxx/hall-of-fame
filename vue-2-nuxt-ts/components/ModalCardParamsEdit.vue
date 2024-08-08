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
    <form @submit.prevent="save">
      <p class="text-blue">xx xx</p>

      <InputDefault
        v-model="cardName"
        label="xx xx"
        placeholder="xx xx"
        size="md"
        class="mt-10"
        hide-label
        :max-length="BONUS_CARD_NAME_MAX_LENGTH"
        :invalid="$v.cardName.$anyError"
      />

      <p class="mt-30 text-gray-500">xx xx-xx</p>

      <div class="grid grid-cols-2 gap-30 mt-6">
        <InputDefault
          v-model.lazy="pin"
          label="xx-xx"
          placeholder="xx-xx"
          size="md"
          type="password"
          hide-label
          :max-length="4"
          :invalid="$v.pin.$anyError"
        />

        <InputDefault
          v-model="pinConfirmation"
          label="xx xx-xx"
          placeholder="xx"
          size="md"
          type="password"
          hide-label
          :max-length="4"
          :invalid="$v.pinConfirmation.$anyError"
        />
      </div>

      <p
        v-if="$v.$anyError || errorMessage"
        class="block mt-20 text-description text-red"
      >
        <span v-if="errorMessage">
          {{ errorMessage }}
          <br />
        </span>

        <span v-if="$v.pin.$error">
          xx xx xx xx-xx.
          <br />
        </span>

        <template v-if="$v.pinConfirmation.$error">
          <span v-if="!$v.pinConfirmation.sameAs">xx-xx xx xx.</span>
        </template>
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
import { minLength, sameAs } from 'vuelidate/lib/validators'

import Button from '~/components/Button.vue'
import InputDefault from '~/components/InputDefault.vue'
import ModalBase from '~/components/ModalBase.vue'
import {
  BONUS_CARD_NAME_MAX_LENGTH,
  BonusCard,
  BonusCardsModule
} from '~/logic/modules/bonus-cards'
import { HandleServerResponseMixin } from '~/mixins/handle-server-response-mixin'

@Component({
  components: {
    ModalBase,
    Button,
    InputDefault
  },

  validations: {
    cardName: {},
    pin: {
      minLength: minLength(4)
    },
    pinConfirmation: {
      sameAs: sameAs('pin')
    }
  }
})
export default class ModalCardParamsEdit extends mixins(
  HandleServerResponseMixin
) {
  @Prop({ type: Object, required: true }) card!: BonusCard

  BONUS_CARD_NAME_MAX_LENGTH = BONUS_CARD_NAME_MAX_LENGTH

  get modalRef(): ModalBase {
    return this.$refs.modal as ModalBase
  }

  loading = false

  cardName = ''
  pinConfirmation = ''
  pin = ''

  initForm() {
    this.cardName = this.card.owner
  }

  async save() {
    if (this.checkErrors()) {
      return
    }

    try {
      this.loading = true
      if (this.card.id) {
        const updateCardResponse = await BonusCardsModule.updateBonusCardParams(
          {
            bonus_card_id: this.card.id,
            owner: this.cardName || null,
            pin: Number(this.pin) || null,
            pin_confirmation: Number(this.pinConfirmation) || null
          }
        )

        if (updateCardResponse.success) {
          this.$emit('save', [updateCardResponse.data])
          this.hide()
        } else {
          this.handleServerError(updateCardResponse.error as any)
        }
      }
    } finally {
      this.loading = false
    }
  }

  checkErrors() {
    this.$v.$touch()
    return this.$v.$anyError
  }

  reset() {
    this.cardName = ''
    this.pinConfirmation = ''
    this.pin = ''
    this.resetServerValidationMessage()
    this.$v.$reset()
  }

  show() {
    this.modalRef.show()
  }

  hide() {
    this.modalRef.hide()
  }
}
</script>
