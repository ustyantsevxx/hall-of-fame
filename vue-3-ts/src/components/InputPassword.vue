<template>
  <div class="relative">
    <Input
      v-bind="$attrs"
      ref="inputRef"
      :type="inputType"
      :variant="variant"
      class="pr-50"
    />

    <button
      type="button"
      class="absolute right-0 flex h-full w-50 items-center justify-center shift-center-y"
      :title="localPasswordRevealed ? 'xx xx' : 'xx xx'"
      data-test="password-toggle-button"
      @click="updatePasswordRevealed(!localPasswordRevealed)"
    >
      <Transition name="fade">
        <SvgPasswordEyeOn
          v-if="localPasswordRevealed"
          class="absolute shift-center"
        />
        <SvgPasswordEyeOff v-else class="absolute shift-center" />
      </Transition>
    </button>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false
})
</script>

<script setup lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue'

import { InputVariant } from '@/components/Input.types'
import Input from '@/components/Input.vue'

const props = defineProps({
  passwordRevealed: { type: Boolean, default: false },
  variant: { type: String as PropType<InputVariant>, default: undefined }
})

const emit = defineEmits<{
  (e: 'update:passwordRevealed', v: boolean)
}>()

const localPasswordRevealed = ref(props.passwordRevealed)
const inputRef = ref()

const inputType = computed(() => {
  return localPasswordRevealed.value ? 'text' : 'password'
})

watch(props, value => {
  localPasswordRevealed.value = value.passwordRevealed
})

const updatePasswordRevealed = (value: boolean) => {
  localPasswordRevealed.value = value
  emit('update:passwordRevealed', value)
}
</script>
