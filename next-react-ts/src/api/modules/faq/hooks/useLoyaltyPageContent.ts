import { useQuery, UseQueryOptions } from 'react-query'

import { FAQ_PAGE_IDS } from '../faq.constants'
import { FaqService } from '../faq.service'
import { LoyaltyPageContent } from '../faq.types'

export const LOYALTY_PAGE_CONTENT_QUERY_KEY = 'loyalty-page-content'

export const getLoyaltyPageContentQuery =
  (): UseQueryOptions<LoyaltyPageContent> => ({
    queryKey: LOYALTY_PAGE_CONTENT_QUERY_KEY,
    queryFn: () => FaqService.getFaqPage(FAQ_PAGE_IDS.LOYALTY_PAGE),
    refetchOnMount: false
  })

export const useLoyaltyPageContent = () => {
  return useQuery(getLoyaltyPageContentQuery())
}
