<template>
  <AppModal
    ref="modalControllerProvider"
    v-slot="{ closeWith }"
    :content-class="contentClass"
    @opened="tryFocusConfirmButton"
  >
    <h1 class="text-h1" :class="titleClass">{{ title }}</h1>

    <p v-if="subtitle" class="mt-16 block pb-5 text-h2">
      {{ subtitle }}
    </p>

    <div class="mt-35 flex space-x-16">
      <AppButton
        v-if="!noCancel"
        :variant="!buttonColorsInverted ? 'secondary' : undefined"
        @click="closeWith(false)"
      >
        {{ cancelText }}
      </AppButton>
      <AppButton
        ref="confirmButton"
        :variant="buttonColorsInverted ? 'secondary' : undefined"
        @click="closeWith(true)"
      >
        {{ confirmText }}
      </AppButton>
    </div>
  </AppModal>
</template>

<script>
import AppButton from '~/components/AppButton.vue'
import AppModal from '~/components/AppModal.vue'
import { ModalMixin } from '~/logic/vue/mixins/modal-mixin'

export default {
  components: {
    AppModal,
    AppButton
  },

  mixins: [ModalMixin('modalControllerProvider')],

  props: {
    buttonColorsInverted: { type: Boolean, default: false },
    titleClass: { type: String, default: undefined },
    contentClass: { type: String, default: undefined },
    noCancel: { type: Boolean, default: false },

    title: {
      type: String,
      default() {
        return this.$t('confirm-action')
      }
    },

    subtitle: {
      type: String,
      default() {
        return this.$t('you-really-want-to-perform-this-action')
      }
    },

    cancelText: {
      type: String,
      default() {
        return this.$t('cancel')
      }
    },

    confirmText: {
      type: String,
      default() {
        return this.$t('yes')
      }
    }
  },

  methods: {
    tryFocusConfirmButton() {
      this.$refs.confirmButton?.$el?.focus()
    }
  }
}
</script>
