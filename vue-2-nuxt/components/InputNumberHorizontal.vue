<template>
  <BFormSpinbutton
    :id="id"
    :min="min"
    :max="max"
    :wrap="!noWrap"
    :formatter-fn="numberFormatter"
    :value="value"
    :repeat-interval="75"
    :repeat-delay="200"
    class="horizontal-number-input flex"
    :class="{ 'horizontal-number-input--invalid': invalid }"
    @input="emitInput"
  />
</template>

<script>
import { BFormSpinbutton } from 'bootstrap-vue'

export default {
  components: {
    BFormSpinbutton
  },

  props: {
    id: {
      type: String,
      default() {
        return this.$uid
      }
    },

    value: { type: Number, default: 0 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: undefined },
    noWrap: { type: Boolean, default: false },
    numberFormatter: { type: Function, default: undefined },
    invalid: { type: Boolean, default: false }
  },

  methods: {
    emitInput(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style>
.horizontal-number-input button {
  @apply border border-white py-11 px-11 text-white/60 transition-colors hover:bg-light-20 !important;
}

.horizontal-number-input--invalid button {
  @apply border-red !important;
}

.horizontal-number-input button:first-child {
  @apply rounded-l-6  border-r-0 !important;
}

.horizontal-number-input button:last-child {
  @apply rounded-r-6  border-l-0 !important;
}

.horizontal-number-input output {
  @apply flex  w-full items-center justify-center border border-white transition-colors text-input;
}

.horizontal-number-input--invalid output {
  @apply border-red !important;
}
</style>
