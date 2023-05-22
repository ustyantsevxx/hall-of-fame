<template>
  <RadioGroup v-bind="$attrs">
    <RadioGroupContainer :variant="variant">
      <RadioGroupOption
        v-for="item in items"
        v-slot="{ checked }"
        :key="item.value"
        :value="item.value"
        :class="[{ 'w-full flex-grow': variant !== 'flat' }]"
      >
        <RadioGroupStyledOption
          :item="item"
          :selected="checked"
          :variant="variant"
          class="w-full"
        />
      </RadioGroupOption>
    </RadioGroupContainer>
  </RadioGroup>
</template>

<script setup lang="ts">
import { RadioGroup, RadioGroupOption } from '@headlessui/vue'
import { PropType } from 'vue'

import {
  RadioGroupInputItem,
  RadioGroupType
} from '@/components/RadioGroup.types'
import RadioGroupContainer from '@/components/RadioGroupContainer.vue'
import RadioGroupStyledOption from '@/components/RadioGroupStyledOption.vue'

defineProps({
  items: { type: Array as PropType<RadioGroupInputItem[]>, required: true },
  variant: { type: String as PropType<RadioGroupType>, default: 'flat' }
})
</script>
