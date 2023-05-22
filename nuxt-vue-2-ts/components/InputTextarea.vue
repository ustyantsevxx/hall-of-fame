<template>
  <label :for="uid" class="flex flex-col">
    <span ref="grow" class="grid grow-wrap">
      <textarea
        :id="uid"
        :value="value"
        class="overflow-hidden py-17 pr-60 pl-20 max-w-full rounded-10 border transition-colors outline-none resize-none"
        :placeholder="placeholder"
        :class="{
          'border-gray-100 focus:border-blue': !invalid,
          'border-red': invalid
        }"
        @input="handleInput"
      ></textarea>
    </span>

    <slot></slot>
  </label>
</template>

<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'

import InputBaseValidatable from '~/components/InputBaseValidatable.vue'

@Component
export default class InputTextarea extends InputBaseValidatable {
  @Prop({ type: [Number, String], default: 1 }) rows!: number | string

  get wrapperRef() {
    return this.$refs.grow as any
  }

  handleInput(event: any) {
    this.emitInput(event)
    this.wrapperRef.dataset.replicatedValue = event.target.value
  }
}
</script>

<style scoped>
.grow-wrap {
  display: grid;
}
.grow-wrap::after {
  content: attr(data-replicated-value) ' ';
  white-space: pre-wrap;
  visibility: hidden;
}
.grow-wrap > textarea,
.grow-wrap::after {
  grid-area: 1 / 1 / 2 / 2;
}
</style>
