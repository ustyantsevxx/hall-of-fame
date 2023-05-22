<template>
  <ButtonIcon :title="title" class="border p-5" @click="emitInput">
    <SVGIcon24Expand v-if="!fullscreen" />
    <SVGIcon24Minimize v-else />
  </ButtonIcon>
</template>

<script>
import ButtonIcon from '~/components/ButtonIcon.vue'

export default {
  components: {
    ButtonIcon
  },

  model: {
    prop: 'fullscreen'
  },

  props: {
    fullscreen: { type: Boolean, required: true }
  },

  computed: {
    title() {
      return this.fullscreen
        ? this.$t('close-fullscreen')
        : this.$t('open-fullscreen')
    }
  },

  methods: {
    emitInput() {
      this.$emit('input', !this.fullscreen)
    }
  }
}
</script>
