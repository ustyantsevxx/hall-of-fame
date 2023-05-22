<template>
  <div v-on-clickaway="close" class="relative">
    <VPopover
      popover-class="x-headless-dropdown z-50 w-full"
      trigger="manual"
      :open="opened"
      :offset="offset"
      :auto-hide="false"
      popover-arrow-class="!hidden"
      :container="false"
    >
      <button
        :id="toggleId"
        class="select-none transition-colors"
        :class="[
          toggleClass,
          opened && toggleOpenedClass,
          !opened && !disabled && toggleClosedClass
        ]"
        :disabled="disabled"
        @click="toggle"
      >
        <slot name="toggle" :opened="opened"></slot>
      </button>

      <template #popover>
        <slot name="body" :close="close"></slot>
      </template>
    </VPopover>
  </div>
</template>

<script>
import { VPopover } from 'v-tooltip'
import { directive as onClickaway } from 'vue-clickaway'

export default {
  components: {
    VPopover
  },

  directives: {
    onClickaway
  },

  props: {
    toggleId: { type: String, default: '' },
    toggleClass: { type: [String, Object], default: '' },
    toggleOpenedClass: { type: [String, Object], default: '' },
    toggleClosedClass: { type: [String, Object], default: '' },
    offset: { type: [Number, String], default: 0 },
    disabled: { type: Boolean, default: false }
  },

  data() {
    return {
      opened: false
    }
  },

  methods: {
    open() {
      this.opened = true
    },

    close() {
      this.opened = false
    },

    toggle() {
      this.opened ? this.close() : this.open()
    }
  }
}
</script>

<style>
.x-headless-dropdown {
  @apply ring-0;
}

.x-headless-dropdown[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}

.x-headless-dropdown[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}
</style>
