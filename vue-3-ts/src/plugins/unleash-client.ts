import { Pinia } from 'pinia'
import { UnleashClient } from 'unleash-proxy-client'

import { ENV_VARS } from '@/core/constants'
import { useFeatureFlagsStore } from '@/stores/feature-flags'

export const registerUnleashClient = async (piniaStore: Pinia) => {
  if (
    ENV_VARS.UNLEASH.APP_NAME &&
    ENV_VARS.UNLEASH.CLIENT_KEY &&
    ENV_VARS.UNLEASH.URL &&
    ENV_VARS.UNLEASH.ENVIRONMENT
  ) {
    const client = new UnleashClient({
      url: ENV_VARS.UNLEASH.URL as string,
      clientKey: ENV_VARS.UNLEASH.CLIENT_KEY as string,
      appName: ENV_VARS.UNLEASH.APP_NAME as string,
      environment: ENV_VARS.UNLEASH.ENVIRONMENT as string,
      refreshInterval: ENV_VARS.UNLEASH.REFRESH_INTERVAL,
      disableRefresh: !ENV_VARS.UNLEASH.REFRESH_INTERVAL
    })

    const featureFlagsStore = useFeatureFlagsStore(piniaStore)
    client.on('update', () => featureFlagsStore.updateFeatureFlags(client))
    client.on('ready', () => featureFlagsStore.updateFeatureFlags(client))

    await client.start()
  }
}
