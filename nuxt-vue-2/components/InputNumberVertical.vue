<template>
  <BFormSpinbutton
    vertical
    :min="min"
    :max="max"
    :wrap="!noWrap"
    :formatter-fn="numberFormatter"
    :value="value"
    :repeat-interval="75"
    :repeat-delay="200"
    class="vertical-number-input flex w-32 flex-col items-center justify-center"
    @input="emitInput"
  >
    <template #increment>
      <span class="group flex w-full items-center justify-center p-8">
        <SVGTimeRangePickerArrowUp
          class="text-white/60 transition-colors group-hover:text-white"
        />
      </span>
    </template>

    <template #decrement>
      <span class="group flex w-full items-center justify-center p-8">
        <SVGTimeRangePickerArrowDown
          class="text-white/60 transition-colors group-hover:text-white"
        />
      </span>
    </template>
  </BFormSpinbutton>
</template>

<script>
import { BFormSpinbutton } from 'bootstrap-vue'

export default {
  components: {
    BFormSpinbutton
  },

  props: {
    value: { type: Number, default: 0 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: undefined },
    noWrap: { type: Boolean, default: false },
    numberFormatter: { type: Function, default: undefined }
  },

  methods: {
    emitInput(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style>
.vertical-number-input button {
  @apply w-full ring-0;
}

.vertical-number-input output {
  @apply flex h-30 w-full items-center justify-center rounded-4  bg-light-40 text-main;
}
</style>
