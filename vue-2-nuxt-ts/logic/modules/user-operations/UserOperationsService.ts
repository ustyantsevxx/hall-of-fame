import { BaseService } from '~/logic/core/BaseService'
import {
  UserOperation,
  UserOperationsRequestOptions
} from '~/logic/modules/user-operations/user-operations.types'
import { _UserOperationsApi } from '~/logic/modules/user-operations/UserOperationsApi'
import { xDayjs } from '~/logic/utils/datetime'

export class _UserOperationsService extends BaseService<_UserOperationsApi> {
  private static _formatDate(date: any): string | undefined {
    return date ? xDayjs(date).format('DD-MM-YYYY') : undefined
  }

  public getOperationName(operation: UserOperation): string | null {
    if (operation.is_debit) {
      return `xx xx №:${operation.number} xx ${xDayjs
        .unix(operation.date)
        .format('DD.MM.YYYY')}`
    }

    return operation.comment ?? null
  }

  public async getOperations(
    options: UserOperationsRequestOptions | null = null
  ) {
    const response = await this.api.getOperations({
      page: options?.page ?? 1,
      per_page: 20,
      is_debit: options?.isDebit ? 1 : 0,
      start_at: _UserOperationsService._formatDate(
        options?.dateRange?.startDate
      ),
      end_at: _UserOperationsService._formatDate(options?.dateRange?.endDate)
    })
    return response.data
  }
}
