<template>
  <Modal
    :model-value="visible"
    :attach="attach"
    focus-trap
    content-class="rounded-13 overflow-hidden overflow-y-auto w-[355px] bg-white py-25 pl-16 pr-12"
    classes="pl-[200px] mr-30 flex justify-center items-center md:pl-0 py-18 md:justify-end"
    @update:model-value="updateVisible"
    @closed="resetForm"
    @before-open="initForm"
  >
    <form class="max-h-full" @submit.prevent="submit">
      <TaskFormModalDatePickerHeader
        :title="title"
        :result-datetime="resultDateTime || undefined"
        :selected-date="selectedDate || undefined"
        @reset="resetSelectedDate"
      />

      <slot name="after-title" v-bind="slotProps"></slot>

      <div
        class="mt-25 flex justify-center rounded-15 py-8 laptop:mt-16"
        style="box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.04)"
      >
        <CalendarDatepicker v-model="selectedDate" class="task-form-calendar" />
      </div>

      <TaskFormModalDatePickerTimeTitle
        :selected-time="selectedTime"
        @reset="resetSelectedTime"
      />

      <InputHourMinuteSelector
        v-model="selectedTime"
        class="mt-15 laptop:mt-10"
        @update:modelValue="handleSelectedTimeChanged"
      />

      <slot name="after-fields" v-bind="slotProps"></slot>

      <div class="mt-25 flex">
        <Button
          variant="stroke-primary"
          class="w-[135px]"
          type="button"
          @click="cancel"
        >
          Отменить
        </Button>
        <Button variant="primary" class="ml-12 flex-grow">Сохранить</Button>
      </div>
    </form>
  </Modal>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, PropType, ref } from 'vue'

import Button from '@/components/Button.vue'
import CalendarDatepicker from '@/components/CalendarDatepicker.vue'
import InputHourMinuteSelector from '@/components/InputHourMinuteSelector.vue'
import Modal from '@/components/Modal.vue'
import { SuggestionsSliderItem } from '@/components/SuggestionsSlider.types'
import { TaskFormDatePickerModalSlotProps } from '@/components/TaskFormFieldDatetime.types'
import TaskFormModalDatePickerHeader from '@/components/TaskFormModalDatePickerHeader.vue'
import TaskFormModalDatePickerTimeTitle from '@/components/TaskFormModalDatePickerTimeTitle.vue'
import { minutesFromDateStart } from '@/utils/datetime'

const props = defineProps({
  modelValue: { type: Date, default: null },
  initialValue: { type: Date, default: null },
  visible: { type: Boolean, default: false },
  attach: { type: String, default: undefined },
  title: { type: String, required: true },
  dateVariants: {
    type: Array as PropType<SuggestionsSliderItem[]>,
    default: () => []
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: Date | null)
  (e: 'update:visible', v: boolean)
}>()

const selectedDate = ref<Date | null>(null)
const selectedTime = ref<number>(0)

const resultDateTime = computed(() => {
  if (selectedDate.value === null) {
    return null
  }

  const selectedHours = Math.floor((selectedTime.value || 0) / 60)
  const selectedMinutes = (selectedTime.value || 0) % 60

  return dayjs(selectedDate.value)
    .hour(selectedHours)
    .minute(selectedMinutes)
    .toDate()
})

const updateVisible = (value: boolean) => {
  emit('update:visible', value)
}
const submit = () => {
  emit('update:modelValue', resultDateTime.value)
  updateVisible(false)
}
const cancel = () => {
  updateVisible(false)
}

const handleSelectedTimeChanged = () => {
  if (selectedDate.value === null) {
    selectedDate.value = new Date()
  }
}

const resetSelectedTime = () => {
  selectedTime.value = 0
}

const resetSelectedDate = () => {
  selectedDate.value = null
  resetSelectedTime()
}

const resetForm = () => {
  resetSelectedDate()
  resetSelectedTime()
}

const initForm = () => {
  selectedDate.value = props.modelValue || props.initialValue || null
  selectedTime.value = props.modelValue
    ? minutesFromDateStart(props.modelValue)
    : props.initialValue
    ? minutesFromDateStart(props.initialValue)
    : 0
}

const selectDate = (date: Date) => {
  selectedDate.value = date
}
const selectTime = (time: number) => {
  selectedTime.value = time
}

const slotProps = computed<TaskFormDatePickerModalSlotProps>(() => {
  return {
    selectDate,
    selectTime,
    date: selectedDate.value,
    time: selectedTime.value
  }
})
</script>

<style>
.task-form-calendar {
  .vc-day {
    @apply !w-44 !px-2;
  }

  /* DAY CELL HIGHLIGHT */
  .vc-highlights {
    @apply w-44;

    .vc-highlight {
      &.vc-highlight-base-middle {
        @apply !w-44;
      }
    }
  }
}
</style>
