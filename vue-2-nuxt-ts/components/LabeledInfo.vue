<template>
  <div class="flex flex-col">
    <span class="mb-3 text-gray">
      {{ label }}
    </span>

    <div
      class="pb-10 text-subtitle border-b border-gray-100 focus:border-blue transition-colors duration-150 ease-in-out outline-none"
    >
      {{ formattedValue }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import { LONG_HYPHEN } from '~/logic/utils'

@Component
export default class LabeledInfo extends Vue {
  @Prop({ type: [String, Number], default: undefined }) value!: string | number
  @Prop({ type: String, default: '' }) label!: string

  get formattedValue() {
    return this.value ? this.value : LONG_HYPHEN
  }
}
</script>
