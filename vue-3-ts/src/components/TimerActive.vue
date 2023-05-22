<template>
  <div>
    <Transition name="popup-up">
      <div
        v-if="popupVisible"
        ref="popupRef"
        class="absolute w-[400px] -translate-y-full"
      >
        <div
          class="mb-14 rounded-15 bg-white px-22 py-20"
          style="box-shadow: 0 0 15px rgba(0, 0, 0, 0.1)"
        >
          <div class="mb-20 flex justify-between">
            <div class="text-main-primary text-medium-16">
              {{ popupTitle }}
            </div>

            <button class="h-24 w-24" title="Закрыть" @click="closeForm">
              <SvgClose class="h-full w-full text-main-primary" />
            </button>
          </div>

          <TimerActiveForm
            v-if="formMode !== null"
            :timer="timer"
            :mode="formMode"
            @save="saveTimer"
          />
        </div>
      </div>
    </Transition>

    <ColorIndicatorCard :color="timer.color">
      <div
        class="flex max-w-full items-center justify-between py-5 pl-10 pr-14"
      >
        <div class="flex items-center">
          <IconGeneric
            :icon-name="timer.icon"
            :style="{ color: timer.color }"
            class="max-h-[34px] max-w-[34px]"
          />

          <div class="ml-10 max-w-[178px]">
            <div
              :title="timer.name"
              class="truncate text-[13px] font-medium leading-[15px]"
            >
              {{ timer.name }}
            </div>
            <p class="w-75 text-[11px] leading-[20px]">
              {{ timerString }}
            </p>
          </div>
        </div>

        <div class="ml-10 flex items-center space-x-10">
          <button class="block h-23 w-23" @click="editTimer">
            <SvgFeedback class="max-h-full max-w-full text-main-primary" />
          </button>

          <ProgressPlayPause
            :progress="progress"
            :running="running"
            :title="running ? 'Остановить таймер' : 'Запустить таймер'"
            @play="startTimer"
            @pause="pauseTimer"
          />
        </div>
      </div>
    </ColorIndicatorCard>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { computed, nextTick, PropType, ref, watch } from 'vue'

import { Timer } from '@/api/modules/timers/types'
import ColorIndicatorCard from '@/components/ColorIndicatorCard.vue'
import IconGeneric from '@/components/IconGeneric.vue'
import ProgressPlayPause from '@/components/ProgressPlayPause.vue'
import { TimerActiveFormMode } from '@/components/TimerActiveForm.types'
import TimerActiveForm from '@/components/TimerActiveForm.vue'
import { useAppStore } from '@/stores/app'
import { secondsToTimeString } from '@/utils/datetime'

const props = defineProps({
  timer: { type: Object as PropType<Timer>, required: true }
})

const emit = defineEmits<{
  (e: 'start')
  (e: 'pause')
}>()

const popupRef = ref(null)
const { activate, deactivate } = useFocusTrap(popupRef)
onClickOutside(popupRef, () => closeForm())

const appStore = useAppStore()

const formMode = ref<TimerActiveFormMode | null>(null)
const popupVisible = ref(false)

const popupTitle = computed(() => {
  const config = {
    [TimerActiveFormMode.Editing]: 'Комментарий',
    [TimerActiveFormMode.Finishing]: 'Завершение таймера'
  }

  return formMode.value !== null ? config[formMode.value] : ''
})

const editTimer = () => {
  if (formMode.value === TimerActiveFormMode.Editing) {
    closeForm()
    return
  }

  formMode.value = TimerActiveFormMode.Editing
  openForm()
}

const finishTimer = () => {
  formMode.value = TimerActiveFormMode.Finishing
  openForm()
}

const openForm = async () => {
  popupVisible.value = true
  await nextTick()
  activate()
}
const closeForm = () => {
  formMode.value = null
  popupVisible.value = false
  deactivate()
}

const saveTimer = () => {
  const config = {
    [TimerActiveFormMode.Editing]: () => {
      // eslint-disable-next-line no-console
      console.log('Timer saved')
    },
    [TimerActiveFormMode.Finishing]: () => {
      // eslint-disable-next-line no-console
      console.log('Timer saved')
      appStore.activeTimer = null
    }
  }

  if (formMode.value !== null) {
    config[formMode.value]()
  }

  closeForm()
}

const intervalInstance = ref<ReturnType<typeof setInterval>>()
const progress = ref(0)
const seconds = ref(0)
const running = ref(false)

const startInterval = () => {
  intervalInstance.value = setInterval(() => {
    seconds.value++
    progress.value = progress.value >= 100 ? 100 : progress.value + 100 / 60
  }, 1000)
}

const timerString = computed(() => secondsToTimeString(seconds.value, true))

const startTimer = () => {
  // eslint-disable-next-line no-console
  console.log('START')
  running.value = true
  startInterval()
  emit('start')
}
const pauseTimer = () => {
  // eslint-disable-next-line no-console
  console.log('PAUSE')
  running.value = false

  if (intervalInstance.value) {
    clearInterval(intervalInstance.value)
  }

  emit('pause')

  finishTimer()
}

watch(
  () => props.timer,
  timer => {
    if (timer) {
      startTimer()
    }
  },
  {
    immediate: true
  }
)
</script>

<style>
.popup-up-enter-active,
.popup-up-leave-active {
  @apply transition;
}

.popup-up-enter-from,
.popup-up-leave-to {
  @apply translate-y-[-98%] opacity-0;
}
</style>
