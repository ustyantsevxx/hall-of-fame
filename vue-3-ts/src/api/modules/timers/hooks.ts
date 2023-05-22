import { useQuery } from 'vue-query'

import { TimersService } from '@/api/modules/timers'
import { NewTimerData, Timer } from '@/api/modules/timers/types'
import {
  useCreateMutation,
  useDeleteMutation,
  useUpdateMutation
} from '@/api/shared/hooks'

const TIMERS_QUERY_KEY = 'timers'

const useTimersQuery = () => {
  return useQuery(TIMERS_QUERY_KEY, () => TimersService.getTimers())
}

const useCreateTimerMutation = () => {
  return useCreateMutation({
    itemsQueryKey: TIMERS_QUERY_KEY,
    prepend: true,
    mutationFn: (newTimer: NewTimerData) => TimersService.createTimer(newTimer)
  })
}

const useUpdateTimerMutation = () => {
  return useUpdateMutation({
    itemsQueryKey: TIMERS_QUERY_KEY,
    compareFn: (item: Timer, dto: NewTimerData) => item.id === dto.id,
    mutationFn: (dto: NewTimerData) => TimersService.updateTimer(dto)
  })
}

const useDeleteTimerMutation = () => {
  return useDeleteMutation({
    itemsQueryKey: TIMERS_QUERY_KEY,
    compareFn: (item: Timer, id: string) => item.id === id,
    mutationFn: (id: string) => TimersService.deleteTimer(id)
  })
}

export const useTimers = () => {
  const { data: timers } = useTimersQuery()
  const { mutateAsync: createTimer } = useCreateTimerMutation()
  const { mutateAsync: updateTimer } = useUpdateTimerMutation()
  const { mutateAsync: deleteTimer } = useDeleteTimerMutation()

  return {
    timers,
    createTimer,
    updateTimer,
    deleteTimer
  }
}
