import { BaseService } from '~/logic/core/BaseService'
import { FUEL_TYPES } from '~/logic/modules/fuel-types/fuel-types.constants'
import {
  AnyTransactionStatistics,
  STATISTICS_COLORS_BY_TYPE,
  Transaction,
  TRANSACTION_TYPES,
  TransactionsReportRequestOptions,
  TransactionsRequestOptions,
  TransactionStatisticEntry,
  TransactionStatistics,
  TransactionStatisticsOptions
} from '~/logic/modules/transactions'
import { _TransactionsApi } from '~/logic/modules/transactions/TransactionsApi'
import { IDateRange } from '~/logic/types/dates'
import { handleServerResponse } from '~/logic/utils/api'
import { xDayjs } from '~/logic/utils/datetime'

export class _TransactionsService extends BaseService<_TransactionsApi> {
  private static _getStatisticsItemColor(entry: AnyTransactionStatistics) {
    let color
    if (entry.type_id === TRANSACTION_TYPES.FUEL_REFILL && entry.fuel_type_id) {
      color = STATISTICS_COLORS_BY_TYPE.FUELS[entry.fuel_type_id]
    } else if (entry.type_id) {
      color = STATISTICS_COLORS_BY_TYPE.OTHER[entry.type_id]
    }
    return color
  }

  private static _convertToEntries<T extends AnyTransactionStatistics>(
    resource: T[] | undefined,
    valueCallback: (x: T) => number | undefined
  ): TransactionStatisticEntry[] | undefined {
    if (!resource) {
      return
    }

    const sortedByTransactionTypeResource = [...resource].sort((a, b) => {
      return !a.type_id || !b.type_id ? 0 : a.type_id - b.type_id
    })

    return sortedByTransactionTypeResource.map((entry: T) => {
      return {
        name: entry.name,
        value: valueCallback(entry),
        color: _TransactionsService._getStatisticsItemColor(entry)
      }
    })
  }

  private static _formatDate(date: any): string | undefined {
    return date ? xDayjs(date).format('DD-MM-YYYY') : undefined
  }

  private static _formatDateWithTime(datetime: any): string | undefined {
    return datetime ? xDayjs(datetime).format('DD-MM-YYYY HH:mm') : undefined
  }

  transactionNameConstructors = {
    [TRANSACTION_TYPES.FUEL_REFILL]: (t: Transaction) =>
      `xx xx ${t.station?.name} (${t.station?.address})`,
    [TRANSACTION_TYPES.GOODS_AND_SERVICES]: (t: Transaction) =>
      `xx xx/xx xx ${t.station?.name} (${t.station?.address})`
  }

  public getOperationName(transaction: Transaction): string | null {
    if (transaction.type?.id) {
      const nameConstructor =
        this.transactionNameConstructors[transaction?.type?.id]

      if (nameConstructor) {
        return nameConstructor(transaction)
      }
    }

    return transaction.description ?? null
  }

  public async getStatistics(
    options: TransactionStatisticsOptions | null = null
  ): Promise<TransactionStatistics | undefined> {
    const response = await this.api.getStatistics({
      bonus_card_id: options?.bonusCardId,
      start_at: _TransactionsService._formatDateWithTime(
        options?.dateRange.startDate
      ),
      archived: options?.archived ? 1 : undefined,
      end_at: _TransactionsService._formatDateWithTime(
        options?.dateRange.endDate
      )
    })

    if (response.status === 200) {
      return {
        expenses: {
          data: _TransactionsService._convertToEntries(
            response.data.expenses,
            x => x.total_price
          ),
          total: response.data.total?.expenses
        },

        liters: {
          data: _TransactionsService._convertToEntries(
            response.data.liters,
            x => x.amount
          ),
          total: response.data.total?.liters
        },

        bonuses: {
          data: _TransactionsService._convertToEntries(
            response.data.bonuses,
            x => x.bonus_credit
          ),
          total: response.data.total?.bonuses
        },

        discount: {
          data: _TransactionsService._convertToEntries(
            response.data.discount,
            x => x.discount_price
          ),
          total: response.data.total?.discount
        }
      }
    }
  }

  public async getTransactions(
    options: TransactionsRequestOptions | null = null
  ) {
    const { data: transactionsPaginateResponse } =
      await this.api.getTransactions({
        page: options?.page ?? 1,
        per_page: 20,
        archived: options?.archived ? 1 : undefined,
        bonus_card_id: options?.bonusCardId,
        start_at: _TransactionsService._formatDateWithTime(
          options?.dateRange?.startDate
        ),
        end_at: _TransactionsService._formatDateWithTime(
          options?.dateRange?.endDate
        )
      })

    // TODO delete this swap workaround when server is fixed
    const _transactions = this.swapWeightAndAmountForBallonFuelType(
      transactionsPaginateResponse.data
    )

    return {
      data: _transactions,
      meta: transactionsPaginateResponse.meta
    }
  }

  // TODO delete this swap workaround when server is fixed
  private swapWeightAndAmountForBallonFuelType(transactions: Transaction[]) {
    return transactions.map(transaction => {
      const weightAndAmount: Partial<Transaction> =
        transaction.fuel_type?.id === FUEL_TYPES.BALLON
          ? {
              weight: transaction.amount,
              amount: transaction.weight
            }
          : {}

      return {
        ...transaction,
        ...weightAndAmount
      }
    })
  }

  public async getReport(options: TransactionsReportRequestOptions) {
    const response = await this.api.getReport({
      bonus_card_id: options.bonusCardId,
      start_at: _TransactionsService._formatDateWithTime(
        options?.dateRange?.startDate
      ),
      archived: options?.archived ? 1 : undefined,
      end_at: _TransactionsService._formatDateWithTime(
        options?.dateRange?.endDate
      )
    })

    const preparedResponse = handleServerResponse(response)

    const fileName = _TransactionsService.generateReportName(options.dateRange)
    const contentType: string = response.headers['content-type']

    return {
      success: preparedResponse.success,
      data: {
        fileName,
        file: new Blob([preparedResponse.data], {
          type: contentType
        })
      },
      error: preparedResponse.error
    }
  }

  private static generateReportName(dateRange?: IDateRange) {
    const parts = [
      'xxx',
      'Report',
      _TransactionsService._formatDate(dateRange?.startDate),
      _TransactionsService._formatDate(dateRange?.endDate)
    ].filter(p => !!p)
    return `${parts.join('_')}.xlsx`
  }
}
