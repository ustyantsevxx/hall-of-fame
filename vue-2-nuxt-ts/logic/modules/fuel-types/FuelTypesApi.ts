import { BaseApi } from '~/logic/core/BaseApi'
import { FuelType } from '~/logic/modules/fuel-types/fuel-types.types'

export class _FuelTypesApi extends BaseApi {
  getAll() {
    return this.get<FuelType[]>('all')
  }
}
