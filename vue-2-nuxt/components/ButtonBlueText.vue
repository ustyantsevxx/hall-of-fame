<template>
  <Component
    :is="component.is"
    v-bind="component.props"
    :tabindex="disabled ? -1 : 0"
    :disabled="disabled"
    class="w-max select-none rounded-6 transition"
    :class="
      !disabled
        ? 'text-cyan hover:text-cyan-lighten active:text-cyan-darken'
        : 'text-white/40'
    "
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </Component>
</template>

<script>
export default {
  props: {
    disabled: { type: Boolean, default: false },
    type: { type: String, default: 'button' }
  },

  computed: {
    component() {
      return {
        is: this.to ? 'NuxtLink' : 'button',
        props: {
          to: this.to,
          type: !this.to ? this.type : undefined
        }
      }
    }
  }
}
</script>

<style scoped>
button.focus-visible {
  @apply outline-none ring ring-yellow ring-opacity-80;
}
</style>
