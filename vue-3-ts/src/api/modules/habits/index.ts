import {
  Habit,
  HabitsIndexResponse,
  NewHabitData
} from '@/api/modules/habits/types'
import { Service } from '@/core/Service'
import { getUniqueString } from '@/utils/random'

class _HabitsService extends Service {
  async createHabit(habit: Omit<Habit, 'id'>) {
    const id = getUniqueString()
    const habitData = { ...habit, id }
    const response = await this.axios.post(this.e('store'), habitData)

    if (response.status === 201) {
      return { success: true, habit: habitData }
    }
  }

  async updateHabit(habitData: NewHabitData) {
    await this.axios.put(this.e('update'), habitData)
  }

  async deleteHabit(id: string) {
    await this.axios.delete(this.e('delete'), { params: { id } })
  }

  async getHabits() {
    const { data } = await this.axios.get<HabitsIndexResponse>(this.e('index'))

    // TODO: remove filter when filtered on backend
    return data.items.filter(habit => !habit.deleted_at)
  }
}

export const HabitsService = new _HabitsService('api/v1/habits')
