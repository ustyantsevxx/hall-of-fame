<template>
  <div class="flex w-75 flex-col items-center">
    <div
      class="relative flex h-55 w-55 flex-col items-center justify-center space-y-2 rounded-15 border-4 border-white/50 text-white"
      role="button"
      title="Просмотр привычки"
      tabindex="0"
      :aria-label="habit.name"
      :style="{ backgroundColor: habit.color }"
      @click="value => emit('click', value)"
      @keypress.enter.space="value => emit('click', value)"
    >
      <!--  Подогнать под новый размер   -->
      <!--      <svg-->
      <!--        class="absolute brightness-95"-->
      <!--        width="55"-->
      <!--        height="55"-->
      <!--        viewBox="0 0 55 55"-->
      <!--        fill="none"-->
      <!--        xmlns="http://www.w3.org/2000/svg"-->
      <!--        :style="{-->
      <!--          color: habit.color-->
      <!--        }"-->
      <!--      >-->
      <!--        <path-->
      <!--          :id="`id-${habit.id}`"-->
      <!--          d="M32.5 2H47C55.8366 2 63 9.16344 63 18V47C63 55.8366 55.8366 63 47 63H18C9.16344 63 2 55.8366 2 47V18C2 9.16344 9.16345 2 18 2H32.4743"-->
      <!--          stroke="currentColor"-->
      <!--          stroke-width="4"-->
      <!--          stroke-linecap="round"-->
      <!--        />-->
      <!--      </svg>-->

      <IconGeneric class="h-24 w-24" :icon-name="habit.icon" />

      <p v-if="habitProgress !== undefined" class="text-11">
        {{ habitProgress }}
      </p>

      <div v-else>
        <SvgHabitsCheckOff v-if="true" />
        <SvgHabitsCheckOn v-else />
      </div>
    </div>

    <p
      class="mt-8 max-h-[40px] w-75 break-all text-center text-black line-clamp-2 text-15 laptop:text-[15px] laptop:leading-[17px]"
      :title="habit.name"
    >
      {{ habit.name }}
    </p>
  </div>
</template>

<script setup lang="ts">
// import ProgressBar from 'progressbar.js'
import { computed, onMounted, PropType } from 'vue'

import { HABIT_TYPES } from '@/api/modules/habits/constants'
import { Habit } from '@/api/modules/habits/types'
import IconGeneric from '@/components/IconGeneric.vue'

const props = defineProps({
  habit: { type: Object as PropType<Habit>, required: true }
})

const emit = defineEmits<{
  (e: 'click', v: MouseEvent | KeyboardEvent)
}>()

const habitProgress = computed(() => {
  return props.habit.type_id === HABIT_TYPES.TIME
    ? '0ч 0м'
    : props.habit.type_id === HABIT_TYPES.COUNTER
    ? `0/${props.habit.current_goal}`
    : undefined
})

onMounted(() => {
  // const a = new ProgressBar.Path(`#id-${props.habit.id}`, {
  //   duration: 1000
  // })
  // a.set(0)
  // a.animate(1)
})
</script>
