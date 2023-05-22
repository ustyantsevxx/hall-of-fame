<template>
  <Modal
    :name="$uid"
    classes="!bg-light !rounded-8 !p-40 !relative z-90 !top-1/2 !-translate-y-1/2"
    width="400"
    height="auto"
    focus-trap
    adaptive
    :shift-y="0"
    transition="modal-body"
    overlay-transition="modal-overlay"
    @closed="() => _resolveAndEmit()"
    @opened="$emit('opened')"
  >
    <button class="absolute right-24 top-24" @click="_closeWith(undefined)">
      <SVGModalCloseX />
    </button>

    <div :class="contentClass">
      <slot :closeWith="_closeWith"></slot>
    </div>
  </Modal>
</template>

<script>
export default {
  popupController: null,

  props: {
    contentClass: { type: String, default: undefined }
  },

  methods: {
    async _show() {
      await this.$modal.show(this.$uid)
    },

    async _hide() {
      await this.$modal.hide(this.$uid)
    },

    _resolvePromise(value) {
      this.$options.popupController.resolve(value)
    },

    _resolveAndEmit(value) {
      this._resolvePromise(value)
      this.$emit('close')
    },

    async _closeWith(value) {
      await this._hide()
      this._resolveAndEmit(value)
    },

    open() {
      let _resolve
      let _reject

      const popupPromise = new Promise((resolve, reject) => {
        _resolve = resolve
        _reject = reject
      })

      this.$options.popupController = { resolve: _resolve, reject: _reject }
      this.$emit('open')

      this._show()

      return popupPromise
    },

    async close(value) {
      await this._hide()
      this._resolvePromise(value)
      this.$emit('close')
    }
  }
}
</script>

<style>
.modal-body-enter-active,
.modal-body-leave-active,
.modal-overlay-enter-active,
.modal-overlay-leave-active {
  @apply !transition duration-300;
}

.modal-overlay-leave-to,
.modal-overlay-enter {
  @apply !opacity-0;
}

.modal-body-leave-to,
.modal-body-enter {
  @apply scale-[0.98] !opacity-0;
}
</style>
