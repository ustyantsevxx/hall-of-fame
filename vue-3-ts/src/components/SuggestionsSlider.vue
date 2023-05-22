<template>
  <Slider
    :items="items"
    :vendor-props="{
      spaceBetween: 10,
      mousewheel: true,
      freeMode: true,
      grabCursor: true
    }"
  >
    <template #slide="{ item }">
      <button
        :key="item.label"
        class="rounded-10 border-2 p-8 transition-colors text-15 laptop:text-14"
        :class="[
          item.isActive(modelValue)
            ? 'border-[#FFFFFF59] bg-main-primary text-white'
            : 'border-black/5 text-main-primary hover:bg-main-primary/5 active:bg-main-primary/10'
        ]"
        type="button"
        @click="selectItem(item)"
      >
        {{ item.label }}
      </button>
    </template>
  </Slider>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

import Slider from '@/components/Slider.vue'
import { SuggestionsSliderItem } from '@/components/SuggestionsSlider.types'

defineProps({
  modelValue: { type: null, default: null },
  items: { type: Array as PropType<SuggestionsSliderItem[]>, required: true }
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: any)
}>()

const selectItem = (item: SuggestionsSliderItem) => {
  emit('update:modelValue', item.getValue())
}
</script>
