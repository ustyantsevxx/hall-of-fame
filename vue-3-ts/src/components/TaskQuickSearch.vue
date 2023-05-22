<template>
  <div :ref="registerContainerSafeRef" class="relative z-10">
    <TaskQuickSearchInput
      v-model="searchString"
      v-model:expanded="inputExpanded"
      class="hidden md:block"
      @focus="handleBigSearchInputFocus"
      @blur="handleBigSearchInputBlur"
      @update:modelValue="toggleSearchResultVisibleIfNeeded"
    />

    <TaskQuickSearchButton
      :result-visible="searchResultVisible"
      @click="handleSmallSearchButtonClick"
    />

    <Transition name="fade">
      <TaskQuickSearchDropdown
        v-if="searchResultVisible"
        :search-string="searchString"
        :loading="searchResultLoading"
        :items="searchResultItems"
        class="absolute -bottom-8 right-0 w-[480px] md:left-0 md:right-auto md:w-full"
      >
        <template #before-content>
          <div class="mb-20 md:hidden">
            <TaskQuickSearchInput
              :ref="registerSmallSearchInputSafeRef"
              v-model="searchString"
              expanded
            />
          </div>
        </template>
      </TaskQuickSearchDropdown>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { onClickOutside, useMagicKeys } from '@vueuse/core'
import { nextTick, ref, watch } from 'vue'

import { TasksService } from '@/api/modules/tasks'
import { useTimers } from '@/api/modules/timers/hooks'
import { Task } from '@/components/TaskElement.types'
import TaskQuickSearchButton from '@/components/TaskQuickSearchButton.vue'
import TaskQuickSearchDropdown from '@/components/TaskQuickSearchDropdown.vue'
import { TaskQuickSearchInputComponent } from '@/components/TaskQuickSearchInput.types'
import TaskQuickSearchInput from '@/components/TaskQuickSearchInput.vue'
import { useSafeTemplateRef } from '@/hooks/useSafeTemplateRef'

const { timers } = useTimers()

const searchString = ref('')
const inputExpanded = ref(false)
const inputFocused = ref(false)
const searchResultVisible = ref(false)
const searchResultLoading = ref(false)
const searchResultItems = ref<Task[]>([])

const {
  elementRef: smallSearchInputRef,
  registerSafeRef: registerSmallSearchInputSafeRef
} = useSafeTemplateRef<TaskQuickSearchInputComponent>()

const { elementRef: containerRef, registerSafeRef: registerContainerSafeRef } =
  useSafeTemplateRef()
onClickOutside(containerRef, () => {
  if (searchString.value.length === 0) {
    inputExpanded.value = false
  }
  hideSearchResultContainer()
})

const { escape } = useMagicKeys()

const showSearchResultContainer = () => (searchResultVisible.value = true)
const hideSearchResultContainer = () => (searchResultVisible.value = false)

const startSearchDebounced = useDebounceFn(async () => {
  try {
    searchResultLoading.value = true
    const result = await TasksService.getTasks({
      searchString: searchString.value
    })

    searchResultItems.value = TasksService.apiTasksToAppTasks({
      apiTasks: result || [],
      timers: timers.value || []
    })
  } finally {
    searchResultLoading.value = false
  }
}, 500)

watch(
  () => [escape.value, inputExpanded.value],
  () => {
    if (!inputExpanded.value) {
      searchResultVisible.value = false
    }
  }
)

watch(
  () => searchString.value,
  value => {
    if (value.length >= 3) {
      searchResultLoading.value = true
      startSearchDebounced()
    }
  }
)

const toggleSearchResultVisibleIfNeeded = () => {
  if (searchString.value.length > 0) {
    showSearchResultContainer()
  } else {
    hideSearchResultContainer()
  }
}

const handleBigSearchInputFocus = () => {
  inputFocused.value = true
  toggleSearchResultVisibleIfNeeded()
}

const handleBigSearchInputBlur = () => {
  inputFocused.value = false
  toggleSearchResultVisibleIfNeeded()
}

const handleSmallSearchButtonClick = async () => {
  searchResultVisible.value = !searchResultVisible.value

  if (searchResultVisible.value) {
    await nextTick()
    smallSearchInputRef.value?.focusInput()
  }
}
</script>
