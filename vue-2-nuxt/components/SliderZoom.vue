<template>
  <div class="x-zoom-slider flex items-center space-x-10" style="width: 100px">
    <SVGZoomSliderSmallCircle />
    <AppSlider
      class="flex-1"
      :value="value"
      :options="options"
      @input="e => $emit('input', e)"
    />
    <SVGZoomSliderBigCircle />
  </div>
</template>

<script>
import AppSlider from '~/components/AppSlider.vue'
import { twTheme } from '~/logic/constants/theme'

export default {
  components: {
    AppSlider
  },

  props: {
    value: { type: Number, required: true }
  },

  computed: {
    options() {
      return {
        dragOnClick: true,
        railStyle: {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          cursor: 'pointer'
        },

        dotOptions: {
          style: {
            boxShadow: 'none',
            border: `3px solid ${twTheme.colors.light.DEFAULT}`
          }
        },

        min: 0,
        max: 0.95,
        interval: 0.01,
        tooltip: 'none',
        process: false
      }
    }
  }
}
</script>

<style scoped>
.x-zoom-slider >>> .vue-slider-dot {
  @apply cursor-pointer rounded-full transition !important;
}

.x-zoom-slider >>> .vue-slider-dot-focus[data-focus-visible-added] {
  @apply outline-none ring ring-yellow ring-opacity-80;
}
</style>
