<template>
  <form
    class="group relative w-full transition-width duration-300"
    :class="{
      'w-45 !cursor-pointer': !expanded
    }"
    @submit.prevent="emit('submit')"
  >
    <button
      :tabindex="expanded ? '-1' : '0'"
      class="absolute flex h-40 w-45 items-center justify-center rounded-5 text-main-placeholder transition-colors shift-center-y hover:text-black/30 active:text-black/40"
      type="button"
      @click="handleSearchButtonClick"
    >
      <SvgSearch28 class="max-h-[24px] max-w-[24px]" />
    </button>

    <Input
      :ref="registerSafeRef"
      :tabindex="expanded ? '0' : '-1'"
      v-bind="$attrs"
      :model-value="modelValue"
      variant="outline"
      class="!rounded-5 !py-6 transition-all"
      :class="[
        {
          '!pl-40 !pr-40': expanded
        }
      ]"
      @focus="handleInputFocus"
      @blur="handleInputBlur"
      @update:modelValue="updateModelValue"
    />

    <Transition name="fade">
      <ButtonCircleClear
        v-if="expanded && modelValue.length > 0"
        title="Очистить"
        class="absolute right-10 shift-center-y"
        type="button"
        @click="clear"
      />
    </Transition>
  </form>
</template>

<script setup lang="ts">
import { watch } from 'vue'

import ButtonCircleClear from '@/components/ButtonCircleClear.vue'
import { InputComponent } from '@/components/Input.types'
import Input from '@/components/Input.vue'
import { TaskQuickSearchInputExpose } from '@/components/TaskQuickSearchInput.types'
import { useSafeTemplateRef } from '@/hooks/useSafeTemplateRef'

const props = defineProps({
  modelValue: { type: String, default: '' },
  expanded: { type: Boolean, default: false }
})
const emit = defineEmits<{
  (n: 'update:modelValue', t: string)
  (n: 'update:expanded', t: boolean)
  (n: 'focus')
  (n: 'blur')
  (n: 'submit')
}>()
const updateModelValue = (value: string) => {
  emit('update:modelValue', value)
}
const updateExpanded = (value: boolean) => {
  emit('update:expanded', value)
}

const { elementRef: inputRef, registerSafeRef } =
  useSafeTemplateRef<InputComponent>()

const focusInput = () => {
  inputRef.value?.focus()
}
const blurInput = () => {
  inputRef.value?.blur()
}

watch(
  () => props.expanded,
  value => {
    if (value) {
      focusInput()
    } else {
      blurInput()
    }
  }
)

const expandInput = () => {
  updateExpanded(true)
}
const shrinkInput = () => {
  updateExpanded(false)
}

const handleSearchButtonClick = () => {
  if (props.expanded) {
    if (props.modelValue.length > 0) {
      emit('submit')
    } else {
      shrinkInput()
    }
  } else {
    expandInput()
  }
}

const handleInputFocus = () => {
  expandInput()
  emit('focus')
}

const handleInputBlur = () => {
  emit('blur')
}

const clear = () => {
  updateModelValue('')
  shrinkInput()
}

defineExpose<TaskQuickSearchInputExpose>({
  focusInput,
  blurInput
})
</script>
