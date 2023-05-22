<template>
  <div
    class="group flex justify-center items-center px-30 pt-18 pb-22 rounded-10 border transition-colors"
  >
    <div class="flex justify-center items-center w-70 h-55">
      <slot name="image"></slot>
    </div>
    <div class="flex flex-col ml-20">
      <p class="mb-3 text-button font-bold transition-colors">
        <slot name="title"></slot>
      </p>
      <p
        class="text-black group-hover:text-white group-hover:opacity-50 transition"
      >
        <slot name="description"></slot>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class CardAuth extends Vue {}
</script>
