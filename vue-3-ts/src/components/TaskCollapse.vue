<template>
  <Collapse>
    <template #activator-content="{ open }">
      <div
        class="flex w-full max-w-[1205px] select-none items-center border-b border-black/10 pt-9 pb-16 transition-all group-hover:opacity-80 laptop:py-7"
      >
        <span class="text-17 laptop:text-14">{{ name }}</span>
        <div
          class="relative ml-6 h-24 w-24 rounded-full bg-main-primary py-2 px-7 text-white text-15 laptop:h-20 laptop:w-20 laptop:text-[10px] laptop:leading-[17px]"
        >
          <div class="absolute shift-center laptop:text-11">
            {{ tasks.length }}
          </div>
        </div>

        <SvgChevron
          class="ml-auto h-24 w-24 text-main-placeholder transition-all group-hover:text-black/30"
          :class="[{ 'rotate-180': open }]"
        />
      </div>
    </template>

    <template #default="{ open }">
      <div class="space-y-15 pt-16" :class="{ 'mb-10': open }">
        <template v-if="tasks.length > 0">
          <TaskElement
            v-for="task in tasks"
            :key="task.id"
            :task="task"
            class="max-w-[1205px] cursor-pointer transition-all hover:bg-[#F7F7F7]"
            :class="[{ '!shadow-0 bg-[#F7F7F7]': task.id === editingTask?.id }]"
            @click="emit('edit', task)"
          />
        </template>

        <template v-else>
          <div class="text-black/40">Список задач пуст</div>
        </template>
      </div>
    </template>
  </Collapse>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

import Collapse from '@/components/Collapse.vue'
import { Task } from '@/components/TaskElement.types'
import TaskElement from '@/components/TaskElement.vue'

defineProps({
  name: { type: String, required: true },
  tasks: { type: Array as PropType<Task[]>, required: true },
  editingTask: { type: Object as PropType<Task>, default: null }
})

const emit = defineEmits<{
  (e: 'edit', v: Task)
}>()
</script>
