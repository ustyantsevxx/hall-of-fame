/* eslint-disable no-restricted-imports */

import faker from '@faker-js/faker'
import dayjs from 'dayjs'
import { capitalize, range } from 'lodash-es'
import { createServer, Factory, Model } from 'miragejs'
import { joinURL } from 'ufo'

import {
  HABIT_ENDING_TYPES,
  HABIT_REPEATING_TYPES,
  HABIT_TYPES
} from '@/api/modules/habits/constants'

faker.locale = 'ru'

import { COLORS, ICONS } from '../src/api/shared/constants'
import { authRoutes } from './routes/auth'
import { habitsRoutes } from './routes/habits'
import { timersRoutes } from './routes/timers'
import { usersRoutes } from './routes/users'

export const server = { instance: null }

export const makeServer = ({ environment = 'development' } = {}) => {
  server.instance = createServer({
    environment,

    models: {
      user: Model,
      timer: Model,
      habit: Model
    },

    factories: {
      user: Factory.extend({
        id: 1,
        username: 'Ада Лавлейс',
        email: 'email@email.com',
        email_verified: true,
        has_data: true,
        has_subscription: true
      }),

      timer: Factory.extend({
        id: () => faker.datatype.uuid(),
        name: () => `${capitalize(faker.hacker.verb())} ${faker.hacker.noun()}`,
        icon: () => faker.random.arrayElement(ICONS),
        color: () => faker.random.arrayElement(COLORS),
        index: 0,
        is_notify_set: true,
        is_goal_set: true,
        notify_time: 420,
        goal_time: 420,
        parent_type_id: 0,
        parent_id: () => faker.datatype.uuid(),
        created_at: () => dayjs(faker.date.past()).valueOf(),
        updated_at() {
          return this.created_at
        }
      }),

      habit: Factory.extend({
        id: () => faker.datatype.uuid(),
        name: () => capitalize(faker.hacker.noun()),
        icon: () => faker.random.arrayElement(ICONS),
        color: () => faker.random.arrayElement(COLORS),
        current_goal: () => faker.datatype.number({ max: 1440 }),
        repeating: () => faker.random.arrayElements(range(0, 7)),
        end_date: () => dayjs(faker.date.future()).valueOf(),
        notification_time: () => [
          faker.datatype.number(1440),
          faker.datatype.number(1440),
          faker.datatype.number(1440)
        ],
        type_id: () => faker.random.arrayElement(Object.values(HABIT_TYPES)),
        ending_type_id: () =>
          faker.random.arrayElement(Object.values(HABIT_ENDING_TYPES)),
        repeat_type_id: () =>
          faker.random.arrayElement(Object.values(HABIT_REPEATING_TYPES)),
        created_at: () => dayjs(faker.date.past()).valueOf(),
        updated_at() {
          return this.created_at
        }
      })
    },

    seeds(server) {
      server.create('user')

      server.createList('timer', 5)
      server.createList('habit', 5)
    },

    routes() {
      this.logging = false
      this.timing = 150

      // first let aut app to fetch icons from /public/Icons directory
      this.passthrough('Icons/**')
      // then set global prefix to intercept all requests
      this.urlPrefix = joinURL(import.meta.env.VITE_API_HOST, 'api/v1')

      authRoutes(this)
      usersRoutes(this)
      timersRoutes(this)
      habitsRoutes(this)
    }
  })

  return server.instance
}
