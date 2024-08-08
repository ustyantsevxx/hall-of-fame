<template>
  <RadioGroupInput
    v-model="selectedFilterKey"
    :items="timerFilterItems"
    variant="flat"
    class="mt-32 max-w-[1205px] laptop:mt-20"
  />

  <TasksListPageGroups
    :loading="tasksLoading"
    :tasks="tasks"
    :editing-task="editingTask"
    @edit="openDrawerWithEditForm"
  >
    <template #after-group[1]>
      <Button
        variant="stroke-primary"
        class="!my-25 !px-14"
        @click="openDrawerWithCreateForm"
      >
        <SvgPlus class="h-24 w-24 laptop:h-20 laptop:w-20" />
        <span class="ml-4">xx xx xx</span>
      </Button>
    </template>
  </TasksListPageGroups>

  <TasksDrawerForm
    v-model:opened="drawerOpened"
    :editing-task="editingTask"
    @save="saveTask"
    @remove="handleTaskDelete"
    @closed="editingTask = undefined"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { TasksService } from '@/api/modules/tasks'
import { useTasksAll } from '@/api/modules/tasks/hooks'
import { ApiTask } from '@/api/modules/tasks/types'
import { useTimers } from '@/api/modules/timers/hooks'
import Button from '@/components/Button.vue'
import { RadioGroupInputItem } from '@/components/RadioGroup.types'
import RadioGroupInput from '@/components/RadioGroupInput.vue'
import TasksDrawerForm from '@/components/TaskDrawerForm.vue'
import { Task } from '@/components/TaskElement.types'
import { TaskFormData } from '@/components/TaskForm.types'
import { useBoolean } from '@/hooks/useBoolean'
import TasksListPageGroups from '@/pages/TasksListPageGroups.vue'

type TimerFilterItem = RadioGroupInputItem & {
  filterFn: (item: ApiTask) => boolean
}

const ALL_TIMERS_FILTER = 'all'

const { timers } = useTimers()
const defaultTimerFilters = {
  [ALL_TIMERS_FILTER]: {
    label: 'xx',
    value: ALL_TIMERS_FILTER,
    filterFn: () => true
  }
}

const [drawerOpened, { setTrue: openDrawer, setFalse: closeDrawer }] =
  useBoolean(false)
const editingTask = ref<Task | undefined>()

const timerFilterItems = computed<TimerFilterItem[]>(() => {
  const userTimerFilters =
    timers.value?.map(timer => ({
      label: timer.name,
      value: timer.id,
      filterFn: item => item.owner_id === timer.id
    })) || []

  return [defaultTimerFilters[ALL_TIMERS_FILTER], ...userTimerFilters]
})

const selectedFilterKey = ref<string>(ALL_TIMERS_FILTER)
const selectedFilter = computed<TimerFilterItem>(() => {
  return (
    timerFilterItems.value.find(
      item => item.value === selectedFilterKey.value
    ) || defaultTimerFilters[ALL_TIMERS_FILTER]
  )
})

const {
  tasks: apiTasks,
  tasksLoading,
  createTask,
  updateTask,
  deleteTask
} = useTasksAll()

const filteredApiTasks = computed(() => {
  return apiTasks.value?.filter(selectedFilter.value.filterFn)
})

const tasks = computed<Task[]>(() => {
  return TasksService.apiTasksToSortedAppTasks({
    apiTasks: filteredApiTasks.value || [],
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
