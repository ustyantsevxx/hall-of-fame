<template>
  <Component
    :is="component.is"
    v-bind="component.props"
    :tabindex="disabled ? -1 : 0"
    :disabled="disabled"
    class="block rounded-6 border-white/20 text-light-full transition hover:border-white active:border-white/20 disabled:cursor-not-allowed disabled:border-white/10"
    :title="title"
    @click="e => $emit('click', e)"
  >
    <slot></slot>
  </Component>
</template>

<script>
export default {
  props: {
    title: { type: String, default: undefined },
    sm: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    to: { type: String, default: undefined }
  },

  computed: {
    component() {
      return {
        is: this.to ? 'NuxtLink' : 'button',
        props: {
          to: this.to
        }
      }
    }
  }
}
</script>

<style scoped>
button.focus-visible {
  @apply outline-none ring ring-yellow ring-opacity-80 ring-offset-2 ring-offset-light;
}
</style>
