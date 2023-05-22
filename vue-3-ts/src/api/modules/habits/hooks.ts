import { useQuery } from 'vue-query'

import { HabitsService } from '@/api/modules/habits'
import { Habit, NewHabitData } from '@/api/modules/habits/types'
import {
  useCreateMutation,
  useDeleteMutation,
  useUpdateMutation
} from '@/api/shared/hooks'

const HABITS_QUERY_KEY = 'habits'

const useHabitsQuery = () => {
  return useQuery(HABITS_QUERY_KEY, () => HabitsService.getHabits())
}

const useCreateHabitMutation = () => {
  return useCreateMutation({
    itemsQueryKey: HABITS_QUERY_KEY,
    prepend: true,
    mutationFn: (newHabit: Habit) => HabitsService.createHabit(newHabit)
  })
}

const useUpdateHabitMutation = () => {
  return useUpdateMutation({
    itemsQueryKey: HABITS_QUERY_KEY,
    compareFn: (item: Habit, dto: NewHabitData) => item.id === dto.id,
    mutationFn: (dto: NewHabitData) => HabitsService.updateHabit(dto)
  })
}

const useDeleteHabitMutation = () => {
  return useDeleteMutation({
    itemsQueryKey: HABITS_QUERY_KEY,
    compareFn: (item: Habit, id: string) => item.id === id,
    mutationFn: (id: string) => HabitsService.deleteHabit(id)
  })
}

export const useHabits = () => {
  const { data: habits } = useHabitsQuery()
  const { mutateAsync: createHabit } = useCreateHabitMutation()
  const { mutateAsync: updateHabit } = useUpdateHabitMutation()
  const { mutateAsync: deleteHabit } = useDeleteHabitMutation()

  return {
    habits,
    createHabit,
    updateHabit,
    deleteHabit
  }
}
