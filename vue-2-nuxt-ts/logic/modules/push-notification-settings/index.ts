import { httpClient } from '~/logic/modules/container'
import { _PushNotificationSettingsApi } from '~/logic/modules/push-notification-settings/PushNotificationSettingsApi'
import { _PushNotificationSettingsService } from '~/logic/modules/push-notification-settings/PushNotificationSettingsService'

export const PushNotificationSettingsModule =
  new _PushNotificationSettingsService(
    new _PushNotificationSettingsApi({
      namespace: 'api/v1/push_notification_settings',
      httpClient
    })
  )

export * from '~/logic/modules/push-notification-settings/push-notification-settings.constants'
export * from '~/logic/modules/push-notification-settings/push-notification-settings.types'
