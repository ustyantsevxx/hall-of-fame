<template>
  <AppInput
    ref="input"
    class="input-search"
    input-class="pl-40"
    type="search"
    clearable
    v-bind="attrsWithDefaults"
    v-on="$listeners"
  >
    <template #start>
      <SVGIcon24Search class="absolute top-1/2 left-10 -translate-y-1/2" />
    </template>
  </AppInput>
</template>

<script>
import AppInput from '~/components/AppInput.vue'

export default {
  components: {
    AppInput
  },

  inheritAttrs: false,

  computed: {
    attrsWithDefaults() {
      return {
        placeholder: this.$t('search-0'),
        ...this.$attrs
      }
    }
  },

  methods: {
    focus() {
      this.$refs.input.focus()
    }
  }
}
</script>

<style>
.input-search input::-webkit-search-cancel-button {
  @apply !hidden;
}
</style>
