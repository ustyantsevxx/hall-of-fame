export interface NotificationSettings {
  id: number
  name: string
  name_translate: string
  balance: number | null
  is_enabled: boolean
  send_to_phone: boolean
  send_to_email: boolean
  fields: {
    balance: boolean
  }
}

export interface UserNotificationSettings {
  notification_enabled: boolean
  emails: string[]
  phones: string[]
}

export interface PushNotificationSettingsMyResponse {
  notification_settings: NotificationSettings[]
  user_settings: UserNotificationSettings
}

export interface PushNotificationSettings {
  id: number
  is_enabled?: boolean
  send_to_phone?: boolean
  send_to_email?: boolean
  balance?: number
}

export interface UserPushNotificationSettings {
  notification_enabled: boolean
  notification_phones?: string[]
  notification_emails?: string[]
}

export interface PushNotificationSettingsUpdateRequestParams {
  settings?: PushNotificationSettings[]
  user_settings?: UserPushNotificationSettings
}
