<template>
  <div class="flex items-center py-20 px-21 space-x-15 bg-blue rounded-20">
    <div class="w-25 h-25" style="min-width: 25px">
      <slot name="icon"></slot>
    </div>
    <p class="text-description text-white">
      <slot name="content"></slot>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class CardAlert extends Vue {}
</script>
