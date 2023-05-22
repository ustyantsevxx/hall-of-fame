<template>
  <div
    class="max-h-[400px] translate-y-full overflow-y-scroll rounded-13 bg-white p-16"
    style="box-shadow: 0 0 15px rgba(0, 0, 0, 0.1)"
  >
    <slot name="before-content"></slot>

    <template v-if="searchString.length < MIN_SEARCH_STRING_LENGTH">
      <div class="text-center">
        Минимальная длина запроса
        {{ MIN_SEARCH_STRING_LENGTH }} символа
      </div>
    </template>

    <template v-else>
      <template v-if="loading">
        <div class="flex justify-center py-20">
          <SvgLoader class="animate-spin text-current" />
        </div>
      </template>

      <template v-else-if="items.length > 0">
        <TaskElement
          v-for="(task, index) in items"
          :key="task.id"
          :task="task"
          :class="[{ 'mt-20': index > 0 }]"
        />
      </template>

      <div v-else class="text-center">Ничего не найдено</div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

import { MIN_SEARCH_STRING_LENGTH } from '@/api/modules/tasks/constants'
import { Task } from '@/components/TaskElement.types'
import TaskElement from '@/components/TaskElement.vue'

defineProps({
  loading: { type: Boolean, default: false },
  searchString: { type: String, required: true },
  items: { type: Array as PropType<Task[]>, required: true }
})
</script>
