<template>
  <div class="flex items-center justify-between">
    <ul class="flex grow" :class="listClass">
      <li
        v-for="(item, i) in previewItems"
        :key="i"
        class="flex items-center justify-center"
      >
        <slot
          name="item"
          :select="select"
          :selected="item === modelValue || (i === 0 && firstToBeReplaced)"
          :item="i === 0 && firstToBeReplaced ? modelValue : item"
        ></slot>
      </li>
    </ul>

    <FormItemListPopover class="ml-12">
      <div class="p-16">
        <ul
          class="grid"
          :style="{
            gridTemplateColumns: `repeat(${perRowDueToBreakpoint}, minmax(0, 1fr))`
          }"
        >
          <li
            v-for="(item, i) in items"
            :key="i"
            class="flex items-center justify-center"
          >
            <slot
              name="item"
              :select="select"
              :selected="item === modelValue"
              :item="item"
            ></slot>
          </li>
        </ul>
      </div>
    </FormItemListPopover>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'

import FormItemListPopover from '@/components/FormItemListPopover.vue'
import { useWidthBreakpoints } from '@/hooks/useWidthBreakpoints'

const props = defineProps({
  modelValue: { type: null, default: null },
  items: { type: Array as PropType<any[]>, default: () => [] },
  perRow: { type: Number, default: 5 },
  perRowLaptop: { type: Number, default: 6 },
  perRowLg: { type: Number, default: 5 },
  perRowMd: { type: Number, default: 7 },
  listClass: { type: String, default: undefined }
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: string)
}>()

const { laptop, md, '2xl': xl2, lg } = useWidthBreakpoints()
const perRowDueToBreakpoint = computed(() => {
  if (xl2.value) {
    return props.perRow
  }

  if (laptop.value) {
    return props.perRowLaptop
  }

  if (lg.value) {
    return props.perRowLg
  }

  if (md.value) {
    return props.perRowMd
  }

  return props.perRow
})

const previewItems = computed(() => {
  return props.items.slice(0, perRowDueToBreakpoint.value)
})

const firstToBeReplaced = computed(() => {
  return !previewItems.value.includes(props.modelValue)
})

const select = (item: any) => {
  emit('update:modelValue', item)
}
</script>
