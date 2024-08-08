import { BaseService } from '~/logic/core/BaseService'
import {
  BONUS_CARD_LIMIT_TYPES,
  BONUS_CARD_STATUSES,
  BonusCard,
  BonusCardsUpdateBalanceRequestParams,
  BonusCardsUpdateBalanceResponse,
  BonusCardsUpdateStatusRequestParams,
  BonusCardUpdateRequestParams,
  LEGAL_BONUS_CARD_LITER_TYPES,
  LEGAL_BONUS_CARD_RUBLE_TYPES,
  LEGAL_BONUS_CARDS_CASHLESS_TYPES
} from '~/logic/modules/bonus-cards'
import { _BonusCardsApi } from '~/logic/modules/bonus-cards/BonusCardsApi'
import { handleServerResponse } from '~/logic/utils/api'

import { BonusCardsUpdateRubleCardLimitRequestParams } from './bonus-cards.types'

export class _BonusCardsService extends BaseService<_BonusCardsApi> {
  async getBonusCards() {
    const response = await this.api.getAll()
    if (response.status === 200) {
      return response.data
    }
  }

  async getBonusCardLimits(bonusCardId: number) {
    const response = await this.api.getLimit({
      bonus_card_id: bonusCardId
    })
    if (response.status === 200) {
      return response.data
    }
  }

  async updateBonusCardParams(options: BonusCardUpdateRequestParams) {
    const response = await this.api.update(options)
    return handleServerResponse<BonusCard>(response)
  }

  async updateBonusCardsStatus(options: BonusCardsUpdateStatusRequestParams) {
    const response = await this.api.updateCardsStatus(options)
    return handleServerResponse<BonusCard[]>(response)
  }

  async updateBonusCardsBalance(options: BonusCardsUpdateBalanceRequestParams) {
    const response = await this.api.updateCardsBalance(options)
    return handleServerResponse<BonusCardsUpdateBalanceResponse>(response)
  }

  async updateRubleCardLimit(
    options: BonusCardsUpdateRubleCardLimitRequestParams
  ) {
    const response = await this.api.updateRubleCardLimit(options)
    return handleServerResponse<BonusCard>(response)
  }

  isRubleCard(typeId: number) {
    return LEGAL_BONUS_CARD_RUBLE_TYPES.includes(typeId)
  }

  isLiterCard(typeId: number) {
    return LEGAL_BONUS_CARD_LITER_TYPES.includes(typeId)
  }

  getBonusCardNameByType(typeId: number) {
    const items = [
      {
        name: 'xx',
        types: LEGAL_BONUS_CARD_RUBLE_TYPES
      },
      {
        name: 'xx',
        types: LEGAL_BONUS_CARD_LITER_TYPES
      }
    ]

    for (const item of items) {
      if (item.types.includes(typeId)) {
        return item.name
      }
    }
  }

  checkIfCardStatusCommentOutputRequired(cardStatusId?: number) {
    return cardStatusId === BONUS_CARD_STATUSES.BLOCKED
  }

  getBonusCardCurrencySignByType(typeId: number) {
    const items = [
      {
        name: '₽',
        types: LEGAL_BONUS_CARD_RUBLE_TYPES
      },
      {
        name: 'xx',
        types: LEGAL_BONUS_CARD_LITER_TYPES
      }
    ]

    for (const item of items) {
      if (item.types.includes(typeId)) {
        return item.name
      }
    }
  }

  ifLimitTypeRequiresLimitValue(limitTypeId: number) {
    const limitTypesThatDontRequireLimitValue = [
      BONUS_CARD_LIMIT_TYPES.NO_LIMIT
    ]

    return !limitTypesThatDontRequireLimitValue.includes(limitTypeId)
  }

  ifCardCashless(typeId: number) {
    return LEGAL_BONUS_CARDS_CASHLESS_TYPES.includes(typeId)
  }
}
