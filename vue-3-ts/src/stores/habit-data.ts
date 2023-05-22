import { defineStore } from 'pinia'

import {
  HABIT_ENDING_TYPES,
  HABIT_REPEATING_TYPES,
  HABIT_TYPES
} from '@/api/modules/habits/constants'
import { Habit } from '@/api/modules/habits/types'
import { COLORS, ICONS } from '@/api/shared/constants'
import { getUniqueString } from '@/utils/random'

type HabitDataStoreState = {
  editing: boolean
  habit: {
    id: string
    name: string
    color: string
    icon: string
    type_id: number
    ending_type_id: number
    repeat_type_id: number
    repeating: number[]
    notification_time: number[]
    current_goal?: number
    end_date?: Date
    created_at?: Date
  }
}

export const useHabitDataStore = defineStore('habit-data', {
  state: () =>
    ({
      editing: false,
      habit: {
        id: '',
        name: '',
        type_id: HABIT_TYPES.COUNTER,
        color: COLORS[0],
        icon: ICONS[0],
        repeating: [],
        end_date: undefined,
        ending_type_id: HABIT_ENDING_TYPES.INDEFINITE,
        notification_time: [],
        current_goal: 1,
        repeat_type_id: HABIT_REPEATING_TYPES.TIMES
      }
    } as HabitDataStoreState),

  actions: {
    populateState(habitData: Habit) {
      this.habit.id = habitData.id
      this.habit.name = habitData.name
      this.habit.type_id = habitData.type_id
      this.habit.color = habitData.color
      this.habit.icon = habitData.icon
      this.habit.repeating = habitData.repeating
      this.habit.end_date = habitData.end_date
        ? new Date(habitData.end_date)
        : undefined
      this.habit.created_at = habitData.created_at
        ? new Date(habitData.created_at)
        : undefined
      this.habit.ending_type_id = habitData.ending_type_id
      this.habit.notification_time = habitData.notification_time
      this.habit.current_goal = habitData.current_goal
      this.habit.repeat_type_id = habitData.repeat_type_id
    },

    getRequestBody() {
      const {
        id,
        name,
        type_id,
        color,
        icon,
        repeating,
        end_date,
        ending_type_id,
        notification_time,
        current_goal,
        repeat_type_id
      } = this.habit

      return {
        id: id || getUniqueString(),
        name,
        color,
        icon,
        end_date: end_date?.getTime() || undefined,
        ending_type_id,
        notification_time,
        repeat_type_id,
        type_id,
        repeating,
        current_goal
      }
    }
  }
})
