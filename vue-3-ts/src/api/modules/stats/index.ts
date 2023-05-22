import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'
import { reverse, sortBy } from 'lodash-es'

import { TIME_INTERVAL_MOOD } from '@/api/modules/time-intervals/constants'
import { Service } from '@/core/Service'

export const getStatsEntryMock = () => ({
  id: faker.datatype.number(),
  name: faker.lorem.words(),
  time: faker.datatype.number({ min: 0, max: 12_000 }),
  color: faker.internet.color(200, 200, 200),
  mood: faker.datatype.number({
    min: TIME_INTERVAL_MOOD.VERY_BAD,
    max: TIME_INTERVAL_MOOD.VERY_GOOD
  })
})

export const getStatsMock = () => {
  return Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    index: i,
    date: dayjs().subtract(i, 'days').format('D MMMM'),
    tags: {
      total: `${faker.datatype.number(50)}ч`,
      intervalCount: faker.datatype.number(50).toString(),
      focus: `${faker.datatype.number(23)}ч ${faker.datatype.number(60)}м`,
      mood: faker.datatype.number({
        min: TIME_INTERVAL_MOOD.VERY_BAD,
        max: TIME_INTERVAL_MOOD.VERY_GOOD
      })
    },
    entries: reverse(
      sortBy(
        Array.from({ length: faker.datatype.number({ min: 0, max: 7 }) }, () =>
          getStatsEntryMock()
        ),
        entry => entry.time
      )
    )
  }))
}

class _StatsService extends Service {
  getStats() {
    return getStatsMock()
  }
}

// TODO endpoint
export const StatsService = new _StatsService('stats')
