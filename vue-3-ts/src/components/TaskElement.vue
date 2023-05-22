<template>
  <ColorIndicatorCard
    class="overflow-x-hidden"
    :color="task.completed ? '#D1D1D1' : task.owner?.color"
  >
    <div class="flex items-center py-8 pl-10 pr-15 laptop:pt-5 laptop:pb-5">
      <CheckboxRounded
        :model-value="task.completed"
        :color="task.owner?.color"
        :checked-color="'#3BE88A'"
        checked-title="Отменить задачу невыполненной"
        title="Отменить задачу выполненной"
        class="p-6"
        @click.stop
      />

      <div class="ml-9 mr-15 min-w-[200px] overflow-x-hidden">
        <div
          class="truncate text-medium-17 laptop:text-medium-14"
          :class="[{ 'text-black/40': task.completed }]"
        >
          {{ task.name }}
        </div>

        <div class="mt-3 flex items-center overflow-x-hidden whitespace-nowrap">
          <div
            v-if="task.finishDateTime !== null"
            class="mr-10 flex items-center text-main-placeholder"
          >
            <SvgCalendarBold class="h-16 w-16" />
            <div class="ml-4 text-15 laptop:text-12">
              {{ formattedFinishTime }}
            </div>
          </div>

          <div class="mr-16 flex space-x-12 text-main-placeholder">
            <SvgNotification
              v-if="task.notificationDateTime !== null"
              class="h-16 w-16"
            />
          </div>

          <div class="flex items-center space-x-5 overflow-x-hidden">
            <div
              class="h-10 min-h-[10px] w-10 min-w-[10px] rounded-full"
              :style="{
                backgroundColor: task.completed ? '#D1D1D1' : task.owner?.color
              }"
            ></div>
            <div
              class="truncate text-black/40 text-15 laptop:text-12"
              :class="{ '!text-main-placeholder': task.completed }"
            >
              {{ task.owner?.name }}
            </div>
          </div>
        </div>
      </div>

      <div class="ml-auto flex items-center space-x-20">
        <p
          class="w-75 text-main-primary text-17 laptop:w-60 laptop:text-[14px] laptop:leading-[25px]"
          :class="{ 'text-main-placeholder': task.completed }"
        >
          01:52:00
        </p>

        <ProgressPlayPause
          title="Запустить таймер"
          :class="{ grayscale: task.completed }"
        />
      </div>
    </div>
  </ColorIndicatorCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, PropType } from 'vue'

import CheckboxRounded from '@/components/CheckboxRounded.vue'
import ColorIndicatorCard from '@/components/ColorIndicatorCard.vue'
import ProgressPlayPause from '@/components/ProgressPlayPause.vue'
import { Task } from '@/components/TaskElement.types'

const props = defineProps({
  task: { type: Object as PropType<Task>, required: true }
})

const formattedFinishTime = computed(() => {
  return props.task.finishDateTime
    ? dayjs(props.task.finishDateTime).format('DD MMMM, HH:mm')
    : null
})
</script>
