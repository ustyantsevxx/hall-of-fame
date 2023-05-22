import { BaseService } from '~/logic/core/BaseService'
import { PushNotificationSettingsUpdateRequestParams } from '~/logic/modules/push-notification-settings/push-notification-settings.types'
import { _PushNotificationSettingsApi } from '~/logic/modules/push-notification-settings/PushNotificationSettingsApi'
import { handleServerResponse } from '~/logic/utils/api'

export class _PushNotificationSettingsService extends BaseService<_PushNotificationSettingsApi> {
  public async getPushNotificationSettings() {
    const response = await this.api.getPushNotificationSettings()
    return response.data
  }

  public async updatePushNotificationSettings(
    options: PushNotificationSettingsUpdateRequestParams
  ) {
    const response = await this.api.updatePushNotificationSettings(options)
    return handleServerResponse<{}>(response)
  }

  public async setPushNotificationEnabledState(enabled: boolean) {
    const response = await this.api.updatePushNotificationSettings({
      user_settings: {
        notification_enabled: enabled
      }
    })
    return handleServerResponse<{}>(response)
  }
}
