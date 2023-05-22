<template>
  <Transition v-if="!group" v-bind="transitionProps">
    <slot></slot>
  </Transition>
  <TransitionGroup v-else v-bind="transitionProps">
    <slot></slot>
  </TransitionGroup>
</template>

<script>
export default {
  inheritAttrs: false,

  props: {
    group: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },

  computed: {
    transitionProps() {
      return {
        ...this.$attrs,
        name: 'default-fade',
        css: !this.disabled
      }
    }
  }
}
</script>
