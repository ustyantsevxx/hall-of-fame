<template>
  <div class="x-offset-slider">
    <AppSlider
      :options="sliderProps"
      :value="valueAsArray"
      @input="emitInput"
    />
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
    value: { type: Object, default: () => ({ min: 0, max: 100 }) }
  },

  computed: {
    sliderProps() {
      return {
        style: {
          width: '300px'
        },

        value: this.value,
        dragOnClick: true,
        railStyle: {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          cursor: 'pointer',
          borderRadius: 0
        },

        dotOptions: {
          style: {
            height: '16px',
            width: '2px',
            marginLeft: '6px',
            marginTop: '-1px',
            borderRadius: 0,
            boxShadow: 'none'
          }
        },

        min: 0,
        max: 100,
        interval: 1,
        processStyle: {
          backgroundColor: twTheme.colors.cyan.DEFAULT,
          borderRadius: 0
        },

        tooltipStyle: {
          backgroundColor: twTheme.colors.light[30],
          borderRadius: '4px'
        },

        tooltip: 'always',
        tooltipFormatter: v => v + '%'
      }
    },

    valueAsArray() {
      return [this.value.min, this.value.max]
    }
  },

  methods: {
    emitInput(e) {
      const [min, max] = e
      this.$emit('input', { min, max })
    }
  }
}
</script>

<style scoped>
.x-offset-slider >>> .vue-slider-dot-tooltip-inner-top::after {
  border-top-color: theme('colors.light.30');
}

.x-offset-slider >>> .vue-slider-disabled .vue-slider-process {
  background-color: rgba(255, 255, 255, 0.2) !important;
  cursor: not-allowed;
}
</style>
