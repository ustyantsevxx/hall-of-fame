<template>
  <!-- eslint-disable vuejs-accessibility/form-control-has-label -->
  <textarea
    :id="id"
    class="block w-full rounded-6 border bg-light p-12 ring-0 transition text-input"
    :class="{
      'border-white focus:border-cyan': !invalid,
      'border-red': invalid
    }"
    :style="{ minHeight: '136px' }"
    :placeholder="placeholder"
    :value="value"
    @input="emitInput"
  ></textarea>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default() {
        return this.$uid
      }
    },

    value: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    invalid: { type: Boolean, default: false }
  },

  methods: {
    emitInput(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>
