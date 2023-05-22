<template>
  <div
    class="group select-none"
    :class="[disabled ? 'cursor-not-allowed' : 'cursor-pointer']"
    :title="checked ? checkedTitle || title : title"
    @click="toggleChecked"
    @keypress.prevent.enter.space="toggleChecked"
  >
    <input :id="uid" :checked="checked" type="checkbox" class="hidden" />

    <div
      tabindex="0"
      class="relative block rounded-full transition-colors"
      :class="[
        indicatorClasses,
        {
          'group-hover:bg-black/5 group-active:bg-black/10': !disabled
        }
      ]"
    >
      <Transition name="fade">
        <SvgCheckOnRounded
          v-if="checked"
          class="absolute inset-0"
          :style="{ color: checkedColor || color }"
        />
        <SvgCheckOffRounded
          v-else
          class="absolute inset-0"
          :style="{ color }"
        />
      </Transition>
    </div>

    <label :for="uid">
      <slot></slot>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { getUniqueString } from '@/utils/random'

const ARRAY_MODE = 'm_array'
const BOOLEAN_MODE = 'm_boolean'
const DEFAULT_MODE = 'm_default'

const props = defineProps({
  indicatorClasses: { type: String, default: 'h-20 w-20' },
  checkedColor: { type: String, default: undefined },
  color: { type: String, default: '' },
  checkedTitle: { type: String, default: undefined },
  title: { type: String, required: true },
  disabled: { type: Boolean, default: false },
  modelValue: {
    type: null,
    default: false
  },
  trueValue: {
    type: null,
    default: true
  },
  falseValue: {
    type: null,
    default: false
  }
})
const emit = defineEmits(['update:modelValue'])

const uid = getUniqueString()

const valueByMode = {
  [ARRAY_MODE]: {
    getChecked: () => {
      const arrayValue = props.modelValue as Array<any>
      return arrayValue.includes(props.trueValue)
    },
    getTrueValue: () => {
      const arrayModelValue = props.modelValue as any[]
      return [...arrayModelValue, props.trueValue]
    },
    getFalseValue: () => {
      const arrayModelValue = props.modelValue as any[]
      return [...arrayModelValue].filter(item => item !== props.trueValue)
    }
  },
  [BOOLEAN_MODE]: {
    getChecked: () => {
      return props.modelValue === props.trueValue
    },
    getTrueValue: () => {
      return true
    },
    getFalseValue: () => {
      return false
    }
  }
}

const checkboxMode = computed(() => {
  const isArray = Array.isArray(props.modelValue)

  if (isArray) {
    return ARRAY_MODE
  }

  const isBoolean = typeof props.modelValue === 'boolean'
  if (isBoolean) {
    return BOOLEAN_MODE
  }

  return DEFAULT_MODE
})

const checked = computed(() => {
  return (
    valueByMode?.[checkboxMode.value].getChecked() ||
    props.modelValue === props.trueValue
  )
})

const valueWhenFalse = computed(() => {
  return valueByMode?.[checkboxMode.value].getFalseValue() || props.falseValue
})

const valueWhenTrue = computed(() => {
  return valueByMode?.[checkboxMode.value].getTrueValue() || props.trueValue
})

const toggleChecked = () => {
  if (props.disabled) {
    return
  }

  emit(
    'update:modelValue',
    checked.value ? valueWhenFalse.value : valueWhenTrue.value
  )
}
</script>

<style scoped></style>
