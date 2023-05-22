<template>
  <div class="mt-2">
    <slot name="title-raw">
      <h1 class="mb-26 text-h1" :class="titleClass">
        <slot name="title"></slot>
      </h1>
    </slot>

    <slot name="subtitle-raw">
      <p class="text-subtitle" :class="subtitleClass" style="width: 730px">
        <slot name="subtitle"></slot>
      </p>
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class PageHeader extends Vue {
  @Prop({ type: [String, Object], default: null }) titleClass!: string | object
  @Prop({ type: [String, Object], default: null }) subtitleClass!:
    | string
    | object
}
</script>
