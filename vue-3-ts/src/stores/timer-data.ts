import { defineStore } from 'pinia'

import { Timer } from '@/api/modules/timers/types'
import { COLORS, ICONS } from '@/api/shared/constants'
import { getUniqueString } from '@/utils/random'

export const useTimerDataStore = defineStore('timer-data', {
  state: () => ({
    editing: false,
    timer: {
      id: '',
      name: '',
      icon: ICONS[0],
      color: COLORS[0],
      notificationsEnabled: false,
      dailyGoalEnabled: false,
      dailyGoal: 0,
      notifyAt: 0,
      index: 0
    }
  }),

  actions: {
    populateState(timerData: Timer) {
      this.editing = true

      this.timer.id = timerData.id
      this.timer.color = timerData.color
      this.timer.icon = timerData.icon
      this.timer.name = timerData.name
      this.timer.dailyGoal = timerData.goal_time
      this.timer.dailyGoalEnabled = timerData.goal_time > 0
      this.timer.notificationsEnabled = timerData.is_notify_set
      this.timer.notifyAt = timerData.notify_time
      this.timer.index = timerData.index
    },

    getRequestBody() {
      const {
        name,
        color,
        icon,
        notificationsEnabled,
        dailyGoal,
        id,
        index,
        notifyAt
      } = this.timer

      return {
        id: id || getUniqueString(),
        name,
        color,
        icon,
        index,
        is_notify_set: notificationsEnabled,
        is_goal_set: dailyGoal !== 0,
        goal_time: dailyGoal,
        parent_type_id: 0,
        notify_time: notifyAt,
        created_at: Date.now()
      }
    }
  }
})
