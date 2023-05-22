<template>
  <div class="grow space-y-8 rounded-4 bg-light-20 p-12">
    <dt class="text-white/60 text-h3">
      <slot name="label">{{ label }}</slot>
    </dt>
    <dd class="text-h3">
      <slot name="value">{{ value }}</slot>
    </dd>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, required: true },
    value: { type: null, required: true }
  }
}
</script>
