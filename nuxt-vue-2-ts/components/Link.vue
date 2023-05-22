<template>
  <Component
    :is="componentData.tag"
    v-if="componentData"
    :class="{
      'text-blue hover:text-red transition-colors duration-150 ease-in-out active:text-red/80':
        !headless && !gradient,
      'border border-blue hover:border-red rounded-10 pt-12 pb-13': button,
      'block w-max rounded-10 text-button font-bold text-white bg-gradient pt-18 pb-22 px-40 transition hover:brightness-95 active:brightness-90':
        gradient
    }"
    v-bind="componentData.props"
  >
    <slot></slot>
  </Component>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class Link extends Vue {
  @Prop({ type: String, default: undefined }) href!: string | undefined
  @Prop({ type: String, default: undefined }) to!: string | undefined
  @Prop({ type: Boolean, default: false }) headless!: boolean
  @Prop({ type: Boolean, default: false }) button!: boolean
  @Prop({ type: Boolean, default: false }) self!: boolean
  @Prop({ type: Boolean, default: false }) gradient!: boolean

  get componentData() {
    if (this.href !== undefined) {
      return {
        tag: 'a',
        props: {
          rel: 'noopener noreferrer nofollow',
          target: this.self ? '_self' : '_blank',
          href: this.href
        }
      }
    } else if (this.to !== undefined) {
      return {
        tag: 'NuxtLink',
        props: {
          to: this.to
        }
      }
    }
  }
}
</script>
