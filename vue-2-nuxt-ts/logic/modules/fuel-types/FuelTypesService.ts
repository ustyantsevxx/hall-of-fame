import { BaseService } from '~/logic/core/BaseService'
import { _FuelTypesApi } from '~/logic/modules/fuel-types/FuelTypesApi'

export class _FuelTypesService extends BaseService<_FuelTypesApi> {
  async getFuelTypes() {
    const response = await this.api.getAll()
    if (response.status === 200) {
      return response.data
    }
  }
}
