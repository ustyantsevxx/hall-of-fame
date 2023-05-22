import { _BonusCardsApi } from '~/logic/modules/bonus-cards/BonusCardsApi'
import { _BonusCardsService } from '~/logic/modules/bonus-cards/BonusCardsService'
import { httpClient } from '~/logic/modules/container'

export const BonusCardsModule = new _BonusCardsService(
  new _BonusCardsApi({ namespace: 'api/v1/bonus_cards', httpClient })
)

export * from '~/logic/modules/bonus-cards/bonus-cards.constants'
export * from '~/logic/modules/bonus-cards/bonus-cards.types'
