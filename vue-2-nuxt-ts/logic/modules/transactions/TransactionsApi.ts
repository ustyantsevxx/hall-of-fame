import { BaseApi } from '~/logic/core/BaseApi'

import {
  TransactionReportRequestParams,
  TransactionsIndexRequestParams,
  TransactionsIndexResponse,
  TransactionsStatisticsRequestParams,
  TransactionsStatisticsResponse
} from '.'

export class _TransactionsApi extends BaseApi {
  getTransactions(options: TransactionsIndexRequestParams) {
    return this.get<TransactionsIndexResponse>('index', options)
  }

  getStatistics(options: TransactionsStatisticsRequestParams) {
    return this.get<TransactionsStatisticsResponse>('statistics', options)
  }

  getReport(options: TransactionReportRequestParams) {
    return this.get<any>('index/report', options, {
      responseType: 'blob'
    })
  }
}
