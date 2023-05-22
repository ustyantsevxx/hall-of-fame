<template>
  <div></div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'

import { STRATEGIES } from '~/plugins/nuxt-auth'

// helper page to use quick temp-token login. delete later
/* eslint-disable unicorn/no-nested-ternary */

@Component({
  auth: false,
  layout: 'empty'
})
export default class LoginEnvUserIdPage extends Vue {
  async asyncData({ $auth, query, $axios, route }: Context) {
    let authToken = query.token

    const token =
      route.params.env === 'p'
        ? process.env.PROD_ADMIN_TOKEN
        : route.params.env === 'd'
        ? process.env.DEV_ADMIN_TOKEN
        : undefined

    const url =
      route.params.env === 'p'
        ? process.env.PROD_GENERATE_TOKEN_URL
        : route.params.env === 'd'
        ? process.env.DEV_GENERATE_TOKEN_URL
        : undefined

    if (!authToken && url && token && route.params.userId) {
      const { data } = await $axios.post(
        url.replace('[USERID]', route.params.userId),
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      authToken = data.data.token
    }

    try {
      await $auth.loginWith(STRATEGIES.LEGAL_BY_TOKEN, {
        data: {
          token: authToken
        }
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Auth by token error: ${error.message}`)
    } finally {
      window.location.assign('/')
    }
  }
}
</script>
