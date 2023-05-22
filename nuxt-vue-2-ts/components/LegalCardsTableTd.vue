<template>
  <td :class="classes">
    <slot></slot>
  </td>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class LegalCardsTableTd extends Vue {
  @Prop({ type: String, default: 'py-10 pr-20 text-description' })
  classes!: string
}
</script>
