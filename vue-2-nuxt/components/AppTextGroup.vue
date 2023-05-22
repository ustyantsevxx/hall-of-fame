<template>
  <div>
    <p class="text-main" :class="labelClass">
      <slot name="label">{{ label }}</slot>
    </p>

    <p
      class="mt-6 text-white/60 text-input"
      :class="[valueClass, multilineValue ? 'break-words' : 'line-clamp-3']"
      :title="value"
    >
      <slot name="value">{{ safeValue }}</slot>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, default: undefined },
    value: { type: String, default: undefined },
    multilineValue: { type: Boolean, default: false },
    labelClass: { type: [String, Object], default: undefined },
    valueClass: { type: [String, Object], default: undefined }
  },

  computed: {
    safeValue() {
      return this.value ?? '—'
    }
  }
}
</script>
