import { _AnnouncementsApi } from '~/logic/modules/announcements/AnnouncementsApi'
import { _AnnouncementsService } from '~/logic/modules/announcements/AnnouncementsService'
import { httpClient } from '~/logic/modules/container'

export const AnnouncementsModule = new _AnnouncementsService(
  new _AnnouncementsApi({ namespace: 'api/v1/announcements', httpClient })
)

export * from '~/logic/modules/announcements/announcements.types'
