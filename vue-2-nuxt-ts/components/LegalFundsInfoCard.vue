<template>
  <div
    class="flex flex-col py-20 pr-40 pl-30 rounded-20 border border-gray-100"
  >
    <div class="flex justify-between">
      <p class="text-subtitle">{{ title }}</p>
      <p
        class="ml-10 text-subtitle text-transparent truncate bg-clip-text bg-gradient"
        :title="value"
      >
        {{ value }}
      </p>
    </div>
    <p v-if="description" class="mt-3 text-description text-gray-500">
      {{ description }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class LegalFundsInfoCard extends Vue {
  @Prop({ type: String, required: true }) title!: string
  @Prop({ type: String, required: true }) value!: string
  @Prop({ type: String, default: undefined }) description!: string
}
</script>
