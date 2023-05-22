<template>
  <button
    class="flex h-19 w-19 items-center justify-center rounded-full border-2 border-light bg-white font-bold text-light-full transition hover:border-light-40"
    style="font-size: 12px; line-height: 14px"
    :aria-expanded="expanded"
    @click="emitClickAndUpdateExpanded"
  >
    <span class="sr-only">{{ expanded ? 'Collapse' : 'Expand' }}</span>

    <template v-if="!expanded">+</template>
    <template v-else>–</template>
  </button>
</template>

<script>
export default {
  props: {
    expanded: { type: Boolean, default: false }
  },

  methods: {
    emitClickAndUpdateExpanded() {
      this.$emit('click')
      this.$emit('update:expanded', !this.expanded)
    }
  }
}
</script>
