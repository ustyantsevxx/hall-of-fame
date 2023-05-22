<template>
  <div
    class="-ml-15 -mr-25 mt-0 mb-0 flex-grow space-y-8 overflow-y-scroll px-15 py-16 pb-45 laptop:pt-20 2xl:pt-30"
  >
    <template v-if="loading">
      <div class="flex w-full justify-center py-20">
        <SvgLoader class="animate-spin text-current" />
      </div>
    </template>

    <template v-else>
      <template v-for="(taskGroup, index) in taskGroups" :key="taskGroup.name">
        <TaskCollapse
          :name="taskGroup.name"
          :tasks="taskGroup.tasks"
          :editing-task="editingTask"
          :default-open="taskGroup.defaultOpen"
          @edit="edit"
        />

        <slot :name="`after-group[${index}]`"></slot>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, PropType } from 'vue'

import TaskCollapse from '@/components/TaskCollapse.vue'
import { Task } from '@/components/TaskElement.types'

type TaskGroup = {
  name: string
  tasks: Task[]
  defaultOpen?: boolean
}

const props = defineProps({
  tasks: { type: Array as PropType<Task[]>, required: true },
  loading: { type: Boolean, default: false },
  editingTask: { type: Object as PropType<Task>, default: null }
})
const emit = defineEmits<{
  (e: 'edit', v: Task)
}>()

const edit = (task: Task) => emit('edit', task)

const taskGroups = computed<TaskGroup[]>(() => {
  return [
    {
      name: 'Просроченные',
      tasks: groupedTasks.value.missed
    },
    {
      name: 'Сегодня',
      tasks: groupedTasks.value.today,
      defaultOpen: true
    },
    {
      name: 'Завтра',
      tasks: groupedTasks.value.tomorrow
    },
    {
      name: 'Предстоящие',
      tasks: groupedTasks.value.comingUp
    }
  ]
})

const groupedTasks = computed(() => {
  const groups = {
    missed: [] as Task[],
    today: [] as Task[],
    tomorrow: [] as Task[],
    comingUp: [] as Task[]
  }

  const today = dayjs()
  const tomorrow = dayjs().add(1, 'day')

  for (const task of props.tasks) {
    const isMissedTask = today.isAfter(dayjs(task.finishDateTime), 'date')
    if (isMissedTask) {
      groups.missed.push(task)
      continue
    }

    const isTodayTask = dayjs(task.finishDateTime).isToday()
    if (isTodayTask) {
      groups.today.push(task)
      continue
    }

    const isTomorrowTask = dayjs(task.finishDateTime).isTomorrow()
    if (isTomorrowTask) {
      groups.tomorrow.push(task)
      continue
    }
    const isComingUpTask = dayjs(task.finishDateTime).isAfter(tomorrow)
    if (isComingUpTask) {
      groups.comingUp.push(task)
    }
  }

  return groups
})
</script>
