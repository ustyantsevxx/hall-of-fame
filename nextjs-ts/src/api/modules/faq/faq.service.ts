import { BaseService } from '../../shared/base.service'
import { LoyaltyPageContent } from './faq.types'

class FaqServiceClass extends BaseService {
  async getFaqPage(id: number) {
    const response = await this.axios.get<LoyaltyPageContent>(this.getPath(id))
    return {
      ...response.data
    }
  }
}

export const FaqService = new FaqServiceClass('api/v1/faq')
