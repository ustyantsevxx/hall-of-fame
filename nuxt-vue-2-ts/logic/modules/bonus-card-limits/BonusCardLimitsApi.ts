import { BaseApi } from '~/logic/core/BaseApi'
import {
  BonusCardLimitsDeleteRequestParams,
  BonusCardLimitsStoreRequestParams,
  BonusCardLimitsType,
  BonusCardLimitsUpdateBalanceRequestParams
} from '~/logic/modules/bonus-card-limits/bonus-card-limits.types'
import { BonusCard } from '~/logic/modules/bonus-cards'

export class _BonusCardLimitsApi extends BaseApi {
  getTypes() {
    return this.get<BonusCardLimitsType[]>('types')
  }

  saveLimits(params: BonusCardLimitsStoreRequestParams) {
    return this.post<BonusCard[]>('store', params)
  }

  updateBalances(params: BonusCardLimitsUpdateBalanceRequestParams) {
    return this.put<BonusCard[]>('update/balance', params)
  }

  deleteLimits(params: BonusCardLimitsDeleteRequestParams) {
    return this.delete<BonusCard[]>('delete', params)
  }
}
