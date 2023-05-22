<template>
  <div
    :style="{
      display: visible ? 'flex' : 'none'
    }"
    class="justify-center items-center space-x-12"
  >
    <ChatLoaderSVG class="animate-spin" />
    <p class="text-description text-center text-gray-300">
      <slot></slot>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import ChatLoaderSVG from '~/assets/svg/chat-loader.svg'

@Component({
  components: {
    ChatLoaderSVG
  }
})
export default class ChatBoundaryLoader extends Vue {
  @Prop({ type: Boolean, default: true }) visible!: boolean
}
</script>
