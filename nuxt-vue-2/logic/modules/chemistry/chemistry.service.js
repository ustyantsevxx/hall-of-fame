import { BaseService } from '~/logic/core/base.service'

class _ChemistryService extends BaseService {
  async getChemistryList() {
    const response = await this.axios.get(this.getPath())
    return response?.data
  }
}

export const ChemistryService = new _ChemistryService('api/v1/chemistry')
