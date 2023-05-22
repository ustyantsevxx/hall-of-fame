<template>
  <VueFinalModal
    v-slot="{ params, close }"
    :model-value="modelValue"
    :attach="attach"
    :lock-scroll="lockScroll"
    :focus-trap="focusTrap"
    :esc-to-close="escToClose"
    :click-to-close="clickToClose"
    :hide-overlay="hideOverlay"
    :content-style="{
      boxShadow:
        '0px 22px 54px rgba(10, 30, 63, 0.25), 0px 4.4px 8.775px rgba(10, 30, 63, 0.125)',
      maxHeight: preparedMaxHeight,
      maxWidth: preparedMaxWidth
    }"
    :content-class="contentClass"
    :overlay-class="overlayClass"
    :classes="classes"
    @update:modelValue="value => emit('update:modelValue', value)"
    @click-outside="value => emit('click-outside', value)"
    @before-open="value => emit('before-open', value)"
    @opened="value => emit('opened', value)"
    @before-close="value => emit('before-close', value)"
    @closed="value => emit('closed', value)"
  >
    <slot :params="params" :close="close"></slot>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  attach: { type: [String, Boolean], default: false },
  modelValue: { type: Boolean, default: false },
  lockScroll: { type: Boolean, default: false },
  focusTrap: { type: Boolean, default: false },
  escToClose: { type: Boolean, default: true },
  clickToClose: { type: Boolean, default: true },
  hideOverlay: { type: Boolean, default: false },
  maxHeight: { type: [Number, String], default: '100%' },
  maxWidth: { type: [Number, String], default: '100%' },
  contentClass: { type: String, default: 'relative bg-white rounded-15' },
  overlayClass: { type: String, default: '!bg-black/30' },
  classes: { type: String, default: 'flex justify-center items-center' }
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean)
  (e: 'click-outside', v: unknown)
  (e: 'before-open', v: unknown)
  (e: 'opened', v: unknown)
  (e: 'before-close', v: unknown)
  (e: 'closed', v: unknown)
}>()

const preparedMaxWidth = computed(() => {
  return typeof props.maxWidth === 'string'
    ? props.maxWidth
    : `${props.maxWidth}px`
})

const preparedMaxHeight = computed(() => {
  return typeof props.maxHeight === 'string'
    ? props.maxHeight
    : `${props.maxHeight}px`
})
</script>
