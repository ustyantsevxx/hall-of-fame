<template>
  <NuxtLink
    class="link flex w-max select-none items-center space-x-10 rounded-6 p-8 text-cyan transition hover:text-cyan-lighten active:text-cyan-darken"
    :to="computedTo"
    @click.native="$emit('click')"
  >
    <SVGLinkBackArrow />
    <span class="text-button">
      <slot>{{ $t('back') }}</slot>
    </span>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    to: { type: [String, Object], required: true },
    sm: { type: Boolean, default: false }
  },

  computed: {
    computedTo() {
      return this.$route.query.backTo ?? this.to
    }
  }
}
</script>

<style scoped>
.link.focus-visible {
  @apply outline-none ring ring-yellow ring-opacity-80;
}
</style>
