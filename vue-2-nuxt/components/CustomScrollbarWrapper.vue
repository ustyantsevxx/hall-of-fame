<template>
  <Simplebar v-if="!disabled" ref="simplebar">
    <slot></slot>
  </Simplebar>
  <div v-else><slot></slot></div>
</template>

<script>
import 'simplebar/dist/simplebar.min.css'

import Simplebar from 'simplebar-vue'

export default {
  components: {
    Simplebar
  },

  props: {
    disabled: { type: Boolean, default: false }
  },

  data() {
    return {
      simplebarInstance: undefined,
      scrollingElement: undefined
    }
  },

  mounted() {
    if (!this.disabled) {
      this.simplebarInstance = this.$refs.simplebar.SimpleBar
      this.scrollingElement = this.simplebarInstance.contentWrapperEl
      this.scrollingElement?.setAttribute?.('tabindex', '-1')
    }
  }
}
</script>

<style>
/* track */
.simplebar-track {
  @apply !pointer-events-auto !cursor-pointer !rounded-2;
  background-color: rgba(188, 208, 222, 0.14);
}

/* handle */
.simplebar-scrollbar::before {
  @apply !cursor-pointer !bg-white !opacity-100 !transition;
}

/* x-track */
.simplebar-horizontal.simplebar-track {
  @apply !mx-16 !mb-8 !h-4;
}

/* x-handle */
.simplebar-horizontal .simplebar-scrollbar::before {
  @apply !inset-x-0 !h-4 -translate-y-1/2;
}

/* y-track */
.simplebar-vertical.simplebar-track {
  @apply !my-16 !mr-8 !w-4;
}

/* y-handle */
.simplebar-vertical .simplebar-scrollbar::before {
  @apply !inset-y-0 !w-4 !-translate-x-1/2;
}

/* track-hover handle style */
.simplebar-hover .simplebar-scrollbar::before {
  @apply !bg-white/70;
}
</style>
