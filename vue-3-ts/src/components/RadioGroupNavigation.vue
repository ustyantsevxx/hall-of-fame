<template>
  <RadioGroupContainer :variant="variant">
    <RouterLink
      v-for="item in items"
      v-slot="{ isExactActive }"
      :key="item.to"
      :to="item.to"
      class="max-w-[154px] flex-grow"
    >
      <RadioGroupStyledOption
        :item="item"
        :selected="isExactActive"
        :variant="variant"
        class="w-full"
      />
    </RouterLink>
  </RadioGroupContainer>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

import {
  RadioGroupNavigationItem,
  RadioGroupType
} from '@/components/RadioGroup.types'
import RadioGroupContainer from '@/components/RadioGroupContainer.vue'
import RadioGroupStyledOption from '@/components/RadioGroupStyledOption.vue'

defineProps({
  items: {
    type: Array as PropType<RadioGroupNavigationItem[]>,
    required: true
  },
  variant: { type: String as PropType<RadioGroupType>, default: 'flat' }
})
</script>
