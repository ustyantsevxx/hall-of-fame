<template>
  <AppCheckbox
    :checked="value"
    class="items-center text-main"
    check-color="#000"
    bg-color="#fff"
    @input="cacheAndEmitInput"
  >
    {{ $t('show-archived') }}
  </AppCheckbox>
</template>

<script>
import AppCheckbox from '~/components/AppCheckbox.vue'
import { AppContainer } from '~/logic/core/app-container'

export default {
  components: {
    AppCheckbox
  },

  props: {
    value: { type: Boolean, default: false },
    cacheKey: { type: String, required: true }
  },

  methods: {
    cacheAndEmitInput() {
      const newValue = !this.value
      AppContainer.cookies.set(this.cacheKey, newValue)
      this.$emit('input', newValue)
    }
  }
}
</script>
