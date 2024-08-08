<template>
  <Drawer
    :opened="opened"
    :title="drawerTitle"
    @update:opened="value => emit('update:opened', value)"
    @closed="emit('closed')"
  >
    <div class="mt-15 laptop:mt-8">
      <TaskForm
        v-if="!editingTask"
        :timer-options="timers || []"
        @save="saveTask"
        @remove="emit('remove')"
      />

      <TaskFormEdit
        v-else
        :timer-options="timers || []"
        :initial-form-data="editingTaskFormData"
        @save="saveTask"
      />
    </div>
  </Drawer>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'

import { useTimers } from '@/api/modules/timers/hooks'
import Drawer from '@/components/Drawer.vue'
import { Task } from '@/components/TaskElement.types'
import { TaskFormData } from '@/components/TaskForm.types'
import TaskForm from '@/components/TaskForm.vue'
import TaskFormEdit from '@/components/TaskFormEdit.vue'

const props = defineProps({
  opened: { type: Boolean, default: false },
  completed: { type: Boolean, default: false },
  favorite: { type: Boolean, default: false },
  editingTask: {
    type: Object as PropType<Task | undefined>,
    default: undefined
  }
})

const emit = defineEmits<{
  (n: 'update:opened', t: boolean)
  (n: 'closed')
  (n: 'remove')
  (n: 'save', t: TaskFormData)
}>()

const drawerTitle = computed(() =>
  props.editingTask === undefined ? 'xx xx' : 'xx xx'
)

const { timers } = useTimers()

const editingTaskFormData = computed<TaskFormData | undefined>(() => {
  return props.editingTask === undefined
    ? undefined
    : {
        name: props.editingTask.name,
        owner: props.editingTask.owner,
        notificationDateTime: props.editingTask.notificationDateTime,
        finishDateTime: props.editingTask.finishDateTime,
        favorite: props.editingTask.favorite,
        completed: props.editingTask.completed
      }
})

const saveTask = (formData: TaskFormData) => {
  emit('save', formData)
}
</script>
