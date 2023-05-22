import { BaseService } from '../../shared/base.service'
import { DeliveryAddress, NewDeliveryAddress } from './addresses.types'

class AddressServiceClass extends BaseService {
  async getAddresses() {
    const response = await this.axios.get<DeliveryAddress[]>(
      this.getPath('all')
    )
    return response.data
  }

  addAddress(address: NewDeliveryAddress) {
    return this.axios.post<DeliveryAddress>(this.getPath('create'), address)
  }

  async removeAddress(id: number) {
    const response = await this.axios.delete(this.getPath('delete'), {
      params: {
        id
      }
    })
    return response.data
  }
}

export const AddressesService = new AddressServiceClass('api/v1/addresses')
