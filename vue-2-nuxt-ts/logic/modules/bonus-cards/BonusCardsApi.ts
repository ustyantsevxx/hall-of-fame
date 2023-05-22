import { BaseApi } from '~/logic/core/BaseApi'
import {
  BonusCard,
  BonusCardLimit,
  BonusCardLimitRequestParams,
  BonusCardsUpdateBalanceRequestParams,
  BonusCardsUpdateBalanceResponse,
  BonusCardsUpdateRubleCardLimitRequestParams,
  BonusCardsUpdateStatusRequestParams,
  BonusCardUpdateRequestParams
} from '~/logic/modules/bonus-cards'

export class _BonusCardsApi extends BaseApi {
  getAll() {
    return this.get<BonusCard[]>('all')
  }

  getLimit(options: BonusCardLimitRequestParams) {
    return this.get<BonusCardLimit>('limit', options)
  }

  update(options: BonusCardUpdateRequestParams) {
    return this.put<BonusCard>('update', options)
  }

  updateCardsStatus(options: BonusCardsUpdateStatusRequestParams) {
    return this.put<BonusCard[]>('update/status', options)
  }

  updateCardsBalance(options: BonusCardsUpdateBalanceRequestParams) {
    return this.put<BonusCardsUpdateBalanceResponse>('update/balance', options)
  }

  updateRubleCardLimit(options: BonusCardsUpdateRubleCardLimitRequestParams) {
    return this.put<BonusCard>('update/limit_rubles', options)
  }
}
