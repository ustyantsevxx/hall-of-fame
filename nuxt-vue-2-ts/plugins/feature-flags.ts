import { Context } from '@nuxt/types'
import { UnleashClient } from 'unleash-proxy-client'

import { RUNTIME_VARS } from '~/logic/constants/core'

export default async ({ $accessor }: Context) => {
  if (
    RUNTIME_VARS.UNLEASH.URL &&
    RUNTIME_VARS.UNLEASH.CLIENT_KEY &&
    RUNTIME_VARS.UNLEASH.APP_NAME &&
    RUNTIME_VARS.UNLEASH.ENVIRONMENT
  ) {
    const client = new UnleashClient({
      url: RUNTIME_VARS.UNLEASH.URL as string,
      clientKey: RUNTIME_VARS.UNLEASH.CLIENT_KEY as string,
      appName: RUNTIME_VARS.UNLEASH.APP_NAME as string,
      environment: RUNTIME_VARS.UNLEASH.ENVIRONMENT as string,
      disableMetrics: true,
      refreshInterval: RUNTIME_VARS.UNLEASH.REFRESH_INTERVAL,
      disableRefresh: !RUNTIME_VARS.UNLEASH.REFRESH_INTERVAL,
      context: {
        userId: $accessor.auth.user?.id?.toString() ?? undefined
      }
    })

    client.on('update', () => $accessor.featureFlags.updateFeatureFlags(client))
    client.on('ready', () => $accessor.featureFlags.updateFeatureFlags(client))

    await client.start()
  }
}
