import dayjs from 'dayjs'

import { ApiTask, ApiTaskData } from '@/api/modules/tasks/types'
import { Timer } from '@/api/modules/timers/types'
import { Task } from '@/components/TaskElement.types'
import { TaskFormData } from '@/components/TaskForm.types'
import { Service } from '@/core/Service'
import { getUniqueString } from '@/utils/random'

class _TasksService extends Service {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getTasks(
    params: { date?: Date | null; searchString?: string } = {}
  ): Promise<ApiTask[]> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const missedTasks = Array.from({ length: 5 }, (_, i) => ({
      id: `task${i + 1}`,
      name: `Missed Task #${i + 1}`,
      color: '#3BE88A',
      finish_datetime:
        dayjs()
          .subtract(i + 1, 'day')
          .toDate()
          .getTime() / 1000,
      notification_datetime: 1_634_556_712,
      completed: false,
      deleted_at: null,
      owner_id: 'timer1',
      favorite: false
    })) as ApiTask[]

    const todayTasks = Array.from({ length: 3 }, (_, i) => ({
      id: `task${i + missedTasks.length}`,
      name: `Today Task #${i + 1}`,
      color: '#3BE88A',
      finish_datetime: Date.now() / 1000,
      notification_datetime: null,
      completed: true,
      deleted_at: null,
      owner_id: 'timer1',
      favorite: true
    })) as ApiTask[]

    const tomorrowTasks = Array.from({ length: 5 }, (_, i) => ({
      id: `task${i + missedTasks.length + todayTasks.length}`,
      name: `Tomorrow Task #${i + 1}`,
      color: '#3BE88A',
      finish_datetime: dayjs().add(1, 'day').toDate().getTime() / 1000,
      notification_datetime: 1_634_556_712,
      completed: false,
      deleted_at: null,
      owner_id: 'timer1',
      favorite: false
    })) as ApiTask[]

    const comingUpTasks = Array.from({ length: 5 }, (_, i) => ({
      id: `task${
        i + missedTasks.length + todayTasks.length + tomorrowTasks.length
      }`,
      name: `Coming up Task #${i + 1}`,
      color: '#3BE88A',
      finish_datetime:
        dayjs()
          .add(1, 'day')
          .add(i + 1, 'day')
          .toDate()
          .getTime() / 1000,
      notification_datetime: 1_634_556_712,
      completed: false,
      deleted_at: null,
      owner_id: 'timer1',
      favorite: false
    })) as ApiTask[]

    let allTasks = [
      ...missedTasks,
      ...todayTasks,
      ...tomorrowTasks,
      ...comingUpTasks
    ]

    if (params.searchString) {
      allTasks = allTasks.filter(task =>
        task.name.includes(params.searchString || '')
      )
    }

    if (params.date) {
      allTasks = allTasks.filter(task =>
        dayjs(params.date).isSame(dayjs(task.finish_datetime * 1000), 'date')
      )
    }

    return allTasks
  }

  async createTask(newTaskData: ApiTaskData) {
    await this.axios.post(this.e('store'), newTaskData)
  }

  async updateTask(newTaskData: ApiTaskData) {
    await this.axios.put(this.e('update'), newTaskData)
  }

  async deleteTask(taskId: string) {
    await this.axios.delete(this.e('delete'), {
      params: { id: taskId }
    })
  }

  formDataToNewTaskData(params: {
    formData: TaskFormData
    editingTask: Task | null
  }): ApiTaskData {
    return {
      id: params.editingTask?.id || getUniqueString(),
      name: params.formData.name,
      owner_id: params.formData.owner.id,
      notification_datetime: params.formData.notificationDateTime?.getDate(),
      finish_datetime: (params.formData.finishDateTime ?? new Date()).getDate(),
      completed: params.editingTask?.completed || false
    }
  }

  apiTasksToAppTasks(params: {
    apiTasks: ApiTask[]
    timers?: Timer[]
  }): Task[] {
    return (
      params.apiTasks?.map(item => ({
        id: item.id,
        name: item.name,
        favorite: false,
        notificationDateTime: item.notification_datetime
          ? new Date(item.notification_datetime * 1000)
          : null,
        finishDateTime: item.finish_datetime
          ? new Date(item.finish_datetime * 1000)
          : null,
        owner: params.timers?.find(
          timer => timer.id === item.owner_id
        ) as Timer,
        completed: item.completed
      })) || []
    )
  }

  apiTasksToSortedAppTasks(params: { apiTasks: ApiTask[]; timers?: Timer[] }) {
    return this.apiTasksToAppTasks(params).sort((taskA, taskB) => {
      return (
        (taskA?.finishDateTime?.getTime() || 0) -
        (taskB?.finishDateTime?.getTime() || 0)
      )
    })
  }
}

export const TasksService = new _TasksService('api/v1/tasks')
