<template>
  <span>{{ formattedValue }}</span>
</template>

<script>
import { gsap } from 'gsap'

export default {
  props: {
    value: { type: Number, default: 0 },
    formatter: { type: Function, default: undefined },
    duration: { type: Number, default: 0.5 }
  },

  data() {
    return {
      tweenedNumber: 0
    }
  },

  computed: {
    formattedValue() {
      return this.formatter?.(this.tweenedNumber) ?? this.tweenedNumber
    }
  },

  watch: {
    value: {
      immediate: true,
      handler(value) {
        gsap.to(this.$data, {
          duration: this.duration,
          tweenedNumber: value
        })
      }
    }
  }
}
</script>
