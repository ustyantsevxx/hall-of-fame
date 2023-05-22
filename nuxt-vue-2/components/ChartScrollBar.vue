<template>
  <AppSlider :value="value" :options="dragSliderProps" @input="emitChange" />
</template>

<script>
import AppSlider from '@/components/AppSlider.vue'

export default {
  components: {
    AppSlider
  },

  props: {
    value: { type: [Number, Array], required: true },
    sliderProps: { type: Object, default: () => ({}) },
    marks: { type: Object, default: () => ({}) },
    firstTimestamp: { type: Number, default: undefined },
    lastTimestamp: { type: Number, default: undefined }
  },

  computed: {
    dragSliderProps() {
      return {
        dragOnClick: true,
        railStyle: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          cursor: 'pointer'
        },

        dotStyle: {
          opacity: 0
        },

        duration: 0,
        min: this.firstTimestamp,
        max: this.lastTimestamp,
        fixed: true,
        tooltip: 'none',
        processStyle: {
          backgroundColor: '#fff',
          cursor: 'pointer'
        },

        stepStyle: {
          display: 'none'
        },

        labelStyle: {
          cursor: 'default',
          fontFamily: 'Roboto, sans-serif',
          fontSize: '13px',
          color: 'rgba(255, 255, 255, 0.6)'
        },

        marks: this.marks,

        ...this.sliderProps
      }
    }
  },

  methods: {
    emitChange(value) {
      this.$emit('input', value)
    }
  }
}
</script>
