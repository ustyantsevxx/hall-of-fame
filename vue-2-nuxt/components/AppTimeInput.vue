<template>
  <div class="flex items-center justify-center">
    <InputNumberVertical
      v-model="hours"
      :max="23"
      :number-formatter="always2digits"
      @input="emitInput"
    />
    <span class="mx-2 w-8 text-center text-main">:</span>
    <InputNumberVertical
      v-model="minutes"
      :max="59"
      :number-formatter="always2digits"
      @input="emitInput"
    />

    <span class="mx-2 w-8 text-center text-main">:</span>
    <InputNumberVertical
      v-model="seconds"
      :max="59"
      :number-formatter="always2digits"
      @input="emitInput"
    />
  </div>
</template>

<script>
import InputNumberVertical from '@/components/InputNumberVertical.vue'

export default {
  components: { InputNumberVertical },

  props: {
    value: { type: Object, default: null }
  },

  data() {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  },

  watch: {
    value: {
      deep: true,
      handler(v) {
        this.hours = v.hours
        this.minutes = v.minutes
        this.seconds = v.seconds
      }
    }
  },

  methods: {
    always2digits(value) {
      return value.toLocaleString('en-US', { minimumIntegerDigits: 2 })
    },

    emitInput() {
      this.$emit('input', {
        hours: this.hours,
        minutes: this.minutes,
        seconds: this.seconds
      })
    }
  }
}
</script>
