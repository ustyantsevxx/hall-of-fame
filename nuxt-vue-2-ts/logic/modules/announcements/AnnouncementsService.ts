import { BaseService } from '~/logic/core/BaseService'
import { _AnnouncementsApi } from '~/logic/modules/announcements/AnnouncementsApi'

export class _AnnouncementsService extends BaseService<_AnnouncementsApi> {
  async getActiveAnnouncementText() {
    const response = await this.api.show()
    return response.data.content
  }
}
