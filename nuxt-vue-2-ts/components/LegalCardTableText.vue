<template>
  <div class="flex space-x-5 text-description whitespace-nowrap">
    <span>{{ displayedText }}</span>
    <span v-if="text && suffix" class="text-gray-500" v-html="suffix"></span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class LegalCardTableText extends Vue {
  @Prop({ type: [String, Number], default: undefined }) text!:
    | string
    | number
    | undefined

  @Prop({ type: String, default: null }) suffix!: string

  get displayedText() {
    return this.text ? this.text : '—'
  }
}
</script>
