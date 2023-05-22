<template>
  <VPopover
    :disabled="disabled"
    class="w-max"
    :open.sync="opened"
    v-bind="vendorProps"
    :popover-class="[
      'x-popover rounded-8 absolute z-50 my-12 bg-light-30',
      popoverClass
    ]"
    popover-arrow-class="x-popover-arrow bg-light-30 absolute w-8 h-8 rotate-45"
    @show="attachHideOnScrollIfNeeded"
  >
    <slot name="toggle"></slot>

    <template slot="popover">
      <slot name="body"></slot>
    </template>
  </VPopover>
</template>

<script>
import { VPopover } from 'v-tooltip'

export default {
  __hideOnScrollListener: undefined,

  components: {
    VPopover
  },

  props: {
    popoverClass: { type: [String, Object], default: '' },
    disabled: { type: Boolean, default: false },
    hideOnScroll: { type: Boolean, default: false },
    hideOnScrollElement: { type: [String, Object], default: 'body' },

    /**
     * @see
     * {@link https://floating-vue.starpad.dev/legacy/v2/#popover-component-reference}
     */
    vendorProps: { type: Object, default: undefined }
  },

  data() {
    return {
      opened: false
    }
  },

  methods: {
    attachHideOnScrollIfNeeded() {
      if (!this.hideOnScroll || this.$options.__hideOnScrollListener) {
        return
      }

      const elToAttachListenerTo =
        typeof this.hideOnScrollElement === 'string'
          ? document.querySelector(this.hideOnScrollElement)
          : this.hideOnScrollElement

      this.$options.__hideOnScrollListener = () => {
        this.opened = false

        if (this.$options.__hideOnScrollListener) {
          elToAttachListenerTo.removeEventListener(
            'scroll',
            this.$options.__hideOnScrollListener
          )

          this.$options.__hideOnScrollListener = undefined
        }
      }
      elToAttachListenerTo.addEventListener(
        'scroll',
        this.$options.__hideOnScrollListener
      )
    }
  }
}
</script>
