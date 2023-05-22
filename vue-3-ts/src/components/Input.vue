<template>
  <input
    v-if="!multiline"
    :ref="registerInputSafeRef"
    :value="modelValue"
    class="app-input no-default-ring"
    :class="[{ 'border-subcolor-orange-cancel': invalid }, variant]"
    @input="emitVModel"
  />
  <textarea
    v-else
    :ref="registerTextareaSafeRef"
    :value="modelValue"
    :rows="rows"
    class="app-input no-default-ring"
    :class="[
      {
        'border-subcolor-orange-cancel': invalid,
        'resize-none': !enableManualResize
      },
      variant
    ]"
    @input="onTextAreaInput"
  ></textarea>
</template>

<script setup lang="ts">
import { onMounted, PropType } from 'vue'

import { InputExpose, InputVariant } from '@/components/Input.types'
import { useSafeTemplateRef } from '@/hooks/useSafeTemplateRef'
import { EventWithAnyTarget } from '@/types/utils'

defineProps({
  modelValue: { type: String, default: '' },
  invalid: { type: Boolean, default: false },
  variant: { type: String as PropType<InputVariant>, default: 'regular' },
  multiline: { type: Boolean, default: false },
  enableManualResize: { type: Boolean, default: false },
  rows: { type: Number, default: 1 }
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: string)
}>()

const emitVModel = (event: EventWithAnyTarget) => {
  emit('update:modelValue', event.target.value)
}

const { elementRef: inputRef, registerSafeRef: registerInputSafeRef } =
  useSafeTemplateRef<HTMLInputElement>()
const { elementRef: textareaRef, registerSafeRef: registerTextareaSafeRef } =
  useSafeTemplateRef<HTMLInputElement>()

onMounted(() => {
  textareaRef.value?.setAttribute(
    'style',
    'height:' + textareaRef.value?.scrollHeight + 'px;overflow-y:hidden;'
  )
})

const resizeHeight = () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
    textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px'
  }
}

const onTextAreaInput = e => {
  emitVModel(e)
  resizeHeight()
}

const focus = () => {
  inputRef.value?.focus()
  textareaRef.value?.focus()
}
const blur = () => {
  inputRef.value?.blur()
  textareaRef.value?.blur()
}

defineExpose<InputExpose>({
  focus,
  blur
})
</script>

<style>
.app-input {
  @apply w-full py-10 pl-20 outline-none laptop:py-12 laptop:pl-15 laptop:text-14;

  &.regular {
    @apply rounded-14 border bg-main-light-gray placeholder-black/40 !transition-colors focus:bg-black/5;
  }

  &.primary {
    @apply rounded-14 border bg-white/20 placeholder-white !transition-colors focus:bg-main-deep-main/30;
  }

  &.outline {
    @apply rounded-14 border-2 border-black/5 p-10 pl-15 placeholder-black/40 !transition-colors focus:border-black/10;
  }

  &.bottom-line {
    @apply border-b border-black/10 bg-transparent !py-0 !pl-0 placeholder-black/20 text-19 laptop:text-16;
  }
}
</style>
