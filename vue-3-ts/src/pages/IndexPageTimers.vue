<template>
  <div class="-m-15 mt-10 -mr-30 flex flex-col overflow-y-hidden">
    <div
      class="list-complete-container space-y-15 overflow-y-scroll p-15 laptop:space-y-10"
    >
      <TransitionGroup name="list-complete">
        <TimerElement
          v-for="timer in timersWithoutActive"
          :key="timer.id"
          :timer="timer"
          class="list-complete-item"
          @edit="openEditForm"
        />

        <div
          key="button-add"
          class="list-complete-item"
          :class="[timers && timers?.length > 0 ? '!mt-25' : '']"
        >
          <SubscriptionPromotionTimerCreating v-if="timerCreatingRestricted" />

          <button
            v-else
            class="flex w-max items-center rounded-12 border border-main-primary bg-white/30 p-10 text-main-primary laptop:py-5 laptop:px-26"
            @click="openAddForm"
          >
            <SvgPlus class="h-24 w-24 laptop:h-20 laptop:w-20" />
            <span class="ml-4 text-17 laptop:text-[14px] laptop:leading-[25px]">
              Добавить таймер
            </span>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </div>

  <Drawer
    v-model:opened="drawerOpened"
    :title="
      timerDataStore.editing ? 'Редактирование таймера' : 'Создание таймера'
    "
  >
    <TimerForm
      class="mt-15"
      @create="create"
      @update="update"
      @delete="remove"
    />
  </Drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useTimers } from '@/api/modules/timers/hooks'
import Drawer from '@/components/Drawer.vue'
import SubscriptionPromotionTimerCreating from '@/components/SubscriptionPromotionTimerCreating.vue'
import TimerElement from '@/components/TimerElement.vue'
import TimerForm from '@/components/TimerForm.vue'
import { useBoolean } from '@/hooks/useBoolean'
import { useAppStore } from '@/stores/app'
import { useTimerDataStore } from '@/stores/timer-data'

const timerDataStore = useTimerDataStore()
const appStore = useAppStore()
const { timers, createTimer, updateTimer, deleteTimer } = useTimers()
const [drawerOpened, { setTrue: openDrawer, setFalse: closeDrawer }] =
  useBoolean(false)

// TODO доделать логику когда будут подключены подписки
const timerCreatingRestricted = computed(() => false)

const timersWithoutActive = computed(
  () =>
    timers.value?.filter(timer => appStore.activeTimer?.id !== timer.id) || []
)

const openAddForm = () => {
  timerDataStore.$reset()
  openDrawer()
}

const openEditForm = (timerId: string) => {
  const timerToUpdate = timers.value?.find(timer => timer.id === timerId)
  if (timerToUpdate) {
    timerDataStore.populateState(timerToUpdate)
    openDrawer()
  }
}

const create = () => {
  createTimer(timerDataStore.getRequestBody())
  closeDrawer()
}

const update = () => {
  updateTimer(timerDataStore.getRequestBody())
  closeDrawer()
}

const remove = () => {
  deleteTimer(timerDataStore.timer.id)
  closeDrawer()
}
</script>

<style>
.list-complete-container,
.list-complete-item {
  transition: all 0.8s ease;
}

.list-complete-enter-from,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
  transform: translateY(-30px);
  width: 100%;
}
</style>
