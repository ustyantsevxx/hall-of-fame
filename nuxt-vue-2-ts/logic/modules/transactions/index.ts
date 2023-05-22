import { httpClient } from '~/logic/modules/container'
import { _TransactionsApi } from '~/logic/modules/transactions/TransactionsApi'
import { _TransactionsService } from '~/logic/modules/transactions/TransactionsService'

export const Transactions = new _TransactionsService(
  new _TransactionsApi({ namespace: 'api/v1/transactions', httpClient })
)

export * from '~/logic/modules/transactions/transactions.constants'
export * from '~/logic/modules/transactions/transactions.types'
