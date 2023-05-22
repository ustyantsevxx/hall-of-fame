import { httpClient } from '~/logic/modules/container'
import { _FuelTypesApi } from '~/logic/modules/fuel-types/FuelTypesApi'
import { _FuelTypesService } from '~/logic/modules/fuel-types/FuelTypesService'

export const FuelTypesModule = new _FuelTypesService(
  new _FuelTypesApi({ namespace: 'api/v1/fuel_types', httpClient })
)

// export * from '~/logic/modules/fuel-types/fuel-types.constants'
// export * from '~/logic/modules/fuel-types/fuel-types.types'
