<template>
  <div class="max-w-[1200px] pl-1">
    <div class="flex space-x-10">
      <ColorIndicatorCard
        :color="timer.color"
        class="flex-grow overflow-x-hidden"
      >
        <div
          class="relative flex items-center justify-between py-7 pl-26 pr-25 laptop:pl-15 xl:pr-15 2xl:pl-15"
        >
          <IconGeneric
            class="h-40 min-h-[40px] w-40 min-w-[40px] laptop:h-36 laptop:min-h-[36px] laptop:w-36 laptop:min-w-[36px]"
            :icon-name="timer.icon"
            :style="{ color: timer.color }"
          />

          <div
            class="ml-21 mr-13 flex-grow truncate font-medium text-medium-17 laptop:ml-10 laptop:text-[14px] laptop:leading-[25px]"
          >
            {{ timer.name }}
          </div>

          <div class="flex items-center space-x-20">
            <p
              class="w-75 text-17 laptop:w-60 laptop:text-[14px] laptop:leading-[25px]"
            >
              {{ timerString }}
            </p>

            <button
              class="relative flex h-40 w-40 items-center justify-center rounded-full laptop:h-36 laptop:w-36"
              style="box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15)"
              title="Запустить таймер"
              @click="startTimer"
            >
              <CircleProgress
                :key="circleProgressSize"
                :percent="progress"
                :size="circleProgressSize"
                :border-bg-width="2"
                :border-width="2"
                :transition="1000"
                empty-color="rgb(66,147,242, 0.2)"
                class="!absolute !shift-center"
              />

              <span class="absolute shift-center">
                <Transition name="fade">
                  <SvgStopButton v-if="running" class="absolute shift-center" />
                  <SvgPlayButton v-else class="absolute ml-2 shift-center" />
                </Transition>
              </span>
            </button>
          </div>
        </div>
      </ColorIndicatorCard>

      <div>
        <button
          class="flex h-55 w-55 items-center justify-center rounded-15 bg-white laptop:h-50 laptop:w-50"
          title="Редактировать таймер"
          style="box-shadow: 0 0 15px rgba(0, 0, 0, 0.1)"
          @click="emit('edit', timer.id)"
        >
          <SvgEdit />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, ref } from 'vue'
import CircleProgress from 'vue3-circle-progress'

import { Timer } from '@/api/modules/timers/types'
import ColorIndicatorCard from '@/components/ColorIndicatorCard.vue'
import IconGeneric from '@/components/IconGeneric.vue'
import { useWidthBreakpoints } from '@/hooks/useWidthBreakpoints'
import { useAppStore } from '@/stores/app'
import { secondsToTimeString } from '@/utils/datetime'

const props = defineProps({
  timer: { type: Object as PropType<Timer>, required: true }
})

const emit = defineEmits<{
  (n: 'edit', t: string)
}>()

const appStore = useAppStore()
const { laptop } = useWidthBreakpoints()
const circleProgressSize = computed(() => (laptop.value ? 32 : 35))

const progress = ref(0)
const seconds = ref(0)
const running = ref(false)

const timerString = computed(() => secondsToTimeString(seconds.value, true))

const startTimer = () => {
  appStore.activeTimer = props.timer
}
</script>
