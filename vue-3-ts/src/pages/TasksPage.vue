<template>
  <DefaultLayout content-class="!pb-0">
    <div class="flex max-h-full flex-col">
      <div class="flex max-w-[1205px]">
        <RadioGroupInput
          v-model="selectedViewMode"
          :items="tasksViewModes"
          :variant="'button-group-shadow'"
          disable-option-tab-index
          class="w-[420px]"
        />

        <div class="relative ml-16 w-fit md:w-[475px]">
          <TaskQuickSearch />
        </div>
      </div>

      <Component
        :is="selectedViewModeConfig.component"
        v-if="selectedViewModeConfig"
      />
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'
import { computed, watch } from 'vue'

import { RadioGroupInputItem } from '@/components/RadioGroup.types'
import RadioGroupInput from '@/components/RadioGroupInput.vue'
import TaskQuickSearch from '@/components/TaskQuickSearch.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import TasksCalendarPage from '@/pages/TasksCalendarPage.vue'
import TasksListPage from '@/pages/TasksListPage.vue'

type TasksViewMode = {
  label: string
  component: any
}

const VIEW_MODE_QUERY_KEY = 'vm'

const VIEW_MODES = { LIST: 'list', CALENDAR: 'calendar' }
const DEFAULT_VIEW_MODE = VIEW_MODES.LIST
const VIEW_MODES_LIST = [VIEW_MODES.LIST, VIEW_MODES.CALENDAR]

const configsByViewMode: Record<string, TasksViewMode> = {
  [VIEW_MODES.LIST]: {
    label: 'Мои задачи',
    component: TasksListPage
  },
  [VIEW_MODES.CALENDAR]: {
    label: 'Календарь',
    component: TasksCalendarPage
  }
}

const tasksViewModes: RadioGroupInputItem[] = VIEW_MODES_LIST.map(viewMode => ({
  value: viewMode,
  label: configsByViewMode[viewMode].label
}))

const selectedViewMode = useRouteQuery(VIEW_MODE_QUERY_KEY, DEFAULT_VIEW_MODE)
watch(
  () => selectedViewMode.value,
  value => {
    if (!VIEW_MODES_LIST.includes(value)) {
      selectedViewMode.value = DEFAULT_VIEW_MODE
    }
  },
  {
    immediate: true
  }
)

const selectedViewModeConfig = computed(
  () => configsByViewMode[selectedViewMode.value]
)
</script>
