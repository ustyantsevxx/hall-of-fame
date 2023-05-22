<template>
  <div class="py-20 px-30 rounded-20 border border-gray-100">
    <p class="mb-7 text-subtitle">{{ title }}</p>
    <div class="grid grid-cols-2 divide-x divide-gray-100">
      <div class="flex flex-col">
        <div
          class="pr-8 text-subtitle text-transparent truncate bg-clip-text bg-gradient"
          :title="firstField.value"
        >
          {{ firstField.value }}
        </div>

        <span class="text-description text-gray-500">
          {{ firstField.description }}
        </span>
      </div>

      <div class="flex justify-end w-full">
        <div class="flex flex-col">
          <div
            class="text-subtitle text-transparent truncate bg-clip-text bg-gradient"
            :title="secondField.value"
          >
            {{ secondField.value }}
          </div>

          <span class="text-description text-gray-500">
            {{ secondField.description }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

export type FundsInfoCompareField = {
  value: string
  description: string
}

@Component
export default class LegalFundsCompareInfoCard extends Vue {
  @Prop({ type: String, required: true }) title!: string
  @Prop({ type: Object, required: true }) firstField!: FundsInfoCompareField
  @Prop({ type: Object, required: true })
  secondField!: FundsInfoCompareField
}
</script>
