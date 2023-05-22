import { httpClient } from '~/logic/modules/container'
import { _StationsApi } from '~/logic/modules/stations/StationsApi'
import { _StationsService } from '~/logic/modules/stations/StationsService'

export const StationsModule = new _StationsService(
  new _StationsApi({ namespace: 'api/v1/stations', httpClient })
)

export * from '~/logic/modules/stations/stations.types'
