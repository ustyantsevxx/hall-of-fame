import { _BonusCardLimitsApi } from '~/logic/modules/bonus-card-limits/BonusCardLimitsApi'
import { _BonusCardLimitsService } from '~/logic/modules/bonus-card-limits/BonusCardLimitsService'
import { httpClient } from '~/logic/modules/container'

export const BonusCardLimitsModule = new _BonusCardLimitsService(
  new _BonusCardLimitsApi({ namespace: 'api/v1/bonus_card_limits', httpClient })
)

// export * from '~/logic/modules/bonus-card-limits/bonus-card-limits.constants'
// export * from '~/logic/modules/bonus-card-limits/bonus-card-limits.types'
