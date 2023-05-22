<template>
  <div>
    <div class="flex space-x-16">
      <AppButton
        type="submit"
        :loading="form.$loading"
        :disabled="!form.$anyChanged"
      >
        {{ saveText }}
      </AppButton>

      <AppButton
        variant="secondary"
        :disabled="!form.$anyChanged || form.$loading"
        @click="showConfirmCancelModalIfNeeded"
      >
        {{ cancelText }}
      </AppButton>
    </div>

    <ModalConfirm
      ref="ModalConfirm"
      title-class="text-center"
      content-class="flex flex-col items-center"
      :title="$t('do-you-want-to-discard-changes')"
      subtitle=""
      button-colors-inverted
      :confirm-text="$t('yes-0')"
      :cancel-text="$t('no')"
    />
  </div>
</template>

<script>
import AppButton from '~/components/AppButton.vue'
import ModalConfirm from '~/components/ModalConfirm.vue'

export default {
  components: {
    AppButton,
    ModalConfirm
  },

  props: {
    // raw `form` property from the `FormMixin`
    form: { type: Object, required: true },
    noConfirmCancel: { type: Boolean, default: false },

    saveText: {
      type: String,
      default() {
        return this.$t('save-changes')
      }
    },

    cancelText: {
      type: String,
      default() {
        return this.$t('cancel-3')
      }
    }
  },

  methods: {
    async showConfirmCancelModalIfNeeded() {
      if (this.noConfirmCancel) {
        this.form.$reset()
        return
      }

      const sureCancel = await this.$refs.ModalConfirm.open()
      if (sureCancel) {
        this.form.$reset()
      }
    }
  }
}
</script>
