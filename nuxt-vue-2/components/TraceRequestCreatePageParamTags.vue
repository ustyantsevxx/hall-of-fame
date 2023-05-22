<template>
  <AppTransition group tag="div" class="flex flex-wrap">
    <button
      v-for="(tag, j) in tags"
      :key="j"
      class="group mt-6 mr-6 flex cursor-pointer select-none items-center space-x-6 rounded-17 bg-light-20 px-8 pt-5 pb-4 ring-offset-1 ring-offset-light transition hover:bg-light-30"
      :title="$t('remove-parameter-name', { name: tag.name })"
      @click="() => emitRemove(tag)"
    >
      <span class="text-main">{{ tag.name }}</span>
      <SVGTagX class="text-white/60 transition-colors group-hover:text-white" />
    </button>
  </AppTransition>
</template>

<script>
import AppTransition from '~/components/AppTransition.vue'

export default {
  components: {
    AppTransition
  },

  props: {
    tags: { type: Array, required: true }
  },

  methods: {
    emitRemove(tag) {
      this.$emit('remove', tag.value)
    }
  }
}
</script>
