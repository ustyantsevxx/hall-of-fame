import { BaseApi } from '~/logic/core/BaseApi'
import {
  PushNotificationSettingsMyResponse,
  PushNotificationSettingsUpdateRequestParams
} from '~/logic/modules/push-notification-settings/push-notification-settings.types'

export class _PushNotificationSettingsApi extends BaseApi {
  async getPushNotificationSettings() {
    return await this.get<PushNotificationSettingsMyResponse>('my')
  }

  async updatePushNotificationSettings(
    params: PushNotificationSettingsUpdateRequestParams
  ) {
    return await this.put<{}>('update', params)
  }
}
