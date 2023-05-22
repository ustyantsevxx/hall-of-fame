<template>
  <div class="inline-flex flex-col justify-center space-y-20 h-full">
    <template v-for="(item, index) in items">
      <slot :item="item">
        <span :key="index" class="text-description text-black">
          {{ item }}
        </span>
      </slot>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class LegalCardsPageTableListColumn extends Vue {
  @Prop({ type: Array, required: true }) items!: any[]
}
</script>
