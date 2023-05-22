import { useQuery } from 'vue-query'

import { TasksService } from '@/api/modules/tasks/index'
import { ApiTask, ApiTaskData } from '@/api/modules/tasks/types'
import {
  useCreateMutation,
  useDeleteMutation,
  useUpdateMutation
} from '@/api/shared/hooks'

export const TASKS_ALL_QUERY_KEY = 'tasks_all'
export const TASKS_BY_DATE_QUERY_KEY = 'tasks_by_date'

const useTasksAllQuery = () => {
  return useQuery(TASKS_ALL_QUERY_KEY, () => TasksService.getTasks())
}

const useTasksByDateQuery = (query: { key: string[]; date: Date }) => {
  return useQuery(query.key, () => TasksService.getTasks({ date: query.date }))
}

export const useCreateTasksMutation = (queryKey: string[]) => {
  return useCreateMutation({
    itemsQueryKey: queryKey,
    prepend: true,
    mutationFn: (formData: ApiTaskData) => TasksService.createTask(formData)
  })
}

export const useUpdateTaskMutation = (queryKey: string[]) => {
  return useUpdateMutation({
    itemsQueryKey: queryKey,
    compareFn: (item: ApiTask, dto: ApiTaskData) => item.id === dto.id,
    mutationFn: (dto: ApiTaskData) => TasksService.updateTask(dto)
  })
}

export const useDeleteTaskMutation = (queryKey: string[]) => {
  return useDeleteMutation({
    itemsQueryKey: queryKey,
    compareFn: (item: ApiTask, id: string) => item.id === id,
    mutationFn: (id: string) => TasksService.deleteTask(id)
  })
}

export const useTasksAll = () => {
  const { data: tasks, isLoading: tasksLoading } = useTasksAllQuery()
  const { mutateAsync: createTask } = useCreateTasksMutation([
    TASKS_ALL_QUERY_KEY
  ])
  const { mutateAsync: updateTask } = useUpdateTaskMutation([
    TASKS_ALL_QUERY_KEY
  ])
  const { mutateAsync: deleteTask } = useDeleteTaskMutation([
    TASKS_ALL_QUERY_KEY
  ])

  return {
    tasks,
    tasksLoading,
    createTask,
    updateTask,
    deleteTask
  }
}

export const useTasksByDate = (query: { key: string[]; date: Date }) => {
  const { data: tasks, isLoading: tasksLoading } = useTasksByDateQuery(query)
  const { mutateAsync: createTask } = useCreateTasksMutation(query.key)
  const { mutateAsync: updateTask } = useUpdateTaskMutation(query.key)
  const { mutateAsync: deleteTask } = useDeleteTaskMutation(query.key)

  return {
    tasks,
    tasksLoading,
    createTask,
    updateTask,
    deleteTask
  }
}
