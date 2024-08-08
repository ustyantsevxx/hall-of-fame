<template>
  <div class="mt-15 flex items-center">
    <div class="ml-10 truncate text-17 laptop:text-14">
      <span>xx</span>
      <template v-if="selectedTime !== null">
        <span>:</span>
        <span class="ml-5">{{ selectedTimeAsString }}</span>
      </template>
    </div>

    <TaskFormModalDatePickerClearButton
      v-if="selectedTime !== 0"
      title="xx xx xx"
      class="ml-auto"
      type="button"
      @click="reset"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import TaskFormModalDatePickerClearButton from '@/components/ButtonCircleClear.vue'
import { minutesToTimeString } from '@/utils/datetime'

const props = defineProps({
  selectedTime: { type: Number, required: true }
})

const emit = defineEmits<{
  (n: 'reset')
}>()

const selectedTimeAsString = computed(() =>
  minutesToTimeString(props.selectedTime)
)

const reset = () => emit('reset')
</script>
