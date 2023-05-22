<template>
  <TaskFormFieldDatetime
    v-bind="$attrs"
    label="Напоминание"
    modal-title="Напоминание"
  >
    <template #icon>
      <SvgNotification24 />
    </template>

    <template
      v-if="selectedFinishDatetime"
      #modal-after-title="{ time, date, selectTime, selectDate }"
    >
      <SuggestionsSlider
        :model-value="{ time, date }"
        :items="timeVariants"
        class="!-mx-12 mt-15 !pl-12"
        @update:modelValue="
          value =>
            selectSuggestion({
              suggestedTime: value,
              time,
              date,
              selectTime,
              selectDate
            })
        "
      />
    </template>
  </TaskFormFieldDatetime>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

import SuggestionsSlider from '@/components/SuggestionsSlider.vue'
import { TaskFormDatePickerModalSlotProps } from '@/components/TaskFormFieldDatetime.types'
import TaskFormFieldDatetime from '@/components/TaskFormFieldDatetime.vue'
import { minutesFromDateStart } from '@/utils/datetime'

const props = defineProps({
  selectedFinishDatetime: { type: Date, default: undefined }
})

const timeVariants = [
  {
    label: 'За 15 минут',
    isActive: ({ date, time }: { date: Date; time: number }) => {
      const differenceInMinute = getDateDifferenceWithFinishDateInMinute({
        date,
        time
      })
      return differenceInMinute === 15
    },
    getValue: () => {
      return props.selectedFinishDatetime
        ? minutesFromDateStart(props.selectedFinishDatetime) - 15
        : 0
    }
  },
  {
    label: 'За 30 минут',
    isActive: ({ date, time }) => {
      const differenceInMinute = getDateDifferenceWithFinishDateInMinute({
        date,
        time
      })
      return differenceInMinute === 30
    },
    getValue: () => {
      return props.selectedFinishDatetime
        ? minutesFromDateStart(props.selectedFinishDatetime) - 30
        : 0
    }
  },
  {
    label: 'За 1 час',
    isActive: ({ date, time }) => {
      const differenceInMinute = getDateDifferenceWithFinishDateInMinute({
        date,
        time
      })
      return differenceInMinute === 60
    },
    getValue: () => {
      return props.selectedFinishDatetime
        ? minutesFromDateStart(props.selectedFinishDatetime) - 60
        : 0
    }
  }
]

const selectSuggestion = (
  params: TaskFormDatePickerModalSlotProps & {
    suggestedTime: number
  }
) => {
  let newDate
  let newTime

  if (params.suggestedTime < 0) {
    newDate = dayjs(props.selectedFinishDatetime).subtract(1, 'day').toDate()
    newTime = 24 * 60 + params.suggestedTime
  } else {
    newDate = props.selectedFinishDatetime
    newTime = params.suggestedTime
  }

  params.selectDate(newDate)
  params.selectTime(newTime)
}

const getDateDifferenceWithFinishDateInMinute = ({
  date,
  time
}: {
  date: Date
  time: number
}) => {
  const selectedHours = Math.floor((time || 0) / 60)
  const selectedMinutes = (time || 0) % 60
  const selectedNotificationDatetime = dayjs(date)
    .hour(selectedHours)
    .minute(selectedMinutes)

  return selectedNotificationDatetime.diff(
    dayjs(props.selectedFinishDatetime),
    'minute'
  )
}
</script>
