<template>
  <VueSlider
    v-bind="options"
    :value="value"
    @dragging="emitInput"
    @change="emitInput"
  />
</template>

<script>
import 'vue-slider-component/theme/default.css'

import VueSlider from 'vue-slider-component'

export default {
  components: {
    VueSlider
  },

  props: {
    value: { type: [Number, Array], required: true },
    options: { type: Object, required: true }
  },

  methods: {
    emitInput(e) {
      this.$emit('input', e)
    }
  }
}
</script>
