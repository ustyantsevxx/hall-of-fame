<template>
  <AppInput
    v-bind="$attrs"
    :type="inputType"
    clear-button-class="!right-42"
    @input="value => $emit('input', value)"
  >
    <template #end>
      <button
        type="button"
        class="absolute right-10 top-1/2 flex -translate-y-1/2 items-center outline-none"
        :title="togglePasswordButtonTitle"
        @click.stop="visible = !visible"
      >
        <SVGIcon24Eye v-if="visible" />
        <SVGIcon24CloseEye v-else />
      </button>
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

  data() {
    return {
      visible: false
    }
  },

  computed: {
    inputType() {
      return this.visible ? 'text' : 'password'
    },

    togglePasswordButtonTitle() {
      return this.visible ? this.$t('hide-password') : this.$t('show-password')
    }
  }
}
</script>
