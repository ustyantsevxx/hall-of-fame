import { BaseService } from '~/logic/core/BaseService'
import {
  BonusCardLimitsDeleteRequestParams,
  BonusCardLimitsStoreRequestParams,
  BonusCardLimitsUpdateBalanceRequestParams
} from '~/logic/modules/bonus-card-limits/bonus-card-limits.types'
import { _BonusCardLimitsApi } from '~/logic/modules/bonus-card-limits/BonusCardLimitsApi'
import { handleServerResponse } from '~/logic/utils/api'

export class _BonusCardLimitsService extends BaseService<_BonusCardLimitsApi> {
  public async getLimitsTypes() {
    const response = await this.api.getTypes()
    if (response.status === 200) {
      return response.data
    }
  }

  public async saveLimits(params: BonusCardLimitsStoreRequestParams) {
    const response = await this.api.saveLimits(params)
    return handleServerResponse(response)
  }

  public async updateLimitsBalances(
    params: BonusCardLimitsUpdateBalanceRequestParams
  ) {
    const response = await this.api.updateBalances(params)
    return handleServerResponse(response)
  }

  public async deleteCardsLimit(params: BonusCardLimitsDeleteRequestParams) {
    const response = await this.api.deleteLimits(params)
    return handleServerResponse(response)
  }
}
