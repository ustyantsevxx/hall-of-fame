<template>
  <RadioGroup v-model="habitDataStore.habit.type_id">
    <RadioGroupLabel class="text-black/40 text-17 laptop:text-14">
      Тип привычки
    </RadioGroupLabel>

    <div class="mt-13 flex space-x-11 laptop:mt-8">
      <RadioGroupOption
        v-for="option in typeOptions"
        v-slot="{ checked }"
        :key="option.value"
        :value="option.value"
        class="grow"
      >
        <div
          class="flex h-73 grow cursor-pointer flex-col items-center justify-center rounded-10 border border-main-primary transition-colors"
          :class="[
            checked ? 'text-white' : 'text-main-primary',
            { 'bg-main-primary': checked }
          ]"
        >
          <Component :is="option.iconComponent" />
          <span class="mt-5 w-92 text-center font-medium text-11">
            {{ option.title }}
          </span>
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>

<script setup lang="ts">
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'

import { HABIT_TYPES } from '@/api/modules/habits/constants'
import SvgHabitTypeCheck from '@/assets/svg/components/Svg/HabitType/Check.svg?component'
import SvgHabitTypeCounter from '@/assets/svg/components/Svg/HabitType/Counter.svg?component'
import SvgHabitTypeTime from '@/assets/svg/components/Svg/HabitType/Time.svg?component'
import { useHabitDataStore } from '@/stores/habit-data'

const habitDataStore = useHabitDataStore()

const typeOptions = [
  {
    value: HABIT_TYPES.COUNTER,
    title: 'Подсчет повторений',
    iconComponent: SvgHabitTypeCounter
  },
  {
    value: HABIT_TYPES.CHECK,
    title: 'Проверка деятельности',
    iconComponent: SvgHabitTypeCheck
  },
  {
    value: HABIT_TYPES.TIME,
    title: 'Подсчет времени',
    iconComponent: SvgHabitTypeTime
  }
]
</script>
