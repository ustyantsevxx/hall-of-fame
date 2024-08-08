<template>
  <CalendarWeekly
    v-model="selectedDate"
    class="mt-26 max-w-[1124px] md:mt-32 laptop:mt-15 2xl:mt-25"
  />

  <div
    v-scroll-class="{ offset: 20, class: 'border-black/5' }"
    class="-ml-15 -mr-25 mb-0 mt-10 flex-grow space-y-15 overflow-y-scroll border-t p-15 laptop:pt-10"
  >
    <template v-if="tasksLoading">
      <div class="flex w-full max-w-[1205px] justify-center py-20">
        <SvgLoader class="animate-spin text-current" />
      </div>
    </template>

    <template v-else>
      <template v-if="tasks.length > 0">
        <TaskElement
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          class="max-w-[1205px] cursor-pointer transition-all hover:bg-[#F7F7F7]"
          :class="[{ 'shadow-0! bg-[#F7F7F7] ': task.id === editingTask?.id }]"
          @click="openDrawerWithEditForm(task)"
        />
      </template>

      <template v-else>
        <div class="text-black/40">xx xx xx</div>
      </template>

      <Button
        variant="stroke-primary"
        type="button"
        class="!my-30 !px-14 laptop:!mt-25"
        @click="openDrawerWithCreateForm"
      >
        <SvgPlus class="h-24 w-24 laptop:h-20 laptop:w-20" />
        <span class="ml-4">xx xx xx</span>
      </Button>
    </template>
  </div>

  <TaskDrawerForm
    v-model:opened="drawerOpened"
    :editing-task="editingTask"
    @save="saveTask"
    @remove="handleTaskDelete"
    @closed="editingTask = undefined"
  />
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, reactive, ref, watch } from 'vue'

import { TasksService } from '@/api/modules/tasks'
import {
  TASKS_BY_DATE_QUERY_KEY,
  useTasksByDate
} from '@/api/modules/tasks/hooks'
import { useTimers } from '@/api/modules/timers/hooks'
import Button from '@/components/Button.vue'
import CalendarWeekly from '@/components/CalendarWeekly.vue'
import TaskDrawerForm from '@/components/TaskDrawerForm.vue'
import { Task } from '@/components/TaskElement.types'
import TaskElement from '@/components/TaskElement.vue'
import { TaskFormData } from '@/components/TaskForm.types'
import { useBoolean } from '@/hooks/useBoolean'

const selectedDate = ref<Date>(new Date())
const { timers } = useTimers()

const [drawerOpened, { setTrue: openDrawer, setFalse: closeDrawer }] =
  useBoolean(false)
const editingTask = ref<Task | undefined>()

const tasksQuery = reactive({
  key: [
    TASKS_BY_DATE_QUERY_KEY,
    dayjs(selectedDate.value).format('YYYY-MM-DD')
  ],
  date: selectedDate.value
})

watch(selectedDate, (value: Date) => {
  tasksQuery.key[1] = dayjs(value).format('YYYY-MM-DD')
  tasksQuery.date = value
})

const {
  tasks: apiTasks,
  tasksLoading,
  updateTask,
  deleteTask,
  createTask
} = useTasksByDate(tasksQuery)

const tasks = computed(() => {
  return TasksService.apiTasksToSortedAppTasks({
    apiTasks: apiTasks.value || [],
    timers: timers.value
  })
})

const openDrawerWithCreateForm = () => {
  editingTask.value = undefined
  openDrawer()
}

const openDrawerWithEditForm = (task: Task) => {
  editingTask.value = task
  openDrawer()
}

const saveTask = (formData: TaskFormData) => {
  const newTaskData = TasksService.formDataToNewTaskData({
    formData,
    editingTask: editingTask.value || null
  })

  if (editingTask.value !== undefined) {
    updateTask(newTaskData)
  } else {
    createTask(newTaskData)
  }

  closeDrawer()
  editingTask.value = undefined
}

const handleTaskDelete = () => {
  if (editingTask.value !== undefined) {
    closeDrawer()
    deleteTask(editingTask.value.id)
    editingTask.value = undefined
  }
}
</script>
