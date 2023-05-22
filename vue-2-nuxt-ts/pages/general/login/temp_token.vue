<template>
  <div></div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'

import { STRATEGIES } from '~/plugins/nuxt-auth'

@Component({
  auth: false,
  layout: 'empty'
})
export default class LoginTempTokenPage extends Vue {
  async asyncData({ $auth, query }: Context) {
    const authToken = query.token

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
