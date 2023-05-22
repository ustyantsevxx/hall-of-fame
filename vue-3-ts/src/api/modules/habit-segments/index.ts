import { Service } from '@/core/Service'

class _HabitSegmentsService extends Service {}

export const HabitSegmentsService = new _HabitSegmentsService(
  'api/v1/habit_segments'
)
