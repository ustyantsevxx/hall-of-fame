<template>
  <AppTransition>
    <div v-if="opened" class="fixed inset-0" style="z-index: 1337">
      <div
        class="h-full w-full"
        style="background: rgba(4, 6, 24, 0.8)"
        @mousedown.left.self="close"
      >
        <div class="ml-auto h-full overflow-auto bg-light" style="width: 560px">
          <slot></slot>
        </div>
      </div>
    </div>
  </AppTransition>
</template>

<script>
import AppTransition from '~/components/AppTransition.vue'

export default {
  components: {
    AppTransition
  },

  props: {
    opened: { type: Boolean, default: false }
  },

  methods: {
    close() {
      this.$emit('update:opened', false)
      this.$emit('close')
    }
  }
}
</script>
