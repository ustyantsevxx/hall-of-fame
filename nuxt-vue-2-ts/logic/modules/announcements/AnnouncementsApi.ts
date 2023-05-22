import { BaseApi } from '~/logic/core/BaseApi'
import { Announcement } from '~/logic/modules/announcements/announcements.types'

export class _AnnouncementsApi extends BaseApi {
  show() {
    return this.get<Announcement>('show')
  }
}
