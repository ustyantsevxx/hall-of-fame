<template>
  <Transition name="fade">
    <div v-if="visible" class="fixed inset-0">
      <div class="w-full h-full bg-black bg-opacity-70" @click.self="emitClose">
        <div
          class="overflow-auto py-72 px-80 h-full bg-white"
          style="width: 840px"
        >
          <slot></slot>
          <div></div>
        </div>

        <button
          class="absolute top-30 right-30"
          title="xx"
          @click="emitClose"
        >
          <CardInfoCloseSVG />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import CardInfoCloseSVG from '~/assets/svg/index/card-info-drawer-close.svg'

@Component({
  components: {
    CardInfoCloseSVG
  }
})
export default class IndexPageCardInfoDrawer extends Vue {
  @Prop({ type: Boolean, default: false }) visible!: boolean

  mounted() {
    document.addEventListener('keyup', this.escapeKeyHandler)
  }

  destroyed() {
    document.removeEventListener('keyup', this.escapeKeyHandler)
  }

  escapeKeyHandler(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.emitClose()
    }
  }

  emitClose() {
    this.$emit('close')
  }
}
</script>
