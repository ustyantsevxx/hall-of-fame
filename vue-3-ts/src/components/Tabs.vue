<template>
  <TabGroup as="div" :default-index="defaultIndex" @change="handleTabChanged">
    <TabList as="template">
      <RadioGroupContainer :variant="variant">
        <Tab
          v-for="item in items"
          :key="item.key"
          v-slot="{ selected }"
          as="div"
        >
          <RadioGroupStyledOption
            :item="item"
            :selected="selected"
            :variant="variant"
          />
        </Tab>
      </RadioGroupContainer>
    </TabList>

    <TabPanels>
      <TabPanel v-for="item in items" :key="item.key">
        <Component :is="item.panelComponent" />
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<script setup lang="ts">
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue'
import { PropType } from 'vue'

import { RadioGroupType } from '@/components/RadioGroup.types'
import RadioGroupContainer from '@/components/RadioGroupContainer.vue'
import RadioGroupStyledOption from '@/components/RadioGroupStyledOption.vue'
import { TabItem } from '@/components/Tabs.types'

defineProps({
  items: { type: Array as PropType<TabItem[]>, default: () => [] },
  variant: { type: String as PropType<RadioGroupType>, default: 'flat' },
  defaultIndex: { type: Number, default: 0 }
})
const emit = defineEmits<{
  (e: 'change', arg: { newTabIndex: number })
}>()

const handleTabChanged = (index: number) => {
  emit('change', { newTabIndex: index })
}
</script>
