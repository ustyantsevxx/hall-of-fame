<template>
  <Select>
    <template #selected-option="{ data }: any">
      <SelectTimerOption
        :color="data.color"
        :text="data.name"
        class="font-medium"
      />
    </template>

    <template #option="{ data, selected, active }">
      <SelectTimerOption
        :color="data.color"
        :text="data.name"
        class="cursor-pointer px-15 py-12"
        :class="[
          {
            'bg-main-light-gray': active && !selected,
            'bg-black/5': selected
          }
        ]"
      />
    </template>
  </Select>
</template>

<script setup lang="ts">
import Select from '@/components/Select.vue'
import SelectTimerOption from '@/components/SelectTimerOption.vue'
</script>
