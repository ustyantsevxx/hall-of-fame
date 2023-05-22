/* eslint-disable no-restricted-imports */

import { Response } from 'miragejs'

import {
  NOT_VERIFIED_USER,
  NOT_VERIFIED_USER_EMAIL,
  NOT_VERIFIED_USER_PASSWORD,
  USER_TOKEN,
  VERIFIED_USER,
  VERIFIED_USER_EMAIL,
  VERIFIED_USER_PASSWORD
} from '../constants'

export const authRoutes = ctx => {
  ctx.namespace = 'auth'

  ctx.get('/email/check', (schema, request) => {
    const body = request.queryParams
    const user = schema.db.users.find(1)
    return {
      email_exists: body.email === user.email
    }
  })

  ctx.post('signup', schema => {
    const user = schema.db.users.find(1)

    return {
      user: {
        ...user,
        email_verified: false
      },

      token: USER_TOKEN
    }
  })

  ctx.post('signin', (_, request) => {
    const body = JSON.parse(request.requestBody)

    const responseByEmail = {
      [VERIFIED_USER_EMAIL]: () => {
        const user = VERIFIED_USER

        if (body.password !== VERIFIED_USER_PASSWORD) {
          return new Response(422)
        }

        return {
          user,
          token: USER_TOKEN
        }
      },
      [NOT_VERIFIED_USER_EMAIL]: () => {
        const user = NOT_VERIFIED_USER

        if (body.password !== NOT_VERIFIED_USER_PASSWORD) {
          return new Response(422)
        }

        return {
          user,
          token: USER_TOKEN
        }
      }
    }

    return responseByEmail[body.email]?.() || new Response(422)
  })

  ctx.delete('signout', () => new Response(204))

  ctx.post('password/send_link', () => new Response(200))
}
