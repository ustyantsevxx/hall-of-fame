import { BaseService } from '../../shared/base.service'
import { SAINT_PETERSBURG_FIAS_ID } from './dadata.constants'
import {
  StreetBuildingsSearchResult,
  StreetsSearchResult
} from './dadata.types'

type StreetsSearchOptions = {
  query: string
}

type StreetBuildingsSearchOptions = {
  streetFiasId: string
  query: string
}

class DadataServiceClass extends BaseService {
  async searchStreets({ query }: StreetsSearchOptions) {
    const { ok, data } = await this.makeSafeRequest<StreetsSearchResult[]>({
      method: 'GET',
      url: this.getPath('streets'),
      params: {
        q: query,
        // пока что только санкт-петербург
        city_fias_id: SAINT_PETERSBURG_FIAS_ID
      }
    })

    return ok ? data : []
  }

  async searchStreetBuildings({
    streetFiasId,
    query
  }: StreetBuildingsSearchOptions) {
    const response = await this.axios.get<StreetBuildingsSearchResult[]>(
      this.getPath('houses'),
      {
        params: {
          q: query,
          street_fias_id: streetFiasId
        }
      }
    )

    return response.data
  }
}

export const DadataService = new DadataServiceClass('api/v1/dadata')
